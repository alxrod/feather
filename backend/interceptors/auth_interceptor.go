package interceptors

import (
	"context"
	"os"

	services "github.com/alxrod/feather/backend/services"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

// AuthInterceptor is a server interceptor for authentication and authorization
type AuthInterceptor struct {
	jwtManager      *services.JWTManager
	accessibleRoles []string
}

// NewAuthInterceptor returns a new auth interceptor
func NewAuthInterceptor(jwtManager *services.JWTManager, accessibleRoles []string) *AuthInterceptor {
	return &AuthInterceptor{jwtManager, accessibleRoles}
}

// Unary returns a server interceptor function to authenticate and authorize unary RPC
func (interceptor *AuthInterceptor) Unary() grpc.UnaryServerInterceptor {
	return func(
		ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler,
	) (interface{}, error) {
		// log.Println("--> unary interceptor: ", info.FullMethod)

		err := interceptor.authorize(ctx, info.FullMethod)
		if err != nil {
			return nil, err
		}

		return handler(ctx, req)
	}
}

// Stream returns a server interceptor function to authenticate and authorize stream RPC
func (interceptor *AuthInterceptor) Stream() grpc.StreamServerInterceptor {
	return func(
		srv interface{},
		stream grpc.ServerStream,
		info *grpc.StreamServerInfo,
		handler grpc.StreamHandler,
	) error {
		// log.Println("--> stream interceptor: ", info.FullMethod)

		err := interceptor.authorize(stream.Context(), info.FullMethod)
		if err != nil {
			return err
		}

		return handler(srv, stream)
	}
}

func (interceptor *AuthInterceptor) authorize(ctx context.Context, method string) error {
	isPublic := false
	for _, route := range interceptor.accessibleRoles {
		if route == method {
			isPublic = true
		}
	}
	if isPublic {
		// everyone can access
		// log.Println("Public link")
		return nil
	}

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return status.Errorf(codes.Unauthenticated, "metadata is not provided")
	}

	loopback_password := os.Getenv("LOOPBACK_PASSWORD")
	values := md["authorization"]
	if len(values) == 0 {
		if len(md["loopback_password"]) > 0 && md["loopback_password"][0] == loopback_password {
			return nil
		}
		return status.Errorf(codes.Unauthenticated, "authorization token is not provided")
	}

	accessToken := values[0]
	_, err := interceptor.jwtManager.Verify(accessToken)
	if err != nil {
		return status.Errorf(codes.Unauthenticated, "access token is invalid: %v", err)
	} else {
		return nil
	}
}

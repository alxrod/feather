package interceptors

import (
	"context"
	"fmt"

	"github.com/TwiN/go-color"

	"google.golang.org/grpc"
)

func LogRequest(
	ctx context.Context,
	req interface{},
	info *grpc.UnaryServerInfo,
	handler grpc.UnaryHandler,
) (response interface{}, err error) {

	fmt.Printf(color.Ize(color.Cyan, fmt.Sprintf("Backend Request for : %s\n", info.FullMethod)))
	return handler(ctx, req)

}

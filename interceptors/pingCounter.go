package interceptors

import (
	"context"
	"errors"
	"fmt"

	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

type PingCounter struct {
	Pings int
}

func (pc *PingCounter) ServerCount(
	ctx context.Context,
	req interface{},
	info *grpc.UnaryServerInfo,
	handler grpc.UnaryHandler,
) (
	response interface{},
	err error,
) {

	pc.Pings++

	meta, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, errors.New("could not grab metadata from context")
	}

	meta.Set("ping-counts", fmt.Sprintf("%d", pc.Pings))

	grpc.SendHeader(ctx, meta)

	return handler(ctx, req)
}

func (pc *PingCounter) ClientPingCounter(
	ctx context.Context,
	method string,
	req interface{},
	reply interface{},
	cc *grpc.ClientConn,
	invoker grpc.UnaryInvoker,
	opts ...grpc.CallOption,
) error {
	pc.Pings++
	return invoker(ctx, method, req, reply, cc, opts...)
}

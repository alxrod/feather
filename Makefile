include .env
export

.PHONY: gencert
gencert:
	./cert/certgen.sh

.PHONY: run
run:
	./api

.PHONY: build
build:
	PUBLIC_URL=/ npm run build --prefix ui/featherapp/ 
	go build -o api . && ./api    

.PHONY: backend
backend:
	go build -o api . && ./api   

.PHONY: debug
debug:
	npm run dev --prefix ui/featherapp/ 

.PHONY: debug-webhooks
debug-webhooks:
	stripe listen --forward-to https://localhost:8080/web-hook/stripe-event --skip-verify --latest

.PHONY: proto
proto:
	protoc communication/*.proto \
		--js_out=import_style=commonjs,binary:./ui/featherapp/src/proto\
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:./ui/featherapp/src/proto \
		--go-grpc_out=./communication \
		--go_out=./communication
	
	npx protoc \
	--ts_out="${PWD}/feather_figma/ui-src/proto" \
	--ts_opt generate_dependencies \
	--proto_path "${PWD}" \
	${PWD}/communication/contract.proto ${PWD}/communication/user.proto

.PHONY: start-db
start-db:
	brew services start mongodb-community@5.0

.PHONY: stop-db
stop-db:
	brew services stop mongodb-community@5.0
	
.PHONY: test
test:
	go test -race ./...

.PHONY: clean-test
clean-test:
	./tests/cleanup


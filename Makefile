.PHONY: gencert
gencert:
	./cert/certgen.sh

.PHONY: build
build:
	npm run build --prefix ui/featherapp/ 
	go build -o api . && ./api    

.PHONY: backend
backend:
	go build -o api . && ./api   

.PHONY: debug
debug:
	npm run dev --prefix ui/featherapp/ 

.PHONY: proto
proto:
	protoc communication/*.proto \
		--js_out=import_style=commonjs,binary:./ui/featherapp/src/proto\
		--grpc-web_out=import_style=commonjs,mode=grpcwebtext:./ui/featherapp/src/proto \
		--go-grpc_out=./communication \
		--go_out=./communication

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


/**
 * @fileoverview gRPC-Web generated client stub for main
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.3.1
// 	protoc              v3.19.4
// source: communication/contract.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.main = require('./contract_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.main.ContractClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.main.ContractPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.ContractCreateRequest,
 *   !proto.main.ContractResponse>}
 */
const methodDescriptor_Contract_Create = new grpc.web.MethodDescriptor(
  '/main.Contract/Create',
  grpc.web.MethodType.UNARY,
  proto.main.ContractCreateRequest,
  proto.main.ContractResponse,
  /**
   * @param {!proto.main.ContractCreateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.ContractResponse.deserializeBinary
);


/**
 * @param {!proto.main.ContractCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.ContractResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.ContractResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.ContractClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Contract/Create',
      request,
      metadata || {},
      methodDescriptor_Contract_Create,
      callback);
};


/**
 * @param {!proto.main.ContractCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.ContractResponse>}
 *     Promise that resolves to the response
 */
proto.main.ContractPromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Contract/Create',
      request,
      metadata || {},
      methodDescriptor_Contract_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.QueryByIdRequest,
 *   !proto.main.ContractResponse>}
 */
const methodDescriptor_Contract_QueryById = new grpc.web.MethodDescriptor(
  '/main.Contract/QueryById',
  grpc.web.MethodType.UNARY,
  proto.main.QueryByIdRequest,
  proto.main.ContractResponse,
  /**
   * @param {!proto.main.QueryByIdRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.ContractResponse.deserializeBinary
);


/**
 * @param {!proto.main.QueryByIdRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.ContractResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.ContractResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.ContractClient.prototype.queryById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Contract/QueryById',
      request,
      metadata || {},
      methodDescriptor_Contract_QueryById,
      callback);
};


/**
 * @param {!proto.main.QueryByIdRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.ContractResponse>}
 *     Promise that resolves to the response
 */
proto.main.ContractPromiseClient.prototype.queryById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Contract/QueryById',
      request,
      metadata || {},
      methodDescriptor_Contract_QueryById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.QueryByUserRequest,
 *   !proto.main.ContractNubSet>}
 */
const methodDescriptor_Contract_QueryByUser = new grpc.web.MethodDescriptor(
  '/main.Contract/QueryByUser',
  grpc.web.MethodType.UNARY,
  proto.main.QueryByUserRequest,
  proto.main.ContractNubSet,
  /**
   * @param {!proto.main.QueryByUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.ContractNubSet.deserializeBinary
);


/**
 * @param {!proto.main.QueryByUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.ContractNubSet)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.ContractNubSet>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.ContractClient.prototype.queryByUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Contract/QueryByUser',
      request,
      metadata || {},
      methodDescriptor_Contract_QueryByUser,
      callback);
};


/**
 * @param {!proto.main.QueryByUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.ContractNubSet>}
 *     Promise that resolves to the response
 */
proto.main.ContractPromiseClient.prototype.queryByUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Contract/QueryByUser',
      request,
      metadata || {},
      methodDescriptor_Contract_QueryByUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.ContractSuggestPrice,
 *   !proto.main.ContractResponse>}
 */
const methodDescriptor_Contract_SuggestPrice = new grpc.web.MethodDescriptor(
  '/main.Contract/SuggestPrice',
  grpc.web.MethodType.UNARY,
  proto.main.ContractSuggestPrice,
  proto.main.ContractResponse,
  /**
   * @param {!proto.main.ContractSuggestPrice} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.ContractResponse.deserializeBinary
);


/**
 * @param {!proto.main.ContractSuggestPrice} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.ContractResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.ContractResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.ContractClient.prototype.suggestPrice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Contract/SuggestPrice',
      request,
      metadata || {},
      methodDescriptor_Contract_SuggestPrice,
      callback);
};


/**
 * @param {!proto.main.ContractSuggestPrice} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.ContractResponse>}
 *     Promise that resolves to the response
 */
proto.main.ContractPromiseClient.prototype.suggestPrice =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Contract/SuggestPrice',
      request,
      metadata || {},
      methodDescriptor_Contract_SuggestPrice);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.ContractReactPrice,
 *   !proto.main.ContractResponse>}
 */
const methodDescriptor_Contract_ReactPrice = new grpc.web.MethodDescriptor(
  '/main.Contract/ReactPrice',
  grpc.web.MethodType.UNARY,
  proto.main.ContractReactPrice,
  proto.main.ContractResponse,
  /**
   * @param {!proto.main.ContractReactPrice} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.ContractResponse.deserializeBinary
);


/**
 * @param {!proto.main.ContractReactPrice} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.ContractResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.ContractResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.ContractClient.prototype.reactPrice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Contract/ReactPrice',
      request,
      metadata || {},
      methodDescriptor_Contract_ReactPrice,
      callback);
};


/**
 * @param {!proto.main.ContractReactPrice} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.ContractResponse>}
 *     Promise that resolves to the response
 */
proto.main.ContractPromiseClient.prototype.reactPrice =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Contract/ReactPrice',
      request,
      metadata || {},
      methodDescriptor_Contract_ReactPrice);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.ContractSuggestDeadline,
 *   !proto.main.ContractResponse>}
 */
const methodDescriptor_Contract_SuggestDate = new grpc.web.MethodDescriptor(
  '/main.Contract/SuggestDate',
  grpc.web.MethodType.UNARY,
  proto.main.ContractSuggestDeadline,
  proto.main.ContractResponse,
  /**
   * @param {!proto.main.ContractSuggestDeadline} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.ContractResponse.deserializeBinary
);


/**
 * @param {!proto.main.ContractSuggestDeadline} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.ContractResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.ContractResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.ContractClient.prototype.suggestDate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Contract/SuggestDate',
      request,
      metadata || {},
      methodDescriptor_Contract_SuggestDate,
      callback);
};


/**
 * @param {!proto.main.ContractSuggestDeadline} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.ContractResponse>}
 *     Promise that resolves to the response
 */
proto.main.ContractPromiseClient.prototype.suggestDate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Contract/SuggestDate',
      request,
      metadata || {},
      methodDescriptor_Contract_SuggestDate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.ContractReactDeadline,
 *   !proto.main.ContractResponse>}
 */
const methodDescriptor_Contract_ReactDate = new grpc.web.MethodDescriptor(
  '/main.Contract/ReactDate',
  grpc.web.MethodType.UNARY,
  proto.main.ContractReactDeadline,
  proto.main.ContractResponse,
  /**
   * @param {!proto.main.ContractReactDeadline} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.ContractResponse.deserializeBinary
);


/**
 * @param {!proto.main.ContractReactDeadline} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.ContractResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.ContractResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.ContractClient.prototype.reactDate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Contract/ReactDate',
      request,
      metadata || {},
      methodDescriptor_Contract_ReactDate,
      callback);
};


/**
 * @param {!proto.main.ContractReactDeadline} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.ContractResponse>}
 *     Promise that resolves to the response
 */
proto.main.ContractPromiseClient.prototype.reactDate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Contract/ReactDate',
      request,
      metadata || {},
      methodDescriptor_Contract_ReactDate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.ContractAddItemRequest,
 *   !proto.main.ContractAddItemResponse>}
 */
const methodDescriptor_Contract_AddItem = new grpc.web.MethodDescriptor(
  '/main.Contract/AddItem',
  grpc.web.MethodType.UNARY,
  proto.main.ContractAddItemRequest,
  proto.main.ContractAddItemResponse,
  /**
   * @param {!proto.main.ContractAddItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.ContractAddItemResponse.deserializeBinary
);


/**
 * @param {!proto.main.ContractAddItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.ContractAddItemResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.ContractAddItemResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.ContractClient.prototype.addItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Contract/AddItem',
      request,
      metadata || {},
      methodDescriptor_Contract_AddItem,
      callback);
};


/**
 * @param {!proto.main.ContractAddItemRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.ContractAddItemResponse>}
 *     Promise that resolves to the response
 */
proto.main.ContractPromiseClient.prototype.addItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Contract/AddItem',
      request,
      metadata || {},
      methodDescriptor_Contract_AddItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.ContractDelItemRequest,
 *   !proto.main.ContractResponse>}
 */
const methodDescriptor_Contract_DeleteItem = new grpc.web.MethodDescriptor(
  '/main.Contract/DeleteItem',
  grpc.web.MethodType.UNARY,
  proto.main.ContractDelItemRequest,
  proto.main.ContractResponse,
  /**
   * @param {!proto.main.ContractDelItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.ContractResponse.deserializeBinary
);


/**
 * @param {!proto.main.ContractDelItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.ContractResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.ContractResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.ContractClient.prototype.deleteItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Contract/DeleteItem',
      request,
      metadata || {},
      methodDescriptor_Contract_DeleteItem,
      callback);
};


/**
 * @param {!proto.main.ContractDelItemRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.ContractResponse>}
 *     Promise that resolves to the response
 */
proto.main.ContractPromiseClient.prototype.deleteItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Contract/DeleteItem',
      request,
      metadata || {},
      methodDescriptor_Contract_DeleteItem);
};


module.exports = proto.main;


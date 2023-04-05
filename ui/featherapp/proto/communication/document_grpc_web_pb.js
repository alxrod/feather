/**
 * @fileoverview gRPC-Web generated client stub for communication
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.21.12
// source: communication/document.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var communication_deadline_pb = require('../communication/deadline_pb.js')

var communication_user_pb = require('../communication/user_pb.js')

var communication_item_pb = require('../communication/item_pb.js')

var communication_requests_pb = require('../communication/requests_pb.js')
const proto = {};
proto.communication = require('./document_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.communication.DocumentClient =
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
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.communication.DocumentPromiseClient =
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
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.DocumentCreateRequest,
 *   !proto.communication.DocumentEntity>}
 */
const methodDescriptor_Document_CreateDoc = new grpc.web.MethodDescriptor(
  '/communication.Document/CreateDoc',
  grpc.web.MethodType.UNARY,
  proto.communication.DocumentCreateRequest,
  proto.communication.DocumentEntity,
  /**
   * @param {!proto.communication.DocumentCreateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.communication.DocumentEntity.deserializeBinary
);


/**
 * @param {!proto.communication.DocumentCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.DocumentEntity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.DocumentEntity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DocumentClient.prototype.createDoc =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Document/CreateDoc',
      request,
      metadata || {},
      methodDescriptor_Document_CreateDoc,
      callback);
};


/**
 * @param {!proto.communication.DocumentCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.DocumentEntity>}
 *     Promise that resolves to the response
 */
proto.communication.DocumentPromiseClient.prototype.createDoc =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Document/CreateDoc',
      request,
      metadata || {},
      methodDescriptor_Document_CreateDoc);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.QueryByIdRequest,
 *   !proto.communication.DocumentEntity>}
 */
const methodDescriptor_Document_QueryDocById = new grpc.web.MethodDescriptor(
  '/communication.Document/QueryDocById',
  grpc.web.MethodType.UNARY,
  communication_requests_pb.QueryByIdRequest,
  proto.communication.DocumentEntity,
  /**
   * @param {!proto.communication.QueryByIdRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.communication.DocumentEntity.deserializeBinary
);


/**
 * @param {!proto.communication.QueryByIdRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.DocumentEntity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.DocumentEntity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DocumentClient.prototype.queryDocById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Document/QueryDocById',
      request,
      metadata || {},
      methodDescriptor_Document_QueryDocById,
      callback);
};


/**
 * @param {!proto.communication.QueryByIdRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.DocumentEntity>}
 *     Promise that resolves to the response
 */
proto.communication.DocumentPromiseClient.prototype.queryDocById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Document/QueryDocById',
      request,
      metadata || {},
      methodDescriptor_Document_QueryDocById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.QueryByUserRequest,
 *   !proto.communication.DocumentNubSet>}
 */
const methodDescriptor_Document_QueryDocByUser = new grpc.web.MethodDescriptor(
  '/communication.Document/QueryDocByUser',
  grpc.web.MethodType.UNARY,
  communication_requests_pb.QueryByUserRequest,
  proto.communication.DocumentNubSet,
  /**
   * @param {!proto.communication.QueryByUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.communication.DocumentNubSet.deserializeBinary
);


/**
 * @param {!proto.communication.QueryByUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.DocumentNubSet)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.DocumentNubSet>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DocumentClient.prototype.queryDocByUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Document/QueryDocByUser',
      request,
      metadata || {},
      methodDescriptor_Document_QueryDocByUser,
      callback);
};


/**
 * @param {!proto.communication.QueryByUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.DocumentNubSet>}
 *     Promise that resolves to the response
 */
proto.communication.DocumentPromiseClient.prototype.queryDocByUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Document/QueryDocByUser',
      request,
      metadata || {},
      methodDescriptor_Document_QueryDocByUser);
};


module.exports = proto.communication;


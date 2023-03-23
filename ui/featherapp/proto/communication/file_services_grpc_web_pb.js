/**
 * @fileoverview gRPC-Web generated client stub for main
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.3.1
// 	protoc              v3.19.4
// source: communication/file_services.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.main = require('./file_services_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.main.FileServiceClient =
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
proto.main.FileServicePromiseClient =
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
 *   !proto.main.ProfileUrlRequest,
 *   !proto.main.ProfileUrlResponse>}
 */
const methodDescriptor_FileService_PresignProfilePhoto = new grpc.web.MethodDescriptor(
  '/main.FileService/PresignProfilePhoto',
  grpc.web.MethodType.UNARY,
  proto.main.ProfileUrlRequest,
  proto.main.ProfileUrlResponse,
  /**
   * @param {!proto.main.ProfileUrlRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.ProfileUrlResponse.deserializeBinary
);


/**
 * @param {!proto.main.ProfileUrlRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.ProfileUrlResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.ProfileUrlResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.FileServiceClient.prototype.presignProfilePhoto =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.FileService/PresignProfilePhoto',
      request,
      metadata || {},
      methodDescriptor_FileService_PresignProfilePhoto,
      callback);
};


/**
 * @param {!proto.main.ProfileUrlRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.ProfileUrlResponse>}
 *     Promise that resolves to the response
 */
proto.main.FileServicePromiseClient.prototype.presignProfilePhoto =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.FileService/PresignProfilePhoto',
      request,
      metadata || {},
      methodDescriptor_FileService_PresignProfilePhoto);
};


module.exports = proto.main;

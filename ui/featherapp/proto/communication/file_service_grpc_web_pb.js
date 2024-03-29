/**
 * @fileoverview gRPC-Web generated client stub for communication
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.21.12
// source: communication/file_service.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.communication = require('./file_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.communication.FileServiceClient =
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
proto.communication.FileServicePromiseClient =
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
 *   !proto.communication.ProfileUrlRequest,
 *   !proto.communication.ProfileUrlResponse>}
 */
const methodDescriptor_FileService_PresignProfilePhoto = new grpc.web.MethodDescriptor(
  '/communication.FileService/PresignProfilePhoto',
  grpc.web.MethodType.UNARY,
  proto.communication.ProfileUrlRequest,
  proto.communication.ProfileUrlResponse,
  /**
   * @param {!proto.communication.ProfileUrlRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.communication.ProfileUrlResponse.deserializeBinary
);


/**
 * @param {!proto.communication.ProfileUrlRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.ProfileUrlResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.ProfileUrlResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.FileServiceClient.prototype.presignProfilePhoto =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.FileService/PresignProfilePhoto',
      request,
      metadata || {},
      methodDescriptor_FileService_PresignProfilePhoto,
      callback);
};


/**
 * @param {!proto.communication.ProfileUrlRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.ProfileUrlResponse>}
 *     Promise that resolves to the response
 */
proto.communication.FileServicePromiseClient.prototype.presignProfilePhoto =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.FileService/PresignProfilePhoto',
      request,
      metadata || {},
      methodDescriptor_FileService_PresignProfilePhoto);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.ProfileUploadStatus,
 *   !proto.communication.ProfileImageEntity>}
 */
const methodDescriptor_FileService_ConfirmProfileUploaded = new grpc.web.MethodDescriptor(
  '/communication.FileService/ConfirmProfileUploaded',
  grpc.web.MethodType.UNARY,
  proto.communication.ProfileUploadStatus,
  proto.communication.ProfileImageEntity,
  /**
   * @param {!proto.communication.ProfileUploadStatus} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.communication.ProfileImageEntity.deserializeBinary
);


/**
 * @param {!proto.communication.ProfileUploadStatus} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.ProfileImageEntity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.ProfileImageEntity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.FileServiceClient.prototype.confirmProfileUploaded =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.FileService/ConfirmProfileUploaded',
      request,
      metadata || {},
      methodDescriptor_FileService_ConfirmProfileUploaded,
      callback);
};


/**
 * @param {!proto.communication.ProfileUploadStatus} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.ProfileImageEntity>}
 *     Promise that resolves to the response
 */
proto.communication.FileServicePromiseClient.prototype.confirmProfileUploaded =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.FileService/ConfirmProfileUploaded',
      request,
      metadata || {},
      methodDescriptor_FileService_ConfirmProfileUploaded);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.ProfileGetRequest,
 *   !proto.communication.ProfileGetResponse>}
 */
const methodDescriptor_FileService_GetProfilePhotos = new grpc.web.MethodDescriptor(
  '/communication.FileService/GetProfilePhotos',
  grpc.web.MethodType.UNARY,
  proto.communication.ProfileGetRequest,
  proto.communication.ProfileGetResponse,
  /**
   * @param {!proto.communication.ProfileGetRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.communication.ProfileGetResponse.deserializeBinary
);


/**
 * @param {!proto.communication.ProfileGetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.ProfileGetResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.ProfileGetResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.FileServiceClient.prototype.getProfilePhotos =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.FileService/GetProfilePhotos',
      request,
      metadata || {},
      methodDescriptor_FileService_GetProfilePhotos,
      callback);
};


/**
 * @param {!proto.communication.ProfileGetRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.ProfileGetResponse>}
 *     Promise that resolves to the response
 */
proto.communication.FileServicePromiseClient.prototype.getProfilePhotos =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.FileService/GetProfilePhotos',
      request,
      metadata || {},
      methodDescriptor_FileService_GetProfilePhotos);
};


module.exports = proto.communication;


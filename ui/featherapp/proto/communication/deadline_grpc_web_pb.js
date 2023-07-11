/**
 * @fileoverview gRPC-Web generated client stub for communication
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v3.15.8
// source: communication/deadline.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var communication_item_pb = require('../communication/item_pb.js')

var communication_generic_pb = require('../communication/generic_pb.js')
const proto = {};
proto.communication = require('./deadline_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.communication.DeadlineClient =
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
proto.communication.DeadlinePromiseClient =
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
 *   !proto.communication.SuggestDateReq,
 *   !proto.communication.NullResponse>}
 */
const methodDescriptor_Deadline_SuggestDate = new grpc.web.MethodDescriptor(
  '/communication.Deadline/SuggestDate',
  grpc.web.MethodType.UNARY,
  proto.communication.SuggestDateReq,
  communication_generic_pb.NullResponse,
  /**
   * @param {!proto.communication.SuggestDateReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_generic_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.communication.SuggestDateReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.suggestDate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/SuggestDate',
      request,
      metadata || {},
      methodDescriptor_Deadline_SuggestDate,
      callback);
};


/**
 * @param {!proto.communication.SuggestDateReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.NullResponse>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.suggestDate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/SuggestDate',
      request,
      metadata || {},
      methodDescriptor_Deadline_SuggestDate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.ReactDateReq,
 *   !proto.communication.NullResponse>}
 */
const methodDescriptor_Deadline_ReactDate = new grpc.web.MethodDescriptor(
  '/communication.Deadline/ReactDate',
  grpc.web.MethodType.UNARY,
  proto.communication.ReactDateReq,
  communication_generic_pb.NullResponse,
  /**
   * @param {!proto.communication.ReactDateReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_generic_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.communication.ReactDateReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.reactDate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/ReactDate',
      request,
      metadata || {},
      methodDescriptor_Deadline_ReactDate,
      callback);
};


/**
 * @param {!proto.communication.ReactDateReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.NullResponse>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.reactDate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/ReactDate',
      request,
      metadata || {},
      methodDescriptor_Deadline_ReactDate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.SuggestPayoutReq,
 *   !proto.communication.NullResponse>}
 */
const methodDescriptor_Deadline_SuggestPayout = new grpc.web.MethodDescriptor(
  '/communication.Deadline/SuggestPayout',
  grpc.web.MethodType.UNARY,
  proto.communication.SuggestPayoutReq,
  communication_generic_pb.NullResponse,
  /**
   * @param {!proto.communication.SuggestPayoutReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_generic_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.communication.SuggestPayoutReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.suggestPayout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/SuggestPayout',
      request,
      metadata || {},
      methodDescriptor_Deadline_SuggestPayout,
      callback);
};


/**
 * @param {!proto.communication.SuggestPayoutReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.NullResponse>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.suggestPayout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/SuggestPayout',
      request,
      metadata || {},
      methodDescriptor_Deadline_SuggestPayout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.ReactPayoutReq,
 *   !proto.communication.NullResponse>}
 */
const methodDescriptor_Deadline_ReactPayout = new grpc.web.MethodDescriptor(
  '/communication.Deadline/ReactPayout',
  grpc.web.MethodType.UNARY,
  proto.communication.ReactPayoutReq,
  communication_generic_pb.NullResponse,
  /**
   * @param {!proto.communication.ReactPayoutReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_generic_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.communication.ReactPayoutReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.reactPayout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/ReactPayout',
      request,
      metadata || {},
      methodDescriptor_Deadline_ReactPayout,
      callback);
};


/**
 * @param {!proto.communication.ReactPayoutReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.NullResponse>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.reactPayout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/ReactPayout',
      request,
      metadata || {},
      methodDescriptor_Deadline_ReactPayout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.SuggestDeadlineItemsReq,
 *   !proto.communication.NullResponse>}
 */
const methodDescriptor_Deadline_SuggestDeadlineItems = new grpc.web.MethodDescriptor(
  '/communication.Deadline/SuggestDeadlineItems',
  grpc.web.MethodType.UNARY,
  proto.communication.SuggestDeadlineItemsReq,
  communication_generic_pb.NullResponse,
  /**
   * @param {!proto.communication.SuggestDeadlineItemsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_generic_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.communication.SuggestDeadlineItemsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.suggestDeadlineItems =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/SuggestDeadlineItems',
      request,
      metadata || {},
      methodDescriptor_Deadline_SuggestDeadlineItems,
      callback);
};


/**
 * @param {!proto.communication.SuggestDeadlineItemsReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.NullResponse>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.suggestDeadlineItems =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/SuggestDeadlineItems',
      request,
      metadata || {},
      methodDescriptor_Deadline_SuggestDeadlineItems);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.ReactDeadlineItemsReq,
 *   !proto.communication.NullResponse>}
 */
const methodDescriptor_Deadline_ReactDeadlineItems = new grpc.web.MethodDescriptor(
  '/communication.Deadline/ReactDeadlineItems',
  grpc.web.MethodType.UNARY,
  proto.communication.ReactDeadlineItemsReq,
  communication_generic_pb.NullResponse,
  /**
   * @param {!proto.communication.ReactDeadlineItemsReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_generic_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.communication.ReactDeadlineItemsReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.reactDeadlineItems =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/ReactDeadlineItems',
      request,
      metadata || {},
      methodDescriptor_Deadline_ReactDeadlineItems,
      callback);
};


/**
 * @param {!proto.communication.ReactDeadlineItemsReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.NullResponse>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.reactDeadlineItems =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/ReactDeadlineItems',
      request,
      metadata || {},
      methodDescriptor_Deadline_ReactDeadlineItems);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.SuggestAddDeadlineReq,
 *   !proto.communication.DeadlineEntity>}
 */
const methodDescriptor_Deadline_SuggestAddDeadline = new grpc.web.MethodDescriptor(
  '/communication.Deadline/SuggestAddDeadline',
  grpc.web.MethodType.UNARY,
  proto.communication.SuggestAddDeadlineReq,
  proto.communication.DeadlineEntity,
  /**
   * @param {!proto.communication.SuggestAddDeadlineReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.communication.DeadlineEntity.deserializeBinary
);


/**
 * @param {!proto.communication.SuggestAddDeadlineReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.DeadlineEntity)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.DeadlineEntity>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.suggestAddDeadline =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/SuggestAddDeadline',
      request,
      metadata || {},
      methodDescriptor_Deadline_SuggestAddDeadline,
      callback);
};


/**
 * @param {!proto.communication.SuggestAddDeadlineReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.DeadlineEntity>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.suggestAddDeadline =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/SuggestAddDeadline',
      request,
      metadata || {},
      methodDescriptor_Deadline_SuggestAddDeadline);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.ReactAddDeadlineReq,
 *   !proto.communication.NullResponse>}
 */
const methodDescriptor_Deadline_ReactAddDeadline = new grpc.web.MethodDescriptor(
  '/communication.Deadline/ReactAddDeadline',
  grpc.web.MethodType.UNARY,
  proto.communication.ReactAddDeadlineReq,
  communication_generic_pb.NullResponse,
  /**
   * @param {!proto.communication.ReactAddDeadlineReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_generic_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.communication.ReactAddDeadlineReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.reactAddDeadline =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/ReactAddDeadline',
      request,
      metadata || {},
      methodDescriptor_Deadline_ReactAddDeadline,
      callback);
};


/**
 * @param {!proto.communication.ReactAddDeadlineReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.NullResponse>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.reactAddDeadline =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/ReactAddDeadline',
      request,
      metadata || {},
      methodDescriptor_Deadline_ReactAddDeadline);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.SuggestDelDeadlineReq,
 *   !proto.communication.NullResponse>}
 */
const methodDescriptor_Deadline_SuggestDeleteDeadline = new grpc.web.MethodDescriptor(
  '/communication.Deadline/SuggestDeleteDeadline',
  grpc.web.MethodType.UNARY,
  proto.communication.SuggestDelDeadlineReq,
  communication_generic_pb.NullResponse,
  /**
   * @param {!proto.communication.SuggestDelDeadlineReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_generic_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.communication.SuggestDelDeadlineReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.suggestDeleteDeadline =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/SuggestDeleteDeadline',
      request,
      metadata || {},
      methodDescriptor_Deadline_SuggestDeleteDeadline,
      callback);
};


/**
 * @param {!proto.communication.SuggestDelDeadlineReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.NullResponse>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.suggestDeleteDeadline =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/SuggestDeleteDeadline',
      request,
      metadata || {},
      methodDescriptor_Deadline_SuggestDeleteDeadline);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.ReactDelDeadlineReq,
 *   !proto.communication.NullResponse>}
 */
const methodDescriptor_Deadline_ReactDeleteDeadline = new grpc.web.MethodDescriptor(
  '/communication.Deadline/ReactDeleteDeadline',
  grpc.web.MethodType.UNARY,
  proto.communication.ReactDelDeadlineReq,
  communication_generic_pb.NullResponse,
  /**
   * @param {!proto.communication.ReactDelDeadlineReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_generic_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.communication.ReactDelDeadlineReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.reactDeleteDeadline =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/ReactDeleteDeadline',
      request,
      metadata || {},
      methodDescriptor_Deadline_ReactDeleteDeadline,
      callback);
};


/**
 * @param {!proto.communication.ReactDelDeadlineReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.NullResponse>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.reactDeleteDeadline =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/ReactDeleteDeadline',
      request,
      metadata || {},
      methodDescriptor_Deadline_ReactDeleteDeadline);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.communication.FinishDeadlineRequest,
 *   !proto.communication.NullResponse>}
 */
const methodDescriptor_Deadline_FinishDeadline = new grpc.web.MethodDescriptor(
  '/communication.Deadline/FinishDeadline',
  grpc.web.MethodType.UNARY,
  proto.communication.FinishDeadlineRequest,
  communication_generic_pb.NullResponse,
  /**
   * @param {!proto.communication.FinishDeadlineRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_generic_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.communication.FinishDeadlineRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.communication.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.communication.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.communication.DeadlineClient.prototype.finishDeadline =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/communication.Deadline/FinishDeadline',
      request,
      metadata || {},
      methodDescriptor_Deadline_FinishDeadline,
      callback);
};


/**
 * @param {!proto.communication.FinishDeadlineRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.communication.NullResponse>}
 *     Promise that resolves to the response
 */
proto.communication.DeadlinePromiseClient.prototype.finishDeadline =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/communication.Deadline/FinishDeadline',
      request,
      metadata || {},
      methodDescriptor_Deadline_FinishDeadline);
};


module.exports = proto.communication;

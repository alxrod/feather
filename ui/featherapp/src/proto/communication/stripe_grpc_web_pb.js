/**
 * @fileoverview gRPC-Web generated client stub for main
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v3.15.8
// source: communication/stripe.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var communication_contract_pb = require('../communication/contract_pb.js')
const proto = {};
proto.main = require('./stripe_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.main.StripeServiceClient =
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
proto.main.StripeServicePromiseClient =
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
 *   !proto.main.PaymentRegisterRequest,
 *   !proto.main.AccountLinkResp>}
 */
const methodDescriptor_StripeService_GetAccountOnboardLink = new grpc.web.MethodDescriptor(
  '/main.StripeService/GetAccountOnboardLink',
  grpc.web.MethodType.UNARY,
  proto.main.PaymentRegisterRequest,
  proto.main.AccountLinkResp,
  /**
   * @param {!proto.main.PaymentRegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.AccountLinkResp.deserializeBinary
);


/**
 * @param {!proto.main.PaymentRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.AccountLinkResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.AccountLinkResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.getAccountOnboardLink =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/GetAccountOnboardLink',
      request,
      metadata || {},
      methodDescriptor_StripeService_GetAccountOnboardLink,
      callback);
};


/**
 * @param {!proto.main.PaymentRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.AccountLinkResp>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.getAccountOnboardLink =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/GetAccountOnboardLink',
      request,
      metadata || {},
      methodDescriptor_StripeService_GetAccountOnboardLink);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.PaymentRegisterRequest,
 *   !proto.main.IntentSecret>}
 */
const methodDescriptor_StripeService_GetInitialSetupSecret = new grpc.web.MethodDescriptor(
  '/main.StripeService/GetInitialSetupSecret',
  grpc.web.MethodType.UNARY,
  proto.main.PaymentRegisterRequest,
  proto.main.IntentSecret,
  /**
   * @param {!proto.main.PaymentRegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.IntentSecret.deserializeBinary
);


/**
 * @param {!proto.main.PaymentRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.IntentSecret)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.IntentSecret>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.getInitialSetupSecret =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/GetInitialSetupSecret',
      request,
      metadata || {},
      methodDescriptor_StripeService_GetInitialSetupSecret,
      callback);
};


/**
 * @param {!proto.main.PaymentRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.IntentSecret>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.getInitialSetupSecret =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/GetInitialSetupSecret',
      request,
      metadata || {},
      methodDescriptor_StripeService_GetInitialSetupSecret);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.PaymentRegisterRequest,
 *   !proto.main.FCSSecret>}
 */
const methodDescriptor_StripeService_GetCustomerFCSecret = new grpc.web.MethodDescriptor(
  '/main.StripeService/GetCustomerFCSecret',
  grpc.web.MethodType.UNARY,
  proto.main.PaymentRegisterRequest,
  proto.main.FCSSecret,
  /**
   * @param {!proto.main.PaymentRegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.FCSSecret.deserializeBinary
);


/**
 * @param {!proto.main.PaymentRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.FCSSecret)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.FCSSecret>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.getCustomerFCSecret =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/GetCustomerFCSecret',
      request,
      metadata || {},
      methodDescriptor_StripeService_GetCustomerFCSecret,
      callback);
};


/**
 * @param {!proto.main.PaymentRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.FCSSecret>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.getCustomerFCSecret =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/GetCustomerFCSecret',
      request,
      metadata || {},
      methodDescriptor_StripeService_GetCustomerFCSecret);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.SetupConfirm,
 *   !proto.main.NullResponse>}
 */
const methodDescriptor_StripeService_ConfirmPaymentConnected = new grpc.web.MethodDescriptor(
  '/main.StripeService/ConfirmPaymentConnected',
  grpc.web.MethodType.UNARY,
  proto.main.SetupConfirm,
  communication_contract_pb.NullResponse,
  /**
   * @param {!proto.main.SetupConfirm} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_contract_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.main.SetupConfirm} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.confirmPaymentConnected =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/ConfirmPaymentConnected',
      request,
      metadata || {},
      methodDescriptor_StripeService_ConfirmPaymentConnected,
      callback);
};


/**
 * @param {!proto.main.SetupConfirm} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.NullResponse>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.confirmPaymentConnected =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/ConfirmPaymentConnected',
      request,
      metadata || {},
      methodDescriptor_StripeService_ConfirmPaymentConnected);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.ListRequest,
 *   !proto.main.BASet>}
 */
const methodDescriptor_StripeService_ListFcas = new grpc.web.MethodDescriptor(
  '/main.StripeService/ListFcas',
  grpc.web.MethodType.UNARY,
  proto.main.ListRequest,
  proto.main.BASet,
  /**
   * @param {!proto.main.ListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.BASet.deserializeBinary
);


/**
 * @param {!proto.main.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.BASet)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.BASet>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.listFcas =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/ListFcas',
      request,
      metadata || {},
      methodDescriptor_StripeService_ListFcas,
      callback);
};


/**
 * @param {!proto.main.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.BASet>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.listFcas =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/ListFcas',
      request,
      metadata || {},
      methodDescriptor_StripeService_ListFcas);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.ListRequest,
 *   !proto.main.BASet>}
 */
const methodDescriptor_StripeService_ListExBAs = new grpc.web.MethodDescriptor(
  '/main.StripeService/ListExBAs',
  grpc.web.MethodType.UNARY,
  proto.main.ListRequest,
  proto.main.BASet,
  /**
   * @param {!proto.main.ListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.BASet.deserializeBinary
);


/**
 * @param {!proto.main.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.BASet)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.BASet>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.listExBAs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/ListExBAs',
      request,
      metadata || {},
      methodDescriptor_StripeService_ListExBAs,
      callback);
};


/**
 * @param {!proto.main.ListRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.BASet>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.listExBAs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/ListExBAs',
      request,
      metadata || {},
      methodDescriptor_StripeService_ListExBAs);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.ExBaQuery,
 *   !proto.main.NullResponse>}
 */
const methodDescriptor_StripeService_DisconnectExBa = new grpc.web.MethodDescriptor(
  '/main.StripeService/DisconnectExBa',
  grpc.web.MethodType.UNARY,
  proto.main.ExBaQuery,
  communication_contract_pb.NullResponse,
  /**
   * @param {!proto.main.ExBaQuery} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_contract_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.main.ExBaQuery} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.disconnectExBa =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/DisconnectExBa',
      request,
      metadata || {},
      methodDescriptor_StripeService_DisconnectExBa,
      callback);
};


/**
 * @param {!proto.main.ExBaQuery} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.NullResponse>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.disconnectExBa =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/DisconnectExBa',
      request,
      metadata || {},
      methodDescriptor_StripeService_DisconnectExBa);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.FcaQuery,
 *   !proto.main.NullResponse>}
 */
const methodDescriptor_StripeService_DisconnectFca = new grpc.web.MethodDescriptor(
  '/main.StripeService/DisconnectFca',
  grpc.web.MethodType.UNARY,
  proto.main.FcaQuery,
  communication_contract_pb.NullResponse,
  /**
   * @param {!proto.main.FcaQuery} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_contract_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.main.FcaQuery} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.disconnectFca =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/DisconnectFca',
      request,
      metadata || {},
      methodDescriptor_StripeService_DisconnectFca,
      callback);
};


/**
 * @param {!proto.main.FcaQuery} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.NullResponse>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.disconnectFca =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/DisconnectFca',
      request,
      metadata || {},
      methodDescriptor_StripeService_DisconnectFca);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.FcaQuery,
 *   !proto.main.NullResponse>}
 */
const methodDescriptor_StripeService_SetDefaultFca = new grpc.web.MethodDescriptor(
  '/main.StripeService/SetDefaultFca',
  grpc.web.MethodType.UNARY,
  proto.main.FcaQuery,
  communication_contract_pb.NullResponse,
  /**
   * @param {!proto.main.FcaQuery} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  communication_contract_pb.NullResponse.deserializeBinary
);


/**
 * @param {!proto.main.FcaQuery} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.NullResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.NullResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.setDefaultFca =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/SetDefaultFca',
      request,
      metadata || {},
      methodDescriptor_StripeService_SetDefaultFca,
      callback);
};


/**
 * @param {!proto.main.FcaQuery} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.NullResponse>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.setDefaultFca =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/SetDefaultFca',
      request,
      metadata || {},
      methodDescriptor_StripeService_SetDefaultFca);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.IntentCreateReq,
 *   !proto.main.IntentSecret>}
 */
const methodDescriptor_StripeService_TestCharge = new grpc.web.MethodDescriptor(
  '/main.StripeService/TestCharge',
  grpc.web.MethodType.UNARY,
  proto.main.IntentCreateReq,
  proto.main.IntentSecret,
  /**
   * @param {!proto.main.IntentCreateReq} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.IntentSecret.deserializeBinary
);


/**
 * @param {!proto.main.IntentCreateReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.IntentSecret)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.IntentSecret>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.testCharge =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/TestCharge',
      request,
      metadata || {},
      methodDescriptor_StripeService_TestCharge,
      callback);
};


/**
 * @param {!proto.main.IntentCreateReq} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.IntentSecret>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.testCharge =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/TestCharge',
      request,
      metadata || {},
      methodDescriptor_StripeService_TestCharge);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.InternalChargeRequest,
 *   !proto.main.InternalChargeSet>}
 */
const methodDescriptor_StripeService_GetInternalCharges = new grpc.web.MethodDescriptor(
  '/main.StripeService/GetInternalCharges',
  grpc.web.MethodType.UNARY,
  proto.main.InternalChargeRequest,
  proto.main.InternalChargeSet,
  /**
   * @param {!proto.main.InternalChargeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.InternalChargeSet.deserializeBinary
);


/**
 * @param {!proto.main.InternalChargeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.InternalChargeSet)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.InternalChargeSet>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.StripeServiceClient.prototype.getInternalCharges =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.StripeService/GetInternalCharges',
      request,
      metadata || {},
      methodDescriptor_StripeService_GetInternalCharges,
      callback);
};


/**
 * @param {!proto.main.InternalChargeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.InternalChargeSet>}
 *     Promise that resolves to the response
 */
proto.main.StripeServicePromiseClient.prototype.getInternalCharges =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.StripeService/GetInternalCharges',
      request,
      metadata || {},
      methodDescriptor_StripeService_GetInternalCharges);
};


module.exports = proto.main;


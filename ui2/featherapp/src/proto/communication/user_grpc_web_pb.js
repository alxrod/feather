/**
 * @fileoverview gRPC-Web generated client stub for main
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.3.1
// 	protoc              v3.19.4
// source: communication/user.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.main = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.main.AuthClient =
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
proto.main.AuthPromiseClient =
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
 *   !proto.main.UserRegisterRequest,
 *   !proto.main.UserRegisterResponse>}
 */
const methodDescriptor_Auth_Register = new grpc.web.MethodDescriptor(
  '/main.Auth/Register',
  grpc.web.MethodType.UNARY,
  proto.main.UserRegisterRequest,
  proto.main.UserRegisterResponse,
  /**
   * @param {!proto.main.UserRegisterRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.UserRegisterResponse.deserializeBinary
);


/**
 * @param {!proto.main.UserRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.UserRegisterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.UserRegisterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.AuthClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Auth/Register',
      request,
      metadata || {},
      methodDescriptor_Auth_Register,
      callback);
};


/**
 * @param {!proto.main.UserRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.UserRegisterResponse>}
 *     Promise that resolves to the response
 */
proto.main.AuthPromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Auth/Register',
      request,
      metadata || {},
      methodDescriptor_Auth_Register);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.UserLoginRequest,
 *   !proto.main.UserLoginResponse>}
 */
const methodDescriptor_Auth_Login = new grpc.web.MethodDescriptor(
  '/main.Auth/Login',
  grpc.web.MethodType.UNARY,
  proto.main.UserLoginRequest,
  proto.main.UserLoginResponse,
  /**
   * @param {!proto.main.UserLoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.UserLoginResponse.deserializeBinary
);


/**
 * @param {!proto.main.UserLoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.UserLoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.UserLoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.AuthClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Auth/Login',
      request,
      metadata || {},
      methodDescriptor_Auth_Login,
      callback);
};


/**
 * @param {!proto.main.UserLoginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.UserLoginResponse>}
 *     Promise that resolves to the response
 */
proto.main.AuthPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Auth/Login',
      request,
      metadata || {},
      methodDescriptor_Auth_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.UserLogoutRequest,
 *   !proto.main.UserLogoutResponse>}
 */
const methodDescriptor_Auth_Logout = new grpc.web.MethodDescriptor(
  '/main.Auth/Logout',
  grpc.web.MethodType.UNARY,
  proto.main.UserLogoutRequest,
  proto.main.UserLogoutResponse,
  /**
   * @param {!proto.main.UserLogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.UserLogoutResponse.deserializeBinary
);


/**
 * @param {!proto.main.UserLogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.UserLogoutResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.UserLogoutResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.AuthClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Auth/Logout',
      request,
      metadata || {},
      methodDescriptor_Auth_Logout,
      callback);
};


/**
 * @param {!proto.main.UserLogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.UserLogoutResponse>}
 *     Promise that resolves to the response
 */
proto.main.AuthPromiseClient.prototype.logout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Auth/Logout',
      request,
      metadata || {},
      methodDescriptor_Auth_Logout);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.main.SocialClient =
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
proto.main.SocialPromiseClient =
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
 *   !proto.main.InstagramCreateRequest,
 *   !proto.main.SocialResponse>}
 */
const methodDescriptor_Social_AddInstagram = new grpc.web.MethodDescriptor(
  '/main.Social/AddInstagram',
  grpc.web.MethodType.UNARY,
  proto.main.InstagramCreateRequest,
  proto.main.SocialResponse,
  /**
   * @param {!proto.main.InstagramCreateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.SocialResponse.deserializeBinary
);


/**
 * @param {!proto.main.InstagramCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.SocialResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.SocialResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.SocialClient.prototype.addInstagram =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Social/AddInstagram',
      request,
      metadata || {},
      methodDescriptor_Social_AddInstagram,
      callback);
};


/**
 * @param {!proto.main.InstagramCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.SocialResponse>}
 *     Promise that resolves to the response
 */
proto.main.SocialPromiseClient.prototype.addInstagram =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Social/AddInstagram',
      request,
      metadata || {},
      methodDescriptor_Social_AddInstagram);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.TiktokCreateRequest,
 *   !proto.main.SocialResponse>}
 */
const methodDescriptor_Social_AddTiktok = new grpc.web.MethodDescriptor(
  '/main.Social/AddTiktok',
  grpc.web.MethodType.UNARY,
  proto.main.TiktokCreateRequest,
  proto.main.SocialResponse,
  /**
   * @param {!proto.main.TiktokCreateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.SocialResponse.deserializeBinary
);


/**
 * @param {!proto.main.TiktokCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.SocialResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.SocialResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.SocialClient.prototype.addTiktok =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Social/AddTiktok',
      request,
      metadata || {},
      methodDescriptor_Social_AddTiktok,
      callback);
};


/**
 * @param {!proto.main.TiktokCreateRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.SocialResponse>}
 *     Promise that resolves to the response
 */
proto.main.SocialPromiseClient.prototype.addTiktok =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Social/AddTiktok',
      request,
      metadata || {},
      methodDescriptor_Social_AddTiktok);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.InstagramVerifyRequest,
 *   !proto.main.SocialResponse>}
 */
const methodDescriptor_Social_VerifyInstagram = new grpc.web.MethodDescriptor(
  '/main.Social/VerifyInstagram',
  grpc.web.MethodType.UNARY,
  proto.main.InstagramVerifyRequest,
  proto.main.SocialResponse,
  /**
   * @param {!proto.main.InstagramVerifyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.SocialResponse.deserializeBinary
);


/**
 * @param {!proto.main.InstagramVerifyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.SocialResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.SocialResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.SocialClient.prototype.verifyInstagram =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Social/VerifyInstagram',
      request,
      metadata || {},
      methodDescriptor_Social_VerifyInstagram,
      callback);
};


/**
 * @param {!proto.main.InstagramVerifyRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.SocialResponse>}
 *     Promise that resolves to the response
 */
proto.main.SocialPromiseClient.prototype.verifyInstagram =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Social/VerifyInstagram',
      request,
      metadata || {},
      methodDescriptor_Social_VerifyInstagram);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.main.TiktokVerifyRequest,
 *   !proto.main.SocialResponse>}
 */
const methodDescriptor_Social_VerifyTiktok = new grpc.web.MethodDescriptor(
  '/main.Social/VerifyTiktok',
  grpc.web.MethodType.UNARY,
  proto.main.TiktokVerifyRequest,
  proto.main.SocialResponse,
  /**
   * @param {!proto.main.TiktokVerifyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.SocialResponse.deserializeBinary
);


/**
 * @param {!proto.main.TiktokVerifyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.SocialResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.SocialResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.SocialClient.prototype.verifyTiktok =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Social/VerifyTiktok',
      request,
      metadata || {},
      methodDescriptor_Social_VerifyTiktok,
      callback);
};


/**
 * @param {!proto.main.TiktokVerifyRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.SocialResponse>}
 *     Promise that resolves to the response
 */
proto.main.SocialPromiseClient.prototype.verifyTiktok =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Social/VerifyTiktok',
      request,
      metadata || {},
      methodDescriptor_Social_VerifyTiktok);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.main.PaymentClient =
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
proto.main.PaymentPromiseClient =
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
 *   !proto.main.PaymentSetupRequest,
 *   !proto.main.PaymentSetupResponse>}
 */
const methodDescriptor_Payment_SetupPayment = new grpc.web.MethodDescriptor(
  '/main.Payment/SetupPayment',
  grpc.web.MethodType.UNARY,
  proto.main.PaymentSetupRequest,
  proto.main.PaymentSetupResponse,
  /**
   * @param {!proto.main.PaymentSetupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.main.PaymentSetupResponse.deserializeBinary
);


/**
 * @param {!proto.main.PaymentSetupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.main.PaymentSetupResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.main.PaymentSetupResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.main.PaymentClient.prototype.setupPayment =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/main.Payment/SetupPayment',
      request,
      metadata || {},
      methodDescriptor_Payment_SetupPayment,
      callback);
};


/**
 * @param {!proto.main.PaymentSetupRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.main.PaymentSetupResponse>}
 *     Promise that resolves to the response
 */
proto.main.PaymentPromiseClient.prototype.setupPayment =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/main.Payment/SetupPayment',
      request,
      metadata || {},
      methodDescriptor_Payment_SetupPayment);
};


module.exports = proto.main;


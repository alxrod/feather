// source: communication/contract.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
goog.exportSymbol('proto.communication.ClaimContractRequest', null, global);
goog.exportSymbol('proto.communication.ConfirmDeadlineRequest', null, global);
goog.exportSymbol('proto.communication.ContractAdminSupport', null, global);
goog.exportSymbol('proto.communication.ContractCreateRequest', null, global);
goog.exportSymbol('proto.communication.ContractDeleteDraftRequest', null, global);
goog.exportSymbol('proto.communication.ContractEditResponse', null, global);
goog.exportSymbol('proto.communication.ContractEntity', null, global);
goog.exportSymbol('proto.communication.ContractFinishCreationRequest', null, global);
goog.exportSymbol('proto.communication.ContractInviteNub', null, global);
goog.exportSymbol('proto.communication.ContractNub', null, global);
goog.exportSymbol('proto.communication.ContractNubSet', null, global);
goog.exportSymbol('proto.communication.ContractReactAddDeadline', null, global);
goog.exportSymbol('proto.communication.ContractReactAddItem', null, global);
goog.exportSymbol('proto.communication.ContractReactDate', null, global);
goog.exportSymbol('proto.communication.ContractReactDeadlineItems', null, global);
goog.exportSymbol('proto.communication.ContractReactDelDeadline', null, global);
goog.exportSymbol('proto.communication.ContractReactDelItem', null, global);
goog.exportSymbol('proto.communication.ContractReactItem', null, global);
goog.exportSymbol('proto.communication.ContractReactLockRequest', null, global);
goog.exportSymbol('proto.communication.ContractReactPayout', null, global);
goog.exportSymbol('proto.communication.ContractReactPrice', null, global);
goog.exportSymbol('proto.communication.ContractResponse', null, global);
goog.exportSymbol('proto.communication.ContractSettleItemRequest', null, global);
goog.exportSymbol('proto.communication.ContractSuggestAddDeadline', null, global);
goog.exportSymbol('proto.communication.ContractSuggestAddItem', null, global);
goog.exportSymbol('proto.communication.ContractSuggestDate', null, global);
goog.exportSymbol('proto.communication.ContractSuggestDeadlineItems', null, global);
goog.exportSymbol('proto.communication.ContractSuggestDelDeadline', null, global);
goog.exportSymbol('proto.communication.ContractSuggestDelItem', null, global);
goog.exportSymbol('proto.communication.ContractSuggestItem', null, global);
goog.exportSymbol('proto.communication.ContractSuggestPayout', null, global);
goog.exportSymbol('proto.communication.ContractSuggestPrice', null, global);
goog.exportSymbol('proto.communication.ContractToggleLockRequest', null, global);
goog.exportSymbol('proto.communication.ContractUpdateRequest', null, global);
goog.exportSymbol('proto.communication.DeadlineEntity', null, global);
goog.exportSymbol('proto.communication.DeadlineNub', null, global);
goog.exportSymbol('proto.communication.EmailChangeRequest', null, global);
goog.exportSymbol('proto.communication.EmailChangeResponse', null, global);
goog.exportSymbol('proto.communication.EmailResendRequest', null, global);
goog.exportSymbol('proto.communication.FigmaFileConnectRequest', null, global);
goog.exportSymbol('proto.communication.FigmaItemRequest', null, global);
goog.exportSymbol('proto.communication.FigmaLinkRequest', null, global);
goog.exportSymbol('proto.communication.FinishDeadlineRequest', null, global);
goog.exportSymbol('proto.communication.InviteDataRequest', null, global);
goog.exportSymbol('proto.communication.ItemEntity', null, global);
goog.exportSymbol('proto.communication.ItemNub', null, global);
goog.exportSymbol('proto.communication.NullResponse', null, global);
goog.exportSymbol('proto.communication.PriceEntity', null, global);
goog.exportSymbol('proto.communication.QueryByIdRequest', null, global);
goog.exportSymbol('proto.communication.QueryByUserRequest', null, global);
goog.exportSymbol('proto.communication.SettleContractRequest', null, global);
goog.exportSymbol('proto.communication.SignContractRequest', null, global);
goog.exportSymbol('proto.communication.UndoDeadlineRequest', null, global);
goog.exportSymbol('proto.communication.UserNubEntity', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.PriceEntity = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.PriceEntity, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.PriceEntity.displayName = 'proto.communication.PriceEntity';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.DeadlineEntity = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.communication.DeadlineEntity.repeatedFields_, null);
};
goog.inherits(proto.communication.DeadlineEntity, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.DeadlineEntity.displayName = 'proto.communication.DeadlineEntity';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.DeadlineNub = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.DeadlineNub, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.DeadlineNub.displayName = 'proto.communication.DeadlineNub';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractEntity = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.communication.ContractEntity.repeatedFields_, null);
};
goog.inherits(proto.communication.ContractEntity, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractEntity.displayName = 'proto.communication.ContractEntity';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractNub = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.communication.ContractNub.repeatedFields_, null);
};
goog.inherits(proto.communication.ContractNub, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractNub.displayName = 'proto.communication.ContractNub';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.InviteDataRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.InviteDataRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.InviteDataRequest.displayName = 'proto.communication.InviteDataRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractInviteNub = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.communication.ContractInviteNub.repeatedFields_, null);
};
goog.inherits(proto.communication.ContractInviteNub, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractInviteNub.displayName = 'proto.communication.ContractInviteNub';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractNubSet = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.communication.ContractNubSet.repeatedFields_, null);
};
goog.inherits(proto.communication.ContractNubSet, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractNubSet.displayName = 'proto.communication.ContractNubSet';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.UserNubEntity = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.UserNubEntity, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.UserNubEntity.displayName = 'proto.communication.UserNubEntity';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ItemEntity = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ItemEntity, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ItemEntity.displayName = 'proto.communication.ItemEntity';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ItemNub = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ItemNub, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ItemNub.displayName = 'proto.communication.ItemNub';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractCreateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.communication.ContractCreateRequest.repeatedFields_, null);
};
goog.inherits(proto.communication.ContractCreateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractCreateRequest.displayName = 'proto.communication.ContractCreateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractFinishCreationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractFinishCreationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractFinishCreationRequest.displayName = 'proto.communication.ContractFinishCreationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractUpdateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.communication.ContractUpdateRequest.repeatedFields_, null);
};
goog.inherits(proto.communication.ContractUpdateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractUpdateRequest.displayName = 'proto.communication.ContractUpdateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.QueryByIdRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.QueryByIdRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.QueryByIdRequest.displayName = 'proto.communication.QueryByIdRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractSuggestPrice = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractSuggestPrice, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractSuggestPrice.displayName = 'proto.communication.ContractSuggestPrice';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractReactPrice = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractReactPrice, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractReactPrice.displayName = 'proto.communication.ContractReactPrice';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractSuggestDate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractSuggestDate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractSuggestDate.displayName = 'proto.communication.ContractSuggestDate';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractSuggestPayout = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractSuggestPayout, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractSuggestPayout.displayName = 'proto.communication.ContractSuggestPayout';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractSuggestDeadlineItems = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.communication.ContractSuggestDeadlineItems.repeatedFields_, null);
};
goog.inherits(proto.communication.ContractSuggestDeadlineItems, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractSuggestDeadlineItems.displayName = 'proto.communication.ContractSuggestDeadlineItems';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractReactDeadlineItems = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractReactDeadlineItems, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractReactDeadlineItems.displayName = 'proto.communication.ContractReactDeadlineItems';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractReactDate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractReactDate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractReactDate.displayName = 'proto.communication.ContractReactDate';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractReactPayout = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractReactPayout, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractReactPayout.displayName = 'proto.communication.ContractReactPayout';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractSuggestItem = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractSuggestItem, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractSuggestItem.displayName = 'proto.communication.ContractSuggestItem';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractReactItem = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractReactItem, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractReactItem.displayName = 'proto.communication.ContractReactItem';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractSuggestAddItem = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractSuggestAddItem, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractSuggestAddItem.displayName = 'proto.communication.ContractSuggestAddItem';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractReactAddItem = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractReactAddItem, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractReactAddItem.displayName = 'proto.communication.ContractReactAddItem';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractSuggestDelItem = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractSuggestDelItem, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractSuggestDelItem.displayName = 'proto.communication.ContractSuggestDelItem';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractReactDelItem = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractReactDelItem, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractReactDelItem.displayName = 'proto.communication.ContractReactDelItem';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractSuggestAddDeadline = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractSuggestAddDeadline, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractSuggestAddDeadline.displayName = 'proto.communication.ContractSuggestAddDeadline';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractReactAddDeadline = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractReactAddDeadline, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractReactAddDeadline.displayName = 'proto.communication.ContractReactAddDeadline';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractSuggestDelDeadline = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractSuggestDelDeadline, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractSuggestDelDeadline.displayName = 'proto.communication.ContractSuggestDelDeadline';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractReactDelDeadline = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractReactDelDeadline, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractReactDelDeadline.displayName = 'proto.communication.ContractReactDelDeadline';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractResponse.displayName = 'proto.communication.ContractResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.QueryByUserRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.QueryByUserRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.QueryByUserRequest.displayName = 'proto.communication.QueryByUserRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ClaimContractRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ClaimContractRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ClaimContractRequest.displayName = 'proto.communication.ClaimContractRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.SignContractRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.SignContractRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.SignContractRequest.displayName = 'proto.communication.SignContractRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.SettleContractRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.SettleContractRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.SettleContractRequest.displayName = 'proto.communication.SettleContractRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.FinishDeadlineRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.FinishDeadlineRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.FinishDeadlineRequest.displayName = 'proto.communication.FinishDeadlineRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ConfirmDeadlineRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ConfirmDeadlineRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ConfirmDeadlineRequest.displayName = 'proto.communication.ConfirmDeadlineRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.UndoDeadlineRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.UndoDeadlineRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.UndoDeadlineRequest.displayName = 'proto.communication.UndoDeadlineRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractAdminSupport = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractAdminSupport, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractAdminSupport.displayName = 'proto.communication.ContractAdminSupport';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractToggleLockRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractToggleLockRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractToggleLockRequest.displayName = 'proto.communication.ContractToggleLockRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractReactLockRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractReactLockRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractReactLockRequest.displayName = 'proto.communication.ContractReactLockRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractSettleItemRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractSettleItemRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractSettleItemRequest.displayName = 'proto.communication.ContractSettleItemRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractDeleteDraftRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractDeleteDraftRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractDeleteDraftRequest.displayName = 'proto.communication.ContractDeleteDraftRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.NullResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.NullResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.NullResponse.displayName = 'proto.communication.NullResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.ContractEditResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.ContractEditResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.ContractEditResponse.displayName = 'proto.communication.ContractEditResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.EmailChangeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.EmailChangeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.EmailChangeRequest.displayName = 'proto.communication.EmailChangeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.EmailChangeResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.EmailChangeResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.EmailChangeResponse.displayName = 'proto.communication.EmailChangeResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.EmailResendRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.EmailResendRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.EmailResendRequest.displayName = 'proto.communication.EmailResendRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.FigmaLinkRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.FigmaLinkRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.FigmaLinkRequest.displayName = 'proto.communication.FigmaLinkRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.FigmaItemRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.FigmaItemRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.FigmaItemRequest.displayName = 'proto.communication.FigmaItemRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.communication.FigmaFileConnectRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.communication.FigmaFileConnectRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.communication.FigmaFileConnectRequest.displayName = 'proto.communication.FigmaFileConnectRequest';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.PriceEntity.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.PriceEntity.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.PriceEntity} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.PriceEntity.toObject = function(includeInstance, msg) {
  var f, obj = {
    current: jspb.Message.getFieldWithDefault(msg, 1, 0),
    buyer: jspb.Message.getFieldWithDefault(msg, 2, 0),
    worker: jspb.Message.getFieldWithDefault(msg, 3, 0),
    awaitingApproval: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    proposerId: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.PriceEntity}
 */
proto.communication.PriceEntity.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.PriceEntity;
  return proto.communication.PriceEntity.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.PriceEntity} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.PriceEntity}
 */
proto.communication.PriceEntity.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCurrent(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBuyer(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setWorker(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAwaitingApproval(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setProposerId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.PriceEntity.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.PriceEntity.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.PriceEntity} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.PriceEntity.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCurrent();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getBuyer();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getWorker();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getAwaitingApproval();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getProposerId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional int64 current = 1;
 * @return {number}
 */
proto.communication.PriceEntity.prototype.getCurrent = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.PriceEntity} returns this
 */
proto.communication.PriceEntity.prototype.setCurrent = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 buyer = 2;
 * @return {number}
 */
proto.communication.PriceEntity.prototype.getBuyer = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.PriceEntity} returns this
 */
proto.communication.PriceEntity.prototype.setBuyer = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 worker = 3;
 * @return {number}
 */
proto.communication.PriceEntity.prototype.getWorker = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.PriceEntity} returns this
 */
proto.communication.PriceEntity.prototype.setWorker = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bool awaiting_approval = 4;
 * @return {boolean}
 */
proto.communication.PriceEntity.prototype.getAwaitingApproval = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.PriceEntity} returns this
 */
proto.communication.PriceEntity.prototype.setAwaitingApproval = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional string proposer_id = 5;
 * @return {string}
 */
proto.communication.PriceEntity.prototype.getProposerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.PriceEntity} returns this
 */
proto.communication.PriceEntity.prototype.setProposerId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.communication.DeadlineEntity.repeatedFields_ = [24,14];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.DeadlineEntity.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.DeadlineEntity.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.DeadlineEntity} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.DeadlineEntity.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    name: jspb.Message.getFieldWithDefault(msg, 18, ""),
    complete: jspb.Message.getBooleanFieldWithDefault(msg, 25, false),
    expired: jspb.Message.getBooleanFieldWithDefault(msg, 31, false),
    buyerSettled: jspb.Message.getBooleanFieldWithDefault(msg, 27, false),
    awaitingCreation: jspb.Message.getBooleanFieldWithDefault(msg, 20, false),
    awaitingDeletion: jspb.Message.getBooleanFieldWithDefault(msg, 21, false),
    deadlineProposerId: jspb.Message.getFieldWithDefault(msg, 22, ""),
    currentPayout: jspb.Message.getFieldWithDefault(msg, 4, 0),
    workerPayout: jspb.Message.getFieldWithDefault(msg, 7, 0),
    buyerPayout: jspb.Message.getFieldWithDefault(msg, 10, 0),
    payoutAwaitingApproval: jspb.Message.getBooleanFieldWithDefault(msg, 12, false),
    payoutProposerId: jspb.Message.getFieldWithDefault(msg, 13, ""),
    currentDate: (f = msg.getCurrentDate()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    workerDate: (f = msg.getWorkerDate()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    buyerDate: (f = msg.getBuyerDate()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    dateAwaitingApproval: jspb.Message.getBooleanFieldWithDefault(msg, 16, false),
    dateProposerId: jspb.Message.getFieldWithDefault(msg, 17, ""),
    draftRequired: jspb.Message.getBooleanFieldWithDefault(msg, 19, false),
    itemsProposerId: jspb.Message.getFieldWithDefault(msg, 23, ""),
    itemStatesList: (f = jspb.Message.getRepeatedField(msg, 24)) == null ? undefined : f,
    itemsList: jspb.Message.toObjectList(msg.getItemsList(),
    proto.communication.ItemNub.toObject, includeInstance),
    itemsAwaitingApproval: jspb.Message.getBooleanFieldWithDefault(msg, 15, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.DeadlineEntity}
 */
proto.communication.DeadlineEntity.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.DeadlineEntity;
  return proto.communication.DeadlineEntity.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.DeadlineEntity} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.DeadlineEntity}
 */
proto.communication.DeadlineEntity.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 18:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 25:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setComplete(value);
      break;
    case 31:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setExpired(value);
      break;
    case 27:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBuyerSettled(value);
      break;
    case 20:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAwaitingCreation(value);
      break;
    case 21:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAwaitingDeletion(value);
      break;
    case 22:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineProposerId(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCurrentPayout(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setWorkerPayout(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setBuyerPayout(value);
      break;
    case 12:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPayoutAwaitingApproval(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setPayoutProposerId(value);
      break;
    case 5:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setCurrentDate(value);
      break;
    case 8:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setWorkerDate(value);
      break;
    case 11:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setBuyerDate(value);
      break;
    case 16:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDateAwaitingApproval(value);
      break;
    case 17:
      var value = /** @type {string} */ (reader.readString());
      msg.setDateProposerId(value);
      break;
    case 19:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDraftRequired(value);
      break;
    case 23:
      var value = /** @type {string} */ (reader.readString());
      msg.setItemsProposerId(value);
      break;
    case 24:
      var values = /** @type {!Array<number>} */ (reader.isDelimited() ? reader.readPackedUint32() : [reader.readUint32()]);
      for (var i = 0; i < values.length; i++) {
        msg.addItemStates(values[i]);
      }
      break;
    case 14:
      var value = new proto.communication.ItemNub;
      reader.readMessage(value,proto.communication.ItemNub.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    case 15:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setItemsAwaitingApproval(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.DeadlineEntity.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.DeadlineEntity.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.DeadlineEntity} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.DeadlineEntity.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      18,
      f
    );
  }
  f = message.getComplete();
  if (f) {
    writer.writeBool(
      25,
      f
    );
  }
  f = message.getExpired();
  if (f) {
    writer.writeBool(
      31,
      f
    );
  }
  f = message.getBuyerSettled();
  if (f) {
    writer.writeBool(
      27,
      f
    );
  }
  f = message.getAwaitingCreation();
  if (f) {
    writer.writeBool(
      20,
      f
    );
  }
  f = message.getAwaitingDeletion();
  if (f) {
    writer.writeBool(
      21,
      f
    );
  }
  f = message.getDeadlineProposerId();
  if (f.length > 0) {
    writer.writeString(
      22,
      f
    );
  }
  f = message.getCurrentPayout();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getWorkerPayout();
  if (f !== 0) {
    writer.writeInt64(
      7,
      f
    );
  }
  f = message.getBuyerPayout();
  if (f !== 0) {
    writer.writeInt64(
      10,
      f
    );
  }
  f = message.getPayoutAwaitingApproval();
  if (f) {
    writer.writeBool(
      12,
      f
    );
  }
  f = message.getPayoutProposerId();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = message.getCurrentDate();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getWorkerDate();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getBuyerDate();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getDateAwaitingApproval();
  if (f) {
    writer.writeBool(
      16,
      f
    );
  }
  f = message.getDateProposerId();
  if (f.length > 0) {
    writer.writeString(
      17,
      f
    );
  }
  f = message.getDraftRequired();
  if (f) {
    writer.writeBool(
      19,
      f
    );
  }
  f = message.getItemsProposerId();
  if (f.length > 0) {
    writer.writeString(
      23,
      f
    );
  }
  f = message.getItemStatesList();
  if (f.length > 0) {
    writer.writePackedUint32(
      24,
      f
    );
  }
  f = message.getItemsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      14,
      f,
      proto.communication.ItemNub.serializeBinaryToWriter
    );
  }
  f = message.getItemsAwaitingApproval();
  if (f) {
    writer.writeBool(
      15,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.communication.DeadlineEntity.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.DeadlineEntity.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string name = 18;
 * @return {string}
 */
proto.communication.DeadlineEntity.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 18, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 18, value);
};


/**
 * optional bool complete = 25;
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.getComplete = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 25, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setComplete = function(value) {
  return jspb.Message.setProto3BooleanField(this, 25, value);
};


/**
 * optional bool expired = 31;
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.getExpired = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 31, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setExpired = function(value) {
  return jspb.Message.setProto3BooleanField(this, 31, value);
};


/**
 * optional bool buyer_settled = 27;
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.getBuyerSettled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 27, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setBuyerSettled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 27, value);
};


/**
 * optional bool awaiting_creation = 20;
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.getAwaitingCreation = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 20, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setAwaitingCreation = function(value) {
  return jspb.Message.setProto3BooleanField(this, 20, value);
};


/**
 * optional bool awaiting_deletion = 21;
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.getAwaitingDeletion = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 21, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setAwaitingDeletion = function(value) {
  return jspb.Message.setProto3BooleanField(this, 21, value);
};


/**
 * optional string deadline_proposer_id = 22;
 * @return {string}
 */
proto.communication.DeadlineEntity.prototype.getDeadlineProposerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 22, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setDeadlineProposerId = function(value) {
  return jspb.Message.setProto3StringField(this, 22, value);
};


/**
 * optional int64 current_payout = 4;
 * @return {number}
 */
proto.communication.DeadlineEntity.prototype.getCurrentPayout = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setCurrentPayout = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 worker_payout = 7;
 * @return {number}
 */
proto.communication.DeadlineEntity.prototype.getWorkerPayout = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setWorkerPayout = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int64 buyer_payout = 10;
 * @return {number}
 */
proto.communication.DeadlineEntity.prototype.getBuyerPayout = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setBuyerPayout = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional bool payout_awaiting_approval = 12;
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.getPayoutAwaitingApproval = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 12, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setPayoutAwaitingApproval = function(value) {
  return jspb.Message.setProto3BooleanField(this, 12, value);
};


/**
 * optional string payout_proposer_id = 13;
 * @return {string}
 */
proto.communication.DeadlineEntity.prototype.getPayoutProposerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setPayoutProposerId = function(value) {
  return jspb.Message.setProto3StringField(this, 13, value);
};


/**
 * optional google.protobuf.Timestamp current_date = 5;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.communication.DeadlineEntity.prototype.getCurrentDate = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 5));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.communication.DeadlineEntity} returns this
*/
proto.communication.DeadlineEntity.prototype.setCurrentDate = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.clearCurrentDate = function() {
  return this.setCurrentDate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.hasCurrentDate = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional google.protobuf.Timestamp worker_date = 8;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.communication.DeadlineEntity.prototype.getWorkerDate = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 8));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.communication.DeadlineEntity} returns this
*/
proto.communication.DeadlineEntity.prototype.setWorkerDate = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.clearWorkerDate = function() {
  return this.setWorkerDate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.hasWorkerDate = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional google.protobuf.Timestamp buyer_date = 11;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.communication.DeadlineEntity.prototype.getBuyerDate = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 11));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.communication.DeadlineEntity} returns this
*/
proto.communication.DeadlineEntity.prototype.setBuyerDate = function(value) {
  return jspb.Message.setWrapperField(this, 11, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.clearBuyerDate = function() {
  return this.setBuyerDate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.hasBuyerDate = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional bool date_awaiting_approval = 16;
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.getDateAwaitingApproval = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 16, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setDateAwaitingApproval = function(value) {
  return jspb.Message.setProto3BooleanField(this, 16, value);
};


/**
 * optional string date_proposer_id = 17;
 * @return {string}
 */
proto.communication.DeadlineEntity.prototype.getDateProposerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 17, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setDateProposerId = function(value) {
  return jspb.Message.setProto3StringField(this, 17, value);
};


/**
 * optional bool draft_required = 19;
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.getDraftRequired = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 19, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setDraftRequired = function(value) {
  return jspb.Message.setProto3BooleanField(this, 19, value);
};


/**
 * optional string items_proposer_id = 23;
 * @return {string}
 */
proto.communication.DeadlineEntity.prototype.getItemsProposerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 23, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setItemsProposerId = function(value) {
  return jspb.Message.setProto3StringField(this, 23, value);
};


/**
 * repeated uint32 item_states = 24;
 * @return {!Array<number>}
 */
proto.communication.DeadlineEntity.prototype.getItemStatesList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 24));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setItemStatesList = function(value) {
  return jspb.Message.setField(this, 24, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.addItemStates = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 24, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.clearItemStatesList = function() {
  return this.setItemStatesList([]);
};


/**
 * repeated ItemNub items = 14;
 * @return {!Array<!proto.communication.ItemNub>}
 */
proto.communication.DeadlineEntity.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.communication.ItemNub>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.ItemNub, 14));
};


/**
 * @param {!Array<!proto.communication.ItemNub>} value
 * @return {!proto.communication.DeadlineEntity} returns this
*/
proto.communication.DeadlineEntity.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 14, value);
};


/**
 * @param {!proto.communication.ItemNub=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.ItemNub}
 */
proto.communication.DeadlineEntity.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 14, opt_value, proto.communication.ItemNub, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};


/**
 * optional bool items_awaiting_approval = 15;
 * @return {boolean}
 */
proto.communication.DeadlineEntity.prototype.getItemsAwaitingApproval = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 15, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineEntity} returns this
 */
proto.communication.DeadlineEntity.prototype.setItemsAwaitingApproval = function(value) {
  return jspb.Message.setProto3BooleanField(this, 15, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.DeadlineNub.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.DeadlineNub.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.DeadlineNub} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.DeadlineNub.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    complete: jspb.Message.getBooleanFieldWithDefault(msg, 25, false),
    expired: jspb.Message.getBooleanFieldWithDefault(msg, 31, false),
    currentPayout: jspb.Message.getFieldWithDefault(msg, 4, 0),
    currentDate: (f = msg.getCurrentDate()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.DeadlineNub}
 */
proto.communication.DeadlineNub.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.DeadlineNub;
  return proto.communication.DeadlineNub.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.DeadlineNub} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.DeadlineNub}
 */
proto.communication.DeadlineNub.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 25:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setComplete(value);
      break;
    case 31:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setExpired(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setCurrentPayout(value);
      break;
    case 5:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setCurrentDate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.DeadlineNub.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.DeadlineNub.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.DeadlineNub} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.DeadlineNub.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getComplete();
  if (f) {
    writer.writeBool(
      25,
      f
    );
  }
  f = message.getExpired();
  if (f) {
    writer.writeBool(
      31,
      f
    );
  }
  f = message.getCurrentPayout();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getCurrentDate();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.communication.DeadlineNub.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.DeadlineNub} returns this
 */
proto.communication.DeadlineNub.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.DeadlineNub.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.DeadlineNub} returns this
 */
proto.communication.DeadlineNub.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool complete = 25;
 * @return {boolean}
 */
proto.communication.DeadlineNub.prototype.getComplete = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 25, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineNub} returns this
 */
proto.communication.DeadlineNub.prototype.setComplete = function(value) {
  return jspb.Message.setProto3BooleanField(this, 25, value);
};


/**
 * optional bool expired = 31;
 * @return {boolean}
 */
proto.communication.DeadlineNub.prototype.getExpired = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 31, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.DeadlineNub} returns this
 */
proto.communication.DeadlineNub.prototype.setExpired = function(value) {
  return jspb.Message.setProto3BooleanField(this, 31, value);
};


/**
 * optional int64 current_payout = 4;
 * @return {number}
 */
proto.communication.DeadlineNub.prototype.getCurrentPayout = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.DeadlineNub} returns this
 */
proto.communication.DeadlineNub.prototype.setCurrentPayout = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional google.protobuf.Timestamp current_date = 5;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.communication.DeadlineNub.prototype.getCurrentDate = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 5));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.communication.DeadlineNub} returns this
*/
proto.communication.DeadlineNub.prototype.setCurrentDate = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.DeadlineNub} returns this
 */
proto.communication.DeadlineNub.prototype.clearCurrentDate = function() {
  return this.setCurrentDate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.DeadlineNub.prototype.hasCurrentDate = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.communication.ContractEntity.repeatedFields_ = [5,7];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractEntity.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractEntity.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractEntity} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractEntity.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    invitedEmail: jspb.Message.getFieldWithDefault(msg, 11, ""),
    invitePassword: jspb.Message.getFieldWithDefault(msg, 18, ""),
    linkShare: jspb.Message.getBooleanFieldWithDefault(msg, 22, false),
    worker: (f = msg.getWorker()) && proto.communication.UserNubEntity.toObject(includeInstance, f),
    buyer: (f = msg.getBuyer()) && proto.communication.UserNubEntity.toObject(includeInstance, f),
    price: (f = msg.getPrice()) && proto.communication.PriceEntity.toObject(includeInstance, f),
    deadlinesList: jspb.Message.toObjectList(msg.getDeadlinesList(),
    proto.communication.DeadlineEntity.toObject, includeInstance),
    currentDeadlineId: jspb.Message.getFieldWithDefault(msg, 15, ""),
    title: jspb.Message.getFieldWithDefault(msg, 8, ""),
    summary: jspb.Message.getFieldWithDefault(msg, 6, ""),
    stage: jspb.Message.getFieldWithDefault(msg, 9, 0),
    universalLock: jspb.Message.getBooleanFieldWithDefault(msg, 14, false),
    workerApproved: jspb.Message.getBooleanFieldWithDefault(msg, 12, false),
    buyerApproved: jspb.Message.getBooleanFieldWithDefault(msg, 13, false),
    itemsList: jspb.Message.toObjectList(msg.getItemsList(),
    proto.communication.ItemEntity.toObject, includeInstance),
    roomId: jspb.Message.getFieldWithDefault(msg, 10, ""),
    disputed: jspb.Message.getBooleanFieldWithDefault(msg, 16, false),
    adminRequested: jspb.Message.getBooleanFieldWithDefault(msg, 17, false),
    figmaLink: jspb.Message.getFieldWithDefault(msg, 19, ""),
    figmaFileKey: jspb.Message.getFieldWithDefault(msg, 21, ""),
    figmaConnected: jspb.Message.getBooleanFieldWithDefault(msg, 20, false),
    freeStatus: jspb.Message.getBooleanFieldWithDefault(msg, 23, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractEntity}
 */
proto.communication.ContractEntity.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractEntity;
  return proto.communication.ContractEntity.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractEntity} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractEntity}
 */
proto.communication.ContractEntity.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setInvitedEmail(value);
      break;
    case 18:
      var value = /** @type {string} */ (reader.readString());
      msg.setInvitePassword(value);
      break;
    case 22:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setLinkShare(value);
      break;
    case 2:
      var value = new proto.communication.UserNubEntity;
      reader.readMessage(value,proto.communication.UserNubEntity.deserializeBinaryFromReader);
      msg.setWorker(value);
      break;
    case 3:
      var value = new proto.communication.UserNubEntity;
      reader.readMessage(value,proto.communication.UserNubEntity.deserializeBinaryFromReader);
      msg.setBuyer(value);
      break;
    case 4:
      var value = new proto.communication.PriceEntity;
      reader.readMessage(value,proto.communication.PriceEntity.deserializeBinaryFromReader);
      msg.setPrice(value);
      break;
    case 5:
      var value = new proto.communication.DeadlineEntity;
      reader.readMessage(value,proto.communication.DeadlineEntity.deserializeBinaryFromReader);
      msg.addDeadlines(value);
      break;
    case 15:
      var value = /** @type {string} */ (reader.readString());
      msg.setCurrentDeadlineId(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setSummary(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStage(value);
      break;
    case 14:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUniversalLock(value);
      break;
    case 12:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setWorkerApproved(value);
      break;
    case 13:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBuyerApproved(value);
      break;
    case 7:
      var value = new proto.communication.ItemEntity;
      reader.readMessage(value,proto.communication.ItemEntity.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setRoomId(value);
      break;
    case 16:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDisputed(value);
      break;
    case 17:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAdminRequested(value);
      break;
    case 19:
      var value = /** @type {string} */ (reader.readString());
      msg.setFigmaLink(value);
      break;
    case 21:
      var value = /** @type {string} */ (reader.readString());
      msg.setFigmaFileKey(value);
      break;
    case 20:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFigmaConnected(value);
      break;
    case 23:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFreeStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractEntity.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractEntity.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractEntity} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractEntity.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInvitedEmail();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getInvitePassword();
  if (f.length > 0) {
    writer.writeString(
      18,
      f
    );
  }
  f = message.getLinkShare();
  if (f) {
    writer.writeBool(
      22,
      f
    );
  }
  f = message.getWorker();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.communication.UserNubEntity.serializeBinaryToWriter
    );
  }
  f = message.getBuyer();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.communication.UserNubEntity.serializeBinaryToWriter
    );
  }
  f = message.getPrice();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.communication.PriceEntity.serializeBinaryToWriter
    );
  }
  f = message.getDeadlinesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.communication.DeadlineEntity.serializeBinaryToWriter
    );
  }
  f = message.getCurrentDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      15,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getSummary();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getStage();
  if (f !== 0) {
    writer.writeUint32(
      9,
      f
    );
  }
  f = message.getUniversalLock();
  if (f) {
    writer.writeBool(
      14,
      f
    );
  }
  f = message.getWorkerApproved();
  if (f) {
    writer.writeBool(
      12,
      f
    );
  }
  f = message.getBuyerApproved();
  if (f) {
    writer.writeBool(
      13,
      f
    );
  }
  f = message.getItemsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.communication.ItemEntity.serializeBinaryToWriter
    );
  }
  f = message.getRoomId();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getDisputed();
  if (f) {
    writer.writeBool(
      16,
      f
    );
  }
  f = message.getAdminRequested();
  if (f) {
    writer.writeBool(
      17,
      f
    );
  }
  f = message.getFigmaLink();
  if (f.length > 0) {
    writer.writeString(
      19,
      f
    );
  }
  f = message.getFigmaFileKey();
  if (f.length > 0) {
    writer.writeString(
      21,
      f
    );
  }
  f = message.getFigmaConnected();
  if (f) {
    writer.writeBool(
      20,
      f
    );
  }
  f = message.getFreeStatus();
  if (f) {
    writer.writeBool(
      23,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.communication.ContractEntity.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string invited_email = 11;
 * @return {string}
 */
proto.communication.ContractEntity.prototype.getInvitedEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setInvitedEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * optional string invite_password = 18;
 * @return {string}
 */
proto.communication.ContractEntity.prototype.getInvitePassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 18, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setInvitePassword = function(value) {
  return jspb.Message.setProto3StringField(this, 18, value);
};


/**
 * optional bool link_share = 22;
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.getLinkShare = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 22, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setLinkShare = function(value) {
  return jspb.Message.setProto3BooleanField(this, 22, value);
};


/**
 * optional UserNubEntity worker = 2;
 * @return {?proto.communication.UserNubEntity}
 */
proto.communication.ContractEntity.prototype.getWorker = function() {
  return /** @type{?proto.communication.UserNubEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.UserNubEntity, 2));
};


/**
 * @param {?proto.communication.UserNubEntity|undefined} value
 * @return {!proto.communication.ContractEntity} returns this
*/
proto.communication.ContractEntity.prototype.setWorker = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.clearWorker = function() {
  return this.setWorker(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.hasWorker = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional UserNubEntity buyer = 3;
 * @return {?proto.communication.UserNubEntity}
 */
proto.communication.ContractEntity.prototype.getBuyer = function() {
  return /** @type{?proto.communication.UserNubEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.UserNubEntity, 3));
};


/**
 * @param {?proto.communication.UserNubEntity|undefined} value
 * @return {!proto.communication.ContractEntity} returns this
*/
proto.communication.ContractEntity.prototype.setBuyer = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.clearBuyer = function() {
  return this.setBuyer(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.hasBuyer = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional PriceEntity price = 4;
 * @return {?proto.communication.PriceEntity}
 */
proto.communication.ContractEntity.prototype.getPrice = function() {
  return /** @type{?proto.communication.PriceEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.PriceEntity, 4));
};


/**
 * @param {?proto.communication.PriceEntity|undefined} value
 * @return {!proto.communication.ContractEntity} returns this
*/
proto.communication.ContractEntity.prototype.setPrice = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.clearPrice = function() {
  return this.setPrice(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.hasPrice = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * repeated DeadlineEntity deadlines = 5;
 * @return {!Array<!proto.communication.DeadlineEntity>}
 */
proto.communication.ContractEntity.prototype.getDeadlinesList = function() {
  return /** @type{!Array<!proto.communication.DeadlineEntity>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.DeadlineEntity, 5));
};


/**
 * @param {!Array<!proto.communication.DeadlineEntity>} value
 * @return {!proto.communication.ContractEntity} returns this
*/
proto.communication.ContractEntity.prototype.setDeadlinesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.communication.DeadlineEntity=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.DeadlineEntity}
 */
proto.communication.ContractEntity.prototype.addDeadlines = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.communication.DeadlineEntity, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.clearDeadlinesList = function() {
  return this.setDeadlinesList([]);
};


/**
 * optional string current_deadline_id = 15;
 * @return {string}
 */
proto.communication.ContractEntity.prototype.getCurrentDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 15, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setCurrentDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 15, value);
};


/**
 * optional string title = 8;
 * @return {string}
 */
proto.communication.ContractEntity.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string summary = 6;
 * @return {string}
 */
proto.communication.ContractEntity.prototype.getSummary = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setSummary = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional uint32 stage = 9;
 * @return {number}
 */
proto.communication.ContractEntity.prototype.getStage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setStage = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional bool universal_lock = 14;
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.getUniversalLock = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 14, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setUniversalLock = function(value) {
  return jspb.Message.setProto3BooleanField(this, 14, value);
};


/**
 * optional bool worker_approved = 12;
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.getWorkerApproved = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 12, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setWorkerApproved = function(value) {
  return jspb.Message.setProto3BooleanField(this, 12, value);
};


/**
 * optional bool buyer_approved = 13;
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.getBuyerApproved = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 13, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setBuyerApproved = function(value) {
  return jspb.Message.setProto3BooleanField(this, 13, value);
};


/**
 * repeated ItemEntity items = 7;
 * @return {!Array<!proto.communication.ItemEntity>}
 */
proto.communication.ContractEntity.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.communication.ItemEntity>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.ItemEntity, 7));
};


/**
 * @param {!Array<!proto.communication.ItemEntity>} value
 * @return {!proto.communication.ContractEntity} returns this
*/
proto.communication.ContractEntity.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.communication.ItemEntity=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.ItemEntity}
 */
proto.communication.ContractEntity.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.communication.ItemEntity, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};


/**
 * optional string room_id = 10;
 * @return {string}
 */
proto.communication.ContractEntity.prototype.getRoomId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setRoomId = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional bool disputed = 16;
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.getDisputed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 16, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setDisputed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 16, value);
};


/**
 * optional bool admin_requested = 17;
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.getAdminRequested = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 17, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setAdminRequested = function(value) {
  return jspb.Message.setProto3BooleanField(this, 17, value);
};


/**
 * optional string figma_link = 19;
 * @return {string}
 */
proto.communication.ContractEntity.prototype.getFigmaLink = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 19, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setFigmaLink = function(value) {
  return jspb.Message.setProto3StringField(this, 19, value);
};


/**
 * optional string figma_file_key = 21;
 * @return {string}
 */
proto.communication.ContractEntity.prototype.getFigmaFileKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 21, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setFigmaFileKey = function(value) {
  return jspb.Message.setProto3StringField(this, 21, value);
};


/**
 * optional bool figma_connected = 20;
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.getFigmaConnected = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 20, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setFigmaConnected = function(value) {
  return jspb.Message.setProto3BooleanField(this, 20, value);
};


/**
 * optional bool free_status = 23;
 * @return {boolean}
 */
proto.communication.ContractEntity.prototype.getFreeStatus = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 23, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractEntity} returns this
 */
proto.communication.ContractEntity.prototype.setFreeStatus = function(value) {
  return jspb.Message.setProto3BooleanField(this, 23, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.communication.ContractNub.repeatedFields_ = [11];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractNub.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractNub.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractNub} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractNub.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    title: jspb.Message.getFieldWithDefault(msg, 2, ""),
    summary: jspb.Message.getFieldWithDefault(msg, 12, ""),
    deadline: (f = msg.getDeadline()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    price: jspb.Message.getFieldWithDefault(msg, 4, 0),
    stage: jspb.Message.getFieldWithDefault(msg, 5, 0),
    userType: jspb.Message.getFieldWithDefault(msg, 6, 0),
    disputed: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
    adminRequested: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    workerId: jspb.Message.getFieldWithDefault(msg, 9, ""),
    buyerId: jspb.Message.getFieldWithDefault(msg, 10, ""),
    figmaLink: jspb.Message.getFieldWithDefault(msg, 13, ""),
    figmaConnected: jspb.Message.getBooleanFieldWithDefault(msg, 14, false),
    deadlinesList: jspb.Message.toObjectList(msg.getDeadlinesList(),
    proto.communication.DeadlineNub.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractNub}
 */
proto.communication.ContractNub.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractNub;
  return proto.communication.ContractNub.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractNub} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractNub}
 */
proto.communication.ContractNub.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setSummary(value);
      break;
    case 3:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setDeadline(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setPrice(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStage(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setUserType(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDisputed(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAdminRequested(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkerId(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setBuyerId(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setFigmaLink(value);
      break;
    case 14:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFigmaConnected(value);
      break;
    case 11:
      var value = new proto.communication.DeadlineNub;
      reader.readMessage(value,proto.communication.DeadlineNub.deserializeBinaryFromReader);
      msg.addDeadlines(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractNub.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractNub.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractNub} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractNub.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSummary();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getDeadline();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getPrice();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getStage();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
  f = message.getUserType();
  if (f !== 0) {
    writer.writeUint32(
      6,
      f
    );
  }
  f = message.getDisputed();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getAdminRequested();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getWorkerId();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getBuyerId();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getFigmaLink();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = message.getFigmaConnected();
  if (f) {
    writer.writeBool(
      14,
      f
    );
  }
  f = message.getDeadlinesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      11,
      f,
      proto.communication.DeadlineNub.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.communication.ContractNub.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string title = 2;
 * @return {string}
 */
proto.communication.ContractNub.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string summary = 12;
 * @return {string}
 */
proto.communication.ContractNub.prototype.getSummary = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setSummary = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * optional google.protobuf.Timestamp deadline = 3;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.communication.ContractNub.prototype.getDeadline = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.communication.ContractNub} returns this
*/
proto.communication.ContractNub.prototype.setDeadline = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.clearDeadline = function() {
  return this.setDeadline(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractNub.prototype.hasDeadline = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional int64 price = 4;
 * @return {number}
 */
proto.communication.ContractNub.prototype.getPrice = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setPrice = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint32 stage = 5;
 * @return {number}
 */
proto.communication.ContractNub.prototype.getStage = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setStage = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional uint32 user_type = 6;
 * @return {number}
 */
proto.communication.ContractNub.prototype.getUserType = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setUserType = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional bool disputed = 7;
 * @return {boolean}
 */
proto.communication.ContractNub.prototype.getDisputed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setDisputed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional bool admin_requested = 8;
 * @return {boolean}
 */
proto.communication.ContractNub.prototype.getAdminRequested = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setAdminRequested = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * optional string worker_id = 9;
 * @return {string}
 */
proto.communication.ContractNub.prototype.getWorkerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setWorkerId = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string buyer_id = 10;
 * @return {string}
 */
proto.communication.ContractNub.prototype.getBuyerId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setBuyerId = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional string figma_link = 13;
 * @return {string}
 */
proto.communication.ContractNub.prototype.getFigmaLink = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setFigmaLink = function(value) {
  return jspb.Message.setProto3StringField(this, 13, value);
};


/**
 * optional bool figma_connected = 14;
 * @return {boolean}
 */
proto.communication.ContractNub.prototype.getFigmaConnected = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 14, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.setFigmaConnected = function(value) {
  return jspb.Message.setProto3BooleanField(this, 14, value);
};


/**
 * repeated DeadlineNub deadlines = 11;
 * @return {!Array<!proto.communication.DeadlineNub>}
 */
proto.communication.ContractNub.prototype.getDeadlinesList = function() {
  return /** @type{!Array<!proto.communication.DeadlineNub>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.DeadlineNub, 11));
};


/**
 * @param {!Array<!proto.communication.DeadlineNub>} value
 * @return {!proto.communication.ContractNub} returns this
*/
proto.communication.ContractNub.prototype.setDeadlinesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 11, value);
};


/**
 * @param {!proto.communication.DeadlineNub=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.DeadlineNub}
 */
proto.communication.ContractNub.prototype.addDeadlines = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 11, opt_value, proto.communication.DeadlineNub, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractNub} returns this
 */
proto.communication.ContractNub.prototype.clearDeadlinesList = function() {
  return this.setDeadlinesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.InviteDataRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.InviteDataRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.InviteDataRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.InviteDataRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    secret: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.InviteDataRequest}
 */
proto.communication.InviteDataRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.InviteDataRequest;
  return proto.communication.InviteDataRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.InviteDataRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.InviteDataRequest}
 */
proto.communication.InviteDataRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSecret(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.InviteDataRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.InviteDataRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.InviteDataRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.InviteDataRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSecret();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.communication.InviteDataRequest.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.InviteDataRequest} returns this
 */
proto.communication.InviteDataRequest.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string secret = 2;
 * @return {string}
 */
proto.communication.InviteDataRequest.prototype.getSecret = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.InviteDataRequest} returns this
 */
proto.communication.InviteDataRequest.prototype.setSecret = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.communication.ContractInviteNub.repeatedFields_ = [5,7];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractInviteNub.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractInviteNub.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractInviteNub} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractInviteNub.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    invitedEmail: jspb.Message.getFieldWithDefault(msg, 11, ""),
    linkShare: jspb.Message.getBooleanFieldWithDefault(msg, 13, false),
    invitedUserInSystem: jspb.Message.getBooleanFieldWithDefault(msg, 12, false),
    worker: (f = msg.getWorker()) && proto.communication.UserNubEntity.toObject(includeInstance, f),
    buyer: (f = msg.getBuyer()) && proto.communication.UserNubEntity.toObject(includeInstance, f),
    price: (f = msg.getPrice()) && proto.communication.PriceEntity.toObject(includeInstance, f),
    deadlinesList: jspb.Message.toObjectList(msg.getDeadlinesList(),
    proto.communication.DeadlineEntity.toObject, includeInstance),
    title: jspb.Message.getFieldWithDefault(msg, 8, ""),
    summary: jspb.Message.getFieldWithDefault(msg, 6, ""),
    itemsList: jspb.Message.toObjectList(msg.getItemsList(),
    proto.communication.ItemEntity.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractInviteNub}
 */
proto.communication.ContractInviteNub.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractInviteNub;
  return proto.communication.ContractInviteNub.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractInviteNub} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractInviteNub}
 */
proto.communication.ContractInviteNub.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setInvitedEmail(value);
      break;
    case 13:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setLinkShare(value);
      break;
    case 12:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setInvitedUserInSystem(value);
      break;
    case 2:
      var value = new proto.communication.UserNubEntity;
      reader.readMessage(value,proto.communication.UserNubEntity.deserializeBinaryFromReader);
      msg.setWorker(value);
      break;
    case 3:
      var value = new proto.communication.UserNubEntity;
      reader.readMessage(value,proto.communication.UserNubEntity.deserializeBinaryFromReader);
      msg.setBuyer(value);
      break;
    case 4:
      var value = new proto.communication.PriceEntity;
      reader.readMessage(value,proto.communication.PriceEntity.deserializeBinaryFromReader);
      msg.setPrice(value);
      break;
    case 5:
      var value = new proto.communication.DeadlineEntity;
      reader.readMessage(value,proto.communication.DeadlineEntity.deserializeBinaryFromReader);
      msg.addDeadlines(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setSummary(value);
      break;
    case 7:
      var value = new proto.communication.ItemEntity;
      reader.readMessage(value,proto.communication.ItemEntity.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractInviteNub.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractInviteNub.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractInviteNub} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractInviteNub.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInvitedEmail();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getLinkShare();
  if (f) {
    writer.writeBool(
      13,
      f
    );
  }
  f = message.getInvitedUserInSystem();
  if (f) {
    writer.writeBool(
      12,
      f
    );
  }
  f = message.getWorker();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.communication.UserNubEntity.serializeBinaryToWriter
    );
  }
  f = message.getBuyer();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.communication.UserNubEntity.serializeBinaryToWriter
    );
  }
  f = message.getPrice();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.communication.PriceEntity.serializeBinaryToWriter
    );
  }
  f = message.getDeadlinesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.communication.DeadlineEntity.serializeBinaryToWriter
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getSummary();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getItemsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.communication.ItemEntity.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.communication.ContractInviteNub.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string invited_email = 11;
 * @return {string}
 */
proto.communication.ContractInviteNub.prototype.getInvitedEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.setInvitedEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};


/**
 * optional bool link_share = 13;
 * @return {boolean}
 */
proto.communication.ContractInviteNub.prototype.getLinkShare = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 13, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.setLinkShare = function(value) {
  return jspb.Message.setProto3BooleanField(this, 13, value);
};


/**
 * optional bool invited_user_in_system = 12;
 * @return {boolean}
 */
proto.communication.ContractInviteNub.prototype.getInvitedUserInSystem = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 12, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.setInvitedUserInSystem = function(value) {
  return jspb.Message.setProto3BooleanField(this, 12, value);
};


/**
 * optional UserNubEntity worker = 2;
 * @return {?proto.communication.UserNubEntity}
 */
proto.communication.ContractInviteNub.prototype.getWorker = function() {
  return /** @type{?proto.communication.UserNubEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.UserNubEntity, 2));
};


/**
 * @param {?proto.communication.UserNubEntity|undefined} value
 * @return {!proto.communication.ContractInviteNub} returns this
*/
proto.communication.ContractInviteNub.prototype.setWorker = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.clearWorker = function() {
  return this.setWorker(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractInviteNub.prototype.hasWorker = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional UserNubEntity buyer = 3;
 * @return {?proto.communication.UserNubEntity}
 */
proto.communication.ContractInviteNub.prototype.getBuyer = function() {
  return /** @type{?proto.communication.UserNubEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.UserNubEntity, 3));
};


/**
 * @param {?proto.communication.UserNubEntity|undefined} value
 * @return {!proto.communication.ContractInviteNub} returns this
*/
proto.communication.ContractInviteNub.prototype.setBuyer = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.clearBuyer = function() {
  return this.setBuyer(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractInviteNub.prototype.hasBuyer = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional PriceEntity price = 4;
 * @return {?proto.communication.PriceEntity}
 */
proto.communication.ContractInviteNub.prototype.getPrice = function() {
  return /** @type{?proto.communication.PriceEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.PriceEntity, 4));
};


/**
 * @param {?proto.communication.PriceEntity|undefined} value
 * @return {!proto.communication.ContractInviteNub} returns this
*/
proto.communication.ContractInviteNub.prototype.setPrice = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.clearPrice = function() {
  return this.setPrice(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractInviteNub.prototype.hasPrice = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * repeated DeadlineEntity deadlines = 5;
 * @return {!Array<!proto.communication.DeadlineEntity>}
 */
proto.communication.ContractInviteNub.prototype.getDeadlinesList = function() {
  return /** @type{!Array<!proto.communication.DeadlineEntity>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.DeadlineEntity, 5));
};


/**
 * @param {!Array<!proto.communication.DeadlineEntity>} value
 * @return {!proto.communication.ContractInviteNub} returns this
*/
proto.communication.ContractInviteNub.prototype.setDeadlinesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.communication.DeadlineEntity=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.DeadlineEntity}
 */
proto.communication.ContractInviteNub.prototype.addDeadlines = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.communication.DeadlineEntity, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.clearDeadlinesList = function() {
  return this.setDeadlinesList([]);
};


/**
 * optional string title = 8;
 * @return {string}
 */
proto.communication.ContractInviteNub.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional string summary = 6;
 * @return {string}
 */
proto.communication.ContractInviteNub.prototype.getSummary = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.setSummary = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * repeated ItemEntity items = 7;
 * @return {!Array<!proto.communication.ItemEntity>}
 */
proto.communication.ContractInviteNub.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.communication.ItemEntity>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.ItemEntity, 7));
};


/**
 * @param {!Array<!proto.communication.ItemEntity>} value
 * @return {!proto.communication.ContractInviteNub} returns this
*/
proto.communication.ContractInviteNub.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.communication.ItemEntity=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.ItemEntity}
 */
proto.communication.ContractInviteNub.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.communication.ItemEntity, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractInviteNub} returns this
 */
proto.communication.ContractInviteNub.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.communication.ContractNubSet.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractNubSet.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractNubSet.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractNubSet} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractNubSet.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractNubsList: jspb.Message.toObjectList(msg.getContractNubsList(),
    proto.communication.ContractNub.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractNubSet}
 */
proto.communication.ContractNubSet.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractNubSet;
  return proto.communication.ContractNubSet.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractNubSet} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractNubSet}
 */
proto.communication.ContractNubSet.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = new proto.communication.ContractNub;
      reader.readMessage(value,proto.communication.ContractNub.deserializeBinaryFromReader);
      msg.addContractNubs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractNubSet.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractNubSet.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractNubSet} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractNubSet.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractNubsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.communication.ContractNub.serializeBinaryToWriter
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractNubSet.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractNubSet} returns this
 */
proto.communication.ContractNubSet.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated ContractNub contract_nubs = 2;
 * @return {!Array<!proto.communication.ContractNub>}
 */
proto.communication.ContractNubSet.prototype.getContractNubsList = function() {
  return /** @type{!Array<!proto.communication.ContractNub>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.ContractNub, 2));
};


/**
 * @param {!Array<!proto.communication.ContractNub>} value
 * @return {!proto.communication.ContractNubSet} returns this
*/
proto.communication.ContractNubSet.prototype.setContractNubsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.communication.ContractNub=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.ContractNub}
 */
proto.communication.ContractNubSet.prototype.addContractNubs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.communication.ContractNub, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractNubSet} returns this
 */
proto.communication.ContractNubSet.prototype.clearContractNubsList = function() {
  return this.setContractNubsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.UserNubEntity.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.UserNubEntity.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.UserNubEntity} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.UserNubEntity.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    username: jspb.Message.getFieldWithDefault(msg, 2, ""),
    hasPhoto: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    photoUrl: jspb.Message.getFieldWithDefault(msg, 4, ""),
    workerModeEnabled: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    buyerModeEnabled: jspb.Message.getBooleanFieldWithDefault(msg, 7, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.UserNubEntity}
 */
proto.communication.UserNubEntity.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.UserNubEntity;
  return proto.communication.UserNubEntity.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.UserNubEntity} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.UserNubEntity}
 */
proto.communication.UserNubEntity.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setHasPhoto(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setPhotoUrl(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setWorkerModeEnabled(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBuyerModeEnabled(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.UserNubEntity.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.UserNubEntity.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.UserNubEntity} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.UserNubEntity.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getHasPhoto();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getPhotoUrl();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getWorkerModeEnabled();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getBuyerModeEnabled();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.communication.UserNubEntity.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.UserNubEntity} returns this
 */
proto.communication.UserNubEntity.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string username = 2;
 * @return {string}
 */
proto.communication.UserNubEntity.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.UserNubEntity} returns this
 */
proto.communication.UserNubEntity.prototype.setUsername = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool has_photo = 5;
 * @return {boolean}
 */
proto.communication.UserNubEntity.prototype.getHasPhoto = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.UserNubEntity} returns this
 */
proto.communication.UserNubEntity.prototype.setHasPhoto = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional string photo_url = 4;
 * @return {string}
 */
proto.communication.UserNubEntity.prototype.getPhotoUrl = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.UserNubEntity} returns this
 */
proto.communication.UserNubEntity.prototype.setPhotoUrl = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool worker_mode_enabled = 6;
 * @return {boolean}
 */
proto.communication.UserNubEntity.prototype.getWorkerModeEnabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.UserNubEntity} returns this
 */
proto.communication.UserNubEntity.prototype.setWorkerModeEnabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional bool buyer_mode_enabled = 7;
 * @return {boolean}
 */
proto.communication.UserNubEntity.prototype.getBuyerModeEnabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.UserNubEntity} returns this
 */
proto.communication.UserNubEntity.prototype.setBuyerModeEnabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ItemEntity.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ItemEntity.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ItemEntity} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ItemEntity.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    name: jspb.Message.getFieldWithDefault(msg, 4, ""),
    currentBody: jspb.Message.getFieldWithDefault(msg, 5, ""),
    workerBody: jspb.Message.getFieldWithDefault(msg, 6, ""),
    buyerBody: jspb.Message.getFieldWithDefault(msg, 7, ""),
    awaitingApproval: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    awaitingCreation: jspb.Message.getBooleanFieldWithDefault(msg, 9, false),
    awaitingDeletion: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
    buyerSettled: jspb.Message.getFieldWithDefault(msg, 27, 0),
    figmaComponentId: jspb.Message.getFieldWithDefault(msg, 29, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ItemEntity}
 */
proto.communication.ItemEntity.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ItemEntity;
  return proto.communication.ItemEntity.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ItemEntity} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ItemEntity}
 */
proto.communication.ItemEntity.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setCurrentBody(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setWorkerBody(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setBuyerBody(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAwaitingApproval(value);
      break;
    case 9:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAwaitingCreation(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAwaitingDeletion(value);
      break;
    case 27:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBuyerSettled(value);
      break;
    case 29:
      var value = /** @type {string} */ (reader.readString());
      msg.setFigmaComponentId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ItemEntity.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ItemEntity.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ItemEntity} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ItemEntity.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getCurrentBody();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getWorkerBody();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getBuyerBody();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getAwaitingApproval();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getAwaitingCreation();
  if (f) {
    writer.writeBool(
      9,
      f
    );
  }
  f = message.getAwaitingDeletion();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getBuyerSettled();
  if (f !== 0) {
    writer.writeUint32(
      27,
      f
    );
  }
  f = message.getFigmaComponentId();
  if (f.length > 0) {
    writer.writeString(
      29,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.communication.ItemEntity.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ItemEntity.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string name = 4;
 * @return {string}
 */
proto.communication.ItemEntity.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string current_body = 5;
 * @return {string}
 */
proto.communication.ItemEntity.prototype.getCurrentBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setCurrentBody = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string worker_body = 6;
 * @return {string}
 */
proto.communication.ItemEntity.prototype.getWorkerBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setWorkerBody = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string buyer_body = 7;
 * @return {string}
 */
proto.communication.ItemEntity.prototype.getBuyerBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setBuyerBody = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional bool awaiting_approval = 8;
 * @return {boolean}
 */
proto.communication.ItemEntity.prototype.getAwaitingApproval = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setAwaitingApproval = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * optional bool awaiting_creation = 9;
 * @return {boolean}
 */
proto.communication.ItemEntity.prototype.getAwaitingCreation = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 9, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setAwaitingCreation = function(value) {
  return jspb.Message.setProto3BooleanField(this, 9, value);
};


/**
 * optional bool awaiting_deletion = 10;
 * @return {boolean}
 */
proto.communication.ItemEntity.prototype.getAwaitingDeletion = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setAwaitingDeletion = function(value) {
  return jspb.Message.setProto3BooleanField(this, 10, value);
};


/**
 * optional uint32 buyer_settled = 27;
 * @return {number}
 */
proto.communication.ItemEntity.prototype.getBuyerSettled = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 27, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setBuyerSettled = function(value) {
  return jspb.Message.setProto3IntField(this, 27, value);
};


/**
 * optional string figma_component_id = 29;
 * @return {string}
 */
proto.communication.ItemEntity.prototype.getFigmaComponentId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 29, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ItemEntity} returns this
 */
proto.communication.ItemEntity.prototype.setFigmaComponentId = function(value) {
  return jspb.Message.setProto3StringField(this, 29, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ItemNub.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ItemNub.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ItemNub} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ItemNub.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    proposer: jspb.Message.getFieldWithDefault(msg, 3, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ItemNub}
 */
proto.communication.ItemNub.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ItemNub;
  return proto.communication.ItemNub.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ItemNub} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ItemNub}
 */
proto.communication.ItemNub.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setProposer(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ItemNub.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ItemNub.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ItemNub} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ItemNub.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getProposer();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.communication.ItemNub.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ItemNub} returns this
 */
proto.communication.ItemNub.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string proposer = 3;
 * @return {string}
 */
proto.communication.ItemNub.prototype.getProposer = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ItemNub} returns this
 */
proto.communication.ItemNub.prototype.setProposer = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.communication.ItemNub.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ItemNub} returns this
 */
proto.communication.ItemNub.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.communication.ContractCreateRequest.repeatedFields_ = [6,7];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractCreateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractCreateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractCreateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractCreateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    title: jspb.Message.getFieldWithDefault(msg, 2, ""),
    summary: jspb.Message.getFieldWithDefault(msg, 3, ""),
    invitedEmail: jspb.Message.getFieldWithDefault(msg, 8, ""),
    role: jspb.Message.getFieldWithDefault(msg, 9, 0),
    price: (f = msg.getPrice()) && proto.communication.PriceEntity.toObject(includeInstance, f),
    deadlinesList: jspb.Message.toObjectList(msg.getDeadlinesList(),
    proto.communication.DeadlineEntity.toObject, includeInstance),
    itemsList: jspb.Message.toObjectList(msg.getItemsList(),
    proto.communication.ItemEntity.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractCreateRequest}
 */
proto.communication.ContractCreateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractCreateRequest;
  return proto.communication.ContractCreateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractCreateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractCreateRequest}
 */
proto.communication.ContractCreateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSummary(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setInvitedEmail(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setRole(value);
      break;
    case 5:
      var value = new proto.communication.PriceEntity;
      reader.readMessage(value,proto.communication.PriceEntity.deserializeBinaryFromReader);
      msg.setPrice(value);
      break;
    case 6:
      var value = new proto.communication.DeadlineEntity;
      reader.readMessage(value,proto.communication.DeadlineEntity.deserializeBinaryFromReader);
      msg.addDeadlines(value);
      break;
    case 7:
      var value = new proto.communication.ItemEntity;
      reader.readMessage(value,proto.communication.ItemEntity.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractCreateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractCreateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractCreateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractCreateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSummary();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getInvitedEmail();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
  f = message.getRole();
  if (f !== 0) {
    writer.writeUint32(
      9,
      f
    );
  }
  f = message.getPrice();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.communication.PriceEntity.serializeBinaryToWriter
    );
  }
  f = message.getDeadlinesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.communication.DeadlineEntity.serializeBinaryToWriter
    );
  }
  f = message.getItemsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.communication.ItemEntity.serializeBinaryToWriter
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractCreateRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractCreateRequest} returns this
 */
proto.communication.ContractCreateRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string title = 2;
 * @return {string}
 */
proto.communication.ContractCreateRequest.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractCreateRequest} returns this
 */
proto.communication.ContractCreateRequest.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string summary = 3;
 * @return {string}
 */
proto.communication.ContractCreateRequest.prototype.getSummary = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractCreateRequest} returns this
 */
proto.communication.ContractCreateRequest.prototype.setSummary = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string invited_email = 8;
 * @return {string}
 */
proto.communication.ContractCreateRequest.prototype.getInvitedEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractCreateRequest} returns this
 */
proto.communication.ContractCreateRequest.prototype.setInvitedEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


/**
 * optional uint32 role = 9;
 * @return {number}
 */
proto.communication.ContractCreateRequest.prototype.getRole = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractCreateRequest} returns this
 */
proto.communication.ContractCreateRequest.prototype.setRole = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional PriceEntity price = 5;
 * @return {?proto.communication.PriceEntity}
 */
proto.communication.ContractCreateRequest.prototype.getPrice = function() {
  return /** @type{?proto.communication.PriceEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.PriceEntity, 5));
};


/**
 * @param {?proto.communication.PriceEntity|undefined} value
 * @return {!proto.communication.ContractCreateRequest} returns this
*/
proto.communication.ContractCreateRequest.prototype.setPrice = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractCreateRequest} returns this
 */
proto.communication.ContractCreateRequest.prototype.clearPrice = function() {
  return this.setPrice(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractCreateRequest.prototype.hasPrice = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * repeated DeadlineEntity deadlines = 6;
 * @return {!Array<!proto.communication.DeadlineEntity>}
 */
proto.communication.ContractCreateRequest.prototype.getDeadlinesList = function() {
  return /** @type{!Array<!proto.communication.DeadlineEntity>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.DeadlineEntity, 6));
};


/**
 * @param {!Array<!proto.communication.DeadlineEntity>} value
 * @return {!proto.communication.ContractCreateRequest} returns this
*/
proto.communication.ContractCreateRequest.prototype.setDeadlinesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.communication.DeadlineEntity=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.DeadlineEntity}
 */
proto.communication.ContractCreateRequest.prototype.addDeadlines = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.communication.DeadlineEntity, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractCreateRequest} returns this
 */
proto.communication.ContractCreateRequest.prototype.clearDeadlinesList = function() {
  return this.setDeadlinesList([]);
};


/**
 * repeated ItemEntity items = 7;
 * @return {!Array<!proto.communication.ItemEntity>}
 */
proto.communication.ContractCreateRequest.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.communication.ItemEntity>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.ItemEntity, 7));
};


/**
 * @param {!Array<!proto.communication.ItemEntity>} value
 * @return {!proto.communication.ContractCreateRequest} returns this
*/
proto.communication.ContractCreateRequest.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.communication.ItemEntity=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.ItemEntity}
 */
proto.communication.ContractCreateRequest.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.communication.ItemEntity, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractCreateRequest} returns this
 */
proto.communication.ContractCreateRequest.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractFinishCreationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractFinishCreationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractFinishCreationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractFinishCreationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    contractId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractFinishCreationRequest}
 */
proto.communication.ContractFinishCreationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractFinishCreationRequest;
  return proto.communication.ContractFinishCreationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractFinishCreationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractFinishCreationRequest}
 */
proto.communication.ContractFinishCreationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractFinishCreationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractFinishCreationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractFinishCreationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractFinishCreationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string contract_id = 1;
 * @return {string}
 */
proto.communication.ContractFinishCreationRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractFinishCreationRequest} returns this
 */
proto.communication.ContractFinishCreationRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.communication.ContractFinishCreationRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractFinishCreationRequest} returns this
 */
proto.communication.ContractFinishCreationRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.communication.ContractUpdateRequest.repeatedFields_ = [8,9];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractUpdateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractUpdateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractUpdateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractUpdateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    contractId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    title: jspb.Message.getFieldWithDefault(msg, 3, ""),
    summary: jspb.Message.getFieldWithDefault(msg, 4, ""),
    invitedEmail: jspb.Message.getFieldWithDefault(msg, 5, ""),
    linkShare: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
    role: jspb.Message.getFieldWithDefault(msg, 6, 0),
    price: (f = msg.getPrice()) && proto.communication.PriceEntity.toObject(includeInstance, f),
    deadlinesList: jspb.Message.toObjectList(msg.getDeadlinesList(),
    proto.communication.DeadlineEntity.toObject, includeInstance),
    itemsList: jspb.Message.toObjectList(msg.getItemsList(),
    proto.communication.ItemEntity.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractUpdateRequest}
 */
proto.communication.ContractUpdateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractUpdateRequest;
  return proto.communication.ContractUpdateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractUpdateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractUpdateRequest}
 */
proto.communication.ContractUpdateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSummary(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setInvitedEmail(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setLinkShare(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setRole(value);
      break;
    case 7:
      var value = new proto.communication.PriceEntity;
      reader.readMessage(value,proto.communication.PriceEntity.deserializeBinaryFromReader);
      msg.setPrice(value);
      break;
    case 8:
      var value = new proto.communication.DeadlineEntity;
      reader.readMessage(value,proto.communication.DeadlineEntity.deserializeBinaryFromReader);
      msg.addDeadlines(value);
      break;
    case 9:
      var value = new proto.communication.ItemEntity;
      reader.readMessage(value,proto.communication.ItemEntity.deserializeBinaryFromReader);
      msg.addItems(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractUpdateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractUpdateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractUpdateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractUpdateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSummary();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getInvitedEmail();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getLinkShare();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getRole();
  if (f !== 0) {
    writer.writeUint32(
      6,
      f
    );
  }
  f = message.getPrice();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.communication.PriceEntity.serializeBinaryToWriter
    );
  }
  f = message.getDeadlinesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.communication.DeadlineEntity.serializeBinaryToWriter
    );
  }
  f = message.getItemsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      9,
      f,
      proto.communication.ItemEntity.serializeBinaryToWriter
    );
  }
};


/**
 * optional string contract_id = 1;
 * @return {string}
 */
proto.communication.ContractUpdateRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractUpdateRequest} returns this
 */
proto.communication.ContractUpdateRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.communication.ContractUpdateRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractUpdateRequest} returns this
 */
proto.communication.ContractUpdateRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string title = 3;
 * @return {string}
 */
proto.communication.ContractUpdateRequest.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractUpdateRequest} returns this
 */
proto.communication.ContractUpdateRequest.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string summary = 4;
 * @return {string}
 */
proto.communication.ContractUpdateRequest.prototype.getSummary = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractUpdateRequest} returns this
 */
proto.communication.ContractUpdateRequest.prototype.setSummary = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string invited_email = 5;
 * @return {string}
 */
proto.communication.ContractUpdateRequest.prototype.getInvitedEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractUpdateRequest} returns this
 */
proto.communication.ContractUpdateRequest.prototype.setInvitedEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional bool link_share = 10;
 * @return {boolean}
 */
proto.communication.ContractUpdateRequest.prototype.getLinkShare = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractUpdateRequest} returns this
 */
proto.communication.ContractUpdateRequest.prototype.setLinkShare = function(value) {
  return jspb.Message.setProto3BooleanField(this, 10, value);
};


/**
 * optional uint32 role = 6;
 * @return {number}
 */
proto.communication.ContractUpdateRequest.prototype.getRole = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractUpdateRequest} returns this
 */
proto.communication.ContractUpdateRequest.prototype.setRole = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional PriceEntity price = 7;
 * @return {?proto.communication.PriceEntity}
 */
proto.communication.ContractUpdateRequest.prototype.getPrice = function() {
  return /** @type{?proto.communication.PriceEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.PriceEntity, 7));
};


/**
 * @param {?proto.communication.PriceEntity|undefined} value
 * @return {!proto.communication.ContractUpdateRequest} returns this
*/
proto.communication.ContractUpdateRequest.prototype.setPrice = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractUpdateRequest} returns this
 */
proto.communication.ContractUpdateRequest.prototype.clearPrice = function() {
  return this.setPrice(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractUpdateRequest.prototype.hasPrice = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * repeated DeadlineEntity deadlines = 8;
 * @return {!Array<!proto.communication.DeadlineEntity>}
 */
proto.communication.ContractUpdateRequest.prototype.getDeadlinesList = function() {
  return /** @type{!Array<!proto.communication.DeadlineEntity>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.DeadlineEntity, 8));
};


/**
 * @param {!Array<!proto.communication.DeadlineEntity>} value
 * @return {!proto.communication.ContractUpdateRequest} returns this
*/
proto.communication.ContractUpdateRequest.prototype.setDeadlinesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.communication.DeadlineEntity=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.DeadlineEntity}
 */
proto.communication.ContractUpdateRequest.prototype.addDeadlines = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.communication.DeadlineEntity, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractUpdateRequest} returns this
 */
proto.communication.ContractUpdateRequest.prototype.clearDeadlinesList = function() {
  return this.setDeadlinesList([]);
};


/**
 * repeated ItemEntity items = 9;
 * @return {!Array<!proto.communication.ItemEntity>}
 */
proto.communication.ContractUpdateRequest.prototype.getItemsList = function() {
  return /** @type{!Array<!proto.communication.ItemEntity>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.communication.ItemEntity, 9));
};


/**
 * @param {!Array<!proto.communication.ItemEntity>} value
 * @return {!proto.communication.ContractUpdateRequest} returns this
*/
proto.communication.ContractUpdateRequest.prototype.setItemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 9, value);
};


/**
 * @param {!proto.communication.ItemEntity=} opt_value
 * @param {number=} opt_index
 * @return {!proto.communication.ItemEntity}
 */
proto.communication.ContractUpdateRequest.prototype.addItems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 9, opt_value, proto.communication.ItemEntity, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractUpdateRequest} returns this
 */
proto.communication.ContractUpdateRequest.prototype.clearItemsList = function() {
  return this.setItemsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.QueryByIdRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.QueryByIdRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.QueryByIdRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.QueryByIdRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    contractId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.QueryByIdRequest}
 */
proto.communication.QueryByIdRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.QueryByIdRequest;
  return proto.communication.QueryByIdRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.QueryByIdRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.QueryByIdRequest}
 */
proto.communication.QueryByIdRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.QueryByIdRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.QueryByIdRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.QueryByIdRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.QueryByIdRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string contract_id = 1;
 * @return {string}
 */
proto.communication.QueryByIdRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.QueryByIdRequest} returns this
 */
proto.communication.QueryByIdRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.communication.QueryByIdRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.QueryByIdRequest} returns this
 */
proto.communication.QueryByIdRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractSuggestPrice.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractSuggestPrice.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractSuggestPrice} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestPrice.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    newPrice: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractSuggestPrice}
 */
proto.communication.ContractSuggestPrice.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractSuggestPrice;
  return proto.communication.ContractSuggestPrice.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractSuggestPrice} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractSuggestPrice}
 */
proto.communication.ContractSuggestPrice.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNewPrice(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractSuggestPrice.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractSuggestPrice.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractSuggestPrice} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestPrice.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNewPrice();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractSuggestPrice.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestPrice} returns this
 */
proto.communication.ContractSuggestPrice.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractSuggestPrice.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestPrice} returns this
 */
proto.communication.ContractSuggestPrice.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional int64 new_price = 3;
 * @return {number}
 */
proto.communication.ContractSuggestPrice.prototype.getNewPrice = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractSuggestPrice} returns this
 */
proto.communication.ContractSuggestPrice.prototype.setNewPrice = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractReactPrice.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractReactPrice.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractReactPrice} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactPrice.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    messageId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    status: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractReactPrice}
 */
proto.communication.ContractReactPrice.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractReactPrice;
  return proto.communication.ContractReactPrice.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractReactPrice} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractReactPrice}
 */
proto.communication.ContractReactPrice.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractReactPrice.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractReactPrice.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractReactPrice} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactPrice.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessageId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractReactPrice.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactPrice} returns this
 */
proto.communication.ContractReactPrice.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractReactPrice.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactPrice} returns this
 */
proto.communication.ContractReactPrice.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message_id = 4;
 * @return {string}
 */
proto.communication.ContractReactPrice.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactPrice} returns this
 */
proto.communication.ContractReactPrice.prototype.setMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional uint32 status = 3;
 * @return {number}
 */
proto.communication.ContractReactPrice.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractReactPrice} returns this
 */
proto.communication.ContractReactPrice.prototype.setStatus = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractSuggestDate.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractSuggestDate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractSuggestDate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestDate.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    newDate: (f = msg.getNewDate()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractSuggestDate}
 */
proto.communication.ContractSuggestDate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractSuggestDate;
  return proto.communication.ContractSuggestDate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractSuggestDate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractSuggestDate}
 */
proto.communication.ContractSuggestDate.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    case 3:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setNewDate(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractSuggestDate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractSuggestDate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractSuggestDate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestDate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getNewDate();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractSuggestDate.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestDate} returns this
 */
proto.communication.ContractSuggestDate.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractSuggestDate.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestDate} returns this
 */
proto.communication.ContractSuggestDate.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string deadline_id = 4;
 * @return {string}
 */
proto.communication.ContractSuggestDate.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestDate} returns this
 */
proto.communication.ContractSuggestDate.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional google.protobuf.Timestamp new_date = 3;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.communication.ContractSuggestDate.prototype.getNewDate = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 3));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.communication.ContractSuggestDate} returns this
*/
proto.communication.ContractSuggestDate.prototype.setNewDate = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractSuggestDate} returns this
 */
proto.communication.ContractSuggestDate.prototype.clearNewDate = function() {
  return this.setNewDate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractSuggestDate.prototype.hasNewDate = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractSuggestPayout.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractSuggestPayout.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractSuggestPayout} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestPayout.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    newPayout: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractSuggestPayout}
 */
proto.communication.ContractSuggestPayout.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractSuggestPayout;
  return proto.communication.ContractSuggestPayout.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractSuggestPayout} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractSuggestPayout}
 */
proto.communication.ContractSuggestPayout.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setNewPayout(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractSuggestPayout.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractSuggestPayout.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractSuggestPayout} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestPayout.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getNewPayout();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractSuggestPayout.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestPayout} returns this
 */
proto.communication.ContractSuggestPayout.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractSuggestPayout.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestPayout} returns this
 */
proto.communication.ContractSuggestPayout.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string deadline_id = 4;
 * @return {string}
 */
proto.communication.ContractSuggestPayout.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestPayout} returns this
 */
proto.communication.ContractSuggestPayout.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional int64 new_payout = 3;
 * @return {number}
 */
proto.communication.ContractSuggestPayout.prototype.getNewPayout = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractSuggestPayout} returns this
 */
proto.communication.ContractSuggestPayout.prototype.setNewPayout = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.communication.ContractSuggestDeadlineItems.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractSuggestDeadlineItems.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractSuggestDeadlineItems.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractSuggestDeadlineItems} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestDeadlineItems.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    itemIdsList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractSuggestDeadlineItems}
 */
proto.communication.ContractSuggestDeadlineItems.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractSuggestDeadlineItems;
  return proto.communication.ContractSuggestDeadlineItems.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractSuggestDeadlineItems} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractSuggestDeadlineItems}
 */
proto.communication.ContractSuggestDeadlineItems.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addItemIds(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractSuggestDeadlineItems.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractSuggestDeadlineItems.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractSuggestDeadlineItems} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestDeadlineItems.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getItemIdsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractSuggestDeadlineItems.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestDeadlineItems} returns this
 */
proto.communication.ContractSuggestDeadlineItems.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractSuggestDeadlineItems.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestDeadlineItems} returns this
 */
proto.communication.ContractSuggestDeadlineItems.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string deadline_id = 4;
 * @return {string}
 */
proto.communication.ContractSuggestDeadlineItems.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestDeadlineItems} returns this
 */
proto.communication.ContractSuggestDeadlineItems.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated string item_ids = 3;
 * @return {!Array<string>}
 */
proto.communication.ContractSuggestDeadlineItems.prototype.getItemIdsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.communication.ContractSuggestDeadlineItems} returns this
 */
proto.communication.ContractSuggestDeadlineItems.prototype.setItemIdsList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.communication.ContractSuggestDeadlineItems} returns this
 */
proto.communication.ContractSuggestDeadlineItems.prototype.addItemIds = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.communication.ContractSuggestDeadlineItems} returns this
 */
proto.communication.ContractSuggestDeadlineItems.prototype.clearItemIdsList = function() {
  return this.setItemIdsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractReactDeadlineItems.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractReactDeadlineItems.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractReactDeadlineItems} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactDeadlineItems.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    messageId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 5, ""),
    status: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractReactDeadlineItems}
 */
proto.communication.ContractReactDeadlineItems.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractReactDeadlineItems;
  return proto.communication.ContractReactDeadlineItems.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractReactDeadlineItems} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractReactDeadlineItems}
 */
proto.communication.ContractReactDeadlineItems.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractReactDeadlineItems.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractReactDeadlineItems.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractReactDeadlineItems} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactDeadlineItems.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessageId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractReactDeadlineItems.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDeadlineItems} returns this
 */
proto.communication.ContractReactDeadlineItems.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractReactDeadlineItems.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDeadlineItems} returns this
 */
proto.communication.ContractReactDeadlineItems.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message_id = 4;
 * @return {string}
 */
proto.communication.ContractReactDeadlineItems.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDeadlineItems} returns this
 */
proto.communication.ContractReactDeadlineItems.prototype.setMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string deadline_id = 5;
 * @return {string}
 */
proto.communication.ContractReactDeadlineItems.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDeadlineItems} returns this
 */
proto.communication.ContractReactDeadlineItems.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional uint32 status = 3;
 * @return {number}
 */
proto.communication.ContractReactDeadlineItems.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractReactDeadlineItems} returns this
 */
proto.communication.ContractReactDeadlineItems.prototype.setStatus = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractReactDate.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractReactDate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractReactDate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactDate.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    messageId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 5, ""),
    status: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractReactDate}
 */
proto.communication.ContractReactDate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractReactDate;
  return proto.communication.ContractReactDate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractReactDate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractReactDate}
 */
proto.communication.ContractReactDate.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractReactDate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractReactDate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractReactDate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactDate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessageId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractReactDate.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDate} returns this
 */
proto.communication.ContractReactDate.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractReactDate.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDate} returns this
 */
proto.communication.ContractReactDate.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message_id = 4;
 * @return {string}
 */
proto.communication.ContractReactDate.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDate} returns this
 */
proto.communication.ContractReactDate.prototype.setMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string deadline_id = 5;
 * @return {string}
 */
proto.communication.ContractReactDate.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDate} returns this
 */
proto.communication.ContractReactDate.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional uint32 status = 3;
 * @return {number}
 */
proto.communication.ContractReactDate.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractReactDate} returns this
 */
proto.communication.ContractReactDate.prototype.setStatus = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractReactPayout.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractReactPayout.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractReactPayout} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactPayout.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    messageId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 5, ""),
    status: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractReactPayout}
 */
proto.communication.ContractReactPayout.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractReactPayout;
  return proto.communication.ContractReactPayout.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractReactPayout} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractReactPayout}
 */
proto.communication.ContractReactPayout.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractReactPayout.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractReactPayout.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractReactPayout} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactPayout.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessageId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractReactPayout.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactPayout} returns this
 */
proto.communication.ContractReactPayout.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractReactPayout.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactPayout} returns this
 */
proto.communication.ContractReactPayout.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message_id = 4;
 * @return {string}
 */
proto.communication.ContractReactPayout.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactPayout} returns this
 */
proto.communication.ContractReactPayout.prototype.setMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string deadline_id = 5;
 * @return {string}
 */
proto.communication.ContractReactPayout.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactPayout} returns this
 */
proto.communication.ContractReactPayout.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional uint32 status = 3;
 * @return {number}
 */
proto.communication.ContractReactPayout.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractReactPayout} returns this
 */
proto.communication.ContractReactPayout.prototype.setStatus = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractSuggestItem.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractSuggestItem.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractSuggestItem} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestItem.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    itemId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    newBody: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractSuggestItem}
 */
proto.communication.ContractSuggestItem.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractSuggestItem;
  return proto.communication.ContractSuggestItem.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractSuggestItem} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractSuggestItem}
 */
proto.communication.ContractSuggestItem.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setItemId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setNewBody(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractSuggestItem.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractSuggestItem.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractSuggestItem} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestItem.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getItemId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getNewBody();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractSuggestItem.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestItem} returns this
 */
proto.communication.ContractSuggestItem.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractSuggestItem.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestItem} returns this
 */
proto.communication.ContractSuggestItem.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string item_id = 4;
 * @return {string}
 */
proto.communication.ContractSuggestItem.prototype.getItemId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestItem} returns this
 */
proto.communication.ContractSuggestItem.prototype.setItemId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string new_body = 3;
 * @return {string}
 */
proto.communication.ContractSuggestItem.prototype.getNewBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestItem} returns this
 */
proto.communication.ContractSuggestItem.prototype.setNewBody = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractReactItem.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractReactItem.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractReactItem} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactItem.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    messageId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    itemId: jspb.Message.getFieldWithDefault(msg, 5, ""),
    status: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractReactItem}
 */
proto.communication.ContractReactItem.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractReactItem;
  return proto.communication.ContractReactItem.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractReactItem} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractReactItem}
 */
proto.communication.ContractReactItem.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setItemId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractReactItem.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractReactItem.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractReactItem} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactItem.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessageId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getItemId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractReactItem.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactItem} returns this
 */
proto.communication.ContractReactItem.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractReactItem.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactItem} returns this
 */
proto.communication.ContractReactItem.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message_id = 4;
 * @return {string}
 */
proto.communication.ContractReactItem.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactItem} returns this
 */
proto.communication.ContractReactItem.prototype.setMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string item_id = 5;
 * @return {string}
 */
proto.communication.ContractReactItem.prototype.getItemId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactItem} returns this
 */
proto.communication.ContractReactItem.prototype.setItemId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional uint32 status = 3;
 * @return {number}
 */
proto.communication.ContractReactItem.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractReactItem} returns this
 */
proto.communication.ContractReactItem.prototype.setStatus = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractSuggestAddItem.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractSuggestAddItem.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractSuggestAddItem} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestAddItem.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    item: (f = msg.getItem()) && proto.communication.ItemEntity.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractSuggestAddItem}
 */
proto.communication.ContractSuggestAddItem.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractSuggestAddItem;
  return proto.communication.ContractSuggestAddItem.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractSuggestAddItem} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractSuggestAddItem}
 */
proto.communication.ContractSuggestAddItem.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = new proto.communication.ItemEntity;
      reader.readMessage(value,proto.communication.ItemEntity.deserializeBinaryFromReader);
      msg.setItem(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractSuggestAddItem.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractSuggestAddItem.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractSuggestAddItem} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestAddItem.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getItem();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.communication.ItemEntity.serializeBinaryToWriter
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractSuggestAddItem.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestAddItem} returns this
 */
proto.communication.ContractSuggestAddItem.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractSuggestAddItem.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestAddItem} returns this
 */
proto.communication.ContractSuggestAddItem.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional ItemEntity item = 3;
 * @return {?proto.communication.ItemEntity}
 */
proto.communication.ContractSuggestAddItem.prototype.getItem = function() {
  return /** @type{?proto.communication.ItemEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.ItemEntity, 3));
};


/**
 * @param {?proto.communication.ItemEntity|undefined} value
 * @return {!proto.communication.ContractSuggestAddItem} returns this
*/
proto.communication.ContractSuggestAddItem.prototype.setItem = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractSuggestAddItem} returns this
 */
proto.communication.ContractSuggestAddItem.prototype.clearItem = function() {
  return this.setItem(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractSuggestAddItem.prototype.hasItem = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractReactAddItem.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractReactAddItem.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractReactAddItem} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactAddItem.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    messageId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    itemId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    status: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractReactAddItem}
 */
proto.communication.ContractReactAddItem.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractReactAddItem;
  return proto.communication.ContractReactAddItem.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractReactAddItem} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractReactAddItem}
 */
proto.communication.ContractReactAddItem.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setItemId(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractReactAddItem.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractReactAddItem.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractReactAddItem} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactAddItem.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessageId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getItemId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractReactAddItem.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactAddItem} returns this
 */
proto.communication.ContractReactAddItem.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractReactAddItem.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactAddItem} returns this
 */
proto.communication.ContractReactAddItem.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message_id = 4;
 * @return {string}
 */
proto.communication.ContractReactAddItem.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactAddItem} returns this
 */
proto.communication.ContractReactAddItem.prototype.setMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string item_id = 3;
 * @return {string}
 */
proto.communication.ContractReactAddItem.prototype.getItemId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactAddItem} returns this
 */
proto.communication.ContractReactAddItem.prototype.setItemId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint32 status = 5;
 * @return {number}
 */
proto.communication.ContractReactAddItem.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractReactAddItem} returns this
 */
proto.communication.ContractReactAddItem.prototype.setStatus = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractSuggestDelItem.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractSuggestDelItem.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractSuggestDelItem} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestDelItem.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    item: (f = msg.getItem()) && proto.communication.ItemEntity.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractSuggestDelItem}
 */
proto.communication.ContractSuggestDelItem.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractSuggestDelItem;
  return proto.communication.ContractSuggestDelItem.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractSuggestDelItem} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractSuggestDelItem}
 */
proto.communication.ContractSuggestDelItem.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = new proto.communication.ItemEntity;
      reader.readMessage(value,proto.communication.ItemEntity.deserializeBinaryFromReader);
      msg.setItem(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractSuggestDelItem.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractSuggestDelItem.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractSuggestDelItem} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestDelItem.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getItem();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.communication.ItemEntity.serializeBinaryToWriter
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractSuggestDelItem.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestDelItem} returns this
 */
proto.communication.ContractSuggestDelItem.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractSuggestDelItem.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestDelItem} returns this
 */
proto.communication.ContractSuggestDelItem.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional ItemEntity item = 3;
 * @return {?proto.communication.ItemEntity}
 */
proto.communication.ContractSuggestDelItem.prototype.getItem = function() {
  return /** @type{?proto.communication.ItemEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.ItemEntity, 3));
};


/**
 * @param {?proto.communication.ItemEntity|undefined} value
 * @return {!proto.communication.ContractSuggestDelItem} returns this
*/
proto.communication.ContractSuggestDelItem.prototype.setItem = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractSuggestDelItem} returns this
 */
proto.communication.ContractSuggestDelItem.prototype.clearItem = function() {
  return this.setItem(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractSuggestDelItem.prototype.hasItem = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractReactDelItem.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractReactDelItem.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractReactDelItem} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactDelItem.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    messageId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    itemId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    status: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractReactDelItem}
 */
proto.communication.ContractReactDelItem.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractReactDelItem;
  return proto.communication.ContractReactDelItem.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractReactDelItem} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractReactDelItem}
 */
proto.communication.ContractReactDelItem.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setItemId(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractReactDelItem.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractReactDelItem.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractReactDelItem} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactDelItem.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessageId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getItemId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractReactDelItem.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDelItem} returns this
 */
proto.communication.ContractReactDelItem.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractReactDelItem.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDelItem} returns this
 */
proto.communication.ContractReactDelItem.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message_id = 4;
 * @return {string}
 */
proto.communication.ContractReactDelItem.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDelItem} returns this
 */
proto.communication.ContractReactDelItem.prototype.setMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string item_id = 3;
 * @return {string}
 */
proto.communication.ContractReactDelItem.prototype.getItemId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDelItem} returns this
 */
proto.communication.ContractReactDelItem.prototype.setItemId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint32 status = 5;
 * @return {number}
 */
proto.communication.ContractReactDelItem.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractReactDelItem} returns this
 */
proto.communication.ContractReactDelItem.prototype.setStatus = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractSuggestAddDeadline.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractSuggestAddDeadline.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractSuggestAddDeadline} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestAddDeadline.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    deadline: (f = msg.getDeadline()) && proto.communication.DeadlineEntity.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractSuggestAddDeadline}
 */
proto.communication.ContractSuggestAddDeadline.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractSuggestAddDeadline;
  return proto.communication.ContractSuggestAddDeadline.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractSuggestAddDeadline} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractSuggestAddDeadline}
 */
proto.communication.ContractSuggestAddDeadline.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = new proto.communication.DeadlineEntity;
      reader.readMessage(value,proto.communication.DeadlineEntity.deserializeBinaryFromReader);
      msg.setDeadline(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractSuggestAddDeadline.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractSuggestAddDeadline.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractSuggestAddDeadline} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestAddDeadline.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeadline();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.communication.DeadlineEntity.serializeBinaryToWriter
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractSuggestAddDeadline.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestAddDeadline} returns this
 */
proto.communication.ContractSuggestAddDeadline.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractSuggestAddDeadline.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestAddDeadline} returns this
 */
proto.communication.ContractSuggestAddDeadline.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional DeadlineEntity deadline = 3;
 * @return {?proto.communication.DeadlineEntity}
 */
proto.communication.ContractSuggestAddDeadline.prototype.getDeadline = function() {
  return /** @type{?proto.communication.DeadlineEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.DeadlineEntity, 3));
};


/**
 * @param {?proto.communication.DeadlineEntity|undefined} value
 * @return {!proto.communication.ContractSuggestAddDeadline} returns this
*/
proto.communication.ContractSuggestAddDeadline.prototype.setDeadline = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractSuggestAddDeadline} returns this
 */
proto.communication.ContractSuggestAddDeadline.prototype.clearDeadline = function() {
  return this.setDeadline(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractSuggestAddDeadline.prototype.hasDeadline = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractReactAddDeadline.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractReactAddDeadline.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractReactAddDeadline} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactAddDeadline.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    messageId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    status: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractReactAddDeadline}
 */
proto.communication.ContractReactAddDeadline.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractReactAddDeadline;
  return proto.communication.ContractReactAddDeadline.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractReactAddDeadline} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractReactAddDeadline}
 */
proto.communication.ContractReactAddDeadline.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractReactAddDeadline.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractReactAddDeadline.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractReactAddDeadline} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactAddDeadline.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessageId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractReactAddDeadline.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactAddDeadline} returns this
 */
proto.communication.ContractReactAddDeadline.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractReactAddDeadline.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactAddDeadline} returns this
 */
proto.communication.ContractReactAddDeadline.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message_id = 4;
 * @return {string}
 */
proto.communication.ContractReactAddDeadline.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactAddDeadline} returns this
 */
proto.communication.ContractReactAddDeadline.prototype.setMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string deadline_id = 3;
 * @return {string}
 */
proto.communication.ContractReactAddDeadline.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactAddDeadline} returns this
 */
proto.communication.ContractReactAddDeadline.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint32 status = 5;
 * @return {number}
 */
proto.communication.ContractReactAddDeadline.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractReactAddDeadline} returns this
 */
proto.communication.ContractReactAddDeadline.prototype.setStatus = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractSuggestDelDeadline.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractSuggestDelDeadline.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractSuggestDelDeadline} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestDelDeadline.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    deadline: (f = msg.getDeadline()) && proto.communication.DeadlineEntity.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractSuggestDelDeadline}
 */
proto.communication.ContractSuggestDelDeadline.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractSuggestDelDeadline;
  return proto.communication.ContractSuggestDelDeadline.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractSuggestDelDeadline} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractSuggestDelDeadline}
 */
proto.communication.ContractSuggestDelDeadline.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = new proto.communication.DeadlineEntity;
      reader.readMessage(value,proto.communication.DeadlineEntity.deserializeBinaryFromReader);
      msg.setDeadline(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractSuggestDelDeadline.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractSuggestDelDeadline.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractSuggestDelDeadline} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSuggestDelDeadline.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeadline();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.communication.DeadlineEntity.serializeBinaryToWriter
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractSuggestDelDeadline.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestDelDeadline} returns this
 */
proto.communication.ContractSuggestDelDeadline.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractSuggestDelDeadline.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSuggestDelDeadline} returns this
 */
proto.communication.ContractSuggestDelDeadline.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional DeadlineEntity deadline = 3;
 * @return {?proto.communication.DeadlineEntity}
 */
proto.communication.ContractSuggestDelDeadline.prototype.getDeadline = function() {
  return /** @type{?proto.communication.DeadlineEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.DeadlineEntity, 3));
};


/**
 * @param {?proto.communication.DeadlineEntity|undefined} value
 * @return {!proto.communication.ContractSuggestDelDeadline} returns this
*/
proto.communication.ContractSuggestDelDeadline.prototype.setDeadline = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractSuggestDelDeadline} returns this
 */
proto.communication.ContractSuggestDelDeadline.prototype.clearDeadline = function() {
  return this.setDeadline(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractSuggestDelDeadline.prototype.hasDeadline = function() {
  return jspb.Message.getField(this, 3) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractReactDelDeadline.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractReactDelDeadline.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractReactDelDeadline} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactDelDeadline.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    messageId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    status: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractReactDelDeadline}
 */
proto.communication.ContractReactDelDeadline.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractReactDelDeadline;
  return proto.communication.ContractReactDelDeadline.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractReactDelDeadline} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractReactDelDeadline}
 */
proto.communication.ContractReactDelDeadline.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractReactDelDeadline.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractReactDelDeadline.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractReactDelDeadline} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactDelDeadline.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessageId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractReactDelDeadline.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDelDeadline} returns this
 */
proto.communication.ContractReactDelDeadline.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractReactDelDeadline.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDelDeadline} returns this
 */
proto.communication.ContractReactDelDeadline.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message_id = 4;
 * @return {string}
 */
proto.communication.ContractReactDelDeadline.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDelDeadline} returns this
 */
proto.communication.ContractReactDelDeadline.prototype.setMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string deadline_id = 3;
 * @return {string}
 */
proto.communication.ContractReactDelDeadline.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactDelDeadline} returns this
 */
proto.communication.ContractReactDelDeadline.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint32 status = 5;
 * @return {number}
 */
proto.communication.ContractReactDelDeadline.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractReactDelDeadline} returns this
 */
proto.communication.ContractReactDelDeadline.prototype.setStatus = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    contract: (f = msg.getContract()) && proto.communication.ContractEntity.toObject(includeInstance, f),
    role: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractResponse}
 */
proto.communication.ContractResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractResponse;
  return proto.communication.ContractResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractResponse}
 */
proto.communication.ContractResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = new proto.communication.ContractEntity;
      reader.readMessage(value,proto.communication.ContractEntity.deserializeBinaryFromReader);
      msg.setContract(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContract();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.communication.ContractEntity.serializeBinaryToWriter
    );
  }
  f = message.getRole();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional ContractEntity contract = 2;
 * @return {?proto.communication.ContractEntity}
 */
proto.communication.ContractResponse.prototype.getContract = function() {
  return /** @type{?proto.communication.ContractEntity} */ (
    jspb.Message.getWrapperField(this, proto.communication.ContractEntity, 2));
};


/**
 * @param {?proto.communication.ContractEntity|undefined} value
 * @return {!proto.communication.ContractResponse} returns this
*/
proto.communication.ContractResponse.prototype.setContract = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.communication.ContractResponse} returns this
 */
proto.communication.ContractResponse.prototype.clearContract = function() {
  return this.setContract(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.communication.ContractResponse.prototype.hasContract = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint32 role = 3;
 * @return {number}
 */
proto.communication.ContractResponse.prototype.getRole = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractResponse} returns this
 */
proto.communication.ContractResponse.prototype.setRole = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.QueryByUserRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.QueryByUserRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.QueryByUserRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.QueryByUserRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    unsorted: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.QueryByUserRequest}
 */
proto.communication.QueryByUserRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.QueryByUserRequest;
  return proto.communication.QueryByUserRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.QueryByUserRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.QueryByUserRequest}
 */
proto.communication.QueryByUserRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUnsorted(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.QueryByUserRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.QueryByUserRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.QueryByUserRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.QueryByUserRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUnsorted();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.QueryByUserRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.QueryByUserRequest} returns this
 */
proto.communication.QueryByUserRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool unsorted = 2;
 * @return {boolean}
 */
proto.communication.QueryByUserRequest.prototype.getUnsorted = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.QueryByUserRequest} returns this
 */
proto.communication.QueryByUserRequest.prototype.setUnsorted = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ClaimContractRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ClaimContractRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ClaimContractRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ClaimContractRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    password: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ClaimContractRequest}
 */
proto.communication.ClaimContractRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ClaimContractRequest;
  return proto.communication.ClaimContractRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ClaimContractRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ClaimContractRequest}
 */
proto.communication.ClaimContractRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPassword(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ClaimContractRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ClaimContractRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ClaimContractRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ClaimContractRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPassword();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ClaimContractRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ClaimContractRequest} returns this
 */
proto.communication.ClaimContractRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ClaimContractRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ClaimContractRequest} returns this
 */
proto.communication.ClaimContractRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string password = 3;
 * @return {string}
 */
proto.communication.ClaimContractRequest.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ClaimContractRequest} returns this
 */
proto.communication.ClaimContractRequest.prototype.setPassword = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.SignContractRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.SignContractRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.SignContractRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.SignContractRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.SignContractRequest}
 */
proto.communication.SignContractRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.SignContractRequest;
  return proto.communication.SignContractRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.SignContractRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.SignContractRequest}
 */
proto.communication.SignContractRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.SignContractRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.SignContractRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.SignContractRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.SignContractRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.SignContractRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.SignContractRequest} returns this
 */
proto.communication.SignContractRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.SignContractRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.SignContractRequest} returns this
 */
proto.communication.SignContractRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.SettleContractRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.SettleContractRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.SettleContractRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.SettleContractRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.SettleContractRequest}
 */
proto.communication.SettleContractRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.SettleContractRequest;
  return proto.communication.SettleContractRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.SettleContractRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.SettleContractRequest}
 */
proto.communication.SettleContractRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.SettleContractRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.SettleContractRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.SettleContractRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.SettleContractRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.SettleContractRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.SettleContractRequest} returns this
 */
proto.communication.SettleContractRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.SettleContractRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.SettleContractRequest} returns this
 */
proto.communication.SettleContractRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.FinishDeadlineRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.FinishDeadlineRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.FinishDeadlineRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.FinishDeadlineRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.FinishDeadlineRequest}
 */
proto.communication.FinishDeadlineRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.FinishDeadlineRequest;
  return proto.communication.FinishDeadlineRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.FinishDeadlineRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.FinishDeadlineRequest}
 */
proto.communication.FinishDeadlineRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.FinishDeadlineRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.FinishDeadlineRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.FinishDeadlineRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.FinishDeadlineRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.FinishDeadlineRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FinishDeadlineRequest} returns this
 */
proto.communication.FinishDeadlineRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.FinishDeadlineRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FinishDeadlineRequest} returns this
 */
proto.communication.FinishDeadlineRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string deadline_id = 3;
 * @return {string}
 */
proto.communication.FinishDeadlineRequest.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FinishDeadlineRequest} returns this
 */
proto.communication.FinishDeadlineRequest.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ConfirmDeadlineRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ConfirmDeadlineRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ConfirmDeadlineRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ConfirmDeadlineRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ConfirmDeadlineRequest}
 */
proto.communication.ConfirmDeadlineRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ConfirmDeadlineRequest;
  return proto.communication.ConfirmDeadlineRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ConfirmDeadlineRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ConfirmDeadlineRequest}
 */
proto.communication.ConfirmDeadlineRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ConfirmDeadlineRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ConfirmDeadlineRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ConfirmDeadlineRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ConfirmDeadlineRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ConfirmDeadlineRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ConfirmDeadlineRequest} returns this
 */
proto.communication.ConfirmDeadlineRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ConfirmDeadlineRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ConfirmDeadlineRequest} returns this
 */
proto.communication.ConfirmDeadlineRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string deadline_id = 3;
 * @return {string}
 */
proto.communication.ConfirmDeadlineRequest.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ConfirmDeadlineRequest} returns this
 */
proto.communication.ConfirmDeadlineRequest.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.UndoDeadlineRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.UndoDeadlineRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.UndoDeadlineRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.UndoDeadlineRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.UndoDeadlineRequest}
 */
proto.communication.UndoDeadlineRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.UndoDeadlineRequest;
  return proto.communication.UndoDeadlineRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.UndoDeadlineRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.UndoDeadlineRequest}
 */
proto.communication.UndoDeadlineRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.UndoDeadlineRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.UndoDeadlineRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.UndoDeadlineRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.UndoDeadlineRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.UndoDeadlineRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.UndoDeadlineRequest} returns this
 */
proto.communication.UndoDeadlineRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.UndoDeadlineRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.UndoDeadlineRequest} returns this
 */
proto.communication.UndoDeadlineRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string deadline_id = 3;
 * @return {string}
 */
proto.communication.UndoDeadlineRequest.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.UndoDeadlineRequest} returns this
 */
proto.communication.UndoDeadlineRequest.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractAdminSupport.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractAdminSupport.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractAdminSupport} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractAdminSupport.toObject = function(includeInstance, msg) {
  var f, obj = {
    contractId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractAdminSupport}
 */
proto.communication.ContractAdminSupport.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractAdminSupport;
  return proto.communication.ContractAdminSupport.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractAdminSupport} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractAdminSupport}
 */
proto.communication.ContractAdminSupport.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractAdminSupport.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractAdminSupport.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractAdminSupport} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractAdminSupport.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string contract_id = 1;
 * @return {string}
 */
proto.communication.ContractAdminSupport.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractAdminSupport} returns this
 */
proto.communication.ContractAdminSupport.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 2;
 * @return {string}
 */
proto.communication.ContractAdminSupport.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractAdminSupport} returns this
 */
proto.communication.ContractAdminSupport.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractToggleLockRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractToggleLockRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractToggleLockRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractToggleLockRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    contractLock: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractToggleLockRequest}
 */
proto.communication.ContractToggleLockRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractToggleLockRequest;
  return proto.communication.ContractToggleLockRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractToggleLockRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractToggleLockRequest}
 */
proto.communication.ContractToggleLockRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setContractLock(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractToggleLockRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractToggleLockRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractToggleLockRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractToggleLockRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getContractLock();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractToggleLockRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractToggleLockRequest} returns this
 */
proto.communication.ContractToggleLockRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractToggleLockRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractToggleLockRequest} returns this
 */
proto.communication.ContractToggleLockRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool contract_lock = 3;
 * @return {boolean}
 */
proto.communication.ContractToggleLockRequest.prototype.getContractLock = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.communication.ContractToggleLockRequest} returns this
 */
proto.communication.ContractToggleLockRequest.prototype.setContractLock = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractReactLockRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractReactLockRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractReactLockRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactLockRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    messageId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    status: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractReactLockRequest}
 */
proto.communication.ContractReactLockRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractReactLockRequest;
  return proto.communication.ContractReactLockRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractReactLockRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractReactLockRequest}
 */
proto.communication.ContractReactLockRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessageId(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setStatus(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractReactLockRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractReactLockRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractReactLockRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractReactLockRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getMessageId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractReactLockRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactLockRequest} returns this
 */
proto.communication.ContractReactLockRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractReactLockRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactLockRequest} returns this
 */
proto.communication.ContractReactLockRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string message_id = 3;
 * @return {string}
 */
proto.communication.ContractReactLockRequest.prototype.getMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractReactLockRequest} returns this
 */
proto.communication.ContractReactLockRequest.prototype.setMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint32 status = 4;
 * @return {number}
 */
proto.communication.ContractReactLockRequest.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractReactLockRequest} returns this
 */
proto.communication.ContractReactLockRequest.prototype.setStatus = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractSettleItemRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractSettleItemRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractSettleItemRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSettleItemRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    deadlineId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    itemId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    newState: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractSettleItemRequest}
 */
proto.communication.ContractSettleItemRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractSettleItemRequest;
  return proto.communication.ContractSettleItemRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractSettleItemRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractSettleItemRequest}
 */
proto.communication.ContractSettleItemRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeadlineId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setItemId(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNewState(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractSettleItemRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractSettleItemRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractSettleItemRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractSettleItemRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDeadlineId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getItemId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getNewState();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractSettleItemRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSettleItemRequest} returns this
 */
proto.communication.ContractSettleItemRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string deadline_id = 2;
 * @return {string}
 */
proto.communication.ContractSettleItemRequest.prototype.getDeadlineId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSettleItemRequest} returns this
 */
proto.communication.ContractSettleItemRequest.prototype.setDeadlineId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string contract_id = 3;
 * @return {string}
 */
proto.communication.ContractSettleItemRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSettleItemRequest} returns this
 */
proto.communication.ContractSettleItemRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string item_id = 4;
 * @return {string}
 */
proto.communication.ContractSettleItemRequest.prototype.getItemId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractSettleItemRequest} returns this
 */
proto.communication.ContractSettleItemRequest.prototype.setItemId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional uint32 new_state = 5;
 * @return {number}
 */
proto.communication.ContractSettleItemRequest.prototype.getNewState = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.communication.ContractSettleItemRequest} returns this
 */
proto.communication.ContractSettleItemRequest.prototype.setNewState = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractDeleteDraftRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractDeleteDraftRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractDeleteDraftRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractDeleteDraftRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractDeleteDraftRequest}
 */
proto.communication.ContractDeleteDraftRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractDeleteDraftRequest;
  return proto.communication.ContractDeleteDraftRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractDeleteDraftRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractDeleteDraftRequest}
 */
proto.communication.ContractDeleteDraftRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractDeleteDraftRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractDeleteDraftRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractDeleteDraftRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractDeleteDraftRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.ContractDeleteDraftRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractDeleteDraftRequest} returns this
 */
proto.communication.ContractDeleteDraftRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.ContractDeleteDraftRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.ContractDeleteDraftRequest} returns this
 */
proto.communication.ContractDeleteDraftRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.NullResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.NullResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.NullResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.NullResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.NullResponse}
 */
proto.communication.NullResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.NullResponse;
  return proto.communication.NullResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.NullResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.NullResponse}
 */
proto.communication.NullResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.NullResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.NullResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.NullResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.NullResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.ContractEditResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.ContractEditResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.ContractEditResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractEditResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.ContractEditResponse}
 */
proto.communication.ContractEditResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.ContractEditResponse;
  return proto.communication.ContractEditResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.ContractEditResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.ContractEditResponse}
 */
proto.communication.ContractEditResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.ContractEditResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.ContractEditResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.ContractEditResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.ContractEditResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.EmailChangeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.EmailChangeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.EmailChangeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.EmailChangeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    newEmail: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.EmailChangeRequest}
 */
proto.communication.EmailChangeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.EmailChangeRequest;
  return proto.communication.EmailChangeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.EmailChangeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.EmailChangeRequest}
 */
proto.communication.EmailChangeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setNewEmail(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.EmailChangeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.EmailChangeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.EmailChangeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.EmailChangeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNewEmail();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.EmailChangeRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.EmailChangeRequest} returns this
 */
proto.communication.EmailChangeRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.EmailChangeRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.EmailChangeRequest} returns this
 */
proto.communication.EmailChangeRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string new_email = 3;
 * @return {string}
 */
proto.communication.EmailChangeRequest.prototype.getNewEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.EmailChangeRequest} returns this
 */
proto.communication.EmailChangeRequest.prototype.setNewEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.EmailChangeResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.EmailChangeResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.EmailChangeResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.EmailChangeResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    newSecret: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.EmailChangeResponse}
 */
proto.communication.EmailChangeResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.EmailChangeResponse;
  return proto.communication.EmailChangeResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.EmailChangeResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.EmailChangeResponse}
 */
proto.communication.EmailChangeResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setNewSecret(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.EmailChangeResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.EmailChangeResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.EmailChangeResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.EmailChangeResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNewSecret();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string new_secret = 1;
 * @return {string}
 */
proto.communication.EmailChangeResponse.prototype.getNewSecret = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.EmailChangeResponse} returns this
 */
proto.communication.EmailChangeResponse.prototype.setNewSecret = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.EmailResendRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.EmailResendRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.EmailResendRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.EmailResendRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.EmailResendRequest}
 */
proto.communication.EmailResendRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.EmailResendRequest;
  return proto.communication.EmailResendRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.EmailResendRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.EmailResendRequest}
 */
proto.communication.EmailResendRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.EmailResendRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.EmailResendRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.EmailResendRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.EmailResendRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.EmailResendRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.EmailResendRequest} returns this
 */
proto.communication.EmailResendRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.EmailResendRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.EmailResendRequest} returns this
 */
proto.communication.EmailResendRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.FigmaLinkRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.FigmaLinkRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.FigmaLinkRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.FigmaLinkRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    figmaLink: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.FigmaLinkRequest}
 */
proto.communication.FigmaLinkRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.FigmaLinkRequest;
  return proto.communication.FigmaLinkRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.FigmaLinkRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.FigmaLinkRequest}
 */
proto.communication.FigmaLinkRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setFigmaLink(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.FigmaLinkRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.FigmaLinkRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.FigmaLinkRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.FigmaLinkRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getFigmaLink();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.FigmaLinkRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FigmaLinkRequest} returns this
 */
proto.communication.FigmaLinkRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.FigmaLinkRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FigmaLinkRequest} returns this
 */
proto.communication.FigmaLinkRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string figma_link = 3;
 * @return {string}
 */
proto.communication.FigmaLinkRequest.prototype.getFigmaLink = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FigmaLinkRequest} returns this
 */
proto.communication.FigmaLinkRequest.prototype.setFigmaLink = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.FigmaItemRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.FigmaItemRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.FigmaItemRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.FigmaItemRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    contractId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 5, ""),
    itemId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    componentId: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.FigmaItemRequest}
 */
proto.communication.FigmaItemRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.FigmaItemRequest;
  return proto.communication.FigmaItemRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.FigmaItemRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.FigmaItemRequest}
 */
proto.communication.FigmaItemRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setItemId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setComponentId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.FigmaItemRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.FigmaItemRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.FigmaItemRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.FigmaItemRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getItemId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getComponentId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string contract_id = 1;
 * @return {string}
 */
proto.communication.FigmaItemRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FigmaItemRequest} returns this
 */
proto.communication.FigmaItemRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string user_id = 5;
 * @return {string}
 */
proto.communication.FigmaItemRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FigmaItemRequest} returns this
 */
proto.communication.FigmaItemRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string item_id = 3;
 * @return {string}
 */
proto.communication.FigmaItemRequest.prototype.getItemId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FigmaItemRequest} returns this
 */
proto.communication.FigmaItemRequest.prototype.setItemId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string component_id = 4;
 * @return {string}
 */
proto.communication.FigmaItemRequest.prototype.getComponentId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FigmaItemRequest} returns this
 */
proto.communication.FigmaItemRequest.prototype.setComponentId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.communication.FigmaFileConnectRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.communication.FigmaFileConnectRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.communication.FigmaFileConnectRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.FigmaFileConnectRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    userId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    contractId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    figmaLink: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.communication.FigmaFileConnectRequest}
 */
proto.communication.FigmaFileConnectRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.communication.FigmaFileConnectRequest;
  return proto.communication.FigmaFileConnectRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.communication.FigmaFileConnectRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.communication.FigmaFileConnectRequest}
 */
proto.communication.FigmaFileConnectRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContractId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setFigmaLink(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.communication.FigmaFileConnectRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.communication.FigmaFileConnectRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.communication.FigmaFileConnectRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.communication.FigmaFileConnectRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContractId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getFigmaLink();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.communication.FigmaFileConnectRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FigmaFileConnectRequest} returns this
 */
proto.communication.FigmaFileConnectRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string contract_id = 2;
 * @return {string}
 */
proto.communication.FigmaFileConnectRequest.prototype.getContractId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FigmaFileConnectRequest} returns this
 */
proto.communication.FigmaFileConnectRequest.prototype.setContractId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string figma_link = 3;
 * @return {string}
 */
proto.communication.FigmaFileConnectRequest.prototype.getFigmaLink = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.communication.FigmaFileConnectRequest} returns this
 */
proto.communication.FigmaFileConnectRequest.prototype.setFigmaLink = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


goog.object.extend(exports, proto.communication);

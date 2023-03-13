// package: main
// file: communication/chat.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as communication_contract_pb from "../communication/contract_pb";

export class UserHandle extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserHandle.AsObject;
  static toObject(includeInstance: boolean, msg: UserHandle): UserHandle.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserHandle, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserHandle;
  static deserializeBinaryFromReader(message: UserHandle, reader: jspb.BinaryReader): UserHandle;
}

export namespace UserHandle {
  export type AsObject = {
    id: string,
    username: string,
  }
}

export class ChatMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getSystemMessage(): boolean;
  setSystemMessage(value: boolean): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): UserHandle | undefined;
  setUser(value?: UserHandle): void;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasLabel(): boolean;
  clearLabel(): void;
  getLabel(): ChatLabel | undefined;
  setLabel(value?: ChatLabel): void;

  getMethod(): number;
  setMethod(value: number): void;

  getIsAdmin(): boolean;
  setIsAdmin(value: boolean): void;

  getAdminOverride(): boolean;
  setAdminOverride(value: boolean): void;

  getAdminStatus(): number;
  setAdminStatus(value: number): void;

  getExpired(): boolean;
  setExpired(value: boolean): void;

  getSilent(): boolean;
  setSilent(value: boolean): void;

  clearReadReceiptsList(): void;
  getReadReceiptsList(): Array<ReadReceiptEntity>;
  setReadReceiptsList(value: Array<ReadReceiptEntity>): void;
  addReadReceipts(value?: ReadReceiptEntity, index?: number): ReadReceiptEntity;

  hasCommentBody(): boolean;
  clearCommentBody(): void;
  getCommentBody(): CommentMsgBody | undefined;
  setCommentBody(value?: CommentMsgBody): void;

  hasPayoutBody(): boolean;
  clearPayoutBody(): void;
  getPayoutBody(): PayoutMsgBody | undefined;
  setPayoutBody(value?: PayoutMsgBody): void;

  hasDateBody(): boolean;
  clearDateBody(): void;
  getDateBody(): DateMsgBody | undefined;
  setDateBody(value?: DateMsgBody): void;

  hasPriceBody(): boolean;
  clearPriceBody(): void;
  getPriceBody(): PriceMsgBody | undefined;
  setPriceBody(value?: PriceMsgBody): void;

  hasItemBody(): boolean;
  clearItemBody(): void;
  getItemBody(): ItemMsgBody | undefined;
  setItemBody(value?: ItemMsgBody): void;

  hasRevBody(): boolean;
  clearRevBody(): void;
  getRevBody(): RevMsgBody | undefined;
  setRevBody(value?: RevMsgBody): void;

  hasItemCreateBody(): boolean;
  clearItemCreateBody(): void;
  getItemCreateBody(): ItemCreateMsgBody | undefined;
  setItemCreateBody(value?: ItemCreateMsgBody): void;

  hasItemDeleteBody(): boolean;
  clearItemDeleteBody(): void;
  getItemDeleteBody(): ItemDeleteMsgBody | undefined;
  setItemDeleteBody(value?: ItemDeleteMsgBody): void;

  hasDeadlineCreateBody(): boolean;
  clearDeadlineCreateBody(): void;
  getDeadlineCreateBody(): DeadlineCreateMsgBody | undefined;
  setDeadlineCreateBody(value?: DeadlineCreateMsgBody): void;

  hasDeadlineDeleteBody(): boolean;
  clearDeadlineDeleteBody(): void;
  getDeadlineDeleteBody(): DeadlineDeleteMsgBody | undefined;
  setDeadlineDeleteBody(value?: DeadlineDeleteMsgBody): void;

  hasDeadlineItemBody(): boolean;
  clearDeadlineItemBody(): void;
  getDeadlineItemBody(): DeadlineItemMsgBody | undefined;
  setDeadlineItemBody(value?: DeadlineItemMsgBody): void;

  hasContractSignBody(): boolean;
  clearContractSignBody(): void;
  getContractSignBody(): ContractSignMsgBody | undefined;
  setContractSignBody(value?: ContractSignMsgBody): void;

  hasContractLockBody(): boolean;
  clearContractLockBody(): void;
  getContractLockBody(): ContractLockMsgBody | undefined;
  setContractLockBody(value?: ContractLockMsgBody): void;

  hasContractSettleBody(): boolean;
  clearContractSettleBody(): void;
  getContractSettleBody(): ContractSettleMsgBody | undefined;
  setContractSettleBody(value?: ContractSettleMsgBody): void;

  hasSettleItemBody(): boolean;
  clearSettleItemBody(): void;
  getSettleItemBody(): ContractSettleItemMsgBody | undefined;
  setSettleItemBody(value?: ContractSettleItemMsgBody): void;

  hasRequestAdminBody(): boolean;
  clearRequestAdminBody(): void;
  getRequestAdminBody(): AdminMsgBody | undefined;
  setRequestAdminBody(value?: AdminMsgBody): void;

  hasResolveAdminBody(): boolean;
  clearResolveAdminBody(): void;
  getResolveAdminBody(): AdminMsgBody | undefined;
  setResolveAdminBody(value?: AdminMsgBody): void;

  hasFinalizeBody(): boolean;
  clearFinalizeBody(): void;
  getFinalizeBody(): FinalizeMsgBody | undefined;
  setFinalizeBody(value?: FinalizeMsgBody): void;

  hasDeadlineExpireBody(): boolean;
  clearDeadlineExpireBody(): void;
  getDeadlineExpireBody(): DeadlineExpireMsgBody | undefined;
  setDeadlineExpireBody(value?: DeadlineExpireMsgBody): void;

  hasDeadlineSettledBody(): boolean;
  clearDeadlineSettledBody(): void;
  getDeadlineSettledBody(): DeadlineSettledMsgBody | undefined;
  setDeadlineSettledBody(value?: DeadlineSettledMsgBody): void;

  getBodyCase(): ChatMessage.BodyCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ChatMessage): ChatMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChatMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatMessage;
  static deserializeBinaryFromReader(message: ChatMessage, reader: jspb.BinaryReader): ChatMessage;
}

export namespace ChatMessage {
  export type AsObject = {
    id: string,
    systemMessage: boolean,
    user?: UserHandle.AsObject,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    label?: ChatLabel.AsObject,
    method: number,
    isAdmin: boolean,
    adminOverride: boolean,
    adminStatus: number,
    expired: boolean,
    silent: boolean,
    readReceiptsList: Array<ReadReceiptEntity.AsObject>,
    commentBody?: CommentMsgBody.AsObject,
    payoutBody?: PayoutMsgBody.AsObject,
    dateBody?: DateMsgBody.AsObject,
    priceBody?: PriceMsgBody.AsObject,
    itemBody?: ItemMsgBody.AsObject,
    revBody?: RevMsgBody.AsObject,
    itemCreateBody?: ItemCreateMsgBody.AsObject,
    itemDeleteBody?: ItemDeleteMsgBody.AsObject,
    deadlineCreateBody?: DeadlineCreateMsgBody.AsObject,
    deadlineDeleteBody?: DeadlineDeleteMsgBody.AsObject,
    deadlineItemBody?: DeadlineItemMsgBody.AsObject,
    contractSignBody?: ContractSignMsgBody.AsObject,
    contractLockBody?: ContractLockMsgBody.AsObject,
    contractSettleBody?: ContractSettleMsgBody.AsObject,
    settleItemBody?: ContractSettleItemMsgBody.AsObject,
    requestAdminBody?: AdminMsgBody.AsObject,
    resolveAdminBody?: AdminMsgBody.AsObject,
    finalizeBody?: FinalizeMsgBody.AsObject,
    deadlineExpireBody?: DeadlineExpireMsgBody.AsObject,
    deadlineSettledBody?: DeadlineSettledMsgBody.AsObject,
  }

  export enum BodyCase {
    BODY_NOT_SET = 0,
    COMMENT_BODY = 6,
    PAYOUT_BODY = 7,
    DATE_BODY = 11,
    PRICE_BODY = 8,
    ITEM_BODY = 9,
    REV_BODY = 10,
    ITEM_CREATE_BODY = 12,
    ITEM_DELETE_BODY = 13,
    DEADLINE_CREATE_BODY = 14,
    DEADLINE_DELETE_BODY = 15,
    DEADLINE_ITEM_BODY = 16,
    CONTRACT_SIGN_BODY = 17,
    CONTRACT_LOCK_BODY = 18,
    CONTRACT_SETTLE_BODY = 19,
    SETTLE_ITEM_BODY = 20,
    REQUEST_ADMIN_BODY = 24,
    RESOLVE_ADMIN_BODY = 25,
    FINALIZE_BODY = 26,
    DEADLINE_EXPIRE_BODY = 27,
    DEADLINE_SETTLED_BODY = 39,
  }
}

export class ReadReceiptEntity extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getRead(): boolean;
  setRead(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadReceiptEntity.AsObject;
  static toObject(includeInstance: boolean, msg: ReadReceiptEntity): ReadReceiptEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReadReceiptEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadReceiptEntity;
  static deserializeBinaryFromReader(message: ReadReceiptEntity, reader: jspb.BinaryReader): ReadReceiptEntity;
}

export namespace ReadReceiptEntity {
  export type AsObject = {
    userId: string,
    read: boolean,
  }
}

export class ChatLabel extends jspb.Message {
  getType(): number;
  setType(value: number): void;

  getName(): string;
  setName(value: string): void;

  getItemId(): string;
  setItemId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatLabel.AsObject;
  static toObject(includeInstance: boolean, msg: ChatLabel): ChatLabel.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChatLabel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatLabel;
  static deserializeBinaryFromReader(message: ChatLabel, reader: jspb.BinaryReader): ChatLabel;
}

export namespace ChatLabel {
  export type AsObject = {
    type: number,
    name: string,
    itemId: string,
  }
}

export class CommentMsgBody extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: CommentMsgBody): CommentMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommentMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentMsgBody;
  static deserializeBinaryFromReader(message: CommentMsgBody, reader: jspb.BinaryReader): CommentMsgBody;
}

export namespace CommentMsgBody {
  export type AsObject = {
    message: string,
  }
}

export class ItemCreateMsgBody extends jspb.Message {
  hasItem(): boolean;
  clearItem(): void;
  getItem(): communication_contract_pb.ItemEntity | undefined;
  setItem(value?: communication_contract_pb.ItemEntity): void;

  getType(): number;
  setType(value: number): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemCreateMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: ItemCreateMsgBody): ItemCreateMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ItemCreateMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemCreateMsgBody;
  static deserializeBinaryFromReader(message: ItemCreateMsgBody, reader: jspb.BinaryReader): ItemCreateMsgBody;
}

export namespace ItemCreateMsgBody {
  export type AsObject = {
    item?: communication_contract_pb.ItemEntity.AsObject,
    type: number,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
  }
}

export class ItemDeleteMsgBody extends jspb.Message {
  hasItem(): boolean;
  clearItem(): void;
  getItem(): communication_contract_pb.ItemEntity | undefined;
  setItem(value?: communication_contract_pb.ItemEntity): void;

  getType(): number;
  setType(value: number): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemDeleteMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: ItemDeleteMsgBody): ItemDeleteMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ItemDeleteMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemDeleteMsgBody;
  static deserializeBinaryFromReader(message: ItemDeleteMsgBody, reader: jspb.BinaryReader): ItemDeleteMsgBody;
}

export namespace ItemDeleteMsgBody {
  export type AsObject = {
    item?: communication_contract_pb.ItemEntity.AsObject,
    type: number,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
  }
}

export class DeadlineCreateMsgBody extends jspb.Message {
  hasDeadline(): boolean;
  clearDeadline(): void;
  getDeadline(): communication_contract_pb.DeadlineEntity | undefined;
  setDeadline(value?: communication_contract_pb.DeadlineEntity): void;

  getType(): number;
  setType(value: number): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeadlineCreateMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: DeadlineCreateMsgBody): DeadlineCreateMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeadlineCreateMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeadlineCreateMsgBody;
  static deserializeBinaryFromReader(message: DeadlineCreateMsgBody, reader: jspb.BinaryReader): DeadlineCreateMsgBody;
}

export namespace DeadlineCreateMsgBody {
  export type AsObject = {
    deadline?: communication_contract_pb.DeadlineEntity.AsObject,
    type: number,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
  }
}

export class DeadlineDeleteMsgBody extends jspb.Message {
  hasDeadline(): boolean;
  clearDeadline(): void;
  getDeadline(): communication_contract_pb.DeadlineEntity | undefined;
  setDeadline(value?: communication_contract_pb.DeadlineEntity): void;

  getType(): number;
  setType(value: number): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeadlineDeleteMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: DeadlineDeleteMsgBody): DeadlineDeleteMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeadlineDeleteMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeadlineDeleteMsgBody;
  static deserializeBinaryFromReader(message: DeadlineDeleteMsgBody, reader: jspb.BinaryReader): DeadlineDeleteMsgBody;
}

export namespace DeadlineDeleteMsgBody {
  export type AsObject = {
    deadline?: communication_contract_pb.DeadlineEntity.AsObject,
    type: number,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
  }
}

export class ItemMsgBody extends jspb.Message {
  getItemId(): string;
  setItemId(value: string): void;

  getNewVersion(): string;
  setNewVersion(value: string): void;

  getOldVersion(): string;
  setOldVersion(value: string): void;

  getType(): number;
  setType(value: number): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: ItemMsgBody): ItemMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ItemMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemMsgBody;
  static deserializeBinaryFromReader(message: ItemMsgBody, reader: jspb.BinaryReader): ItemMsgBody;
}

export namespace ItemMsgBody {
  export type AsObject = {
    itemId: string,
    newVersion: string,
    oldVersion: string,
    type: number,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
  }
}

export class DateMsgBody extends jspb.Message {
  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  hasNewVersion(): boolean;
  clearNewVersion(): void;
  getNewVersion(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setNewVersion(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasOldVersion(): boolean;
  clearOldVersion(): void;
  getOldVersion(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setOldVersion(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getType(): number;
  setType(value: number): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DateMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: DateMsgBody): DateMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DateMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DateMsgBody;
  static deserializeBinaryFromReader(message: DateMsgBody, reader: jspb.BinaryReader): DateMsgBody;
}

export namespace DateMsgBody {
  export type AsObject = {
    deadlineId: string,
    newVersion?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    oldVersion?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    type: number,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
  }
}

export class PayoutMsgBody extends jspb.Message {
  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  getNewVersion(): number;
  setNewVersion(value: number): void;

  getOldVersion(): number;
  setOldVersion(value: number): void;

  getType(): number;
  setType(value: number): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PayoutMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: PayoutMsgBody): PayoutMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PayoutMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PayoutMsgBody;
  static deserializeBinaryFromReader(message: PayoutMsgBody, reader: jspb.BinaryReader): PayoutMsgBody;
}

export namespace PayoutMsgBody {
  export type AsObject = {
    deadlineId: string,
    newVersion: number,
    oldVersion: number,
    type: number,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
  }
}

export class PriceMsgBody extends jspb.Message {
  getNewVersion(): number;
  setNewVersion(value: number): void;

  getOldVersion(): number;
  setOldVersion(value: number): void;

  getType(): number;
  setType(value: number): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PriceMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: PriceMsgBody): PriceMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PriceMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PriceMsgBody;
  static deserializeBinaryFromReader(message: PriceMsgBody, reader: jspb.BinaryReader): PriceMsgBody;
}

export namespace PriceMsgBody {
  export type AsObject = {
    newVersion: number,
    oldVersion: number,
    type: number,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
  }
}

export class DeadlineItemMsgBody extends jspb.Message {
  hasDeadline(): boolean;
  clearDeadline(): void;
  getDeadline(): communication_contract_pb.DeadlineEntity | undefined;
  setDeadline(value?: communication_contract_pb.DeadlineEntity): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  clearNewItemStatesList(): void;
  getNewItemStatesList(): Array<number>;
  setNewItemStatesList(value: Array<number>): void;
  addNewItemStates(value: number, index?: number): number;

  clearNewItemsList(): void;
  getNewItemsList(): Array<communication_contract_pb.ItemNub>;
  setNewItemsList(value: Array<communication_contract_pb.ItemNub>): void;
  addNewItems(value?: communication_contract_pb.ItemNub, index?: number): communication_contract_pb.ItemNub;

  getType(): number;
  setType(value: number): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeadlineItemMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: DeadlineItemMsgBody): DeadlineItemMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeadlineItemMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeadlineItemMsgBody;
  static deserializeBinaryFromReader(message: DeadlineItemMsgBody, reader: jspb.BinaryReader): DeadlineItemMsgBody;
}

export namespace DeadlineItemMsgBody {
  export type AsObject = {
    deadline?: communication_contract_pb.DeadlineEntity.AsObject,
    deadlineId: string,
    newItemStatesList: Array<number>,
    newItemsList: Array<communication_contract_pb.ItemNub.AsObject>,
    type: number,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
  }
}

export class ContractSignMsgBody extends jspb.Message {
  getContractStage(): number;
  setContractStage(value: number): void;

  getSignerId(): string;
  setSignerId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSignMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSignMsgBody): ContractSignMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSignMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSignMsgBody;
  static deserializeBinaryFromReader(message: ContractSignMsgBody, reader: jspb.BinaryReader): ContractSignMsgBody;
}

export namespace ContractSignMsgBody {
  export type AsObject = {
    contractStage: number,
    signerId: string,
    contractId: string,
  }
}

export class ContractSettleItemMsgBody extends jspb.Message {
  getContractId(): string;
  setContractId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  getItemId(): string;
  setItemId(value: string): void;

  getItemWorkerSettle(): number;
  setItemWorkerSettle(value: number): void;

  getItemBuyerSettle(): number;
  setItemBuyerSettle(value: number): void;

  getItemAdminSettle(): number;
  setItemAdminSettle(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSettleItemMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSettleItemMsgBody): ContractSettleItemMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSettleItemMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSettleItemMsgBody;
  static deserializeBinaryFromReader(message: ContractSettleItemMsgBody, reader: jspb.BinaryReader): ContractSettleItemMsgBody;
}

export namespace ContractSettleItemMsgBody {
  export type AsObject = {
    contractId: string,
    deadlineId: string,
    itemId: string,
    itemWorkerSettle: number,
    itemBuyerSettle: number,
    itemAdminSettle: number,
  }
}

export class ContractSettleMsgBody extends jspb.Message {
  getContractStage(): number;
  setContractStage(value: number): void;

  getSignerId(): string;
  setSignerId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSettleMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSettleMsgBody): ContractSettleMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSettleMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSettleMsgBody;
  static deserializeBinaryFromReader(message: ContractSettleMsgBody, reader: jspb.BinaryReader): ContractSettleMsgBody;
}

export namespace ContractSettleMsgBody {
  export type AsObject = {
    contractStage: number,
    signerId: string,
    contractId: string,
    deadlineId: string,
  }
}

export class ContractLockMsgBody extends jspb.Message {
  getContractLock(): boolean;
  setContractLock(value: boolean): void;

  getContractId(): string;
  setContractId(value: string): void;

  getType(): number;
  setType(value: number): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractLockMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractLockMsgBody): ContractLockMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractLockMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractLockMsgBody;
  static deserializeBinaryFromReader(message: ContractLockMsgBody, reader: jspb.BinaryReader): ContractLockMsgBody;
}

export namespace ContractLockMsgBody {
  export type AsObject = {
    contractLock: boolean,
    contractId: string,
    type: number,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
  }
}

export class AdminMsgBody extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdminMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: AdminMsgBody): AdminMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AdminMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdminMsgBody;
  static deserializeBinaryFromReader(message: AdminMsgBody, reader: jspb.BinaryReader): AdminMsgBody;
}

export namespace AdminMsgBody {
  export type AsObject = {
  }
}

export class FinalizeMsgBody extends jspb.Message {
  getContractId(): string;
  setContractId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  getConfirmed(): boolean;
  setConfirmed(value: boolean): void;

  getUndo(): boolean;
  setUndo(value: boolean): void;

  getContractStage(): number;
  setContractStage(value: number): void;

  getWorkerSettled(): boolean;
  setWorkerSettled(value: boolean): void;

  getWorkerConfirmed(): boolean;
  setWorkerConfirmed(value: boolean): void;

  getBuyerSettled(): boolean;
  setBuyerSettled(value: boolean): void;

  getBuyerConfirmed(): boolean;
  setBuyerConfirmed(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FinalizeMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: FinalizeMsgBody): FinalizeMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FinalizeMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FinalizeMsgBody;
  static deserializeBinaryFromReader(message: FinalizeMsgBody, reader: jspb.BinaryReader): FinalizeMsgBody;
}

export namespace FinalizeMsgBody {
  export type AsObject = {
    contractId: string,
    deadlineId: string,
    confirmed: boolean,
    undo: boolean,
    contractStage: number,
    workerSettled: boolean,
    workerConfirmed: boolean,
    buyerSettled: boolean,
    buyerConfirmed: boolean,
  }
}

export class DeadlineExpireMsgBody extends jspb.Message {
  getContractId(): string;
  setContractId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeadlineExpireMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: DeadlineExpireMsgBody): DeadlineExpireMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeadlineExpireMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeadlineExpireMsgBody;
  static deserializeBinaryFromReader(message: DeadlineExpireMsgBody, reader: jspb.BinaryReader): DeadlineExpireMsgBody;
}

export namespace DeadlineExpireMsgBody {
  export type AsObject = {
    contractId: string,
    deadlineId: string,
  }
}

export class DeadlineSettledMsgBody extends jspb.Message {
  getContractId(): string;
  setContractId(value: string): void;

  getContractStage(): number;
  setContractStage(value: number): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeadlineSettledMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: DeadlineSettledMsgBody): DeadlineSettledMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeadlineSettledMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeadlineSettledMsgBody;
  static deserializeBinaryFromReader(message: DeadlineSettledMsgBody, reader: jspb.BinaryReader): DeadlineSettledMsgBody;
}

export namespace DeadlineSettledMsgBody {
  export type AsObject = {
    contractId: string,
    contractStage: number,
    deadlineId: string,
  }
}

export class RevMsgBody extends jspb.Message {
  getMsgId(): string;
  setMsgId(value: string): void;

  getResolved(): boolean;
  setResolved(value: boolean): void;

  getResolStatus(): number;
  setResolStatus(value: number): void;

  getWorkerStatus(): number;
  setWorkerStatus(value: number): void;

  getBuyerStatus(): number;
  setBuyerStatus(value: number): void;

  getAdminStatus(): number;
  setAdminStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RevMsgBody.AsObject;
  static toObject(includeInstance: boolean, msg: RevMsgBody): RevMsgBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RevMsgBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RevMsgBody;
  static deserializeBinaryFromReader(message: RevMsgBody, reader: jspb.BinaryReader): RevMsgBody;
}

export namespace RevMsgBody {
  export type AsObject = {
    msgId: string,
    resolved: boolean,
    resolStatus: number,
    workerStatus: number,
    buyerStatus: number,
    adminStatus: number,
  }
}

export class UserJoin extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getRoomId(): string;
  setRoomId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserJoin.AsObject;
  static toObject(includeInstance: boolean, msg: UserJoin): UserJoin.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserJoin, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserJoin;
  static deserializeBinaryFromReader(message: UserJoin, reader: jspb.BinaryReader): UserJoin;
}

export namespace UserJoin {
  export type AsObject = {
    userId: string,
    roomId: string,
  }
}

export class UserLeave extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getRoomId(): string;
  setRoomId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserLeave.AsObject;
  static toObject(includeInstance: boolean, msg: UserLeave): UserLeave.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserLeave, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserLeave;
  static deserializeBinaryFromReader(message: UserLeave, reader: jspb.BinaryReader): UserLeave;
}

export namespace UserLeave {
  export type AsObject = {
    userId: string,
    roomId: string,
  }
}

export class UserClose extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserClose.AsObject;
  static toObject(includeInstance: boolean, msg: UserClose): UserClose.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserClose, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserClose;
  static deserializeBinaryFromReader(message: UserClose, reader: jspb.BinaryReader): UserClose;
}

export namespace UserClose {
  export type AsObject = {
  }
}

export class SendRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getRoomId(): string;
  setRoomId(value: string): void;

  getMethod(): number;
  setMethod(value: number): void;

  hasCommentBody(): boolean;
  clearCommentBody(): void;
  getCommentBody(): CommentMsgBody | undefined;
  setCommentBody(value?: CommentMsgBody): void;

  hasPayoutBody(): boolean;
  clearPayoutBody(): void;
  getPayoutBody(): PayoutMsgBody | undefined;
  setPayoutBody(value?: PayoutMsgBody): void;

  hasDateBody(): boolean;
  clearDateBody(): void;
  getDateBody(): DateMsgBody | undefined;
  setDateBody(value?: DateMsgBody): void;

  hasPriceBody(): boolean;
  clearPriceBody(): void;
  getPriceBody(): PriceMsgBody | undefined;
  setPriceBody(value?: PriceMsgBody): void;

  hasItemBody(): boolean;
  clearItemBody(): void;
  getItemBody(): ItemMsgBody | undefined;
  setItemBody(value?: ItemMsgBody): void;

  hasLabel(): boolean;
  clearLabel(): void;
  getLabel(): ChatLabel | undefined;
  setLabel(value?: ChatLabel): void;

  getBodyCase(): SendRequest.BodyCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendRequest): SendRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendRequest;
  static deserializeBinaryFromReader(message: SendRequest, reader: jspb.BinaryReader): SendRequest;
}

export namespace SendRequest {
  export type AsObject = {
    userId: string,
    roomId: string,
    method: number,
    commentBody?: CommentMsgBody.AsObject,
    payoutBody?: PayoutMsgBody.AsObject,
    dateBody?: DateMsgBody.AsObject,
    priceBody?: PriceMsgBody.AsObject,
    itemBody?: ItemMsgBody.AsObject,
    label?: ChatLabel.AsObject,
  }

  export enum BodyCase {
    BODY_NOT_SET = 0,
    COMMENT_BODY = 6,
    PAYOUT_BODY = 7,
    DATE_BODY = 11,
    PRICE_BODY = 8,
    ITEM_BODY = 9,
  }
}

export class SendResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SendResponse): SendResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendResponse;
  static deserializeBinaryFromReader(message: SendResponse, reader: jspb.BinaryReader): SendResponse;
}

export namespace SendResponse {
  export type AsObject = {
  }
}

export class ChatPullRequest extends jspb.Message {
  getRoomId(): string;
  setRoomId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatPullRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChatPullRequest): ChatPullRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChatPullRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatPullRequest;
  static deserializeBinaryFromReader(message: ChatPullRequest, reader: jspb.BinaryReader): ChatPullRequest;
}

export namespace ChatPullRequest {
  export type AsObject = {
    roomId: string,
    userId: string,
  }
}

export class ChatMessageSet extends jspb.Message {
  getRoomId(): string;
  setRoomId(value: string): void;

  clearMessagesList(): void;
  getMessagesList(): Array<ChatMessage>;
  setMessagesList(value: Array<ChatMessage>): void;
  addMessages(value?: ChatMessage, index?: number): ChatMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatMessageSet.AsObject;
  static toObject(includeInstance: boolean, msg: ChatMessageSet): ChatMessageSet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChatMessageSet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatMessageSet;
  static deserializeBinaryFromReader(message: ChatMessageSet, reader: jspb.BinaryReader): ChatMessageSet;
}

export namespace ChatMessageSet {
  export type AsObject = {
    roomId: string,
    messagesList: Array<ChatMessage.AsObject>,
  }
}

export class NewMessagesRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewMessagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewMessagesRequest): NewMessagesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NewMessagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewMessagesRequest;
  static deserializeBinaryFromReader(message: NewMessagesRequest, reader: jspb.BinaryReader): NewMessagesRequest;
}

export namespace NewMessagesRequest {
  export type AsObject = {
    userId: string,
  }
}

export class NewMessageEntity extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): ChatMessage | undefined;
  setMessage(value?: ChatMessage): void;

  hasContract(): boolean;
  clearContract(): void;
  getContract(): communication_contract_pb.ContractNub | undefined;
  setContract(value?: communication_contract_pb.ContractNub): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewMessageEntity.AsObject;
  static toObject(includeInstance: boolean, msg: NewMessageEntity): NewMessageEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NewMessageEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewMessageEntity;
  static deserializeBinaryFromReader(message: NewMessageEntity, reader: jspb.BinaryReader): NewMessageEntity;
}

export namespace NewMessageEntity {
  export type AsObject = {
    message?: ChatMessage.AsObject,
    contract?: communication_contract_pb.ContractNub.AsObject,
  }
}

export class NewMessageSet extends jspb.Message {
  clearMessagesList(): void;
  getMessagesList(): Array<NewMessageEntity>;
  setMessagesList(value: Array<NewMessageEntity>): void;
  addMessages(value?: NewMessageEntity, index?: number): NewMessageEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewMessageSet.AsObject;
  static toObject(includeInstance: boolean, msg: NewMessageSet): NewMessageSet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NewMessageSet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewMessageSet;
  static deserializeBinaryFromReader(message: NewMessageSet, reader: jspb.BinaryReader): NewMessageSet;
}

export namespace NewMessageSet {
  export type AsObject = {
    messagesList: Array<NewMessageEntity.AsObject>,
  }
}


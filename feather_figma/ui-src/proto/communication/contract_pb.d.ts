// package: main
// file: communication/contract.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class PriceEntity extends jspb.Message {
  getCurrent(): number;
  setCurrent(value: number): void;

  getBuyer(): number;
  setBuyer(value: number): void;

  getWorker(): number;
  setWorker(value: number): void;

  getAwaitingApproval(): boolean;
  setAwaitingApproval(value: boolean): void;

  getProposerId(): string;
  setProposerId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PriceEntity.AsObject;
  static toObject(includeInstance: boolean, msg: PriceEntity): PriceEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PriceEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PriceEntity;
  static deserializeBinaryFromReader(message: PriceEntity, reader: jspb.BinaryReader): PriceEntity;
}

export namespace PriceEntity {
  export type AsObject = {
    current: number,
    buyer: number,
    worker: number,
    awaitingApproval: boolean,
    proposerId: string,
  }
}

export class DeadlineEntity extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getComplete(): boolean;
  setComplete(value: boolean): void;

  getExpired(): boolean;
  setExpired(value: boolean): void;

  getWorkerSettled(): boolean;
  setWorkerSettled(value: boolean): void;

  getBuyerSettled(): boolean;
  setBuyerSettled(value: boolean): void;

  getWorkerConfirmed(): boolean;
  setWorkerConfirmed(value: boolean): void;

  getBuyerConfirmed(): boolean;
  setBuyerConfirmed(value: boolean): void;

  getAdminSettled(): boolean;
  setAdminSettled(value: boolean): void;

  getAwaitingCreation(): boolean;
  setAwaitingCreation(value: boolean): void;

  getAwaitingDeletion(): boolean;
  setAwaitingDeletion(value: boolean): void;

  getDeadlineProposerId(): string;
  setDeadlineProposerId(value: string): void;

  getCurrentPayout(): number;
  setCurrentPayout(value: number): void;

  getWorkerPayout(): number;
  setWorkerPayout(value: number): void;

  getBuyerPayout(): number;
  setBuyerPayout(value: number): void;

  getPayoutAwaitingApproval(): boolean;
  setPayoutAwaitingApproval(value: boolean): void;

  getPayoutProposerId(): string;
  setPayoutProposerId(value: string): void;

  hasCurrentDate(): boolean;
  clearCurrentDate(): void;
  getCurrentDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCurrentDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasWorkerDate(): boolean;
  clearWorkerDate(): void;
  getWorkerDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setWorkerDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasBuyerDate(): boolean;
  clearBuyerDate(): void;
  getBuyerDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setBuyerDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getDateAwaitingApproval(): boolean;
  setDateAwaitingApproval(value: boolean): void;

  getDateProposerId(): string;
  setDateProposerId(value: string): void;

  getDraftRequired(): boolean;
  setDraftRequired(value: boolean): void;

  getItemsProposerId(): string;
  setItemsProposerId(value: string): void;

  clearItemStatesList(): void;
  getItemStatesList(): Array<number>;
  setItemStatesList(value: Array<number>): void;
  addItemStates(value: number, index?: number): number;

  clearItemsList(): void;
  getItemsList(): Array<ItemNub>;
  setItemsList(value: Array<ItemNub>): void;
  addItems(value?: ItemNub, index?: number): ItemNub;

  getItemsAwaitingApproval(): boolean;
  setItemsAwaitingApproval(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeadlineEntity.AsObject;
  static toObject(includeInstance: boolean, msg: DeadlineEntity): DeadlineEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeadlineEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeadlineEntity;
  static deserializeBinaryFromReader(message: DeadlineEntity, reader: jspb.BinaryReader): DeadlineEntity;
}

export namespace DeadlineEntity {
  export type AsObject = {
    id: string,
    contractId: string,
    name: string,
    complete: boolean,
    expired: boolean,
    workerSettled: boolean,
    buyerSettled: boolean,
    workerConfirmed: boolean,
    buyerConfirmed: boolean,
    adminSettled: boolean,
    awaitingCreation: boolean,
    awaitingDeletion: boolean,
    deadlineProposerId: string,
    currentPayout: number,
    workerPayout: number,
    buyerPayout: number,
    payoutAwaitingApproval: boolean,
    payoutProposerId: string,
    currentDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    workerDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    buyerDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    dateAwaitingApproval: boolean,
    dateProposerId: string,
    draftRequired: boolean,
    itemsProposerId: string,
    itemStatesList: Array<number>,
    itemsList: Array<ItemNub.AsObject>,
    itemsAwaitingApproval: boolean,
  }
}

export class DeadlineNub extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getComplete(): boolean;
  setComplete(value: boolean): void;

  getExpired(): boolean;
  setExpired(value: boolean): void;

  getCurrentPayout(): number;
  setCurrentPayout(value: number): void;

  hasCurrentDate(): boolean;
  clearCurrentDate(): void;
  getCurrentDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCurrentDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeadlineNub.AsObject;
  static toObject(includeInstance: boolean, msg: DeadlineNub): DeadlineNub.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeadlineNub, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeadlineNub;
  static deserializeBinaryFromReader(message: DeadlineNub, reader: jspb.BinaryReader): DeadlineNub;
}

export namespace DeadlineNub {
  export type AsObject = {
    id: string,
    contractId: string,
    complete: boolean,
    expired: boolean,
    currentPayout: number,
    currentDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class ContractEntity extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getInvitedEmail(): string;
  setInvitedEmail(value: string): void;

  getInvitePassword(): string;
  setInvitePassword(value: string): void;

  hasWorker(): boolean;
  clearWorker(): void;
  getWorker(): UserNubEntity | undefined;
  setWorker(value?: UserNubEntity): void;

  hasBuyer(): boolean;
  clearBuyer(): void;
  getBuyer(): UserNubEntity | undefined;
  setBuyer(value?: UserNubEntity): void;

  hasPrice(): boolean;
  clearPrice(): void;
  getPrice(): PriceEntity | undefined;
  setPrice(value?: PriceEntity): void;

  clearDeadlinesList(): void;
  getDeadlinesList(): Array<DeadlineEntity>;
  setDeadlinesList(value: Array<DeadlineEntity>): void;
  addDeadlines(value?: DeadlineEntity, index?: number): DeadlineEntity;

  getCurrentDeadlineId(): string;
  setCurrentDeadlineId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getSummary(): string;
  setSummary(value: string): void;

  getStage(): number;
  setStage(value: number): void;

  getUniversalLock(): boolean;
  setUniversalLock(value: boolean): void;

  getWorkerApproved(): boolean;
  setWorkerApproved(value: boolean): void;

  getBuyerApproved(): boolean;
  setBuyerApproved(value: boolean): void;

  clearItemsList(): void;
  getItemsList(): Array<ItemEntity>;
  setItemsList(value: Array<ItemEntity>): void;
  addItems(value?: ItemEntity, index?: number): ItemEntity;

  getRoomId(): string;
  setRoomId(value: string): void;

  getDisputed(): boolean;
  setDisputed(value: boolean): void;

  getAdminRequested(): boolean;
  setAdminRequested(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractEntity.AsObject;
  static toObject(includeInstance: boolean, msg: ContractEntity): ContractEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractEntity;
  static deserializeBinaryFromReader(message: ContractEntity, reader: jspb.BinaryReader): ContractEntity;
}

export namespace ContractEntity {
  export type AsObject = {
    id: string,
    invitedEmail: string,
    invitePassword: string,
    worker?: UserNubEntity.AsObject,
    buyer?: UserNubEntity.AsObject,
    price?: PriceEntity.AsObject,
    deadlinesList: Array<DeadlineEntity.AsObject>,
    currentDeadlineId: string,
    title: string,
    summary: string,
    stage: number,
    universalLock: boolean,
    workerApproved: boolean,
    buyerApproved: boolean,
    itemsList: Array<ItemEntity.AsObject>,
    roomId: string,
    disputed: boolean,
    adminRequested: boolean,
  }
}

export class ContractNub extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getSummary(): string;
  setSummary(value: string): void;

  hasDeadline(): boolean;
  clearDeadline(): void;
  getDeadline(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDeadline(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getPrice(): number;
  setPrice(value: number): void;

  getStage(): number;
  setStage(value: number): void;

  getUserType(): number;
  setUserType(value: number): void;

  getDisputed(): boolean;
  setDisputed(value: boolean): void;

  getAdminRequested(): boolean;
  setAdminRequested(value: boolean): void;

  getWorkerId(): string;
  setWorkerId(value: string): void;

  getBuyerId(): string;
  setBuyerId(value: string): void;

  clearDeadlinesList(): void;
  getDeadlinesList(): Array<DeadlineNub>;
  setDeadlinesList(value: Array<DeadlineNub>): void;
  addDeadlines(value?: DeadlineNub, index?: number): DeadlineNub;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractNub.AsObject;
  static toObject(includeInstance: boolean, msg: ContractNub): ContractNub.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractNub, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractNub;
  static deserializeBinaryFromReader(message: ContractNub, reader: jspb.BinaryReader): ContractNub;
}

export namespace ContractNub {
  export type AsObject = {
    id: string,
    title: string,
    summary: string,
    deadline?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    price: number,
    stage: number,
    userType: number,
    disputed: boolean,
    adminRequested: boolean,
    workerId: string,
    buyerId: string,
    deadlinesList: Array<DeadlineNub.AsObject>,
  }
}

export class InviteDataRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getSecret(): string;
  setSecret(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InviteDataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InviteDataRequest): InviteDataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InviteDataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InviteDataRequest;
  static deserializeBinaryFromReader(message: InviteDataRequest, reader: jspb.BinaryReader): InviteDataRequest;
}

export namespace InviteDataRequest {
  export type AsObject = {
    id: string,
    secret: string,
  }
}

export class ContractInviteNub extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getInvitedEmail(): string;
  setInvitedEmail(value: string): void;

  getInvitedUserInSystem(): boolean;
  setInvitedUserInSystem(value: boolean): void;

  hasWorker(): boolean;
  clearWorker(): void;
  getWorker(): UserNubEntity | undefined;
  setWorker(value?: UserNubEntity): void;

  hasBuyer(): boolean;
  clearBuyer(): void;
  getBuyer(): UserNubEntity | undefined;
  setBuyer(value?: UserNubEntity): void;

  hasPrice(): boolean;
  clearPrice(): void;
  getPrice(): PriceEntity | undefined;
  setPrice(value?: PriceEntity): void;

  clearDeadlinesList(): void;
  getDeadlinesList(): Array<DeadlineEntity>;
  setDeadlinesList(value: Array<DeadlineEntity>): void;
  addDeadlines(value?: DeadlineEntity, index?: number): DeadlineEntity;

  getTitle(): string;
  setTitle(value: string): void;

  getSummary(): string;
  setSummary(value: string): void;

  clearItemsList(): void;
  getItemsList(): Array<ItemEntity>;
  setItemsList(value: Array<ItemEntity>): void;
  addItems(value?: ItemEntity, index?: number): ItemEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractInviteNub.AsObject;
  static toObject(includeInstance: boolean, msg: ContractInviteNub): ContractInviteNub.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractInviteNub, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractInviteNub;
  static deserializeBinaryFromReader(message: ContractInviteNub, reader: jspb.BinaryReader): ContractInviteNub;
}

export namespace ContractInviteNub {
  export type AsObject = {
    id: string,
    invitedEmail: string,
    invitedUserInSystem: boolean,
    worker?: UserNubEntity.AsObject,
    buyer?: UserNubEntity.AsObject,
    price?: PriceEntity.AsObject,
    deadlinesList: Array<DeadlineEntity.AsObject>,
    title: string,
    summary: string,
    itemsList: Array<ItemEntity.AsObject>,
  }
}

export class ContractNubSet extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  clearContractNubsList(): void;
  getContractNubsList(): Array<ContractNub>;
  setContractNubsList(value: Array<ContractNub>): void;
  addContractNubs(value?: ContractNub, index?: number): ContractNub;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractNubSet.AsObject;
  static toObject(includeInstance: boolean, msg: ContractNubSet): ContractNubSet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractNubSet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractNubSet;
  static deserializeBinaryFromReader(message: ContractNubSet, reader: jspb.BinaryReader): ContractNubSet;
}

export namespace ContractNubSet {
  export type AsObject = {
    userId: string,
    contractNubsList: Array<ContractNub.AsObject>,
  }
}

export class UserNubEntity extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  getHasPhoto(): boolean;
  setHasPhoto(value: boolean): void;

  getPhotoUrl(): string;
  setPhotoUrl(value: string): void;

  getWorkerModeEnabled(): boolean;
  setWorkerModeEnabled(value: boolean): void;

  getBuyerModeEnabled(): boolean;
  setBuyerModeEnabled(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserNubEntity.AsObject;
  static toObject(includeInstance: boolean, msg: UserNubEntity): UserNubEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserNubEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserNubEntity;
  static deserializeBinaryFromReader(message: UserNubEntity, reader: jspb.BinaryReader): UserNubEntity;
}

export namespace UserNubEntity {
  export type AsObject = {
    id: string,
    username: string,
    hasPhoto: boolean,
    photoUrl: string,
    workerModeEnabled: boolean,
    buyerModeEnabled: boolean,
  }
}

export class ItemEntity extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getCurrentBody(): string;
  setCurrentBody(value: string): void;

  getWorkerBody(): string;
  setWorkerBody(value: string): void;

  getBuyerBody(): string;
  setBuyerBody(value: string): void;

  getAwaitingApproval(): boolean;
  setAwaitingApproval(value: boolean): void;

  getAwaitingCreation(): boolean;
  setAwaitingCreation(value: boolean): void;

  getAwaitingDeletion(): boolean;
  setAwaitingDeletion(value: boolean): void;

  getWorkerSettled(): number;
  setWorkerSettled(value: number): void;

  getBuyerSettled(): number;
  setBuyerSettled(value: number): void;

  getAdminSettled(): number;
  setAdminSettled(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemEntity.AsObject;
  static toObject(includeInstance: boolean, msg: ItemEntity): ItemEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ItemEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemEntity;
  static deserializeBinaryFromReader(message: ItemEntity, reader: jspb.BinaryReader): ItemEntity;
}

export namespace ItemEntity {
  export type AsObject = {
    id: string,
    contractId: string,
    name: string,
    currentBody: string,
    workerBody: string,
    buyerBody: string,
    awaitingApproval: boolean,
    awaitingCreation: boolean,
    awaitingDeletion: boolean,
    workerSettled: number,
    buyerSettled: number,
    adminSettled: number,
  }
}

export class ItemNub extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getProposer(): string;
  setProposer(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemNub.AsObject;
  static toObject(includeInstance: boolean, msg: ItemNub): ItemNub.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ItemNub, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemNub;
  static deserializeBinaryFromReader(message: ItemNub, reader: jspb.BinaryReader): ItemNub;
}

export namespace ItemNub {
  export type AsObject = {
    id: string,
    proposer: string,
    name: string,
  }
}

export class ContractCreateRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getSummary(): string;
  setSummary(value: string): void;

  getInvitedEmail(): string;
  setInvitedEmail(value: string): void;

  getRole(): number;
  setRole(value: number): void;

  hasPrice(): boolean;
  clearPrice(): void;
  getPrice(): PriceEntity | undefined;
  setPrice(value?: PriceEntity): void;

  clearDeadlinesList(): void;
  getDeadlinesList(): Array<DeadlineEntity>;
  setDeadlinesList(value: Array<DeadlineEntity>): void;
  addDeadlines(value?: DeadlineEntity, index?: number): DeadlineEntity;

  clearItemsList(): void;
  getItemsList(): Array<ItemEntity>;
  setItemsList(value: Array<ItemEntity>): void;
  addItems(value?: ItemEntity, index?: number): ItemEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractCreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ContractCreateRequest): ContractCreateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractCreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractCreateRequest;
  static deserializeBinaryFromReader(message: ContractCreateRequest, reader: jspb.BinaryReader): ContractCreateRequest;
}

export namespace ContractCreateRequest {
  export type AsObject = {
    userId: string,
    title: string,
    summary: string,
    invitedEmail: string,
    role: number,
    price?: PriceEntity.AsObject,
    deadlinesList: Array<DeadlineEntity.AsObject>,
    itemsList: Array<ItemEntity.AsObject>,
  }
}

export class ContractFinishCreationRequest extends jspb.Message {
  getContractId(): string;
  setContractId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractFinishCreationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ContractFinishCreationRequest): ContractFinishCreationRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractFinishCreationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractFinishCreationRequest;
  static deserializeBinaryFromReader(message: ContractFinishCreationRequest, reader: jspb.BinaryReader): ContractFinishCreationRequest;
}

export namespace ContractFinishCreationRequest {
  export type AsObject = {
    contractId: string,
    userId: string,
  }
}

export class ContractUpdateRequest extends jspb.Message {
  getContractId(): string;
  setContractId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getSummary(): string;
  setSummary(value: string): void;

  getInvitedEmail(): string;
  setInvitedEmail(value: string): void;

  getRole(): number;
  setRole(value: number): void;

  hasPrice(): boolean;
  clearPrice(): void;
  getPrice(): PriceEntity | undefined;
  setPrice(value?: PriceEntity): void;

  clearDeadlinesList(): void;
  getDeadlinesList(): Array<DeadlineEntity>;
  setDeadlinesList(value: Array<DeadlineEntity>): void;
  addDeadlines(value?: DeadlineEntity, index?: number): DeadlineEntity;

  clearItemsList(): void;
  getItemsList(): Array<ItemEntity>;
  setItemsList(value: Array<ItemEntity>): void;
  addItems(value?: ItemEntity, index?: number): ItemEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractUpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ContractUpdateRequest): ContractUpdateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractUpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractUpdateRequest;
  static deserializeBinaryFromReader(message: ContractUpdateRequest, reader: jspb.BinaryReader): ContractUpdateRequest;
}

export namespace ContractUpdateRequest {
  export type AsObject = {
    contractId: string,
    userId: string,
    title: string,
    summary: string,
    invitedEmail: string,
    role: number,
    price?: PriceEntity.AsObject,
    deadlinesList: Array<DeadlineEntity.AsObject>,
    itemsList: Array<ItemEntity.AsObject>,
  }
}

export class QueryByIdRequest extends jspb.Message {
  getContractId(): string;
  setContractId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryByIdRequest): QueryByIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryByIdRequest;
  static deserializeBinaryFromReader(message: QueryByIdRequest, reader: jspb.BinaryReader): QueryByIdRequest;
}

export namespace QueryByIdRequest {
  export type AsObject = {
    contractId: string,
    userId: string,
  }
}

export class ContractSuggestPrice extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getNewPrice(): number;
  setNewPrice(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSuggestPrice.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSuggestPrice): ContractSuggestPrice.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSuggestPrice, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSuggestPrice;
  static deserializeBinaryFromReader(message: ContractSuggestPrice, reader: jspb.BinaryReader): ContractSuggestPrice;
}

export namespace ContractSuggestPrice {
  export type AsObject = {
    userId: string,
    contractId: string,
    newPrice: number,
  }
}

export class ContractReactPrice extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractReactPrice.AsObject;
  static toObject(includeInstance: boolean, msg: ContractReactPrice): ContractReactPrice.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractReactPrice, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractReactPrice;
  static deserializeBinaryFromReader(message: ContractReactPrice, reader: jspb.BinaryReader): ContractReactPrice;
}

export namespace ContractReactPrice {
  export type AsObject = {
    userId: string,
    contractId: string,
    messageId: string,
    status: number,
  }
}

export class ContractSuggestDate extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  hasNewDate(): boolean;
  clearNewDate(): void;
  getNewDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setNewDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSuggestDate.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSuggestDate): ContractSuggestDate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSuggestDate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSuggestDate;
  static deserializeBinaryFromReader(message: ContractSuggestDate, reader: jspb.BinaryReader): ContractSuggestDate;
}

export namespace ContractSuggestDate {
  export type AsObject = {
    userId: string,
    contractId: string,
    deadlineId: string,
    newDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class ContractSuggestPayout extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  getNewPayout(): number;
  setNewPayout(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSuggestPayout.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSuggestPayout): ContractSuggestPayout.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSuggestPayout, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSuggestPayout;
  static deserializeBinaryFromReader(message: ContractSuggestPayout, reader: jspb.BinaryReader): ContractSuggestPayout;
}

export namespace ContractSuggestPayout {
  export type AsObject = {
    userId: string,
    contractId: string,
    deadlineId: string,
    newPayout: number,
  }
}

export class ContractSuggestDeadlineItems extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  clearItemIdsList(): void;
  getItemIdsList(): Array<string>;
  setItemIdsList(value: Array<string>): void;
  addItemIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSuggestDeadlineItems.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSuggestDeadlineItems): ContractSuggestDeadlineItems.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSuggestDeadlineItems, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSuggestDeadlineItems;
  static deserializeBinaryFromReader(message: ContractSuggestDeadlineItems, reader: jspb.BinaryReader): ContractSuggestDeadlineItems;
}

export namespace ContractSuggestDeadlineItems {
  export type AsObject = {
    userId: string,
    contractId: string,
    deadlineId: string,
    itemIdsList: Array<string>,
  }
}

export class ContractReactDeadlineItems extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractReactDeadlineItems.AsObject;
  static toObject(includeInstance: boolean, msg: ContractReactDeadlineItems): ContractReactDeadlineItems.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractReactDeadlineItems, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractReactDeadlineItems;
  static deserializeBinaryFromReader(message: ContractReactDeadlineItems, reader: jspb.BinaryReader): ContractReactDeadlineItems;
}

export namespace ContractReactDeadlineItems {
  export type AsObject = {
    userId: string,
    contractId: string,
    messageId: string,
    deadlineId: string,
    status: number,
  }
}

export class ContractReactDate extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractReactDate.AsObject;
  static toObject(includeInstance: boolean, msg: ContractReactDate): ContractReactDate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractReactDate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractReactDate;
  static deserializeBinaryFromReader(message: ContractReactDate, reader: jspb.BinaryReader): ContractReactDate;
}

export namespace ContractReactDate {
  export type AsObject = {
    userId: string,
    contractId: string,
    messageId: string,
    deadlineId: string,
    status: number,
  }
}

export class ContractReactPayout extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractReactPayout.AsObject;
  static toObject(includeInstance: boolean, msg: ContractReactPayout): ContractReactPayout.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractReactPayout, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractReactPayout;
  static deserializeBinaryFromReader(message: ContractReactPayout, reader: jspb.BinaryReader): ContractReactPayout;
}

export namespace ContractReactPayout {
  export type AsObject = {
    userId: string,
    contractId: string,
    messageId: string,
    deadlineId: string,
    status: number,
  }
}

export class ContractSuggestItem extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getItemId(): string;
  setItemId(value: string): void;

  getNewBody(): string;
  setNewBody(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSuggestItem.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSuggestItem): ContractSuggestItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSuggestItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSuggestItem;
  static deserializeBinaryFromReader(message: ContractSuggestItem, reader: jspb.BinaryReader): ContractSuggestItem;
}

export namespace ContractSuggestItem {
  export type AsObject = {
    userId: string,
    contractId: string,
    itemId: string,
    newBody: string,
  }
}

export class ContractReactItem extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  getItemId(): string;
  setItemId(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractReactItem.AsObject;
  static toObject(includeInstance: boolean, msg: ContractReactItem): ContractReactItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractReactItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractReactItem;
  static deserializeBinaryFromReader(message: ContractReactItem, reader: jspb.BinaryReader): ContractReactItem;
}

export namespace ContractReactItem {
  export type AsObject = {
    userId: string,
    contractId: string,
    messageId: string,
    itemId: string,
    status: number,
  }
}

export class ContractSuggestAddItem extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  hasItem(): boolean;
  clearItem(): void;
  getItem(): ItemEntity | undefined;
  setItem(value?: ItemEntity): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSuggestAddItem.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSuggestAddItem): ContractSuggestAddItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSuggestAddItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSuggestAddItem;
  static deserializeBinaryFromReader(message: ContractSuggestAddItem, reader: jspb.BinaryReader): ContractSuggestAddItem;
}

export namespace ContractSuggestAddItem {
  export type AsObject = {
    userId: string,
    contractId: string,
    item?: ItemEntity.AsObject,
  }
}

export class ContractReactAddItem extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  getItemId(): string;
  setItemId(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractReactAddItem.AsObject;
  static toObject(includeInstance: boolean, msg: ContractReactAddItem): ContractReactAddItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractReactAddItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractReactAddItem;
  static deserializeBinaryFromReader(message: ContractReactAddItem, reader: jspb.BinaryReader): ContractReactAddItem;
}

export namespace ContractReactAddItem {
  export type AsObject = {
    userId: string,
    contractId: string,
    messageId: string,
    itemId: string,
    status: number,
  }
}

export class ContractSuggestDelItem extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  hasItem(): boolean;
  clearItem(): void;
  getItem(): ItemEntity | undefined;
  setItem(value?: ItemEntity): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSuggestDelItem.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSuggestDelItem): ContractSuggestDelItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSuggestDelItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSuggestDelItem;
  static deserializeBinaryFromReader(message: ContractSuggestDelItem, reader: jspb.BinaryReader): ContractSuggestDelItem;
}

export namespace ContractSuggestDelItem {
  export type AsObject = {
    userId: string,
    contractId: string,
    item?: ItemEntity.AsObject,
  }
}

export class ContractReactDelItem extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  getItemId(): string;
  setItemId(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractReactDelItem.AsObject;
  static toObject(includeInstance: boolean, msg: ContractReactDelItem): ContractReactDelItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractReactDelItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractReactDelItem;
  static deserializeBinaryFromReader(message: ContractReactDelItem, reader: jspb.BinaryReader): ContractReactDelItem;
}

export namespace ContractReactDelItem {
  export type AsObject = {
    userId: string,
    contractId: string,
    messageId: string,
    itemId: string,
    status: number,
  }
}

export class ContractSuggestAddDeadline extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  hasDeadline(): boolean;
  clearDeadline(): void;
  getDeadline(): DeadlineEntity | undefined;
  setDeadline(value?: DeadlineEntity): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSuggestAddDeadline.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSuggestAddDeadline): ContractSuggestAddDeadline.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSuggestAddDeadline, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSuggestAddDeadline;
  static deserializeBinaryFromReader(message: ContractSuggestAddDeadline, reader: jspb.BinaryReader): ContractSuggestAddDeadline;
}

export namespace ContractSuggestAddDeadline {
  export type AsObject = {
    userId: string,
    contractId: string,
    deadline?: DeadlineEntity.AsObject,
  }
}

export class ContractReactAddDeadline extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractReactAddDeadline.AsObject;
  static toObject(includeInstance: boolean, msg: ContractReactAddDeadline): ContractReactAddDeadline.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractReactAddDeadline, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractReactAddDeadline;
  static deserializeBinaryFromReader(message: ContractReactAddDeadline, reader: jspb.BinaryReader): ContractReactAddDeadline;
}

export namespace ContractReactAddDeadline {
  export type AsObject = {
    userId: string,
    contractId: string,
    messageId: string,
    deadlineId: string,
    status: number,
  }
}

export class ContractSuggestDelDeadline extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  hasDeadline(): boolean;
  clearDeadline(): void;
  getDeadline(): DeadlineEntity | undefined;
  setDeadline(value?: DeadlineEntity): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSuggestDelDeadline.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSuggestDelDeadline): ContractSuggestDelDeadline.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSuggestDelDeadline, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSuggestDelDeadline;
  static deserializeBinaryFromReader(message: ContractSuggestDelDeadline, reader: jspb.BinaryReader): ContractSuggestDelDeadline;
}

export namespace ContractSuggestDelDeadline {
  export type AsObject = {
    userId: string,
    contractId: string,
    deadline?: DeadlineEntity.AsObject,
  }
}

export class ContractReactDelDeadline extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractReactDelDeadline.AsObject;
  static toObject(includeInstance: boolean, msg: ContractReactDelDeadline): ContractReactDelDeadline.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractReactDelDeadline, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractReactDelDeadline;
  static deserializeBinaryFromReader(message: ContractReactDelDeadline, reader: jspb.BinaryReader): ContractReactDelDeadline;
}

export namespace ContractReactDelDeadline {
  export type AsObject = {
    userId: string,
    contractId: string,
    messageId: string,
    deadlineId: string,
    status: number,
  }
}

export class ContractResponse extends jspb.Message {
  hasContract(): boolean;
  clearContract(): void;
  getContract(): ContractEntity | undefined;
  setContract(value?: ContractEntity): void;

  getRole(): number;
  setRole(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ContractResponse): ContractResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractResponse;
  static deserializeBinaryFromReader(message: ContractResponse, reader: jspb.BinaryReader): ContractResponse;
}

export namespace ContractResponse {
  export type AsObject = {
    contract?: ContractEntity.AsObject,
    role: number,
  }
}

export class QueryByUserRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryByUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryByUserRequest): QueryByUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryByUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryByUserRequest;
  static deserializeBinaryFromReader(message: QueryByUserRequest, reader: jspb.BinaryReader): QueryByUserRequest;
}

export namespace QueryByUserRequest {
  export type AsObject = {
    userId: string,
  }
}

export class ClaimContractRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClaimContractRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ClaimContractRequest): ClaimContractRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClaimContractRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClaimContractRequest;
  static deserializeBinaryFromReader(message: ClaimContractRequest, reader: jspb.BinaryReader): ClaimContractRequest;
}

export namespace ClaimContractRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
    password: string,
  }
}

export class SignContractRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignContractRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignContractRequest): SignContractRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignContractRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignContractRequest;
  static deserializeBinaryFromReader(message: SignContractRequest, reader: jspb.BinaryReader): SignContractRequest;
}

export namespace SignContractRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
  }
}

export class SettleContractRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SettleContractRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SettleContractRequest): SettleContractRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SettleContractRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SettleContractRequest;
  static deserializeBinaryFromReader(message: SettleContractRequest, reader: jspb.BinaryReader): SettleContractRequest;
}

export namespace SettleContractRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
  }
}

export class FinishDeadlineRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FinishDeadlineRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FinishDeadlineRequest): FinishDeadlineRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FinishDeadlineRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FinishDeadlineRequest;
  static deserializeBinaryFromReader(message: FinishDeadlineRequest, reader: jspb.BinaryReader): FinishDeadlineRequest;
}

export namespace FinishDeadlineRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
    deadlineId: string,
  }
}

export class ConfirmDeadlineRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfirmDeadlineRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConfirmDeadlineRequest): ConfirmDeadlineRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConfirmDeadlineRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfirmDeadlineRequest;
  static deserializeBinaryFromReader(message: ConfirmDeadlineRequest, reader: jspb.BinaryReader): ConfirmDeadlineRequest;
}

export namespace ConfirmDeadlineRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
    deadlineId: string,
  }
}

export class UndoDeadlineRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UndoDeadlineRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UndoDeadlineRequest): UndoDeadlineRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UndoDeadlineRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UndoDeadlineRequest;
  static deserializeBinaryFromReader(message: UndoDeadlineRequest, reader: jspb.BinaryReader): UndoDeadlineRequest;
}

export namespace UndoDeadlineRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
    deadlineId: string,
  }
}

export class ContractAdminSupport extends jspb.Message {
  getContractId(): string;
  setContractId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractAdminSupport.AsObject;
  static toObject(includeInstance: boolean, msg: ContractAdminSupport): ContractAdminSupport.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractAdminSupport, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractAdminSupport;
  static deserializeBinaryFromReader(message: ContractAdminSupport, reader: jspb.BinaryReader): ContractAdminSupport;
}

export namespace ContractAdminSupport {
  export type AsObject = {
    contractId: string,
    userId: string,
  }
}

export class ContractToggleLockRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getContractLock(): boolean;
  setContractLock(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractToggleLockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ContractToggleLockRequest): ContractToggleLockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractToggleLockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractToggleLockRequest;
  static deserializeBinaryFromReader(message: ContractToggleLockRequest, reader: jspb.BinaryReader): ContractToggleLockRequest;
}

export namespace ContractToggleLockRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
    contractLock: boolean,
  }
}

export class ContractReactLockRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractReactLockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ContractReactLockRequest): ContractReactLockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractReactLockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractReactLockRequest;
  static deserializeBinaryFromReader(message: ContractReactLockRequest, reader: jspb.BinaryReader): ContractReactLockRequest;
}

export namespace ContractReactLockRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
    messageId: string,
    status: number,
  }
}

export class ContractSettleItemRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getDeadlineId(): string;
  setDeadlineId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getItemId(): string;
  setItemId(value: string): void;

  getNewState(): number;
  setNewState(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractSettleItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ContractSettleItemRequest): ContractSettleItemRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractSettleItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractSettleItemRequest;
  static deserializeBinaryFromReader(message: ContractSettleItemRequest, reader: jspb.BinaryReader): ContractSettleItemRequest;
}

export namespace ContractSettleItemRequest {
  export type AsObject = {
    userId: string,
    deadlineId: string,
    contractId: string,
    itemId: string,
    newState: number,
  }
}

export class ContractDeleteDraftRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractDeleteDraftRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ContractDeleteDraftRequest): ContractDeleteDraftRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractDeleteDraftRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractDeleteDraftRequest;
  static deserializeBinaryFromReader(message: ContractDeleteDraftRequest, reader: jspb.BinaryReader): ContractDeleteDraftRequest;
}

export namespace ContractDeleteDraftRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
  }
}

export class NullResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NullResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NullResponse): NullResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NullResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NullResponse;
  static deserializeBinaryFromReader(message: NullResponse, reader: jspb.BinaryReader): NullResponse;
}

export namespace NullResponse {
  export type AsObject = {
  }
}

export class ContractEditResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractEditResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ContractEditResponse): ContractEditResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractEditResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractEditResponse;
  static deserializeBinaryFromReader(message: ContractEditResponse, reader: jspb.BinaryReader): ContractEditResponse;
}

export namespace ContractEditResponse {
  export type AsObject = {
  }
}

export class EmailChangeRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  getNewEmail(): string;
  setNewEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailChangeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailChangeRequest): EmailChangeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailChangeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailChangeRequest;
  static deserializeBinaryFromReader(message: EmailChangeRequest, reader: jspb.BinaryReader): EmailChangeRequest;
}

export namespace EmailChangeRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
    newEmail: string,
  }
}

export class EmailResendRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailResendRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailResendRequest): EmailResendRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailResendRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailResendRequest;
  static deserializeBinaryFromReader(message: EmailResendRequest, reader: jspb.BinaryReader): EmailResendRequest;
}

export namespace EmailResendRequest {
  export type AsObject = {
    userId: string,
    contractId: string,
  }
}


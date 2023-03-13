// package: main
// file: communication/stripe.proto

import * as jspb from "google-protobuf";
import * as communication_contract_pb from "../communication/contract_pb";

export class StripeEntity extends jspb.Message {
  getFirstName(): string;
  setFirstName(value: string): void;

  getLastName(): string;
  setLastName(value: string): void;

  getPhone(): string;
  setPhone(value: string): void;

  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): AddressEntity | undefined;
  setAddress(value?: AddressEntity): void;

  hasDob(): boolean;
  clearDob(): void;
  getDob(): DobEntity | undefined;
  setDob(value?: DobEntity): void;

  getLastFourAccount(): string;
  setLastFourAccount(value: string): void;

  getRoutingNumber(): string;
  setRoutingNumber(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StripeEntity.AsObject;
  static toObject(includeInstance: boolean, msg: StripeEntity): StripeEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StripeEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StripeEntity;
  static deserializeBinaryFromReader(message: StripeEntity, reader: jspb.BinaryReader): StripeEntity;
}

export namespace StripeEntity {
  export type AsObject = {
    firstName: string,
    lastName: string,
    phone: string,
    address?: AddressEntity.AsObject,
    dob?: DobEntity.AsObject,
    lastFourAccount: string,
    routingNumber: string,
  }
}

export class AddressEntity extends jspb.Message {
  getCity(): string;
  setCity(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  getLine1(): string;
  setLine1(value: string): void;

  getLine2(): string;
  setLine2(value: string): void;

  getPostalCode(): string;
  setPostalCode(value: string): void;

  getState(): string;
  setState(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressEntity.AsObject;
  static toObject(includeInstance: boolean, msg: AddressEntity): AddressEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddressEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressEntity;
  static deserializeBinaryFromReader(message: AddressEntity, reader: jspb.BinaryReader): AddressEntity;
}

export namespace AddressEntity {
  export type AsObject = {
    city: string,
    country: string,
    line1: string,
    line2: string,
    postalCode: string,
    state: string,
  }
}

export class DobEntity extends jspb.Message {
  getDay(): number;
  setDay(value: number): void;

  getMonth(): number;
  setMonth(value: number): void;

  getYear(): number;
  setYear(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DobEntity.AsObject;
  static toObject(includeInstance: boolean, msg: DobEntity): DobEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DobEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DobEntity;
  static deserializeBinaryFromReader(message: DobEntity, reader: jspb.BinaryReader): DobEntity;
}

export namespace DobEntity {
  export type AsObject = {
    day: number,
    month: number,
    year: number,
  }
}

export class PaymentRegisterRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getReturnRoute(): string;
  setReturnRoute(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PaymentRegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PaymentRegisterRequest): PaymentRegisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PaymentRegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PaymentRegisterRequest;
  static deserializeBinaryFromReader(message: PaymentRegisterRequest, reader: jspb.BinaryReader): PaymentRegisterRequest;
}

export namespace PaymentRegisterRequest {
  export type AsObject = {
    userId: string,
    returnRoute: string,
  }
}

export class FCSSecret extends jspb.Message {
  getClientSecret(): string;
  setClientSecret(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FCSSecret.AsObject;
  static toObject(includeInstance: boolean, msg: FCSSecret): FCSSecret.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FCSSecret, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FCSSecret;
  static deserializeBinaryFromReader(message: FCSSecret, reader: jspb.BinaryReader): FCSSecret;
}

export namespace FCSSecret {
  export type AsObject = {
    clientSecret: string,
  }
}

export class AccountLinkResp extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountLinkResp.AsObject;
  static toObject(includeInstance: boolean, msg: AccountLinkResp): AccountLinkResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountLinkResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountLinkResp;
  static deserializeBinaryFromReader(message: AccountLinkResp, reader: jspb.BinaryReader): AccountLinkResp;
}

export namespace AccountLinkResp {
  export type AsObject = {
    url: string,
  }
}

export class FCAccountSet extends jspb.Message {
  clearAccountIdsList(): void;
  getAccountIdsList(): Array<string>;
  setAccountIdsList(value: Array<string>): void;
  addAccountIds(value: string, index?: number): string;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FCAccountSet.AsObject;
  static toObject(includeInstance: boolean, msg: FCAccountSet): FCAccountSet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FCAccountSet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FCAccountSet;
  static deserializeBinaryFromReader(message: FCAccountSet, reader: jspb.BinaryReader): FCAccountSet;
}

export namespace FCAccountSet {
  export type AsObject = {
    accountIdsList: Array<string>,
    userId: string,
  }
}

export class IntentCreateReq extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IntentCreateReq.AsObject;
  static toObject(includeInstance: boolean, msg: IntentCreateReq): IntentCreateReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IntentCreateReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IntentCreateReq;
  static deserializeBinaryFromReader(message: IntentCreateReq, reader: jspb.BinaryReader): IntentCreateReq;
}

export namespace IntentCreateReq {
  export type AsObject = {
    userId: string,
  }
}

export class IntentSecret extends jspb.Message {
  getClientSecret(): string;
  setClientSecret(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IntentSecret.AsObject;
  static toObject(includeInstance: boolean, msg: IntentSecret): IntentSecret.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IntentSecret, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IntentSecret;
  static deserializeBinaryFromReader(message: IntentSecret, reader: jspb.BinaryReader): IntentSecret;
}

export namespace IntentSecret {
  export type AsObject = {
    clientSecret: string,
  }
}

export class BankAccountEntity extends jspb.Message {
  getAccountId(): string;
  setAccountId(value: string): void;

  getAccountLast4(): string;
  setAccountLast4(value: string): void;

  getRouting(): string;
  setRouting(value: string): void;

  getAccountType(): string;
  setAccountType(value: string): void;

  getPaymentMethodId(): string;
  setPaymentMethodId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BankAccountEntity.AsObject;
  static toObject(includeInstance: boolean, msg: BankAccountEntity): BankAccountEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BankAccountEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BankAccountEntity;
  static deserializeBinaryFromReader(message: BankAccountEntity, reader: jspb.BinaryReader): BankAccountEntity;
}

export namespace BankAccountEntity {
  export type AsObject = {
    accountId: string,
    accountLast4: string,
    routing: string,
    accountType: string,
    paymentMethodId: string,
  }
}

export class ListRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRequest): ListRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRequest;
  static deserializeBinaryFromReader(message: ListRequest, reader: jspb.BinaryReader): ListRequest;
}

export namespace ListRequest {
  export type AsObject = {
    userId: string,
  }
}

export class BASet extends jspb.Message {
  clearAccountsList(): void;
  getAccountsList(): Array<BankAccountEntity>;
  setAccountsList(value: Array<BankAccountEntity>): void;
  addAccounts(value?: BankAccountEntity, index?: number): BankAccountEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BASet.AsObject;
  static toObject(includeInstance: boolean, msg: BASet): BASet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BASet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BASet;
  static deserializeBinaryFromReader(message: BASet, reader: jspb.BinaryReader): BASet;
}

export namespace BASet {
  export type AsObject = {
    accountsList: Array<BankAccountEntity.AsObject>,
  }
}

export class SetupConfirm extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getPmId(): string;
  setPmId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetupConfirm.AsObject;
  static toObject(includeInstance: boolean, msg: SetupConfirm): SetupConfirm.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetupConfirm, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetupConfirm;
  static deserializeBinaryFromReader(message: SetupConfirm, reader: jspb.BinaryReader): SetupConfirm;
}

export namespace SetupConfirm {
  export type AsObject = {
    userId: string,
    pmId: string,
  }
}

export class FcaQuery extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getFcaId(): string;
  setFcaId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FcaQuery.AsObject;
  static toObject(includeInstance: boolean, msg: FcaQuery): FcaQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FcaQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FcaQuery;
  static deserializeBinaryFromReader(message: FcaQuery, reader: jspb.BinaryReader): FcaQuery;
}

export namespace FcaQuery {
  export type AsObject = {
    userId: string,
    fcaId: string,
  }
}

export class ExBaQuery extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getBaId(): string;
  setBaId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExBaQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ExBaQuery): ExBaQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExBaQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExBaQuery;
  static deserializeBinaryFromReader(message: ExBaQuery, reader: jspb.BinaryReader): ExBaQuery;
}

export namespace ExBaQuery {
  export type AsObject = {
    userId: string,
    baId: string,
  }
}

export class ContractIntentRequest extends jspb.Message {
  getWorkerId(): string;
  setWorkerId(value: string): void;

  getBuyerId(): string;
  setBuyerId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractIntentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ContractIntentRequest): ContractIntentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractIntentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractIntentRequest;
  static deserializeBinaryFromReader(message: ContractIntentRequest, reader: jspb.BinaryReader): ContractIntentRequest;
}

export namespace ContractIntentRequest {
  export type AsObject = {
    workerId: string,
    buyerId: string,
  }
}

export class InternalChargeEntity extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getContractTitle(): string;
  setContractTitle(value: string): void;

  getContractId(): string;
  setContractId(value: string): void;

  hasWorker(): boolean;
  clearWorker(): void;
  getWorker(): communication_contract_pb.UserNubEntity | undefined;
  setWorker(value?: communication_contract_pb.UserNubEntity): void;

  hasBuyer(): boolean;
  clearBuyer(): void;
  getBuyer(): communication_contract_pb.UserNubEntity | undefined;
  setBuyer(value?: communication_contract_pb.UserNubEntity): void;

  getState(): number;
  setState(value: number): void;

  getStateMessage(): string;
  setStateMessage(value: string): void;

  getAmount(): number;
  setAmount(value: number): void;

  getPaymentintentid(): string;
  setPaymentintentid(value: string): void;

  getChargeid(): string;
  setChargeid(value: string): void;

  getTransferid(): string;
  setTransferid(value: string): void;

  getPaymentid(): string;
  setPaymentid(value: string): void;

  getPayoutid(): string;
  setPayoutid(value: string): void;

  getTransfergroup(): string;
  setTransfergroup(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalChargeEntity.AsObject;
  static toObject(includeInstance: boolean, msg: InternalChargeEntity): InternalChargeEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InternalChargeEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalChargeEntity;
  static deserializeBinaryFromReader(message: InternalChargeEntity, reader: jspb.BinaryReader): InternalChargeEntity;
}

export namespace InternalChargeEntity {
  export type AsObject = {
    id: string,
    contractTitle: string,
    contractId: string,
    worker?: communication_contract_pb.UserNubEntity.AsObject,
    buyer?: communication_contract_pb.UserNubEntity.AsObject,
    state: number,
    stateMessage: string,
    amount: number,
    paymentintentid: string,
    chargeid: string,
    transferid: string,
    paymentid: string,
    payoutid: string,
    transfergroup: string,
  }
}

export class InternalChargeRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalChargeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InternalChargeRequest): InternalChargeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InternalChargeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalChargeRequest;
  static deserializeBinaryFromReader(message: InternalChargeRequest, reader: jspb.BinaryReader): InternalChargeRequest;
}

export namespace InternalChargeRequest {
  export type AsObject = {
    userId: string,
  }
}

export class InternalChargeSet extends jspb.Message {
  clearChargesList(): void;
  getChargesList(): Array<InternalChargeEntity>;
  setChargesList(value: Array<InternalChargeEntity>): void;
  addCharges(value?: InternalChargeEntity, index?: number): InternalChargeEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalChargeSet.AsObject;
  static toObject(includeInstance: boolean, msg: InternalChargeSet): InternalChargeSet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InternalChargeSet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalChargeSet;
  static deserializeBinaryFromReader(message: InternalChargeSet, reader: jspb.BinaryReader): InternalChargeSet;
}

export namespace InternalChargeSet {
  export type AsObject = {
    chargesList: Array<InternalChargeEntity.AsObject>,
  }
}

export class InternalChargeCustomQuery extends jspb.Message {
  getFilterKey(): string;
  setFilterKey(value: string): void;

  getFilterValue(): string;
  setFilterValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalChargeCustomQuery.AsObject;
  static toObject(includeInstance: boolean, msg: InternalChargeCustomQuery): InternalChargeCustomQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InternalChargeCustomQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalChargeCustomQuery;
  static deserializeBinaryFromReader(message: InternalChargeCustomQuery, reader: jspb.BinaryReader): InternalChargeCustomQuery;
}

export namespace InternalChargeCustomQuery {
  export type AsObject = {
    filterKey: string,
    filterValue: string,
  }
}

export class InternalChargeUpdateStateRequest extends jspb.Message {
  hasCharge(): boolean;
  clearCharge(): void;
  getCharge(): InternalChargeEntity | undefined;
  setCharge(value?: InternalChargeEntity): void;

  getNewState(): number;
  setNewState(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InternalChargeUpdateStateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InternalChargeUpdateStateRequest): InternalChargeUpdateStateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InternalChargeUpdateStateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InternalChargeUpdateStateRequest;
  static deserializeBinaryFromReader(message: InternalChargeUpdateStateRequest, reader: jspb.BinaryReader): InternalChargeUpdateStateRequest;
}

export namespace InternalChargeUpdateStateRequest {
  export type AsObject = {
    charge?: InternalChargeEntity.AsObject,
    newState: number,
  }
}

export class DeleteConAccRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteConAccRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteConAccRequest): DeleteConAccRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteConAccRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteConAccRequest;
  static deserializeBinaryFromReader(message: DeleteConAccRequest, reader: jspb.BinaryReader): DeleteConAccRequest;
}

export namespace DeleteConAccRequest {
  export type AsObject = {
    userId: string,
  }
}


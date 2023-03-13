// package: main
// file: communication/user.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as communication_file_service_pb from "../communication/file_service_pb";
import * as communication_contract_pb from "../communication/contract_pb";
import * as communication_stripe_pb from "../communication/stripe_pb";

export class UserRegisterRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getFirstName(): string;
  setFirstName(value: string): void;

  getLastName(): string;
  setLastName(value: string): void;

  getPhoneNumber(): string;
  setPhoneNumber(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserRegisterRequest): UserRegisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserRegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRegisterRequest;
  static deserializeBinaryFromReader(message: UserRegisterRequest, reader: jspb.BinaryReader): UserRegisterRequest;
}

export namespace UserRegisterRequest {
  export type AsObject = {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
  }
}

export class UserLoginRequest extends jspb.Message {
  getUsernameOrEmail(): string;
  setUsernameOrEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserLoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserLoginRequest): UserLoginRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserLoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserLoginRequest;
  static deserializeBinaryFromReader(message: UserLoginRequest, reader: jspb.BinaryReader): UserLoginRequest;
}

export namespace UserLoginRequest {
  export type AsObject = {
    usernameOrEmail: string,
    password: string,
  }
}

export class UserSigninResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  hasTokenTimeout(): boolean;
  clearTokenTimeout(): void;
  getTokenTimeout(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTokenTimeout(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): UserEntity | undefined;
  setUser(value?: UserEntity): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserSigninResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserSigninResponse): UserSigninResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserSigninResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserSigninResponse;
  static deserializeBinaryFromReader(message: UserSigninResponse, reader: jspb.BinaryReader): UserSigninResponse;
}

export namespace UserSigninResponse {
  export type AsObject = {
    token: string,
    tokenTimeout?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    user?: UserEntity.AsObject,
  }
}

export class UserLogoutRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserLogoutRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserLogoutRequest): UserLogoutRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserLogoutRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserLogoutRequest;
  static deserializeBinaryFromReader(message: UserLogoutRequest, reader: jspb.BinaryReader): UserLogoutRequest;
}

export namespace UserLogoutRequest {
  export type AsObject = {
    username: string,
    token: string,
  }
}

export class UserLogoutResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserLogoutResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserLogoutResponse): UserLogoutResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserLogoutResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserLogoutResponse;
  static deserializeBinaryFromReader(message: UserLogoutResponse, reader: jspb.BinaryReader): UserLogoutResponse;
}

export namespace UserLogoutResponse {
  export type AsObject = {
  }
}

export class UserPullRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserPullRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserPullRequest): UserPullRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserPullRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserPullRequest;
  static deserializeBinaryFromReader(message: UserPullRequest, reader: jspb.BinaryReader): UserPullRequest;
}

export namespace UserPullRequest {
  export type AsObject = {
    userId: string,
  }
}

export class UserEntity extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  getRole(): number;
  setRole(value: number): void;

  getEmail(): string;
  setEmail(value: string): void;

  getFirstName(): string;
  setFirstName(value: string): void;

  getLastName(): string;
  setLastName(value: string): void;

  getPhoneNumber(): string;
  setPhoneNumber(value: string): void;

  clearContractIdsList(): void;
  getContractIdsList(): Array<number>;
  setContractIdsList(value: Array<number>): void;
  addContractIds(value: number, index?: number): number;

  getInstaAccount(): string;
  setInstaAccount(value: string): void;

  getInstaFollowers(): number;
  setInstaFollowers(value: number): void;

  getInstaVerified(): boolean;
  setInstaVerified(value: boolean): void;

  getTiktokAccount(): string;
  setTiktokAccount(value: string): void;

  getTiktokFollowers(): number;
  setTiktokFollowers(value: number): void;

  getTiktokVerified(): boolean;
  setTiktokVerified(value: boolean): void;

  getPaymentSetup(): boolean;
  setPaymentSetup(value: boolean): void;

  getAdminStatus(): boolean;
  setAdminStatus(value: boolean): void;

  getProfilePhotoUploaded(): boolean;
  setProfilePhotoUploaded(value: boolean): void;

  getProfilePhotoId(): string;
  setProfilePhotoId(value: string): void;

  hasProfilePhoto(): boolean;
  clearProfilePhoto(): void;
  getProfilePhoto(): communication_file_service_pb.ProfileImageEntity | undefined;
  setProfilePhoto(value?: communication_file_service_pb.ProfileImageEntity): void;

  getWorkerModeRequested(): boolean;
  setWorkerModeRequested(value: boolean): void;

  getBuyerModeRequested(): boolean;
  setBuyerModeRequested(value: boolean): void;

  getWorkerModeEnabled(): boolean;
  setWorkerModeEnabled(value: boolean): void;

  getBuyerModeEnabled(): boolean;
  setBuyerModeEnabled(value: boolean): void;

  getDefaultFca(): string;
  setDefaultFca(value: string): void;

  getOutstandingBalance(): number;
  setOutstandingBalance(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserEntity.AsObject;
  static toObject(includeInstance: boolean, msg: UserEntity): UserEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserEntity;
  static deserializeBinaryFromReader(message: UserEntity, reader: jspb.BinaryReader): UserEntity;
}

export namespace UserEntity {
  export type AsObject = {
    id: string,
    username: string,
    role: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    contractIdsList: Array<number>,
    instaAccount: string,
    instaFollowers: number,
    instaVerified: boolean,
    tiktokAccount: string,
    tiktokFollowers: number,
    tiktokVerified: boolean,
    paymentSetup: boolean,
    adminStatus: boolean,
    profilePhotoUploaded: boolean,
    profilePhotoId: string,
    profilePhoto?: communication_file_service_pb.ProfileImageEntity.AsObject,
    workerModeRequested: boolean,
    buyerModeRequested: boolean,
    workerModeEnabled: boolean,
    buyerModeEnabled: boolean,
    defaultFca: string,
    outstandingBalance: number,
  }
}

export class ForgotRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ForgotRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ForgotRequest): ForgotRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ForgotRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ForgotRequest;
  static deserializeBinaryFromReader(message: ForgotRequest, reader: jspb.BinaryReader): ForgotRequest;
}

export namespace ForgotRequest {
  export type AsObject = {
    email: string,
  }
}

export class ResetConfirmRequest extends jspb.Message {
  getResetId(): string;
  setResetId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetConfirmRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ResetConfirmRequest): ResetConfirmRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResetConfirmRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetConfirmRequest;
  static deserializeBinaryFromReader(message: ResetConfirmRequest, reader: jspb.BinaryReader): ResetConfirmRequest;
}

export namespace ResetConfirmRequest {
  export type AsObject = {
    resetId: string,
  }
}

export class ResetConfirmResponse extends jspb.Message {
  getValidId(): boolean;
  setValidId(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetConfirmResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ResetConfirmResponse): ResetConfirmResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResetConfirmResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetConfirmResponse;
  static deserializeBinaryFromReader(message: ResetConfirmResponse, reader: jspb.BinaryReader): ResetConfirmResponse;
}

export namespace ResetConfirmResponse {
  export type AsObject = {
    validId: boolean,
  }
}

export class ChangePasswordRequest extends jspb.Message {
  getResetId(): string;
  setResetId(value: string): void;

  getNewPassword(): string;
  setNewPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePasswordRequest): ChangePasswordRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangePasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePasswordRequest;
  static deserializeBinaryFromReader(message: ChangePasswordRequest, reader: jspb.BinaryReader): ChangePasswordRequest;
}

export namespace ChangePasswordRequest {
  export type AsObject = {
    resetId: string,
    newPassword: string,
  }
}


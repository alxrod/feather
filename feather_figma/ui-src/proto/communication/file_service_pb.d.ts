// package: main
// file: communication/file_service.proto

import * as jspb from "google-protobuf";
import * as communication_contract_pb from "../communication/contract_pb";

export class ProfileUrlRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getFileName(): string;
  setFileName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileUrlRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileUrlRequest): ProfileUrlRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProfileUrlRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileUrlRequest;
  static deserializeBinaryFromReader(message: ProfileUrlRequest, reader: jspb.BinaryReader): ProfileUrlRequest;
}

export namespace ProfileUrlRequest {
  export type AsObject = {
    userId: string,
    fileName: string,
  }
}

export class ProfileUrlResponse extends jspb.Message {
  getPresignedUrl(): string;
  setPresignedUrl(value: string): void;

  getFilePath(): string;
  setFilePath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileUrlResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileUrlResponse): ProfileUrlResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProfileUrlResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileUrlResponse;
  static deserializeBinaryFromReader(message: ProfileUrlResponse, reader: jspb.BinaryReader): ProfileUrlResponse;
}

export namespace ProfileUrlResponse {
  export type AsObject = {
    presignedUrl: string,
    filePath: string,
  }
}

export class ProfileUploadStatus extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getUploadSucceeded(): boolean;
  setUploadSucceeded(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileUploadStatus.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileUploadStatus): ProfileUploadStatus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProfileUploadStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileUploadStatus;
  static deserializeBinaryFromReader(message: ProfileUploadStatus, reader: jspb.BinaryReader): ProfileUploadStatus;
}

export namespace ProfileUploadStatus {
  export type AsObject = {
    userId: string,
    uploadSucceeded: boolean,
  }
}

export class ProfileGetRequest extends jspb.Message {
  clearUserIdsList(): void;
  getUserIdsList(): Array<string>;
  setUserIdsList(value: Array<string>): void;
  addUserIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileGetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileGetRequest): ProfileGetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProfileGetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileGetRequest;
  static deserializeBinaryFromReader(message: ProfileGetRequest, reader: jspb.BinaryReader): ProfileGetRequest;
}

export namespace ProfileGetRequest {
  export type AsObject = {
    userIdsList: Array<string>,
  }
}

export class ProfileGetResponse extends jspb.Message {
  getCacheUrlsMap(): jspb.Map<string, string>;
  clearCacheUrlsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileGetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileGetResponse): ProfileGetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProfileGetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileGetResponse;
  static deserializeBinaryFromReader(message: ProfileGetResponse, reader: jspb.BinaryReader): ProfileGetResponse;
}

export namespace ProfileGetResponse {
  export type AsObject = {
    cacheUrlsMap: Array<[string, string]>,
  }
}

export class ProfileImageEntity extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getFileType(): string;
  setFileType(value: string): void;

  getInCache(): boolean;
  setInCache(value: boolean): void;

  getLocalPath(): string;
  setLocalPath(value: string): void;

  getCacheUrl(): string;
  setCacheUrl(value: string): void;

  getBucketPath(): string;
  setBucketPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProfileImageEntity.AsObject;
  static toObject(includeInstance: boolean, msg: ProfileImageEntity): ProfileImageEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProfileImageEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProfileImageEntity;
  static deserializeBinaryFromReader(message: ProfileImageEntity, reader: jspb.BinaryReader): ProfileImageEntity;
}

export namespace ProfileImageEntity {
  export type AsObject = {
    userId: string,
    fileType: string,
    inCache: boolean,
    localPath: string,
    cacheUrl: string,
    bucketPath: string,
  }
}


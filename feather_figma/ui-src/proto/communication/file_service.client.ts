// @generated by protobuf-ts 2.8.2 with parameter generate_dependencies
// @generated from protobuf file "communication/file_service.proto" (package "communication", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { FileService } from "./file_service";
import type { ProfileGetResponse } from "./file_service";
import type { ProfileGetRequest } from "./file_service";
import type { ProfileImageEntity } from "./file_service";
import type { ProfileUploadStatus } from "./file_service";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { ProfileUrlResponse } from "./file_service";
import type { ProfileUrlRequest } from "./file_service";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service communication.FileService
 */
export interface IFileServiceClient {
    /**
     * @generated from protobuf rpc: PresignProfilePhoto(communication.ProfileUrlRequest) returns (communication.ProfileUrlResponse);
     */
    presignProfilePhoto(input: ProfileUrlRequest, options?: RpcOptions): UnaryCall<ProfileUrlRequest, ProfileUrlResponse>;
    /**
     * @generated from protobuf rpc: ConfirmProfileUploaded(communication.ProfileUploadStatus) returns (communication.ProfileImageEntity);
     */
    confirmProfileUploaded(input: ProfileUploadStatus, options?: RpcOptions): UnaryCall<ProfileUploadStatus, ProfileImageEntity>;
    /**
     * @generated from protobuf rpc: GetProfilePhotos(communication.ProfileGetRequest) returns (communication.ProfileGetResponse);
     */
    getProfilePhotos(input: ProfileGetRequest, options?: RpcOptions): UnaryCall<ProfileGetRequest, ProfileGetResponse>;
}
/**
 * @generated from protobuf service communication.FileService
 */
export class FileServiceClient implements IFileServiceClient, ServiceInfo {
    typeName = FileService.typeName;
    methods = FileService.methods;
    options = FileService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: PresignProfilePhoto(communication.ProfileUrlRequest) returns (communication.ProfileUrlResponse);
     */
    presignProfilePhoto(input: ProfileUrlRequest, options?: RpcOptions): UnaryCall<ProfileUrlRequest, ProfileUrlResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<ProfileUrlRequest, ProfileUrlResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ConfirmProfileUploaded(communication.ProfileUploadStatus) returns (communication.ProfileImageEntity);
     */
    confirmProfileUploaded(input: ProfileUploadStatus, options?: RpcOptions): UnaryCall<ProfileUploadStatus, ProfileImageEntity> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<ProfileUploadStatus, ProfileImageEntity>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetProfilePhotos(communication.ProfileGetRequest) returns (communication.ProfileGetResponse);
     */
    getProfilePhotos(input: ProfileGetRequest, options?: RpcOptions): UnaryCall<ProfileGetRequest, ProfileGetResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<ProfileGetRequest, ProfileGetResponse>("unary", this._transport, method, opt, input);
    }
}

// @generated by protobuf-ts 2.8.2 with parameter generate_dependencies
// @generated from protobuf file "communication/user.proto" (package "communication", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { Auth } from "./user";
import type { FigmaConnectRequest } from "./user";
import type { ChangePasswordRequest } from "./user";
import type { ResetConfirmResponse } from "./user";
import type { ResetConfirmRequest } from "./user";
import type { NullResponse } from "./contract";
import type { ForgotRequest } from "./user";
import type { UserEntity } from "./user";
import type { UserPullRequest } from "./user";
import type { UserLogoutResponse } from "./user";
import type { UserLogoutRequest } from "./user";
import type { UserLoginRequest } from "./user";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { UserSigninResponse } from "./user";
import type { UserRegisterRequest } from "./user";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service communication.Auth
 */
export interface IAuthClient {
    /**
     * @generated from protobuf rpc: Register(communication.UserRegisterRequest) returns (communication.UserSigninResponse);
     */
    register(input: UserRegisterRequest, options?: RpcOptions): UnaryCall<UserRegisterRequest, UserSigninResponse>;
    /**
     * @generated from protobuf rpc: Login(communication.UserLoginRequest) returns (communication.UserSigninResponse);
     */
    login(input: UserLoginRequest, options?: RpcOptions): UnaryCall<UserLoginRequest, UserSigninResponse>;
    /**
     * @generated from protobuf rpc: Logout(communication.UserLogoutRequest) returns (communication.UserLogoutResponse);
     */
    logout(input: UserLogoutRequest, options?: RpcOptions): UnaryCall<UserLogoutRequest, UserLogoutResponse>;
    /**
     * @generated from protobuf rpc: Pull(communication.UserPullRequest) returns (communication.UserEntity);
     */
    pull(input: UserPullRequest, options?: RpcOptions): UnaryCall<UserPullRequest, UserEntity>;
    /**
     * @generated from protobuf rpc: ForgotPassword(communication.ForgotRequest) returns (communication.NullResponse);
     */
    forgotPassword(input: ForgotRequest, options?: RpcOptions): UnaryCall<ForgotRequest, NullResponse>;
    /**
     * @generated from protobuf rpc: ConfirmResetId(communication.ResetConfirmRequest) returns (communication.ResetConfirmResponse);
     */
    confirmResetId(input: ResetConfirmRequest, options?: RpcOptions): UnaryCall<ResetConfirmRequest, ResetConfirmResponse>;
    /**
     * @generated from protobuf rpc: ChangePassword(communication.ChangePasswordRequest) returns (communication.UserSigninResponse);
     */
    changePassword(input: ChangePasswordRequest, options?: RpcOptions): UnaryCall<ChangePasswordRequest, UserSigninResponse>;
    /**
     * @generated from protobuf rpc: ConnectFigma(communication.FigmaConnectRequest) returns (communication.NullResponse);
     */
    connectFigma(input: FigmaConnectRequest, options?: RpcOptions): UnaryCall<FigmaConnectRequest, NullResponse>;
}
/**
 * @generated from protobuf service communication.Auth
 */
export class AuthClient implements IAuthClient, ServiceInfo {
    typeName = Auth.typeName;
    methods = Auth.methods;
    options = Auth.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: Register(communication.UserRegisterRequest) returns (communication.UserSigninResponse);
     */
    register(input: UserRegisterRequest, options?: RpcOptions): UnaryCall<UserRegisterRequest, UserSigninResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserRegisterRequest, UserSigninResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: Login(communication.UserLoginRequest) returns (communication.UserSigninResponse);
     */
    login(input: UserLoginRequest, options?: RpcOptions): UnaryCall<UserLoginRequest, UserSigninResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserLoginRequest, UserSigninResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: Logout(communication.UserLogoutRequest) returns (communication.UserLogoutResponse);
     */
    logout(input: UserLogoutRequest, options?: RpcOptions): UnaryCall<UserLogoutRequest, UserLogoutResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserLogoutRequest, UserLogoutResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: Pull(communication.UserPullRequest) returns (communication.UserEntity);
     */
    pull(input: UserPullRequest, options?: RpcOptions): UnaryCall<UserPullRequest, UserEntity> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<UserPullRequest, UserEntity>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ForgotPassword(communication.ForgotRequest) returns (communication.NullResponse);
     */
    forgotPassword(input: ForgotRequest, options?: RpcOptions): UnaryCall<ForgotRequest, NullResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<ForgotRequest, NullResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ConfirmResetId(communication.ResetConfirmRequest) returns (communication.ResetConfirmResponse);
     */
    confirmResetId(input: ResetConfirmRequest, options?: RpcOptions): UnaryCall<ResetConfirmRequest, ResetConfirmResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<ResetConfirmRequest, ResetConfirmResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ChangePassword(communication.ChangePasswordRequest) returns (communication.UserSigninResponse);
     */
    changePassword(input: ChangePasswordRequest, options?: RpcOptions): UnaryCall<ChangePasswordRequest, UserSigninResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<ChangePasswordRequest, UserSigninResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ConnectFigma(communication.FigmaConnectRequest) returns (communication.NullResponse);
     */
    connectFigma(input: FigmaConnectRequest, options?: RpcOptions): UnaryCall<FigmaConnectRequest, NullResponse> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<FigmaConnectRequest, NullResponse>("unary", this._transport, method, opt, input);
    }
}
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport"
import { RpcOptions, RpcError, RpcMetadata} from "@protobuf-ts/runtime-rpc"
import { 
  QueryByIdRequest,
  ContractResponse,
  InviteDataRequest,
  ContractInviteNub,
  FigmaItemRequest,
  ContractEditResponse,
  QueryByUserRequest,
  ContractNubSet,
  FigmaFileConnectRequest,

} from "./proto/communication/contract";


import {
  ContractClient
} from "./proto/communication/contract.client"

import { 
  UserLoginRequest,
  UserSigninResponse
} from "./proto/communication/user";

import { 
  AuthClient 
} from "./proto/communication/user.client" 

let transport = new GrpcWebFetchTransport({
  baseUrl: "https://feathercontracts.com",
});

let contractClient = new ContractClient(transport);
let authClient = new AuthClient(transport);


export const WORKER_TYPE = 0
export const BUYER_TYPE = 1
export const ADMIN_TYPE = 2
export const BOTH_TYPE = 3

export const contractStages = {
  CREATE: 0,
  INVITE: 1,
  NEGOTIATE: 10,
  ACTIVE: 30,
  SETTLE: 40,
  COMPLETE: 50,
}

export type Ok<T> = { _tag: "Ok"; ok: T };
export type Err<E> = { _tag: "Err"; err: E };
export type ServerResult<T, E> = Ok<T> | Err<E>;
export const ServerResult = Object.freeze({
  Ok: <T, E>(ok: T): ServerResult<T, E> => ({ _tag: "Ok", ok }),
  Err: <T, E>(err: E): ServerResult<T, E> => ({ _tag: "Err", err }),
});

class ApiService {

  queryContractSummary(contract_id: string, contract_secret: string): Promise<ContractInviteNub> {
    let queryRequest: InviteDataRequest = {
      id: contract_id,
      secret: contract_secret,
    };
    return contractClient.inviteQuery(queryRequest).response
  }

  queryContract(contract_id: string, user_id: string, user_token: string): Promise<ContractResponse> {
    let queryRequest: QueryByIdRequest = {
      contractId: contract_id,
      userId: user_id,
    };
    return contractClient.queryById(queryRequest,
      {meta: {authorization: user_token}}
    ).response
  }

  confirmContractConnected(contract_id: string, user_id: string, link: string, user_token: string): Promise<ContractEditResponse> {
    let conRequest: FigmaFileConnectRequest = {
      userId: user_id,
      contractId: contract_id,
      figmaLink: link,
    };
    return contractClient.setFigmaConnected(conRequest,
      {meta: {authorization: user_token}}
    ).response
  }

  queryContractList(user_id: string, user_token: string): Promise<ContractNubSet> {
    let queryRequest: QueryByUserRequest = {
      userId: user_id,
    };
    return contractClient.queryByUser(queryRequest,
      {meta: {authorization: user_token}}
    ).response
  }

  setItemFigmaNodes(
    user_id: string,
    user_token: string,
    contract_id: string, 
    item_id: string,
    component_id: string
  ): Promise<ContractEditResponse> {
    let request: FigmaItemRequest = {
      userId: user_id,
      contractId: contract_id,
      itemId: item_id,
      componentId: component_id,
    };
    return contractClient.setItemFigmaNodes(request, {meta: {authorization: user_token}}).response
  }

  login(usernameOrEmail: string, password: string): Promise<UserSigninResponse> {
    var loginRequest: UserLoginRequest = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    }   
    return authClient.login(loginRequest).response
  }   
}

export default new ApiService();
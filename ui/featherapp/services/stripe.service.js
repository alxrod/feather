import { StripeServiceClient } from "../proto/communication/stripe_grpc_web_pb";
import { 
    PaymentRegisterRequest,
    IntentCreateReq,
    ListRequest,
    SetupConfirm,
    FcaQuery,
    ExBaQuery,
    ContractIntentRequest,
    InternalChargeRequest,
    DeleteConAccRequest,

 } from "../proto/communication/stripe_pb";


export const stripeServiceClient = new StripeServiceClient(process.env.NEXT_PUBLIC_SITE_BASE);

class StripeService {

    confirmPaymentConnected(token, user_id, pm_id) {
        let req = new SetupConfirm();
        req.setUserId(user_id);
        req.setPmId(pm_id)
        console.log("Shipping off ", pm_id);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.confirmPaymentConnected(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve()
            });
        });
    }

    listExBAs(token, user_id) {
        let req = new ListRequest();
        req.setUserId(user_id);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.listExBAs(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                console.log("Resp: ", resp)
                resolve(resp.accountsList)
            });
        });
    }

    listFcas(token, user_id) {
        let req = new ListRequest();
        req.setUserId(user_id);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.listFcas(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                console.log("Resp: ", resp)
                resolve(resp.accountsList)
            });
        });
    }

    disconnectFca(token, user_id, fca_id) {
        let req = new FcaQuery();
        req.setUserId(user_id);
        req.setFcaId(fca_id);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.disconnectFca(req, metadata, function(error, response) {
                if (error) {
                    reject(error.message)
                    return
                }
                resolve()
            });
        });
    }

    disconnectExBa(token, user_id, ba_id) {
        let req = new ExBaQuery();
        req.setUserId(user_id);
        req.setBaId(ba_id);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.disconnectExBa(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve()
            });
        });
    }
    
    deleteConnectedAccount(token, user_id) {
        let req = new DeleteConAccRequest();
        req.setUserId(user_id);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.deleteConnectedAccount(req, metadata, function(error, response) {
                if (error) {
                    reject(error.message)
                    return
                }
                resolve()
            });
        });
    }

    setDefaultFca(token, user_id, fca_id) {
        let req = new FcaQuery();
        req.setUserId(user_id);
        req.setFcaId(fca_id);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.setDefaultFca(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                resolve()
            });
        });
    }

    getInitialSetupSecret(token, user_id) {
        let req = new PaymentRegisterRequest();
        req.setUserId(user_id);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.getInitialSetupSecret(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                resolve(resp.clientSecret)
            });
        });
    }
    
    // renewIntentSecret(token, user_id) {
    //     let req = new IntentCreateReq();
    //     req.setUserId(user_id);
    //     return new Promise( (resolve, reject) => { 
    //         var metadata = {"authorization": token}
    //         stripeServiceClient.renewIntentSecret(req, metadata, function(error, response) {
    //             if (error) {
    //                 reject(error)
    //             }
    //             var resp = response.toObject();
    //             resolve(resp.clientSecret)
    //         });
    //     });
    // }

    getCustomerFCSecret(token, user_id) {
        let req = new PaymentRegisterRequest();
        req.setUserId(user_id);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.getCustomerFCSecret(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                resolve(resp.clientSecret)
            });
        });
    }

    getAccountOnboardLink(token, user_id, return_route) {
        let req = new PaymentRegisterRequest();
        req.setUserId(user_id);
        req.setReturnRoute(return_route);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.getAccountOnboardLink(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                resolve(resp.url)
            });
        });
    }

    createContractIntentSecret(token, worker_id, buyer_id) {
        let req = new ContractIntentRequest();
        req.setWorkerId(worker_id);
        req.setBuyerId(buyer_id);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            stripeServiceClient.createContractIntentSecret(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                resolve()
            });
        }); 
    }

    getInternalCharges(token, user_id) {
        let req = new InternalChargeRequest();
        req.setUserId(user_id);

        return new Promise( (resolve, reject) => {
            var metadata = {"authorization": token}
            stripeServiceClient.getInternalCharges(req, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                resolve(resp.chargesList)
            });
        });
    }
    // addFCAccounts(token, user_id, account_ids) {
    //     let req = new FCAccountSet();
    //     req.setUserId(user_id);
    //     for (var i = 0; i < account_ids.length; i++) {
    //         req.addAccountIds(account_ids[i], i);
    //     }
    //     console.log("Sending off ", req)
    //     return new Promise( (resolve, reject) => { 
    //         var metadata = {"authorization": token}
    //         stripeServiceClient.addFCAccounts(req, metadata, function(error, response) {
    //             if (error) {
    //                 reject(error)
    //             }
    //             // var resp = response.toObject();
    //             resolve()
    //         });
    //     });
    // }

}


export default new StripeService();
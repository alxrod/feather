import { AuthClient, SocialClient, PaymentClient } from "../proto/communication/user_grpc_web_pb";
import { 
    UserLoginRequest,
    UserRegisterRequest,
    UserLogoutRequest,
    UserPullRequest,

    InstagramCreateRequest,
    InstagramVerifyRequest,
    TiktokCreateRequest,
    TiktokVerifyRequest,

    PaymentSetupRequest,

 } from "../proto/communication/user_pb";

export const authClient = new AuthClient("https://localhost:8080");
export const socialClient = new SocialClient("https://localhost:8080");
export const paymentClient = new PaymentClient("https://localhost:8080");

export const WORKER_TYPE = 0
export const BUYER_TYPE = 1

class UserService {

    // Auth Requests
    login(username, password) {
        var loginRequest = new UserLoginRequest();   
        loginRequest.setUsername(username);
        loginRequest.setPassword(password);

        return new Promise( (resolve, reject) => { 
            authClient.login(loginRequest, null, function(error, response) {
                if (error) {
                    reject(error)
                    return 
                }
                var resp = response.toObject();
                if (resp.error !== "") {
                    reject(resp.error)
                    return
                } else {
                    var data = {
                        username: resp.username,
                        access_token: resp.token,
                        user_id: resp.id,
                        role: resp.role,
                    }
                    localStorage.setItem("user", JSON.stringify(data));
                    resolve(data)
                }
               reject(new Error("Catch all invalid request"))
            });
        });
    }   


    register(username, full_name, email, password) {
        var registerRequest = new UserRegisterRequest();   
        registerRequest.setUsername(username);
        registerRequest.setFullName(full_name);
        registerRequest.setEmail(email);
        registerRequest.setPassword(password);
        registerRequest.setUserType(WORKER_TYPE);

        console.log(registerRequest.toObject());
        return new Promise (function (resolve, reject) {
            authClient.register(registerRequest, null, function(err, response) {
                if (err) {
                    reject(err)
                }
                var resp = response.toObject();
                
                if (resp.token) {
                    const data = {
                        username: resp.username,
                        access_token: resp.token,
                        user_id: resp.id,
                        role: resp.role,
                    }
                    localStorage.setItem("user", JSON.stringify(data));
                    resolve(data)
                }
                if (resp.success === false && resp.error !== "") {
                    reject(resp.error)
                }
                reject(new Error("Catch all invalid request"))
            });
        });
    }

    logout() {
        var logoutRequest = new UserLogoutRequest();   
        
        var user = JSON.parse(localStorage.getItem("user"));
        if (user === null) {
            return Error("You are not currently logged in")
        }
        logoutRequest.setUsername(user.username);
        logoutRequest.setToken(user.access_token);

        authClient.logout(logoutRequest, null, function(err, response) {
            if (err) {
                return err
            }
            var resp = response.toObject();
            localStorage.removeItem("user");

        });
        return Error("Request failed")
        
    }

    // Social Setup Requests
    add_instagram(token, user_id, account) {
        var addRequest = new InstagramCreateRequest;   
        addRequest.setAccount(account);
        addRequest.setUserId(user_id);
        // TODO connect these to Paul's authenticator
        addRequest.setVerified(false);
        addRequest.setFollowers(100000);

        var metadata = {"authorization": token}

        return new Promise( (resolve, reject) => { 

            socialClient.addInstagram(addRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                
                if (resp.account) {
                    var data = {
                        account: resp.account,
                        followers: resp.followers,
                        verified: resp.verified,
                        platform: "Instagram"
                    }
                    resolve(data)
                }
               reject(new Error("Catch all invalid request"))
            });
        });
    }

    add_tiktok(token, user_id, account) {
        var addRequest = new TiktokCreateRequest;   
        addRequest.setAccount(account);
        addRequest.setUserId(user_id);
        // TODO connect these to Paul's authenticator
        addRequest.setVerified(false);
        addRequest.setFollowers(100000);

        var metadata = {"authorization": token}

        return new Promise( (resolve, reject) => { 
            socialClient.addTiktok(addRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                
                if (resp.account) {
                    var data = {
                        account: resp.account,
                        followers: resp.followers,
                        verified: resp.verified,
                        platform: "Tiktok"
                    }
                    resolve(data)
                }
               reject(new Error("Catch all invalid request"))
            });
        });
    }

    verify_instagram(token, user_id, code) {
        var verifyRequest = new InstagramVerifyRequest; 
          
        verifyRequest.setUserId(user_id);
        verifyRequest.setCode(code);

        var metadata = {"authorization": token}

        return new Promise( (resolve, reject) => { 
            socialClient.verifyInstagram(verifyRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                
                if (resp.account) {
                    var data = {
                        account: resp.account,
                        followers: resp.followers,
                        verified: resp.verified,
                        platform: "Instagram"
                    }
                    resolve(data)
                }
               reject(new Error("Catch all invalid request"))
            });
        });
    }
    
    verify_tiktok(token, user_id, code) {
        var verifyRequest = new TiktokVerifyRequest; 
          
        verifyRequest.setUserId(user_id);
        verifyRequest.setCode(code);

        var metadata = {"authorization": token}

        return new Promise( (resolve, reject) => { 
            socialClient.verifyTiktok(verifyRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                
                if (resp.account) {
                    var data = {
                        account: resp.account,
                        followers: resp.followers,
                        verified: resp.verified,
                        platform: "Tiktok"
                    }
                    resolve(data)
                }
               reject(new Error("Catch all invalid request"))
            });
        });
    }

    // Payment Setup (WILL BE REPLACED BY STRIPE ASAP)
    add_payment(token, user_id, card_number, card_holder, month, year, zip, cvv) {
        var addRequest = new PaymentSetupRequest;   
        addRequest.setUserId(user_id);
        addRequest.setCardNumber(card_number);
        addRequest.setCardHolder(card_holder);
        addRequest.setMonth(month);
        addRequest.setYear(year);
        addRequest.setZip(zip);
        addRequest.setCvv(cvv); 

        var metadata = {"authorization": token}

        return new Promise( (resolve, reject) => { 
            paymentClient.setupPayment(addRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();
                
                if (resp.valid == true) {
                    resolve(resp)
                }
               reject(new Error("Catch all invalid request"))
            });
        });
    }

    
    pull_user(token, user_id) {
        var pullRequest = new UserPullRequest();   
        pullRequest.setUserId(user_id);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            authClient.pull(pullRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                console.log(response)
                var resp = response.toObject();
                
                resolve(resp)
            });
        });
    }
}

export const ownership_format = (data, user_type) => {
    if (user_type === WORKER_TYPE) {
        data.worker = data.you
        data.buyer = data.partner
    } else {
        data.worker = data.partner
        data.buyer = data.you
    }
    delete data.you
    delete data.partner
    return data
}

export default new UserService();
import { AuthClient, SocialClient, PaymentClient } from "../proto/communication/user_grpc_web_pb";
import { 
    UserLoginRequest,
    UserRegisterRequest,
    UserLogoutRequest,

    InstagramCreateRequest,
    InstagramVerifyRequest,
    TiktokCreateRequest,
    TiktokVerifyRequest,

    PaymentSetupRequest,

 } from "../proto/communication/user_pb";

export const authClient = new AuthClient("https://localhost:8080");
export const socialClient = new SocialClient("https://localhost:8080");
export const paymentClient = new PaymentClient("https://localhost:8080");

export const INFLUENCER_TYPE = 0
export const SPONSOR_TYPE = 1

class UserService {
    // Auth Requests
    login(username, password) {
        var loginRequest = new UserLoginRequest();   
        loginRequest.setUsername(username);
        loginRequest.setPassword(password);

        return new Promise( (resolve, reject) => { 
            authClient.login(loginRequest, null, function(error, response) {
                var resp = response.toObject();
                if (error) {
                    reject(error)
                }
                if (resp.token) {
                    var data = {
                        username: resp.username,
                        accessToken: resp.token,
                    }
                    localStorage.setItem("user", JSON.stringify(data));
                    resolve(data)
                }
                if (resp.success === false && resp.error !== "") {
                    reject(new Error(resp.error))
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
        registerRequest.setUserType(INFLUENCER_TYPE);

        console.log(registerRequest.toObject());
        return new Promise (function (resolve, reject) {
            authClient.register(registerRequest, null, function(err, response) {
                var resp = response.toObject();
                if (err) {
                    reject(err)
                }
                if (resp.token) {
                    const data = {
                        username: resp.username,
                        accessToken: resp.token
                    }
                    localStorage.setItem("user", JSON.stringify(data));
                    resolve()
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
        logoutRequest.setToken(user.accessToken);

        authClient.logout(logoutRequest, null, function(err, response) {
            var resp = response.toObject();
            if (err) {
                return err
            }
            if (resp.success) {
                localStorage.removeItem("user");
            } else {
                return Error(resp.error)
            }
        });
        return Error("Request failed")
        
    }

    // Social Setup Requests
    add_instagram(user_id, account) {
        var addRequest = new InstagramCreateRequest;   
        addRequest.setAccount(account);
        addRequest.setUserId(user_id);
        // TODO connect these to Paul's authenticator
        addRequest.setVerified(true);
        addRequest.setFollowers(100000);

        return new Promise( (resolve, reject) => { 
            socialClient.addInstagram(addRequest, null, function(error, response) {
                var resp = response.toObject();
                if (error) {
                    reject(error)
                }
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

    add_tiktok(user_id, account) {
        var addRequest = new TiktokCreateRequest;   
        addRequest.setAccount(account);
        addRequest.setUserId(user_id);
        // TODO connect these to Paul's authenticator
        addRequest.setVerified(true);
        addRequest.setFollowers(100000);

        return new Promise( (resolve, reject) => { 
            socialClient.addTiktok(addRequest, null, function(error, response) {
                var resp = response.toObject();
                if (error) {
                    reject(error)
                }
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

    verify_instagram(user_id) {
        var verifyRequest = new InstagramVerifyRequest; 
          
        verifyRequest.setUserId(user_id);
        // TODO connect these to Paul's authenticator
        verifyRequest.setVerified(true);

        return new Promise( (resolve, reject) => { 
            socialClient.verifyInstagram(verifyRequest, null, function(error, response) {
                var resp = response.toObject();
                if (error) {
                    reject(error)
                }
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
    
    verify_tiktok(user_id) {
        var verifyRequest = new TiktokVerifyRequest; 
          
        verifyRequest.setUserId(user_id);
        // TODO connect these to Paul's authenticator
        verifyRequest.setVerified(true);

        return new Promise( (resolve, reject) => { 
            socialClient.verifyTiktok(verifyRequest, null, function(error, response) {
                var resp = response.toObject();
                if (error) {
                    reject(error)
                }
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
    add_payment(user_id, card_number, card_holder, month, year, zip, cvv) {
        var addRequest = new PaymentSetupRequest;   
        addRequest.setUserId(user_id);
        addRequest.setCardNumber(card_number);
        addRequest.setCardHolder(card_holder);
        addRequest.setMonth(month);
        addRequest.setYear(year);
        addRequest.setZip(zip);
        addRequest.setCvv(cvv); 

        return new Promise( (resolve, reject) => { 
            paymentClient.setupPayment(addRequest, null, function(error, response) {
                var resp = response.toObject();
                if (error) {
                    reject(error)
                }
                if (resp.valid == true) {
                    resolve(resp)
                }
               reject(new Error("Catch all invalid request"))
            });
        });
    }
}

export default new UserService();
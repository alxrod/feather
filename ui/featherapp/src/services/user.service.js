import { AuthClient, SocialClient, PaymentClient } from "../proto/communication/user_grpc_web_pb";
import { 
    UserLoginRequest,
    UserRegisterRequest,
    UserLogoutRequest,
    UserPullRequest,

    ForgotRequest,
    DOBEntity,

    ResetConfirmRequest,
    ChangePasswordRequest,

 } from "../proto/communication/user_pb";

console.log("Trying: ", process.env.APP_SITE_BASE)
export const authClient = new AuthClient(process.env.REACT_APP_SITE_BASE);

export const WORKER_TYPE = 0
export const BUYER_TYPE = 1
export const ADMIN_TYPE = 2
export const BOTH_TYPE = 3

class UserService {

    // Auth Requests
    login(username, password, remember) {
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
                var creds = {
                    username: resp.user.username,
                    password: password,
                    user_id: resp.user.id,
                    access_token: resp.token,
                    token_timeout: response.getTokenTimeout().toDate(),
                    admin_status: resp.user.adminStatus,
                }
                if (remember) {
                    localStorage.setItem("creds", JSON.stringify(creds));
                    localStorage.setItem("user", JSON.stringify(resp.user));
                } else {
                    sessionStorage.setItem("creds", JSON.stringify(creds));
                    sessionStorage.setItem("user", JSON.stringify(resp.user));
                }
                resolve(resp)
            });
        });
    }   


    register(username, first_name, last_name, email, password, phone, date, user_type) {
        var registerRequest = new UserRegisterRequest();   
        registerRequest.setUsername(username);

        registerRequest.setEmail(email);
        registerRequest.setPassword(password);
        registerRequest.setUserType(user_type);

        registerRequest.setFirstName(first_name)
        registerRequest.setLastName(last_name)

        registerRequest.setPhoneNumber(phone);

        
        if (user_type == BOTH_TYPE) {
            console.log("Activating this")
            registerRequest.setWorkerRequested(true);
            registerRequest.setBuyerRequested(true);
        } else if (user_type == BUYER_TYPE) {
            registerRequest.setBuyerRequested(true);
        } else if (user_type == WORKER_TYPE) {
            registerRequest.setWorkerRequested(true);
        } else {
            console.log("Invalid type: ", user_type)
        }
        
        const dob = new DOBEntity()
        dob.setDay(date.day)
        dob.setMonth(date.month)
        dob.setYear(date.year)
        registerRequest.setDob(dob);

        return new Promise (function (resolve, reject) {
            authClient.register(registerRequest, null, function(err, response) {
                if (err) {
                    reject(err)
                    console.log("Error: ", err)

                } else {
                    var resp = response.toObject();
                    
                    var creds = {
                        username: resp.user.username,
                        password: password,
                        user_id: resp.user.id,
                        access_token: resp.token,
                        admin_status: resp.user.adminStatus,
                        token_timeout: response.getTokenTimeout().toDate(),
                    }
                    localStorage.setItem("creds", JSON.stringify(creds));
                    localStorage.setItem("user", JSON.stringify(resp.user));
                    resolve(resp)
                }
    
                
            });
        });
    }

    logout(token) {
        var logoutRequest = new UserLogoutRequest();   
        
        var user = JSON.parse(localStorage.getItem("user"));
        if (user === null) {
            return Error("You are not currently logged in")
        }
        logoutRequest.setUsername(user.username);
        logoutRequest.setToken(token);

        localStorage.removeItem("user");
        localStorage.removeItem("creds");
        localStorage.removeItem("contractNubs");
        
        authClient.logout(logoutRequest, null, function(err, response) {
            if (err) {
                return err
            }
            var resp = response.toObject();
            

        });
        return Error("Request failed")
        
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
                var resp = response.toObject();
                localStorage.setItem("user", JSON.stringify(resp));
                resolve(resp)
            });
        });
    }

    forgotPassword(email) {
        var forgotRequest = new ForgotRequest();   
        forgotRequest.setEmail(email);

        return new Promise( (resolve, reject) => { 
            authClient.forgotPassword(forgotRequest, null, function(error, response) {
                if (error) {
                    reject(error)
                    return 
                }
                var resp = response.toObject();
                resolve(resp)
            });
        });
    }

    confirmResetId(reset_id) {
        var confirmRequest = new ResetConfirmRequest();   
        confirmRequest.setResetId(reset_id);

        return new Promise( (resolve, reject) => { 
            authClient.confirmResetId(confirmRequest, null, function(error, response) {
                if (error) {
                    reject(error)
                    return 
                }
                var resp = response.toObject();
                resolve(resp)
            });
        });
    }

    changePassword(reset_id, new_password) {
        var changeRequest = new ChangePasswordRequest();   
        changeRequest.setResetId(reset_id);
        changeRequest.setNewPassword(new_password);

        return new Promise( (resolve, reject) => { 
            authClient.changePassword(changeRequest, null, function(error, response) {
                if (error) {
                    reject(error)
                    return 
                }
                var resp = response.toObject();
                var creds = {
                    username: resp.user.username,
                    password: new_password,
                    user_id: resp.user.id,
                    access_token: resp.token,
                    token_timeout: response.getTokenTimeout().toDate(),
                    admin_status: resp.user.adminStatus,
                }
                localStorage.setItem("creds", JSON.stringify(creds));
                localStorage.setItem("user", JSON.stringify(resp.user));
                resolve(resp)
            });
        });
    }

    authChecker(needAuth) {
        let remember = true
        let creds = JSON.parse(localStorage.getItem("creds"))
        if (!creds) {
            remember = false
            creds = JSON.parse(sessionStorage.getItem("creds"))
        }
        if (needAuth && creds === null) {
            return Promise.reject({})
        } else if (needAuth && creds) {
            const d = new Date(creds.token_timeout)
            if (d <= Date.now()) {
                return new Promise((resolve, reject) => {
                    var loginRequest = new UserLoginRequest();   
                    loginRequest.setUsername(creds.username);
                    loginRequest.setPassword(creds.password);
            
                    authClient.login(loginRequest, null, function(error, response) {
                        if (error) {
                            reject(error)
                        }
                        var resp = response.toObject();
            
                        var new_creds = {
                            username: resp.user.username,
                            password: creds.password,
                            admin_status: creds.adminStatus,
                            user_id: resp.user.id,
                            access_token: resp.token,
                            token_timeout: response.getTokenTimeout().toDate(),
                        }
                        if (remember) {
                            localStorage.setItem("creds", JSON.stringify(new_creds));
                        } else {
                            sessionStorage.setItem("creds", JSON.stringify(new_creds));
                        }
                       
                        resolve(new_creds)
                    })
                })
            } else {
                return Promise.resolve(creds)
            }
        } else {
            return Promise.reject({})
        }
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
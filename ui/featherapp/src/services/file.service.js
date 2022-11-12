import { FileServiceClient } from "../proto/communication/file_service_grpc_web_pb";
import { 
    ProfileUrlRequest,
    ProfileUploadStatus,
    ProfileGetRequest,
 } from "../proto/communication/file_service_pb";

export const fileServiceClient = new FileServiceClient("https://localhost:8080");

class FileService {

    presignProfilePhoto(token, user_id, filename) {
        let urlRequest = new ProfileUrlRequest();
        urlRequest.setUserId(user_id);
        urlRequest.setFileName(filename);
        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            fileServiceClient.presignProfilePhoto(urlRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();

                resolve(resp.presignedUrl)
            });
        });
    }

    confirmProfileUploaded(token, user_id, status) {
        let confirmRequest = new ProfileUploadStatus();
        confirmRequest.setUserId(user_id);
        confirmRequest.setUploadSucceeded(status)
        let metadata = {"authorization": token}
        fileServiceClient.confirmProfileUploaded(confirmRequest, metadata, function(error, response) {
            if (error) {
                return false
            } else {
                return
            }
        });
    }

    getProfilePicUrl(token, user_id) {
        let getRequest = new ProfileGetRequest();
        getRequest.setUserId(user_id);

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            fileServiceClient.getProfilePhoto(getRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                }
                var resp = response.toObject();

                resolve(resp.presignedUrl)
            });
        });
    }

}


export default new FileService();
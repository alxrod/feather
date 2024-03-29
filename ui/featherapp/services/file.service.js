import { FileServiceClient } from "../proto/communication/file_service_grpc_web_pb";
import { 
    ProfileUrlRequest,
    ProfileUploadStatus,
    ProfileGetRequest,
 } from "../proto/communication/file_service_pb";

export const fileServiceClient = new FileServiceClient(process.env.NEXT_PUBLIC_API_URL);

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
                    return
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
        return new Promise( (resolve, reject) => { 
            let metadata = {"authorization": token}
            fileServiceClient.confirmProfileUploaded(confirmRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                    return
                } else {
                    var resp = response.toObject();
                    resolve(resp)
                }
            });
        });
    }

    getProfilePicUrls(token, user_ids) {
        let getRequest = new ProfileGetRequest();
        for (let i = 0; i < user_ids.length; i++) {
            getRequest.addUserIds(user_ids[i]);
        }

        return new Promise( (resolve, reject) => { 
            var metadata = {"authorization": token}
            fileServiceClient.getProfilePhotos(getRequest, metadata, function(error, response) {
                if (error) {
                    reject(error)
                    return
                }
                var resp = response.toObject();

                resolve(resp)
            });
        });
    }

}


export default new FileService();
import FileService from "../../../services/file.service";

import * as fileActions from "../file.actions";
import * as helpers from "../../helpers"

export const uploadProfilePhoto = (file, filename) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then((creds) => {
            return FileService.presignProfilePhoto(creds.access_token, creds.user_id, filename).then(
                (url) => {
                    dispatch({
                        type: fileActions.PROFILE_REQUEST_URL,
                        payload: url,
                    })
                    fetch(url, {
                        method: "PUT",
                        body: file["file"],
                    }).then((response) => {
                        if (response.ok) {
                            console.log("FILE PUT SUCCESS")
                            dispatch({
                                type: fileActions.PROFILE_PUT_SUCCESS
                            })
                            FileService.confirmProfileUploaded(creds.access_token, creds.user_id, true)
                        } else {
                            dispatch({
                                type: fileActions.PROFILE_PUT_FAIL
                            })
                            FileService.confirmProfileUploaded(creds.access_token, creds.user_id, false)
                        }
                    });
                    
                },
                (error) => {
                    return helpers.parseError(error, dispatch);
                }
            );
        });
    }
};
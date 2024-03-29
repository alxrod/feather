import FileService from "../../../services/file.service";

import * as fileActions from "../file.actions";
import * as userActions from "../../user/user.actions";
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
                    return fetch(url, {
                        method: "PUT",
                        body: file,
                    }).then((response) => {
                        if (response.ok) {
                            dispatch({
                                type: fileActions.PROFILE_PUT_SUCCESS
                            })
                            FileService.confirmProfileUploaded(creds.access_token, creds.user_id, true).then(
                                (profileImage) => {
                                    dispatch({
                                        type: fileActions.UPDATE_PROFILE_URL_CACHE,
                                        payload: profileImage,
                                    })
                                    dispatch({
                                        type: userActions.USER_SET_PROFILE,
                                        payload: profileImage.cacheUrl,
                                    })
                                }
                            )
                            return Promise.resolve()
                        } else {
                            dispatch({
                                type: fileActions.PROFILE_PUT_FAIL
                            })
                            FileService.confirmProfileUploaded(creds.access_token, creds.user_id, false)
                            return Promise.reject()
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
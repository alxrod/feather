import FileService from "../../../services/file.service";

import * as fileActions from "../file.actions";
import * as helpers from "../../helpers"

export const getProfilePicUrls = (user_ids) => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return FileService.getProfilePicUrls(creds.access_token, user_ids).then(
                    (resp) => {
                        console.log("Cache complete w: ", resp.cacheUrlsMap)
                        dispatch({
                            type: fileActions.SET_PROFILE_URL_CACHE,
                            payload: resp.cacheUrlsMap,
                        })                    
                    },
                    (error) => {
                        return helpers.parseError(error, dispatch);
                    }
                );
            },
            () => {
            }
        );
    }
};
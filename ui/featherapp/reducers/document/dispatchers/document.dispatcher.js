import DocumentService from "../../../services/document.service"
import {WORKER_TYPE, BUYER_TYPE} from "../../../services/user.service"


import * as documentActions from "../document.actions"
import * as itemActions from "../../items/items.actions"
import * as deadlineActions from "../../deadlines/deadlines.actions"
import * as chatActions from "../../chat/chat.actions"
import * as helpers from "../../helpers"


export const clearSelectedDoc = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: documentActions.DOCUMENT_CLEAR_SELECTED,
            });
            dispatch({
                type: itemActions.CONTRACT_ITEM_LOAD,
                payload: [],
            });
            dispatch({
                type: deadlineActions.CONTRACT_DEADLINE_LOAD,
                payload: [],
            });
            dispatch({
                type: chatActions.CHAT_CLEAR_REJOIN,
            })
            resolve()
        })
    }
}

export const queryDocument = (doc_id) => {
    return dispatch => {
        return  helpers.authCheck(dispatch).then(
            (creds) => {
                return DocumentService.queryDocument(creds.access_token, creds.user_id, doc_id).then(
                    (doc) => {
                        dispatch({
                            type: chatActions.CHAT_CLEAR_REJOIN,
                        })
                        dispatch({
                            type: documentActions.DOCUMENT_PULL_CURRENT,
                            payload: doc,
                        });
                        dispatch({
                            type: itemActions.CONTRACT_ITEM_LOAD,
                            payload: doc.itemsList,
                        })
                        dispatch({
                            type: deadlineActions.CONTRACT_DEADLINE_LOAD,
                            payload: doc.deadlinesList,
                        });
                        
                        return Promise.resolve(doc);
                    },
                    (error) => {
                        return Promise.reject(error)
                    }
                );
            },
            () => {
            }
        );
    }
};

export const queryDocumentNubs = () => {
    return dispatch => {
        return helpers.authCheck(dispatch).then(
            (creds) => {
                return DocumentService.queryDocumentNubs(creds.access_token, creds.user_id).then(
                    (data) => {
                        
                        let list = data.documentNubsList
                        if (list === undefined) {
                            list = []
                        } 
                        dispatch({
                            type: documentActions.DOCUMENT_NUB_PULL_ALL,
                            payload: list,
                        });
                        return Promise.resolve(list);
                    },
                    (error) => {
                        return helpers.parseError(error, dispatch);
                    }
                );
            },
            () => {
            }
        )
    }
};

export const createDocument = (title, summary, deadlines, items ) => {
    return dispatch => {
        dispatch({
            type: itemActions.CONTRACT_ITEM_LOAD,
            payload: [],
        })
        dispatch({
            type: deadlineActions.CONTRACT_DEADLINE_LOAD,
            payload: [],
        })
        return  helpers.authCheck(dispatch).then(
            (creds) => {
                return DocumentService.createDocument(creds.access_token, creds.user_id, title, summary, deadlines, items).then(
                    (doc) => {
                        return Promise.resolve(doc.id);
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                );
            },
            () => {
            }
        );
    }
};


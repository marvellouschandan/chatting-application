import {AUTH_REQ,AUTH_SUCCESS,AUTH_FAILURE} from '../types';

const initialState={
    user : {},
    isAuthenticated : false,
    error : ''
};

const authReducer = (state=initialState, action) => {
    console.log("auth Reducer");

    switch(action.type){
        case AUTH_REQ:
            return {...state, error:'', isAuthenticated : false};
        
        case AUTH_SUCCESS:
            const data=action.payload;
            return {...state, error:'',user:data, isAuthenticated : true};

        case AUTH_FAILURE:
            const error=action.payload;
            return {...state, error:error, isAuthenticated : false};

        default:
            return state;
    }
}

export default authReducer;
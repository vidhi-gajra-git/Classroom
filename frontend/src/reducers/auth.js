import { REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS} from  '../actions/types';
const initialState={
    isAuthenticated:null,
    // email:'',
    // password:'',
    // username:''

}
export default function  (state=initialState,action){
    const  {type,payload}=action;
    switch(type){   
        case REGISTER_SUCCESS:
            return {
            ...state,
        isAuthenticated:false,}
        case REGISTER_FAIL:
            return state
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated:true,
                

            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated:payload,
               

            }
            
        case AUTHENTICATED_FAIL:
                return {
                    ...state,
                    isAuthenticated:payload,
                   
    
                }
        case LOGIN_FAIL:
                
        case LOGOUT_SUCCESS:
            return {
                
                isAuthenticated:false
            }
                
        case LOGOUT_FAIL:
                  
        default: 
                return state
    }
}
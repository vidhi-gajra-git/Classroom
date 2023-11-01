import { LOAD_USER_PROFILE_FAIL,LOAD_USER_PROFILE_SUCCESS, DELETE_ASSIGNMENT_SUCCESS,DELETE_ASSIGNMENT_FAIL} from  '../actions/types';
const initialState={
    
    username:'',
    email:'',
    assignmentData:'',
    
  
   

}
export default function  (state=initialState,action){
    const  {type,payload}=action;
    switch(type){   
        case LOAD_USER_PROFILE_SUCCESS:
            return {
                ...state,
                 username  :payload.username,
                email: payload.email,

            }
        case LOAD_USER_PROFILE_FAIL:
            return{ 
                ...state,
                username:'',
                email: ''
            }
        case DELETE_ASSIGNMENT_SUCCESS:
            
        case DELETE_ASSIGNMENT_FAIL:
            
        default: 
                return state
    }
}
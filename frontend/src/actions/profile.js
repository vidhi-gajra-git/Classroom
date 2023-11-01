import Cookies from 'js-cookie' ;
import axios from 'axios' ;
import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL, 
   DELETE_ASSIGNMENT_SUCCESS,
    DELETE_ASSIGNMENT_FAIL
} from './types'
export const load_user=()=>async dispatch=>{
    const config ={
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
            
        }};

        try{
            const res=await axios.get(`/user`,config);
            if (res.data){
                dispatch({
                    type: LOAD_USER_PROFILE_SUCCESS,
                    payload:res.data
                });
                   
    
            }
            else{
                dispatch ({type : LOAD_USER_PROFILE_FAIL});
               
            }
        }
        catch(err){
           
                dispatch ({type :LOAD_USER_PROFILE_FAIL });
    
        
        }
    
    }

    export const deleteAssignment =(assignment) => async dispatch =>{
        const config ={
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                
            }
    
        };
        const body=JSON.stringify({assignment})
        // const body=JSON.stringify({email,password})
        try{
            const res=await axios.get(`/${assignment}/delete`,body,config);
            if (res.data.success){
                  
                    dispatch({
                        type: DELETE_ASSIGNMENT_SUCCESS,
                        
                       
                    });
                    return true;
                  
    
            }
            
            else{
                dispatch ({type : DELETE_ASSIGNMENT_FAIL});
                
            }
        }
        catch(err){
           
                dispatch ({type :DELETE_ASSIGNMENT_FAIL});
    
        
        }

    
    }
    

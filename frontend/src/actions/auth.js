import axios from 'axios';
import Cookies from 'js-cookie';
import { load_user } from './profile';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS

} from './types'
export const checkAuthenticated =() => async dispatch =>{
    const config ={
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
           
        }

    };
  
    try{
        const res=await axios.get(`/authenticated`,config);
      if (res.data.error||res.data.isAuthenticated==='error'){
        dispatch({type:AUTHENTICATED_FAIL});

      }
      else if(res.data.isAuthenticated==='success'){
      dispatch(  {
        type:AUTHENTICATED_SUCCESS  ,
        payload:true})

    }
    else if(res.data.isAuthenticated==='success'){
        dispatch(  {
          type:AUTHENTICATED_FAIL  ,
          payload:false})}}
    catch(err){
       
            dispatch ({type : LOGIN_FAIL});

    
    }

}
export const login =(email,password) => async dispatch =>{
    const config ={
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'X-CSRFToken': Cookies.get('csrfToken')
        }

    };
    const body=JSON.stringify({email,password})
    try{
        const res=await axios.post(`/login`,body,config);
        if (res.status === 200){
              
                dispatch({
                    type: LOGIN_SUCCESS,
                   
                });
                dispatch(load_user());

        }
        
        else{
            dispatch ({type : LOGIN_FAIL});

            throw new Error(res.data.error);

            
        }
    }
    catch(err){

            dispatch ({type : LOGIN_FAIL});
            if (err.response && err.response.data && err.response.data.error) {
                throw new Error(err.response.data.error);
              } else {
                throw new Error('Password incorrect or username invalid !');
              }
            }

    
    }


export const logout =() => async dispatch =>{
    const config ={
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'X-CSRFToken': Cookies.get('csrfToken')
        }

    };
    const body = JSON.stringify({
        'withCredentials': true
    })

    try{
        const res=await axios.post(`/logout`,body,config);
        if (res.data){
              
                dispatch({
                    type: LOGOUT_SUCCESS,
                    
                });

        }
      
        else{
            dispatch ({type : LOGOUT_FAIL});
            
        }
    }
    catch(err){
       
            dispatch ({type : LOGOUT_FAIL});

    
    }

}
export const register=(email,username,password) => async dispatch =>{
    const config ={
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'X-CSRFToken': Cookies.get('csrfToken')
        }

    };
    const body=JSON.stringify({email,username,password})
    try{
        const res=await axios.post(`/signup`,body,config);
        if (res.data.error){
                dispatch ({type : REGISTER_FAIL});

        }
        else{
        
            dispatch({
                type: REGISTER_SUCCESS
            });
        }
    }
    catch(err){
       
            dispatch ({type : REGISTER_FAIL});

    
    }

}
// ////// File retrieval function


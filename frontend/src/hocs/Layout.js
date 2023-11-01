import React, { useEffect,Fragment }    from "react";
import Navbar from "../components/Navbar";
import {connect}from'react-redux'
import {load_user} from '../actions/profile'
import { checkAuthenticated } from "../actions/auth";
const Layout= ({children,checkAuthenticated,load_user})=>{

    useEffect(()=>{
        checkAuthenticated();
        load_user();
    },[]);
    return (
    <div>
        <Fragment>
        <Navbar/>
        {children}
        </ Fragment>
    </div>
)}

export default connect(null,{checkAuthenticated,load_user})( Layout);
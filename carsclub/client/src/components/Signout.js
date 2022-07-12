import React, {useEffect, useContext} from 'react'
import { NavLink, useHistory } from "react-router-dom";

import { UserContext } from "../App"

const Signout = () => {

    // const {state, dispatch} = useContext(UserContext)

    const history = useHistory();

    useEffect(()=>{ 
        fetch('/signout',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then((res)=>{
            // dispatch({type: "USER", payload: null})
            localStorage.removeItem("User")
            history.push('/signin', {replace: true})
            window.location.reload();
            if(res.status != 200){
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    })



    // useEffect(()=>{
    //     fetch('/adminsignout',{
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         credentials: "include"
    //     })
    //     .then((res)=>{
    //         history.push('/signin', {replace: true})
    //         if(res.status != 200){
    //             const error = new Error(res.error);
    //             throw error;
    //         }
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // })
    return (
        <>
            <h1>Log Out</h1>
        </>
    )
}

export default Signout

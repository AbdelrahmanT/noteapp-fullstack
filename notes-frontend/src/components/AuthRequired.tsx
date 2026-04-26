import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";


export default function AuthRequired(){
    const location = useLocation()

    if(!localStorage.getItem('accessToken')){
        return <Navigate
                    to="/login"
                    state={{
                        message: "You must login first",
                        from : location.pathname
                    }}
                />
    }
    return <div className="site-wrapper">
                <main>
                    <Outlet/>

                </main>

            </div>

}
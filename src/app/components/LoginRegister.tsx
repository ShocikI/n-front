'use client'
import { useState } from "react";
import { LoginForm } from "./forms/LoginForm";
import { RegistrationForm } from "./forms/RegistrationForm";



export const LoginRegister = () => {
    const [ isLoginPage, setIsLoginPage ] = useState(true)

    const toggleLoginPage = () => setIsLoginPage(!isLoginPage);
    
    return (
        <div className="flex flex-col basis-1/4 p-10 rounded-2xl border-2 border-primary drop-shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
            {isLoginPage ? <LoginForm/> : <RegistrationForm/>}
            <button className="mt-4" onClick={toggleLoginPage}>
                {
                    isLoginPage 
                    ? <p className="w-full text-center">Do you have an account? <br/><u><b>Sign up</b></u></p>
                    : <p className="w-full text-center">Do you want to log in? <br/><u><b>Log in</b></u></p>
                }
            </button>
        </div>
    )
}
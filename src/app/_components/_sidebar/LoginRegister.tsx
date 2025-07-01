import { LoginForm } from "../_forms/LoginForm"
import { RegistrationForm } from "../_forms/RegistrationForm"



export const LoginRegister = () => {    
    return (
        <div className="flex flex-col place-content-center">
            <LoginForm/>
            <div className="divider divider-vertical divider-primary w-full my-5"/>
            <RegistrationForm/>
        </div>
    )
}

export const LoginForm = () => {

    return (
        <form className="flex flex-col" method="POST" action="/login">
            <input className="input label p-2 my-2" type="text" name="username" placeholder="Username" required/>
            <input className="input label p-2 my-2" type="password" name="password" placeholder="Password" required/>
            <input className="btn btn-primary p-2 my-2 font-extrabold" type="submit" value="Log in"/>
        </form>
    )
}

export const RegistrationForm = () => {

    return (
        <form className="flex flex-col" method="POST" action="/register">
            <input className="input label p-2 my-2" type="text" name="username" placeholder="Type username" required/>
            <input className="input label p-2 my-2" type="text" name="email" placeholder="Type email" required/>
            <input className="input label p-2 my-2" type="password" name="password" placeholder="Type password" required/>
            <input className="input label p-2 my-2" type="password" name="password" placeholder="Retype password" required/>
            <input className="btn btn-primary p-2 my-2 font-extrabold" type="submit" value='Sign up'/>
        </form>
    )
}
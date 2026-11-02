import LoginForm from "../components/LoginForm"

function Login({method,route}){
    return(
        <LoginForm method={method} route={route}/>
    )
}

export default Login
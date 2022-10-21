import LoginForm from "../../components/Login/LoginForm";

export default function LoginPage()
{
    return (
        <div>
            <LoginForm/>
            <a href="/Dashboard">
                <button>Demo Login</button>
            </a>
        </div>
    );
}
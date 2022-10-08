import SignUpForm from "../../components/SignUp/SignUpForm";

export default function RegisterPage () 
{
    return (
        <div className="grid grid-cols-3 h-screen">
            <div className="text-5xl col-span-1 m-6 p-4 bg-[#639fab] rounded-xl">
                <div className="m-8 pt-3">
                    <span className="text-white">Tapped</span><span className="text-slate-300">In.
                    </span>
                </div>
            </div>
            <div className="col-span-1 m-4 self-center">
                <SignUpForm></SignUpForm>
            </div>
        </div>
    );
}
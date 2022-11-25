import SideInformation from "../../components/SideInformation/SideInformation";
import SignUpForm from "../../components/SignUp/SignUpForm";

export default function RegisterPage () 
{
    return (
        <div className='py-4 px-8'>
            <div className="grid md:grid-cols-10">
                <SideInformation></SideInformation>
                <div className="col-span-6 md:ml-20 py-6 md:py-0 flex items-center">
                    <div className="flex-grow">
                        <SignUpForm></SignUpForm>
                    </div>
                </div>
            </div>
        </div>
    );
}
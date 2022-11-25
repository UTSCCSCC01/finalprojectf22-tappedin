import { 
    leftContainer,
    contentBox,
    imageContainer
} from "./SideInformation.module.scss";

export default function SideInformation()
{
    return (
        <div className={`${leftContainer} text-white col-span-3 hidden md:block`}>
            <div className="flex flex-col h-full justify-between">
                <div>
                    <a href="/"><h2 className="font-semibold mb-12">Tapped<span style={{ color: "#BBCDE5" }}>In.</span></h2></a>
                            
                    <h1 className="title mb-2">
                    Establishing
Friendships & Connections
                    </h1>
                    <p>You're one step closer from using TappedIn!</p>
                        
                </div>
                        
                <div className={`${contentBox}`}>
                    <p className="mb-6">Honestly, using <strong>TappedIn</strong> has made networking much more easy. It really allows me show myself in a concise yet technology-unique way!</p>
                    <div className="flex items-center">
                        <div className={`${imageContainer} mr-4`}></div>
                        <div>
                            <p className="font-semibold">Benjamin Saobuppha</p>
                            <p>Student, Creator</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
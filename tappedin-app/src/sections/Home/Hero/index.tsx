import styles from "./Hero.module.scss";

export default function Hero() 
{
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="px-4 md:px-10">
                    <div
                        className={ `${styles["customNavbar"]} py-6 px-4` }
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="font-bold">
                                    Tapped
                                    
                                    <span style={{ color: "#639FAB" }}>
                                        In.
                                    </span>
                                </h1>
                            </div>
                            <div className="hidden md:block">
                                <div className="grid grid-cols-2 gap-4">
                                    <a href="/#AboutUs">
                                        <h3>About Us</h3>
                                    </a>
                                    <a href="/#Faq">
                                        <h3>FAQ</h3>
                                    </a>
                                </div>
                                
                            </div>
                            <div>
                                <a href="/Login">
                                    <h3 className="font-bold">Sign In</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex items-center h-full pb-32 px-4"
                    >
                        <div>
                            <h1 className="title pb-6">
                                {" "}
                                Establishing <br /> Friendships & Connections,{" "}
                                <br />
                                all in one <span style={{ color: "#639FAB" }}>Tap</span>
                            </h1>
                            <div>
                                <div className="flex items-center pb-3">
                                    <div className={`${styles["circle"]}`}></div>
                                    <h3 className="pl-3 w-fit">
                                        NFC-Powered Portfolio to share your information with a single tap
                                    </h3>
                                </div>
                                <div className="flex items-center pb-10">
                                    <div className={styles["circle"]}></div>
                                    <h3 className="pl-3 w-fit">
                                        A Social Media platform to share your best moments with your connections
                                    </h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <a href="/Register">
                                    <button className="button">
                                    Sign Up
                                    </button>
                                </a>
                                <a href="/Login">
                                    <button className="button link">Sign In</button>
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className={ `${styles["background"]} hidden md:block` }></div>
            </div>
        </section>
    );
}

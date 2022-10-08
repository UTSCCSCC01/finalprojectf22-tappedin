import styles from "./Hero.module.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Hero() 
{
    return (
        <section>
            <div className="flex flex-row">
                <div className="px-10">
                    <div
                        className={[ styles["customNavbar"], "py-7 px-3" ].join(
                            " "
                        )}
                    >
                        <div className="columns-3 flex justify-between items-center">
                            <div>
                                <h1 className="font-bold">
                                    Tapped
                                    <span style={{ color: "#639FAB" }}>
                                        In.
                                    </span>
                                </h1>
                            </div>
                            <div className="columns-2">
                                <h3>About Us</h3>
                                <h3>FAQ</h3>
                            </div>
                            <div>
                                <a href="/Login">
                                    <h3 className="font-bold">Sign In</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex items-center"
                        style={{ height: "40rem" }}
                    >
                        <div>
                            <h1 className="title pb-5">
                                {" "}
                                Lorem ipsum, <br /> consectetur adipiscing,{" "}
                                <br />
                                sed do eiusmod.
                            </h1>
                            <ul>
                                <div className="flex items-center pb-3">
                                    <div className={styles["circle"]}></div>
                                    <li className="pl-3">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit.
                                    </li>
                                </div>
                                <div className="flex items-center pb-10">
                                    <div className={styles["circle"]}></div>
                                    <li className="pl-3">
                                        sed do eiusmod tempor incididunt.
                                    </li>
                                </div>
                            </ul>
                            <a href="/Register">
                                <button className="button large">
                                    Sign Up
                                </button>
                            </a>
                            <a href="/Login">
                                <button className="button link">Sign In</button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={[ styles["background"] ].join(" ")}></div>
            </div>
        </section>
    );
}

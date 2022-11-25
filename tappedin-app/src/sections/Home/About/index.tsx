import styles from "./About.module.scss";

export default function About() 
{
    return (
        <section className="section px-4" id="AboutUs">
            <div className="px-4 md:px-10 py-32 xl">
                <div className="grid md:grid-cols-2 gap-24 grid-cols-1">
                    <div className="flex items-center">
                        <div>
                            <h1 className="font-bold pb-6">About Us</h1>
                            <p>
                                Hi there! 👋
                                <br></br>
                                <br></br>
                                We're TappedIn, a Near Field Communication (NFC)
                                powered solution for networking and socializing.
                                Our initiative is to help people make connection
                                and establish new friendships easily; through
                                the use of fully-customizable profiles, you can
                                introduce yourself by giving individuals a
                                snapshot about you with our Public Profile
                                feature.
                                <br></br>
                                <br></br>
                                Not enough? You can also join us by signing up
                                for an account to connect with others! You'll be
                                able to create and share posts and also view
                                other people's post with full comment and like
                                support.
                            </p>
                        </div>
                    </div>
                    <div className={`${styles["imageContainer"]}`}></div>
                </div>
            </div>
        </section>
    );
}

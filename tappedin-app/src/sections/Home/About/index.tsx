import styles from "./About.module.scss";

export default function About() 
{
    return (
        <section className="section">
            <div className="container mx-auto py-24 xl">
                <div className="grid md:grid-cols-2 gap-24 grid-cols-1">
                    <div>
                        <h1 className="font-bold pb-3">About Us</h1>
                        <h2>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Integer malesuada nunc vel
                            risus commodo viverra. Cursus mattis molestie a
                            iaculis at. Magna etiam tempor orci eu lobortis
                            elementum nibh tellus molestie. Venenatis cras sed
                            felis eget. Aliquet enim tortor at auctor. Mauris
                            pellentesque pulvinar pellentesque habitant morbi
                            tristique senectus. Donec ultrices tincidunt arcu
                            non sodales neque sodales ut. <br /><br />
                            Tincidunt ornare massa eget egestas purus viverra
                            accumsan. Vivamus at augue eget arcu dictum varius.
                            Dictum fusce ut placerat orci nulla.
                        </h2>
                    </div>
                    <div className={ `${styles["imageContainer"]}` }>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

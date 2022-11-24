import styles from "./About.module.scss";

export default function About() 
{
    return (
        <section className="section px-4">
            <div className="px-4 md:px-10 py-32 xl">
                <div className="grid md:grid-cols-2 gap-24 grid-cols-1">
                    <div className="flex items-center">
                        <div>
                            <h1 className="font-bold pb-6">About Us</h1>
                            <p>
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
                            </p>
                        </div>
                        
                    </div>
                    <div className={ `${styles["imageContainer"]}` }>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

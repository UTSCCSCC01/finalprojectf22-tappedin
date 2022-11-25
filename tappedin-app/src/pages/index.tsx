import About from "../sections/Home/About";
import Hero from "../sections/Home/Hero";
import FAQ from "../sections/Home/FAQ";


export default function HomePage() 
{
    return (
        <div>
            <Hero></Hero>
            <About></About>
            <FAQ></FAQ>
            <section className="section py-16">
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <p className="pb-2 text-xs mr-2">Copyright © 2022</p>
                        <h1 className="font-bold">
                                    Tapped
                                    
                            <span style={{ color: "#639FAB" }}>
                                        In.
                            </span>
                        </h1>
                    </div>
                </div>
            </section>
        </div>
    );
}
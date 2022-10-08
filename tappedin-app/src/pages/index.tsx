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
        </div>
    );
}
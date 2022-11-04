import { RouteGuard } from "../components/RouteGuard/RouteGuard";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps, router }) 
{
    return (
        <RouteGuard router={router}>
            <Component {...pageProps} />
        </RouteGuard>
    );
}

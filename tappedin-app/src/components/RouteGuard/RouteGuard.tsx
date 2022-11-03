import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FirebaseAuthenticationService } from "../../sdk/services/firebaseAuthenticationService";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

function RouteGuard({ router, children }) 
{
    //Identify authenticated user
    const isAuthenticated = typeof localStorage === "undefined" ? false : (localStorage.getItem("isLoggedIn") == "true");
    let unprotectedRoutes = [
        "/Login",
        "/Register",
        "/"
    ];

    /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
    let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

    if (isBrowser() && !isAuthenticated && pathIsProtected) 
    {
        router.push("/Login");
    }

    return children;
};

export { RouteGuard };
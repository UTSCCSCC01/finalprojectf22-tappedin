const isBrowser = () => typeof window !== "undefined";
const localStorageExists = () => typeof localStorage !== "undefined";

function RouteGuard({ router, children }): void 
{
    //Identify authenticated user
    const isAuthenticated: boolean = localStorageExists() ? (localStorage.getItem("isLoggedIn") == "true") : false;
    let unprotectedRoutes: Array<String> = [
        "/Login",
        "/Register",
        "/"
    ];
    let pathIsProtected: boolean = unprotectedRoutes.indexOf(router.pathname) === -1;

    if (isBrowser() && !isAuthenticated && pathIsProtected) 
    {
        router.push("/Login");
    }

    return children;
};

export { RouteGuard };
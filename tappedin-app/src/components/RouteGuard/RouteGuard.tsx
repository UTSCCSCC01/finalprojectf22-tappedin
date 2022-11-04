const isBrowser = () => typeof window !== "undefined";
const localStorageExists = () => typeof localStorage !== "undefined";

function RouteGuard({ router, children }): void 
{
    //Identify authenticated user
    const isAuthenticated: boolean = localStorageExists() ? (localStorage.getItem("isLoggedIn") == "true") : false;
    const unprotectedRoutes: ReadonlyArray<String> = [
        "/Login",
        "/Register",
        "/PublicProfile",
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
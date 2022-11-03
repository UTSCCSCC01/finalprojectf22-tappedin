import { FirebaseApp, initializeApp } from "firebase/app";
import * as auth from "firebase/auth";
import axios from "axios";

export class FirebaseAuthenticationService
{
    private readonly _app: FirebaseApp;
    private readonly _auth: auth.Auth;
    
    
    public constructor()
    {
        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
        };
        this._app = initializeApp(firebaseConfig);
        this._auth = auth.getAuth(this._app);
    }
    
    
    public async signUp(email: string, username: string, password: string, firstName: string, lastName: string,
        isBusinessAccount: boolean): Promise<void>
    {
        try
        {
            const userID: string = await this.createNewUserInDb(email, username, firstName, lastName, isBusinessAccount);

            await auth.createUserWithEmailAndPassword(this._auth, email, password);
            
            const user: auth.User = this._auth.currentUser;
            
            if (user)
                await this.addAuthCodeInDb(user.uid, userID);
        }
        catch (e)
        {
            throw e;
        }
    }
    
    public async signIn(email: string, password: string): Promise<boolean>
    {
        try
        {
            const user: auth.UserCredential = await auth.signInWithEmailAndPassword(this._auth, email, password);
            console.log(this.getCurrentUserId());
            if (user)
                return true;
        }
        catch (e)
        {
            throw e;
        }
        
        return false;
    }
    
    public async signOut(): Promise<void>
    {
        try
        {
            await auth.signOut(this._auth);
        }
        catch (e)
        {
            throw e;
        }
    }
    
    public getCurrentUserId(): string | null
    {
        const user: auth.User = this._auth.currentUser;
        
        if (user)
            return user.uid;
        
        return null;
    }
    
    
    private async createNewUserInDb(email: string, username: string, firstName: string, 
        lastName: string, isBusinessAccount: boolean): Promise<string>
    {
        const payload: Object = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            //authID: user.uid,
            email: email,
            isBusinessAccount: isBusinessAccount,
            dateCreated: new Date().toDateString()
        };
        console.log(payload);
        try
        {
            const { data, status } = await axios.post<string>(
                process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/createUser",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    }
                },
            );

            return data;
        }
        catch (e)
        {
            throw e;
        }
    }

    private async addAuthCodeInDb(authCode: string, userID: string): Promise<void>
    {
        const payload: Object = {
            authID: authCode
        };
        console.log(payload);
        try
        {
            const { data, status } = await axios.put<string>(
                process.env.NEXT_PUBLIC_SERVER_ADDRESS + "/userFieldServices",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    params: {
                        fieldType: 7,
                        objectID: userID
                    }
                },
            );
        }
        catch (e)
        {
            throw e;
        }
    }
}
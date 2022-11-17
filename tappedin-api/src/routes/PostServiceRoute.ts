import express, { Request, Response, NextFunction } from "express";
import container from "../inversify.config";
import TYPES from "../types";
import { ItemNotFoundError, UserNotFoundError } from "../common/errors";
import { IPostService } from "../services/PostService/IPostService";
import { PartialPostInfo, PostInfo } from "../common/postDataTypes";

export const postServiceRouter = express.Router();
const postService: IPostService = container.get<IPostService>(TYPES.IPostService);

postServiceRouter.post("/addPost", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received POST req for post");
    try
    {
        let result: string;
        let authID: string;

        if (!req.body.userID)
            return res.status(400).send("User ID not specified.");
        
        authID = req.body.userID;
        req.body.authID = authID;
        delete req.body.userID;

        result = await postService.addPost({ authID: authID }, req.body as PostInfo);

        return res.status(200).send(result);
    }
    catch (err)
    {
        if (err instanceof UserNotFoundError)
            return res.status(404).send("User was not found.");
        else
            next(err);
    }
});

postServiceRouter.put("/updatePost", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received PUT req for post");
    try
    {
        let result: string;
        let requestBody = req.body;
        let objectID: string;
        
        if (!req.query.objectid)
            return res.status(400).send("Object ID not specified.");
        
        objectID = req.query.objectid.toString();

        result = await postService.updatePost(objectID, requestBody as PartialPostInfo);

        return res.status(200).send(result);
    }
    catch (err)
    {
        if (err instanceof UserNotFoundError)
            return res.status(404).send("User was not found.");
        else
            next(err);
    }
});

postServiceRouter.get("/getPost", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received GET req for post");
    try
    {
        let result;
        let authID: string;

        if (!req.query.id)
            return res.status(400).send("User ID not specified.");

        authID = req.query.id.toString();

        result = await postService.getPosts({ authID: authID });
        return res.status(200).send(result);
    }
    catch (err)
    {
        if (err instanceof UserNotFoundError)
            return res.status(404).send("User was not found.");
        else
            next(err);
    }
});

postServiceRouter.get("/getPostById", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received GET req for post");

    try
    {
        if (!req.query.id)
            return res.status(400).send("Object ID not specified.");
        
        const objectID = req.query.id.toString();
        const post = await postService.getPostById(objectID);

        return res.status(200).send(post);
    }
    catch (e)
    {
        if (e instanceof ItemNotFoundError)
            return res.status(404).send("User was not found.");
        else
            next(e);
    }
});

postServiceRouter.put("/updateLike", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received PUT req for post");
    try
    {
        let result: boolean;
        let requestBody = req.body;
        let objectID: string;
        let userID: string;
        let method: string;
        
        if (!req.query.objectid)
            return res.status(400).send("Object ID not specified.");
        
        objectID = req.query.objectid.toString();

        if (!requestBody.userID)
            return res.status(400).send("User ID not specified.");
        
        userID = requestBody.userID.toString();

        if (!requestBody.updateMethod)
            return res.status(400).send("Update method not specified.");
        
        method = requestBody.updateMethod.toString();

        result = false;

        if (method === "add")
            result = await postService.addLike(userID, objectID);
        else if (method === "remove")
            result = await postService.removeLike(userID, objectID);

        return res.status(200).send(result);
    }
    catch (err)
    {
        if (err instanceof UserNotFoundError)
            return res.status(404).send("User was not found.");
        else
            next(err);
    }
});

// accountServicesRouter.delete("/deletePost", async (req: Request, res: Response, next: NextFunction) =>
// {
//     console.log("Received DELETE req for user Field");
//     try
//     {
//     }
//     catch (err)
//     {
//         next(err);
//     }
// });





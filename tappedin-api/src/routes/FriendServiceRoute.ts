import express, { Request, Response, NextFunction } from "express";
import container from "../inversify.config";
import TYPES from "../types";
import { UserNotFoundError } from "../common/errors";
import { IFriendService } from "../services/FriendService/IFriendService";

export const friendServiceRouter = express.Router();
const friendService: IFriendService = container.get<IFriendService>(TYPES.IFriendService);

friendServiceRouter.post("/addFriend", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received POST req for adding friend");
    try
    {
        let result: string;
        let authID: string | undefined = req.body.id;
        let friendID: string | undefined = req.body.friend;

        if (!authID)
            return res.status(400).send("User ID not specified.");
        if (!friendID)
            return res.status(400).send("Friend ID not specified.");

        result = await friendService.addFriend({ authID: authID }, { authID: friendID });

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

friendServiceRouter.get("/getFriends", async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("Received GET req for friends list");
    try
    {
        let result;
        let authID: string;

        if (!req.query.id)
            return res.status(400).send("User ID not specified.");

        authID = req.query.id.toString();

        result = await friendService.getFriends({ authID: authID });
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

// TODO: DELETE requests for removing friends

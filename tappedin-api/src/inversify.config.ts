import { Container } from "inversify";
import TYPES from "./types";

import { IUserAccountService } from "./services/UserAccountService/IUserAccountService";
import { IDBAccessService } from "./services/DBAccessService/IDBAccessService";
import { IPostService } from "./services/PostService/IPostService";
import { IUserIdentificationService } from "./services/UserIdentificationService/IUserIdentificationService";

import { UserAccountService } from "./services/UserAccountService/UserAccountService";
import { MongoDBAccessService } from "./services/DBAccessService/MongoDBAccessService";
import { PostService } from "./services/PostService/PostService";
import { UserIdentificationService } from "./services/UserIdentificationService/UserIdentificationService";


var container: Container = new Container();
container.bind<IUserAccountService>(TYPES.IUserAccountService).to(UserAccountService);
container.bind<IDBAccessService>(TYPES.IDBAccessService).to(MongoDBAccessService);
container.bind<IPostService>(TYPES.IPostService).to(PostService);
container.bind<IUserIdentificationService>(TYPES.IUserIdentificationService).to(UserIdentificationService);
export default container;
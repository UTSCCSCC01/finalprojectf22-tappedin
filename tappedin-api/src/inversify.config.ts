import { Container } from "inversify";
import TYPES from "./types";
import { UserAccountService } from "./services/UserAccountService/UserAccountService";
import { IUserAccountService } from "./services/UserAccountService/IUserAccountService";
import { IDBAccessService } from "./services/DBAccessService/IDBAccessService";
import { MongoDBAccessService } from "./services/DBAccessService/MongoDBAccessService";


var container: Container = new Container();
container.bind<IUserAccountService>(TYPES.IUserAccountService).to(UserAccountService);
container.bind<IDBAccessService>(TYPES.IDBAccessService).to(MongoDBAccessService);
export default container;
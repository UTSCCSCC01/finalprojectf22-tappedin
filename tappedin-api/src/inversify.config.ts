import { Container } from "inversify";
import TYPES from "./types";
import { UserAccountService } from "./services/UserAccountService/UserAccountService";
import { IUserAccountService } from "./services/UserAccountService/IUserAccountService";
import { IDBAccessService } from "./services/DBAccessService/IDBAccessService";
import { MongoDBAccessService } from "./services/DBAccessService/MongoDBAccessService";
// import { UserAuthenticationService } from "./services/UserAuthenticationService/UserAuthenticationService";
import { IUserAuthenticationService } from "./services/UserAuthenticationService/IUserAuthenticationService";


var container: Container = new Container();
container.bind<IUserAccountService>(TYPES.IUserAccountService).to(UserAccountService);
container.bind<IDBAccessService>(TYPES.IDBAccessService).to(MongoDBAccessService);
// container.bind<IUserAuthenticationService>(TYPES.IUserAuthenticationService).to(UserAuthenticationService);
export default container;
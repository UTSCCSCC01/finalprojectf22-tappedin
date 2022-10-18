import { Container } from "inversify";
import { UserAccountService } from "./services/accountCreationService/AccountCreationService";
import { IUserAccountService } from "./services/accountCreationService/IUserAccountService";
import { IDBAccessService } from "./services/DBAccessService/IDBAccessService";
// import { MockUserDBAccessService } from "./services/DBAccessService/MockUserDBAccessService";
import { MongoDBAccessService } from "./services/DBAccessService/MongoDBAccessService";
import TYPES from "./types";
import { UserAuthenticationService } from "./services/UserAuthenticationService/UserAuthenticationService";
import { IUserAuthenticationService } from "./services/UserAuthenticationService/IUserAuthenticationService";
var container: Container = new Container();
container.bind<IUserAccountService>(TYPES.IUserAccountService).to(UserAccountService);
container.bind<IDBAccessService>(TYPES.IDBAccessService).to(MongoDBAccessService);
container.bind<IUserAuthenticationService>(TYPES.IUserAuthenticationService).to(UserAuthenticationService)
export default container;
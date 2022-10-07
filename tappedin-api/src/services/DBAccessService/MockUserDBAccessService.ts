// import { Result } from "../../common/commonTypes";
// import { IDBAccessService } from "./IDBAccessService";

// export class MockUserDBAccessService implements IDBAccessService
// {
//     private sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
//     private collections: Record<string, Record<string, Object>>;
//     private documents: Record<string, Object>;
//     private numElements: number = 0;
    
//     constructor()
//     {
//         this.documents = {};
//         this.collections = { users: this.documents };
//     }

//     async connect(): Promise<Result<string>>
//     {
//         this.sleep(1000);
//         return new Promise((resolve) =>
//         {
//             resolve({ data: "Connection Successful." });
//         });
//     }

//     async createDocument(collection: string, data: Object): Promise<string>
//     {
//         this.sleep(1000);
//         return new Promise((resolve, reject) => 
//         {
//             if (this.collections[collection])
//             {
//                 let id: string = this.numElements.toString();
//                 this.documents[id] = data;
//                 this.numElements++;
//                 resolve({ data: id });
//             }
//             else
//                 throw new Error("Collection does not exist.");
//         });
//     }

//     async readDocument(id: string): Promise<Result<Object>>
//     {
//         this.sleep(1000);
//         return new Promise((resolve, reject) => 
//         {
//             for (const key in this.collections)
//             {
//                 if (this.collections[key][id])
//                 {
//                     resolve({ data: this.collections[key][id] });
//                 }
//             }
//             reject({ error: new Error("Cannot find document.") });
//         });
//     }


// }
import * as mongo from "mongodb";

export default async function addLike()
{
    const uri = "mongodb+srv://tappedin-api:HLiuUHDRySbpCFkB@tappedin-db.miw0jsz.mongodb.net/?retryWrites=true&w=majority";
    const client = new mongo.MongoClient(uri);
    try
    {
        await client.connect();
        const db = client.db("testDB");
        const coll = db.collection("testCol");
        await coll.insertOne({ msg: "added a like!", date: Date.now().toString() });
    }
    finally
    {
        await client.close();
    }
}

addLike().catch(console.dir);
import * as mongo from "mongodb";

export default async function addLike()
{
    const uri = process.env.MONGO_CONNECTION_STRING;
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

import { MongoClient } from "mongodb";

const apiClient = async (req, res) => {
  // mongoDb

  const client = await MongoClient.connect("key").then(async (client) => {
    const db = client.db();
    await db.collection("emails").insertOne({ email: userEmail });
    client.close();
    res.status(200).json({ message: "success" });
  });
};

export default apiClient;

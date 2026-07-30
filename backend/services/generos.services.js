import { MongoClient, ObjectId } from "mongodb";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const client = new MongoClient("mongodb+srv://admin:hibridas2026@appshibridas01.nn7qxiv.mongodb.net/");
const dbMangas = client.db("AH20264CF");

export async function getGeneros() {
  try {
    await client.connect();
    return dbMangas
      .collection("generos")
      .find({ borrado: { $ne: true } })
      .toArray();
  } catch (error) {
    throw new Error(error);
  }
}

export async function createGenero(genero) {
  try {
    await client.connect();
    return dbMangas.collection("generos").insertOne(genero);
  } catch (error) {
    throw new Error(error);
  }
}

export async function editGeneroById(id, genero) {
  try {
    await client.connect();
    return dbMangas.collection("generos").updateOne({ _id: new ObjectId(id) }, { $set: genero });
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteGeneroById(id) {
  try {
    await client.connect();
    return dbMangas.collection("generos").updateOne({ _id: new ObjectId(id) }, { $set: { borrado: true } });
  } catch (error) {
    throw new Error(error);
  }
}

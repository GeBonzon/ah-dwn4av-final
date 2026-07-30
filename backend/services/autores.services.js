import { MongoClient, ObjectId } from "mongodb";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const client = new MongoClient("mongodb+srv://admin:hibridas2026@appshibridas01.nn7qxiv.mongodb.net/");
const dbMangas = client.db("AH20264CF");

export async function createAutor(autor) {
  try {
    await client.connect();
    return dbMangas.collection("autores").insertOne(autor);
  } catch (error) {
    throw new Error(error);
  }
}

export async function editAutorById(id, autor) {
  try {
    await client.connect();
    return dbMangas.collection("autores").updateOne({ _id: new ObjectId(id) }, { $set: autor });
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteAutorById(id) {
  try {
    await client.connect();
    return dbMangas.collection("autores").updateOne({ _id: new ObjectId(id) }, { $set: { borrado: true } });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAutores() {
  try {
    await client.connect();
    return dbMangas
      .collection("autores")
      .find({ borrado: { $ne: true } })
      .toArray();
  } catch (error) {
    throw new Error(error);
  }
}

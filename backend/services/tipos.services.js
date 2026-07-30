import { MongoClient, ObjectId } from "mongodb";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const client = new MongoClient("mongodb+srv://admin:hibridas2026@appshibridas01.nn7qxiv.mongodb.net/");
const dbMangas = client.db("AH20264CF");

export async function getTipos() {
  try {
    await client.connect();
    return dbMangas.collection("tipos").find({}).toArray();
  } catch (error) {
    throw new Error(error);
  }
}

export async function createTipo(tipo) {
  try {
    await client.connect();
    return dbMangas.collection("tipos").insertOne(tipo);
  } catch (error) {
    throw new Error(error);
  }
}

export async function editTipoById(id, tipo) {
  try {
    await client.connect();
    return dbMangas.collection("tipos").updateOne({ _id: new ObjectId(id) }, { $set: tipo });
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteTipoById(id) {
  try {
    await client.connect();
    return dbMangas.collection("tipos").updateOne({ _id: new ObjectId(id) }, { $set: { borrado: true } });
  } catch (error) {
    throw new Error(error);
  }
}

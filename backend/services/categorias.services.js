import { MongoClient, ObjectId } from "mongodb";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const client = new MongoClient("mongodb+srv://admin:hibridas2026@appshibridas01.nn7qxiv.mongodb.net/");
const dbMangas = client.db("AH20264CF");

export async function createCategoria(categoria) {
  try {
    await client.connect();
    return dbMangas.collection("categorias").insertOne(categoria);
  } catch (error) {
    throw new Error(error);
  }
}

export async function editCategoriaById(id, categoria) {
  try {
    await client.connect();
    return dbMangas.collection("categorias").updateOne({ _id: new ObjectId(id) }, { $set: categoria });
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteCategoriaById(id) {
  try {
    await client.connect();
    return dbMangas.collection("categorias").updateOne({ _id: new ObjectId(id) }, { $set: { borrada: true } });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCategorias() {
  try {
    await client.connect();
    return dbMangas
      .collection("categorias")
      .find({ borrada: { $ne: true } })
      .toArray();
  } catch (error) {
    throw new Error(error);
  }
}

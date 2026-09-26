import mongoose from "mongoose";
import "dotenv/config";
import { Startup } from "../models/startup";
import { startups } from "../Data/data";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ ERREUR : MONGO_URI n'est pas défini dans le fichier .env");
  process.exit(1);
}

async function seedDatabase() {
  try {
    console.log("⏳ Connexion à MongoDB Atlas...");
    await mongoose.connect(MONGO_URI as string);
    console.log("✅ Connecté avec succès !");

    // Nettoyage de l'ancienne collection startups si elle existe
    console.log("🧹 Suppression des anciennes startups...");
    await Startup.deleteMany({});

    // Insertion des données
    console.log(`📥 Insertion de ${startups.length} startups...`);
    await Startup.insertMany(startups);

    console.log("🎉 Seeding terminé avec succès !");
    console.log(`👉 Vos données sont désormais consultables sur votre cluster MongoDB Atlas.`);
  } catch (error) {
    console.error("❌ Erreur pendant le seeding :", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Déconnexion de MongoDB.");
    process.exit(0);
  }
}

seedDatabase();

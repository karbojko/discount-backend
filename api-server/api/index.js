import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db.json");

function readDB() {
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;
  const db = readDB();
  const campaigns = db.Discountcampaigns;

  if (method === "GET") {
    return res.status(200).json(campaigns);
  }

  if (method === "POST") {
    const newCampaign = {
      id: Date.now().toString(),
      ...req.body,
    };
    campaigns.push(newCampaign);
    writeDB(db);
    return res.status(201).json(newCampaign);
  }

  if (method === "PUT") {
    const id = req.query.id;
    const index = campaigns.findIndex(c => c.id === id);

    if (index === -1) return res.status(404).json({ message: "Not found" });

    campaigns[index] = { ...campaigns[index], ...req.body };
    writeDB(db);

    return res.status(200).json(campaigns[index]);
  }

  if (method === "DELETE") {
    const id = req.query.id;
    const filtered = campaigns.filter(c => c.id !== id);
    db.Discountcampaigns = filtered;
    writeDB(db);

    return res.status(200).json({ message: "Deleted" });
  }

  res.status(405).json({ message: "Method not allowed" });
}

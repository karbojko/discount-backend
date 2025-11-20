import { put, list, del } from "@vercel/blob";
import { v4 as uuid } from "uuid";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { method } = req;

  try {
    // GET — zwraca listę kampanii
    if (method === "GET") {
      const blobs = await list({ prefix: "campaigns/" });

      const campaigns = await Promise.all(
        blobs.blobs.map(async (file) => {
          const response = await fetch(file.url);
          return await response.json();
        })
      );

      return res.status(200).json(campaigns);
    }

    // POST — dodaje nową kampanię
    if (method === "POST") {
      const id = uuid();
      const data = { id, ...req.body };

      const blobName = `campaigns/${id}.json`;
      await put(blobName, JSON.stringify(data), { access: "public" });

      return res.status(201).json(data);
    }

    // PUT — aktualizuje istniejącą kampanię
    if (method === "PUT") {
      const id = req.query.id;
      const blobName = `campaigns/${id}.json`;

      // Pobierz istniejący rekord
      const blobs = await list({ prefix: `campaigns/${id}.json` });
      if (blobs.blobs.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }

      const existing = await fetch(blobs.blobs[0].url);
      const existingData = await existing.json();
      const updated = { ...existingData, ...req.body };

      // Nadpisz blob
      await put(blobName, JSON.stringify(updated), { access: "public" });

      return res.status(200).json(updated);
    }

    // DELETE — usuwa kampanię
    if (method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Missing ID" });
      }

      try {
        // Pobierz wszystkie blob'y w folderze campaigns
        const allBlobs = await list({ prefix: "campaigns/" });

        // Znajdź blob powiązany z ID
        const blobToDelete = allBlobs.blobs.find((blob) => {
          const fileName = blob.pathname.split("/").pop(); // np. 123.json
          const extractedId = fileName.replace(".json", "");
          return extractedId === id;
        });

        if (!blobToDelete) {
          return res.status(404).json({ message: "Not found" });
        }

        // Usuń blob po pełnym URL
        await del(blobToDelete.url);

        return res.status(200).json({
          message: "Deleted",
          deletedId: id,
          blob: blobToDelete,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error deleting blob",
          error: error.message,
        });
      }
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}


import express from "express";

import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  toggleFavorite,
} from "../controllers/documentController.js";

const router = express.Router();

router.get("/", getDocuments);

router.post("/", createDocument);

// Keep the favorite route before the general ID route
router.patch("/:id/favorite", toggleFavorite);

router.get("/:id", getDocumentById);

router.put("/:id", updateDocument);

router.delete("/:id", deleteDocument);

export default router;

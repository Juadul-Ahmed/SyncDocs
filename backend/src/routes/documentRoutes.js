import express from "express";

import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.get("/", getDocuments);

router.get("/:id", getDocumentById);

router.post("/", createDocument);

router.put("/:id", updateDocument);

router.delete("/:id", deleteDocument);

export default router;
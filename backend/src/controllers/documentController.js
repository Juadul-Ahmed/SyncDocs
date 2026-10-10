import Document from "../models/Document.js";

export const createDocument = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { title, content } = req.body;

    const document = await Document.create({
      title,
      content,
    });

    res.status(201).json(document);
  } catch (error) {
    console.error("❌ Error creating document:", error);

    res.status(500).json({
      message: "Failed to create document",
      error: error.message,
    });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({
      updatedAt: -1,
    });

    res.status(200).json(documents);
  } catch (error) {
    console.error("❌ Error fetching documents:", error);

    res.status(500).json({
      message: "Failed to fetch documents",
    });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error("❌ Error fetching document:", error);

    res.status(500).json({
      message: "Failed to fetch document",
    });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const { title, content } = req.body;

    const document = await Document.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error("❌ Error updating document:", error);

    res.status(500).json({
      message: "Failed to update document",
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(
      req.params.id
    );

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    res.status(200).json({
      message: "Document deleted successfully",
      document,
    });
  } catch (error) {
    console.error("❌ Error deleting document:", error);

    res.status(500).json({
      message: "Failed to delete document",
    });
  }
};

// Toggle a document's favorite status
export const toggleFavorite = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    document.isFavorite = !document.isFavorite;

    await document.save();

    return res.status(200).json(document);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update favorite status",
      error: error.message,
    });
  }
};
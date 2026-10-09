const API_URL = "/api";

export type ApiDocument = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type DocumentData = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

// GET all documents
export const getDocuments = async (): Promise<DocumentData[]> => {
  const response = await fetch(`${API_URL}/documents`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  const data: ApiDocument[] = await response.json();

  return data.map((document) => ({
    id: document._id,
    title: document.title,
    content: document.content,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  }));
};

// CREATE a document
export const createDocument = async (
  documentData: {
    title: string;
    content: string;
  },
): Promise<DocumentData> => {
  const response = await fetch(`${API_URL}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(documentData),
  });

  if (!response.ok) {
    throw new Error("Failed to create document");
  }

  const data: ApiDocument = await response.json();

  return {
    id: data._id,
    title: data.title,
    content: data.content,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

// GET one document by ID
export const getDocument = async (
  id: string,
): Promise<DocumentData> => {
  const response = await fetch(
    `${API_URL}/documents/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch document");
  }

  const data: ApiDocument = await response.json();

  return {
    id: data._id,
    title: data.title,
    content: data.content,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

// UPDATE a document
export const updateDocument = async (
  id: string,
  documentData: {
    title: string;
    content: string;
  },
): Promise<DocumentData> => {
  const response = await fetch(
    `${API_URL}/documents/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(documentData),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update document");
  }

  const data: ApiDocument = await response.json();

  return {
    id: data._id,
    title: data.title,
    content: data.content,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
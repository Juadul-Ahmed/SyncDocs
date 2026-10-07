const API_URL = "/api";

type ApiDocument = {
  _id: string;
  title: string;
  content: string;
};

export const getDocuments = async () => {
  console.log("Fetching:", `${API_URL}/documents`);

  const response = await fetch(`${API_URL}/documents`);

  console.log("Response:", response.status);

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  const data: ApiDocument[] = await response.json();

  console.log("Backend data:", data);

  return data.map((document) => ({
    id: document._id,
    title: document.title,
    content: document.content,
  }));
};
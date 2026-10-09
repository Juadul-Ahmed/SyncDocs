import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Document = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type DocumentState = {
  documents: Document[];
  currentDocument: Document | null;
};

const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
};

const documentSlice = createSlice({
  name: "documents",
  initialState,

  reducers: {
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },

    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },

    updateDocument: (state, action: PayloadAction<Document>) => {
      const index = state.documents.findIndex(
        (document) => document.id === action.payload.id,
      );

      if (index !== -1) {
        state.documents[index] = action.payload;
      }
    },
    deleteDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(
        (document) => document.id !== action.payload,
      );
    },
  },
});

export const { setDocuments, addDocument, updateDocument } =
  documentSlice.actions;

export default documentSlice.reducer;

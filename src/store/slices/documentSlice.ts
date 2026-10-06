import { createSlice } from "@reduxjs/toolkit";

type Document = {
  id: string;
  title: string;
  content: string;
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
  reducers: {},
});

export default documentSlice.reducer;
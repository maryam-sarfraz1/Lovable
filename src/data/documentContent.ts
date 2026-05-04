// Re-export from mirrored source to make module findable
import * as docModule from "../../Lovable/src/data/documentContent";

export type DocumentFAQ = docModule.DocumentFAQ;
export type DocumentContent = docModule.DocumentContent;
export const documentContent = docModule.documentContent;
export const getDocumentContent = docModule.getDocumentContent;

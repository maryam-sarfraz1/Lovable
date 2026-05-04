declare module "@/data/documentContent" {
  export interface DocumentFAQ {
    q: string;
    a: string;
  }

  export interface DocumentContent {
    title: string;
    otherNames?: string[];
    whatIs: string;
    whenToUse: string[];
    faqs: DocumentFAQ[];
    keyProtections?: string[];
    whatYouNeed?: string[];
    estimatedTime?: string;
    legalDisclaimer?: string;
  }

  export const documentContent: Record<string, DocumentContent>;
}

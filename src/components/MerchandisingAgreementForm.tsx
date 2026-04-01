import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Which country's laws will govern this document?",
        type: "select",
        required: true,
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
          { value: "au", label: "Australia" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    label: "State/Province",
    fields: [
      {
        name: "state",
        label: "Which state or province?",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => {
          if (values.country === "us") {
            return [
              { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" },
              { value: "AZ", label: "Arizona" }, { value: "AR", label: "Arkansas" },
              { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
              { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" },
              { value: "FL", label: "Florida" }, { value: "GA", label: "Georgia" },
              { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
              { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" },
              { value: "IA", label: "Iowa" }, { value: "KS", label: "Kansas" },
              { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
              { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" },
              { value: "MA", label: "Massachusetts" }, { value: "MI", label: "Michigan" },
              { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
              { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" },
              { value: "NE", label: "Nebraska" }, { value: "NV", label: "Nevada" },
              { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
              { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" },
              { value: "NC", label: "North Carolina" }, { value: "ND", label: "North Dakota" },
              { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
              { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" },
              { value: "RI", label: "Rhode Island" }, { value: "SC", label: "South Carolina" },
              { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
              { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" },
              { value: "VT", label: "Vermont" }, { value: "VA", label: "Virginia" },
              { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
              { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
              { value: "DC", label: "District of Columbia" },
            ];
          } else if (values.country === "ca") {
            return [
              { value: "AB", label: "Alberta" }, { value: "BC", label: "British Columbia" },
              { value: "MB", label: "Manitoba" }, { value: "NB", label: "New Brunswick" },
              { value: "NL", label: "Newfoundland and Labrador" }, { value: "NS", label: "Nova Scotia" },
              { value: "ON", label: "Ontario" }, { value: "PE", label: "Prince Edward Island" },
              { value: "QC", label: "Quebec" }, { value: "SK", label: "Saskatchewan" },
              { value: "NT", label: "Northwest Territories" }, { value: "NU", label: "Nunavut" },
              { value: "YT", label: "Yukon" },
            ];
          } else if (values.country === "uk") {
            return [
              { value: "ENG", label: "England" }, { value: "SCT", label: "Scotland" },
              { value: "WLS", label: "Wales" }, { value: "NIR", label: "Northern Ireland" },
            ];
          } else if (values.country === "au") {
            return [
              { value: "NSW", label: "New South Wales" }, { value: "VIC", label: "Victoria" },
              { value: "QLD", label: "Queensland" }, { value: "WA", label: "Western Australia" },
              { value: "SA", label: "South Australia" }, { value: "TAS", label: "Tasmania" },
              { value: "ACT", label: "Australian Capital Territory" }, { value: "NT", label: "Northern Territory" },
            ];
          }
          return [{ value: "other", label: "Other Region" }];
        },
      },
    ],
  },
  {
    label: "Agreement Date",
    fields: [
      {
        name: "effectiveDate",
        label: "What is the effective date of this agreement?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Licensor",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of the Licensor",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is this party an individual or a business?",
        type: "select",
        required: true,
        options: [
          { value: "individual", label: "Individual" },
          { value: "business", label: "Business/Company" },
        ],
      },
    ],
  },
  {
    label: "Licensor Address",
    fields: [
      {
        name: "party1Street",
        label: "Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "party1City",
        label: "City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "party1Zip",
        label: "ZIP/Postal Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
    ],
  },
  {
    label: "Licensor Contact",
    fields: [
      {
        name: "party1Email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party1Phone",
        label: "Phone Number",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Licensee",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of the Licensee",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is this party an individual or a business?",
        type: "select",
        required: true,
        options: [
          { value: "individual", label: "Individual" },
          { value: "business", label: "Business/Company" },
        ],
      },
    ],
  },
  {
    label: "Licensee Address",
    fields: [
      {
        name: "party2Street",
        label: "Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "party2City",
        label: "City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "party2Zip",
        label: "ZIP/Postal Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
    ],
  },
  {
    label: "Licensee Contact",
    fields: [
      {
        name: "party2Email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party2Phone",
        label: "Phone Number",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Licensed Property & Products",
    fields: [
      {
        name: "licensedProperty",
        label: "Describe the Licensed Property (brand, trademark, character, IP, etc.)",
        type: "textarea",
        required: true,
        placeholder: "e.g. The trademark 'XYZ Brand' and associated logos and characters...",
      },
      {
        name: "products",
        label: "Describe the Products licensed for manufacture and sale",
        type: "textarea",
        required: true,
        placeholder: "e.g. T-shirts, mugs, hats, and other apparel bearing the Licensed Property...",
      },
      {
        name: "territory",
        label: "Territory (geographical area of license)",
        type: "text",
        required: true,
        placeholder: "e.g. Worldwide / United States / North America",
      },
    ],
  },
  {
    label: "Agreement Details",
    fields: [
      {
        name: "description",
        label: "Describe the purpose and scope of this agreement",
        type: "textarea",
        required: true,
        placeholder: "Provide a detailed description of the agreement terms...",
      },
    ],
  },
  {
    label: "Terms & Duration",
    fields: [
      {
        name: "duration",
        label: "What is the duration of this agreement?",
        type: "select",
        required: true,
        options: [
          { value: "1month", label: "1 Month" },
          { value: "3months", label: "3 Months" },
          { value: "6months", label: "6 Months" },
          { value: "1year", label: "1 Year" },
          { value: "2years", label: "2 Years" },
          { value: "5years", label: "5 Years" },
          { value: "indefinite", label: "Indefinite/Ongoing" },
          { value: "custom", label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice",
        label: "Termination notice period",
        type: "select",
        required: true,
        options: [
          { value: "7days", label: "7 Days" },
          { value: "14days", label: "14 Days" },
          { value: "30days", label: "30 Days" },
          { value: "60days", label: "60 Days" },
          { value: "90days", label: "90 Days" },
        ],
      },
      {
        name: "curePeriodDays",
        label: "Cure period (days) before termination for breach",
        type: "select",
        required: true,
        options: [
          { value: "7", label: "7 Days" },
          { value: "14", label: "14 Days" },
          { value: "30", label: "30 Days" },
          { value: "60", label: "60 Days" },
        ],
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "initialFee",
        label: "Initial (non-refundable) license fee ($)",
        type: "text",
        required: false,
        placeholder: "e.g. 5,000",
      },
      {
        name: "royaltyPercent",
        label: "Royalty percentage (%)",
        type: "text",
        required: true,
        placeholder: "e.g. 10",
      },
      {
        name: "paymentSchedule",
        label: "Royalty payment schedule",
        type: "select",
        required: true,
        options: [
          { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "biannually", label: "Bi-annually" },
          { value: "annually", label: "Annually" },
        ],
      },
      {
        name: "lateInterestRate",
        label: "Late payment interest rate (% per annum)",
        type: "text",
        required: false,
        placeholder: "e.g. 1.5",
      },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      {
        name: "confidentiality",
        label: "Include confidentiality clause?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes - Include confidentiality provisions" },
          { value: "no", label: "No - Not needed" },
        ],
      },
      {
        name: "disputeResolution",
        label: "How should disputes be resolved?",
        type: "select",
        required: true,
        options: [
          { value: "mediation", label: "Mediation" },
          { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation", label: "Court Litigation" },
          { value: "negotiation", label: "Good Faith Negotiation First" },
        ],
      },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      {
        name: "additionalTerms",
        label: "Any additional terms or special conditions?",
        type: "textarea",
        required: false,
        placeholder: "Enter any additional terms, conditions, or special provisions...",
      },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      {
        name: "party1Signature",
        label: "Licensor Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Licensee Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "witnessName",
        label: "Witness Name (Optional)",
        type: "text",
        required: false,
        placeholder: "Witness full legal name",
      },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ─── PDF Helpers ──────────────────────────────────────────────────────────────

const addPage = (doc: jsPDF, y: number, margin: number): number => {
  if (y > 272) { doc.addPage(); return margin; }
  return y;
};

const writeWrapped = (doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number, margin: number): number => {
  const lines: string[] = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line: string) => {
    y = addPage(doc, y, margin);
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
};

const sectionTitle = (doc: jsPDF, text: string, x: number, y: number, margin: number): number => {
  y = addPage(doc, y, margin);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "bold");
  doc.text(text, x, y);
  return y + 5;
};

const body = (doc: jsPDF, text: string, x: number, y: number, w: number, lh: number, margin: number): number => {
  y = addPage(doc, y, margin);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  return writeWrapped(doc, text, x, y, w, lh, margin);
};

const bullet = (doc: jsPDF, text: string, x: number, y: number, w: number, lh: number, margin: number): number => {
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  return writeWrapped(doc, `\u2022  ${text}`, x + 4, y, w - 4, lh, margin);
};

// ─── generatePDF ──────────────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 20;
  const R = 190;
  const W = R - L;
  const lh = 5;
  let y = 18;

  const durMap: Record<string, string> = {
    "1month": "1 Month", "3months": "3 Months", "6months": "6 Months",
    "1year": "1 Year", "2years": "2 Years", "5years": "5 Years",
    "indefinite": "Indefinite/Ongoing", "custom": "Custom Duration",
  };
  const noticeMap: Record<string, string> = {
    "7days": "7 Days", "14days": "14 Days", "30days": "30 Days",
    "60days": "60 Days", "90days": "90 Days",
  };

  const p1name      = values.party1Name || "Licensor";
  const p2name      = values.party2Name || "Licensee";
  const p1addr      = `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`;
  const p2addr      = `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`;
  const eDate       = values.effectiveDate || "___";
  const juris       = `${values.state || "___"}, ${(values.country || "").toUpperCase()}`;
  const dur         = durMap[values.duration] || values.duration || "___";
  const notice      = noticeMap[values.terminationNotice] || values.terminationNotice || "___";
  const cureDays    = values.curePeriodDays || "30";
  const licensedProp = values.licensedProperty || "___";
  const products    = values.products || "___";
  const territory   = values.territory || "___";
  const initialFee  = values.initialFee || "___";
  const royaltyPct  = values.royaltyPercent || "___";
  const paySched    = values.paymentSchedule || "___";
  const lateRate    = values.lateInterestRate || "___";
  const sig1        = values.party1Signature || p1name;
  const sig2        = values.party2Signature || p2name;

  // ── Title ──
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("MERCHANDISING AGREEMENT", 105, y, { align: "center" });
  y += 7;
  doc.setLineWidth(0.5);
  doc.line(L, y, R, y);
  y += 6;

  // ── Intro ──
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const intro = `This Merchandising Agreement (the "Agreement") is made and entered into as of ${eDate} (the "Effective Date"), by and between ${p1name}, having its principal place of business at ${p1addr} (the "Licensor"), and ${p2name}, having its principal place of business at ${p2addr} (the "Licensee"). The Licensor and the Licensee may each be referred to as a "Party" and collectively as the "Parties."`;
  y = writeWrapped(doc, intro, L, y, W, lh, L);
  y += 3;

  // ── 1. GRANT OF LICENSE ──
  y = sectionTitle(doc, "1. GRANT OF LICENSE", L, y, L);
  y = sectionTitle(doc, "1.1 Licensed Property", L, y, L);
  y = body(doc, `The Licensor represents and warrants that it is the sole and lawful owner of all right, title, and interest in and to ${licensedProp} (the "Licensed Property").`, L, y, W, lh, L);
  y = sectionTitle(doc, "1.2 License Grant", L, y, L);
  y = body(doc, "Subject to the terms and conditions of this Agreement, the Licensor hereby grants to the Licensee an exclusive, non-transferable, and non-sublicensable license to use the Licensed Property solely in connection with the design, manufacture, marketing, distribution, and sale of the following merchandise (the \"Products\"):", L, y, W, lh, L);
  y = bullet(doc, products, L, y, W, lh, L);
  y = body(doc, "This license is limited strictly to the rights expressly granted herein. All rights not expressly granted are reserved by the Licensor.", L, y, W, lh, L);
  y = sectionTitle(doc, "1.3 Ownership", L, y, L);
  y = body(doc, "The Licensee acknowledges that all intellectual property rights in and to the Licensed Property shall remain the exclusive property of the Licensor. The Licensee shall not acquire any ownership rights by virtue of this Agreement.", L, y, W, lh, L);
  y += 2;

  // ── 2. TERRITORY ──
  y = sectionTitle(doc, "2. TERRITORY", L, y, L);
  y = body(doc, `The rights granted under this Agreement shall be limited to the following geographical territory (the "Territory"): ${territory}. The Licensee shall not manufacture, distribute, or sell the Products outside the Territory, nor authorize any third party to do so.`, L, y, W, lh, L);
  y += 2;

  // ── 3. TERM ──
  y = sectionTitle(doc, "3. TERM", L, y, L);
  y = body(doc, `This Agreement shall commence on the Effective Date and shall continue for a period of ${dur}, unless earlier terminated in accordance with the provisions of this Agreement.`, L, y, W, lh, L);
  y += 2;

  // ── 4. CONSIDERATION AND ROYALTIES ──
  y = sectionTitle(doc, "4. CONSIDERATION AND ROYALTIES", L, y, L);
  y = sectionTitle(doc, "4.1 Initial Fee", L, y, L);
  y = body(doc, `The Licensee shall pay the Licensor a non-refundable license fee of $${initialFee} upon execution of this Agreement.`, L, y, W, lh, L);
  y = sectionTitle(doc, "4.2 Royalties", L, y, L);
  y = body(doc, `In addition to the initial fee, the Licensee shall pay the Licensor a royalty of ${royaltyPct}% of gross sales revenue (collectively, "Royalty Payments").`, L, y, W, lh, L);
  y = sectionTitle(doc, "4.3 Reporting and Payment", L, y, L);
  y = body(doc, `Royalty Payments shall be made on a ${paySched} basis and shall be accompanied by a detailed written statement specifying:`, L, y, W, lh, L);
  y = bullet(doc, "Units manufactured and sold;", L, y, W, lh, L);
  y = bullet(doc, "Gross and/or net sales;", L, y, W, lh, L);
  y = bullet(doc, "Applicable deductions; and", L, y, W, lh, L);
  y = bullet(doc, "Royalty calculations.", L, y, W, lh, L);
  y = body(doc, `Late payments may be subject to interest at the rate of ${lateRate}% per annum or the maximum permitted by law.`, L, y, W, lh, L);
  y += 2;

  // ── 5. BOOKS AND RECORDS ──
  y = sectionTitle(doc, "5. BOOKS AND RECORDS", L, y, L);
  y = body(doc, "The Licensee shall maintain complete and accurate books and records relating to the manufacture and sale of the Products. The Licensor shall have the right, upon reasonable prior notice, to inspect and audit such records during normal business hours.", L, y, W, lh, L);
  y += 2;

  // ── 6. QUALITY CONTROL AND APPROVALS ──
  y = sectionTitle(doc, "6. QUALITY CONTROL AND APPROVALS", L, y, L);
  y = sectionTitle(doc, "6.1 Approval Requirement", L, y, L);
  y = body(doc, "The Licensee shall submit to the Licensor, for prior written approval:", L, y, W, lh, L);
  y = bullet(doc, "Product designs and specifications;", L, y, W, lh, L);
  y = bullet(doc, "Samples of Products;", L, y, W, lh, L);
  y = bullet(doc, "Packaging materials; and", L, y, W, lh, L);
  y = bullet(doc, "Advertising and promotional content.", L, y, W, lh, L);
  y = body(doc, "No Product shall be manufactured, marketed, or sold without the Licensor's prior written approval.", L, y, W, lh, L);
  y = sectionTitle(doc, "6.2 Deemed Approval", L, y, L);
  y = body(doc, "If the Licensor fails to respond within fourteen (14) days of submission, such submission shall be deemed approved.", L, y, W, lh, L);
  y = sectionTitle(doc, "6.3 Standards", L, y, L);
  y = body(doc, "All Products shall meet high-quality standards consistent with the reputation and goodwill associated with the Licensed Property.", L, y, W, lh, L);
  y += 2;

  // ── 7. USE RESTRICTIONS ──
  y = sectionTitle(doc, "7. USE RESTRICTIONS", L, y, L);
  y = body(doc, "The Licensee shall not:", L, y, W, lh, L);
  y = bullet(doc, "Modify or alter the Licensed Property without prior written consent;", L, y, W, lh, L);
  y = bullet(doc, "Use the Licensed Property in any manner not expressly authorized;", L, y, W, lh, L);
  y = bullet(doc, "Engage in any activity that may harm the reputation or goodwill of the Licensor.", L, y, W, lh, L);
  y += 2;

  // ── 8. COPYRIGHT AND TRADEMARK NOTICES ──
  y = sectionTitle(doc, "8. COPYRIGHT AND TRADEMARK NOTICES", L, y, L);
  y = sectionTitle(doc, "8.1 Required Notices", L, y, L);
  y = body(doc, "The Licensee shall ensure that all Products, packaging, and promotional materials prominently display:", L, y, W, lh, L);
  y = bullet(doc, "Appropriate copyright notices (\u00a9, owner name, year); and", L, y, W, lh, L);
  y = bullet(doc, "Trademark notices (\"\u2122\" or \"\u00ae\"), as directed by the Licensor.", L, y, W, lh, L);
  y = sectionTitle(doc, "8.2 Compliance", L, y, L);
  y = body(doc, "All such notices shall comply with the Licensor's branding guidelines and applicable law.", L, y, W, lh, L);
  y += 2;

  // ── 9. GOODWILL ──
  y = sectionTitle(doc, "9. GOODWILL AND OWNERSHIP OF DERIVATIVES", L, y, L);
  y = body(doc, "All goodwill arising from the use of the Licensed Property shall inure solely to the benefit of the Licensor. Any modifications, enhancements, or derivative works related to the Licensed Property shall be deemed the exclusive property of the Licensor.", L, y, W, lh, L);
  y += 2;

  // ── 10. ENFORCEMENT ──
  y = sectionTitle(doc, "10. ENFORCEMENT OF RIGHTS", L, y, L);
  y = body(doc, "The Licensor shall retain the sole right to enforce its intellectual property rights. The Licensee shall:", L, y, W, lh, L);
  y = bullet(doc, "Promptly notify the Licensor of any infringement or unauthorized use; and", L, y, W, lh, L);
  y = bullet(doc, "Fully cooperate in any enforcement or legal proceedings.", L, y, W, lh, L);
  y += 2;

  // ── 11. INDEMNIFICATION ──
  y = sectionTitle(doc, "11. INDEMNIFICATION", L, y, L);
  y = body(doc, "The Licensee shall indemnify, defend, and hold harmless the Licensor and its affiliates from and against any and all claims, damages, liabilities, losses, and expenses (including reasonable attorneys' fees) arising out of or related to:", L, y, W, lh, L);
  y = bullet(doc, "The manufacture, distribution, or sale of the Products;", L, y, W, lh, L);
  y = bullet(doc, "Any breach of this Agreement;", L, y, W, lh, L);
  y = bullet(doc, "Product defects or liability claims; or", L, y, W, lh, L);
  y = bullet(doc, "Unauthorized use of the Licensed Property.", L, y, W, lh, L);
  y += 2;

  // ── 12. INSURANCE ──
  y = sectionTitle(doc, "12. INSURANCE", L, y, L);
  y = body(doc, "The Licensee shall maintain adequate insurance coverage, including:", L, y, W, lh, L);
  y = bullet(doc, "Product liability insurance; and", L, y, W, lh, L);
  y = bullet(doc, "Commercial general liability insurance.", L, y, W, lh, L);
  y = body(doc, "The Licensor shall be named as an additional insured. Proof of insurance shall be provided within thirty (30) days of the Effective Date.", L, y, W, lh, L);
  y += 2;

  // ── 13. DEFAULT AND TERMINATION ──
  y = sectionTitle(doc, "13. DEFAULT AND TERMINATION", L, y, L);
  y = sectionTitle(doc, "13.1 Events of Default", L, y, L);
  y = body(doc, "The following shall constitute material breaches:", L, y, W, lh, L);
  y = bullet(doc, "Failure to make required payments;", L, y, W, lh, L);
  y = bullet(doc, "Insolvency or bankruptcy;", L, y, W, lh, L);
  y = bullet(doc, "Seizure of assets;", L, y, W, lh, L);
  y = bullet(doc, "Failure to perform contractual obligations.", L, y, W, lh, L);
  y = sectionTitle(doc, "13.2 Cure Period", L, y, L);
  y = body(doc, `The Licensor may terminate this Agreement upon ${cureDays} days' written notice unless the breach is cured within such period.`, L, y, W, lh, L);
  y += 2;

  // ── 14. FORCE MAJEURE ──
  y = sectionTitle(doc, "14. FORCE MAJEURE", L, y, L);
  y = body(doc, "Neither Party shall be liable for failure or delay in performance due to events beyond reasonable control, including but not limited to natural disasters, pandemics, government actions, war or civil unrest. Performance shall resume as soon as reasonably practicable.", L, y, W, lh, L);
  y += 2;

  // ── 15. DISPUTE RESOLUTION ──
  y = sectionTitle(doc, "15. DISPUTE RESOLUTION", L, y, L);
  y = body(doc, "Any dispute arising under this Agreement shall first be resolved through good faith negotiations. If unresolved, the dispute shall be submitted to binding arbitration in accordance with applicable arbitration laws. The arbitral award shall be final and enforceable in any court of competent jurisdiction.", L, y, W, lh, L);
  y += 2;

  // ── 16. WARRANTIES ──
  y = sectionTitle(doc, "16. WARRANTIES", L, y, L);
  y = sectionTitle(doc, "16.1 Licensor Warranty", L, y, L);
  y = body(doc, "The Licensor represents that it has full authority to grant the rights set forth herein.", L, y, W, lh, L);
  y = sectionTitle(doc, "16.2 Licensee Warranties", L, y, L);
  y = body(doc, "The Licensee represents and warrants that it shall:", L, y, W, lh, L);
  y = bullet(doc, "Not challenge the Licensor's ownership;", L, y, W, lh, L);
  y = bullet(doc, "Maintain high-quality manufacturing standards;", L, y, W, lh, L);
  y = bullet(doc, "Comply with all applicable laws and regulations;", L, y, W, lh, L);
  y = bullet(doc, "Refrain from unauthorized sublicensing; and", L, y, W, lh, L);
  y = bullet(doc, "Conduct its business ethically and professionally.", L, y, W, lh, L);
  y += 2;

  // ── 17. SALES AND DISTRIBUTION ──
  y = sectionTitle(doc, "17. SALES AND DISTRIBUTION", L, y, L);
  y = body(doc, "The Licensee shall:", L, y, W, lh, L);
  y = bullet(doc, "Use commercially reasonable efforts to promote and sell the Products;", L, y, W, lh, L);
  y = bullet(doc, "Maintain competitive and reasonable pricing; and", L, y, W, lh, L);
  y = bullet(doc, "Utilize only approved distribution channels.", L, y, W, lh, L);
  y += 2;

  // ── 18. LIMITATION OF LIABILITY ──
  y = sectionTitle(doc, "18. LIMITATION OF LIABILITY", L, y, L);
  y = body(doc, "To the fullest extent permitted by law, the Licensor shall not be liable for any indirect, incidental, or consequential damages, including loss of profits or business interruption.", L, y, W, lh, L);
  y += 2;

  // ── 19. ASSIGNMENT ──
  y = sectionTitle(doc, "19. ASSIGNMENT", L, y, L);
  y = body(doc, "Neither Party may assign or transfer this Agreement, in whole or in part, without the prior written consent of the other Party.", L, y, W, lh, L);
  y += 2;

  // ── 20. TERMINATION AND POST-TERMINATION ──
  y = sectionTitle(doc, "20. TERMINATION AND POST-TERMINATION RIGHTS", L, y, L);
  y = body(doc, `Either Party may terminate this Agreement upon ${notice} written notice. Upon termination:`, L, y, W, lh, L);
  y = bullet(doc, "The Licensee may sell remaining inventory for a period of up to ninety (90) days;", L, y, W, lh, L);
  y = bullet(doc, "All outstanding payments shall become immediately due and payable; and", L, y, W, lh, L);
  y = bullet(doc, "All rights granted herein shall revert to the Licensor.", L, y, W, lh, L);
  y += 2;

  // ── 21. CONFIDENTIALITY ──
  if (values.confidentiality === "yes") {
    y = sectionTitle(doc, "21. CONFIDENTIALITY", L, y, L);
    y = body(doc, "The Licensee shall maintain the confidentiality of all proprietary and confidential information of the Licensor. This obligation shall survive termination of this Agreement.", L, y, W, lh, L);
    y += 2;
  }

  // ── 22. RETURN OF MATERIALS ──
  y = sectionTitle(doc, "22. RETURN OF MATERIALS", L, y, L);
  y = body(doc, "Upon termination or expiration, the Licensee shall promptly return or destroy all materials related to the Licensed Property.", L, y, W, lh, L);
  y += 2;

  // ── 23. ATTORNEYS' FEES ──
  y = sectionTitle(doc, "23. ATTORNEYS' FEES", L, y, L);
  y = body(doc, "In any legal proceeding arising out of this Agreement, the prevailing Party shall be entitled to recover its reasonable attorneys' fees and costs.", L, y, W, lh, L);
  y += 2;

  // ── 24. WAIVER ──
  y = sectionTitle(doc, "24. WAIVER", L, y, L);
  y = body(doc, "The failure of either Party to enforce any provision shall not constitute a waiver of future enforcement of that or any other provision.", L, y, W, lh, L);
  y += 2;

  // ── 25. SEVERABILITY ──
  y = sectionTitle(doc, "25. SEVERABILITY", L, y, L);
  y = body(doc, "If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.", L, y, W, lh, L);
  y += 2;

  // ── 26. ENTIRE AGREEMENT ──
  y = sectionTitle(doc, "26. ENTIRE AGREEMENT", L, y, L);
  y = body(doc, "This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements or understandings.", L, y, W, lh, L);
  y += 2;

  // ── 27. GOVERNING LAW ──
  y = sectionTitle(doc, "27. GOVERNING LAW", L, y, L);
  y = body(doc, `This Agreement shall be governed by and construed in accordance with the laws of ${juris}.`, L, y, W, lh, L);
  y += 2;

  // ── 28. AMENDMENTS ──
  y = sectionTitle(doc, "28. AMENDMENTS", L, y, L);
  y = body(doc, "This Agreement may only be amended by a written document signed by both Parties.", L, y, W, lh, L);

  if (values.additionalTerms) {
    y += 2;
    y = sectionTitle(doc, "ADDITIONAL TERMS", L, y, L);
    y = body(doc, values.additionalTerms, L, y, W, lh, L);
  }

  // ── 29. SIGNATURES ──
  y += 4;
  y = addPage(doc, y, L);
  doc.setLineWidth(0.4);
  doc.line(L, y, R, y);
  y += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("29. SIGNATURES", L, y);
  y += 5;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", L, y);
  y += 7;

  // LICENSOR
  doc.setFont("helvetica", "bold");
  doc.text("LICENSOR:", L, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: ______________________________", L, y); y += 5;
  doc.setFont("helvetica", "italic");
  doc.text(sig1, L + 22, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Name: " + p1name, L, y); y += 5;
  doc.text("Address: " + p1addr, L, y); y += 5;
  doc.text("Email: " + (values.party1Email || ""), L, y);
  if (values.party1Phone) { y += 5; doc.text("Phone: " + values.party1Phone, L, y); }
  y += 5;
  doc.text("Date: ______________________________", L, y);
  y += 10;

  // LICENSEE
  doc.setFont("helvetica", "bold");
  doc.text("LICENSEE:", L, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: ______________________________", L, y); y += 5;
  doc.setFont("helvetica", "italic");
  doc.text(sig2, L + 22, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Name: " + p2name, L, y); y += 5;
  doc.text("Address: " + p2addr, L, y); y += 5;
  doc.text("Email: " + (values.party2Email || ""), L, y);
  if (values.party2Phone) { y += 5; doc.text("Phone: " + values.party2Phone, L, y); }
  y += 5;
  doc.text("Date: ______________________________", L, y);

  if (values.witnessName) {
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS:", L, y); y += 5;
    doc.setFont("helvetica", "normal");
    doc.text("Name: " + values.witnessName, L, y); y += 5;
    doc.text("Signature: ______________________________", L, y); y += 5;
    doc.text("Date: ______________________________", L, y);
  }

  doc.save("merchandising_agreement.pdf");
};

export default function MerchandisingAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Merchandising Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="merchandisingagreement"
    />
  );
}
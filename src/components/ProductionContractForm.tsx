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
    label: "Manufacturer Details",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of the Manufacturer",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Manufacturer an individual or a business?",
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
    label: "Manufacturer Address",
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
    label: "Manufacturer Contact",
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
    label: "Buyer Details",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of the Buyer",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Buyer an individual or a business?",
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
    label: "Buyer Address",
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
    label: "Buyer Contact",
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
    label: "Goods Description",
    fields: [
      {
        name: "buyerBusiness",
        label: "Briefly describe the Buyer's business / product line",
        type: "text",
        required: true,
        placeholder: "e.g. developing and marketing consumer electronics",
      },
      {
        name: "productDescription",
        label: "Product description",
        type: "text",
        required: true,
        placeholder: "e.g. Industrial Steel Components",
      },
      {
        name: "productQuantity",
        label: "Quantity",
        type: "text",
        required: true,
        placeholder: "e.g. 500 units",
      },
      {
        name: "unitPrice",
        label: "Unit Price (USD)",
        type: "text",
        required: true,
        placeholder: "e.g. $25.00",
      },
      {
        name: "totalContractValue",
        label: "Total Contract Value (USD)",
        type: "text",
        required: true,
        placeholder: "e.g. $12,500.00",
      },
    ],
  },
  {
    label: "Delivery",
    fields: [
      {
        name: "deliveryDate",
        label: "Agreed delivery date",
        type: "date",
        required: true,
      },
      {
        name: "deliveryAddress",
        label: "Delivery destination address",
        type: "text",
        required: true,
        placeholder: "Full delivery address",
      },
    ],
  },
  {
    label: "Payment Terms",
    fields: [
      {
        name: "depositAmount",
        label: "Deposit amount (USD) — payable upon execution of this Contract",
        type: "text",
        required: true,
        placeholder: "e.g. $3,000.00",
      },
      {
        name: "balanceAmount",
        label: "Balance amount (USD) — payable upon delivery and acceptance of all Goods",
        type: "text",
        required: true,
        placeholder: "e.g. $9,500.00",
      },
      {
        name: "earlyPaymentPercent",
        label: "Early payment discount (%)",
        type: "text",
        required: false,
        placeholder: "e.g. 5",
      },
      {
        name: "earlyPaymentDays",
        label: "Early payment discount period (days from invoicing)",
        type: "text",
        required: false,
        placeholder: "e.g. 10",
      },
      {
        name: "lateInterestRate",
        label: "Late payment interest rate (% per annum)",
        type: "text",
        required: true,
        placeholder: "e.g. 8",
      },
    ],
  },
  {
    label: "Inspection & Warranty",
    fields: [
      {
        name: "inspectionDays",
        label: "Days after delivery for Buyer to inspect Goods",
        type: "text",
        required: true,
        placeholder: "e.g. 7",
      },
      {
        name: "remedyDays",
        label: "Days for Manufacturer to remedy defects after written notice",
        type: "text",
        required: true,
        placeholder: "e.g. 14",
      },
      {
        name: "warrantyMonths",
        label: "Warranty period (months from date of delivery)",
        type: "text",
        required: true,
        placeholder: "e.g. 12",
      },
      {
        name: "defaultCureDays",
        label: "Days to cure a material default after written notice",
        type: "text",
        required: true,
        placeholder: "e.g. 10",
      },
    ],
  },
  {
    label: "Insurance",
    fields: [
      {
        name: "insuranceAmount",
        label: "Manufacturer's minimum liability insurance coverage (USD)",
        type: "text",
        required: true,
        placeholder: "e.g. $1,000,000",
      },
      {
        name: "insurerName",
        label: "Insurance provider / insurer name",
        type: "text",
        required: true,
        placeholder: "e.g. Liberty Mutual",
      },
    ],
  },
  {
    label: "Dispute Resolution",
    fields: [
      {
        name: "arbitrationCity",
        label: "City and State for arbitration proceedings",
        type: "text",
        required: true,
        placeholder: "e.g. Chicago, IL",
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
        name: "party2Signature",
        label: "Buyer Signature (type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Title",
        label: "Buyer Title / Designation",
        type: "text",
        required: false,
        placeholder: "e.g. CEO, Director",
      },
      {
        name: "party1Signature",
        label: "Manufacturer Signature (type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party1Title",
        label: "Manufacturer Title / Designation",
        type: "text",
        required: false,
        placeholder: "e.g. CEO, Director",
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

// ─── PDF layout constants ────────────────────────────────────────────────────
const PAGE_W    = 210;
const PAGE_H    = 297;
const M_LEFT    = 20;
const M_RIGHT   = 20;
const CONTENT_W = PAGE_W - M_LEFT - M_RIGHT;
const M_BOTTOM  = 20;
const LH        = 5.5;

// ─── PDF layout helpers ──────────────────────────────────────────────────────
function checkPage(doc: jsPDF, y: number, needed = LH): number {
  if (y + needed > PAGE_H - M_BOTTOM) { doc.addPage(); return 22; }
  return y;
}

function heading(doc: jsPDF, text: string, y: number): number {
  y = checkPage(doc, y, 10);
  y += 3;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, M_LEFT, y);
  return y + LH + 1;
}

function subheading(doc: jsPDF, text: string, y: number): number {
  y = checkPage(doc, y, 8);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(text, M_LEFT, y);
  return y + LH;
}

function body(doc: jsPDF, text: string, y: number, indent = 0): number {
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, CONTENT_W - indent);
  for (const line of lines) {
    y = checkPage(doc, y);
    doc.text(line, M_LEFT + indent, y);
    y += LH;
  }
  return y;
}

function bullet(doc: jsPDF, text: string, y: number): number {
  y = checkPage(doc, y);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, CONTENT_W - 10);
  doc.text("\u2022", M_LEFT + 3, y);
  for (const line of lines) {
    y = checkPage(doc, y);
    doc.text(line, M_LEFT + 10, y);
    y += LH;
  }
  return y;
}

function gap(y: number, px = 3): number { return y + px; }

function underlinedField(
  doc: jsPDF,
  label: string,
  value: string,
  x: number,
  y: number,
  minLineW = 55
): void {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(label, x, y);
  const lw = doc.getTextWidth(label);
  const val = value || "";
  if (val) {
    doc.setFont("helvetica", "italic");
    doc.text(val, x + lw, y);
    doc.setFont("helvetica", "normal");
  }
  doc.setLineWidth(0.3);
  doc.line(x + lw, y + 1.2, x + lw + Math.max(doc.getTextWidth(val) + 2, minLineW), y + 1.2);
}

// ─── PDF generator ───────────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 22;

  const manufacturer = values.party1Name || "[Manufacturer's Full Legal Name]";
  const buyer        = values.party2Name || "[Buyer's Full Legal Name]";
  const state        = values.state      || "[State]";

  const mAddress = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const bAddress = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");

  // ── TITLE ─────────────────────────────────────────────────────────────────
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("PRODUCTION CONTRACT", PAGE_W / 2, y, { align: "center" });
  const titleW = doc.getTextWidth("PRODUCTION CONTRACT");
  doc.setLineWidth(0.5);
  doc.line((PAGE_W - titleW) / 2, y + 1.5, (PAGE_W + titleW) / 2, y + 1.5);
  y += 10;

  // ── PREAMBLE ──────────────────────────────────────────────────────────────
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  const introText = `This Production Contract (the "Contract") is made and entered into as of ${values.effectiveDate || "___ day of _______, 20__"} (the "Effective Date"), by and between:`;
  const introLines = doc.splitTextToSize(introText, CONTENT_W);
  doc.text(introLines, M_LEFT, y);
  y += introLines.length * LH + 3;

  // Manufacturer party block
  doc.setFont("helvetica", "bold");
  doc.text(manufacturer + ",", M_LEFT, y);
  y += LH;
  doc.setFont("helvetica", "normal");
  y = body(doc, `having its principal place of business at ${mAddress || "[Address]"} (hereinafter referred to as the "Manufacturer"),`, y, 0);
  y = gap(y, 3);

  doc.setFont("helvetica", "bold");
  doc.text("AND", M_LEFT, y);
  y += LH + 2;

  // Buyer party block
  doc.setFont("helvetica", "bold");
  doc.text(buyer + ",", M_LEFT, y);
  y += LH;
  doc.setFont("helvetica", "normal");
  y = body(doc, `having its principal place of business at ${bAddress || "[Address]"} (hereinafter referred to as the "Buyer").`, y, 0);
  y = gap(y, 3);

  y = body(doc, `The Manufacturer and the Buyer are collectively referred to herein as the "Parties," and individually as a "Party."`, y);
  y = gap(y, 6);

  // ── 1. PURPOSE AND SCOPE ──────────────────────────────────────────────────
  y = heading(doc, "1. PURPOSE AND SCOPE", y);
  y = body(doc,
    `1.1  The Buyer is engaged in the business of ${values.buyerBusiness || "[describe Buyer's product line or business]"}. The Buyer desires to have manufactured certain goods and products in accordance with its proprietary designs, specifications, and standards, and the Manufacturer agrees to produce such goods under the terms and conditions set forth herein.`,
    y);
  y = gap(y, 3);
  y = body(doc,
    `1.2  The products to be manufactured and supplied under this Contract are hereinafter referred to as the "Goods" or the "Products."`,
    y);
  y = gap(y, 6);

  // ── 2. DESCRIPTION OF GOODS ───────────────────────────────────────────────
  y = heading(doc, "2. DESCRIPTION OF GOODS", y);
  y = body(doc,
    "The Manufacturer agrees to manufacture, and the Buyer agrees to purchase, the following Goods in accordance with this Contract:",
    y);
  y = gap(y, 3);

  // Goods table
  y = checkPage(doc, y, 30);
  const tW  = CONTENT_W;
  const c1  = tW * 0.40;
  const c2  = tW * 0.20;
  const c3  = tW * 0.20;
  const c4  = tW * 0.20;
  const tX  = M_LEFT;
  const rowH = 7;

  // Header row
  doc.setFillColor(220, 220, 220);
  doc.rect(tX, y, tW, rowH, "F");
  doc.rect(tX, y, tW, rowH, "S");
  // Column dividers in header
  doc.line(tX + c1, y, tX + c1, y + rowH);
  doc.line(tX + c1 + c2, y, tX + c1 + c2, y + rowH);
  doc.line(tX + c1 + c2 + c3, y, tX + c1 + c2 + c3, y + rowH);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Description",              tX + 2,                    y + 5);
  doc.text("Quantity",                 tX + c1 + 2,               y + 5);
  doc.text("Unit Price (USD)",         tX + c1 + c2 + 2,          y + 5);
  doc.text("Total Price (USD)",        tX + c1 + c2 + c3 + 2,     y + 5);
  y += rowH;

  // Data row
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.rect(tX, y, tW, rowH, "S");
  doc.line(tX + c1, y, tX + c1, y + rowH);
  doc.line(tX + c1 + c2, y, tX + c1 + c2, y + rowH);
  doc.line(tX + c1 + c2 + c3, y, tX + c1 + c2 + c3, y + rowH);
  doc.text(values.productDescription || "[Product Description]",  tX + 2,                y + 5);
  doc.text(values.productQuantity    || "[Quantity]",             tX + c1 + 2,           y + 5);
  doc.text(values.unitPrice          || "$[Unit Price]",          tX + c1 + c2 + 2,      y + 5);
  doc.text(values.totalContractValue || "$[Total]",               tX + c1 + c2 + c3 + 2, y + 5);
  y += rowH + 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text(`Total Contract Value: USD ${values.totalContractValue || "$[Total Amount]"}.`, M_LEFT, y);
  y = gap(y + LH, 3);

  doc.setFont("helvetica", "normal");
  y = body(doc,
    "2.1  The Goods shall conform to the specifications, drawings, and quality standards mutually agreed upon by the Parties.",
    y);
  y = gap(y, 3);
  y = body(doc,
    "2.2  The Manufacturer's quotation dated as of the Effective Date shall be deemed incorporated into and form an integral part of this Contract.",
    y);
  y = gap(y, 6);

  // ── 3. PRODUCT STANDARDS AND QUALITY CONTROL ─────────────────────────────
  y = heading(doc, "3. PRODUCT STANDARDS AND QUALITY CONTROL", y);
  y = body(doc, "3.1  The Manufacturer warrants that all Goods supplied shall:", y);
  y = bullet(doc, "(a)  Conform strictly to the specifications and samples approved by the Buyer;", y);
  y = bullet(doc, "(b)  Be of merchantable quality, free from defects in material and workmanship; and", y);
  y = bullet(doc, "(c)  Comply with all applicable federal, state, and local laws, rules, and industry standards.", y);
  y = gap(y, 3);
  y = body(doc,
    "3.2  The Manufacturer shall implement and maintain quality control procedures sufficient to ensure conformity of the Goods with the agreed standards.",
    y);
  y = gap(y, 3);
  y = body(doc,
    "3.3  The Buyer, or its designated representative, shall have the right to inspect and audit the Manufacturer's facilities and production processes upon reasonable notice, to verify compliance with this Contract.",
    y);
  y = gap(y, 6);

  // ── 4. TITLE, DELIVERY, AND RISK OF LOSS ─────────────────────────────────
  y = heading(doc, "4. TITLE, DELIVERY, AND RISK OF LOSS", y);

  y = subheading(doc, "4.1  Delivery", y);
  y = body(doc,
    `Time is of the essence. The Manufacturer shall deliver the Goods to the Buyer on or before ${values.deliveryDate || "[Delivery Date]"}, at ${values.deliveryAddress || "[Delivery Address]"}, unless extended by mutual written consent.`,
    y, 4);
  y = gap(y, 3);

  y = subheading(doc, "4.2  Shipping and Packaging", y);
  y = body(doc,
    "The Manufacturer shall be responsible for all packaging, labeling, and loading in a manner suitable for transport, ensuring safe delivery.",
    y, 4);
  y = gap(y, 3);

  y = subheading(doc, "4.3  Risk of Loss", y);
  y = body(doc,
    "Title and risk of loss shall transfer to the Buyer only upon delivery of the Goods to the Buyer's designated address, or such other location as may be agreed in writing.",
    y, 4);
  y = gap(y, 3);

  y = subheading(doc, "4.4  Shipping Costs", y);
  y = body(doc,
    `The Buyer shall bear reasonable shipping costs in accordance with its chosen method and carrier, unless otherwise stated in Schedule "B."`,
    y, 4);
  y = gap(y, 6);

  // ── 5. PAYMENT TERMS ──────────────────────────────────────────────────────
  y = heading(doc, "5. PAYMENT TERMS", y);
  y = body(doc,
    `5.1  The Buyer shall make payment to ${manufacturer} in the total amount of USD ${values.totalContractValue || "$[Amount]"}, in accordance with the following schedule:`,
    y);
  y = bullet(doc, `Deposit: USD ${values.depositAmount || "$[Amount]"}, payable upon execution of this Contract;`, y);
  y = bullet(doc, `Balance: USD ${values.balanceAmount || "$[Amount]"}, payable upon delivery and acceptance of all Goods.`, y);
  y = gap(y, 3);
  y = body(doc,
    `5.2  Early Payment Discount: A discount of ${values.earlyPaymentPercent || "[Percentage]"}% shall apply if full payment is made within ${values.earlyPaymentDays || "[Number]"} days of invoicing.`,
    y);
  y = gap(y, 3);
  y = body(doc,
    `5.3  Late Payment: Overdue balances shall accrue interest at the rate of ${values.lateInterestRate || "[Percentage]"}% per annum or the maximum permitted by applicable law, whichever is less.`,
    y);
  y = gap(y, 3);
  y = body(doc,
    "5.4  The Buyer shall bear all collection costs and reasonable attorneys' fees incurred in connection with the recovery of overdue payments.",
    y);
  y = gap(y, 3);
  y = body(doc,
    "5.5  Non-payment within the agreed period shall constitute a material breach, entitling the Manufacturer to suspend further deliveries or terminate this Contract pursuant to Clause 10 herein.",
    y);
  y = gap(y, 6);

  // ── 6. INSPECTION AND ACCEPTANCE ─────────────────────────────────────────
  y = heading(doc, "6. INSPECTION AND ACCEPTANCE", y);
  y = body(doc,
    `6.1  Upon delivery, the Buyer shall have a reasonable period (not exceeding ${values.inspectionDays || "[Number]"} days) to inspect the Goods and to notify the Manufacturer in writing of any non-conformity, defect, or deviation from specifications.`,
    y);
  y = gap(y, 3);
  y = body(doc,
    `6.2  If such notice is given, the Manufacturer shall, at its own cost and within ${values.remedyDays || "[Number]"} days, repair, replace, or otherwise remedy the defective Goods to the Buyer's satisfaction.`,
    y);
  y = gap(y, 3);
  y = body(doc,
    "6.3  Failure by the Buyer to provide such notice within the inspection period shall constitute deemed acceptance of the Goods.",
    y);
  y = gap(y, 6);

  // ── 7. WARRANTIES ─────────────────────────────────────────────────────────
  y = heading(doc, "7. WARRANTIES", y);
  y = body(doc, "7.1  The Manufacturer expressly warrants that all Goods supplied under this Contract shall be:", y);
  y = bullet(doc, "(a)  New and free from defects in design, materials, or workmanship;", y);
  y = bullet(doc, "(b)  Manufactured in strict conformity with Buyer's specifications; and", y);
  y = bullet(doc, "(c)  Fit for their intended purpose.", y);
  y = gap(y, 3);
  y = body(doc,
    `7.2  This warranty shall remain in effect for a period of ${values.warrantyMonths || "[Number]"} months from the date of delivery.`,
    y);
  y = gap(y, 3);
  y = body(doc,
    "7.3  The Manufacturer shall, at its expense, promptly repair or replace any defective Goods during the warranty period.",
    y);
  y = gap(y, 6);

  // ── 8. INDEMNIFICATION AND INSURANCE ─────────────────────────────────────
  y = heading(doc, "8. INDEMNIFICATION AND INSURANCE", y);
  y = body(doc,
    "8.1  The Manufacturer shall indemnify, defend, and hold harmless the Buyer, its officers, employees, and agents from and against all claims, damages, losses, liabilities, or expenses (including reasonable attorney fees) arising from:",
    y);
  y = bullet(doc, "(a)  Any defect in the Goods;", y);
  y = bullet(doc, "(b)  Negligence or misconduct by the Manufacturer or its agents; or", y);
  y = bullet(doc, "(c)  Violation of any applicable law or regulation.", y);
  y = gap(y, 3);
  y = body(doc,
    `8.2  The Manufacturer represents and warrants that it holds a valid comprehensive general liability insurance policy in an amount not less than USD ${values.insuranceAmount || "$[Amount]"}, issued by ${values.insurerName || "[Insurer's Name]"}, covering liability for product defects and related risks.`,
    y);
  y = gap(y, 3);
  y = body(doc,
    "8.3  The Manufacturer shall provide proof of such coverage upon request, and shall not cancel or modify such policy without thirty (30) days' prior written notice to the Buyer.",
    y);
  y = gap(y, 6);

  // ── 9. CONFIDENTIALITY ────────────────────────────────────────────────────
  y = heading(doc, "9. CONFIDENTIALITY", y);
  y = body(doc,
    "9.1  Both Parties acknowledge that they may obtain confidential or proprietary information of the other Party during the performance of this Contract.",
    y);
  y = gap(y, 3);
  y = body(doc,
    "9.2  Each Party agrees to treat such information as strictly confidential and not to disclose or use it for any purpose other than the performance of this Contract.",
    y);
  y = gap(y, 3);
  y = body(doc,
    "9.3  This obligation shall survive the termination or expiration of this Contract.",
    y);
  y = gap(y, 6);

  // ── 10. DEFAULT AND TERMINATION ───────────────────────────────────────────
  y = heading(doc, "10. DEFAULT AND TERMINATION", y);
  y = body(doc, "10.1  Each of the following shall constitute a material default under this Contract:", y);
  y = bullet(doc, "(a)  Failure to make payment when due;", y);
  y = bullet(doc, "(b)  Insolvency or bankruptcy of either Party;", y);
  y = bullet(doc, "(c)  Seizure, levy, or assignment for the benefit of creditors; or", y);
  y = bullet(doc, "(d)  Failure to deliver or accept the Goods as required.", y);
  y = gap(y, 3);
  y = body(doc,
    `10.2  Upon the occurrence of a default, the non-defaulting Party shall give written notice specifying the nature of the default. The defaulting Party shall have ${values.defaultCureDays || "[Number]"} days from receipt of such notice to cure the default.`,
    y);
  y = gap(y, 3);
  y = body(doc,
    "10.3  Failure to cure within the specified period shall entitle the non-defaulting Party to terminate this Contract and seek all available legal or equitable remedies.",
    y);
  y = gap(y, 6);

  // ── 11. FORCE MAJEURE ─────────────────────────────────────────────────────
  y = heading(doc, "11. FORCE MAJEURE", y);
  y = body(doc,
    "11.1  Neither Party shall be liable for delay or failure to perform obligations under this Contract due to Force Majeure events beyond its reasonable control, including but not limited to acts of God, war, riot, epidemic, pandemic, strike, or government restriction.",
    y);
  y = gap(y, 3);
  y = body(doc,
    "11.2  The affected Party shall provide prompt written notice of such event and resume performance as soon as practicable once the event has ceased.",
    y);
  y = gap(y, 6);

  // ── 12. INTELLECTUAL PROPERTY AND WORK PRODUCT ───────────────────────────
  y = heading(doc, "12. INTELLECTUAL PROPERTY AND WORK PRODUCT", y);
  y = body(doc,
    "12.1  Any and all designs, prototypes, specifications, inventions, or intellectual property developed by the Manufacturer in connection with the Products shall be the exclusive property of the Buyer.",
    y);
  y = gap(y, 3);
  y = body(doc,
    "12.2  The Manufacturer shall execute all documents and take all steps necessary to perfect the Buyer's ownership rights.",
    y);
  y = gap(y, 6);

  // ── 13. DISPUTE RESOLUTION ────────────────────────────────────────────────
  y = heading(doc, "13. DISPUTE RESOLUTION", y);
  y = body(doc,
    "13.1  The Parties shall first attempt to resolve any dispute arising from or relating to this Contract through good-faith negotiations.",
    y);
  y = gap(y, 3);
  y = body(doc,
    "13.2  If unresolved within thirty (30) days, the dispute shall be submitted to binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules.",
    y);
  y = gap(y, 3);
  y = body(doc,
    `13.3  The arbitration shall be conducted by a single neutral arbitrator in ${values.arbitrationCity || "[City, State]"}, in the English language.`,
    y);
  y = gap(y, 3);
  y = body(doc,
    "13.4  The arbitrator's award shall be final and binding and may be enforced in any court of competent jurisdiction.",
    y);
  y = gap(y, 3);
  y = body(doc,
    "13.5  Each Party shall bear its own costs and legal fees unless the arbitrator determines otherwise.",
    y);
  y = gap(y, 6);

  // ── 14. MISCELLANEOUS ─────────────────────────────────────────────────────
  y = heading(doc, "14. MISCELLANEOUS", y);

  const miscItems: { label: string; text: string }[] = [
    {
      label: "14.1  Notices:",
      text: "All notices shall be in writing and delivered personally or by certified mail to the addresses stated above.",
    },
    {
      label: "14.2  Assignment:",
      text: "Neither Party may assign or transfer this Contract without the prior written consent of the other Party, which consent shall not be unreasonably withheld.",
    },
    {
      label: "14.3  Waiver:",
      text: "Failure to enforce any provision shall not be construed as a waiver of future enforcement.",
    },
    {
      label: "14.4  Severability:",
      text: "If any provision of this Contract is held invalid, the remaining provisions shall remain in full force and effect.",
    },
    {
      label: "14.5  Attorneys' Fees:",
      text: "The prevailing Party in any legal or arbitral proceeding arising hereunder shall be entitled to recover reasonable attorneys' fees and costs.",
    },
    {
      label: "14.6  Headings:",
      text: "Headings are for convenience only and shall not affect interpretation.",
    },
    {
      label: "14.7  Governing Law:",
      text: `This Contract shall be governed by and construed in accordance with the laws of the State of ${state}, without regard to its conflict of laws principles.`,
    },
    {
      label: "14.8  Entire Agreement:",
      text: "This Contract constitutes the entire agreement between the Parties with respect to its subject matter and supersedes all prior oral or written agreements.",
    },
    {
      label: "14.9  Amendment:",
      text: "This Contract may be amended or modified only by a written instrument executed by both Parties.",
    },
  ];

  for (const item of miscItems) {
    y = checkPage(doc, y, 14);
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.text(item.label, M_LEFT, y);
    y += LH;
    y = body(doc, item.text, y, 4);
    y = gap(y, 2);
  }

  // ── ADDITIONAL TERMS ──────────────────────────────────────────────────────
  if (values.additionalTerms?.trim()) {
    y = gap(y, 4);
    y = heading(doc, "15. ADDITIONAL TERMS AND SPECIAL CONDITIONS", y);
    y = body(doc, values.additionalTerms.trim(), y);
    y = gap(y, 4);
  }

  // ── EXECUTION CLAUSE ─────────────────────────────────────────────────────
  y = checkPage(doc, y, 75);
  y = gap(y, 6);

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "bold");
  doc.text("IN WITNESS WHEREOF,", M_LEFT, y);
  const iwwW = doc.getTextWidth("IN WITNESS WHEREOF,");
  doc.setFont("helvetica", "normal");
  const closingText = " the Parties hereto have executed this Contract as of the Effective Date first written above.";
  const closingLines = doc.splitTextToSize(closingText, CONTENT_W - iwwW);
  doc.text(closingLines[0], M_LEFT + iwwW, y);
  y += LH;
  for (let i = 1; i < closingLines.length; i++) {
    y = checkPage(doc, y);
    doc.text(closingLines[i], M_LEFT, y);
    y += LH;
  }
  y = gap(y, 8);

  // ── SIGNATURE BLOCKS ──────────────────────────────────────────────────────
  const col1 = M_LEFT;
  const col2 = PAGE_W / 2 + 5;
  const lineW = 60;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("BUYER", col1, y);
  doc.text("MANUFACTURER", col2, y);
  y = gap(y + LH, 4);

  // Signature row
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.text("Signature:", col1, y);
  doc.text("Signature:", col2, y);
  y += LH;
  // Underline + typed signature value
  doc.setLineWidth(0.35);
  doc.line(col1, y + 1, col1 + lineW, y + 1);
  doc.line(col2, y + 1, col2 + lineW, y + 1);
  if (values.party2Signature) {
    doc.setFont("helvetica", "italic");
    doc.text(values.party2Signature, col1 + 1, y);
    doc.setFont("helvetica", "normal");
  }
  if (values.party1Signature) {
    doc.setFont("helvetica", "italic");
    doc.text(values.party1Signature, col2 + 1, y);
    doc.setFont("helvetica", "normal");
  }
  y = gap(y + LH, 5);

  // Name row
  doc.setFont("helvetica", "normal");
  doc.text("Name:", col1, y);
  doc.text("Name:", col2, y);
  y += LH;
  doc.setLineWidth(0.35);
  doc.line(col1, y + 1, col1 + lineW, y + 1);
  doc.line(col2, y + 1, col2 + lineW, y + 1);
  doc.setFont("helvetica", "italic");
  doc.text(buyer, col1 + 1, y);
  doc.text(manufacturer, col2 + 1, y);
  doc.setFont("helvetica", "normal");
  y = gap(y + LH, 5);

  // Title row
  doc.text("Title:", col1, y);
  doc.text("Title:", col2, y);
  y += LH;
  doc.setLineWidth(0.35);
  doc.line(col1, y + 1, col1 + lineW, y + 1);
  doc.line(col2, y + 1, col2 + lineW, y + 1);
  if (values.party2Title) {
    doc.setFont("helvetica", "italic");
    doc.text(values.party2Title, col1 + 1, y);
    doc.setFont("helvetica", "normal");
  }
  if (values.party1Title) {
    doc.setFont("helvetica", "italic");
    doc.text(values.party1Title, col2 + 1, y);
    doc.setFont("helvetica", "normal");
  }
  y = gap(y + LH, 5);

  // Date row
  doc.text("Date:", col1, y);
  doc.text("Date:", col2, y);
  y += LH;
  doc.setLineWidth(0.35);
  doc.line(col1, y + 1, col1 + lineW, y + 1);
  doc.line(col2, y + 1, col2 + lineW, y + 1);
  doc.setFont("helvetica", "italic");
  const dateVal = values.effectiveDate || new Date().toLocaleDateString();
  doc.text(dateVal, col1 + 1, y);
  doc.text(dateVal, col2 + 1, y);
  doc.setFont("helvetica", "normal");
  y = gap(y + LH, 10);

  // Separator
  doc.setLineWidth(0.4);
  doc.line(M_LEFT, y, PAGE_W - M_RIGHT, y);
  y = gap(y, 6);

  // Witness block (optional)
  if (values.witnessName) {
    y = checkPage(doc, y, 22);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("WITNESS", col1, y);
    y = gap(y + LH, 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text("Name:", col1, y);
    y += LH;
    doc.setLineWidth(0.35);
    doc.line(col1, y + 1, col1 + lineW, y + 1);
    doc.setFont("helvetica", "italic");
    doc.text(values.witnessName, col1 + 1, y);
    doc.setFont("helvetica", "normal");
    y = gap(y + LH, 5);

    doc.text("Signature:", col1, y);
    y += LH;
    doc.line(col1, y + 1, col1 + lineW, y + 1);
    y = gap(y + LH, 5);

    doc.text("Date:", col1, y);
    y += LH;
    doc.line(col1, y + 1, col1 + lineW, y + 1);
  }

  doc.save("production_contract.pdf");
};

export default function ProductionContract() {
  return (
    <FormWizard
      steps={steps}
      title="Production Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="productioncontract"
    />
  );
}
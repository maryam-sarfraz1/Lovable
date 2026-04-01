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
      {
        name: "orderNumber",
        label: "Order Number (optional)",
        type: "text",
        required: false,
        placeholder: "e.g. ORD-2024-001",
      },
    ],
  },
  {
    label: "Manufacturer",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of the Manufacturer",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1LawJurisdiction",
        label: "Laws under which Manufacturer is organized",
        type: "text",
        required: true,
        placeholder: "e.g. State of Delaware, USA",
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
    label: "Buyer",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of the Buyer",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2LawJurisdiction",
        label: "Laws under which Buyer is organized",
        type: "text",
        required: true,
        placeholder: "e.g. State of California, USA",
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
    label: "Goods & Specifications",
    fields: [
      {
        name: "goodsDescription",
        label: "Description of Goods to be manufactured",
        type: "textarea",
        required: true,
        placeholder: "Describe the goods in detail...",
      },
      {
        name: "goodsQuantity",
        label: "Quantity",
        type: "text",
        required: true,
        placeholder: "e.g. 1,000 units",
      },
      {
        name: "unitPrice",
        label: "Unit Price ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 25.00",
      },
      {
        name: "totalPrice",
        label: "Total Price ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 25,000.00",
      },
      {
        name: "aggregateValue",
        label: "Aggregate Contract Value ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 25,000.00",
      },
    ],
  },
  {
    label: "Buyer's Business",
    fields: [
      {
        name: "buyerBusiness",
        label: "Describe the Buyer's business",
        type: "textarea",
        required: true,
        placeholder: "e.g. wholesale distribution of consumer electronics...",
      },
      {
        name: "description",
        label: "Additional scope / agreement details",
        type: "textarea",
        required: false,
        placeholder: "Any additional context for the agreement...",
      },
    ],
  },
  {
    label: "Payment Terms",
    fields: [
      {
        name: "paymentRecipient",
        label: "Payment shall be made to (name/entity)",
        type: "text",
        required: true,
        placeholder: "e.g. Manufacturer's account / XYZ Corp",
      },
      {
        name: "depositPercent",
        label: "Deposit % upon execution (if applicable)",
        type: "text",
        required: false,
        placeholder: "e.g. 30",
      },
      {
        name: "balanceDueDays",
        label: "Balance due within (days of invoice)",
        type: "select",
        required: true,
        options: [
          { value: "7", label: "7 Days" },
          { value: "14", label: "14 Days" },
          { value: "30", label: "30 Days" },
          { value: "45", label: "45 Days" },
          { value: "60", label: "60 Days" },
        ],
      },
      {
        name: "discountPercent",
        label: "Early payment discount (%)",
        type: "text",
        required: false,
        placeholder: "e.g. 2",
      },
      {
        name: "discountDays",
        label: "Discount applies if paid within (days)",
        type: "text",
        required: false,
        placeholder: "e.g. 10",
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
    label: "Insurance",
    fields: [
      {
        name: "insuranceAmount",
        label: "Product liability insurance amount ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 1,000,000",
      },
    ],
  },
  {
    label: "Term & Termination",
    fields: [
      {
        name: "terminationNoticeDays",
        label: "Notice period to terminate (days)",
        type: "select",
        required: true,
        options: [
          { value: "7", label: "7 Days" },
          { value: "14", label: "14 Days" },
          { value: "30", label: "30 Days" },
          { value: "60", label: "60 Days" },
          { value: "90", label: "90 Days" },
        ],
      },
      {
        name: "curePeriodDays",
        label: "Cure period (days) for material breach",
        type: "select",
        required: true,
        options: [
          { value: "7", label: "7 Days" },
          { value: "14", label: "14 Days" },
          { value: "30", label: "30 Days" },
          { value: "60", label: "60 Days" },
        ],
      },
      {
        name: "duration",
        label: "Overall agreement duration",
        type: "select",
        required: true,
        options: [
          { value: "1month", label: "1 Month" },
          { value: "3months", label: "3 Months" },
          { value: "6months", label: "6 Months" },
          { value: "1year", label: "1 Year" },
          { value: "2years", label: "2 Years" },
          { value: "5years", label: "5 Years" },
          { value: "completion", label: "Until Completion of Obligations" },
          { value: "indefinite", label: "Indefinite/Ongoing" },
        ],
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
        name: "party1SignatureName",
        label: "Manufacturer — Signatory Name",
        type: "text",
        required: true,
        placeholder: "Full legal name",
      },
      {
        name: "party1SignatureTitle",
        label: "Manufacturer — Title",
        type: "text",
        required: false,
        placeholder: "e.g. Director / CEO",
      },
      {
        name: "party2SignatureName",
        label: "Buyer — Signatory Name",
        type: "text",
        required: true,
        placeholder: "Full legal name",
      },
      {
        name: "party2SignatureTitle",
        label: "Buyer — Title",
        type: "text",
        required: false,
        placeholder: "e.g. Director / VP Procurement",
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
    "completion": "Until Completion of All Obligations", "indefinite": "Indefinite/Ongoing",
  };

  const p1name         = values.party1Name || "Manufacturer";
  const p2name         = values.party2Name || "Buyer";
  const p1law          = values.party1LawJurisdiction || "___";
  const p2law          = values.party2LawJurisdiction || "___";
  const p1addr         = `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`;
  const p2addr         = `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`;
  const eDate          = values.effectiveDate || "___";
  const orderNo        = values.orderNumber || "___";
  const juris          = `${values.state || "___"}, ${(values.country || "").toUpperCase()}`;
  const dur            = durMap[values.duration] || values.duration || "Until Completion of All Obligations";
  const goodsDesc      = values.goodsDescription || "___";
  const goodsQty       = values.goodsQuantity || "___";
  const unitPrice      = values.unitPrice || "___";
  const totalPrice     = values.totalPrice || "___";
  const aggValue       = values.aggregateValue || "___";
  const buyerBiz       = values.buyerBusiness || "___";
  const payRecipient   = values.paymentRecipient || "the Manufacturer";
  const depositPct     = values.depositPercent || "___";
  const balDueDays     = values.balanceDueDays || "30";
  const discPct        = values.discountPercent || "___";
  const discDays       = values.discountDays || "___";
  const lateRate       = values.lateInterestRate || "___";
  const insuranceAmt   = values.insuranceAmount || "___";
  const termNoticeDays = values.terminationNoticeDays || "30";
  const cureDays       = values.curePeriodDays || "30";
  const sig1Name       = values.party1SignatureName || p1name;
  const sig1Title      = values.party1SignatureTitle || "";
  const sig2Name       = values.party2SignatureName || p2name;
  const sig2Title      = values.party2SignatureTitle || "";

  // ── Title ──
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("MANUFACTURING AGREEMENT", 105, y, { align: "center" });
  y += 6;
  doc.setLineWidth(0.5);
  doc.line(L, y, R, y);
  y += 5;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Order Number: ${orderNo}`, L, y);
  y += 6;

  // ── Intro ──
  const intro = `This Manufacturing Agreement (the "Agreement") is made and entered into as of ${eDate} (the "Effective Date"), BY AND BETWEEN: ${p1name}, a company duly organized and existing under the laws of ${p1law}, having its registered office at ${p1addr} (hereinafter referred to as the "Manufacturer", which expression shall, unless repugnant to the context, include its successors and permitted assigns); AND ${p2name}, a company duly organized and existing under the laws of ${p2law}, having its registered office at ${p2addr} (hereinafter referred to as the "Buyer", which expression shall, unless repugnant to the context, include its successors and permitted assigns). The Manufacturer and the Buyer are hereinafter collectively referred to as the "Parties" and individually as a "Party."`;
  y = writeWrapped(doc, intro, L, y, W, lh, L);
  y += 3;

  // ── 1. PURPOSE AND SCOPE ──
  y = sectionTitle(doc, "1. PURPOSE AND SCOPE", L, y, L);
  y = body(doc, `1.1 The Buyer is engaged in the business of ${buyerBiz}, and desires to have certain goods manufactured in accordance with its proprietary requirements.`, L, y, W, lh, L);
  y = body(doc, "1.2 The Manufacturer possesses the requisite expertise, facilities, personnel, and resources necessary to manufacture such goods and has agreed to undertake the manufacture and supply of the Goods (as defined below) in accordance with the terms and conditions of this Agreement.", L, y, W, lh, L);
  y = body(doc, "1.3 This Agreement sets forth the complete terms governing the manufacture, sale, delivery, and purchase of the Goods, including all commercial, technical, and legal obligations of the Parties.", L, y, W, lh, L);
  y += 2;

  // ── 2. DEFINITIONS ──
  y = sectionTitle(doc, "2. DEFINITIONS", L, y, L);
  y = body(doc, "For the purposes of this Agreement:", L, y, W, lh, L);
  y = bullet(doc, '"Goods" means the products to be manufactured and supplied by the Manufacturer as described in Clause 3.', L, y, W, lh, L);
  y = bullet(doc, '"Specifications" means all technical descriptions, drawings, samples, standards, and requirements provided or approved by the Buyer.', L, y, W, lh, L);
  y = bullet(doc, '"Work Product" means all intellectual property, inventions, improvements, designs, and developments arising out of or in connection with this Agreement.', L, y, W, lh, L);
  y += 2;

  // ── 3. GOODS AND SPECIFICATIONS ──
  y = sectionTitle(doc, "3. GOODS AND SPECIFICATIONS", L, y, L);
  y = body(doc, "3.1 The Manufacturer shall manufacture and supply the following Goods:", L, y, W, lh, L);
  y = bullet(doc, `Description: ${goodsDesc}`, L, y, W, lh, L);
  y = bullet(doc, `Quantity: ${goodsQty}`, L, y, W, lh, L);
  y = bullet(doc, `Unit Price: $${unitPrice}`, L, y, W, lh, L);
  y = bullet(doc, `Total Price: $${totalPrice}`, L, y, W, lh, L);
  y = body(doc, `Aggregate Contract Value: $${aggValue}`, L, y, W, lh, L);
  y = body(doc, "3.2 The Goods shall strictly conform to the Specifications provided or approved by the Buyer and shall meet all applicable industry standards, regulatory requirements, and quality benchmarks.", L, y, W, lh, L);
  y = body(doc, "3.3 The Manufacturer shall not make any modification to the design, composition, or manufacturing process of the Goods without the prior written consent of the Buyer.", L, y, W, lh, L);
  y = body(doc, "3.4 The Manufacturer shall maintain adequate quality control procedures and testing protocols to ensure consistent compliance with the Specifications.", L, y, W, lh, L);
  y += 2;

  // ── 4. PRODUCTION AND QUALITY CONTROL ──
  y = sectionTitle(doc, "4. PRODUCTION AND QUALITY CONTROL", L, y, L);
  y = body(doc, "4.1 The Manufacturer shall manufacture the Goods in a professional and workmanlike manner, using appropriate materials, skilled personnel, and industry-standard practices.", L, y, W, lh, L);
  y = body(doc, "4.2 The Buyer shall have the right, upon reasonable notice, to inspect the Manufacturer's facilities, processes, and quality control systems.", L, y, W, lh, L);
  y = body(doc, "4.3 The Manufacturer shall promptly notify the Buyer of any issues affecting production, quality, or delivery timelines.", L, y, W, lh, L);
  y = body(doc, "4.4 The Manufacturer shall maintain complete production and quality records and shall provide such records to the Buyer upon request.", L, y, W, lh, L);
  y += 2;

  // ── 5. PRICE AND PAYMENT TERMS ──
  y = sectionTitle(doc, "5. PRICE AND PAYMENT TERMS", L, y, L);
  y = body(doc, `5.1 The Buyer agrees to pay the Manufacturer the total contract price specified in Clause 3.`, L, y, W, lh, L);
  y = body(doc, `5.2 Payment shall be made to ${payRecipient} in accordance with the following terms:`, L, y, W, lh, L);
  y = bullet(doc, `${depositPct}% upon execution of this Agreement (if applicable);`, L, y, W, lh, L);
  y = bullet(doc, `Balance payable upon delivery or within ${balDueDays} days of invoice.`, L, y, W, lh, L);
  y = body(doc, `5.3 A discount of ${discPct}% shall apply to payments made within ${discDays} days from the invoice date.`, L, y, W, lh, L);
  y = body(doc, `5.4 Any overdue payments shall accrue interest at the rate of ${lateRate}% per annum or the maximum rate permitted by applicable law, whichever is lower.`, L, y, W, lh, L);
  y = body(doc, "5.5 The Buyer shall reimburse the Manufacturer for any agreed additional costs incurred with prior written approval.", L, y, W, lh, L);
  y = body(doc, "5.6 Failure to make timely payment shall constitute a material breach of this Agreement.", L, y, W, lh, L);
  y += 2;

  // ── 6. DELIVERY AND LOGISTICS ──
  y = sectionTitle(doc, "6. DELIVERY AND LOGISTICS", L, y, L);
  y = body(doc, "6.1 Time shall be of the essence with respect to all delivery obligations.", L, y, W, lh, L);
  y = body(doc, "6.2 The Manufacturer shall deliver the Goods in accordance with the delivery schedule set out herein or as otherwise agreed in writing.", L, y, W, lh, L);
  y = body(doc, "6.3 Delivery shall be made through a carrier designated by the Buyer, to the Buyer's specified address.", L, y, W, lh, L);
  y = body(doc, "6.4 The Manufacturer shall ensure proper packaging, labeling, and handling to prevent damage during transit.", L, y, W, lh, L);
  y += 2;

  // ── 7. TITLE AND RISK OF LOSS ──
  y = sectionTitle(doc, "7. TITLE AND RISK OF LOSS", L, y, L);
  y = body(doc, "7.1 Title to the Goods shall pass to the Buyer upon full payment of the purchase price.", L, y, W, lh, L);
  y = body(doc, "7.2 Risk of loss or damage shall remain with the Manufacturer until the Goods are delivered to and accepted by the Buyer.", L, y, W, lh, L);
  y += 2;

  // ── 8. TAXES AND DUTIES ──
  y = sectionTitle(doc, "8. TAXES AND DUTIES", L, y, L);
  y = body(doc, "The Buyer shall be responsible for all applicable taxes, duties, levies, and charges arising out of the sale or delivery of the Goods, excluding taxes based on the Manufacturer's income.", L, y, W, lh, L);
  y += 2;

  // ── 9. TERM AND TERMINATION ──
  y = sectionTitle(doc, "9. TERM AND TERMINATION", L, y, L);
  y = body(doc, `9.1 This Agreement shall commence on the Effective Date and shall continue ${dur}, unless terminated earlier in accordance with this Clause.`, L, y, W, lh, L);
  y = body(doc, `9.2 Either Party may terminate this Agreement, with or without cause, by providing ${termNoticeDays} days' prior written notice.`, L, y, W, lh, L);
  y = body(doc, `9.3 Either Party may terminate this Agreement immediately upon written notice in the event of a material breach by the other Party, provided such breach remains uncured for ${cureDays} days after notice.`, L, y, W, lh, L);
  y = body(doc, "9.4 Upon termination, the Buyer shall pay for all Goods completed or in progress up to the termination date.", L, y, W, lh, L);
  y += 2;

  // ── 10. WARRANTIES ──
  y = sectionTitle(doc, "10. WARRANTIES", L, y, L);
  y = body(doc, "10.1 The Manufacturer warrants that:", L, y, W, lh, L);
  y = bullet(doc, "The Goods shall conform strictly to the Specifications;", L, y, W, lh, L);
  y = bullet(doc, "The Goods shall be free from defects in material and workmanship;", L, y, W, lh, L);
  y = bullet(doc, "The Goods shall comply with all applicable laws and regulations.", L, y, W, lh, L);
  y = body(doc, "10.2 These warranties shall survive inspection, acceptance, and payment.", L, y, W, lh, L);
  y += 2;

  // ── 11. LIMITATION OF LIABILITY ──
  y = sectionTitle(doc, "11. LIMITATION OF LIABILITY", L, y, L);
  y = body(doc, "TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE MANUFACTURER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR SPECIAL DAMAGES, INCLUDING LOSS OF PROFITS OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.", L, y, W, lh, L);
  y += 2;

  // ── 12. INSPECTION AND REJECTION ──
  y = sectionTitle(doc, "12. INSPECTION AND REJECTION", L, y, L);
  y = body(doc, "12.1 The Buyer shall have a reasonable period to inspect the Goods upon delivery.", L, y, W, lh, L);
  y = body(doc, "12.2 If any Goods are defective or non-conforming, the Buyer may reject such Goods and require replacement, repair, or refund at the Manufacturer's expense.", L, y, W, lh, L);
  y += 2;

  // ── 13. INDEMNIFICATION AND INSURANCE ──
  y = sectionTitle(doc, "13. INDEMNIFICATION AND INSURANCE", L, y, L);
  y = body(doc, "13.1 The Manufacturer shall indemnify and hold harmless the Buyer from any claims, losses, damages, or liabilities arising from defective Goods or breach of this Agreement.", L, y, W, lh, L);
  y = body(doc, `13.2 The Manufacturer shall maintain adequate product liability insurance in the amount of $${insuranceAmt} and shall provide proof of such insurance upon request.`, L, y, W, lh, L);
  y += 2;

  // ── 14. INTELLECTUAL PROPERTY ──
  y = sectionTitle(doc, "14. INTELLECTUAL PROPERTY", L, y, L);
  y = body(doc, "14.1 All Work Product created under this Agreement shall be the sole and exclusive property of the Buyer.", L, y, W, lh, L);
  y = body(doc, "14.2 The Manufacturer shall assign all rights, title, and interest in such Work Product to the Buyer and shall execute all necessary documents to perfect such ownership.", L, y, W, lh, L);
  y += 2;

  // ── 15. CONFIDENTIALITY ──
  if (values.confidentiality === "yes") {
    y = sectionTitle(doc, "15. CONFIDENTIALITY", L, y, L);
    y = body(doc, "15.1 Each Party agrees to maintain the confidentiality of all proprietary or confidential information disclosed by the other Party.", L, y, W, lh, L);
    y = body(doc, "15.2 Such obligations shall survive termination of this Agreement.", L, y, W, lh, L);
    y += 2;
  }

  // ── 16. FORCE MAJEURE ──
  y = sectionTitle(doc, "16. FORCE MAJEURE", L, y, L);
  y = body(doc, "Neither Party shall be liable for any failure or delay caused by events beyond its reasonable control, including but not limited to acts of God, war, strikes, or governmental actions.", L, y, W, lh, L);
  y += 2;

  // ── 17. DISPUTE RESOLUTION ──
  y = sectionTitle(doc, "17. DISPUTE RESOLUTION", L, y, L);
  y = body(doc, "The Parties shall attempt to resolve disputes amicably. Failing such resolution, disputes shall be referred to mediation or arbitration in accordance with applicable law.", L, y, W, lh, L);
  y += 2;

  // ── 18. RELATIONSHIP OF THE PARTIES ──
  y = sectionTitle(doc, "18. RELATIONSHIP OF THE PARTIES", L, y, L);
  y = body(doc, "Nothing in this Agreement shall be deemed to create any partnership, joint venture, or employment relationship. The Manufacturer shall act solely as an independent contractor.", L, y, W, lh, L);
  y += 2;

  // ── 19. GENERAL PROVISIONS ──
  y = sectionTitle(doc, "19. GENERAL PROVISIONS", L, y, L);
  y = bullet(doc, "Entire Agreement: This Agreement constitutes the entire understanding between the Parties.", L, y, W, lh, L);
  y = bullet(doc, "Amendments: Any amendment must be in writing and signed by both Parties.", L, y, W, lh, L);
  y = bullet(doc, "Severability: Invalid provisions shall not affect the remainder of the Agreement.", L, y, W, lh, L);
  y = bullet(doc, "Waiver: Failure to enforce any provision shall not constitute a waiver.", L, y, W, lh, L);
  y = bullet(doc, "Notices: All notices shall be in writing and properly delivered.", L, y, W, lh, L);
  y += 2;

  // ── 20. GOVERNING LAW ──
  y = sectionTitle(doc, "20. GOVERNING LAW", L, y, L);
  y = body(doc, `This Agreement shall be governed by and construed in accordance with the laws of ${juris}.`, L, y, W, lh, L);

  if (values.additionalTerms) {
    y += 2;
    y = sectionTitle(doc, "ADDITIONAL TERMS", L, y, L);
    y = body(doc, values.additionalTerms, L, y, W, lh, L);
  }

  if (values.description) {
    y += 2;
    y = sectionTitle(doc, "ADDITIONAL SCOPE / NOTES", L, y, L);
    y = body(doc, values.description, L, y, W, lh, L);
  }

  // ── 21. EXECUTION / SIGNATURES ──
  y += 4;
  y = addPage(doc, y, L);
  doc.setLineWidth(0.4);
  doc.line(L, y, R, y);
  y += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("21. EXECUTION", L, y);
  y += 5;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", L, y);
  y += 7;

  // MANUFACTURER
  doc.setFont("helvetica", "bold");
  doc.text("MANUFACTURER", L, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: ______________________________", L, y); y += 5;
  doc.setFont("helvetica", "italic");
  doc.text(sig1Name, L + 22, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Name: " + sig1Name, L, y); y += 5;
  doc.text("Title: " + (sig1Title || "______________________________"), L, y); y += 5;
  doc.text("Date: ______________________________", L, y); y += 5;
  doc.text("Address: " + p1addr, L, y); y += 5;
  doc.text("Email: " + (values.party1Email || ""), L, y);
  if (values.party1Phone) { y += 5; doc.text("Phone: " + values.party1Phone, L, y); }
  y += 10;

  // BUYER
  doc.setFont("helvetica", "bold");
  doc.text("BUYER", L, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: ______________________________", L, y); y += 5;
  doc.setFont("helvetica", "italic");
  doc.text(sig2Name, L + 22, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Name: " + sig2Name, L, y); y += 5;
  doc.text("Title: " + (sig2Title || "______________________________"), L, y); y += 5;
  doc.text("Date: ______________________________", L, y); y += 5;
  doc.text("Address: " + p2addr, L, y); y += 5;
  doc.text("Email: " + (values.party2Email || ""), L, y);
  if (values.party2Phone) { y += 5; doc.text("Phone: " + values.party2Phone, L, y); }

  if (values.witnessName) {
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS:", L, y); y += 5;
    doc.setFont("helvetica", "normal");
    doc.text("Name: " + values.witnessName, L, y); y += 5;
    doc.text("Signature: ______________________________", L, y); y += 5;
    doc.text("Date: ______________________________", L, y);
  }

  doc.save("manufacturing_agreement.pdf");
};

export default function ManufacturingLicense() {
  return (
    <FormWizard
      steps={steps}
      title="Manufacturing Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="manufacturinglicense"
    />
  );
}
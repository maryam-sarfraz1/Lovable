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
    label: "Disclosing Party",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the Disclosing Party?",
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
    label: "Disclosing Party Address",
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
    label: "Disclosing Party Contact",
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
    label: "Recipient",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the Recipient?",
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
    label: "Recipient Address",
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
    label: "Recipient Contact",
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
    label: "Business Opportunity",
    fields: [
      {
        name: "description",
        label: "Describe the potential business opportunity this agreement covers",
        type: "textarea",
        required: true,
        placeholder: "Describe the business opportunity, e.g. joint venture in real estate acquisition...",
      },
    ],
  },
  {
    label: "Non-Solicitation Period",
    fields: [
      {
        name: "nonSolicitationPeriod",
        label: "Non-solicitation period after termination",
        type: "select",
        required: true,
        options: [
          { value: "6 months", label: "6 Months" },
          { value: "1 year", label: "1 Year" },
          { value: "2 years", label: "2 Years" },
          { value: "3 years", label: "3 Years" },
          { value: "5 years", label: "5 Years" },
        ],
      },
    ],
  },
  {
    label: "Terms & Conditions",
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
        label: "How much notice is required to terminate?",
        type: "select",
        required: true,
        options: [
          { value: "immediate", label: "Immediate" },
          { value: "7days", label: "7 Days" },
          { value: "14days", label: "14 Days" },
          { value: "30days", label: "30 Days" },
          { value: "60days", label: "60 Days" },
          { value: "90days", label: "90 Days" },
        ],
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "What is the payment amount (if applicable)?",
        type: "text",
        required: false,
        placeholder: "$0.00",
      },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: false,
        options: [
          { value: "onetime", label: "One-time Payment" },
          { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" },
          { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "annually", label: "Annually" },
          { value: "milestone", label: "Milestone-based" },
        ],
      },
    ],
  },
  {
    label: "Arbitration",
    fields: [
      {
        name: "arbitrationCity",
        label: "City/Location where arbitration shall take place",
        type: "text",
        required: true,
        placeholder: "e.g. New York, NY",
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
        label: "Disclosing Party Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Recipient Signature (Type full legal name)",
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
  if (y > 270) {
    doc.addPage();
    return margin;
  }
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

const sectionTitle = (doc: jsPDF, text: string, x: number, y: number): number => {
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(text, x, y);
  return y + 5;
};

const bodyText = (doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lh: number, margin: number): number => {
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  return writeWrapped(doc, text, x, y, maxWidth, lh, margin);
};

const bulletText = (doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lh: number, margin: number): number => {
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  return writeWrapped(doc, `\u2022  ${text}`, x + 4, y, maxWidth - 4, lh, margin);
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

  const p1name  = values.party1Name  || "Disclosing Party";
  const p2name  = values.party2Name  || "Recipient";
  const p1addr  = `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`;
  const p2addr  = `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`;
  const eDate   = values.effectiveDate || "___";
  const juris   = `${values.state || "___"}, ${(values.country || "").toUpperCase()}`;
  const dur     = durMap[values.duration] || values.duration || "___";
  const nonSol  = values.nonSolicitationPeriod || "___";
  const arbCity = values.arbitrationCity || "___";
  const opportunity = values.description || "___";
  const sig1    = values.party1Signature || p1name;
  const sig2    = values.party2Signature || p2name;

  // ── Title ──
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("NON-CIRCUMVENTION AGREEMENT", 105, y, { align: "center" });
  y += 7;
  doc.setLineWidth(0.5);
  doc.line(L, y, R, y);
  y += 6;

  // ── Intro ──
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const intro = `This Non-Circumvention Agreement ("Agreement") is made and entered into as of ${eDate} ("Effective Date"), by and between ${p1name} of ${p1addr} (the "Disclosing Party") and ${p2name} of ${p2addr} (the "Recipient"). The Disclosing Party and the Recipient may hereinafter be referred to individually as a "Party" and collectively as the "Parties."`;
  y = writeWrapped(doc, intro, L, y, W, lh, L);
  y += 3;

  // ── RECITALS ──
  y = sectionTitle(doc, "RECITALS", L, y);
  y = bodyText(doc, "WHEREAS, the Disclosing Party possesses certain business opportunities and related information which it desires to disclose to the Recipient, including any opportunities derived therefrom;", L, y, W, lh, L);
  y = bodyText(doc, "WHEREAS, each Party maintains valuable and established business relationships with clients, partners, and other contacts, which are essential to the operation and profitability of its business;", L, y, W, lh, L);
  y = bodyText(doc, "WHEREAS, the Parties acknowledge that mutual benefit may arise from introductions to third parties identified by either Party;", L, y, W, lh, L);
  y = bodyText(doc, "WHEREAS, the Parties agree that such introductions, identifications, and related information constitute proprietary trade secrets and are the exclusive property of the Disclosing Party;", L, y, W, lh, L);
  y = bodyText(doc, "WHEREAS, the Parties desire to protect the confidentiality, integrity, and value of such relationships and information; and", L, y, W, lh, L);
  y = bodyText(doc, `WHEREAS, the Parties intend to explore a potential business opportunity involving: ${opportunity};`, L, y, W, lh, L);
  y = bodyText(doc, "NOW, THEREFORE, in consideration of the mutual covenants, promises, and undertakings set forth herein, the Parties hereby agree as follows:", L, y, W, lh, L);
  y += 2;

  // ── 1. CONFIDENTIAL INFORMATION ──
  y = addPage(doc, y, L);
  y = sectionTitle(doc, "1. CONFIDENTIAL INFORMATION AND TRADE SECRETS", L, y);
  y = sectionTitle(doc, "1.1 Definition", L, y);
  y = bodyText(doc, "All information disclosed, exchanged, or otherwise obtained in connection with the contemplated business relationship shall be deemed \"Confidential Information\" and shall be treated as trade secrets.", L, y, W, lh, L);
  y = sectionTitle(doc, "1.2 Scope of Confidential Information", L, y);
  y = bodyText(doc, "Confidential Information includes, without limitation:", L, y, W, lh, L);
  y = bulletText(doc, "Financial data, projections, and information packages;", L, y, W, lh, L);
  y = bulletText(doc, "Business plans, documents, and records;", L, y, W, lh, L);
  y = bulletText(doc, "Identities of potential acquisitions, intermediaries, contacts, and sources of transactions;", L, y, W, lh, L);
  y = bulletText(doc, "Transaction structures, strategies, and financial arrangements.", L, y, W, lh, L);
  y = sectionTitle(doc, "1.3 Obligation of Confidentiality", L, y);
  y = bodyText(doc, "Each Party agrees to maintain the strict confidentiality of all Confidential Information and shall not disclose, publish, or otherwise make such information available to any third party without the prior written consent of the Disclosing Party.", L, y, W, lh, L);
  y += 2;

  // ── 2. PROTECTION OF CONTACTS ──
  y = addPage(doc, y, L);
  y = sectionTitle(doc, "2. PROTECTION OF CONTACTS AND RELATIONSHIPS", L, y);
  y = bodyText(doc, "2.1 The Parties agree to maintain in strict confidence:", L, y, W, lh, L);
  y = bulletText(doc, "The identities and personal details of any contacts introduced; and", L, y, W, lh, L);
  y = bulletText(doc, "All related business relationships.", L, y, W, lh, L);
  y = bodyText(doc, "2.2 The Recipient agrees that neither it nor its affiliates, including but not limited to its employees, agents, consultants, or assigns, shall directly or indirectly:", L, y, W, lh, L);
  y = bulletText(doc, "Contact, solicit, negotiate with, or enter into any transaction with such contacts;", L, y, W, lh, L);
  y = bulletText(doc, "Without the prior written consent of the Disclosing Party.", L, y, W, lh, L);
  y += 2;

  // ── 3. UNAUTHORIZED DISCLOSURE ──
  y = addPage(doc, y, L);
  y = sectionTitle(doc, "3. UNAUTHORIZED DISCLOSURE AND INJUNCTIVE RELIEF", L, y);
  y = bodyText(doc, "The Recipient acknowledges that any unauthorized disclosure or threatened disclosure of Confidential Information would cause irreparable harm to the Disclosing Party. Accordingly, the Disclosing Party shall be entitled to seek immediate injunctive or equitable relief, without the necessity of posting bond, in addition to any other remedies available at law or in equity.", L, y, W, lh, L);
  y += 2;

  // ── 4. APPLICABILITY ──
  y = addPage(doc, y, L);
  y = sectionTitle(doc, "4. APPLICABILITY", L, y);
  y = bodyText(doc, "This Agreement shall be binding upon and applicable to the Parties and their respective employees, officers, directors, representatives, agents, and affiliates.", L, y, W, lh, L);
  y += 2;

  // ── 5. RETURN OF CONFIDENTIAL INFORMATION ──
  y = addPage(doc, y, L);
  y = sectionTitle(doc, "5. RETURN OF CONFIDENTIAL INFORMATION", L, y);
  y = bodyText(doc, "Upon written request by the Disclosing Party:", L, y, W, lh, L);
  y = bulletText(doc, "The Recipient shall promptly return or destroy all Confidential Information; and", L, y, W, lh, L);
  y = bulletText(doc, "Provide written certification of such compliance within five (5) days of receipt of the request.", L, y, W, lh, L);
  y += 2;

  // ── 6. NON-CIRCUMVENTION ──
  y = addPage(doc, y, L);
  y = sectionTitle(doc, "6. NON-CIRCUMVENTION", L, y);
  y = sectionTitle(doc, "6.1 Restriction", L, y);
  y = bodyText(doc, "The Recipient agrees that, during the term of this Agreement, it shall not directly or indirectly contact, negotiate with, or engage in any business transaction with any party introduced by the Disclosing Party without prior written consent.", L, y, W, lh, L);
  y = sectionTitle(doc, "6.2 Remedy for Circumvention", L, y);
  y = bodyText(doc, "In the event of any circumvention resulting in loss of profit, fees, commissions, or other benefits to the Disclosing Party, the Recipient shall be liable to compensate the Disclosing Party for the full amount of such lost benefits.", L, y, W, lh, L);
  y += 2;

  // ── 7. NON-SOLICITATION ──
  y = addPage(doc, y, L);
  y = sectionTitle(doc, "7. NON-SOLICITATION", L, y);
  y = bodyText(doc, `During the term of this Agreement and for a period of ${nonSol} thereafter, neither Party shall:`, L, y, W, lh, L);
  y = bulletText(doc, "Solicit, hire, or engage any employee, consultant, or agent of the other Party; or", L, y, W, lh, L);
  y = bulletText(doc, "Induce any client, customer, supplier, or business contact to terminate or alter its relationship with the other Party.", L, y, W, lh, L);
  y = bodyText(doc, "Exceptions:", L, y, W, lh, L);
  y = bulletText(doc, "General solicitations not specifically directed at the other Party;", L, y, W, lh, L);
  y = bulletText(doc, "Ordinary business activities conducted in good faith and not intended to circumvent this Agreement.", L, y, W, lh, L);
  y += 2;

  // ── 8. TERM AND TERMINATION ──
  y = addPage(doc, y, L);
  y = sectionTitle(doc, "8. TERM AND TERMINATION", L, y);
  y = bulletText(doc, "The non-circumvention and confidentiality obligations shall survive indefinitely unless otherwise agreed in writing.", L, y, W, lh, L);
  y = bulletText(doc, "Either Party may terminate this Agreement upon written notice.", L, y, W, lh, L);
  y = bulletText(doc, "Termination shall not affect any rights or obligations with respect to Confidential Information disclosed prior to termination.", L, y, W, lh, L);
  y += 2;

  // ── 9. COMMISSIONS AND FEES ──
  y = addPage(doc, y, L);
  y = sectionTitle(doc, "9. COMMISSIONS AND FEES", L, y);
  y = bodyText(doc, "In the event of a breach of this Agreement, the Recipient shall be obligated to pay the Disclosing Party an amount equal to any commission, fee, or other compensation that the Disclosing Party would have earned had such breach not occurred.", L, y, W, lh, L);
  y += 2;

  // ── 10. MISCELLANEOUS ──
  y = addPage(doc, y, L);
  y = sectionTitle(doc, "10. MISCELLANEOUS", L, y);

  y = sectionTitle(doc, "10.1 Relationship of the Parties", L, y);
  y = bodyText(doc, "Nothing in this Agreement shall be construed to create a partnership, joint venture, or agency relationship between the Parties.", L, y, W, lh, L);

  y = sectionTitle(doc, "10.2 No Warranty", L, y);
  y = bodyText(doc, "All Confidential Information is provided \"AS IS.\" The Disclosing Party makes no representations or warranties, whether express or implied, including without limitation warranties of merchantability or fitness for a particular purpose. The Disclosing Party shall not be liable for any direct, indirect, incidental, or consequential damages.", L, y, W, lh, L);

  y = sectionTitle(doc, "10.3 Attorney's Fees", L, y);
  y = bodyText(doc, "In any legal proceeding arising out of or relating to this Agreement, the prevailing Party shall be entitled to recover its reasonable attorney's fees and legal costs.", L, y, W, lh, L);

  y = sectionTitle(doc, "10.4 Arbitration", L, y);
  y = bodyText(doc, `Any dispute, controversy, or claim arising out of or relating to this Agreement shall be resolved by binding arbitration in accordance with applicable arbitration rules. The arbitration shall take place in ${arbCity} and shall be governed by the laws of ${juris}.`, L, y, W, lh, L);

  y = sectionTitle(doc, "10.5 Assignment", L, y);
  y = bodyText(doc, "Neither Party may assign or transfer this Agreement, in whole or in part, without the prior written consent of the other Party.", L, y, W, lh, L);

  y = sectionTitle(doc, "10.6 Amendment", L, y);
  y = bodyText(doc, "This Agreement may only be amended or modified by a written instrument signed by both Parties.", L, y, W, lh, L);

  y = sectionTitle(doc, "10.7 Waiver", L, y);
  y = bodyText(doc, "The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of such provision or any other provision.", L, y, W, lh, L);

  y = sectionTitle(doc, "10.8 Entire Agreement", L, y);
  y = bodyText(doc, "This Agreement constitutes the entire understanding between the Parties and supersedes all prior negotiations, representations, or agreements, whether written or oral.", L, y, W, lh, L);

  y = sectionTitle(doc, "10.9 Force Majeure", L, y);
  y = bodyText(doc, "Neither Party shall be liable for any failure or delay in performance due to events beyond its reasonable control, including but not limited to acts of God, pandemics, war, riots, strikes, or governmental actions. Performance shall resume as soon as practicable after such event ceases.", L, y, W, lh, L);

  y = sectionTitle(doc, "10.10 Governing Law", L, y);
  y = bodyText(doc, `This Agreement shall be governed by and construed in accordance with the laws of ${juris}.`, L, y, W, lh, L);

  if (values.additionalTerms) {
    y += 2;
    y = addPage(doc, y, L);
    y = sectionTitle(doc, "ADDITIONAL TERMS", L, y);
    y = bodyText(doc, values.additionalTerms, L, y, W, lh, L);
  }

  // ── SIGNATURES ──
  y += 4;
  y = addPage(doc, y, L);
  doc.setLineWidth(0.4);
  doc.line(L, y, R, y);
  y += 5;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURES", L, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  // Left column – Disclosing Party
  doc.setFont("helvetica", "bold");
  doc.text("Disclosing Party:", L, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Name: " + p1name, L, y); y += 5;
  doc.text("Address: " + p1addr, L, y); y += 5;
  doc.text("Email: " + (values.party1Email || ""), L, y); y += 5;
  if (values.party1Phone) { doc.text("Phone: " + values.party1Phone, L, y); y += 5; }
  y += 4;
  doc.text("Signature: ______________________________", L, y); y += 5;
  doc.setFont("helvetica", "italic");
  doc.text(sig1, L + 22, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Date: ___________", L, y); y += 10;

  // Recipient
  doc.setFont("helvetica", "bold");
  doc.text("Recipient:", L, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Name: " + p2name, L, y); y += 5;
  doc.text("Address: " + p2addr, L, y); y += 5;
  doc.text("Email: " + (values.party2Email || ""), L, y); y += 5;
  if (values.party2Phone) { doc.text("Phone: " + values.party2Phone, L, y); y += 5; }
  y += 4;
  doc.text("Signature: ______________________________", L, y); y += 5;
  doc.setFont("helvetica", "italic");
  doc.text(sig2, L + 22, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Date: ___________", L, y); y += 10;

  if (values.witnessName) {
    doc.setFont("helvetica", "bold");
    doc.text("Witness:", L, y); y += 5;
    doc.setFont("helvetica", "normal");
    doc.text("Name: " + values.witnessName, L, y); y += 5;
    doc.text("Signature: ______________________________", L, y); y += 5;
    doc.text("Date: ___________", L, y);
  }

  doc.save("non_circumvention_agreement.pdf");
};

export default function NonCircumvention() {
  return (
    <FormWizard
      steps={steps}
      title="Non-Circumvention Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="noncircumvention"
    />
  );
}
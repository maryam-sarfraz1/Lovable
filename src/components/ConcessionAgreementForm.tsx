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
        getOptions: (value) => {
          if (value === "us") {
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
    label: "Owner Details",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of the Owner",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Owner an individual or a business?",
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
    label: "Owner Address",
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
    label: "Owner Contact",
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
    label: "Concessionaire Details",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of the Concessionaire",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Concessionaire an individual or a business?",
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
    label: "Concessionaire Address",
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
    label: "Concessionaire Contact",
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
    label: "Operational Details",
    fields: [
      {
        name: "operatingHoursStart",
        label: "Operating Hours Start (e.g. 9:00 AM)",
        type: "text",
        required: true,
        placeholder: "9:00 AM",
      },
      {
        name: "operatingHoursEnd",
        label: "Operating Hours End (e.g. 9:00 PM)",
        type: "text",
        required: true,
        placeholder: "9:00 PM",
      },
      {
        name: "installationDays",
        label: "Days allowed for equipment installation after signing",
        type: "text",
        required: true,
        placeholder: "e.g. 30",
      },
      {
        name: "removalDays",
        label: "Days allowed for equipment removal if required",
        type: "text",
        required: true,
        placeholder: "e.g. 14",
      },
    ],
  },
  {
    label: "Term & Termination",
    fields: [
      {
        name: "termYears",
        label: "Agreement term (years)",
        type: "text",
        required: true,
        placeholder: "e.g. 2",
      },
      {
        name: "terminationNotice",
        label: "Days of notice required to terminate",
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
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "revenuePercent",
        label: "Concessionaire's gross monthly revenue percentage paid to Owner (%)",
        type: "text",
        required: true,
        placeholder: "e.g. 15",
      },
      {
        name: "lateFee",
        label: "Late payment fee per occurrence ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 50.00",
      },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      {
        name: "disputeResolution",
        label: "How should disputes be resolved?",
        type: "select",
        required: true,
        options: [
          { value: "mediation", label: "Mediation prior to litigation" },
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
        label: "Owner Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Concessionaire Signature (Type full legal name)",
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

// ─── PDF helpers ─────────────────────────────────────────────────────────────

const SIG_LABEL_W = 52; // fixed label column width for signature blocks

/** Bold section heading. Returns updated y. */
const addHeading = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 22) { doc.addPage(); y = 20; }
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, 20, y);
  return y + 7;
};

/** Wrapped body paragraph. Returns updated y. */
const addBody = (
  doc: jsPDF,
  text: string,
  y: number,
  pageH: number,
  indent = 20,
  maxWidth = 170
): number => {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines: string[] = doc.splitTextToSize(text, maxWidth - (indent - 20));
  for (const line of lines) {
    if (y > pageH - 14) { doc.addPage(); y = 20; }
    doc.text(line, indent, y);
    y += 5.5;
  }
  return y + 2;
};

/** Bullet point. Returns updated y. */
const addBullet = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 14) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022", 24, y);
  const lines: string[] = doc.splitTextToSize(text, 156);
  for (let i = 0; i < lines.length; i++) {
    if (y > pageH - 14) { doc.addPage(); y = 20; }
    doc.text(lines[i], 30, y);
    if (i < lines.length - 1) y += 5.5;
  }
  return y + 6;
};

/**
 * Renders a properly aligned signature block.
 * Labels at x=20; values at x = 20 + SIG_LABEL_W.
 * Order: Role heading → Handwritten sig line → Printed Name →
 *        Typed Signature → Date (always last)
 */
const addSigBlock = (
  doc: jsPDF,
  role: string,
  name: string,
  typedSig: string,
  effectiveDate: string,
  y: number,
  pageH: number
): number => {
  const LINE_H = 7;
  const LABEL_X = 20;
  const VALUE_X = 20 + SIG_LABEL_W;

  if (y > pageH - 55) { doc.addPage(); y = 20; }

  // Role heading (bold)
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(role, LABEL_X, y);
  y += LINE_H;

  doc.setFont("helvetica", "normal");

  // Handwritten signature line
  doc.text("Signature (handwritten):", LABEL_X, y);
  doc.text("_______________________________", VALUE_X, y);
  y += LINE_H;

  // Printed name
  doc.text("Printed Name:", LABEL_X, y);
  doc.text(name || "", VALUE_X, y);
  y += LINE_H;

  // Typed signature — value appears in front of label, not behind a line
  doc.text("Typed Signature:", LABEL_X, y);
  doc.text(typedSig || "", VALUE_X, y);
  y += LINE_H;

  // Date — always last, shows effective date from form
  doc.text("Date:", LABEL_X, y);
  doc.text(effectiveDate || "_______________________________", VALUE_X, y);
  y += LINE_H + 6;

  return y;
};

// ─── PDF generator ────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const pageH = doc.internal.pageSize.height;
  let y = 20;

  // ── TITLE ──
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("CONCESSION AGREEMENT", 105, y, { align: "center" });
  y += 11;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const intro = `This Concession Agreement ("Agreement") is entered into as of ${values.effectiveDate || "[Effective Date]"} ("Effective Date"), by and between:`;
  y = addBody(doc, intro, y, pageH);
  y += 1;

  // Owner
  doc.setFont("helvetica", "bold");
  doc.text("Owner:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(` ${values.party1Name || "[Owner Name]"}`, 38, y);
  y += 6;
  doc.text(`Address: ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`, 20, y);
  y += 9;

  // Concessionaire
  doc.setFont("helvetica", "bold");
  doc.text("Concessionaire:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(` ${values.party2Name || "[Concessionaire Name]"}`, 58, y);
  y += 6;
  doc.text(`Address: ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`, 20, y);
  y += 9;

  y = addBody(doc, '(collectively referred to as the "Parties").', y, pageH);
  y += 3;

  // ── 1. EMPLOYEE TRAINING ──
  y = addHeading(doc, "1. EMPLOYEE TRAINING", y, pageH);
  y = addBody(doc, "The Concessionaire shall be solely responsible for ensuring that all employees, agents, and representatives engaged in performance under this Agreement are properly trained and qualified. Such training shall include, without limitation:", y, pageH);
  y = addBullet(doc, "Customer service standards;", y, pageH);
  y = addBullet(doc, "Food handling and presentation;", y, pageH);
  y = addBullet(doc, "Sanitation and cleanliness;", y, pageH);
  y = addBullet(doc, "Professionalism; and", y, pageH);
  y = addBullet(doc, "Compliance with all operational policies and procedures of the Owner.", y, pageH);
  y = addBody(doc, "All employees shall conduct themselves in a courteous, efficient, and professional manner consistent with the Owner's standards and expectations.", y, pageH);
  y += 2;

  // ── 2. STAFFING REQUIREMENTS ──
  y = addHeading(doc, "2. STAFFING REQUIREMENTS", y, pageH);
  y = addBody(doc, "The Concessionaire shall provide sufficient staffing at all times to ensure prompt, efficient, and uninterrupted service to the public.", y, pageH);
  y = addBody(doc, "The Concessionaire shall anticipate periods of increased demand, including holidays, special events, and peak operating hours, and shall adjust staffing levels accordingly.", y, pageH);
  y = addBody(doc, "If the Owner determines, in its sole discretion, that staffing levels are inadequate, the Owner may provide written or verbal notice, and the Concessionaire shall immediately take corrective action to increase staffing as reasonably required.", y, pageH);
  y += 2;

  // ── 3. HOURS OF OPERATION ──
  y = addHeading(doc, "3. HOURS OF OPERATION", y, pageH);
  y = addBody(doc, `The Concession Stands shall operate during the hours of ${values.operatingHoursStart || "[Start Time]"} to ${values.operatingHoursEnd || "[End Time]"} on each day the facility is open for business, unless otherwise directed by the Owner in writing.`, y, pageH);
  y = addBody(doc, "The Concessionaire shall conspicuously display the approved operating hours at each concession location and shall comply with any changes communicated by the Owner.", y, pageH);
  y += 2;

  // ── 4. PRICING ──
  y = addHeading(doc, "4. PRICING", y, pageH);
  y = addBody(doc, 'All prices for goods and services shall be consistent with Exhibit "B" and must receive prior written approval from the Owner.', y, pageH);
  y = addBody(doc, "The Concessionaire shall not change prices, offer discounts, or modify pricing structures without the Owner's prior written consent.", y, pageH);
  y += 2;

  // ── 5. PRODUCTS AND SERVICES ──
  y = addHeading(doc, "5. PRODUCTS AND SERVICES", y, pageH);
  y = addBody(doc, "Only products and services expressly approved in writing by the Owner may be offered for sale.", y, pageH);
  y = addBody(doc, "The Owner reserves the right to require the addition or removal of any product or service at any time, and the Concessionaire shall promptly comply with such directives.", y, pageH);
  y += 2;

  // ── 6. DELIVERY AND INSTALLATION ──
  y = addHeading(doc, "6. DELIVERY AND INSTALLATION", y, pageH);
  y = addBody(doc, `The Concessionaire shall, at its sole cost and expense, deliver, install, and place all concession facilities, fixtures, equipment, and machinery ("Concession Equipment") within ${values.installationDays || "[__]"} days of execution of this Agreement.`, y, pageH);
  y = addBody(doc, "All installations shall comply with all applicable laws, building codes, safety standards, and regulations.", y, pageH);
  y += 2;

  // ── 7. ALTERATIONS AND IMPROVEMENTS ──
  y = addHeading(doc, "7. ALTERATIONS AND IMPROVEMENTS", y, pageH);
  y = addBody(doc, "The Concessionaire shall not make any alterations, additions, or improvements to the Concession Stands or Equipment without the Owner's prior written approval.", y, pageH);
  y = addBody(doc, "All approved improvements shall be made at the Concessionaire's sole expense and shall become the property of the Owner upon termination of this Agreement, without compensation.", y, pageH);
  y = addBody(doc, "The Owner shall have no obligation to repair, alter, or improve the Concession Stands.", y, pageH);
  y += 2;

  // ── 8. TEMPORARY REMOVAL OF EQUIPMENT ──
  y = addHeading(doc, "8. TEMPORARY REMOVAL OF EQUIPMENT", y, pageH);
  y = addBody(doc, `If the Owner requires removal of any Concession Equipment, the Concessionaire shall remove such equipment at its sole expense and restore the premises to their original condition within ${values.removalDays || "[__]"} days.`, y, pageH);
  y += 2;

  // ── 9. MAINTENANCE AND CLEANLINESS ──
  y = addHeading(doc, "9. MAINTENANCE AND CLEANLINESS", y, pageH);
  y = addBody(doc, "The Concessionaire shall, at its sole expense, maintain the Concession Stands and Equipment in a clean, sanitary, and safe condition at all times, including daily cleaning and waste removal.", y, pageH);
  y += 2;

  // ── 10. DAMAGE TO PREMISES ──
  y = addHeading(doc, "10. DAMAGE TO PREMISES", y, pageH);
  y = addBody(doc, "Any damage to the Concession Stands or surrounding premises caused by the Concessionaire, its employees, or agents shall be repaired by the Concessionaire at its sole cost and expense.", y, pageH);
  y += 2;

  // ── 11. OWNER'S RIGHT TO REMEDY ──
  y = addHeading(doc, "11. OWNER'S RIGHT TO REMEDY", y, pageH);
  y = addBody(doc, "If the Concessionaire fails to perform required maintenance, repairs, or removal of equipment, the Owner may perform such work and recover all associated costs from the Concessionaire.", y, pageH);
  y = addBody(doc, "The Owner may also remove, store, or dispose of equipment at the Concessionaire's expense if compliance is not achieved.", y, pageH);
  y += 2;

  // ── 12. UTILITIES, TAXES, AND EXPENSES ──
  y = addHeading(doc, "12. UTILITIES, TAXES, AND EXPENSES", y, pageH);
  y = addBody(doc, "The Concessionaire shall be responsible for all operating expenses, including:", y, pageH);
  y = addBullet(doc, "Labor, supplies, maintenance, and insurance;", y, pageH);
  y = addBullet(doc, "Utilities, except where water or power is provided by the Owner.", y, pageH);
  y = addBody(doc, "The Concessionaire shall pay all taxes, fees, and assessments related to its operations, equipment, and inventory.", y, pageH);
  y += 2;

  // ── 13. TERM ──
  y = addHeading(doc, "13. TERM", y, pageH);
  y = addBody(doc, `This Agreement shall commence on the Effective Date and shall continue for a period of ${values.termYears || "[__]"} years, unless earlier terminated in accordance with this Agreement or extended by mutual written agreement.`, y, pageH);
  y += 2;

  // ── 14. TERMINATION ──
  y = addHeading(doc, "14. TERMINATION", y, pageH);
  y = addBody(doc, `Either Party may terminate this Agreement upon ${values.terminationNotice || "[__]"} days' written notice.`, y, pageH);
  y = addBody(doc, "Termination shall not relieve the Concessionaire of any obligations accrued prior to termination.", y, pageH);
  y += 2;

  // ── 15. COMPENSATION TO OWNER ──
  y = addHeading(doc, "15. COMPENSATION TO OWNER", y, pageH);
  y = addBody(doc, `The Concessionaire shall pay the Owner ${values.revenuePercent || "[__]"}% of gross monthly revenue.`, y, pageH);
  y = addBody(doc, '"Gross Monthly Revenue" includes all receipts from sales or services, whether cash, credit, electronic, or otherwise.', y, pageH);
  y += 2;

  // ── 16. PAYMENT DUE DATE ──
  y = addHeading(doc, "16. PAYMENT DUE DATE", y, pageH);
  y = addBody(doc, "Payments shall be made on or before the first day of each month for the preceding month's operations.", y, pageH);
  y += 2;

  // ── 17. ACCESS TO RECORDS ──
  y = addHeading(doc, "17. ACCESS TO RECORDS", y, pageH);
  y = addBody(doc, "The Concessionaire shall maintain accurate financial records and provide monthly statements. The Owner shall have the right to inspect and audit such records upon reasonable notice.", y, pageH);
  y += 2;

  // ── 18. CASH REGISTERS ──
  y = addHeading(doc, "18. CASH REGISTERS", y, pageH);
  y = addBody(doc, "All sales shall be recorded through approved cash registers capable of producing receipts and audit trails. Daily opening and closing balances shall be maintained.", y, pageH);
  y += 2;

  // ── 19. LATE FEES ──
  y = addHeading(doc, "19. LATE FEES", y, pageH);
  y = addBody(doc, `Late payments shall incur a late fee of $${values.lateFee || "[__]"} per occurrence.`, y, pageH);
  y += 2;

  // ── 20. TAXES ──
  y = addHeading(doc, "20. TAXES", y, pageH);
  y = addBody(doc, "The Concessionaire shall be solely responsible for all taxes arising from its operations, including sales, payroll, and income taxes.", y, pageH);
  y += 2;

  // ── 21. COMPLIANCE WITH LAWS ──
  y = addHeading(doc, "21. COMPLIANCE WITH LAWS", y, pageH);
  y = addBody(doc, "The Concessionaire shall comply with all applicable federal, state, and local laws, including health, safety, sanitation, and licensing requirements.", y, pageH);
  y += 2;

  // ── 22. WARRANTIES ──
  y = addHeading(doc, "22. WARRANTIES", y, pageH);
  y = addBody(doc, "The Concessionaire warrants that it is properly licensed, trained, and authorized to perform all services under this Agreement.", y, pageH);
  y += 2;

  // ── 23. INDEPENDENT CONTRACTOR ──
  y = addHeading(doc, "23. INDEPENDENT CONTRACTOR", y, pageH);
  y = addBody(doc, "The Concessionaire is an independent contractor. Nothing herein shall create an employer-employee or agency relationship.", y, pageH);
  y += 2;

  // ── 24. INDEMNIFICATION BY CONCESSIONAIRE ──
  y = addHeading(doc, "24. INDEMNIFICATION BY CONCESSIONAIRE", y, pageH);
  y = addBody(doc, "The Concessionaire shall indemnify and hold harmless the Owner from all claims, damages, losses, liabilities, and expenses arising from the Concessionaire's acts, omissions, or breach of this Agreement.", y, pageH);
  y += 2;

  // ── 25. INDEMNIFICATION BY OWNER ──
  y = addHeading(doc, "25. INDEMNIFICATION BY OWNER", y, pageH);
  y = addBody(doc, "The Owner shall indemnify the Concessionaire only to the extent of damages caused solely by the Owner's negligence.", y, pageH);
  y += 2;

  // ── 26. SURVIVAL ──
  y = addHeading(doc, "26. SURVIVAL", y, pageH);
  y = addBody(doc, "All provisions which by their nature should survive termination shall survive termination of this Agreement.", y, pageH);
  y += 2;

  // ── 27. CONFIDENTIALITY ──
  y = addHeading(doc, "27. CONFIDENTIALITY", y, pageH);
  y = addBody(doc, "All non-public information obtained by the Concessionaire shall remain confidential. Any breach shall constitute grounds for immediate termination.", y, pageH);
  y += 2;

  // ── 28. INSURANCE ──
  y = addHeading(doc, "28. INSURANCE", y, pageH);
  y = addBody(doc, "The Concessionaire shall maintain workers' compensation, general liability, and any other required insurance and shall name the Owner as an additional insured.", y, pageH);
  y += 2;

  // ── 29. NON-EXCLUSIVITY ──
  y = addHeading(doc, "29. NON-EXCLUSIVITY", y, pageH);
  y = addBody(doc, "This Agreement does not grant exclusivity. The Owner may grant similar rights to other concessionaires.", y, pageH);
  y += 2;

  // ── 30. SIGNAGE ──
  y = addHeading(doc, "30. SIGNAGE", y, pageH);
  y = addBody(doc, "The Concessionaire may display signage only with the prior written approval of the Owner.", y, pageH);
  y += 2;

  // ── 31. ENTIRE AGREEMENT ──
  y = addHeading(doc, "31. ENTIRE AGREEMENT", y, pageH);
  y = addBody(doc, "This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements or understandings.", y, pageH);
  y += 2;

  // ── 32. ASSIGNMENT ──
  y = addHeading(doc, "32. ASSIGNMENT", y, pageH);
  y = addBody(doc, "Neither Party may assign this Agreement without prior written consent of the other.", y, pageH);
  y += 2;

  // ── 33. SUCCESSORS AND ASSIGNS ──
  y = addHeading(doc, "33. SUCCESSORS AND ASSIGNS", y, pageH);
  y = addBody(doc, "This Agreement shall bind and benefit the Parties and their permitted successors and assigns.", y, pageH);
  y += 2;

  // ── 34. ATTORNEYS' FEES ──
  y = addHeading(doc, "34. ATTORNEYS' FEES", y, pageH);
  y = addBody(doc, "Each Party shall bear its own legal fees unless otherwise required by law.", y, pageH);
  y += 2;

  // ── 35. SEVERABILITY ──
  y = addHeading(doc, "35. SEVERABILITY", y, pageH);
  y = addBody(doc, "If any provision is held unenforceable, the remaining provisions shall remain in full force and effect.", y, pageH);
  y += 2;

  // ── 36. AMENDMENT ──
  y = addHeading(doc, "36. AMENDMENT", y, pageH);
  y = addBody(doc, "This Agreement may be amended only by a written document signed by both Parties.", y, pageH);
  y += 2;

  // ── 37. WAIVER ──
  y = addHeading(doc, "37. WAIVER", y, pageH);
  y = addBody(doc, "Failure to enforce any provision shall not constitute a waiver of future enforcement.", y, pageH);
  y += 2;

  // ── 38. GOVERNING LAW ──
  y = addHeading(doc, "38. GOVERNING LAW", y, pageH);
  y = addBody(doc, `This Agreement shall be governed by and construed in accordance with the laws of ${values.state ? values.state + ", " : ""}${values.country?.toUpperCase() || "[State/Country]"}.`, y, pageH);
  y += 2;

  // ── 39. AUTHORITY ──
  y = addHeading(doc, "39. AUTHORITY", y, pageH);
  y = addBody(doc, "Each signatory represents that they have full authority to bind their respective party to this Agreement.", y, pageH);
  y += 2;

  // ── 40. DISPUTE RESOLUTION ──
  y = addHeading(doc, "40. DISPUTE RESOLUTION", y, pageH);
  const drMap: Record<string, string> = {
    mediation: "The Parties shall attempt to resolve disputes through good-faith negotiation. If unresolved, disputes shall be submitted to mediation prior to litigation.",
    arbitration: "All disputes arising under this Agreement shall be resolved by binding arbitration in accordance with applicable arbitration rules.",
    litigation: "Any disputes arising under this Agreement shall be resolved through court litigation in a court of competent jurisdiction.",
    negotiation: "The Parties agree to first attempt resolution of any dispute through good-faith negotiation before pursuing any other remedy.",
  };
  y = addBody(doc, drMap[values.disputeResolution] || drMap["mediation"], y, pageH);
  y += 2;

  // ── 41. NOTICES ──
  y = addHeading(doc, "41. NOTICES", y, pageH);
  y = addBody(doc, "All notices shall be delivered personally or by certified mail to the addresses stated herein.", y, pageH);
  y += 2;

  // ── 42. TIME OF THE ESSENCE ──
  y = addHeading(doc, "42. TIME OF THE ESSENCE", y, pageH);
  y = addBody(doc, "Time is of the essence with respect to all obligations under this Agreement.", y, pageH);
  y += 2;

  // ── ADDITIONAL TERMS ──
  if (values.additionalTerms) {
    y = addHeading(doc, "ADDITIONAL TERMS", y, pageH);
    y = addBody(doc, values.additionalTerms, y, pageH);
    y += 2;
  }

  // ── 43. SIGNATURES ──
  if (y > pageH - 65) { doc.addPage(); y = 20; }
  y = addHeading(doc, "43. SIGNATURES", y, pageH);
  y = addBody(doc, "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.", y, pageH);
  y += 6;

  // Concessionaire signature block
  y = addSigBlock(
    doc, "CONCESSIONAIRE:",
    values.party2Name || "",
    values.party2Signature || "",
    values.effectiveDate || "",
    y, pageH
  );

  // Owner signature block
  y = addSigBlock(
    doc, "OWNER:",
    values.party1Name || "",
    values.party1Signature || "",
    values.effectiveDate || "",
    y, pageH
  );

  // Witness (optional)
  if (values.witnessName) {
    if (y > pageH - 40) { doc.addPage(); y = 20; }
    const VALUE_X = 20 + SIG_LABEL_W;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS:", 20, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text("Signature (handwritten):", 20, y);
    doc.text("_______________________________", VALUE_X, y);
    y += 7;
    doc.text("Printed Name:", 20, y);
    doc.text(values.witnessName, VALUE_X, y);
    y += 7;
    doc.text("Date:", 20, y);
    doc.text(values.effectiveDate || "_______________________________", VALUE_X, y);
  }

  doc.save("concession_agreement.pdf");
};

export default function ConcessionAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Concession Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="concessionagreement"
    />
  );
}
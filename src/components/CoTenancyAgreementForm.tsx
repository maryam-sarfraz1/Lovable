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
    label: "Co-Tenant 1",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of Co-Tenant 1",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Email",
        label: "Co-Tenant 1 Email",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party1Phone",
        label: "Co-Tenant 1 Phone",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Co-Tenant 2",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of Co-Tenant 2",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Email",
        label: "Co-Tenant 2 Email",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party2Phone",
        label: "Co-Tenant 2 Phone",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Dwelling & Lease",
    fields: [
      {
        name: "dwellingAddress",
        label: "Full address of the Dwelling",
        type: "text",
        required: true,
        placeholder: "123 Property Street, City, State ZIP",
      },
      {
        name: "landlordName",
        label: "Landlord name (individual or company)",
        type: "text",
        required: true,
        placeholder: "Landlord full name or company",
      },
      {
        name: "leaseDate",
        label: "Date of the Lease with Landlord",
        type: "date",
        required: true,
      },
      {
        name: "leaseStartDate",
        label: "Lease commencement date",
        type: "date",
        required: true,
      },
      {
        name: "leaseEndDate",
        label: "Lease expiry date",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Financial Details",
    fields: [
      {
        name: "securityDeposit",
        label: "Security / damage deposit amount paid to Landlord",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "monthlyRent",
        label: "Total monthly rent amount",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
    ],
  },
  {
    label: "Rent Allocation",
    fields: [
      {
        name: "tenant1RentShare",
        label: "Co-Tenant 1 monthly rent share",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "tenant2RentShare",
        label: "Co-Tenant 2 monthly rent share",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
    ],
  },
  {
    label: "Repairs Threshold",
    fields: [
      {
        name: "repairThreshold",
        label: "Max repair/improvement cost before written consent required",
        type: "text",
        required: true,
        placeholder: "$500.00",
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
        label: "Co-Tenant 1 Signature (type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Co-Tenant 2 Signature (type full legal name)",
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

// ── helpers ──────────────────────────────────────────────────────────────────

const LM = 20;
const PW = 170;
const LH = 5.5;
const PAGE_BOTTOM = 275;

function checkPageBreak(doc: jsPDF, y: number, needed = 20): number {
  if (y + needed > PAGE_BOTTOM) {
    doc.addPage();
    return 20;
  }
  return y;
}

function addHeading(doc: jsPDF, text: string, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(text, LM, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  return y + LH + 1;
}

function addBody(doc: jsPDF, text: string, y: number, indent = 0): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, PW - indent);
  lines.forEach((line: string) => {
    doc.text(line, LM + indent, y);
    y += LH;
  });
  return y;
}

function addBullet(doc: jsPDF, text: string, y: number): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, PW - 8);
  doc.text("\u2022", LM + 2, y);
  lines.forEach((line: string, i: number) => {
    doc.text(line, LM + 8, y);
    if (i < lines.length - 1) y += LH;
  });
  return y + LH;
}

/**
 * Bold label + normal value on the SAME baseline — no overwrite.
 */
function addLabelValue(doc: jsPDF, label: string, value: string, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  const lw = doc.getTextWidth(label);
  doc.text(label, LM, y);
  doc.setFont("helvetica", "normal");
  const valLines = doc.splitTextToSize(value, PW - lw - 1);
  valLines.forEach((line: string, i: number) => {
    doc.text(line, LM + lw + 1, y);
    if (i < valLines.length - 1) y += LH;
  });
  return y + LH;
}

// ── PDF generator ─────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  let y = 22;

  // ── TITLE ─────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("CO-TENANCY AGREEMENT", 105, y, { align: "center" });
  const titleW = doc.getTextWidth("CO-TENANCY AGREEMENT");
  doc.setLineWidth(0.4);
  doc.line(105 - titleW / 2, y + 1.2, 105 + titleW / 2, y + 1.2);
  y += 12;

  // ── PREAMBLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  y = addBody(
    doc,
    `This Co-Tenancy Agreement (the "Agreement") is made and entered into on ${values.effectiveDate || "[Insert Date]"} (the "Effective Date"), by and among the following individuals:`,
    y
  );
  y += 3;

  const coTenants = [values.party1Name, values.party2Name].filter(Boolean);
  const tenantLine = coTenants.length > 0
    ? coTenants.join(", ")
    : "[Insert Co-Tenant Names]";
  y = addBody(
    doc,
    `${tenantLine}, each individually referred to as a "Co-Tenant" and collectively referred to as the "Co-Tenants."`,
    y
  );
  y += 7;

  // ── RECITALS ──────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "RECITALS", y);

  const recitals = [
    `WHEREAS, the Co-Tenants have entered into a lease agreement dated ${values.leaseDate || "[Insert Date]"} (the "Lease") with ${values.landlordName || "[Insert Landlord Name]"} (the "Landlord") for the residential property located at ${values.dwellingAddress || "[Insert Dwelling Address]"} (the "Dwelling"), for a term commencing on ${values.leaseStartDate || "[Insert Start Date]"} and expiring on ${values.leaseEndDate || "[Insert End Date]"};`,
    `WHEREAS, a copy of the Lease is attached hereto and incorporated herein by reference;`,
    `WHEREAS, pursuant to the Lease, a security or damage deposit in the amount of ${values.securityDeposit || "$0.00"} was paid to the Landlord or the Landlord's agent, and monthly rent in the amount of ${values.monthlyRent || "$0.00"} is due and payable;`,
    `NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the Co-Tenants agree as follows:`,
  ];
  for (const r of recitals) {
    y = checkPageBreak(doc, y);
    y = addBody(doc, r, y);
    y += 3;
  }
  y += 4;

  // ── SECTION 1 ─────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "1.  COMPLIANCE WITH LEASE AND RULES", y);
  y = addBody(
    doc,
    `Each Co-Tenant agrees to comply fully with all terms, conditions, rules, and obligations set forth in the Lease, any related agreements executed with the Landlord, and all applicable local laws, ordinances, and regulations governing the Dwelling.`,
    y
  );
  y += 7;

  // ── SECTION 2 ─────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "2.  ALLOCATION OF RENT", y);
  y = addBody(doc, `The Co-Tenants agree to share responsibility for rent as follows:`, y);
  y += 2;
  y = addBullet(doc, `${values.party1Name || "Co-Tenant 1"} shall be responsible for ${values.tenant1RentShare || "$0.00"} per month;`, y);
  y += 1;
  y = addBullet(doc, `${values.party2Name || "Co-Tenant 2"} shall be responsible for ${values.tenant2RentShare || "$0.00"} per month.`, y);
  y += 3;

  const rentBullets = [
    `Each Co-Tenant shall timely pay his or her respective share of rent prior to the due date specified in the Lease.`,
    `Any late fees, penalties, or charges resulting from a Co-Tenant's failure to timely pay his or her share shall be borne solely by the defaulting Co-Tenant.`,
  ];
  for (const b of rentBullets) {
    y = checkPageBreak(doc, y);
    y = addBullet(doc, b, y);
    y += 2;
  }
  y += 5;

  // ── SECTION 3 ─────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "3.  UTILITIES AND SERVICES", y);
  y = addBody(
    doc,
    `The Co-Tenants shall be responsible for payment of the following utilities and services associated with the Dwelling:`,
    y
  );
  y += 2;

  const utilities = [
    "Electricity", "Water and sewer", "Gas", "Heating",
    "Garbage and trash disposal", "Janitorial services", "Telephone service",
  ];
  for (const u of utilities) {
    y = checkPageBreak(doc, y);
    y = addBullet(doc, u, y);
    y += 1;
  }
  y += 3;
  y = addBody(
    doc,
    `The Co-Tenants acknowledge that certain utilities or services may be billed directly by service providers or through the Landlord. Any agreement regarding utility allocation under this Agreement shall be subordinate to the Lease and shall not bind the Landlord.`,
    y
  );
  y += 7;

  // ── SECTION 4 ─────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "4.  OTHER SHARED EXPENSES", y);
  y = addBody(doc, `The Co-Tenants agree to allocate the following expenses as set forth below:`, y);
  y += 2;

  const expenses = [
    `Groceries: Each Co-Tenant shall be responsible for his or her own groceries.`,
    `General Damages: The cost of repairing damages not attributable to a specific Co-Tenant or guest shall be shared equally. A Co-Tenant shall be solely responsible for any damage caused by that Co-Tenant or his or her guests.`,
    `General Maintenance and Upkeep: Shared as mutually agreed by the Co-Tenants.`,
  ];
  for (const e of expenses) {
    y = checkPageBreak(doc, y);
    y = addBullet(doc, e, y);
    y += 2;
  }
  y += 5;

  // ── SECTION 5 ─────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "5.  TERMINATION OF CO-TENANCY", y);
  y = addBody(
    doc,
    `Each Co-Tenant agrees to remain in occupancy for the full Lease term and to continue paying his or her obligations under this Agreement unless one of the following occurs:`,
    y
  );
  y += 2;

  const termBullets = [
    `A departing Co-Tenant (the "Outgoing Co-Tenant") secures a replacement tenant acceptable to both the remaining Co-Tenants and the Landlord. The replacement tenant must execute this Agreement prior to occupancy; or`,
    `The remaining Co-Tenants provide written consent releasing the Outgoing Co-Tenant from this Agreement.`,
  ];
  for (const b of termBullets) {
    y = checkPageBreak(doc, y);
    y = addBullet(doc, b, y);
    y += 2;
  }
  y += 5;

  // ── SECTION 6 ─────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "6.  SECURITY DEPOSIT", y);
  y = addBody(
    doc,
    `Any refund of the security deposit received from the Landlord shall be divided among the Co-Tenants on a pro rata basis, unless otherwise agreed in writing.`,
    y
  );
  y += 7;

  // ── SECTION 7 ─────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "7.  JOINT AND SEVERAL LIABILITY; INDEMNIFICATION", y);

  const liabilityBullets = [
    `The Co-Tenants acknowledge that they are jointly and severally liable to the Landlord under the Lease. Accordingly, the Landlord may pursue any or all Co-Tenants for unpaid rent, damages, or other charges.`,
    `Each Co-Tenant agrees to indemnify and hold harmless the other Co-Tenants from any losses, penalties, or charges resulting from his or her own acts or omissions.`,
  ];
  for (const b of liabilityBullets) {
    y = checkPageBreak(doc, y);
    y = addBullet(doc, b, y);
    y += 2;
  }
  y += 5;

  // ── SECTION 8 ─────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "8.  LONG-DISTANCE TELEPHONE CHARGES", y);
  y = addBody(
    doc,
    `Each Co-Tenant shall be solely responsible for his or her own long-distance telephone charges.`,
    y
  );
  y += 7;

  // ── SECTION 9 ─────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "9.  REPAIRS AND IMPROVEMENTS", y);
  y = addBody(
    doc,
    `No repairs, alterations, or improvements exceeding ${values.repairThreshold || "$0.00"} shall be undertaken without the prior written consent of all Co-Tenants.`,
    y
  );
  y += 7;

  // ── SECTION 10 ────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "10.  PETS", y);

  const petBullets = [
    `All Co-Tenants shall comply with the pet policies established by the Landlord and applicable law.`,
    `Any Co-Tenant who owns or keeps a pet shall be solely responsible for all damages, fees, or charges arising from such pet.`,
  ];
  for (const b of petBullets) {
    y = checkPageBreak(doc, y);
    y = addBullet(doc, b, y);
    y += 2;
  }
  y += 5;

  // ── SECTION 11 ────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "11.  RELATIONSHIP TO LEASE", y);
  y = addBody(
    doc,
    `This Agreement does not modify or amend the Lease and is intended solely to govern the rights and obligations among the Co-Tenants.`,
    y
  );
  y += 7;

  // ── SECTION 12 ────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "12.  PAYMENTS AND REIMBURSEMENT", y);
  y = addBody(
    doc,
    `If a Co-Tenant pays more than his or her allocated share of any expense under this Agreement, such Co-Tenant shall be entitled to reimbursement from the other Co-Tenants.`,
    y
  );
  y += 7;

  // ── SECTION 13 ────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "13.  SURVIVAL AND AMENDMENT", y);

  const survivalBullets = [
    `This Agreement shall remain in effect notwithstanding a breach by any Co-Tenant unless terminated in accordance with this Agreement.`,
    `Any amendment or cancellation must be in writing and signed by all current Co-Tenants.`,
    `Nothing herein authorizes the removal of any Co-Tenant from the Dwelling without due process of law.`,
  ];
  for (const b of survivalBullets) {
    y = checkPageBreak(doc, y);
    y = addBullet(doc, b, y);
    y += 2;
  }
  y += 5;

  // ── SECTION 14 ────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "14.  GOVERNING LAW", y);
  y = addBody(
    doc,
    `This Agreement shall be governed by and construed in accordance with the laws of the State of ${values.state || "[Insert State]"}.`,
    y
  );
  y += 7;

  // ── SECTION 15 ────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  y = addHeading(doc, "15.  PRIOR AGREEMENTS", y);
  y = addBody(
    doc,
    `All prior co-tenancy agreements between the Co-Tenants are hereby superseded; however, any outstanding financial obligations under such agreements shall remain enforceable.`,
    y
  );
  y += 7;

  // ── ADDITIONAL TERMS ──────────────────────────────────────────────────────
  if (values.additionalTerms) {
    y = checkPageBreak(doc, y);
    y = addHeading(doc, "ADDITIONAL TERMS", y);
    y = addBody(doc, values.additionalTerms, y);
    y += 7;
  }

  // ── SIGNATURES ────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y, 75);
  y = addHeading(doc, "SIGNATURES", y);
  y = addBody(
    doc,
    `IN WITNESS WHEREOF, the Co-Tenants have executed this Agreement as of the Effective Date first written above.`,
    y
  );
  y += 8;

  const col1 = LM;
  const col2 = LM + 90;
  const sigLineLen = 75;

  const sigStartY = y;

  // ── Column headers ────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("CO-TENANT 1:", col1, sigStartY);
  doc.text("CO-TENANT 2:", col2, sigStartY);
  doc.setFont("helvetica", "normal");

  // ── Name row ──────────────────────────────────────────────────────────────
  const nameLabel = "Name: ";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  const nameLW = doc.getTextWidth(nameLabel);
  const nameY = sigStartY + 8;
  doc.text(nameLabel, col1, nameY);
  doc.text(nameLabel, col2, nameY);
  doc.setFont("helvetica", "normal");
  const p1Name = doc.splitTextToSize(values.party1Name || "", sigLineLen - nameLW)[0] || "";
  const p2Name = doc.splitTextToSize(values.party2Name || "", sigLineLen - nameLW)[0] || "";
  doc.text(p1Name, col1 + nameLW, nameY);
  doc.text(p2Name, col2 + nameLW, nameY);

  // ── Signature label row ───────────────────────────────────────────────────
  const sigLabelY = nameY + 9;
  doc.setFont("helvetica", "bold");
  doc.text("Signature:", col1, sigLabelY);
  doc.text("Signature:", col2, sigLabelY);
  doc.setFont("helvetica", "normal");

  // ── Signature line with typed name sitting ON the line ────────────────────
  const typedSigY = sigLabelY + 8;
  doc.setLineWidth(0.3);
  doc.line(col1, typedSigY, col1 + sigLineLen, typedSigY);
  doc.line(col2, typedSigY, col2 + sigLineLen, typedSigY);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  const p1Sig = doc.splitTextToSize(values.party1Signature || "", sigLineLen - 2)[0] || "";
  const p2Sig = doc.splitTextToSize(values.party2Signature || "", sigLineLen - 2)[0] || "";
  doc.text(p1Sig, col1 + 2, typedSigY);
  doc.text(p2Sig, col2 + 2, typedSigY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // ── Date row ──────────────────────────────────────────────────────────────
  const dateY = typedSigY + 10;
  const dateLabelW = doc.getTextWidth("Date: ");
  doc.setFont("helvetica", "bold");
  doc.text("Date: ", col1, dateY);
  doc.text("Date: ", col2, dateY);
  doc.setFont("helvetica", "normal");
  doc.line(col1 + dateLabelW, dateY, col1 + sigLineLen, dateY);
  doc.line(col2 + dateLabelW, dateY, col2 + sigLineLen, dateY);

  y = dateY + 12;

  // ── Optional Witness ──────────────────────────────────────────────────────
  if (values.witnessName) {
    y = checkPageBreak(doc, y, 35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("WITNESS:", col1, y);
    doc.setFont("helvetica", "normal");
    y += 8;
    const wNameLW = doc.getTextWidth("Name: ");
    doc.setFont("helvetica", "bold");
    doc.text("Name: ", col1, y);
    doc.setFont("helvetica", "normal");
    doc.text(values.witnessName, col1 + wNameLW, y);
    y += 9;
    doc.setFont("helvetica", "bold"); doc.text("Signature:", col1, y); doc.setFont("helvetica", "normal");
    y += 8;
    doc.setLineWidth(0.3);
    doc.line(col1, y, col1 + sigLineLen, y);
  }

  doc.save("co_tenancy_agreement.pdf");
};

export default function CoTenancyAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Co-Tenancy Agreement"
      subtitle="Complete each step to generate your Co-Tenancy Agreement"
      onGenerate={generatePDF}
      documentType="co-tenancy-agreement"
    />
  );
}
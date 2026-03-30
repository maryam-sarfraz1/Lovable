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
    label: "Effective Date",
    fields: [
      {
        name: "effectiveDate",
        label: "What is the effective date of this Agreement?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Roommate 1 Name",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of Roommate 1",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
    ],
  },
  {
    label: "Roommate 1 Address",
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
    label: "Roommate 1 Contact",
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
        type: "phone",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Roommate 2 Name",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of Roommate 2",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
    ],
  },
  {
    label: "Roommate 2 Address",
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
    label: "Roommate 2 Contact",
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
        type: "phone",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Premises & Landlord",
    fields: [
      {
        name: "premisesAddress",
        label: "Full address of the shared Premises",
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
        name: "rentalAgreementDate",
        label: "Date of the Rental Agreement with Landlord",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Term",
    fields: [
      {
        name: "startDate",
        label: "Occupancy Start Date",
        type: "date",
        required: true,
      },
      {
        name: "endDate",
        label: "Occupancy End Date",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Rent",
    fields: [
      {
        name: "totalRent",
        label: "Total monthly rent for the Premises",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "roommate1Rent",
        label: "Roommate 1 rent share",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "roommate2Rent",
        label: "Roommate 2 rent share",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "rentDueDay",
        label: "Day of the month rent is due",
        type: "text",
        required: true,
        placeholder: "e.g. 1st",
      },
    ],
  },
  {
    label: "Security Deposit",
    fields: [
      {
        name: "totalDeposit",
        label: "Total security deposit amount",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "roommate1Deposit",
        label: "Roommate 1 deposit contribution",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "roommate2Deposit",
        label: "Roommate 2 deposit contribution",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
    ],
  },
  {
    label: "Utilities",
    fields: [
      {
        name: "roommate1Utilities",
        label: "Utilities assigned to Roommate 1 (and amount)",
        type: "text",
        required: false,
        placeholder: "e.g. Electric — $60/mo",
      },
      {
        name: "roommate2Utilities",
        label: "Utilities assigned to Roommate 2 (and amount)",
        type: "text",
        required: false,
        placeholder: "e.g. Internet — $50/mo",
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
        placeholder: "Enter any additional terms...",
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      {
        name: "party1Signature",
        label: "Roommate 1 Signature (type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Roommate 2 Signature (type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ── helpers ──────────────────────────────────────────────────────────────────

function boldHeading(doc: jsPDF, text: string, x: number, y: number): void {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(text, x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
}

function wrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function bulletItem(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  doc.text("\u2022", x, y);
  const lines = doc.splitTextToSize(text, maxWidth - 6);
  doc.text(lines, x + 6, y);
  return y + lines.length * lineHeight;
}

function checkPageBreak(doc: jsPDF, y: number, needed = 20): number {
  if (y + needed > 275) {
    doc.addPage();
    return 20;
  }
  return y;
}

// ── PDF generator ─────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const LM = 20;
  const PW = 170;
  const LH = 5.5;
  let y = 22;

  // ── TITLE ─────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("ROOMMATE AGREEMENT", 105, y, { align: "center" });
  const titleW = doc.getTextWidth("ROOMMATE AGREEMENT");
  doc.setLineWidth(0.4);
  doc.line(105 - titleW / 2, y + 1.2, 105 + titleW / 2, y + 1.2);
  y += 12;

  // ── PREAMBLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  y = wrappedText(
    doc,
    `This Roommate Agreement ("Agreement") is made and entered into as of ${values.effectiveDate || "[Insert Date]"} ("Effective Date"), by and between the undersigned individuals (collectively referred to as the "Roommates").`,
    LM, y, PW, LH
  );
  y += 6;

  // ── RECITALS ──────────────────────────────────────────────────────────────
  boldHeading(doc, "RECITALS", LM, y);
  y += LH + 1;

  const recitalBullets = [
    `WHEREAS, the Roommates are co-tenants residing at the premises located at ${values.premisesAddress || "[Insert Premises Address]"} (the "Premises");`,
    `WHEREAS, the Premises are subject to a written lease or rental agreement entered into with ${values.landlordName || "[Insert Landlord Name]"} ("Landlord"), dated ${values.rentalAgreementDate || "[Insert Date]"} (the "Rental Agreement");`,
    `NOW, THEREFORE, in consideration of the foregoing recitals, which are hereby incorporated herein, and the mutual covenants, promises, and obligations set forth below, the Roommates hereby agree as follows:`,
  ];
  for (const b of recitalBullets) {
    y = checkPageBreak(doc, y);
    y = wrappedText(doc, b, LM, y, PW, LH);
    y += 3;
  }
  y += 4;

  // ── SECTION 1: INCORPORATION OF RENTAL AGREEMENT ─────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "1.  INCORPORATION OF RENTAL AGREEMENT", LM, y);
  y += LH + 1;

  const incBullets = [
    `All Roommates expressly agree to comply with, and be bound by, all terms, conditions, obligations, and covenants contained in the Rental Agreement.`,
    `Nothing in this Agreement shall be construed to modify or supersede the Rental Agreement.`,
  ];
  for (const b of incBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── SECTION 2: TERM ───────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "2.  TERM", LM, y);
  y += LH + 1;

  const termBullets = [
    `The Roommates shall occupy the Premises for the term specified in the Rental Agreement, commencing on ${values.startDate || "[Insert Start Date]"} and terminating on ${values.endDate || "[Insert End Date]"}.`,
    `Upon expiration of the lease term, this Agreement shall continue on a month-to-month basis unless otherwise terminated in writing.`,
    `Any Roommate who vacates the Premises prior to the expiration of the Rental Agreement shall remain fully responsible for all obligations under the Rental Agreement, including rent, until the lease expires or a suitable replacement roommate or subtenant is approved by the Landlord and remaining Roommates.`,
  ];
  for (const b of termBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── SECTION 3: AMENDMENTS ─────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "3.  AMENDMENTS", LM, y);
  y += LH + 1;
  y = wrappedText(
    doc,
    `This Agreement may be amended, modified, or supplemented only by a written instrument executed by all Roommates.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── SECTION 4: WAIVER ─────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "4.  WAIVER", LM, y);
  y += LH + 1;
  y = wrappedText(
    doc,
    `The failure of any Roommate to enforce any provision of this Agreement shall not constitute a waiver of such provision, nor shall it limit that Roommate's right to subsequently enforce strict compliance with all terms of this Agreement.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── SECTION 5: ARBITRATION ────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "5.  ARBITRATION", LM, y);
  y += LH + 1;

  const arbBullets = [
    `Any dispute, claim, or controversy arising out of or relating to this Agreement shall be resolved exclusively through binding arbitration in accordance with the then-current Commercial Arbitration Rules of the American Arbitration Association.`,
    `The arbitrator shall be mutually selected by the parties and shall possess expertise relevant to the subject matter of the dispute. If the parties cannot agree upon an arbitrator, each party shall select one arbitrator, and the two selected arbitrators shall jointly appoint a third arbitrator.`,
    `Arbitration shall be conducted at a location mutually agreed upon by the parties or, failing such agreement, at a location reasonably convenient to all parties.`,
    `All relevant documents and materials shall be exchanged no later than thirty (30) days following service of the arbitration notice.`,
    `The arbitrator(s) shall have no authority to amend this Agreement or to award punitive damages but may issue injunctive or mandatory relief. The decision shall be final and binding, and judgment may be entered in any court of competent jurisdiction.`,
    `During arbitration, the parties shall continue to perform their respective obligations under this Agreement.`,
  ];
  for (const b of arbBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── SECTION 6: PERSONAL PROPERTY ─────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "6.  PERSONAL PROPERTY", LM, y);
  y += LH + 1;

  const propBullets = [
    `No Roommate shall borrow or use another Roommate's personal property without prior consent.`,
    `Any agreed-upon sharing arrangements must be documented in writing and may be revoked at any time.`,
    `Borrowed property shall be used with reasonable care and returned in its original condition.`,
    `Any damage caused shall be the sole responsibility of the Roommate responsible for such damage.`,
  ];
  for (const b of propBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── SECTION 7: HOUSEHOLD DUTIES ───────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "7.  HOUSEHOLD DUTIES", LM, y);
  y += LH + 1;

  const dutyBullets = [
    `All Roommates shall equally share responsibility for cleaning and maintaining the common areas of the Premises (all areas other than individual private bedrooms).`,
    `Duties include, without limitation: cleaning bathrooms, kitchens, and common spaces; disposing of trash; yard maintenance; dishwashing; and general upkeep.`,
  ];
  for (const b of dutyBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── SECTION 8: ADDITIONAL ROOMMATES ──────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "8.  ADDITIONAL ROOMMATES", LM, y);
  y += LH + 1;
  y = wrappedText(
    doc,
    `No additional roommate may occupy the Premises without the prior written consent of all existing Roommates and the Landlord.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── SECTION 9: GOVERNING LAW ──────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "9.  GOVERNING LAW", LM, y);
  y += LH + 1;
  y = wrappedText(
    doc,
    `This Agreement shall be governed by and construed in accordance with the laws of the State of ${values.state || "[Insert State]"}.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── SECTION 10: ENTIRE AGREEMENT ─────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "10.  ENTIRE AGREEMENT", LM, y);
  y += LH + 1;
  y = wrappedText(
    doc,
    `This Agreement constitutes the entire agreement between the Roommates concerning the subject matter herein and supersedes all prior or contemporaneous oral or written agreements between them. This Agreement does not alter or affect the Rental Agreement.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── SECTION 11: SEVERABILITY ──────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "11.  SEVERABILITY", LM, y);
  y += LH + 1;
  y = wrappedText(
    doc,
    `If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. Any invalid provision shall be deemed modified to the minimum extent necessary to render it enforceable.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── SECTION 12: NOTICE TO LANDLORD ───────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "12.  NOTICE TO LANDLORD", LM, y);
  y += LH + 1;
  y = wrappedText(
    doc,
    `The Landlord shall be promptly notified of any change in Roommates to ensure compliance with the Rental Agreement.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── SECTION 13: RENT ──────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "13.  RENT", LM, y);
  y += LH + 1;

  y = wrappedText(
    doc,
    `The total monthly rent for the Premises is ${values.totalRent || "$0.00"}. Each Roommate shall pay the following portion:`,
    LM, y, PW, LH
  );
  y += 2;
  y = bulletItem(doc, `${values.party1Name || "Roommate 1"}: ${values.roommate1Rent || "$0.00"}`, LM + 2, y, PW - 2, LH);
  y += 1;
  y = bulletItem(doc, `${values.party2Name || "Roommate 2"}: ${values.roommate2Rent || "$0.00"}`, LM + 2, y, PW - 2, LH);
  y += 3;
  y = wrappedText(
    doc,
    `Rent shall be due on the ${values.rentDueDay || "[Insert Day]"} day of each month and paid directly to the Landlord. The Roommates acknowledge that they are jointly and severally liable for the full rent amount.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── SECTION 14: SECURITY DEPOSIT ─────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "14.  SECURITY DEPOSIT", LM, y);
  y += LH + 1;

  y = wrappedText(
    doc,
    `The total security deposit for the Premises is ${values.totalDeposit || "$0.00"}. Each Roommate shall contribute as follows:`,
    LM, y, PW, LH
  );
  y += 2;
  y = bulletItem(doc, `${values.party1Name || "Roommate 1"}: ${values.roommate1Deposit || "$0.00"}`, LM + 2, y, PW - 2, LH);
  y += 1;
  y = bulletItem(doc, `${values.party2Name || "Roommate 2"}: ${values.roommate2Deposit || "$0.00"}`, LM + 2, y, PW - 2, LH);
  y += 3;

  const depositBullets = [
    `Upon termination of the tenancy, the deposit shall be refunded by the Landlord and distributed proportionately among the Roommates, subject to lawful deductions.`,
    `Any damage caused by a specific Roommate shall be the sole responsibility of that Roommate.`,
  ];
  for (const b of depositBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── SECTION 15: PETS ──────────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "15.  PETS", LM, y);
  y += LH + 1;
  y = wrappedText(
    doc,
    `If pets are permitted under the Rental Agreement, the pet-owning Roommate shall be solely responsible for any damage caused by their pet, including damage to furniture, fixtures, flooring, landscaping, or any part of the Premises.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── SECTION 16: UTILITIES ─────────────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "16.  UTILITIES", LM, y);
  y += LH + 1;

  y = wrappedText(
    doc,
    `Each Roommate shall be responsible for timely payment of assigned utilities as follows:`,
    LM, y, PW, LH
  );
  y += 2;

  if (values.roommate1Utilities) {
    y = bulletItem(doc, `${values.party1Name || "Roommate 1"}: ${values.roommate1Utilities}`, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  if (values.roommate2Utilities) {
    y = bulletItem(doc, `${values.party2Name || "Roommate 2"}: ${values.roommate2Utilities}`, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y = bulletItem(doc, `Failure to pay assigned utilities shall constitute a material breach of this Agreement.`, LM + 2, y, PW - 2, LH);
  y += 7;

  // ── ADDITIONAL TERMS ──────────────────────────────────────────────────────
  if (values.additionalTerms) {
    y = checkPageBreak(doc, y);
    boldHeading(doc, "ADDITIONAL TERMS", LM, y);
    y += LH + 1;
    y = wrappedText(doc, values.additionalTerms, LM, y, PW, LH);
    y += 7;
  }

  // ── SIGNATURE BLOCK ───────────────────────────────────────────────────────
  y = checkPageBreak(doc, y, 50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  y = wrappedText(
    doc,
    `IN WITNESS WHEREOF, the Roommates have executed this Agreement as of the Effective Date first written above.`,
    LM, y, PW, LH
  );
  doc.setFont("helvetica", "normal");
  y += 8;

  const col1 = LM;
  const col2 = LM + 90;
  const sigLineLen = 75;
  const nameLW = doc.getTextWidth("Name:  ");
  const dateLW = doc.getTextWidth("Date:  ");

  // ── Column headers ──────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.text("ROOMMATE 1:", col1, y);
  doc.text("ROOMMATE 2:", col2, y);
  doc.setFont("helvetica", "normal");
  y += 8;

  // ── Name row ─────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold"); doc.text("Name:", col1, y); doc.setFont("helvetica", "normal");
  doc.text(values.party1Name || "", col1 + nameLW, y);
  doc.setFont("helvetica", "bold"); doc.text("Name:", col2, y); doc.setFont("helvetica", "normal");
  doc.text(values.party2Name || "", col2 + nameLW, y);
  y += 9;

  // ── Signature label row ───────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.text("Signature:", col1, y);
  doc.text("Signature:", col2, y);
  doc.setFont("helvetica", "normal");
  y += 8;

  // ── Signature line with typed name sitting ON the line ────────────────────
  doc.setLineWidth(0.3);
  doc.line(col1, y, col1 + sigLineLen, y);
  doc.line(col2, y, col2 + sigLineLen, y);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  const p1SigText = doc.splitTextToSize(values.party1Signature || "", sigLineLen - 2)[0] || "";
  const p2SigText = doc.splitTextToSize(values.party2Signature || "", sigLineLen - 2)[0] || "";
  doc.text(p1SigText, col1 + 2, y);
  doc.text(p2SigText, col2 + 2, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 10;

  // ── Date row ─────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold"); doc.text("Date:", col1, y); doc.setFont("helvetica", "normal");
  doc.line(col1 + dateLW, y, col1 + sigLineLen, y);
  doc.setFont("helvetica", "bold"); doc.text("Date:", col2, y); doc.setFont("helvetica", "normal");
  doc.line(col2 + dateLW, y, col2 + sigLineLen, y);

  doc.save("roommate_agreement.pdf");
};

export default function RoommateAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Roommate Agreement"
      subtitle="Complete each step to generate your Roommate Agreement"
      onGenerate={generatePDF}
      documentType="roommateagreement"
    />
  );
}
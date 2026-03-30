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
          { value: "us", label: "United States" }, { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" }, { value: "au", label: "Australia" },
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
      { name: "effectiveDate", label: "Effective date of this Lease", type: "date", required: true },
    ],
  },
  {
    label: "Landlord",
    fields: [
      { name: "party1Name",     label: "Landlord Full Legal Name",              type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party1Street",   label: "Landlord Street Address",               type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party1City",     label: "Landlord City",                         type: "text",  required: true,  placeholder: "City" },
      { name: "party1Zip",      label: "Landlord ZIP/Postal Code",              type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party1Email",    label: "Landlord Email",                        type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party1Phone",    label: "Landlord Phone",                        type: "tel",   required: false, placeholder: "(555) 123-4567" },
      { name: "paymentAddress", label: "Rent payment address (if different)",   type: "text",  required: false, placeholder: "Address for rent payments" },
    ],
  },
  {
    label: "Tenant",
    fields: [
      { name: "party2Name",   label: "Tenant Full Legal Name",  type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party2Street", label: "Tenant Street Address",   type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party2City",   label: "Tenant City",             type: "text",  required: true,  placeholder: "City" },
      { name: "party2Zip",    label: "Tenant ZIP/Postal Code",  type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party2Email",  label: "Tenant Email",            type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone",  label: "Tenant Phone",            type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Restaurant Premises",
    fields: [
      { name: "restaurantName",   label: "Restaurant name or unit number",      type: "text",     required: true,  placeholder: "e.g. Unit 5 / The Corner Bistro" },
      { name: "propAddress",      label: "Restaurant full address",             type: "text",     required: true,  placeholder: "123 Main St, City, State ZIP" },
      { name: "legalDescription", label: "Legal description of the Restaurant", type: "textarea", required: true,  placeholder: "Insert legal description" },
      { name: "storageArea",      label: "Storage area description",            type: "text",     required: false, placeholder: "e.g. Back storage room" },
    ],
  },
  {
    label: "Term & Rent",
    fields: [
      { name: "leaseStart",      label: "Lease start date",    type: "date", required: true },
      { name: "leaseEnd",        label: "Lease end date",      type: "date", required: true },
      { name: "monthlyRent",     label: "Monthly rent amount", type: "text", required: true, placeholder: "$0.00" },
      { name: "securityDeposit", label: "Security deposit",    type: "text", required: true, placeholder: "$0.00" },
    ],
  },
  {
    label: "Parking & Furnishings",
    fields: [
      { name: "parkingSpaces", label: "Number of customer parking spaces", type: "text",     required: true,  placeholder: "e.g. 10" },
      { name: "furnishings",   label: "Furnishings provided by Landlord",  type: "textarea", required: false, placeholder: "List all furnishings included" },
    ],
  },
  {
    label: "Insurance & Renewal",
    fields: [
      { name: "liabilityLimit",    label: "Liability insurance combined single limit",   type: "text", required: true,  placeholder: "$1,000,000.00" },
      { name: "renewalDuration",   label: "Renewal term duration",                      type: "text", required: true,  placeholder: "e.g. 1 Year" },
      { name: "renewalNoticeDays", label: "Days notice required for non-renewal",       type: "text", required: true,  placeholder: "e.g. 30" },
      { name: "renewalRent",       label: "Rent amount during renewal term",            type: "text", required: true,  placeholder: "$0.00" },
      { name: "renewalPeriod",     label: "Renewal rent period",                        type: "text", required: true,  placeholder: "month" },
    ],
  },
  {
    label: "Default & Fees",
    fields: [
      { name: "saleTerminationDays", label: "Days notice to terminate upon sale",   type: "text", required: true, placeholder: "e.g. 60" },
      { name: "casualtyThreshold",   label: "Max repair cost before termination",   type: "text", required: true, placeholder: "$0.00" },
      { name: "lateFeeDays",         label: "Days after due date before late fee",  type: "text", required: true, placeholder: "e.g. 5" },
      { name: "lateFee",             label: "Late fee amount",                      type: "text", required: true, placeholder: "$0.00" },
      { name: "returnedCheckFee",    label: "Returned check fee",                   type: "text", required: true, placeholder: "$0.00" },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      { name: "additionalTerms", label: "Any additional terms or special conditions?", type: "textarea", required: false, placeholder: "Enter any additional terms, conditions, or special provisions..." },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      { name: "party1Signature", label: "Landlord Signature (type full legal name)", type: "text", required: true,  placeholder: "Type your full legal name" },
      { name: "party2Signature", label: "Tenant Signature (type full legal name)",   type: "text", required: true,  placeholder: "Type your full legal name" },
      { name: "witnessName",     label: "Witness Name (Optional)",                   type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ── helpers ──────────────────────────────────────────────────────────────────

function boldHeading(doc: jsPDF, text: string, x: number, y: number): void {
  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  doc.text(text, x, y);
  doc.setFont("helvetica", "normal"); doc.setFontSize(10);
}

function wrappedText(doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function bulletItem(doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
  doc.text("\u2022", x, y);
  const lines = doc.splitTextToSize(text, maxWidth - 6);
  doc.text(lines, x + 6, y);
  return y + lines.length * lineHeight;
}

function checkPageBreak(doc: jsPDF, y: number, needed = 20): number {
  if (y + needed > 275) { doc.addPage(); return 20; }
  return y;
}

function sectionHead(doc: jsPDF, num: number, title: string, x: number, y: number): number {
  y = checkPageBreak(doc, y);
  boldHeading(doc, `${num}.  ${title}`, x, y);
  return y + 6.5;
}

// ── Fixed two-column signature block ─────────────────────────────────────────
function writeTwoColSig(
  doc: jsPDF,
  label1: string, name1: string, sig1: string,
  label2: string, name2: string, sig2: string,
  LM: number, LH: number, y: number
): number {
  y = checkPageBreak(doc, y, LH * 6);

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const col1 = LM;
  const col2 = 110;
  const lineLen = 56;

  // Labels
  doc.setFont("helvetica", "bold"); doc.setFontSize(10);
  doc.text(label1, col1, y);
  doc.text(label2, col2, y);
  doc.setFont("helvetica", "normal");
  y += LH + 1;

  // Printed Name
  doc.text("Printed Name:", col1, y);
  doc.text(name1 || "", col1 + 28, y);
  doc.text("Printed Name:", col2, y);
  doc.text(name2 || "", col2 + 28, y);
  y += LH;

  // Signature row — typed sig ON the line
  doc.text("Signature:", col1, y);
  doc.text("Signature:", col2, y);
  const sigLW = doc.getTextWidth("Signature: ");
  doc.setLineWidth(0.4);
  doc.line(col1 + sigLW, y + 0.8, col1 + sigLW + lineLen, y + 0.8);
  doc.line(col2 + sigLW, y + 0.8, col2 + sigLW + lineLen, y + 0.8);
  if (sig1) {
    doc.setFont("helvetica", "italic"); doc.setFontSize(9);
    doc.text(sig1, col1 + sigLW + 1, y);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
  }
  if (sig2) {
    doc.setFont("helvetica", "italic"); doc.setFontSize(9);
    doc.text(sig2, col2 + sigLW + 1, y);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10);
  }
  y += LH;

  // Date row
  doc.text(`Date:  ${today}`, col1, y);
  doc.text(`Date:  ${today}`, col2, y);
  y += LH + 4;

  return y;
}

// Single-col witness block
function writeSingleSig(doc: jsPDF, label: string, name: string, LM: number, LH: number, y: number): number {
  y = checkPageBreak(doc, y, LH * 4);
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.setFont("helvetica", "bold"); doc.setFontSize(10);
  doc.text(label, LM, y);
  doc.setFont("helvetica", "normal");
  y += LH;
  doc.text("Name: " + (name || ""), LM, y);
  y += LH;
  doc.text("Signature:", LM, y);
  const sigLW = doc.getTextWidth("Signature: ");
  doc.setLineWidth(0.4);
  doc.line(LM + sigLW, y + 0.8, LM + sigLW + 56, y + 0.8);
  y += LH;
  doc.text(`Date:  ${today}`, LM, y);
  y += LH + 4;
  return y;
}

// ── PDF generator ─────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const LM = 20;
  const PW = 170;
  const LH = 5.5;
  let y = 22;

  doc.setFont("helvetica", "bold"); doc.setFontSize(15);
  doc.text("RESTAURANT LEASE AGREEMENT", 105, y, { align: "center" });
  const titleW = doc.getTextWidth("RESTAURANT LEASE AGREEMENT");
  doc.setLineWidth(0.4);
  doc.line(105 - titleW / 2, y + 1.2, 105 + titleW / 2, y + 1.2);
  y += 12;

  doc.setFont("helvetica", "normal"); doc.setFontSize(10);
  y = wrappedText(doc, `This Lease Agreement ("Lease") is entered into on ${values.effectiveDate || "[Insert Date]"}, by and between:`, LM, y, PW, LH);
  y += 4;

  const landlordAddr = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ") || "[Insert Address]";
  doc.setFont("helvetica", "bold");
  doc.text(`${values.party1Name || "[Insert Landlord's Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(` ("Landlord"), ${landlordAddr}`, LM + doc.getTextWidth(`${values.party1Name || "[Insert Landlord's Name]"}`), y);
  y += LH + 2;

  doc.text("And", LM, y);
  y += LH + 2;

  const tenantAddr = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ") || "[Insert Address]";
  doc.setFont("helvetica", "bold");
  doc.text(`${values.party2Name || "[Insert Tenant's Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(` ("Tenant"), ${tenantAddr}`, LM + doc.getTextWidth(`${values.party2Name || "[Insert Tenant's Name]"}`), y);
  y += LH + 3;

  y = wrappedText(doc, `Landlord and Tenant may collectively be referred to as the "Parties."`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 1, "LEASED PREMISES", LM, y);
  y = wrappedText(doc, `Landlord hereby leases to Tenant the restaurant space known as ${values.restaurantName || "[Insert Name or Unit Number]"}, located at ${values.propAddress || "[Insert Address]"} (the "Restaurant"), in consideration of the lease payments and covenants set forth herein.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 2, "LEGAL DESCRIPTION", LM, y);
  y = wrappedText(doc, `The legal description of the Restaurant is as follows: ${values.legalDescription || "[Insert Legal Description]"}.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 3, "TERM", LM, y);
  for (const b of [
    `The term of this Lease shall commence on ${values.leaseStart || "[Insert Start Date]"} and shall expire on ${values.leaseEnd || "[Insert End Date]"}.`,
    `The Lease may be extended or terminated earlier in accordance with its terms.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 4, "RENT", LM, y);
  const rentAddr = values.paymentAddress || [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ") || "[Insert Payment Address]";
  for (const b of [
    `Tenant agrees to pay monthly rent of ${values.monthlyRent || "$0.00"}, payable in advance on or before the first day of each month.`,
    `All rental payments shall be delivered to Landlord at ${rentAddr}, or to any other address designated by Landlord in writing.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 5, "SECURITY DEPOSIT", LM, y);
  y = wrappedText(doc, `Upon execution of this Lease, Tenant shall pay Landlord a security deposit of ${values.securityDeposit || "$0.00"}, to be held in trust for the performance of Tenant's obligations under this Lease and to cover any damage caused to the Restaurant beyond normal wear and tear.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 6, "POSSESSION", LM, y);
  for (const b of [
    `Tenant shall take possession of the Restaurant on the first day of the Lease Term and shall vacate and return possession at the end of the term, unless otherwise agreed in writing.`,
    `Upon expiration or termination, Tenant shall remove all personal property and surrender the Restaurant in good condition, reasonable wear and tear excepted.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 7, "USE OF PREMISES", LM, y);
  for (const b of [
    `Tenant shall use the Restaurant solely for operating a restaurant or coffee shop business, and for related incidental purposes.`,
    `Sale of alcoholic beverages is prohibited except for beer and wine, and only if properly licensed.`,
    `Any other use shall require Landlord's prior written consent, not to be unreasonably withheld.`,
    `Tenant and its employees, agents, and invitees shall have the non-exclusive right to use common areas and facilities, subject to Landlord's rules.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 8, "FURNISHINGS", LM, y);
  for (const b of [
    `The following furnishings are provided: ${values.furnishings || "[Insert List]"}.`,
    `Tenant shall return all furnishings in the same condition as received, subject to normal wear and tear.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 9, "PARKING", LM, y);
  for (const b of [
    `Tenant shall be entitled to use ${values.parkingSpaces || "0"} parking spaces for customers and guests.`,
    `Tenant shall have the exclusive use of designated "Carry-Out Spaces" in the front common area, as assigned by Landlord.`,
    `Tenant shall be solely responsible for monitoring and enforcing its exclusive parking rights.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 10, "SIGNAGE AND AWNINGS", LM, y);
  for (const b of [
    `Tenant shall, at its own expense, install new awnings and signage, subject to Landlord's prior written approval regarding design, location, and aesthetics.`,
    `Tenant shall maintain all signage and awnings in good condition and hold Landlord harmless from liability related to their installation or maintenance.`,
    `Upon lease termination, Tenant shall remove all signage and repair any resulting damage.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 11, "QUIET ENJOYMENT", LM, y);
  for (const b of [
    `Landlord warrants that it holds good title to the Restaurant and has the legal right to lease the same.`,
    `Provided Tenant complies with all terms of this Lease, it shall be entitled to quiet enjoyment of the premises throughout the Lease Term.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 12, "STORAGE", LM, y);
  for (const b of [
    `Tenant may store personal property in ${values.storageArea || "[Insert Storage Area]"}, at its own risk.`,
    `Landlord shall not be liable for loss or damage to stored property.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 13, "INSURANCE", LM, y);
  for (const b of [
    `Property Insurance: Both Parties shall maintain appropriate insurance for their respective property and interests. Tenant shall name Landlord as an additional insured and provide proof of coverage.`,
    `Liability Insurance: Tenant shall maintain commercial general liability insurance with a combined single limit of at least ${values.liabilityLimit || "$0.00"}, naming Landlord as an additional insured.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 14, "RENEWAL", LM, y);
  for (const b of [
    `This Lease shall automatically renew for successive terms of ${values.renewalDuration || "[Insert Duration]"}, unless either party provides written notice of non-renewal at least ${values.renewalNoticeDays || "[Insert Number]"} days prior to the expiration of the current term.`,
    `Rent for any renewal term shall be ${values.renewalRent || "$0.00"} per ${values.renewalPeriod || "month"}, unless otherwise agreed.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 15, "MAINTENANCE", LM, y);
  for (const b of [
    `Landlord shall maintain the Restaurant structure and systems in good repair.`,
    `Tenant shall be responsible for keeping the leased area clean and sanitary.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 16, "PEST CONTROL", LM, y);
  y = wrappedText(doc, `Tenant shall, at its own cost, provide regular pest control services in all areas where food is handled, trash is stored, or deliveries are made.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 17, "JANITORIAL SERVICES", LM, y);
  y = wrappedText(doc, `Tenant shall provide janitorial services for the leased premises at its own expense.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 18, "WASTE AND GREASE MANAGEMENT", LM, y);
  for (const b of [
    `Tenant shall not commit waste and must maintain cleanliness of the premises.`,
    `Sewer lines must be kept free of grease or blockages at all times.`,
    `Grease must be removed professionally and recycled as required by applicable law.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 19, "UTILITIES AND SERVICES", LM, y);
  y = wrappedText(doc, `Tenant shall be responsible for all utility charges and service costs associated with its use of the Restaurant.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 20, "TAXES", LM, y);
  for (const b of [
    `Real Estate Taxes: Paid by Landlord.`,
    `Personal Property and Use Taxes: Paid by Landlord, including any taxes attributable to Tenant's use of the Restaurant.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 21, "TERMINATION UPON SALE", LM, y);
  y = wrappedText(doc, `Landlord may terminate this Lease upon ${values.saleTerminationDays || "[Insert Number]"} days' written notice in the event the Restaurant is sold.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 22, "DESTRUCTION OR CONDEMNATION", LM, y);
  for (const b of [
    `If the Restaurant is partially destroyed but repairable within 60 days and at a cost under ${values.casualtyThreshold || "$0.00"}, Landlord shall repair and rent shall abate proportionately during the repair period.`,
    `If repair is not feasible, or if condemnation occurs, either party may terminate this Lease by giving twenty (20) days' notice.`,
    `Tenant shall promptly notify Landlord of any damage to the premises.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 23, "DEFAULT", LM, y);
  for (const b of [
    `If Tenant fails to comply with its obligations under this Lease and does not cure a monetary default within five (5) days after written notice from Landlord, Landlord may re-enter and pursue all available legal remedies.`,
    `Non-monetary breaches must be cured within ten (10) days after written notice from Landlord.`,
    `Tenant shall be liable for all costs of enforcement, including reasonable attorney's fees.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 24, "LATE PAYMENTS", LM, y);
  y = wrappedText(doc, `Any payment not made within ${values.lateFeeDays || "[Insert Number]"} days of the due date shall incur a late fee of ${values.lateFee || "$0.00"}.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 25, "HOLDOVER", LM, y);
  y = wrappedText(doc, `If Tenant remains in possession after expiration of this Lease, rent during such Holdover Period shall be due at the same rate as under the renewal terms, unless otherwise agreed in writing.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 26, "CUMULATIVE RIGHTS", LM, y);
  y = wrappedText(doc, `All rights and remedies under this Lease shall be cumulative and may be exercised concurrently or separately.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 27, "RETURNED CHECKS", LM, y);
  y = wrappedText(doc, `Tenant shall be charged ${values.returnedCheckFee || "$0.00"} for each returned check due to insufficient funds.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 28, "GOVERNING LAW", LM, y);
  y = wrappedText(doc, `This Lease shall be governed by and construed in accordance with the laws of the State of ${values.state || "[Insert State]"}.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 29, "ENTIRE AGREEMENT / AMENDMENT", LM, y);
  for (const b of [
    `This Lease represents the full and final agreement between the Parties and supersedes all prior discussions or agreements.`,
    `Any modifications must be in writing and signed by both Parties.`,
  ]) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  y = sectionHead(doc, 30, "SEVERABILITY", LM, y);
  y = wrappedText(doc, `If any provision of this Lease is held to be invalid or unenforceable, the remaining provisions shall remain in full force. A court may limit such provision to make it enforceable, and it shall then be enforced as so limited.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 31, "WAIVER", LM, y);
  y = wrappedText(doc, `Failure by either party to enforce any term shall not constitute a waiver of that term or any other provision.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 32, "BINDING EFFECT", LM, y);
  y = wrappedText(doc, `This Lease shall be binding upon and inure to the benefit of the Parties and their respective heirs, successors, legal representatives, and assigns.`, LM, y, PW, LH);
  y += 7;

  y = sectionHead(doc, 33, "NOTICES", LM, y);
  y = wrappedText(doc, `All notices under this Lease shall be in writing and delivered personally or sent by certified mail, return receipt requested, to the Parties at the addresses listed below, or to such other addresses as the Parties may later designate in writing:`, LM, y, PW, LH);
  y += 3;
  y = bulletItem(doc, `Landlord: ${values.party1Name || "[Landlord Name]"}, ${landlordAddr}`, LM + 2, y, PW - 2, LH);
  y += 2;
  y = bulletItem(doc, `Tenant: ${values.party2Name || "[Tenant Name]"}, ${tenantAddr}`, LM + 2, y, PW - 2, LH);
  y += 7;

  if (values.additionalTerms) {
    y = checkPageBreak(doc, y);
    boldHeading(doc, "ADDITIONAL TERMS", LM, y);
    y += LH + 2;
    y = wrappedText(doc, values.additionalTerms, LM, y, PW, LH);
    y += 7;
  }

  // ── SIGNATURES ────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y, 55);
  doc.setFont("helvetica", "bold"); doc.setFontSize(10);
  y = wrappedText(doc, `IN WITNESS WHEREOF, the Parties have executed this Restaurant Lease Agreement as of the date first written above.`, LM, y, PW, LH);
  doc.setFont("helvetica", "normal");
  y += 8;

  y = writeTwoColSig(
    doc,
    "LANDLORD:", values.party1Name || "", values.party1Signature || "",
    "TENANT:", values.party2Name || "", values.party2Signature || "",
    LM, LH, y
  );

  if (values.witnessName) {
    y = writeSingleSig(doc, "WITNESS:", values.witnessName, LM, LH, y);
  }

  doc.save("restaurant_lease_agreement.pdf");
};

export default function RestaurantLease() {
  return (
    <FormWizard
      steps={steps}
      title="Restaurant Lease Agreement"
      subtitle="Complete each step to generate your Restaurant Lease Agreement"
      onGenerate={generatePDF}
      documentType="restaurantlease"
    />
  );
}
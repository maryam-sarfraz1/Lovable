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
    label: "Lessor Name",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the Lessor?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Lessor an individual or a business?",
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
    label: "Lessor Address",
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
    label: "Lessor Contact",
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
    label: "Lessee Name",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the Lessee?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Lessee an individual or a business?",
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
    label: "Lessee Address",
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
    label: "Lessee Contact",
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
    label: "Premises",
    fields: [
      {
        name: "premisesAddress",
        label: "What is the address of the storage unit (Premises)?",
        type: "text",
        required: true,
        placeholder: "Full address of the storage unit",
      },
      {
        name: "startDate",
        label: "What is the commencement date of this Agreement?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Rent",
    fields: [
      {
        name: "paymentAmount",
        label: "What is the monthly rent amount ($)?",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "rentDueDay",
        label: "On which day of the month is rent due?",
        type: "text",
        required: true,
        placeholder: "e.g. 1st, 5th, 15th",
      },
    ],
  },
  {
    label: "Security Deposit",
    fields: [
      {
        name: "securityDeposit",
        label: "What is the security deposit amount ($)?",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
    ],
  },
  {
    label: "Termination",
    fields: [
      {
        name: "terminationNotice",
        label: "How many days' prior written notice is required to terminate?",
        type: "select",
        required: true,
        options: [
          { value: "immediate", label: "Immediate" },
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
        label: "Lessor Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Lessee Signature (Type full legal name)",
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

// Helper to add wrapped text and return updated y position
const addWrappedText = (
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  pageHeight: number,
  margin: number
): number => {
  const lines = doc.splitTextToSize(text, maxWidth);
  for (const line of lines) {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, x, y);
    y += lineHeight;
  }
  return y;
};

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const maxWidth = 170;
  const lineHeight = 6;
  let y = margin;

  const checkPage = (neededSpace = lineHeight) => {
    if (y + neededSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const addLine = (text: string, fontSize = 10, fontStyle: "normal" | "bold" | "italic" = "normal", indent = 20) => {
    checkPage(lineHeight);
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle);
    y = addWrappedText(doc, text, indent, y, maxWidth - (indent - margin), lineHeight, pageHeight, margin);
  };

  const addBlank = (space = 6) => {
    checkPage(space);
    y += space;
  };

  const addSectionHeading = (text: string) => {
    addBlank(4);
    checkPage(10);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(text, margin, y);
    y += 7;
  };

  // Resolve display labels
  const terminationDays =
    values.terminationNotice === "immediate" ? "immediately" : `${values.terminationNotice} days'`;

  const stateDisplay = values.state || "";
  const lessorAddress = `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`.trim().replace(/^,\s*/, "");
  const lesseeAddress = `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`.trim().replace(/^,\s*/, "");

  // ── TITLE ──
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("STORAGE SPACE LEASE AGREEMENT", 105, y, { align: "center" });
  y += 12;

  // ── PREAMBLE ──
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const preamble =
    `This Storage Space Lease Agreement (the "Agreement") is made and entered into as of ` +
    `${values.effectiveDate || "[Insert Effective Date]"}, by and between ` +
    `${values.party1Name || "[Insert Lessor's Name]"}, of ${lessorAddress || "[Insert Lessor's Address]"} ("Lessor"), ` +
    `and ${values.party2Name || "[Insert Lessee's Name]"}, of ${lesseeAddress || "[Insert Lessee's Address]"} ("Lessee"). ` +
    `The Lessor and Lessee may hereinafter be collectively referred to as the "Parties."`;
  y = addWrappedText(doc, preamble, margin, y, maxWidth, lineHeight, pageHeight, margin);
  addBlank(8);

  // ── SECTION 1 ──
  addSectionHeading("1. Premises and Term");
  addLine(
    `Lessor hereby leases to Lessee the storage unit located at ` +
    `${values.premisesAddress || "[Insert Address]"} (the "Premises"). The term of this Agreement shall commence on ` +
    `${values.startDate || "[Insert Start Date]"} and shall continue on a month-to-month basis unless terminated earlier ` +
    `in accordance with this Agreement.`
  );

  // ── SECTION 2 ──
  addSectionHeading("2. Rent");
  addLine(
    `Lessee shall pay to Lessor monthly rent in the amount of $${values.paymentAmount || "[Insert Amount]"}, payable in advance on ` +
    `or before the ${values.rentDueDay || "[Insert Day]"} day of each calendar month. Rent shall be paid by mail or in person ` +
    `to the Lessor at the address set forth above, or to such other address as Lessor may from time to time designate in writing. ` +
    `Lessor shall provide a written receipt for any rent paid in cash, identifying the amount paid, the designated storage unit, ` +
    `and the rental period covered.`
  );

  // ── SECTION 3 ──
  addSectionHeading("3. Security Deposit");
  addLine(
    `Upon execution of this Agreement, Lessee shall pay to Lessor a security deposit in the amount of ` +
    `$${values.securityDeposit || "[Insert Amount]"} as security for the full and faithful performance of the terms of this ` +
    `Agreement and to cover any damage caused to the Premises by Lessee or Lessee's agents, invitees, or representatives.`
  );

  // ── SECTION 4 ──
  addSectionHeading("4. Termination");
  addLine(
    `Either Party may terminate this Agreement at any time by providing ${terminationDays} prior written notice to ` +
    `the other Party. Such notice shall be delivered to the address provided in this Agreement, unless updated in writing.`
  );

  // ── SECTION 5 ──
  addSectionHeading("5. Use of Premises");
  addLine(
    `Lessee shall use the Premises exclusively for the storage of personal property. The use of electrical appliances ` +
    `(including refrigerators, freezers, or other powered devices) is strictly prohibited. Lessee shall not store or dispose ` +
    `of any items outside of the designated storage unit. The Premises shall not be used for unlawful purposes or in violation ` +
    `of any applicable laws or ordinances.`
  );

  // ── SECTION 6 ──
  addSectionHeading("6. Hazardous or Illegal Materials");
  addLine(
    `Lessee shall not store, bring upon, or use within the Premises any flammable, explosive, toxic, or otherwise hazardous ` +
    `substances or materials. The possession or use of illegal substances or materials is strictly prohibited. Any violation of ` +
    `this provision may result in immediate termination of the Agreement.`
  );

  // ── SECTION 7 ──
  addSectionHeading("7. Security and Liability");
  addLine(
    `Lessee acknowledges and agrees that the Premises is not equipped with a security system. Lessee stores property entirely ` +
    `at Lessee's sole risk. Lessor shall not be responsible for, nor shall Lessor provide insurance coverage for, any loss or ` +
    `damage to Lessee's property. Lessee is encouraged to obtain personal insurance coverage for any items stored at the Premises. ` +
    `Lessee hereby releases Lessor and its agents from any and all claims for loss, damage, or injury, whether to person or ` +
    `property, arising from the use of the Premises.`
  );

  // ── SECTION 8 ──
  addSectionHeading("8. Maintenance");
  addLine(
    `Lessee shall maintain the Premises in a clean, orderly, and sanitary condition at all times. Lessee shall promptly notify ` +
    `Lessor of any need for repair or maintenance. Lessee shall not cause damage to the Premises, and any damage caused by ` +
    `Lessee shall be promptly repaired at Lessee's expense.`
  );

  // ── SECTION 9 ──
  addSectionHeading("9. Assignment and Sublease");
  addLine(
    `Lessee shall not assign this Agreement, sublease the Premises, or permit the use of the Premises by any third party ` +
    `without the prior written consent of Lessor.`
  );

  // ── SECTION 10 ──
  addSectionHeading("10. Governing Law");
  addLine(
    `This Agreement shall be governed by, and construed in accordance with, the laws of the State of ` +
    `${stateDisplay || "[Insert State]"}.`
  );

  // ── SECTION 11 ──
  addSectionHeading("11. Entire Agreement");
  addLine(
    `This Agreement constitutes the entire understanding between the Parties and supersedes all prior negotiations, discussions, ` +
    `agreements, or representations, whether written or oral, concerning the subject matter hereof. No amendment or modification ` +
    `shall be effective unless in writing and signed by both Parties.`
  );

  // ── SECTION 12 ──
  addSectionHeading("12. Severability");
  addLine(
    `If any provision of this Agreement is determined to be invalid or unenforceable by a court of competent jurisdiction, ` +
    `such provision shall be deemed modified to the extent necessary to make it enforceable, and the remainder of the Agreement ` +
    `shall continue in full force and effect.`
  );

  // ── ADDITIONAL TERMS ──
  if (values.additionalTerms && values.additionalTerms.trim()) {
    addSectionHeading("13. Additional Terms");
    addLine(values.additionalTerms.trim());
  }

  // ── EXECUTION CLAUSE ──
  addBlank(10);
  checkPage(12);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.",
    margin, y, maxWidth, lineHeight, pageHeight, margin
  );
  addBlank(12);

  // ── SIGNATURES ──
  checkPage(50);

  // Lessor block
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("LESSOR", margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Signature: ___________________________", margin, y);
  y += 8;
  doc.text(`Name: ${values.party1Name || "___________________________"}`, margin, y);
  y += 8;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, y);
  y += 14;

  // Lessee block
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("LESSEE", margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Signature: ___________________________", margin, y);
  y += 8;
  doc.text(`Name: ${values.party2Name || "___________________________"}`, margin, y);
  y += 8;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, y);
  y += 14;

  // Optional witness
  if (values.witnessName && values.witnessName.trim()) {
    checkPage(30);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS", margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Signature: ___________________________", margin, y);
    y += 8;
    doc.text(`Name: ${values.witnessName}`, margin, y);
    y += 8;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, y);
  }

  doc.save("storage_space_lease.pdf");
};

export default function StorageSpaceLease() {
  return (
    <FormWizard
      steps={steps}
      title="Storage Space Lease"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="storagespacelease"
    />
  );
}
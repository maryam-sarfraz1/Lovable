import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps = [
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
    label: "Landlord (First Party)",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the Landlord?",
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
    label: "Landlord Address",
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
    label: "Landlord Contact",
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
    label: "Tenant (Second Party)",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the Tenant?",
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
    label: "Tenant Address",
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
    label: "Tenant Contact",
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
    label: "Rental Property & Arrears",
    fields: [
      {
        name: "rentalPropertyAddress",
        label: "Full address of the leased Premises",
        type: "text",
        required: true,
        placeholder: "123 Rental St, City, State ZIP",
      },
      {
        name: "arrearsAmount",
        label: "Total amount of past due rent in arrears ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 2400.00",
      },
      {
        name: "finalPaymentDate",
        label: "Final Pay Date (deadline for full repayment)",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Payment Plan",
    fields: [
      {
        name: "goodFaithPayment",
        label: "Good faith initial payment upon signing ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 500.00",
      },
      {
        name: "installmentCount",
        label: "Number of installment payments",
        type: "text",
        required: true,
        placeholder: "e.g. 3",
      },
      {
        name: "installmentAmount",
        label: "Amount per installment ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 633.00",
      },
      {
        name: "installmentDates",
        label: "Installment payment dates",
        type: "text",
        required: true,
        placeholder: "e.g. 1st of each month starting June 1",
      },
      {
        name: "vacateDays",
        label: "Days after Pay Date Tenant has to remove belongings if in default",
        type: "text",
        required: true,
        placeholder: "e.g. 7",
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
        label: "Additional payment amount (if applicable)",
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
        label: "Landlord Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Tenant Signature (Type full legal name)",
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
];

// ─── PDF helpers ───────────────────────────────────────────────────────────────

const PAGE_W = 210;
const MARGIN  = 20;
const MAX_W   = PAGE_W - MARGIN * 2;
const LINE_H  = 6;
const PAGE_H  = 277;
const SIG_LABEL_W = 52; // fixed label column width for signature blocks

function addPage(doc) {
  doc.addPage();
  return MARGIN;
}

function checkY(doc, y, needed = LINE_H * 2) {
  if (y + needed > PAGE_H) return addPage(doc);
  return y;
}

function writeHeading(doc, text, y) {
  y = checkY(doc, y, LINE_H * 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  const lines = doc.splitTextToSize(text, MAX_W);
  doc.text(lines, MARGIN, y);
  y += lines.length * LINE_H + 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  return y;
}

function writeBody(doc, text, y) {
  y = checkY(doc, y, LINE_H);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, MAX_W);
  lines.forEach((line) => {
    y = checkY(doc, y);
    doc.text(line, MARGIN, y);
    y += LINE_H;
  });
  return y + 2;
}

function writeRecital(doc, label, text, y) {
  y = checkY(doc, y, LINE_H);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  const labelWidth = doc.getTextWidth(label + " ");
  doc.text(label, MARGIN, y);
  doc.setFont("helvetica", "normal");
  const bodyLines = doc.splitTextToSize(text, MAX_W - labelWidth);
  doc.text(bodyLines[0], MARGIN + labelWidth, y);
  y += LINE_H;
  if (bodyLines.length > 1) {
    bodyLines.slice(1).forEach((line) => {
      y = checkY(doc, y);
      doc.text(line, MARGIN, y);
      y += LINE_H;
    });
  }
  return y + 2;
}

function writeBullet(doc, text, y) {
  y = checkY(doc, y, LINE_H);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const indent = MARGIN + 6;
  const bulletW = MAX_W - 6;
  doc.text("\u2022", MARGIN, y);
  const lines = doc.splitTextToSize(text, bulletW);
  lines.forEach((line) => {
    y = checkY(doc, y);
    doc.text(line, indent, y);
    y += LINE_H;
  });
  return y + 1;
}

/**
 * Renders a properly aligned signature block.
 * Labels at MARGIN; values at MARGIN + SIG_LABEL_W.
 * Order: Role → Handwritten sig line → Printed Name → Typed Signature →
 *        Printed Name → Date (always last)
 */
function writeSigBlock(doc, role, name, typedSig, effectiveDate, y) {
  y = checkY(doc, y, LINE_H * 6);
  const VALUE_X = MARGIN + SIG_LABEL_W;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(role, MARGIN, y);
  y += LINE_H + 2;

  doc.setFont("helvetica", "normal");

  // Handwritten signature line
  doc.text("Signature (handwritten):", MARGIN, y);
  doc.text("_______________________________", VALUE_X, y);
  y += LINE_H;

  // Printed name
  doc.text("Printed Name:", MARGIN, y);
  doc.text(name || "", VALUE_X, y);
  y += LINE_H;

  // Typed signature — value appears directly after label, NOT behind the line
  doc.text("Typed Signature:", MARGIN, y);
  doc.text(typedSig || "", VALUE_X, y);
  y += LINE_H;

  // Date — always the last field, shows effective date from form
  doc.text("Date:", MARGIN, y);
  doc.text(effectiveDate || "_______________________________", VALUE_X, y);
  y += LINE_H;

  return y + 6;
}

// ─── Main PDF generator ────────────────────────────────────────────────────────

const generatePDF = (values) => {
  const doc = new jsPDF();
  let y = MARGIN;

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("LATE RENT PAYMENT AGREEMENT", PAGE_W / 2, y, { align: "center" });
  y += LINE_H + 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `Jurisdiction: ${values.state || ""}, ${(values.country || "").toUpperCase()}   |   Effective Date: ${values.effectiveDate || "N/A"}`,
    PAGE_W / 2, y, { align: "center" }
  );
  y += LINE_H + 6;

  // ── PREAMBLE ───────────────────────────────────────────────────────────────
  y = writeBody(doc,
    `This Late Rent Payment Agreement ("Agreement") is entered into on ${values.effectiveDate || "[Insert Date]"} ("Effective Date"), by and between`,
    y
  );
  y = writeBody(doc,
    `${values.party1Name || "[Insert Landlord's Full Name]"}, residing at ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""} ("Landlord"),`,
    y
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("And", PAGE_W / 2, y, { align: "center" });
  doc.setFont("helvetica", "normal");
  y += LINE_H + 2;

  y = writeBody(doc,
    `${values.party2Name || "[Insert Tenant's Full Name]"}, residing at ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""} ("Tenant").`,
    y
  );
  y = writeBody(doc,
    `The Landlord and Tenant may collectively be referred to herein as the "Parties."`,
    y
  );
  y += 2;

  // ── WHEREAS RECITALS ───────────────────────────────────────────────────────
  y = writeHeading(doc, "RECITALS", y);
  y = writeRecital(doc, "WHEREAS,",
    `the Tenant is currently leasing the property located at ${values.rentalPropertyAddress || "[Insert Full Rental Property Address]"} ("Premises") from the Landlord;`,
    y
  );
  y = writeRecital(doc, "WHEREAS,",
    `the Tenant is currently in arrears in the amount of $${values.arrearsAmount || "[Insert Amount]"} in past due rent;`,
    y
  );
  y = writeRecital(doc, "WHEREAS,",
    `the Tenant acknowledges the outstanding rent owed and agrees to satisfy the total amount due no later than ${values.finalPaymentDate || "[Insert Final Payment Date]"} ("Pay Date");`,
    y
  );
  y = writeRecital(doc, "WHEREAS,",
    `the Tenant agrees to make a good faith payment of $${values.goodFaithPayment || "[Insert Amount]"} upon execution of this Agreement, and further agrees to pay ${values.installmentCount || "[Insert Number]"} installment(s) of $${values.installmentAmount || "[Insert Amount]"} until the total past due rent is paid in full;`,
    y
  );
  y = writeRecital(doc, "WHEREAS,",
    "the Tenant remains responsible for paying all current and future rent in addition to the scheduled installment payments toward the past due rent;",
    y
  );
  y = writeBody(doc, "NOW, THEREFORE, the Parties agree as follows:", y);
  y += 2;

  // ── SECTION 1 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "1.  PAYMENT OBLIGATIONS", y);
  y = writeBody(doc, "The Tenant shall remit the outstanding past due rent as follows:", y);
  y = writeBullet(doc, `Initial payment of $${values.goodFaithPayment || "[Insert Amount]"} upon signing this Agreement;`, y);
  y = writeBullet(doc, `${values.installmentCount || "[Insert Number]"} installment(s) of $${values.installmentAmount || "[Insert Amount]"} payable on ${values.installmentDates || "[Insert Payment Dates]"};`, y);
  y = writeBullet(doc, "Ongoing payment of all current and future rent as it becomes due.", y);
  y += 2;

  // ── SECTION 2 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "2.  DEFAULT AND TERMINATION", y);
  y = writeBody(doc,
    `If the Tenant fails to comply with the payment terms outlined herein, including payment of future rent as due, the Tenant agrees to vacate the Premises immediately and no later than the Pay Date (${values.finalPaymentDate || "[Insert Final Payment Date]"}). The Tenant further agrees to remove all personal belongings from the Premises within ${values.vacateDays || "[Insert Number]"} days following the Pay Date.`,
    y
  );
  y += 2;

  // ── SECTION 3 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "3.  FORBEARANCE BY LANDLORD", y);
  y = writeBody(doc,
    "In consideration of the Tenant's promise to pay the past due rent, the Landlord agrees to refrain from initiating eviction or other legal proceedings for non-payment, provided that the Tenant strictly complies with the terms of this Agreement. Nothing in this Agreement shall be construed as a waiver of the Landlord's rights under applicable landlord-tenant law should the Tenant default.",
    y
  );
  y += 2;

  // ── SECTION 4 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "4.  ACKNOWLEDGMENT OF DEBT", y);
  y = writeBody(doc,
    `The Tenant acknowledges and agrees that the amount of $${values.arrearsAmount || "[Insert Amount]"} in past due rent specified above is accurate and legally due, and that the Landlord is fully entitled to collect such amounts.`,
    y
  );
  y += 2;

  // ── SECTION 5 ──────────────────────────────────────────────────────────────
  y = writeHeading(doc, "5.  ENTIRE AGREEMENT", y);
  y = writeBody(doc,
    "This Agreement constitutes the full and complete understanding between the Parties with respect to the subject matter herein and supersedes any prior or contemporaneous oral or written agreements or understandings. This Agreement may only be amended in writing, signed by both Parties.",
    y
  );
  y += 2;

  // ── DISPUTE RESOLUTION ─────────────────────────────────────────────────────
  if (values.disputeResolution) {
    y = writeHeading(doc, "6.  DISPUTE RESOLUTION", y);
    y = writeBody(doc,
      `Any dispute arising from or related to this Agreement shall first be addressed through good faith negotiation. If unresolved, the Parties agree to submit the matter to ${values.disputeResolution}. All costs of such proceedings shall be borne as determined by the applicable rules or court.`,
      y
    );
    y += 2;
  }

  // ── CONFIDENTIALITY ────────────────────────────────────────────────────────
  if (values.confidentiality === "yes") {
    y = writeHeading(doc, "7.  CONFIDENTIALITY", y);
    y = writeBody(doc,
      "Both Parties agree to keep the terms of this Agreement and all related information strictly confidential and shall not disclose such information to any third party without prior written consent of the other Party.",
      y
    );
    y += 2;
  }

  // ── ADDITIONAL TERMS ───────────────────────────────────────────────────────
  if (values.additionalTerms) {
    y = writeHeading(doc, "ADDITIONAL TERMS", y);
    y = writeBody(doc, values.additionalTerms, y);
    y += 2;
  }

  // ── SIGNATURES ────────────────────────────────────────────────────────────
  y = checkY(doc, y, LINE_H * 10);
  y = writeBody(doc, "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.", y);
  y += 4;

  // Landlord signature block
  y = writeSigBlock(
    doc, "LANDLORD:",
    values.party1Name || "",
    values.party1Signature || "",
    values.effectiveDate || "",
    y
  );

  // Tenant signature block
  y = writeSigBlock(
    doc, "TENANT:",
    values.party2Name || "",
    values.party2Signature || "",
    values.effectiveDate || "",
    y
  );

  // Witness (optional)
  if (values.witnessName) {
    y = checkY(doc, y, LINE_H * 4);
    const VALUE_X = MARGIN + SIG_LABEL_W;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("WITNESS:", MARGIN, y);
    y += LINE_H + 2;
    doc.setFont("helvetica", "normal");
    doc.text("Signature (handwritten):", MARGIN, y);
    doc.text("_______________________________", VALUE_X, y);
    y += LINE_H;
    doc.text("Printed Name:", MARGIN, y);
    doc.text(values.witnessName, VALUE_X, y);
    y += LINE_H;
    doc.text("Date:", MARGIN, y);
    doc.text(values.effectiveDate || "_______________________________", VALUE_X, y);
  }

  doc.save("late_rent_payment_agreement.pdf");
};

export default function LateRentPaymentAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Late Rent Payment Agreement"
      subtitle="Complete each step to generate your Late Rent Payment Agreement"
      onGenerate={generatePDF}
      documentType="laterentpaymentagreement"
    />
  );
}
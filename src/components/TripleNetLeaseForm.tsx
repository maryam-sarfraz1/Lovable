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
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Landlord Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
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
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Tenant Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Premises & Term",
    fields: [
      { name: "premisesAddress", label: "Full address of the Premises being leased", type: "text", required: true, placeholder: "123 Commercial Blvd, Suite 100, City, State ZIP" },
      { name: "leaseStartDate", label: "Lease Start Date", type: "date", required: true },
      { name: "leaseEndDate", label: "Lease End Date", type: "date", required: true },
    ],
  },
  {
    label: "Rent & Deposit",
    fields: [
      { name: "monthlyRent", label: "Monthly Base Rent Amount ($)", type: "text", required: true, placeholder: "e.g. 3500.00" },
      { name: "rentPaymentAddress", label: "Rent Payment Address", type: "text", required: true, placeholder: "Address where rent is to be sent" },
      { name: "securityDeposit", label: "Security Deposit Amount ($)", type: "text", required: true, placeholder: "e.g. 7000.00" },
    ],
  },
  {
    label: "Insurance",
    fields: [
      { name: "casualtyInsuranceAmount", label: "Casualty Insurance Minimum Amount ($)", type: "text", required: true, placeholder: "e.g. 500000.00" },
      { name: "liabilityInsuranceAmount", label: "General Liability Insurance Minimum Amount ($)", type: "text", required: true, placeholder: "e.g. 1000000.00" },
    ],
  },
  {
    label: "Termination",
    fields: [
      { name: "landlordTerminationDays", label: "Days notice Landlord must give upon sale of Premises", type: "text", required: true, placeholder: "e.g. 60" },
      { name: "tenantTerminationDays", label: "Days notice Tenant must give to terminate early", type: "text", required: true, placeholder: "e.g. 90" },
      { name: "tenantTerminationFeeMonths", label: "Early termination fee (number of months' rent)", type: "text", required: true, placeholder: "e.g. 3" },
      { name: "defaultCureDays", label: "Days Tenant has to cure a default", type: "text", required: true, placeholder: "e.g. 15" },
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
          { value: "1month", label: "1 Month" }, { value: "3months", label: "3 Months" },
          { value: "6months", label: "6 Months" }, { value: "1year", label: "1 Year" },
          { value: "2years", label: "2 Years" }, { value: "5years", label: "5 Years" },
          { value: "indefinite", label: "Indefinite/Ongoing" }, { value: "custom", label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice",
        label: "General termination notice period",
        type: "select",
        required: true,
        options: [
          { value: "immediate", label: "Immediate" }, { value: "7days", label: "7 Days" },
          { value: "14days", label: "14 Days" }, { value: "30days", label: "30 Days" },
          { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" },
        ],
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "paymentAmount", label: "Additional payment amount (if applicable)", type: "text", required: false, placeholder: "$0.00" },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: false,
        options: [
          { value: "onetime", label: "One-time Payment" }, { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" }, { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" }, { value: "annually", label: "Annually" },
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
          { value: "mediation", label: "Mediation" }, { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation", label: "Court Litigation" }, { value: "negotiation", label: "Good Faith Negotiation First" },
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
      { name: "party1Signature", label: "Landlord Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Signature", label: "Tenant Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "witnessName", label: "Witness Name (Optional)", type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
];

// ─── PDF helpers ───────────────────────────────────────────────────────────────

const PAGE_W  = 210;
const MARGIN  = 20;
const MAX_W   = PAGE_W - MARGIN * 2;
const LINE_H  = 6;
const PAGE_H  = 277;

function addPage(doc) { doc.addPage(); return MARGIN; }
function checkY(doc, y, needed = LINE_H * 2) { if (y + needed > PAGE_H) return addPage(doc); return y; }

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
  lines.forEach((line) => { y = checkY(doc, y); doc.text(line, MARGIN, y); y += LINE_H; });
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
  lines.forEach((line) => { y = checkY(doc, y); doc.text(line, indent, y); y += LINE_H; });
  return y + 1;
}

// ─── Fixed signature block ─────────────────────────────────────────────────────
// Signature typed name appears ON/above the line, not behind it.
function writeSigBlock(doc, label, name, typedSig, y) {
  y = checkY(doc, y, LINE_H * 5);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(label, MARGIN, y);
  y += LINE_H + 2;

  // Signature row: typed name on the line
  doc.setFont("helvetica", "normal");
  doc.text("Signature:", MARGIN, y);
  const sigLabelW = doc.getTextWidth("Signature: ");
  const lineX = MARGIN + sigLabelW + 1;
  if (typedSig) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(typedSig, lineX + 1, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  }
  doc.setLineWidth(0.4);
  doc.line(lineX, y + 1, lineX + 80, y + 1);
  y += LINE_H;

  // Printed Name row
  doc.text("Printed Name:  " + (name || ""), MARGIN, y);
  y += LINE_H;

  // Date row
  doc.text("Date:  " + today, MARGIN, y);
  y += LINE_H + 4;

  return y;
}

// ─── Main PDF generator ────────────────────────────────────────────────────────

const generatePDF = (values) => {
  const doc = new jsPDF();
  let y = MARGIN;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("TRIPLE NET LEASE AGREEMENT", PAGE_W / 2, y, { align: "center" });
  y += LINE_H + 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `Jurisdiction: ${values.state || ""}, ${(values.country || "").toUpperCase()}   |   Effective Date: ${values.effectiveDate || "N/A"}`,
    PAGE_W / 2, y, { align: "center" }
  );
  y += LINE_H + 6;

  y = writeBody(doc, `This Triple Net Lease Agreement ("Agreement" or "Lease") is made and entered into as of ${values.effectiveDate || "[Insert Date]"}, by and between`, y);
  y = writeBody(doc, `${values.party1Name || "[Insert Landlord's Full Legal Name]"}, whose mailing address is ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""} (hereinafter referred to as the "Landlord"),`, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("And", PAGE_W / 2, y, { align: "center" });
  doc.setFont("helvetica", "normal");
  y += LINE_H + 2;

  y = writeBody(doc, `${values.party2Name || "[Insert Tenant's Full Legal Name]"}, whose mailing address is ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""} (hereinafter referred to as the "Tenant").`, y);
  y = writeBody(doc, `The Landlord and the Tenant may collectively be referred to as the "Parties" and individually as a "Party."`, y);
  y += 2;

  y = writeHeading(doc, "1.  PREMISES", y);
  y = writeBody(doc, `The Landlord hereby leases to the Tenant, and the Tenant hereby leases from the Landlord, the real property, building, and improvements located at ${values.premisesAddress || "[Insert Full Property Address]"} (the "Premises"), subject to the terms and conditions set forth herein.`, y);
  y += 2;

  y = writeHeading(doc, "2.  TERM", y);
  y = writeBody(doc, `The term of this Lease shall commence on ${values.leaseStartDate || "[Insert Start Date]"} and shall continue through ${values.leaseEndDate || "[Insert End Date]"} (the "Term"), unless sooner terminated pursuant to the provisions herein. Either Party may terminate this Lease by providing at least thirty (30) days' prior written notice, which must coincide with the end of a calendar month.`, y);
  y += 2;

  y = writeHeading(doc, "3.  TRIPLE NET LEASE", y);
  y = writeBody(doc, "This Lease is a Triple Net Lease, meaning the Tenant shall be solely responsible for all expenses associated with the Premises, including but not limited to:", y);
  y = writeBullet(doc, "Real estate taxes", y);
  y = writeBullet(doc, "Property insurance", y);
  y = writeBullet(doc, "Repairs and maintenance", y);
  y = writeBullet(doc, "Utilities", y);
  y = writeBullet(doc, "Common area maintenance (CAM)", y);
  y = writeBullet(doc, "Any other costs associated with the operation, use, or occupancy of the Premises", y);
  y = writeBody(doc, "It is the intention of the Parties that the Landlord shall have no obligation to incur any expenses related to the Premises during the Term of this Lease.", y);
  y += 2;

  y = writeHeading(doc, "4.  RENT", y);
  y = writeBody(doc, `The Tenant agrees to pay to the Landlord monthly base rent in the amount of $${values.monthlyRent || "[Insert Amount]"}, payable in advance on or before the first (1st) day of each calendar month. Rent shall be payable at ${values.rentPaymentAddress || "[Insert Payment Address]"} or at such other address as the Landlord may designate in writing.`, y);
  y += 2;

  y = writeHeading(doc, "5.  ADDITIONAL CHARGES (ESTIMATED PAYMENTS)", y);
  y = writeBody(doc, "In addition to base rent, the Tenant shall pay estimated monthly charges for:", y);
  y = writeBullet(doc, "Real estate taxes", y);
  y = writeBullet(doc, "Insurance premiums", y);
  y = writeBullet(doc, "Maintenance costs (including landscaping, parking lot repairs, etc.)", y);
  y = writeBody(doc, "These estimated amounts will be determined and updated by the Landlord from time to time and billed monthly with the rent. Actual expenses shall be reconciled quarterly, and any overpayment or underpayment shall be refunded or invoiced accordingly.", y);
  y += 2;

  y = writeHeading(doc, "6.  SECURITY DEPOSIT", y);
  y = writeBody(doc, `Upon execution of this Lease, the Tenant shall deposit with the Landlord the sum of $${values.securityDeposit || "[Insert Amount]"} as a Security Deposit, to be held by the Landlord as security for the faithful performance of all terms and obligations of this Lease. The Security Deposit shall be returned to the Tenant at the expiration of the Lease, less any lawful deductions.`, y);
  y += 2;

  y = writeHeading(doc, "7.  POSSESSION AND CONDITION", y);
  y = writeBody(doc, `Tenant shall take possession of the Premises on the commencement date. Upon expiration or earlier termination of this Lease, the Tenant shall vacate and surrender the Premises in good order, condition, and repair, broom-cleaned and free of all personal property and debris, reasonable wear and tear excepted.`, y);
  y += 2;

  y = writeHeading(doc, "8.  ALTERATIONS AND IMPROVEMENTS", y);
  y = writeBody(doc, "The Tenant shall not make any alterations, additions, or improvements to the Premises without the prior written consent of the Landlord, which shall not be unreasonably withheld. All such work shall comply with all applicable laws and shall be conducted at the Tenant's sole cost and expense.", y);
  y += 2;

  y = writeHeading(doc, "9.  INSURANCE", y);
  y = writeBody(doc, "Tenant shall, at its own expense, maintain:", y);
  y = writeBullet(doc, `Casualty insurance covering the Premises in an amount not less than $${values.casualtyInsuranceAmount || "[Insert Amount]"}`, y);
  y = writeBullet(doc, `General liability insurance with a combined single limit of at least $${values.liabilityInsuranceAmount || "[Insert Amount]"}`, y);
  y = writeBody(doc, "Landlord shall be named as an additional insured on all such policies. Tenant shall deliver certificates of insurance to the Landlord as proof of coverage and shall ensure that Landlord receives at least thirty (30) days' notice prior to any cancellation or material change in coverage.", y);
  y += 2;

  y = writeHeading(doc, "10.  MAINTENANCE AND UTILITIES", y);
  y = writeBody(doc, "The Tenant shall, at its sole expense, keep and maintain the Premises (including all structural components, systems, and exterior areas) in good order and repair throughout the Term. Tenant shall also be responsible for and shall pay all charges for water, sewer, electricity, gas, telephone, trash collection, and any other utilities or services used or consumed at the Premises.", y);
  y += 2;

  y = writeHeading(doc, "11.  TAXES", y);
  y = writeBody(doc, "Tenant shall pay all real property taxes and personal property taxes levied against the Premises or arising from its use thereof. Tenant may contest any such taxes, at its own expense, provided such contest does not subject the Premises to lien or forfeiture.", y);
  y += 2;

  y = writeHeading(doc, "12.  TERMINATION", y);
  y = writeBullet(doc, `Landlord Termination on Sale: Landlord may terminate this Lease upon ${values.landlordTerminationDays || "[Insert Days]"} days' written notice in the event of sale of the Premises.`, y);
  y = writeBullet(doc, `Tenant Termination: Tenant may terminate the Lease by providing ${values.tenantTerminationDays || "[Insert Days]"} days' prior written notice and paying a termination fee equal to ${values.tenantTerminationFeeMonths || "[Insert Number]"} months' rent.`, y);
  y += 2;

  y = writeHeading(doc, "13.  CASUALTY OR CONDEMNATION", y);
  y = writeBody(doc, "If the Premises are partially or totally damaged by fire or other casualty such that Tenant's use is materially impaired and the damage cannot be repaired within sixty (60) days, either Party may terminate the Lease upon twenty (20) days' written notice. Any rent paid in advance shall be prorated and refunded accordingly.", y);
  y += 2;

  y = writeHeading(doc, "14.  DEFAULT AND REMEDIES", y);
  y = writeBody(doc, `Tenant shall be in default if it fails to perform any obligation under this Lease and does not cure such failure within ${values.defaultCureDays || "[Insert Days]"} days of written notice. Upon default, Landlord may terminate this Lease and take possession of the Premises, and pursue all legal and equitable remedies.`, y);
  y += 2;

  y = writeHeading(doc, "15.  INDEMNIFICATION", y);
  y = writeBody(doc, "Tenant shall indemnify, defend, and hold harmless the Landlord from any claims, damages, or liabilities arising from Tenant's occupancy, use, or maintenance of the Premises, except those caused by the Landlord's willful misconduct or negligence.", y);
  y += 2;

  y = writeHeading(doc, "16.  HAZARDOUS MATERIALS", y);
  y = writeBody(doc, "Tenant shall not bring or store any hazardous materials on the Premises except those reasonably required for its business and in full compliance with all applicable environmental laws. Tenant shall promptly remediate any spills or releases caused by it or its agents and indemnify Landlord for related liabilities.", y);
  y += 2;

  y = writeHeading(doc, "17.  DISPUTE RESOLUTION", y);
  y = writeBody(doc, `The Parties agree to first attempt to resolve any dispute arising from this Lease through good faith negotiations. If resolution is not reached, the Parties agree to submit the dispute to ${values.disputeResolution || "mediation"}. If that process fails, either Party may pursue legal remedies available under applicable law.`, y);
  y += 2;

  y = writeHeading(doc, "18.  ASSIGNMENT AND SUBLETTING", y);
  y = writeBody(doc, "Tenant shall not assign this Lease or sublease the Premises without the prior written consent of the Landlord, which shall not be unreasonably withheld.", y);
  y += 2;

  y = writeHeading(doc, "19.  NOTICES", y);
  y = writeBody(doc, "All notices shall be in writing and shall be delivered personally or sent via certified mail, return receipt requested, to the addresses listed below, or such other addresses as either Party may designate:", y);
  y = writeBullet(doc, `Landlord: ${values.party1Name || "[Insert Landlord Name]"}, ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`, y);
  y = writeBullet(doc, `Tenant: ${values.party2Name || "[Insert Tenant Name]"}, ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`, y);
  y += 2;

  y = writeHeading(doc, "20.  GOVERNING LAW", y);
  y = writeBody(doc, `This Lease shall be governed by and construed in accordance with the laws of the State of ${values.state || "[Insert State]"}.`, y);
  y += 2;

  y = writeHeading(doc, "21.  ENTIRE AGREEMENT", y);
  y = writeBody(doc, "This Lease constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior agreements or understandings, oral or written.", y);
  y += 2;

  y = writeHeading(doc, "22.  AMENDMENT", y);
  y = writeBody(doc, "This Lease may only be amended in writing, signed by both Parties.", y);
  y += 2;

  y = writeHeading(doc, "23.  SEVERABILITY", y);
  y = writeBody(doc, "If any provision of this Lease is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.", y);
  y += 2;

  y = writeHeading(doc, "24.  WAIVER", y);
  y = writeBody(doc, "No waiver of any term or condition of this Lease shall be deemed to be a continuing waiver or a waiver of any other term or condition.", y);
  y += 2;

  y = writeHeading(doc, "25.  BINDING EFFECT", y);
  y = writeBody(doc, "This Lease shall be binding upon and shall inure to the benefit of the Parties and their respective successors, legal representatives, and permitted assigns.", y);
  y += 2;

  if (values.confidentiality === "yes") {
    y = writeHeading(doc, "26.  CONFIDENTIALITY", y);
    y = writeBody(doc, "Both Parties agree to keep the terms of this Lease and all related information strictly confidential and shall not disclose such information to any third party without prior written consent of the other Party.", y);
    y += 2;
  }

  if (values.additionalTerms) {
    y = writeHeading(doc, "ADDITIONAL TERMS", y);
    y = writeBody(doc, values.additionalTerms, y);
    y += 2;
  }

  // ── SIGNATURES ────────────────────────────────────────────────────────────
  y = checkY(doc, y, LINE_H * 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  y = writeBody(doc, "IN WITNESS WHEREOF, the Parties have executed this Lease as of the date first above written.", y);
  y += 4;

  y = writeSigBlock(doc, "LANDLORD:", values.party1Name, values.party1Signature, y);
  y += 4;
  y = writeSigBlock(doc, "TENANT:", values.party2Name, values.party2Signature, y);

  if (values.witnessName) {
    y += 4;
    y = writeSigBlock(doc, "WITNESS:", values.witnessName, "", y);
  }

  doc.save("triple_net_lease.pdf");
};

export default function TripleNetLease() {
  return (
    <FormWizard
      steps={steps}
      title="Triple Net Lease"
      subtitle="Complete each step to generate your Triple Net Lease Agreement"
      onGenerate={generatePDF}
      documentType="triplenetlease"
    />
  );
}
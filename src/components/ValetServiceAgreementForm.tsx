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
              { value: "QLD", label: "Queensland" }, { value: "WA",  label: "Western Australia" },
              { value: "SA",  label: "South Australia" }, { value: "TAS", label: "Tasmania" },
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
    label: "First Party Name",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the first party?",
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
          { value: "business",   label: "Business/Company" },
        ],
      },
    ],
  },
  {
    label: "First Party Address",
    fields: [
      { name: "party1Street", label: "Street Address",    type: "text", required: true,  placeholder: "123 Main Street" },
      { name: "party1City",   label: "City",               type: "text", required: true,  placeholder: "City" },
      { name: "party1Zip",    label: "ZIP/Postal Code",    type: "text", required: true,  placeholder: "ZIP Code" },
    ],
  },
  {
    label: "First Party Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number",  type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Second Party Name",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the second party?",
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
          { value: "business",   label: "Business/Company" },
        ],
      },
    ],
  },
  {
    label: "Second Party Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true,  placeholder: "123 Main Street" },
      { name: "party2City",   label: "City",            type: "text", required: true,  placeholder: "City" },
      { name: "party2Zip",    label: "ZIP/Postal Code", type: "text", required: true,  placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Second Party Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number",  type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Agreement Details",
    fields: [
      {
        name: "description",
        label: "Describe the purpose and scope of this agreement",
        type: "textarea",
        required: true,
        placeholder: "Provide a detailed description of the agreement terms...",
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
          { value: "1month",     label: "1 Month" },
          { value: "3months",    label: "3 Months" },
          { value: "6months",    label: "6 Months" },
          { value: "1year",      label: "1 Year" },
          { value: "2years",     label: "2 Years" },
          { value: "5years",     label: "5 Years" },
          { value: "indefinite", label: "Indefinite/Ongoing" },
          { value: "custom",     label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice",
        label: "How much notice is required to terminate?",
        type: "select",
        required: true,
        options: [
          { value: "immediate", label: "Immediate" },
          { value: "7days",     label: "7 Days" },
          { value: "14days",    label: "14 Days" },
          { value: "30days",    label: "30 Days" },
          { value: "60days",    label: "60 Days" },
          { value: "90days",    label: "90 Days" },
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
          { value: "onetime",   label: "One-time Payment" },
          { value: "weekly",    label: "Weekly" },
          { value: "biweekly",  label: "Bi-weekly" },
          { value: "monthly",   label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "annually",  label: "Annually" },
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
          { value: "no",  label: "No - Not needed" },
        ],
      },
      {
        name: "disputeResolution",
        label: "How should disputes be resolved?",
        type: "select",
        required: true,
        options: [
          { value: "mediation",   label: "Mediation" },
          { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation",  label: "Court Litigation" },
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
        label: "First Party Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Second Party Signature (Type full legal name)",
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

// ─── PDF layout constants ────────────────────────────────────────────────────
const PAGE_H      = 297;  // A4 height mm
const MARGIN_TOP  = 18;
const MARGIN_BTM  = 18;
const MARGIN_LEFT = 20;
const CONTENT_W   = 170; // usable line width mm

// ─── PDF helper functions ────────────────────────────────────────────────────

/** Opens a new page and resets the Y cursor to the top margin. */
function newPage(doc: jsPDF): number {
  doc.addPage();
  return MARGIN_TOP;
}

/** Draws a thin horizontal divider and returns updated Y. */
function rule(doc: jsPDF, y: number): number {
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_LEFT, y, MARGIN_LEFT + CONTENT_W, y);
  return y + 4;
}

/**
 * Renders a bold section heading.
 * Forces a new page when fewer than 14 mm remain.
 */
function heading(doc: jsPDF, text: string, y: number): number {
  if (y > PAGE_H - MARGIN_BTM - 14) y = newPage(doc);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, MARGIN_LEFT, y);
  return y + 7;
}

/**
 * Renders a wrapped normal body paragraph.
 * Moves to a new page whenever a line would overflow the bottom margin.
 */
function body(doc: jsPDF, text: string, y: number, indent = 0): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, CONTENT_W - indent);
  for (const line of lines) {
    if (y > PAGE_H - MARGIN_BTM) y = newPage(doc);
    doc.text(line, MARGIN_LEFT + indent, y);
    y += 5;
  }
  return y + 1;
}

/**
 * Renders a single bullet item with a hanging indent.
 * Handles multi-line wrapping and page overflow automatically.
 */
function bullet(doc: jsPDF, text: string, y: number): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const bulletX = MARGIN_LEFT + 4;
  const textX   = MARGIN_LEFT + 10;
  const lines   = doc.splitTextToSize(text, CONTENT_W - 10);
  if (y > PAGE_H - MARGIN_BTM) y = newPage(doc);
  doc.text("\u2022", bulletX, y);
  doc.text(lines[0], textX, y);
  y += 5;
  for (let i = 1; i < lines.length; i++) {
    if (y > PAGE_H - MARGIN_BTM) y = newPage(doc);
    doc.text(lines[i], textX, y);
    y += 5;
  }
  return y + 1;
}

// ─── Main PDF generator ───────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN_TOP;

  // ── Document title ──────────────────────────────────────────────────────
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("VALET SERVICE AGREEMENT", 105, y, { align: "center" });
  y += 8;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Effective Date: ${values.effectiveDate || "___________"}     |     Jurisdiction: ${values.state || "___"}, ${(values.country || "").toUpperCase()}`,
    105, y, { align: "center" }
  );
  y += 5;
  y = rule(doc, y);

  // ── Preamble / Parties ──────────────────────────────────────────────────
  y = body(doc,
    `This Valet Service Agreement ("Agreement") is made and entered into as of ${values.effectiveDate || "___________"} ("Effective Date"), by and between:`,
    y
  );
  y += 2;

  doc.setFont("helvetica", "bold");
  doc.text("CLIENT (FIRST PARTY)", MARGIN_LEFT, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.party1Name    || "______________________________"}`, MARGIN_LEFT + 4, y); y += 5;
  doc.text(
    `Address: ${values.party1Street || "______________________________"}, ${values.party1City || "____________"} ${values.party1Zip || "_______"}`,
    MARGIN_LEFT + 4, y
  ); y += 5;
  doc.text(
    `Email:   ${values.party1Email || "______________________________"}   Phone: ${values.party1Phone || "______________________________"}`,
    MARGIN_LEFT + 4, y
  );
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("SERVICE PROVIDER (SECOND PARTY)", MARGIN_LEFT, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.party2Name    || "______________________________"}`, MARGIN_LEFT + 4, y); y += 5;
  doc.text(
    `Address: ${values.party2Street || "______________________________"}, ${values.party2City || "____________"} ${values.party2Zip || "_______"}`,
    MARGIN_LEFT + 4, y
  ); y += 5;
  doc.text(
    `Email:   ${values.party2Email || "______________________________"}   Phone: ${values.party2Phone || "______________________________"}`,
    MARGIN_LEFT + 4, y
  );
  y += 7;

  doc.setFont("helvetica", "italic");
  doc.text(`(Hereinafter collectively referred to as the "Parties.")`, MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  y += 6;
  y = rule(doc, y);

  // ── SECTION 1 – PURPOSE OF AGREEMENT ────────────────────────────────────
  y = heading(doc, "1. PURPOSE OF AGREEMENT", y);
  y = body(doc,
    "The Client hereby engages the Provider to supply professional valet parking services for the Client's event(s), and the Provider agrees to perform such services in accordance with the terms and conditions set forth in this Agreement.",
    y
  );
  y += 2;

  // ── SECTION 2 – DESCRIPTION OF SERVICES ─────────────────────────────────
  y = heading(doc, "2. DESCRIPTION OF SERVICES", y);
  y = body(doc,
    `2.1  The Provider shall provide valet parking services ("Services") for automobiles and motorcycles belonging to the Client's guests, patrons, and invitees.`,
    y
  );
  y = body(doc, "2.2  The Services shall include, but are not limited to:", y);
  y = bullet(doc, "Receiving and parking vehicles in a safe and orderly manner", y);
  y = bullet(doc, "Returning vehicles to their owners upon request", y);
  y = bullet(doc, "Managing traffic flow in designated parking areas", y);
  y = bullet(doc, "Providing clear directional and informational signage", y);
  y = bullet(doc, "Staffing the event with trained and qualified valet attendants", y);
  y = body(doc,
    "2.3  The Provider shall ensure that all services are rendered professionally, courteously, and in compliance with industry standards.",
    y
  );
  y += 2;

  // ── SECTION 3 – PERFORMANCE OF SERVICES ─────────────────────────────────
  y = heading(doc, "3. PERFORMANCE OF SERVICES", y);
  y = body(doc,
    "3.1  Prior to commencement of services, the Provider and Client shall jointly inspect the parking area. Any existing damage or hazardous conditions shall be documented.",
    y
  );
  y = body(doc, "3.2  Upon completion of the event, a post-service inspection shall be conducted.", y);
  y = body(doc,
    "3.3  Any damage, excessive cleaning, or loss caused by the Client, its guests, or invitees shall be the sole responsibility of the Client.",
    y
  );
  y = body(doc,
    "3.4  The Provider shall make reasonable efforts to ensure timely arrival and efficient service. Any delay shall be communicated promptly to the Client.",
    y
  );
  y += 2;

  // ── SECTION 4 – PAYMENT TERMS ────────────────────────────────────────────
  y = heading(doc, "4. PAYMENT TERMS", y);
  y = body(doc,
    `4.1  The Client agrees to pay the Provider ${values.paymentAmount ? values.paymentAmount : "$__________"} for the Services${values.paymentSchedule ? " (" + values.paymentSchedule + ")" : ""}.`,
    y
  );
  y = body(doc,
    "4.2  Payment shall be made upon completion of the Services unless otherwise agreed in writing.",
    y
  );
  y = body(doc,
    "4.3  Additional service time, overtime, or special requests shall be billed at an agreed hourly rate.",
    y
  );
  y = body(doc,
    "4.4  Late payments shall accrue interest at the maximum rate permitted by applicable law.",
    y
  );
  y += 2;

  // ── SECTION 5 – DEPOSIT ──────────────────────────────────────────────────
  y = heading(doc, "5. DEPOSIT", y);
  y = body(doc,
    "5.1  A deposit shall be paid upon execution of this Agreement as separately agreed in writing.",
    y
  );
  y = body(doc,
    "5.2  The deposit may be applied to damages, cleaning, overtime, or other costs incurred.",
    y
  );
  y = body(doc,
    "5.3  Any unused portion of the deposit shall be refunded within the number of days agreed following completion of the Services.",
    y
  );
  y += 2;

  // ── SECTION 6 – TERM OF AGREEMENT ───────────────────────────────────────
  y = heading(doc, "6. TERM OF AGREEMENT", y);
  y = body(doc,
    `6.1  This Agreement shall commence on ${values.effectiveDate || "the Effective Date"} and remain in effect for ${values.duration || "the agreed duration"}, unless earlier terminated as provided herein.`,
    y
  );
  y = body(doc,
    "6.2  The term may be extended or modified only by mutual written agreement of the Parties.",
    y
  );
  y += 2;

  // ── SECTION 7 – TERMINATION ──────────────────────────────────────────────
  y = heading(doc, "7. TERMINATION", y);
  y = body(doc,
    `7.1  Either Party may terminate this Agreement with ${values.terminationNotice || "30 days'"} written notice.`,
    y
  );
  y = body(doc,
    "7.2  Upon early termination, the Provider shall be entitled to payment for all Services rendered up to the termination date.",
    y
  );
  y = body(doc,
    "7.3  If termination occurs due to breach, the non-breaching Party shall be entitled to all available remedies under law.",
    y
  );
  y += 2;

  // ── SECTION 8 – RELATIONSHIP OF THE PARTIES ──────────────────────────────
  y = heading(doc, "8. RELATIONSHIP OF THE PARTIES", y);
  y = body(doc,
    "8.1  The Provider is an independent contractor and not an employee, agent, or partner of the Client.",
    y
  );
  y = body(doc,
    "8.2  The Client shall not be responsible for wages, taxes, insurance, or benefits related to the Provider or its employees.",
    y
  );
  y = body(doc,
    "8.3  The Provider shall maintain appropriate insurance coverage and provide proof upon request.",
    y
  );
  y += 2;

  // ── SECTION 9 – COMPLIANCE WITH LAWS ─────────────────────────────────────
  y = heading(doc, "9. COMPLIANCE WITH LAWS", y);
  y = body(doc,
    "9.1  The Provider shall comply with all applicable federal, state, and local laws, ordinances, and regulations.",
    y
  );
  y = body(doc,
    "9.2  The Provider shall obtain and maintain all necessary permits and licenses required to perform valet services.",
    y
  );
  y += 2;

  // ── SECTION 10 – PARKING AREA CONDITIONS ─────────────────────────────────
  y = heading(doc, "10. PARKING AREA CONDITIONS", y);
  y = body(doc, "10.1  The Client shall designate a suitable parking area with adequate capacity.", y);
  y = body(doc, `10.2  The Provider accepts the parking area in its "as-is" condition.`, y);
  y = body(doc,
    "10.3  The Provider shall not alter the parking area without prior written consent from the Client.",
    y
  );
  y = body(doc, "10.4  The Provider shall:", y);
  y = bullet(doc, "Prevent overnight parking", y);
  y = bullet(doc, "Prohibit vehicle repairs on-site", y);
  y = bullet(doc, "Ensure cleanliness and safety at all times", y);
  y = bullet(doc, "Remove all trash and debris after the event", y);
  y += 2;

  // ── SECTION 11 – INDEMNIFICATION ─────────────────────────────────────────
  y = heading(doc, "11. INDEMNIFICATION", y);
  y = body(doc,
    "11.1  The Provider agrees to indemnify, defend, and hold harmless the Client from all claims, damages, losses, liabilities, costs, and expenses arising from:",
    y
  );
  y = bullet(doc, "Acts or omissions of the Provider or its personnel", y);
  y = bullet(doc, "Negligence or misconduct", y);
  y = bullet(doc, "Property damage or bodily injury related to the Services", y);
  y = body(doc,
    "11.2  The Client agrees to indemnify the Provider for damages arising from guest misconduct or unsafe premises conditions.",
    y
  );
  y += 2;

  // ── SECTION 12 – WARRANTY AND STANDARD OF CARE ───────────────────────────
  y = heading(doc, "12. WARRANTY AND STANDARD OF CARE", y);
  y = body(doc,
    "12.1  The Provider warrants that all Services shall be performed in a professional, skillful, and lawful manner.",
    y
  );
  y = body(doc,
    "12.2  The Provider represents that all personnel are properly trained and qualified.",
    y
  );
  y += 2;

  // ── SECTION 13 – DEFAULT ─────────────────────────────────────────────────
  y = heading(doc, "13. DEFAULT", y);
  y = body(doc, "The following shall constitute a material default:", y);
  y = bullet(doc, "Failure to make payment when due", y);
  y = bullet(doc, "Insolvency or bankruptcy of either Party", y);
  y = bullet(doc, "Failure to perform contractual obligations", y);
  y = bullet(doc, "Seizure or attachment of property", y);
  y += 2;

  // ── SECTION 14 – REMEDIES ────────────────────────────────────────────────
  y = heading(doc, "14. REMEDIES", y);
  y = body(doc,
    "14.1  The non-defaulting Party may provide written notice specifying the breach.",
    y
  );
  y = body(doc,
    "14.2  The defaulting Party shall have a reasonable number of days to cure the breach, as specified in the written notice.",
    y
  );
  y = body(doc,
    "14.3  Failure to cure shall result in termination and pursuit of all available legal remedies.",
    y
  );
  y += 2;

  // ── SECTION 15 – FORCE MAJEURE ───────────────────────────────────────────
  y = heading(doc, "15. FORCE MAJEURE", y);
  y = body(doc,
    "Neither Party shall be liable for failure or delay due to events beyond reasonable control, including but not limited to natural disasters, government actions, labor disputes, or emergencies.",
    y
  );
  y += 2;

  // ── SECTION 16 – ARBITRATION ─────────────────────────────────────────────
  y = heading(doc, "16. ARBITRATION", y);
  y = body(doc,
    `16.1  Any dispute arising out of or related to this Agreement shall be resolved through ${values.disputeResolution === "arbitration" ? "binding arbitration" : values.disputeResolution || "binding arbitration"}.`,
    y
  );
  y = body(doc,
    "16.2  Arbitration shall be conducted in accordance with the rules of the American Arbitration Association.",
    y
  );
  y = body(doc, "16.3  The arbitrator's decision shall be final and binding.", y);
  y += 2;

  // ── SECTION 17 – GOVERNING LAW ───────────────────────────────────────────
  y = heading(doc, "17. GOVERNING LAW", y);
  y = body(doc,
    `This Agreement shall be governed and construed in accordance with the laws of the State of ${values.state || "_______________"}, ${(values.country || "").toUpperCase()}.`,
    y
  );
  y += 2;

  // ── SECTION 18 – ENTIRE AGREEMENT ────────────────────────────────────────
  y = heading(doc, "18. ENTIRE AGREEMENT", y);
  y = body(doc,
    "This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations or understandings.",
    y
  );
  y += 2;

  // ── SECTION 19 – SEVERABILITY ────────────────────────────────────────────
  y = heading(doc, "19. SEVERABILITY", y);
  y = body(doc,
    "If any provision is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
    y
  );
  y += 2;

  // ── SECTION 20 – AMENDMENT ───────────────────────────────────────────────
  y = heading(doc, "20. AMENDMENT", y);
  y = body(doc,
    "This Agreement may be amended only by written agreement signed by both Parties.",
    y
  );
  y += 2;

  // ── SECTION 21 – NOTICE ──────────────────────────────────────────────────
  y = heading(doc, "21. NOTICE", y);
  y = body(doc,
    "All notices shall be in writing and delivered personally or by certified mail to the addresses listed above.",
    y
  );
  y += 2;

  // ── SECTION 22 – WAIVER ──────────────────────────────────────────────────
  y = heading(doc, "22. WAIVER", y);
  y = body(doc,
    "Failure to enforce any provision shall not constitute a waiver of future enforcement.",
    y
  );
  y += 2;

  // ── SECTION 23 – ASSIGNMENT ──────────────────────────────────────────────
  y = heading(doc, "23. ASSIGNMENT", y);
  y = body(doc,
    "Neither Party may assign or transfer this Agreement without prior written consent of the other Party.",
    y
  );
  y += 2;

  // ── SECTION 24 – CHANGE ORDERS ───────────────────────────────────────────
  y = heading(doc, "24. CHANGE ORDERS", y);
  y = body(doc,
    "Any change in scope or services must be documented in a written change order signed by both Parties.",
    y
  );
  y += 2;

  // ── CONFIDENTIALITY (conditional) ────────────────────────────────────────
  if (values.confidentiality === "yes") {
    y = heading(doc, "CONFIDENTIALITY", y);
    y = body(doc,
      "Each Party agrees to keep confidential all non-public information disclosed by the other Party in connection with this Agreement. This obligation survives termination of the Agreement.",
      y
    );
    y += 2;
  }

  // ── ADDITIONAL TERMS (conditional) ───────────────────────────────────────
  if (values.additionalTerms) {
    y = heading(doc, "ADDITIONAL TERMS AND CONDITIONS", y);
    y = body(doc, values.additionalTerms, y);
    y += 2;
  }

  // ── SECTION 25 – SIGNATURES ──────────────────────────────────────────────
  // Ensure the full signature block has at least 65 mm of breathing room
  if (y > PAGE_H - MARGIN_BTM - 65) y = newPage(doc);
  y = rule(doc, y);
  y = heading(doc, "25. SIGNATURES", y);
  y = body(doc,
    "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.",
    y
  );
  y += 6;

  // Client signature block
  doc.setFont("helvetica", "bold");
  doc.text("CLIENT", MARGIN_LEFT, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.party1Name      || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Signature: ${values.party1Signature || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Date:      ${new Date().toLocaleDateString()}`,                            MARGIN_LEFT, y);
  y += 10;

  // Service Provider signature block
  doc.setFont("helvetica", "bold");
  doc.text("SERVICE PROVIDER", MARGIN_LEFT, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.party2Name      || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Signature: ${values.party2Signature || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Date:      ${new Date().toLocaleDateString()}`,                            MARGIN_LEFT, y);
  y += 10;

  // Optional witness block
  if (values.witnessName) {
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS", MARGIN_LEFT, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Name:      ${values.witnessName}`,          MARGIN_LEFT, y); y += 6;
    doc.text("Signature: ______________________________", MARGIN_LEFT, y); y += 6;
    doc.text(`Date:      ${new Date().toLocaleDateString()}`, MARGIN_LEFT, y);
  }

  doc.save("valet_service_agreement.pdf");
};

export default function ValetServiceAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Valet Service Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="valetserviceagreement"
    />
  );
}
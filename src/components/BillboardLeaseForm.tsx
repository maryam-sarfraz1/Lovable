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
        options: [{ value: "us", label: "United States" }],
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
      { name: "effectiveDate", label: "What is the effective date of this agreement?", type: "date", required: true },
    ],
  },
  {
    label: "Landlord Name",
    fields: [
      { name: "party1Name", label: "What is the full legal name of the Landlord?", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party1Type", label: "Is the Landlord an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
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
    label: "Billboard Owner Name",
    fields: [
      { name: "party2Name", label: "What is the full legal name of the Billboard Owner?", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party2Type", label: "Is the Billboard Owner an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
    ],
  },
  {
    label: "Billboard Owner Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Billboard Owner Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Premises Details",
    fields: [
      { name: "premisesAddress", label: "Physical address of the billboard premises", type: "text", required: true, placeholder: "123 Billboard Road, City, State" },
      { name: "legalDescription", label: "Legal description of the premises", type: "textarea", required: true, placeholder: "Lot 5, Block 12, Example Subdivision..." },
    ],
  },
  {
    label: "Lease Term",
    fields: [
      { name: "startDate", label: "Lease start date", type: "date", required: true },
      { name: "endDate", label: "Lease end date", type: "date", required: true },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "annualRent", label: "Annual rent amount", type: "text", required: true, placeholder: "$0.00" },
      { name: "monthlyRent", label: "Monthly installment amount", type: "text", required: true, placeholder: "$0.00" },
      { name: "paymentAddress", label: "Payment mailing address", type: "text", required: true, placeholder: "123 Payment Ave, City, State ZIP" },
    ],
  },
  {
    label: "Billboard Details",
    fields: [
      { name: "billboardCount", label: "Maximum number of billboards permitted", type: "text", required: true, placeholder: "1" },
      { name: "maintenanceDays", label: "Days allowed to cure maintenance failure (after written notice)", type: "text", required: true, placeholder: "30" },
    ],
  },
  {
    label: "Termination Terms",
    fields: [
      { name: "curePeriod", label: "Breach cure period (days)", type: "text", required: true, placeholder: "30" },
      { name: "ownerTerminationNotice", label: "Notice period for Billboard Owner to terminate (days)", type: "text", required: true, placeholder: "60" },
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
          { value: "mediation", label: "Mediation" }, { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation", label: "Court Litigation" }, { value: "negotiation", label: "Good Faith Negotiation First" },
        ],
      },
      { name: "additionalTerms", label: "Any additional terms or special conditions?", type: "textarea", required: false, placeholder: "Enter any additional terms, conditions, or special provisions..." },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      { name: "party1Signature", label: "Landlord Signature (Type full legal name)", type: "text", required: true, placeholder: "Type full legal name as signature" },
      { name: "party2Signature", label: "Billboard Owner Signature (Type full legal name)", type: "text", required: true, placeholder: "Type full legal name as signature" },
      { name: "witnessName", label: "Witness Name (Optional)", type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ─── Shared helpers ───────────────────────────────────────────────────────────

const today = () =>
  new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

// ─── Fixed two-column signature block ────────────────────────────────────────
// Party 1 on left, Party 2 on right. Typed signature ON the line.
const addTwoColSig = (
  doc: jsPDF,
  label1: string, name1: string, sig1: string,
  label2: string, name2: string, sig2: string,
  y: number,
  pageH: number
): number => {
  if (y > pageH - 50) { doc.addPage(); y = 60; }

  const col1 = 60;
  const col2 = 60 + 246;
  const lineLen = 200;
  const todayStr = today();

  // Labels
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(label1, col1, y);
  doc.text(label2, col2, y);
  y += 18;

  // Signature lines
  doc.setFont("helvetica", "normal");
  doc.text("Signature:", col1, y);
  doc.text("Signature:", col2, y);
  const sigLW = doc.getTextWidth("Signature: ");
  // Left typed sig
  if (sig1) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(sig1, col1 + sigLW + 1, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  }
  // Right typed sig
  if (sig2) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(sig2, col2 + sigLW + 1, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  }
  doc.setLineWidth(0.4);
  doc.line(col1 + sigLW, y + 1, col1 + sigLW + lineLen, y + 1);
  doc.line(col2 + sigLW, y + 1, col2 + sigLW + lineLen, y + 1);
  y += 16;

  // Printed names
  doc.text(`Name: ${name1 || ""}`, col1, y);
  doc.text(`Name: ${name2 || ""}`, col2, y);
  y += 14;

  // Date
  doc.text(`Date: ${todayStr}`, col1, y);
  doc.text(`Date: ${todayStr}`, col2, y);
  y += 20;

  return y;
};

// Single-column witness block
const addSingleSig = (
  doc: jsPDF,
  label: string, name: string, sig: string,
  y: number,
  pageH: number,
  x = 60
): number => {
  if (y > pageH - 40) { doc.addPage(); y = 60; }
  const lineLen = 200;
  const todayStr = today();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(label, x, y);
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.text("Signature:", x, y);
  const sigLW = doc.getTextWidth("Signature: ");
  if (sig) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(sig, x + sigLW + 1, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  }
  doc.setLineWidth(0.4);
  doc.line(x + sigLW, y + 1, x + sigLW + lineLen, y + 1);
  y += 14;

  doc.text(`Name: ${name || ""}`, x, y);
  y += 14;
  doc.text(`Date: ${todayStr}`, x, y);
  y += 20;

  return y;
};

// ─── PDF Generator ────────────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = 612;
  const marginL = 60;
  const marginR = 60;
  const contentW = pageW - marginL - marginR;
  const pageH = 792;
  const bottomMargin = 60;
  let y = 60;

  const checkPage = (needed = 14) => {
    if (y + needed > pageH - bottomMargin) { doc.addPage(); y = 60; }
  };

  const addHeading = (text: string) => {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(text, marginL, y);
    y += 16;
  };

  const addParagraph = (text: string, indent = 0) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentW - indent);
    lines.forEach((line: string) => { checkPage(13); doc.text(line, marginL + indent, y); y += 13; });
    y += 4;
  };

  const addBullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const bulletX = marginL + 12;
    const textX = marginL + 24;
    const lines = doc.splitTextToSize(text, contentW - 24);
    checkPage(13);
    doc.text("\u2022", bulletX, y);
    doc.text(lines[0], textX, y);
    y += 13;
    for (let i = 1; i < lines.length; i++) { checkPage(13); doc.text(lines[i], textX, y); y += 13; }
    y += 3;
  };

  const space = (n = 8) => { y += n; };

  // ─── TITLE ───────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("BILLBOARD LEASE AGREEMENT", pageW / 2, y, { align: "center" });
  y += 28;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  addParagraph(`This Billboard Lease Agreement ("Agreement") is made and entered into as of ${values.effectiveDate || "[Insert Date]"}, by and between`);
  addParagraph(`${values.party1Name || "[Insert Landlord's Full Legal Name]"}, having a principal address at ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""} ("Landlord"),`);
  addParagraph("And");
  addParagraph(`${values.party2Name || "[Insert Billboard Owner's Full Legal Name]"}, having a principal address at ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""} ("Billboard Owner").`);
  addParagraph(`Landlord and Billboard Owner may collectively be referred to as the "Parties."`);
  space();

  addHeading("1.  Lease");
  addParagraph(`Landlord hereby leases to Billboard Owner a portion of the property described herein ("Premises"), on the terms and conditions set forth in this Agreement.`);
  space();

  addHeading("2.  Description of Leased Premises");
  addParagraph(`The Premises consists of a designated area located at ${values.premisesAddress || "[Insert Physical Address]"}, legally described as ${values.legalDescription || "[Insert Legal Description]"}, solely for the purpose of erecting, operating, and maintaining a billboard ("Display"). Billboard Owner is granted exclusive use of said area for this purpose. Landlord retains the right to use or lease all other portions of the property.`);
  space();

  addHeading("3.  Term");
  addParagraph(`The term of this Lease shall commence on ${values.startDate || "[Insert Start Date]"} and shall expire on ${values.endDate || "[Insert End Date]"} (the "Term"), unless terminated earlier as provided herein.`);
  space();

  addHeading("4.  Rent");
  addParagraph(`Billboard Owner shall pay to Landlord rent in the amount of ${values.annualRent || "$0.00"} per year, payable in equal monthly installments of ${values.monthlyRent || "$0.00"}, in advance on the first day of each month, beginning on ${values.startDate || "[Insert Start Date]"}. Payments shall be made at ${values.paymentAddress || "[Insert Payment Address]"} or any other address designated in writing by Landlord.`);
  space();

  addHeading("5.  Use of Premises");
  addParagraph(`Billboard Owner shall be entitled to construct and maintain no more than ${values.billboardCount || "[Insert Number]"} billboard(s) on the Premises. No other use of the Premises is permitted.`);
  space();

  addHeading("6.  Access");
  addParagraph(`Landlord hereby grants Billboard Owner and its authorized representatives reasonable access to the Premises at all times during the Term for the erection, maintenance, repair, and inspection of the Display.`);
  space();

  addHeading("7.  Electrical Supply");
  addParagraph(`Billboard Owner shall arrange for and bear the cost of supplying electrical power to the Display and shall be solely responsible for all utility expenses associated with its installation and use.`);
  space();

  addHeading("8.  Maintenance of Display");
  addParagraph(`Billboard Owner shall, at its sole cost, maintain the Display and associated structures in a safe, clean, and attractive condition. Billboard Owner shall promptly repair any damage caused by weather, vandalism, graffiti, or other causes. If Billboard Owner fails to perform such maintenance within ${values.maintenanceDays || "[Insert Number]"} days following written notice from Landlord, Landlord may, at its option, perform the necessary repairs and recover the cost from Billboard Owner, or remove the Display entirely at Billboard Owner's expense.`);
  space();

  addHeading("9.  Compliance with Laws");
  addParagraph(`Billboard Owner shall, at its own expense, comply with all applicable federal, state, and local laws, ordinances, regulations, and codes in connection with the use and maintenance of the Premises and the Display. A final judgment or admission of non-compliance shall constitute grounds for termination by Landlord.`);
  space();

  addHeading("10.  Taxes");
  addParagraph(`Billboard Owner shall pay all applicable federal, state, and local taxes, assessments, and fees associated with the Display, including any taxes levied on its personal property.`);
  space();

  addHeading("11.  Condition and Alterations");
  addParagraph(`Billboard Owner accepts the Premises in its "as-is" condition and agrees to maintain it in such condition (or better) throughout the Term. No alterations or improvements shall be made without the prior written consent of Landlord.`);
  space();

  addHeading("12.  Ownership of Display");
  addParagraph(`The Display shall remain the personal property of Billboard Owner and shall not be considered a fixture or improvement. Upon termination or expiration of this Agreement, Billboard Owner shall remove the Display and restore the Premises to its original condition, free of debris or remnants.`);
  space();

  addHeading("13.  Indemnification and Insurance");
  addParagraph(`Billboard Owner shall indemnify, defend, and hold Landlord harmless from any and all claims, losses, liabilities, or damages arising from Billboard Owner's use or occupancy of the Premises.`);
  addParagraph("Billboard Owner shall, at its sole expense, maintain throughout the Term:");
  addBullet("(a) Commercial General Liability Insurance naming Landlord as an additional insured, covering personal injury and property damage, in amounts not less than those required by applicable law.");
  addBullet("(b) Fire and casualty insurance for any damage caused to the Premises or surrounding property by Billboard Owner or the Display.");
  addParagraph(`Proof of such coverage shall be furnished to Landlord upon request and prior to occupancy.`);
  space();

  addHeading("14.  Option to Renew");
  addParagraph(`Billboard Owner shall have the option to renew this Agreement for an additional term upon giving Landlord written notice at least six (6) months prior to the expiration of the initial Term. Renewal shall be on terms mutually agreed upon in writing.`);
  space();

  addHeading("15.  Termination by Landlord");
  addParagraph(`Landlord may terminate this Agreement upon written notice to Billboard Owner if Billboard Owner breaches any covenant, condition, or provision herein and fails to cure such breach within ${values.curePeriod || "[Insert Cure Period]"} days of notice. Upon termination, Landlord may re-enter the Premises in accordance with applicable law and recover damages, including unpaid rent and any other losses resulting from Billboard Owner's breach.`);
  space();

  addHeading("16.  Termination by Billboard Owner");
  addParagraph(`Billboard Owner may terminate this Agreement by giving Landlord ${values.ownerTerminationNotice || "[Insert Number]"} days' prior written notice if any law, ordinance, or regulation is enacted or enforced that materially restricts Billboard Owner's ability to use the Premises for billboard purposes as contemplated herein.`);
  space();

  addHeading("17.  Notices");
  addParagraph(`All notices required under this Agreement shall be in writing and delivered personally, by certified mail, or by a recognized overnight courier to the addresses of the parties stated above (or such other address as either party may designate in writing). Notices shall be effective upon delivery or attempted delivery.`);
  space();

  addHeading("18.  Time of the Essence");
  addParagraph(`Time is of the essence with respect to all provisions of this Agreement.`);
  space();

  addHeading("19.  Governing Law");
  addParagraph(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${values.state || "[Insert State]"}.`);
  space();

  addHeading("20.  Attorneys' Fees");
  addParagraph(`In the event of any dispute or legal action arising out of this Agreement, the prevailing party shall be entitled to recover its reasonable attorneys' fees and costs from the non-prevailing party.`);
  space();

  addHeading("21.  Entire Agreement");
  addParagraph(`This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, discussions, or agreements, whether oral or written.`);
  space();

  addHeading("22.  Severability");
  addParagraph(`If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be severed, and the remaining provisions shall remain in full force and effect.`);
  space();

  addHeading("23.  Amendment");
  addParagraph(`This Agreement may only be amended in a written document signed by both Parties.`);

  if (values.additionalTerms) {
    space();
    addHeading("Additional Terms");
    addParagraph(values.additionalTerms);
  }

  // ─── SIGNATURES ──────────────────────────────────────────────────────────
  checkPage(120);
  space(10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(
    "IN WITNESS WHEREOF, the parties hereto have executed this Billboard Lease Agreement as of the date first written above.",
    marginL, y, { maxWidth: contentW }
  );
  y += 28;

  y = addTwoColSig(
    doc,
    "LANDLORD:", values.party1Name || "", values.party1Signature || "",
    "BILLBOARD OWNER:", values.party2Name || "", values.party2Signature || "",
    y, pageH
  );

  if (values.witnessName) {
    y = addSingleSig(doc, "WITNESS:", values.witnessName, "", y, pageH, marginL);
  }

  // ─── MAKE IT LEGAL ───────────────────────────────────────────────────────
  checkPage(80);
  space(10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Make It Legal", marginL, y);
  y += 4;
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  const mlWidth = doc.getTextWidth("Make It Legal");
  doc.line(marginL, y, marginL + mlWidth, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lines1 = doc.splitTextToSize("This Agreement should be signed in front of a notary public. Once signed, this document should be delivered to the appropriate court for filing.", contentW);
  lines1.forEach((line: string) => { checkPage(13); doc.text(line, marginL, y); y += 13; });
  y += 4;

  checkPage(60);
  space(4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Copies", marginL, y);
  y += 4;
  const copiesWidth = doc.getTextWidth("Copies");
  doc.line(marginL, y, marginL + copiesWidth, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const bulletItems = [
    "The original Agreement should be filed with the Clerk of Court or delivered to the requesting business.",
    "The Landlord and Billboard Owner should each retain a copy of the signed Agreement in a safe and accessible place.",
  ];
  bulletItems.forEach((text) => {
    const bLines = doc.splitTextToSize(text, contentW - 24);
    checkPage(13);
    doc.text("\u2022", marginL + 12, y);
    doc.text(bLines[0], marginL + 24, y);
    y += 13;
    for (let i = 1; i < bLines.length; i++) { checkPage(13); doc.text(bLines[i], marginL + 24, y); y += 13; }
    y += 3;
  });

  doc.save("billboard_lease_agreement.pdf");
};

export default function BillboardLease() {
  return (
    <FormWizard
      steps={steps}
      title="Billboard Lease Agreement"
      subtitle="Complete each step to generate your legal document"
      onGenerate={generatePDF}
      documentType="billboardlease"
    />
  );
}
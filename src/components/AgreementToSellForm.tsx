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
    label: "Seller Details",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of the Seller",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Seller an individual or a business?",
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
    label: "Seller Address",
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
    label: "Seller Contact",
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
    label: "Buyer Details",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of the Buyer",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Buyer an individual or a business?",
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
    label: "Buyer Address",
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
    label: "Buyer Contact",
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
    label: "Property Details",
    fields: [
      {
        name: "propertyDescription",
        label: "Description of the Demised Property",
        type: "textarea",
        required: true,
        placeholder: "e.g. Commercial unit on 2nd floor, Plot No. 5, Block B, Main Boulevard...",
      },
      {
        name: "scheduleNumber",
        label: "Schedule number for property documents",
        type: "text",
        required: true,
        placeholder: "e.g. 1",
      },
    ],
  },
  {
    label: "Sale Price",
    fields: [
      {
        name: "salePriceNumeric",
        label: "Sale Price (numeric, e.g. 500,000)",
        type: "text",
        required: true,
        placeholder: "e.g. 500,000",
      },
      {
        name: "salePriceWords",
        label: "Sale Price in words",
        type: "text",
        required: true,
        placeholder: "e.g. Five Hundred Thousand",
      },
      {
        name: "possessionYears",
        label: "Years within which vacant possession will be handed over",
        type: "text",
        required: true,
        placeholder: "e.g. 2",
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
          { value: "arbitration", label: "Binding Arbitration" },
          { value: "mediation", label: "Mediation" },
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
        label: "Seller Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Buyer Signature (Type full legal name)",
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

// ─── PDF helpers ──────────────────────────────────────────────────────────────

/** Bold section heading — returns updated y. */
const addHeading = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 22) { doc.addPage(); y = 20; }
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, 20, y);
  return y + 7;
};

/** Wrapped body paragraph — returns updated y. */
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

/** Bullet point — returns updated y. */
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

/** Sub-bullet (indented one level deeper) — returns updated y. */
const addSubBullet = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 14) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("\u25E6", 32, y);
  const lines: string[] = doc.splitTextToSize(text, 148);
  for (let i = 0; i < lines.length; i++) {
    if (y > pageH - 14) { doc.addPage(); y = 20; }
    doc.text(lines[i], 38, y);
    if (i < lines.length - 1) y += 5.5;
  }
  return y + 5.5;
};

/** Numbered recital row — returns updated y. */
const addRecital = (doc: jsPDF, roman: string, text: string, y: number, pageH: number): number => {
  if (y > pageH - 14) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(roman, 20, y);
  doc.setFont("helvetica", "normal");
  const lines: string[] = doc.splitTextToSize(text, 155);
  doc.text(lines[0], 32, y);
  y += 5.5;
  for (let i = 1; i < lines.length; i++) {
    if (y > pageH - 14) { doc.addPage(); y = 20; }
    doc.text(lines[i], 32, y);
    y += 5.5;
  }
  return y + 3;
};

// ─── PDF generator ────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const pageH = doc.internal.pageSize.height;
  let y = 20;

  // ── TITLE ──
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("AGREEMENT TO SELL", 105, y, { align: "center" });
  y += 11;

  // ── PREAMBLE ──
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  y = addBody(
    doc,
    `This AGREEMENT TO SELL ("Agreement") is made on this ${values.effectiveDate || "[Effective Date]"} ("Effective Date").`,
    y, pageH
  );
  y += 2;

  doc.setFont("helvetica", "bold");
  doc.text("BY AND BETWEEN", 105, y, { align: "center" });
  y += 8;
  doc.setFont("helvetica", "normal");

  y = addBody(
    doc,
    `${values.party1Name || "[Seller Name]"}, residing at ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""} (hereinafter referred to as the "Seller", which expression shall, where the context so admits, include their respective legal heirs, agents, successors-in-interest and permitted assigns);`,
    y, pageH
  );
  y += 1;

  doc.setFont("helvetica", "bold");
  doc.text("AND", 105, y, { align: "center" });
  y += 8;
  doc.setFont("helvetica", "normal");

  y = addBody(
    doc,
    `${values.party2Name || "[Buyer Name]"}, residing at ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""} (hereinafter referred to as the "Buyer", which expression shall, where the context so admits, include their respective legal heirs, agents, successors-in-interest and permitted assigns).`,
    y, pageH
  );
  y = addBody(doc, '(The Seller and Buyer may individually be referred to as "Party" or collectively as "Parties").', y, pageH);
  y += 3;

  // ── RECITALS ──
  y = addHeading(doc, "RECITALS", y, pageH);
  y = addRecital(doc, "I.", `WHEREAS, the Seller hereby warrants and represents that it is the absolute, rightful and lawful title holder/owner of the ${values.propertyDescription || "[property details]"}.`, y, pageH);
  y = addRecital(doc, "II.", `WHEREAS, the Seller is desirous of selling the commercial property identified as the "Demised Property" to the Buyer and the Buyer is desirous of purchasing the Demised Property, free from all and/or any liens, charges, mortgages, claims, disputes, litigation and/or any other restraints likely to impede the transfer of title ("Encumbrances").`, y, pageH);
  y = addRecital(doc, "III.", "AND WHEREAS, the Parties have agreed to the terms and conditions on which the sale and transfer of the Demised Property shall take place, and each of them wishes to reduce the same in writing.", y, pageH);
  y += 2;

  doc.setFont("helvetica", "bold");
  y = addBody(doc, "NOW, THEREFORE, THIS AGREEMENT WITNESSETH AS FOLLOWS:", y, pageH);
  y += 2;

  // ── THE TRANSACTION ──
  y = addHeading(doc, "THE TRANSACTION", y, pageH);
  y = addBody(
    doc,
    "Subject to the Terms and Conditions of this Agreement, the Seller agrees to sell the Demised Property to the Buyer, together with the full and complete rights of ownership, free from any and/or all Encumbrances, together with all other rights, interests, liberties, easements, privileges, appendages and appurtenances whatsoever relating to the Demised Property, and the Buyer agrees to purchase the same, subject to the Terms and Conditions herein.",
    y, pageH
  );
  y = addBody(
    doc,
    `The total value of the Demised Property, as mutually decided between the Parties, is $${values.salePriceNumeric || "[Amount]"}/- (${values.salePriceWords || "[Amount in Words]"}) which constitutes the Sale Price for the Demised Property.`,
    y, pageH
  );
  y = addBody(doc, "The Seller affirms that they have duly received the Sale Price for the Demised Property and the Seller shall:", y, pageH);
  y = addBullet(doc, `Hand over peaceful vacant possession of the Demised Property to the Buyer within ${values.possessionYears || "two (02)"} years from the date of Signing of Agreement;`, y, pageH);
  y = addBullet(doc, "Execute a sale deed for the transfer of title of the Demised Property in the Buyer's name;", y, pageH);
  y = addBullet(doc, `Hand over all documents and things relating to the Demised Property as specified in Schedule ${values.scheduleNumber || "[__]"} hereto.`, y, pageH);
  y += 1;
  y = addBody(
    doc,
    "The Seller shall be responsible for any and/or all charges, dues, claims, and demands, including utility bills (electricity, gas, water and telephone) in respect of the Demised Property up to the date of executing a sale deed. Upon execution of the sale deed, the Buyer shall be wholly responsible for payment of all charges and bills for utilities as furnished to the Demised Property.",
    y, pageH
  );
  y = addBody(doc, "All taxes, charges, stamp duty and dues in respect of the transfer of the Demised Property shall be on account of the Buyer.", y, pageH);
  y += 2;

  // ── REPRESENTATIONS AND WARRANTIES ──
  y = addHeading(doc, "REPRESENTATIONS AND WARRANTIES", y, pageH);

  // Seller warranties
  y = addHeading(doc, "Warranties of Seller", y, pageH);
  y = addBody(doc, "The Seller, by Signing the Agreement, hereby represents and warrants that:", y, pageH);
  y = addBullet(doc, "The Seller has all requisite power and authority to execute and deliver this Agreement and to perform its obligations hereunder. The execution, delivery and performance of this Agreement have been duly authorised upon necessary action on the part of the Seller;", y, pageH);
  y = addBullet(doc, "The Seller represents that it is duly incorporated, validly existing and in good standing under the laws of the state, and has all requisite power and authority to conduct its business as presently conducted;", y, pageH);
  y = addBullet(doc, "The Seller is the lawful beneficiary of the Sale Price mentioned herein and holds no pending claims against any party with regard to the same;", y, pageH);
  y = addBullet(doc, "The Seller has not indulged in any activities that may render or expose the Buyer to any litigation, civil or criminal proceedings before any court or tribunal, and no such proceedings are pending or threatened against the Seller;", y, pageH);
  y = addBullet(doc, "The Seller shall complete construction of the Demised Property by the end of the Investment Period;", y, pageH);
  y = addBullet(doc, "The Seller shall defend, indemnify and hold harmless the Buyer against all losses, claims, demands, punitive damages, expenses, causes of action, judgements and/or costs arising out of any acts including but not limited to:", y, pageH);
  y = addSubBullet(doc, "Any breach of any representation, warranty, covenant or agreement with any third-party contained in the Agreement;", y, pageH);
  y = addSubBullet(doc, "Any other taxes or liability for which the Seller was accountable prior to the Effective Date;", y, pageH);
  y = addSubBullet(doc, "All operations and actions of the Seller before and after the Effective Date; and", y, pageH);
  y = addSubBullet(doc, "Any and all Applicable Laws and compliance thereof.", y, pageH);
  y += 1;
  y = addBullet(doc, "The Seller shall not delay any act and shall do so within fourteen (14) days from the date of Signing or when any requisite act is no longer contingent on any act of Buyer;", y, pageH);
  y = addBullet(doc, "The Seller shall be responsible to ensure security arrangements and yearly maintenance of the Demised Property on notified service charges after completion and transfer of the Demised Property to the Buyer;", y, pageH);
  y = addBullet(doc, "In a situation where the Project gets cancelled or discontinued for any unforeseen reason, the Seller shall be bound to return the full amounts received towards Sale Price to the Buyer, without any deduction;", y, pageH);
  y = addBullet(doc, "The Seller undertakes to have read all Terms and Conditions of this Agreement and explicitly confirms their acceptance without any reservation or confusion.", y, pageH);
  y += 2;

  // Buyer warranties
  y = addHeading(doc, "Warranties of Buyer", y, pageH);
  y = addBody(doc, "The Buyer, by Signing the Agreement, hereby represents and warrants that:", y, pageH);
  y = addBullet(doc, "The Buyer acknowledges that as the Project is under ongoing construction, the Demised Property shall remain non-transferable and possession shall not be handed over even after reception of Sale Price by the Seller;", y, pageH);
  y = addBullet(doc, "The Buyer shall not sell or transfer the Demised Property without taking an NOC from the Seller in order to avoid unauthorised or unfair use of the Demised Property;", y, pageH);
  y = addBullet(doc, "The Buyer shall not carry out any unreasonable additions or alterations involving structural or elevation changes in the Demised Property, or cause unreasonable disturbance to neighbours;", y, pageH);
  y = addBullet(doc, "The Buyer may request the Seller to use specific materials or fittings within the Demised Property for their specific need; such requests must be made in advance to ensure feasibility, and costs resulting from such requests shall be paid by the Buyer;", y, pageH);
  y = addBullet(doc, "The Buyer shall enjoy all rights to the Demised Property as per its covered area only. The rooftop, lawns, footpaths, passages and rest of the space of the Project shall remain property of the Seller, and the Buyer shall not encroach upon any part of the Project;", y, pageH);
  y = addBullet(doc, "The Buyer undertakes to have read all Terms and Conditions of this Agreement and explicitly confirms their acceptance without any reservation or confusion.", y, pageH);
  y += 2;

  // ── CONFIDENTIAL INFORMATION ──
  y = addHeading(doc, "CONFIDENTIAL INFORMATION", y, pageH);
  y = addBody(
    doc,
    "During and after the execution of this Agreement, the Parties hereby agree to retain all Confidential Information in strict confidence, to protect the security, integrity and confidentiality of such information, and to not permit unauthorised access, use, disclosure, publication or dissemination of Confidential Information except in conformity with this Agreement.",
    y, pageH
  );
  y += 2;

  // ── GOVERNING LAW AND JURISDICTION ──
  y = addHeading(doc, "GOVERNING LAW AND JURISDICTION", y, pageH);
  y = addBody(
    doc,
    `This Agreement shall be construed in accordance with and governed by Applicable Laws of the State of ${values.state || "[Insert State]"}, and the Parties shall ensure compliance thereof.`,
    y, pageH
  );
  y += 2;

  // ── DISPUTE RESOLUTION ──
  y = addHeading(doc, "DISPUTE RESOLUTION", y, pageH);
  y = addBody(
    doc,
    "Any difference and/or disputes arising between the Parties involving this Agreement or any part thereof shall first be settled amicably in the spirit of goodwill and mutual accommodation within fifteen (15) days. If not resolved within such period, the matter shall be settled by reference to Arbitration which shall precede any court action.",
    y, pageH
  );
  y = addBody(
    doc,
    "If the Parties cannot agree on the appointment of a sole Arbitrator, then each Party shall appoint one Arbitrator. In the event of disagreement between such Arbitrators, the matters shall be referred to an Umpire appointed by the Arbitrators, whose decision shall be final and binding upon the Parties.",
    y, pageH
  );
  y += 2;

  // ── STAMP AND REGISTRATION ──
  y = addHeading(doc, "STAMP AND REGISTRATION", y, pageH);
  y = addBody(
    doc,
    "This Agreement shall be stamped and duly registered. The Buyer shall be responsible to pay the Stamp Duty and Registration Fee. The Seller shall extend full cooperation in completing the Signing, Stamping and Registration formalities.",
    y, pageH
  );
  y += 2;

  // ── NOTICE ──
  y = addHeading(doc, "NOTICE", y, pageH);
  y = addBody(
    doc,
    "Wherever, by the terms of this Agreement, notice, demand or other communication shall or may be given to either Party, the same shall be in writing and addressed to such Party at its address, cellular number and/or e-mail address set forth, or to such other address as shall from time to time be designated by written notice by such Party to the other.",
    y, pageH
  );
  y += 2;

  // ── FORCE MAJEURE ──
  y = addHeading(doc, "FORCE MAJEURE", y, pageH);
  y = addBody(
    doc,
    "In case of any Force Majeure Event, the affected Party shall notify the other via a Notice within forty-eight (48) hours describing the Force Majeure Event in reasonable detail and the obligations affected by such event, along with a preliminary estimate of delay which shall affect the execution of any such obligations.",
    y, pageH
  );
  y += 2;

  // ── SEVERABILITY ──
  y = addHeading(doc, "SEVERABILITY", y, pageH);
  y = addBody(
    doc,
    "In the event that any provision of this Agreement is found to be void and unenforceable by a court of competent jurisdiction, then the remaining provisions shall remain in force in accordance with the Parties' intentions.",
    y, pageH
  );
  y += 2;

  // ── ADDITIONAL TERMS ──
  if (values.additionalTerms) {
    y = addHeading(doc, "ADDITIONAL TERMS", y, pageH);
    y = addBody(doc, values.additionalTerms, y, pageH);
    y += 2;
  }

  // ── SIGNATURES ──
  if (y > pageH - 70) { doc.addPage(); y = 20; }
  y += 4;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("IN WITNESS WHEREOF", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(", the Parties hereto have executed this Agreement on the date indicated above.", 73, y, { maxWidth: 117 });
  y += 12;

  // Seller block
  doc.setFont("helvetica", "bold");
  doc.text("ON BEHALF OF SELLER:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", 20, y);
  y += 7;
  doc.text(`Printed Name: ${values.party1Name || ""}`, 20, y);
  y += 7;
  if (values.party1Signature) {
    doc.text(`Typed Signature: ${values.party1Signature}`, 20, y);
    y += 7;
  }
  doc.text(`Date: ${values.effectiveDate || new Date().toLocaleDateString()}`, 20, y);
  y += 14;

  // Buyer block
  doc.setFont("helvetica", "bold");
  doc.text("BUYER:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", 20, y);
  y += 7;
  doc.text(`Printed Name: ${values.party2Name || ""}`, 20, y);
  y += 7;
  if (values.party2Signature) {
    doc.text(`Typed Signature: ${values.party2Signature}`, 20, y);
    y += 7;
  }
  doc.text(`Date: ${values.effectiveDate || new Date().toLocaleDateString()}`, 20, y);
  y += 14;

  // Witness block
  if (values.witnessName) {
    if (y > pageH - 20) { doc.addPage(); y = 20; }
    doc.text("Witness: _______________________________", 20, y);
    y += 7;
    doc.text(`Name: ${values.witnessName}`, 20, y);
  }

  doc.save("agreement_to_sell.pdf");
};

export default function AgreementToSell() {
  return (
    <FormWizard
      steps={steps}
      title="Agreement To Sell"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="agreementtosell"
    />
  );
}
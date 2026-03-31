import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "clientName", label: "Client (Recipient) name", type: "text", required: true },
      { name: "clientAddress", label: "Client (Recipient) address", type: "text", required: true },
      { name: "providerName", label: "Service Provider name", type: "text", required: true },
      { name: "providerAddress", label: "Service Provider address", type: "text", required: true },
    ],
  },
  {
    label: "Service and Financial Terms",
    fields: [
      { name: "descriptionOfServices", label: "Description of services (Exhibit A)", type: "textarea", required: true, placeholder: "Describe all services, scope of work, deliverables, timelines, and specifications" },
      { name: "feeAmount", label: "Fee amount ($)", type: "text", required: false, placeholder: "e.g., 5,000" },
      { name: "feePeriod", label: "Fee period", type: "text", required: false, placeholder: "e.g., month" },
    ],
  },
  {
    label: "Term and Termination",
    fields: [
      { name: "curePeriodDays", label: "Cure period for breach (days)", type: "text", required: false, placeholder: "e.g., 30" },
    ],
  },
  {
    label: "Dispute Resolution",
    fields: [
      {
        name: "disputeResolutionMethod",
        label: "Primary dispute resolution method",
        type: "select",
        required: true,
        options: [
          { value: "arbitration", label: "Binding Arbitration (AAA rules)" },
          { value: "mediation",   label: "Mediation first, then litigation" },
          { value: "litigation",  label: "Litigation only" },
        ],
      },
      { name: "arbitrationDays", label: "Days before escalating (if negotiation fails)", type: "text", required: false, placeholder: "e.g., 30" },
    ],
  },
  {
    label: "Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Which country's laws will govern this document?",
        type: "select",
        required: true,
        options: [
          { value: "us",    label: "United States" },
          { value: "ca",    label: "Canada" },
          { value: "uk",    label: "United Kingdom" },
          { value: "au",    label: "Australia" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    label: "State / Province",
    fields: [
      {
        name: "state",
        label: "Which state or province?",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values: Record<string, string>) => {
          if (values.country === "us") {
            return [
              { value: "Alabama", label: "Alabama" }, { value: "Alaska", label: "Alaska" },
              { value: "Arizona", label: "Arizona" }, { value: "Arkansas", label: "Arkansas" },
              { value: "California", label: "California" }, { value: "Colorado", label: "Colorado" },
              { value: "Connecticut", label: "Connecticut" }, { value: "Delaware", label: "Delaware" },
              { value: "Florida", label: "Florida" }, { value: "Georgia", label: "Georgia" },
              { value: "Hawaii", label: "Hawaii" }, { value: "Idaho", label: "Idaho" },
              { value: "Illinois", label: "Illinois" }, { value: "Indiana", label: "Indiana" },
              { value: "Iowa", label: "Iowa" }, { value: "Kansas", label: "Kansas" },
              { value: "Kentucky", label: "Kentucky" }, { value: "Louisiana", label: "Louisiana" },
              { value: "Maine", label: "Maine" }, { value: "Maryland", label: "Maryland" },
              { value: "Massachusetts", label: "Massachusetts" }, { value: "Michigan", label: "Michigan" },
              { value: "Minnesota", label: "Minnesota" }, { value: "Mississippi", label: "Mississippi" },
              { value: "Missouri", label: "Missouri" }, { value: "Montana", label: "Montana" },
              { value: "Nebraska", label: "Nebraska" }, { value: "Nevada", label: "Nevada" },
              { value: "New Hampshire", label: "New Hampshire" }, { value: "New Jersey", label: "New Jersey" },
              { value: "New Mexico", label: "New Mexico" }, { value: "New York", label: "New York" },
              { value: "North Carolina", label: "North Carolina" }, { value: "North Dakota", label: "North Dakota" },
              { value: "Ohio", label: "Ohio" }, { value: "Oklahoma", label: "Oklahoma" },
              { value: "Oregon", label: "Oregon" }, { value: "Pennsylvania", label: "Pennsylvania" },
              { value: "Rhode Island", label: "Rhode Island" }, { value: "South Carolina", label: "South Carolina" },
              { value: "South Dakota", label: "South Dakota" }, { value: "Tennessee", label: "Tennessee" },
              { value: "Texas", label: "Texas" }, { value: "Utah", label: "Utah" },
              { value: "Vermont", label: "Vermont" }, { value: "Virginia", label: "Virginia" },
              { value: "Washington", label: "Washington" }, { value: "West Virginia", label: "West Virginia" },
              { value: "Wisconsin", label: "Wisconsin" }, { value: "Wyoming", label: "Wyoming" },
              { value: "District of Columbia", label: "District of Columbia" },
            ];
          } else if (values.country === "ca") {
            return [
              { value: "Alberta", label: "Alberta" }, { value: "British Columbia", label: "British Columbia" },
              { value: "Manitoba", label: "Manitoba" }, { value: "New Brunswick", label: "New Brunswick" },
              { value: "Newfoundland and Labrador", label: "Newfoundland and Labrador" }, { value: "Nova Scotia", label: "Nova Scotia" },
              { value: "Ontario", label: "Ontario" }, { value: "Prince Edward Island", label: "Prince Edward Island" },
              { value: "Quebec", label: "Quebec" }, { value: "Saskatchewan", label: "Saskatchewan" },
              { value: "Northwest Territories", label: "Northwest Territories" }, { value: "Nunavut", label: "Nunavut" },
              { value: "Yukon", label: "Yukon" },
            ];
          } else if (values.country === "uk") {
            return [
              { value: "England", label: "England" }, { value: "Scotland", label: "Scotland" },
              { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" },
            ];
          } else if (values.country === "au") {
            return [
              { value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" },
              { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" },
              { value: "South Australia", label: "South Australia" }, { value: "Tasmania", label: "Tasmania" },
              { value: "Australian Capital Territory", label: "Australian Capital Territory" }, { value: "Northern Territory", label: "Northern Territory" },
            ];
          }
          return [{ value: "Other", label: "Other Region" }];
        },
      },
      {
        name: "governingLawCustom",
        label: "Full governing jurisdiction (if 'Other' country or to specify further)",
        type: "text",
        required: false,
        placeholder: "e.g., Province of Ontario, State of Texas",
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "clientSignerName", label: "Recipient name", type: "text", required: false },
      { name: "clientSignerDate", label: "Recipient sign date", type: "date", required: false },
      { name: "providerSignerName", label: "Provider name", type: "text", required: false },
      { name: "providerSignerDate", label: "Provider sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w   = 210;
  const m   = 16;
  const tw  = w - m * 2;
  const lh  = 5.5;
  const limit = 280;
  let y = 20;

  const u = (value?: string, min = 18) => (value || "").trim() || " ".repeat(min);

  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  const heading = (text: string) => {
    if (y + lh + 4 > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 1;
    doc.setFont("helvetica", "normal");
  };

  // Resolve governing law
  const stateVal = values.state || "";
  const governingLawFull = values.governingLawCustom
    ? values.governingLawCustom
    : stateVal || "______";

  // ── Title ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "SERVICE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  y += 8;
  doc.setFontSize(10.5);

  // ── Opening ──
  p(
    `This Contract for Services (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)} (the "Effective Date"),`
  );
  y += 1;
  p("BY AND BETWEEN", true);
  y += 1;
  p(
    `${u(values.clientName, 18)}, having an address at ${u(values.clientAddress, 18)} (hereinafter referred to as the "Recipient"),`
  );
  y += 1;
  p("AND", true);
  y += 1;
  p(
    `${u(values.providerName, 18)}, having an address at ${u(values.providerAddress, 18)} (hereinafter referred to as the "Provider").`
  );
  p(
    `The Recipient and the Provider may hereinafter be referred to individually as a "Party" and collectively as the "Parties."`
  );

  // ── Section 1 ──
  heading("1. Description of Services");
  p(
    `Commencing on the Effective Date, the Provider shall perform and deliver to the Recipient the services described in Exhibit A attached hereto and incorporated herein by reference ` +
    `(collectively, the "Services"), in a professional, timely, and workmanlike manner consistent with generally accepted industry standards.`
  );

  // ── Section 2 ──
  heading("2. Compensation and Payment Terms");
  p("2.1 Fees", true);
  p(
    `In consideration of the Services, the Recipient shall pay the Provider the sum of $${u(values.feeAmount, 8)} per ${u(values.feePeriod, 8)}, ` +
    `payable in regular installments as agreed between the Parties.`
  );
  p("2.2 Late Payment", true);
  p(
    "In addition to any other rights or remedies available under applicable law, failure by the Recipient to make any payment when due shall constitute a material breach of this Agreement. " +
    "Upon such breach, the Provider shall be entitled, at its sole discretion, to suspend Services, terminate this Agreement, and/or pursue all available legal remedies."
  );

  // ── Section 3 ──
  heading("3. Term and Termination");
  p(
    "This Agreement shall commence on the Effective Date and shall automatically terminate upon the completion of the Services, " +
    "unless earlier terminated in accordance with the provisions of this Agreement."
  );

  // ── Section 4 ──
  heading("4. Ownership of Work Product");
  p("4.1 Work Product", true);
  p(
    "All works, inventions, discoveries, designs, developments, materials, and other deliverables, whether or not copyrightable or patentable " +
    "(collectively, the \"Work Product\"), created, developed, or produced by the Provider, in whole or in part, in connection with the Services, " +
    "shall be the sole and exclusive property of the Recipient."
  );
  p("4.2 Further Assurances", true);
  p(
    "The Provider agrees to execute and deliver all documents and take all actions reasonably required to vest, confirm, or perfect the Recipient's " +
    "ownership rights in the Work Product."
  );

  // ── Section 5 ──
  heading("5. Events of Default");
  p("The occurrence of any of the following events shall constitute a material default under this Agreement:");
  p("(a) Failure by either Party to make any payment when due;");
  p("(b) Insolvency, bankruptcy, or commencement of any proceeding under applicable insolvency laws by or against either Party;");
  p("(c) Any assignment for the benefit of creditors or seizure or attachment of a Party's assets;");
  p("(d) Failure by the Provider to perform or deliver the Services in accordance with the terms of this Agreement.");

  // ── Section 6 ──
  heading("6. Remedies");
  p("6.1 Termination for Default", true);
  p(
    "In the event of a material breach by either Party, the non-defaulting Party may terminate this Agreement by providing written notice specifying the nature of the breach."
  );
  p("6.2 Cure Period", true);
  p(
    `The defaulting Party shall have ${u(values.curePeriodDays || "0", 4)} days from receipt of such notice to cure the breach, unless otherwise waived in writing by the non-defaulting Party.`
  );
  p("6.3 Failure to Cure", true);
  p(
    "If the breach is not cured within the specified period, this Agreement shall automatically terminate without further notice."
  );

  // ── Section 7 ──
  heading("7. Force Majeure");
  p(
    "Neither Party shall be liable for any failure or delay in the performance of its obligations under this Agreement if such failure or delay is caused by events beyond its reasonable control " +
    "(each, a \"Force Majeure Event\")."
  );
  p(
    "Force Majeure Events shall include, without limitation, acts of God, pandemics, epidemics, governmental actions, natural disasters, war, civil unrest, labor disputes, or disruptions in supply chains."
  );
  p(
    "The affected Party shall promptly notify the other Party and shall use commercially reasonable efforts to resume performance as soon as practicable."
  );

  // ── Section 8 ──
  heading("8. Dispute Resolution");
  p("8.1 Amicable Resolution", true);
  p(
    "The Parties shall first attempt to resolve any dispute arising out of or in connection with this Agreement through good faith negotiations."
  );
  if (values.disputeResolutionMethod === "arbitration") {
    p("8.2 Arbitration", true);
    p(
      `If the dispute is not resolved within ${u(values.arbitrationDays || "thirty (30)", 4)} days, it shall be finally resolved by binding arbitration in accordance with the rules of the American Arbitration Association (AAA).`
    );
    p("8.3 Finality", true);
    p(
      "The arbitral award shall be final and binding upon the Parties and may be enforced in any court of competent jurisdiction."
    );
  } else if (values.disputeResolutionMethod === "mediation") {
    p("8.2 Mediation", true);
    p(
      `If the dispute is not resolved within ${u(values.arbitrationDays || "thirty (30)", 4)} days, it shall be submitted to mediation in accordance with applicable laws before pursuing any further legal remedies.`
    );
  } else {
    p("8.2 Litigation", true);
    p(
      `If the dispute is not resolved within ${u(values.arbitrationDays || "thirty (30)", 4)} days, either Party may pursue all available legal remedies in a court of competent jurisdiction.`
    );
  }

  // ── Section 9 ──
  heading("9. Entire Agreement");
  p(
    "This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, representations, or understandings, whether written or oral."
  );

  // ── Section 10 ──
  heading("10. Severability");
  p(
    "If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect. " +
    "Any such invalid provision shall be modified to the minimum extent necessary to render it enforceable."
  );

  // ── Section 11 ──
  heading("11. Amendments");
  p(
    "No amendment, modification, or supplement to this Agreement shall be valid or binding unless made in writing and duly executed by both Parties."
  );

  // ── Section 12 ──
  heading("12. Governing Law");
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of ${governingLawFull}, without regard to its conflict of laws principles.`
  );

  // ── Section 13 ──
  heading("13. Notices");
  p(
    "All notices, requests, or communications required or permitted under this Agreement shall be in writing and shall be deemed duly given if delivered personally " +
    "or sent by certified or registered mail (return receipt requested) to the addresses of the Parties set forth above, or to such other address as either Party may designate by written notice."
  );

  // ── Section 14 ──
  heading("14. Waiver");
  p(
    "The failure of either Party at any time to enforce any provision of this Agreement shall not be construed as a waiver of such provision or of the right to enforce it at a later time."
  );

  // ── Section 15 ──
  heading("15. Costs and Attorney's Fees");
  p(
    "In the event of any dispute arising out of or relating to this Agreement, the prevailing Party shall be entitled to recover all reasonable costs and expenses incurred, " +
    "including, without limitation, court costs and attorney's fees."
  );

  // ── Section 16 ──
  heading("16. Construction");
  p(
    "This Agreement shall be construed fairly and not strictly for or against either Party, and the rule of construction that ambiguities are to be resolved against the drafting Party shall not apply."
  );

  // ── Section 17 ──
  heading("17. Assignment");
  p(
    "Neither Party may assign, transfer, or delegate its rights or obligations under this Agreement without the prior written consent of the other Party, which shall not be unreasonably withheld or delayed."
  );

  // ── Section 18 ──
  heading("18. Counterparts");
  p(
    "This Agreement may be executed in counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument."
  );

  // ── Signatures ──
  y += 4;
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", true);
  y += 4;

  p("RECIPIENT:", true);
  uf("Name", values.clientSignerName || values.clientName, 24);
  uf("Date", values.clientSignerDate, 14);
  y += 4;

  p("PROVIDER:", true);
  uf("Name", values.providerSignerName || values.providerName, 24);
  uf("Date", values.providerSignerDate, 14);
  y += 6;

  // ── Exhibit A ──
  if (y + 30 > limit) { doc.addPage(); y = 20; }
  heading("EXHIBIT A");
  heading("DESCRIPTION OF SERVICES");
  p("[Insert detailed description of the Services, scope of work, deliverables, timelines, and specifications]");
  y += 3;
  p(u(values.descriptionOfServices, 40));

  doc.save("service_agreement.pdf");
};

export default function ServiceAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Service Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="serviceagreement"
    />
  );
}
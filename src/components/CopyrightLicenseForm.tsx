import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

// ==================== STEPS ====================
const steps: Array<{ label: string; fields: FieldDef[] }> = [
  // ── STEP 1: Jurisdiction ──────────────────────────────────────────────
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
  // ── STEP 2: State/Province ────────────────────────────────────────────
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
  // ── STEP 3: Date & City ────────────────────────────────────────────────
  {
    label: "Effective Date & City",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "city", label: "City", type: "text", required: true, placeholder: "City where agreement is made" },
      { name: "governingLawState", label: "Governing Law State/Province", type: "text", required: true, placeholder: "e.g. California, Ontario" },
      { name: "arbitrationState", label: "Arbitration Association State/Region", type: "text", required: true, placeholder: "e.g. American Arbitration Association" },
    ],
  },
  // ── STEP 4: Licensor ──────────────────────────────────────────────────
  {
    label: "Licensor (Party 1)",
    fields: [
      { name: "licensorName", label: "Licensor Full Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "licensorAddress", label: "Licensor Address", type: "textarea", required: true, placeholder: "Full address" },
    ],
  },
  // ── STEP 5: Licensee ──────────────────────────────────────────────────
  {
    label: "Licensee (Party 2)",
    fields: [
      { name: "licenseeName", label: "Licensee Full Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "licenseeAddress", label: "Licensee Address", type: "textarea", required: true, placeholder: "Full address" },
    ],
  },
  // ── STEP 6: Licensed Property & Territory ────────────────────────────
  {
    label: "Licensed Property & Territory",
    fields: [
      { name: "copyrightWorkDescription", label: "Description of the Copyrighted Work / Licensed Property", type: "textarea", required: true, placeholder: "Describe the copyrighted work in detail..." },
      { name: "territory", label: "Licensed Territory / Geographical Area", type: "text", required: true, placeholder: "e.g. Worldwide, United States, North America" },
    ],
  },
  // ── STEP 7: Royalties & Default ───────────────────────────────────────
  {
    label: "Royalties & Default",
    fields: [
      { name: "royaltyStructure", label: "Royalty Structure / Calculation Method", type: "textarea", required: true, placeholder: "Describe how royalties will be calculated..." },
      { name: "defaultNoticeDays", label: "Days Notice Before Termination for Breach", type: "text", required: true, placeholder: "e.g. 30" },
    ],
  },
  // ── STEP 8: Legal Protections ─────────────────────────────────────────
  {
    label: "Legal Protections",
    fields: [
      { name: "legalNotes", label: "Additional Legal Protections or Notes (optional)", type: "textarea", required: false, placeholder: "Any additional legal provisions..." },
    ],
  },
  // ── STEP 9: Termination & Notices ────────────────────────────────────
  {
    label: "Termination & Notices",
    fields: [
      { name: "terminationNotes", label: "Termination / Notice Notes (optional)", type: "textarea", required: false, placeholder: "Any special termination provisions..." },
    ],
  },
  // ── STEP 10: Signatures ───────────────────────────────────────────────
  {
    label: "Signatures",
    fields: [
      { name: "licensorSignName", label: "Licensor — Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "licensorSignature", label: "Licensor — Signature (type full name)", type: "text", required: true, placeholder: "Type full legal name as signature" },
      { name: "licensorDate", label: "Licensor — Date", type: "date", required: true },
      { name: "licenseeSignName", label: "Licensee — Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "licenseeSignature", label: "Licensee — Signature (type full name)", type: "text", required: true, placeholder: "Type full legal name as signature" },
      { name: "licenseeDate", label: "Licensee — Date", type: "date", required: true },
    ],
  },
  // ── STEP 11: Legal Filing Notes ───────────────────────────────────────
  {
    label: "Legal Filing Notes",
    fields: [
      { name: "notarySigner", label: "Signed Before Notary Public By", type: "text", required: true, placeholder: "Name of person signing before notary" },
      { name: "courtOrFilingOffice", label: "Court / Filing Office", type: "text", required: true, placeholder: "Where this document will be filed" },
      { name: "requestingBusiness", label: "Requesting Business (if applicable)", type: "text", required: false, placeholder: "Business name (optional)" },
      { name: "additionalAssistanceNotes", label: "Additional Assistance Notes (optional)", type: "textarea", required: false, placeholder: "Any further notes..." },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ==================== PDF GENERATOR ====================
const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const left = 16;
  const width = 178;
  const lh = 5.25;
  let y = 18;

  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));

  const ensure = (need = 10) => {
    if (y + need > 285) { doc.addPage(); y = 18; }
  };

  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.35);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };

  const heading = (text: string) => {
    ensure(lh + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, left, y);
    y += lh + 3;
  };

  const uf = (label: string, value?: string, minW = 30) => {
    ensure(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.35);
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const show = u(value, 12);
    doc.text(show, x, y);
    doc.setLineWidth(0.22);
    doc.line(x, y + 1, x + Math.max(doc.getTextWidth(show), minW), y + 1);
    y += 6.2;
  };

  const jurisdiction = [v.city, v.state, v.country?.toUpperCase()].filter(Boolean).join(", ");

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "COPYRIGHT LICENSE AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(pageW / 2 - tW / 2, y + 1.1, pageW / 2 + tW / 2, y + 1.1);
  y += 11;

  uf("Effective Date: ", v.effectiveDate);
  uf("Jurisdiction: ", jurisdiction);
  y += 2;

  // ── PREAMBLE ────────────────────────────────────────────────────────────
  p(
    `This Copyright License Agreement (the "Agreement") is made and entered into as of ${u(v.effectiveDate, 12)} (the "Effective Date"), by and between ${u(v.licensorName)}, having its principal place of business at ${u(v.licensorAddress)} (hereinafter referred to as the "Licensor"), and ${u(v.licenseeName)}, having its principal place of business at ${u(v.licenseeAddress)} (hereinafter referred to as the "Licensee").`
  );
  p('The Licensor and the Licensee may hereinafter be referred to individually as a "Party" and collectively as the "Parties."');
  p("WHEREAS, the Licensor is the sole owner of certain copyrighted material as described herein;");
  p("AND WHEREAS, the Licensee desires to obtain, and the Licensor agrees to grant, a license to use the copyrighted material under the terms and conditions set forth in this Agreement.");
  p("The parties agree as follows:");
  y += 1;

  // ── 1. GRANT OF LICENSE ─────────────────────────────────────────────────
  heading("1. GRANT OF LICENSE");
  p(`The Licensor represents and warrants that it is the sole and lawful owner of ${u(v.copyrightWorkDescription)} (the "Licensed Property").`);
  p(`Subject to the terms and conditions set forth herein, the Licensor hereby grants to the Licensee an exclusive, limited, and non-transferable license to use the Licensed Property within the following geographical territory: ${u(v.territory)}.`);
  p("Notwithstanding the foregoing, the Licensor shall retain all right, title, and interest in and to the Licensed Property, including all intellectual property rights therein.");
  p("All materials, products, or other works (collectively, the \"Work\") developed or created by the Licensee in connection with the Licensed Property shall be owned by the Licensee; provided, however, that such ownership shall not include any ownership rights in the Licensed Property itself.");

  // ── 2. RIGHTS AND OBLIGATIONS ───────────────────────────────────────────
  heading("2. RIGHTS AND OBLIGATIONS");
  p("The Licensee shall be solely responsible for providing all necessary funding, resources, and technical expertise required for the development, production, and marketing of the Work incorporating the Licensed Property.");
  p("The Licensee shall own all proprietary rights in and to the Work, excluding any rights in the Licensed Property, which shall at all times remain the sole property of the Licensor.");

  // ── 3. ROYALTY AND PAYMENT ──────────────────────────────────────────────
  heading("3. ROYALTY AND PAYMENT");
  p(`In consideration of the rights granted herein, the Licensee shall pay to the Licensor a royalty calculated as follows: ${u(v.royaltyStructure)}.`);
  p("Each royalty payment shall be accompanied by a detailed written statement setting forth the basis of calculation of such royalty.");

  // ── 4. MODIFICATIONS AND RESTRICTIONS ──────────────────────────────────
  heading("4. MODIFICATIONS AND RESTRICTIONS");
  p("The Licensee shall not modify, adapt, or alter the Licensed Property in any manner without the prior written consent of the Licensor.");
  p("The Licensee shall not use the Licensed Property for any unlawful purpose or in any manner inconsistent with the terms of this Agreement.");

  // ── 5. DEFAULT ──────────────────────────────────────────────────────────
  heading("5. DEFAULT");
  p(`In the event that either Party fails to perform or breaches any obligation under this Agreement, including failure to make timely royalty payments, the non-defaulting Party shall have the right to terminate this Agreement by providing ${u(v.defaultNoticeDays, 3)} days' prior written notice.`);
  p("The defaulting Party may cure such breach within the notice period, failing which this Agreement shall stand terminated.");

  // ── 6. DISPUTE RESOLUTION (ARBITRATION) ────────────────────────────────
  heading("6. DISPUTE RESOLUTION (ARBITRATION)");
  p(`Any dispute, controversy, or claim arising out of or relating to this Agreement which cannot be amicably resolved shall be finally settled by arbitration in accordance with the rules of the ${u(v.arbitrationState)} Arbitration Association.`);
  p("Either Party may initiate arbitration by providing thirty (30) days' prior written notice to the other Party.");
  p("The costs of arbitration shall be borne equally by the Parties, unless otherwise determined by the arbitrator.");
  p("The arbitral award shall be final and binding and may be enforced in any court of competent jurisdiction.");

  // ── 7. WARRANTIES AND DISCLAIMER ───────────────────────────────────────
  heading("7. WARRANTIES AND DISCLAIMER");
  p("Except as expressly provided herein, neither Party makes any representations or warranties, express or implied, with respect to the Licensed Property.");
  p('The Licensed Property is provided on an "AS IS" basis.');
  p("In no event shall either Party be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of the Licensed Property.");

  // ── 8. ASSIGNMENT ───────────────────────────────────────────────────────
  heading("8. ASSIGNMENT");
  p("This Agreement shall be binding upon and inure to the benefit of the Parties and their respective successors and permitted assigns.");
  p("Neither Party may assign or transfer its rights or obligations under this Agreement without the prior written consent of the other Party.");

  // ── 9. INDEMNIFICATION ──────────────────────────────────────────────────
  heading("9. INDEMNIFICATION");
  p("Each Party (the \"Indemnifying Party\") agrees to indemnify, defend, and hold harmless the other Party from and against any and all claims, losses, damages, liabilities, costs, and expenses (including reasonable legal fees) arising out of or resulting from any breach of this Agreement by the Indemnifying Party.");
  p("The Indemnifying Party shall have the sole right to control the defense and settlement of any such claim.");
  p("This provision shall survive the termination or expiration of this Agreement.");

  // ── 10. TERM AND TERMINATION ────────────────────────────────────────────
  heading("10. TERM AND TERMINATION");
  p("This Agreement may be terminated by either party upon thirty (30) days' written notice.");
  p("Upon termination or expiration, the Licensee shall immediately cease all use, reproduction, marketing, and distribution of the Work incorporating the Licensed Property, except that the Licensee may fulfill existing orders and dispose of existing inventory within a commercially reasonable period.");
  p("Termination shall not affect any accrued rights or obligations, including the obligation to pay outstanding royalties.");
  if ((v.terminationNotes || "").trim()) p(v.terminationNotes);

  // ── 11. ENTIRE AGREEMENT ────────────────────────────────────────────────
  heading("11. ENTIRE AGREEMENT");
  p("This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements, negotiations, and understandings, whether written or oral.");

  // ── 12. AMENDMENT ───────────────────────────────────────────────────────
  heading("12. AMENDMENT");
  p("No amendment or modification of this Agreement shall be valid unless made in writing and duly executed by both Parties.");

  // ── 13. SEVERABILITY ────────────────────────────────────────────────────
  heading("13. SEVERABILITY");
  p("If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.");
  p("Any invalid provision shall be deemed modified to the extent necessary to make it enforceable.");

  // ── 14. NOTICES ─────────────────────────────────────────────────────────
  heading("14. NOTICES");
  p("All notices under this Agreement shall be in writing and shall be deemed duly given when delivered by hand, or sent by registered or certified mail to the addresses of the Parties set forth above, or to such other address as may be designated in writing.");

  // ── 15. WAIVER ──────────────────────────────────────────────────────────
  heading("15. WAIVER");
  p("The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of such provision or of the right to enforce it at any time thereafter.");

  // ── 16. GOVERNING LAW ───────────────────────────────────────────────────
  heading("16. GOVERNING LAW");
  p(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState)}, without regard to its conflict of laws principles.`);

  // ── Additional legal notes ───────────────────────────────────────────
  if ((v.legalNotes || "").trim()) {
    heading("ADDITIONAL LEGAL PROVISIONS");
    p(v.legalNotes);
  }

  // ── 17. EXECUTION / SIGNATURES ──────────────────────────────────────────
  heading("17. EXECUTION");
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");
  y += 3;

  p("LICENSOR:", true, 1);
  uf("Name: ", v.licensorSignName);
  uf("Signature: ", v.licensorSignature);
  uf("Date: ", v.licensorDate);
  y += 4;

  p("LICENSEE:", true, 1);
  uf("Name: ", v.licenseeSignName);
  uf("Signature: ", v.licenseeSignature);
  uf("Date: ", v.licenseeDate);

  // ── Make It Legal ────────────────────────────────────────────────────
  ensure(20);
  y += 4;
  heading("MAKE IT LEGAL");
  p(`This Agreement should be signed in front of a notary public by ${u(v.notarySigner, 16)}.`);
  p(`Once signed in front of a notary, this document should be delivered to ${u(v.courtOrFilingOffice, 18)} for filing.`);

  // ── Copies ───────────────────────────────────────────────────────────
  heading("COPIES");
  p(`The original Agreement should be filed with the Clerk of Court or delivered to ${u(v.requestingBusiness, 18)}.`);
  p("Each party should retain a signed copy of this Agreement in a safe and accessible place for future reference.");

  // ── Additional Assistance ────────────────────────────────────────────
  heading("ADDITIONAL ASSISTANCE");
  p("If you are unsure or have questions regarding this Agreement or need additional assistance with special situations or circumstances, consult a qualified attorney in your area.");
  if ((v.additionalAssistanceNotes || "").trim()) p(v.additionalAssistanceNotes);

  doc.save("copyright_license_agreement.pdf");
};

// ==================== COMPONENT ====================
export default function CopyrightLicense() {
  return (
    <FormWizard
      steps={steps}
      title="Copyright License Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="copyrightlicense"
    />
  );
}
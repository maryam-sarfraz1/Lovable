import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "offerorName", label: "Offeror Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "offerorAddress", label: "Offeror Address", type: "text", required: true, placeholder: "Street, City, State, ZIP" },
      { name: "offereeName", label: "Offeree Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "offereeAddress", label: "Offeree Address", type: "text", required: true, placeholder: "Street, City, State, ZIP" },
    ],
  },
  {
    label: "Bartered Goods",
    fields: [
      {
        name: "offerorGoodsDescription",
        label: "Offeror Goods – Description",
        type: "textarea",
        required: true,
        placeholder: "Describe the goods offered by the Offeror",
      },
      {
        name: "offerorGoodsCondition",
        label: "Offeror Goods – Condition",
        type: "text",
        required: true,
        placeholder: "e.g. New, Used, Refurbished",
      },
      {
        name: "offereeGoodsDescription",
        label: "Offeree Goods – Description",
        type: "textarea",
        required: true,
        placeholder: "Describe the goods offered by the Offeree",
      },
      {
        name: "offereeGoodsCondition",
        label: "Offeree Goods – Condition",
        type: "text",
        required: true,
        placeholder: "e.g. New, Used, Refurbished",
      },
    ],
  },
  {
    label: "Delivery and Exchange",
    fields: [
      { name: "exchangeDeadline", label: "Exchange Deadline Date", type: "date", required: true },
      {
        name: "exchangeLocation",
        label: "Exchange Location / Manner",
        type: "text",
        required: true,
        placeholder: "Mutually agreed location or method",
      },
      {
        name: "anticipatedCharges",
        label: "Anticipated Charges / Costs / Fees",
        type: "textarea",
        required: true,
        placeholder: "Describe any charges, costs, or fees each party should disclose prior to exchange",
      },
    ],
  },
  {
    label: "Representations & Warranties",
    fields: [
      {
        name: "offerorValuation",
        label: "Offeror Goods – Stated Valuation",
        type: "text",
        required: true,
        placeholder: "e.g. $500 fair market value",
      },
      {
        name: "offereeValuation",
        label: "Offeree Goods – Stated Valuation",
        type: "text",
        required: true,
        placeholder: "e.g. $500 fair market value",
      },
      {
        name: "offerorWarrantsOwnership",
        label: "Offeror warrants lawful ownership & no encumbrances?",
        type: "select",
        required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
      },
      {
        name: "offereeWarrantsOwnership",
        label: "Offeree warrants lawful ownership & no encumbrances?",
        type: "select",
        required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
      },
    ],
  },
  {
    label: "Legal Terms",
    fields: [
      { name: "governingLaw", label: "Governing Law (Jurisdiction)", type: "text", required: true, placeholder: "e.g. State of California" },
      {
        name: "indemnificationIncluded",
        label: "Mutual Indemnification included?",
        type: "select",
        required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
      },
      {
        name: "assignmentAllowed",
        label: "Assignment without consent allowed?",
        type: "select",
        required: true,
        options: [{ value: "no", label: "No – prior written consent required" }, { value: "yes", label: "Yes" }],
      },
      {
        name: "noticeMethod",
        label: "Notice Method",
        type: "text",
        required: true,
        placeholder: "e.g. Personal delivery or registered mail",
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "offerorSignature", label: "Offeror Signature (typed)", type: "text", required: true },
      { name: "offerorSignDate", label: "Offeror Signature Date", type: "date", required: true },
      { name: "offereeSignature", label: "Offeree Signature (typed)", type: "text", required: true },
      { name: "offereeSignDate", label: "Offeree Signature Date", type: "date", required: true },
      {
        name: "finalConfirm",
        label: "Confirm final review",
        type: "select",
        required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
      },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const margin = 16;
  const bulletIndent = 22;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  const bulletWidth = doc.internal.pageSize.getWidth() - bulletIndent - margin;
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 20;

  // ── helpers ──────────────────────────────────────────────────────────────────

  const checkPage = (needed: number) => {
    if (y + needed > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  const addHeading = (text: string) => {
    checkPage(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, margin, y);
    y += lines.length * 5.5 + 3;
  };

  const addBody = (text: string, extraGap = 5) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, width);
    checkPage(lines.length * 5);
    doc.text(lines, margin, y);
    y += lines.length * 5 + extraGap;
  };

  const addBullet = (text: string) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, bulletWidth);
    checkPage(lines.length * 5);
    doc.text("\u2022", margin + 2, y);
    doc.text(lines, bulletIndent, y);
    y += lines.length * 5 + 3;
  };

  const addSubheading = (text: string) => {
    checkPage(8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, margin, y);
    y += lines.length * 5.5 + 2;
  };

  const addLabelValue = (label: string, value: string) => {
    checkPage(7);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(`${label}:`, margin, y);
    doc.setFont("helvetica", "normal");
    const valueLines = doc.splitTextToSize(value, width - 35);
    doc.text(valueLines, margin + 35, y);
    y += Math.max(valueLines.length * 5, 5) + 3;
  };

  const gap = (px = 3) => { y += px; };

  // ── Document Title ───────────────────────────────────────────────────────────

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const titleLines = doc.splitTextToSize("BARTER AGREEMENT", width);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 7 + 6;

  // ── Preamble ─────────────────────────────────────────────────────────────────

  addBody(
    `This Barter Agreement ("Agreement") is made and entered into as of ` +
    `${values.effectiveDate || "__________"} (the "Effective Date"), by and between:`
  );
  gap(3);

  addBody(
    `${values.offerorName || "__________________________"}, having its address at ` +
    `${values.offerorAddress || "__________________________"} ("Offeror"),`
  );
  addBody("AND");
  addBody(
    `${values.offereeName || "__________________________"}, having its address at ` +
    `${values.offereeAddress || "__________________________"} ("Offeree").`
  );
  gap(2);
  addBody(
    `The Offeror and the Offeree may hereinafter be referred to individually as a "Party" and collectively as the "Parties".`
  );
  gap(4);

  // ── Section 1 ────────────────────────────────────────────────────────────────

  addHeading("1. BARTERED GOODS");

  addSubheading("1.1 Goods Offered by the Offeror");
  addLabelValue("Description", values.offerorGoodsDescription || "__________________________");
  addLabelValue("Condition", values.offerorGoodsCondition || "__________________________");
  gap(3);

  addSubheading("1.2 Goods Offered by the Offeree");
  addLabelValue("Description", values.offereeGoodsDescription || "__________________________");
  addLabelValue("Condition", values.offereeGoodsCondition || "__________________________");
  gap(3);

  addBody(`The above goods shall collectively be referred to as the "Bartered Goods".`);
  gap(4);

  // ── Section 2 ────────────────────────────────────────────────────────────────

  addHeading("2. DELIVERY AND EXCHANGE");
  addBody(
    `The Parties agree that the delivery and exchange of the Bartered Goods shall take place on or before ` +
    `${values.exchangeDeadline || "__________"}, at such location and in such manner as may be mutually agreed in writing` +
    `${values.exchangeLocation ? ` (${values.exchangeLocation})` : ""}. ` +
    `Each Party undertakes to deliver its respective Bartered Goods in the condition expressly stated herein and in accordance with the agreed schedule.`
  );
  gap(3);
  addBody(
    "Each Party further agrees to disclose any anticipated charges, costs, or fees prior to the commencement of any exchange of goods and/or services under this Agreement."
  );
  if (values.anticipatedCharges) {
    gap(2);
    addBody(`Disclosed charges, costs, or fees: ${values.anticipatedCharges}`);
  }
  gap(4);

  // ── Section 3 ────────────────────────────────────────────────────────────────

  addHeading("3. DELIVERY SCHEDULE");
  addBody(
    "The Parties shall strictly adhere to the delivery schedule mutually agreed upon and shall ensure that the Bartered Goods conform to the descriptions and conditions specified in this Agreement at the time of delivery."
  );
  gap(4);

  // ── Section 4 ────────────────────────────────────────────────────────────────

  addHeading("4. TERMINATION");
  addBody(
    "In the event either Party elects to terminate this Agreement or the underlying barter arrangement, the terminating Party shall fairly compensate the non-terminating Party for any goods and/or services provided up to the effective date of termination."
  );
  gap(4);

  // ── Section 5 ────────────────────────────────────────────────────────────────

  addHeading("5. AGREEMENT FREELY ENTERED INTO");
  addBody(
    "Each Party represents and warrants that it has freely, voluntarily, and lawfully entered into this Agreement and undertakes to comply fully with its terms and conditions."
  );
  gap(4);

  // ── Section 6 ────────────────────────────────────────────────────────────────

  addHeading("6. FINALITY OF VALUATION");
  addBody(
    "Each Party acknowledges and accepts the valuation assigned to the other Party's Bartered Goods as final and binding. " +
    "Each Party further represents that, to the best of its knowledge and belief, the stated valuation reflects fair market value within the relevant industry."
  );
  gap(2);
  addBody(`Offeror Goods Valuation: ${values.offerorValuation || "__________________________"}`);
  addBody(`Offeree Goods Valuation: ${values.offereeValuation || "__________________________"}`);
  gap(4);

  // ── Section 7 ────────────────────────────────────────────────────────────────

  addHeading("7. MUTUAL REPRESENTATIONS AND WARRANTIES");
  addBody("Each Party hereby represents and warrants that:");
  addBullet("It has full legal capacity, authority, and power to enter into and perform this Agreement;");
  addBullet(
    "The Bartered Goods offered by it are lawfully owned and transferable, free from all liens, encumbrances, claims, and third-party interests;"
  );
  addBullet(
    "The Bartered Goods do not infringe any intellectual property rights, proprietary rights, statutory protections, or legal rights of any third party;"
  );
  addBullet("All information provided in this Agreement is true, accurate, and complete to the best of its knowledge.");
  gap(2);
  addBody(
    `Offeror warranted ownership & no encumbrances: ${values.offerorWarrantsOwnership === "yes" ? "Yes – confirmed" : "Not confirmed"}.`
  );
  addBody(
    `Offeree warranted ownership & no encumbrances: ${values.offereeWarrantsOwnership === "yes" ? "Yes – confirmed" : "Not confirmed"}.`
  );
  gap(4);

  // ── Section 8 ────────────────────────────────────────────────────────────────

  if (values.indemnificationIncluded !== "no") {
    addHeading("8. MUTUAL INDEMNIFICATION");
    addBody(
      "Each Party agrees to indemnify, defend, and hold harmless the other Party, including its officers, directors, agents, affiliates, representatives, and employees, from and against any and all third-party claims, losses, liabilities, damages, costs, and expenses (including reasonable legal fees) arising directly or indirectly from any material breach of this Agreement, including any misrepresentation or failure to comply with the warranties set forth herein."
    );
    gap(4);
  }

  // ── Section 9 ────────────────────────────────────────────────────────────────

  addHeading("9. ALTERNATIVE DISPUTE RESOLUTION");
  addBody(
    "The Parties shall first attempt to resolve any dispute, controversy, or claim arising out of or relating to this Agreement through amicable negotiations conducted in good faith. " +
    "In the event such negotiations fail, the dispute shall be submitted to mediation in accordance with applicable statutory mediation rules."
  );
  gap(4);

  // ── Section 10 ───────────────────────────────────────────────────────────────

  addHeading("10. FURTHER ASSURANCES");
  addBody(
    "The Parties agree to execute and deliver such additional documents and take such further actions as may reasonably be required to give full effect to the intent and purpose of this Agreement."
  );
  gap(4);

  // ── Section 11 ───────────────────────────────────────────────────────────────

  addHeading("11. ASSIGNMENT");
  if (values.assignmentAllowed === "yes") {
    addBody(
      "Either Party may assign, transfer, delegate, or otherwise dispose of any rights or obligations under this Agreement, whether in whole or in part."
    );
  } else {
    addBody(
      "Neither Party may assign, transfer, delegate, or otherwise dispose of any rights or obligations under this Agreement, whether in whole or in part, without the prior written consent of the other Party. " +
      "Any purported assignment without such consent shall be null and void."
    );
  }
  gap(4);

  // ── Section 12 ───────────────────────────────────────────────────────────────

  addHeading("12. NOTICES");
  addBody(
    `Any notice required or permitted under this Agreement shall be deemed duly given if delivered personally or sent by registered or certified mail, return receipt requested` +
    `${values.noticeMethod ? ` (${values.noticeMethod})` : ""}, ` +
    `to the address stated above or to such other address as may be notified in writing by a Party.`
  );
  gap(4);

  // ── Section 13 ───────────────────────────────────────────────────────────────

  addHeading("13. ENTIRE AGREEMENT");
  addBody(
    "This Agreement constitutes the entire understanding between the Parties concerning the subject matter hereof and supersedes all prior negotiations, discussions, representations, or agreements, whether oral or written."
  );
  gap(4);

  // ── Section 14 ───────────────────────────────────────────────────────────────

  addHeading("14. WAIVER");
  addBody(
    "Failure by either Party to enforce any provision of this Agreement shall not constitute a waiver of that provision or any other provision, nor shall it affect the right to enforce such provision at a later time."
  );
  gap(4);

  // ── Section 15 ───────────────────────────────────────────────────────────────

  addHeading("15. SEVERABILITY");
  addBody(
    "If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be deemed modified to the minimum extent necessary to render it enforceable, and the remaining provisions shall remain in full force and effect."
  );
  gap(4);

  // ── Section 16 ───────────────────────────────────────────────────────────────

  addHeading("16. GOVERNING LAW");
  addBody(
    `This Agreement shall be governed by and construed in accordance with the laws of ${values.governingLaw || "__________"}.`
  );
  gap(4);

  // ── Section 17 — Signatures ──────────────────────────────────────────────────

  addHeading("17. EXECUTION AND SIGNATURES");
  addBody(
    "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above."
  );
  gap(4);

  checkPage(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("For the Offeror:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Signature: ${values.offerorSignature || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Name:      ${values.offerorName || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Date:      ${values.offerorSignDate || "__________________________"}`, margin, y);
  y += 12;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("For the Offeree:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Signature: ${values.offereeSignature || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Name:      ${values.offereeName || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Date:      ${values.offereeSignDate || "__________________________"}`, margin, y);
  y += 10;

  addBody(
    `Final confirmation: ${values.finalConfirm === "yes" ? "Confirmed by both parties." : "Not yet confirmed."}`
  );

  doc.save("barter_agreement.pdf");
};

export default function BarterAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Barter Agreement"
      subtitle="Complete 6 steps to generate your document"
      onGenerate={generatePDF}
      documentType="barter-agreement"
    />
  );
}
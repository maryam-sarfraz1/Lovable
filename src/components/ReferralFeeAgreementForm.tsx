import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date & Parties",
    fields: [
      {
        name: "effectiveDate",
        label: "Effective date of this Agreement",
        type: "date",
        required: true,
      },
      {
        name: "buyerName",
        label: "Buyer full legal name",
        type: "text",
        required: true,
        placeholder: "Full legal name or company name",
      },
      {
        name: "buyerAddress",
        label: "Buyer address",
        type: "text",
        required: true,
        placeholder: "Full address",
      },
      {
        name: "referrerName",
        label: "Referrer full legal name",
        type: "text",
        required: true,
        placeholder: "Full legal name or company name",
      },
      {
        name: "referrerAddress",
        label: "Referrer address",
        type: "text",
        required: true,
        placeholder: "Full address",
      },
      {
        name: "industry",
        label: "Industry / sector (used in Recitals and Clause 1 & 2)",
        type: "text",
        required: true,
        placeholder: "e.g. pharmaceuticals, technology, agriculture",
      },
    ],
  },
  {
    label: "Legal Compliance",
    fields: [
      {
        name: "licensedStatus",
        label: "Does the Referrer hold required licensing/certification for this industry? (Clause 1)",
        type: "select",
        required: true,
        options: [
          { value: "does", label: "Yes — Referrer does hold required licensing/certification" },
          { value: "does_not", label: "No — Referrer does not hold required licensing/certification" },
        ],
      },
    ],
  },
  {
    label: "Term & Termination",
    fields: [
      {
        name: "terminationDate",
        label: "Termination Date (Clause 2)",
        type: "date",
        required: false,
      },
      {
        name: "earlyTerminationDays",
        label: "Days' notice required for Early Termination (Clause 3)",
        type: "text",
        required: false,
        placeholder: "e.g. 30",
      },
    ],
  },
  {
    label: "Fees & Payment",
    fields: [
      {
        name: "referralFeePercent",
        label: "Referral fee as % of net value of goods purchased (Clause 6)",
        type: "text",
        required: false,
        placeholder: "e.g. 5",
      },
      {
        name: "paymentMethods",
        label: "Accepted methods of payment (Clause 6)",
        type: "text",
        required: false,
        placeholder: "e.g. bank transfer, cheque, PayPal",
      },
    ],
  },
  {
    label: "Governing Law",
    fields: [
      {
        name: "governingLaw",
        label: "Governing law / jurisdiction (Clause 15)",
        type: "text",
        required: true,
        placeholder: "e.g. laws of the State of New York, USA",
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      {
        name: "buyerSignName",
        label: "Buyer — Authorized signatory name",
        type: "text",
        required: false,
        placeholder: "Full name",
      },
      {
        name: "buyerDesignation",
        label: "Buyer — Designation / Title",
        type: "text",
        required: false,
        placeholder: "e.g. Director, CEO",
      },
      {
        name: "buyerSignDate",
        label: "Buyer — Date",
        type: "date",
        required: false,
      },
      {
        name: "referrerSignName",
        label: "Referrer — Authorized signatory name",
        type: "text",
        required: false,
        placeholder: "Full name",
      },
      {
        name: "referrerDesignation",
        label: "Referrer — Designation / Title",
        type: "text",
        required: false,
        placeholder: "e.g. Director, CEO",
      },
      {
        name: "referrerSignDate",
        label: "Referrer — Date",
        type: "date",
        required: false,
      },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  const limit = 277;
  let y = 20;

  const u = (v?: string, n = 18) => (v || "").trim() || "_".repeat(n);

  const checkBreak = (needed = lh) => {
    if (y + needed > limit) { doc.addPage(); y = 20; }
  };

  const p = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, tw);
    checkBreak(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const heading = (text: string) => {
    checkBreak(lh + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 3;
  };

  const bulletList = (items: string[]) => {
    items.forEach((item) => {
      const lines = doc.splitTextToSize(`\u2022  ${item}`, tw - 6);
      checkBreak(lines.length * lh + 1);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.text(lines, m + 4, y);
      y += lines.length * lh + 1;
    });
    y += 1;
  };

  // ── TITLE ──────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "REFERRAL FEE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.4);
  doc.line(w / 2 - tW / 2, y + 1.5, w / 2 + tW / 2, y + 1.5);
  y += 11;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────────────────
  p(
    `This Referral Fee Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)} (the "Effective Date"), by and between:`
  );
  p(`${u(values.buyerName, 22)}, of ${u(values.buyerAddress, 22)} (hereinafter referred to as the "Buyer"),`);
  p("AND", true);
  p(`${u(values.referrerName, 22)}, of ${u(values.referrerAddress, 22)} (hereinafter referred to as the "Referrer").`);
  p(`The Buyer and the Referrer may be referred to individually as a "Party" and collectively as the "Parties."`);
  y += 2;

  // ── RECITALS ────────────────────────────────────────────────────────
  p("RECITALS", true);
  p(`WHEREAS, the Buyer desires to purchase certain goods;`);
  p(`WHEREAS, the Referrer possesses industry contacts within the ${u(values.industry, 14)} sector and is willing to act as an intermediary to introduce potential sellers to the Buyer;`);
  p(`NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth herein, the Parties agree as follows:`);
  y += 2;

  // ── 1. LEGAL COMPLIANCE ─────────────────────────────────────────────
  heading("1. LEGAL COMPLIANCE");
  p(
    `The Referrer shall comply with all applicable laws, regulations, and industry requirements, including obtaining any licenses or certifications required within the ${u(values.industry, 14)} industry.`
  );
  p(
    `In the event that any such license or certification is required and the Referrer does ${values.licensedStatus === "does_not" ? "not" : ""} possess the same, the Referrer shall refrain from performing any services that require such authorization.`
  );

  // ── 2. TERM ─────────────────────────────────────────────────────────
  heading("2. TERM");
  p(
    `This Agreement shall commence on the Effective Date and shall continue until ${u(values.terminationDate, 14)} (the "Termination Date"), unless earlier terminated in accordance with this Agreement.`
  );
  p(`The Termination Date may be extended or modified by mutual written agreement of the Parties.`);

  // ── 3. TERMINATION ──────────────────────────────────────────────────
  heading("3. TERMINATION");
  p(
    `Either Party may terminate this Agreement, with or without cause, by providing ${u(values.earlyTerminationDays, 6)} days' prior written notice to the other Party (the "Early Termination").`
  );
  p(`Upon Early Termination, the Referrer shall be entitled to a pro rata payment for services performed up to the date of termination.`);
  p(`Notice delivered via email shall be deemed valid and sufficient.`);

  // ── 4. EXCLUSIVITY ──────────────────────────────────────────────────
  heading("4. EXCLUSIVITY");
  p(
    `During the Term of this Agreement, the Referrer shall have the exclusive right to introduce prospective sellers to the Buyer, provided such sellers are not already known to the Buyer prior to the introduction.`
  );

  // ── 5. RELATIONSHIP OF THE PARTIES ─────────────────────────────────
  heading("5. RELATIONSHIP OF THE PARTIES");
  p(`The Referrer is engaged as an independent contractor and shall not be deemed an employee, partner, joint venturer, or agent of the Buyer.`);
  p(`The Buyer shall have no responsibility for:`);
  bulletList([
    "payroll taxes,",
    "employee benefits, or",
    "any obligations relating to the Referrer or its personnel.",
  ]);
  p(`Upon reasonable request, the Referrer shall provide proof of appropriate insurance coverage, including workers' compensation and general liability insurance.`);

  // ── 6. FEES AND PAYMENT ─────────────────────────────────────────────
  heading("6. FEES AND PAYMENT");
  p(`This Agreement contemplates an introduction-only arrangement.`);
  p(
    `The Referrer shall be entitled to a fee equal to ${u(values.referralFeePercent, 4)}% of the net value of goods purchased by the Buyer as a direct result of the Referrer's introduction.`
  );
  p(`For the purposes of this Agreement, "net value" shall exclude:`);
  bulletList([
    "value-added tax (VAT),",
    "shipping, postage, and packaging costs,",
    "insurance costs,",
    "refunds, and",
    "any dishonored or reversed payments.",
  ]);
  p(`Upon determination of the fees due:`);
  bulletList([
    "the Referrer shall issue a valid invoice; and",
    "the Buyer shall remit payment within thirty (30) days of the invoice date.",
  ]);
  p(`Accepted methods of payment shall include: ${u(values.paymentMethods, 16)}.`);

  // ── 7. NON-CIRCUMVENTION ────────────────────────────────────────────
  heading("7. NON-CIRCUMVENTION");
  p(`During the Term of this Agreement, the Buyer shall not, directly or indirectly:`);
  bulletList([
    "bypass, avoid, or circumvent the Referrer; or",
    "engage in direct transactions with sellers introduced by the Referrer,",
  ]);
  p(`for the purpose of avoiding the payment of referral fees.`);
  p(`In the event of any such circumvention, the Referrer shall be entitled to receive the full commission as if the transaction had been completed through the Referrer.`);

  // ── 8. CONFIDENTIALITY ──────────────────────────────────────────────
  heading("8. CONFIDENTIALITY");
  p(`The Referrer agrees that it shall not, at any time:`);
  bulletList([
    "use Confidential Information for personal gain; or",
    "disclose any proprietary or confidential information of the Buyer to any third party.",
  ]);
  p(`"Confidential Information" includes, without limitation:`);
  bulletList([
    "business strategies,",
    "customer or supplier lists,",
    "pricing structures, and",
    "trade secrets.",
  ]);
  p(`This obligation shall survive the termination or expiration of this Agreement.`);

  // ── 9. ENTIRE AGREEMENT ─────────────────────────────────────────────
  heading("9. ENTIRE AGREEMENT");
  p(`This Agreement constitutes the entire understanding between the Parties and supersedes all prior or contemporaneous agreements, representations, or understandings, whether written or oral.`);

  // ── 10. SEVERABILITY ────────────────────────────────────────────────
  heading("10. SEVERABILITY");
  p(`If any provision of this Agreement is determined to be invalid or unenforceable, such provision shall be deemed modified to the minimum extent necessary to render it enforceable, and the remaining provisions shall continue in full force and effect.`);

  // ── 11. FORCE MAJEURE ───────────────────────────────────────────────
  heading("11. FORCE MAJEURE");
  p(`Neither Party shall be liable for any failure or delay in performance arising from events beyond its reasonable control, including but not limited to:`);
  bulletList([
    "acts of God,",
    "pandemics or epidemics,",
    "governmental actions,",
    "war, riots, or civil unrest.",
  ]);
  p(`Performance shall resume as soon as reasonably practicable following the cessation of such events.`);

  // ── 12. DISPUTE RESOLUTION ──────────────────────────────────────────
  heading("12. DISPUTE RESOLUTION");
  p(`The Parties shall first attempt to resolve any dispute arising under this Agreement through good faith negotiations.`);
  p(`If the dispute cannot be resolved amicably, it shall be submitted to mediation in accordance with applicable laws.`);

  // ── 13. AMENDMENTS ──────────────────────────────────────────────────
  heading("13. AMENDMENTS");
  p(`This Agreement may only be amended, modified, or supplemented by a written document duly executed by both Parties.`);

  // ── 14. WAIVER ──────────────────────────────────────────────────────
  heading("14. WAIVER");
  p(`The failure of either Party to enforce any provision of this Agreement shall not be construed as a waiver of that provision or of the right to enforce it at a later time.`);

  // ── 15. GOVERNING LAW ───────────────────────────────────────────────
  heading("15. GOVERNING LAW");
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw, 16)}.`);

  // ── 16. ATTORNEYS' FEES ─────────────────────────────────────────────
  heading("16. ATTORNEYS' FEES");
  p(`In any legal proceeding arising out of or relating to this Agreement, the prevailing Party shall be entitled to recover its reasonable attorneys' fees and costs.`);

  // ── 17. EXECUTION ───────────────────────────────────────────────────
  heading("17. EXECUTION");
  p(`This Agreement may be executed in counterparts and shall become effective as of the Effective Date first written above.`);

  y += 4;
  p("SIGNATURES", true);
  y += 2;

  // ── SIGNATURE BLOCK ─────────────────────────────────────────────────
  const col1 = m;
  const col2 = w / 2 + 4;

  const twoSigLine = (label: string, lv: string, rv: string) => {
    checkBreak(lh + 3);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    // Left
    doc.text(lt, col1, y);
    const lx = col1 + doc.getTextWidth(lt);
    const ls = (lv || "").trim();
    doc.setLineWidth(0.22);
    if (ls) {
      doc.text(ls, lx, y);
      doc.line(lx, y + 1.1, lx + Math.max(10, doc.getTextWidth(ls)), y + 1.1);
    } else {
      doc.line(lx, y + 1.1, lx + 42, y + 1.1);
    }
    // Right
    doc.text(lt, col2, y);
    const rx = col2 + doc.getTextWidth(lt);
    const rs = (rv || "").trim();
    if (rs) {
      doc.text(rs, rx, y);
      doc.line(rx, y + 1.1, rx + Math.max(10, doc.getTextWidth(rs)), y + 1.1);
    } else {
      doc.line(rx, y + 1.1, rx + 42, y + 1.1);
    }
    y += lh + 3;
  };

  checkBreak(50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Authorized Signatory (Buyer)", col1, y);
  doc.text("Authorized Signatory (Referrer)", col2, y);
  y += 7;

  twoSigLine("Name", values.buyerSignName || "", values.referrerSignName || "");
  twoSigLine("Designation", values.buyerDesignation || "", values.referrerDesignation || "");
  twoSigLine("Signature", "", "");
  twoSigLine("Date", values.buyerSignDate || "", values.referrerSignDate || "");

  doc.save("referral_fee_agreement.pdf");
};

export default function ReferralFeeAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Referral Fee Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="referralfeeagreement"
    />
  );
}
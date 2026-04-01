import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date",
    fields: [
      {
        name: "effectiveDate",
        label: "What is the effective date of this Agreement?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Seller Information",
    fields: [
      {
        name: "sellerName",
        label: "Seller full legal name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name or company name",
      },
      {
        name: "sellerAddress",
        label: "Seller address",
        type: "text",
        required: true,
        placeholder: "Full address",
      },
    ],
  },
  {
    label: "Buyer Information",
    fields: [
      {
        name: "buyerName",
        label: "Buyer full legal name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name or company name",
      },
      {
        name: "buyerAddress",
        label: "Buyer address",
        type: "text",
        required: true,
        placeholder: "Full address",
      },
    ],
  },
  {
    label: "Goods Description",
    fields: [
      {
        name: "goodsDescription",
        label: "Description of Goods",
        type: "textarea",
        required: true,
        placeholder: "Describe the products/goods being sold",
      },
      {
        name: "goodsQuantity",
        label: "Quantity",
        type: "text",
        required: true,
        placeholder: "e.g. 100 units",
      },
      {
        name: "unitPrice",
        label: "Unit Price ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 25.00",
      },
      {
        name: "totalPrice",
        label: "Total Price ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 2500.00",
      },
      {
        name: "aggregatePurchasePrice",
        label: "Aggregate Purchase Price ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 2500.00",
      },
    ],
  },
  {
    label: "Product Specifications",
    fields: [
      {
        name: "quotationDate",
        label: "Date of Seller's quotation incorporated by reference (Clause 2)",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Payment Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Payment amount due upon delivery ($) (Clause 4.1)",
        type: "text",
        required: true,
        placeholder: "e.g. 2500.00",
      },
      {
        name: "payeeDetails",
        label: "Payee details (name/bank/account) (Clause 4.1)",
        type: "text",
        required: true,
        placeholder: "e.g. ABC Corp, Bank XYZ, Acct #12345",
      },
      {
        name: "discountPercentage",
        label: "Early payment discount percentage % (Clause 4.2)",
        type: "text",
        required: false,
        placeholder: "e.g. 2",
      },
      {
        name: "discountDays",
        label: "Days from invoice date for early payment discount (Clause 4.2)",
        type: "text",
        required: false,
        placeholder: "e.g. 10",
      },
      {
        name: "interestRate",
        label: "Interest rate on overdue payments % per annum (Clause 4.3)",
        type: "text",
        required: true,
        placeholder: "e.g. 18",
      },
    ],
  },
  {
    label: "Delivery",
    fields: [
      {
        name: "deliveryDate",
        label: "Delivery deadline date (Clause 5)",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Remedies & Term",
    fields: [
      {
        name: "cureDays",
        label: "Number of days to cure a material breach (Clause 10)",
        type: "text",
        required: true,
        placeholder: "e.g. 30",
      },
      {
        name: "terminationDate",
        label: "Agreement termination date (Clause 11)",
        type: "date",
        required: true,
      },
      {
        name: "terminationNoticeDays",
        label: "Days of prior written notice to terminate (Clause 12)",
        type: "text",
        required: true,
        placeholder: "e.g. 30",
      },
    ],
  },
  {
    label: "Governing Law",
    fields: [
      {
        name: "jurisdiction",
        label: "Governing jurisdiction (Clause 22)",
        type: "text",
        required: true,
        placeholder: "e.g. State of California, USA",
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      {
        name: "sellerSignName",
        label: "Seller — Signatory Name",
        type: "text",
        required: false,
        placeholder: "Full name of authorized signatory",
      },
      {
        name: "sellerSignDate",
        label: "Seller — Signature Date",
        type: "date",
        required: false,
      },
      {
        name: "buyerSignName",
        label: "Buyer — Signatory Name",
        type: "text",
        required: false,
        placeholder: "Full name of authorized signatory",
      },
      {
        name: "buyerSignDate",
        label: "Buyer — Signature Date",
        type: "date",
        required: false,
      },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const m = 18;
  const tw = pageW - m * 2;
  const lh = 5.6;
  const limit = 277;
  let y = 20;

  const u = (v?: string, n = 18) => (v || "").trim() || "_".repeat(n);

  const checkBreak = (needed = lh) => {
    if (y + needed > limit) { doc.addPage(); y = 20; }
  };

  const setBody = () => { doc.setFont("helvetica", "normal"); doc.setFontSize(10.5); };
  const setBold = () => { doc.setFont("helvetica", "bold"); doc.setFontSize(10.5); };

  const p = (text: string, bold = false, extraGap = 2) => {
    const lines = doc.splitTextToSize(text, tw);
    checkBreak(lines.length * lh + extraGap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + extraGap;
  };

  const heading = (text: string) => {
    checkBreak(lh + 3);
    setBold();
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 3;
  };

  // ── TITLE ───────────────────────────────────────────────
  setBold();
  doc.setFontSize(14);
  const title = "PRODUCT AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.4);
  doc.line(pageW / 2 - tW / 2, y + 1.5, pageW / 2 + tW / 2, y + 1.5);
  y += 11;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────
  p(
    `This Product Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)},`
  );
  p("BY AND BETWEEN", true);
  p(
    `${u(values.sellerName, 22)}, of ${u(values.sellerAddress, 22)} (hereinafter referred to as the "Seller"),`
  );
  p("AND", true);
  p(
    `${u(values.buyerName, 22)}, of ${u(values.buyerAddress, 22)} (hereinafter referred to as the "Buyer").`
  );
  p(
    `The Seller and the Buyer may hereinafter be referred to individually as a "Party" and collectively as the "Parties".`
  );
  y += 2;

  // ── 1. SALE AND PURCHASE OF GOODS ───────────────────────
  heading("1. Sale and Purchase of Goods");
  p(
    `The Seller hereby agrees to sell, and the Buyer agrees to purchase, the following products (the "Goods") in accordance with the terms and conditions set forth in this Agreement:`
  );
  // Goods table
  const rows = [
    ["Description:", u(values.goodsDescription, 20)],
    ["Quantity:", u(values.goodsQuantity, 10)],
    ["Unit Price:", `$${u(values.unitPrice, 10)}`],
    ["Total Price:", `$${u(values.totalPrice, 10)}`],
  ];
  rows.forEach(([lbl, val]) => {
    checkBreak(lh + 1);
    setBody();
    doc.text(`\u2022  ${lbl}`, m + 4, y);
    doc.text(val, m + 40, y);
    y += lh + 1;
  });
  checkBreak(lh + 2);
  setBody();
  doc.text(`Aggregate Purchase Price: $${u(values.aggregatePurchasePrice, 10)}`, m, y);
  y += lh + 4;

  // ── 2. PRODUCT SPECIFICATIONS AND STANDARDS ──────────────
  heading("2. Product Specifications and Standards");
  p(
    `The Goods shall conform in all respects to the specifications, standards, and requirements set forth in the Seller's quotation dated ${u(values.quotationDate, 14)}, which is hereby incorporated into and made a part of this Agreement by reference.`
  );

  // ── 3. TITLE AND RISK OF LOSS ───────────────────────────
  heading("3. Title and Risk of Loss");
  p(
    `Title to and risk of loss of the Goods shall pass to the Buyer upon delivery F.O.B. Seller's facility to the Buyer or its designated agent, including any common carrier, notwithstanding any prepayment of the purchase price or arrangement of freight by the Seller.`
  );

  // ── 4. PAYMENT TERMS ─────────────────────────────────────
  heading("4. Payment Terms");
  p(
    `4.1 The Buyer shall make payment in the amount of $${u(values.paymentAmount, 10)} to ${u(values.payeeDetails, 22)} upon delivery of the Goods, unless otherwise agreed in writing.`
  );
  p(
    `4.2 A discount of ${u(values.discountPercentage, 4)}% shall apply if payment is made within ${u(values.discountDays, 4)} days from the invoice date.`
  );
  p(
    `4.3 Any overdue payment shall accrue interest at the rate of ${u(values.interestRate, 4)}% per annum, or the maximum rate permitted by applicable law, whichever is lower.`
  );
  p(
    `4.4 The Buyer shall be responsible for all costs of collection incurred by the Seller, including, without limitation, reasonable attorneys' fees.`
  );
  p(
    `4.5 Failure by the Buyer to make payment when due shall constitute a material breach, entitling the Seller, at its sole discretion, to suspend performance, terminate this Agreement, and/or pursue all available legal remedies.`
  );

  // ── 5. DELIVERY ──────────────────────────────────────────
  heading("5. Delivery");
  p(
    `Time is of the essence with respect to the Seller's delivery obligations. The Seller shall arrange shipment through a carrier of its choosing, and delivery shall be completed no later than ${u(values.deliveryDate, 14)}, unless otherwise agreed in writing.`
  );

  // ── 6. TAXES ─────────────────────────────────────────────
  heading("6. Taxes");
  p(
    `The Buyer shall be solely responsible for the payment of all applicable taxes, duties, levies, and charges arising out of or in connection with the sale of the Goods, excluding taxes based on the Seller's net income.`
  );

  // ── 7. WARRANTIES AND LIMITATION OF LIABILITY ────────────
  heading("7. Warranties and Limitation of Liability");
  p(
    `7.1 The Seller warrants that the Goods shall be free from material defects in workmanship and materials at the time of delivery.`
  );
  p(
    `7.2 Disclaimer of Damages: To the fullest extent permitted by law, the Seller shall not be liable for any indirect, incidental, special, punitive, or consequential damages, including but not limited to loss of profits, even if advised of the possibility of such damages.`
  );

  // ── 8. INSPECTION AND ACCEPTANCE ─────────────────────────
  heading("8. Inspection and Acceptance");
  p(
    `Upon receipt of the Goods, the Buyer shall have a reasonable period to inspect and verify conformity with this Agreement. In the event of non-conformity, the Buyer shall provide written notice to the Seller and may return the non-conforming Goods at the Seller's expense.`
  );

  // ── 9. EVENTS OF DEFAULT ──────────────────────────────────
  heading("9. Events of Default");
  p(`Each of the following shall constitute a material default under this Agreement:`);
  const defaults = [
    "(a) Failure to make any payment when due;",
    "(b) Insolvency, bankruptcy, or financial distress of either Party;",
    "(c) Seizure or attachment of a Party's assets by creditors or governmental authorities;",
    "(d) Failure by the Seller to deliver the Goods in accordance with this Agreement.",
  ];
  defaults.forEach((d) => p(d));

  // ── 10. REMEDIES ─────────────────────────────────────────
  heading("10. Remedies");
  p(
    `Upon the occurrence of a material default, the non-defaulting Party may provide written notice specifying the breach. The defaulting Party shall have ${u(values.cureDays, 4)} days to cure such breach. Failure to cure within the prescribed period shall result in termination of this Agreement without further notice, in addition to any other remedies available at law or in equity.`
  );

  // ── 11. TERM ─────────────────────────────────────────────
  heading("11. Term");
  p(
    `This Agreement shall commence on the Effective Date and shall continue in full force and effect until ${u(values.terminationDate, 14)}, unless terminated earlier in accordance with this Agreement.`
  );

  // ── 12. TERMINATION ──────────────────────────────────────
  heading("12. Termination");
  p(
    `Either Party may terminate this Agreement, with or without cause, upon ${u(values.terminationNoticeDays, 4)} days' prior written notice. Upon termination, the Seller shall be entitled to payment for all Goods delivered up to the effective date of termination. Notice by email shall be deemed valid.`
  );

  // ── 13. FORCE MAJEURE ─────────────────────────────────────
  heading("13. Force Majeure");
  p(
    `Neither Party shall be liable for failure or delay in performance caused by events beyond its reasonable control, including but not limited to acts of God, natural disasters, pandemics, war, riots, strikes, or supply chain disruptions. Performance shall resume as soon as reasonably practicable.`
  );

  // ── 14. DISPUTE RESOLUTION ───────────────────────────────
  heading("14. Dispute Resolution");
  p(
    `The Parties shall first attempt to resolve any dispute arising out of or in connection with this Agreement through good faith negotiations. If unresolved, the dispute shall be submitted to Alternative Dispute Resolution (ADR), including mediation, in accordance with applicable laws.`
  );

  // ── 15. CONFIDENTIALITY ──────────────────────────────────
  heading("15. Confidentiality");
  p(
    `Each Party agrees to maintain the confidentiality of all proprietary and confidential information disclosed in connection with this Agreement and shall not disclose such information to any third party without prior written consent. This obligation shall survive termination.`
  );

  // ── 16. NOTICES ──────────────────────────────────────────
  heading("16. Notices");
  p(
    `All notices under this Agreement shall be in writing and shall be deemed duly given when delivered personally or sent by certified or registered mail to the addresses of the Parties set forth above, or to such other address as may be designated in writing.`
  );

  // ── 17. ASSIGNMENT ───────────────────────────────────────
  heading("17. Assignment");
  p(
    `Neither Party may assign or transfer its rights or obligations under this Agreement without the prior written consent of the other Party, which shall not be unreasonably withheld.`
  );

  // ── 18. ENTIRE AGREEMENT ─────────────────────────────────
  heading("18. Entire Agreement");
  p(
    `This Agreement constitutes the entire agreement between the Parties and supersedes all prior and contemporaneous agreements, negotiations, or understandings, whether written or oral.`
  );

  // ── 19. AMENDMENTS ───────────────────────────────────────
  heading("19. Amendments");
  p(
    `No amendment, modification, or variation of this Agreement shall be valid unless made in writing and duly executed by both Parties.`
  );

  // ── 20. SEVERABILITY ─────────────────────────────────────
  heading("20. Severability");
  p(
    `If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.`
  );

  // ── 21. WAIVER ───────────────────────────────────────────
  heading("21. Waiver");
  p(
    `The failure of either Party to enforce any provision of this Agreement shall not be deemed a waiver of such provision or of the right to enforce it in the future.`
  );

  // ── 22. GOVERNING LAW ────────────────────────────────────
  heading("22. Governing Law");
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of ${u(values.jurisdiction, 18)}.`
  );

  // ── 23. ATTORNEYS' FEES ──────────────────────────────────
  heading("23. Attorneys' Fees");
  p(
    `In the event of any legal proceeding arising out of or relating to this Agreement, the prevailing Party shall be entitled to recover its reasonable attorneys' fees and costs.`
  );

  // ── 24. EXECUTION ────────────────────────────────────────
  heading("24. Execution");
  p(
    `This Agreement may be executed in counterparts and shall become effective as of the Effective Date first written above.`
  );

  y += 3;
  p(
    `IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.`
  );
  y += 4;

  // ── SIGNATURES ───────────────────────────────────────────
  const col1 = m;
  const col2 = pageW / 2 + 4;

  const twoSigLine = (label: string, lv: string, rv: string) => {
    checkBreak(lh + 3);
    const lt = `${label}: `;
    setBody();
    // Left column
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
    // Right column
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
  setBold();
  doc.text("SELLER", col1, y);
  doc.text("BUYER", col2, y);
  y += 7;

  twoSigLine("Signature", "", "");
  twoSigLine("Name", values.sellerSignName || "", values.buyerSignName || "");
  twoSigLine("Date", values.sellerSignDate || "", values.buyerSignDate || "");

  doc.save("product_agreement.pdf");
};

export default function ProductAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Product Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="productagreement"
    />
  );
}
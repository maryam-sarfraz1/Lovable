import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

// ==================== STEPS ====================
const steps: Array<{ label: string; fields: FieldDef[] }> = [
  // ── STEP 1: Agreement Info ────────────────────────────────────────────
  {
    label: "Agreement Date & Order",
    fields: [
      { name: "orderNumber", label: "Order Number", type: "text", required: true, placeholder: "e.g. ORD-2024-001" },
      { name: "agreementDate", label: "Effective Date of Agreement", type: "date", required: true },
    ],
  },
  // ── STEP 2: Seller ────────────────────────────────────────────────────
  {
    label: "Seller Information",
    fields: [
      { name: "sellerName", label: "Seller Full Legal Name", type: "text", required: true, placeholder: "Full legal name or company name" },
      { name: "sellerAddress", label: "Seller Principal Place of Business Address", type: "text", required: true, placeholder: "Full address" },
    ],
  },
  // ── STEP 3: Buyer ─────────────────────────────────────────────────────
  {
    label: "Buyer Information",
    fields: [
      { name: "buyerName", label: "Buyer Full Legal Name", type: "text", required: true, placeholder: "Full legal name or company name" },
      { name: "buyerAddress", label: "Buyer Principal Place of Business Address", type: "text", required: true, placeholder: "Full address" },
    ],
  },
  // ── STEP 4: Goods / Products ──────────────────────────────────────────
  {
    label: "Goods / Products",
    fields: [
      { name: "goodsDescription", label: "Description of Goods", type: "textarea", required: true, placeholder: "Describe the goods being sold..." },
      { name: "quantity", label: "Quantity", type: "text", required: true, placeholder: "e.g. 100 units" },
      { name: "unitPrice", label: "Unit Price ($)", type: "text", required: true, placeholder: "e.g. 50.00" },
      { name: "totalPrice", label: "Total Price ($)", type: "text", required: true, placeholder: "e.g. 5000.00" },
    ],
  },
  // ── STEP 5: Product Standards ─────────────────────────────────────────
  {
    label: "Product Standards",
    fields: [
      { name: "quotationDate", label: "Seller's Quotation Date (for product standards reference)", type: "date", required: true },
    ],
  },
  // ── STEP 6: Payment Terms ─────────────────────────────────────────────
  {
    label: "Payment Terms",
    fields: [
      { name: "paymentRecipient", label: "Payment to be Made to (Name)", type: "text", required: true, placeholder: "Payee name" },
      { name: "paymentAddress", label: "Payment Address", type: "text", required: true, placeholder: "Address for payment" },
      { name: "discountPercent", label: "Early Payment Discount (%)", type: "text", required: false, placeholder: "e.g. 2" },
      { name: "discountDays", label: "Discount if Paid Within (Days)", type: "text", required: false, placeholder: "e.g. 10" },
      { name: "interestRate", label: "Interest Rate on Late Payment (% per annum)", type: "text", required: false, placeholder: "e.g. 5" },
    ],
  },
  // ── STEP 7: Delivery ──────────────────────────────────────────────────
  {
    label: "Delivery",
    fields: [
      { name: "deliveryArrangedBy", label: "Delivery Arranged By", type: "text", required: true, placeholder: "Seller or Buyer name" },
      { name: "carrierSelectedBy", label: "Carrier Selected By", type: "text", required: true, placeholder: "Seller or Buyer name" },
      { name: "deliveryDate", label: "Delivery Deadline Date", type: "date", required: true },
    ],
  },
  // ── STEP 8: Inspection & Acceptance ──────────────────────────────────
  {
    label: "Inspection & Acceptance",
    fields: [
      { name: "cureDays", label: "Days for Seller to Cure Defects After Return", type: "text", required: true, placeholder: "e.g. 30" },
    ],
  },
  // ── STEP 9: Remedies on Default ───────────────────────────────────────
  {
    label: "Remedies on Default",
    fields: [
      { name: "defaultCureDays", label: "Days to Cure Default After Notice", type: "text", required: true, placeholder: "e.g. 30" },
    ],
  },
  // ── STEP 10: Governing Law ────────────────────────────────────────────
  {
    label: "Governing Law",
    fields: [
      { name: "governingLaw", label: "Governing Law / Jurisdiction", type: "text", required: true, placeholder: "e.g. State of California" },
    ],
  },
  // ── STEP 11: Seller Signature ─────────────────────────────────────────
  {
    label: "Seller Signature",
    fields: [
      { name: "sellerSignName", label: "Seller — Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "sellerSignDate", label: "Seller — Signature Date", type: "date", required: true },
    ],
  },
  // ── STEP 12: Buyer Signature ──────────────────────────────────────────
  {
    label: "Buyer Signature",
    fields: [
      { name: "buyerSignName", label: "Buyer — Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "buyerSignDate", label: "Buyer — Signature Date", type: "date", required: true },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ==================== PDF GENERATOR ====================
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  const limit = 280;
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

  // Section heading — bold, NO underline/separator line
  const heading = (text: string) => {
    checkBreak(lh + 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 3;
  };

  const bullet = (text: string) => {
    const lines = doc.splitTextToSize("\u2022  " + text, tw - 6);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m + 6, y);
    y += lines.length * lh + 2;
  };

  // Underlined signature/field line
  const sigLine = (label: string, val?: string, lineWidth = 55) => {
    checkBreak(lh + 3);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lt = `${label}: `;
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const shown = (val || "").trim();
    if (shown) {
      doc.text(shown, x, y);
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + Math.max(lineWidth, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + lineWidth, y + 1.1);
    }
    y += lh + 3;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("SALES AGREEMENT FOR PRODUCTS", w / 2, y, { align: "center" });
  y += 11;
  doc.setFontSize(10.5);

  // ── ORDER NUMBER ───────────────────────────────────────────────────────
  p(`Order Number: ${u(values.orderNumber, 12)}`);
  y += 1;

  // ── PREAMBLE ───────────────────────────────────────────────────────────
  p(
    `This Sales Agreement for Products (the "Agreement") is made and entered into as of ${u(values.agreementDate, 12)} (the "Effective Date"),`
  );
  y += 1;
  p("BY AND BETWEEN", true);
  y += 1;
  p(
    ` ${u(values.sellerName, 22)}, having its principal place of business at ${u(values.sellerAddress, 22)} (hereinafter referred to as the "Seller"),`
  );
  y += 1;
  p("AND");
  y += 1;
  p(
    ` ${u(values.buyerName, 22)}, having its principal place of business at ${u(values.buyerAddress, 22)} (hereinafter referred to as the "Buyer").`
  );
  y += 1;
  p('The Seller and the Buyer may be referred to individually as a "Party" and collectively as the "Parties."');
  y += 3;

  // ── 1. SALE OF GOODS ───────────────────────────────────────────────────
  heading("1. Sale of Goods");
  p('The Seller hereby agrees to sell, and the Buyer agrees to purchase, the following goods (the "Goods") in accordance with the terms and conditions set forth in this Agreement:');
  bullet(`Description of Goods: ${u(values.goodsDescription)}`);
  bullet(`Quantity: ${u(values.quantity)}`);
  bullet(`Unit Price: $${u(values.unitPrice)}`);
  bullet(`Total Price: $${u(values.totalPrice)}`);
  p(`Total Purchase Price: $${u(values.totalPrice)}`);
  y += 1;

  // ── 2. PRODUCT STANDARDS ───────────────────────────────────────────────
  heading("2. Product Standards");
  p(
    `The Goods shall conform strictly to the specifications, standards, and requirements set forth in the Seller's quotation dated ${u(values.quotationDate, 12)}, which is hereby incorporated into and forms an integral part of this Agreement.`
  );
  y += 1;

  // ── 3. TITLE AND RISK OF LOSS ──────────────────────────────────────────
  heading("3. Title and Risk of Loss");
  p(
    "The Buyer shall bear all reasonable shipping costs in accordance with its designated shipping instructions. Notwithstanding the foregoing, the Seller shall be responsible for proper packaging, shipment, and safe delivery of the Goods, and shall bear all risk of loss or damage to the Goods until delivery has been completed and accepted by the Buyer."
  );
  p(
    "Title to the Goods shall pass to the Buyer upon full payment and delivery, unless otherwise agreed in writing."
  );
  y += 1;

  // ── 4. PAYMENT TERMS ───────────────────────────────────────────────────
  heading("4. Payment Terms");
  p(
    `Payment shall be made to ${u(values.paymentRecipient)}, at ${u(values.paymentAddress)}, in the total amount of $${u(values.totalPrice)}, upon delivery of all Goods described herein, unless otherwise agreed in writing.`
  );
  p(
    `A discount of ${u(values.discountPercent, 3)}% shall apply if full payment is received within ${u(values.discountDays, 3)} days from the date of invoice.`
  );
  p(
    `Any amount not paid when due shall accrue interest at the rate of ${u(values.interestRate, 3)}% per annum, or the maximum rate permitted by applicable law, whichever is lower. The Buyer shall be responsible for all costs of collection incurred by the Seller, including, without limitation, reasonable attorneys' fees.`
  );
  p(
    "Failure by the Buyer to make payment when due shall constitute a material breach of this Agreement, entitling the Seller, at its sole discretion, to terminate this Agreement and/or pursue all available legal remedies, including those set forth under Section 10 (Remedies on Default)."
  );
  y += 1;

  // ── 5. DELIVERY ────────────────────────────────────────────────────────
  heading("5. Delivery");
  p(
    `Time is of the essence in the performance of this Agreement. Delivery of the Goods shall be arranged by ${u(values.deliveryArrangedBy)} through a carrier selected by ${u(values.carrierSelectedBy)}. The Goods shall be delivered no later than ${u(values.deliveryDate, 12)}, unless otherwise agreed in writing.`
  );
  y += 1;

  // ── 6. TAXES ───────────────────────────────────────────────────────────
  heading("6. Taxes");
  p(
    "The Buyer shall be responsible for the payment of all applicable taxes, duties, levies, and charges of any kind arising from or related to the sale of the Goods under this Agreement, excluding any taxes based on the Seller's net income."
  );
  y += 1;

  // ── 7. WARRANTIES AND LIMITATION OF LIABILITY ──────────────────────────
  heading("7. Warranties and Limitation of Liability");
  p(
    "The Seller warrants that the Goods shall be free from material defects in workmanship and materials and shall conform to the agreed specifications."
  );
  p(
    "Except as expressly provided herein, the Seller disclaims all other warranties, whether express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose."
  );
  p(
    "In no event shall the Seller be liable for any indirect, incidental, special, or consequential damages, including loss of profits or business interruption, even if advised of the possibility of such damages."
  );
  y += 1;

  // ── 8. INSPECTION AND ACCEPTANCE ──────────────────────────────────────
  heading("8. Inspection and Acceptance");
  p(
    "Upon receipt of the Goods, the Buyer shall have a reasonable opportunity to inspect and verify conformity with this Agreement."
  );
  p(
    "If the Buyer, acting in good faith, determines that any portion of the Goods is non-conforming, the Buyer may reject and return such Goods at the Seller's expense, provided that written notice specifying the reasons for rejection is given promptly."
  );
  p(
    `The Seller shall have ${u(values.cureDays, 3)} days from receipt of the returned Goods to cure any defects or replace the non-conforming Goods.`
  );
  y += 1;

  // ── 9. EVENTS OF DEFAULT ───────────────────────────────────────────────
  heading("9. Events of Default");
  p("Each of the following events shall constitute a material default under this Agreement:");
  p("(a) Failure of either Party to make any required payment when due;");
  p("(b) Insolvency, bankruptcy, or assignment for the benefit of creditors by either Party;");
  p("(c) Seizure, levy, or attachment of a Party's assets by any creditor or governmental authority;");
  p("(d) Failure to deliver or perform obligations in accordance with the terms of this Agreement.");
  y += 1;

  // ── 10. REMEDIES ON DEFAULT ────────────────────────────────────────────
  heading("10. Remedies on Default");
  p(
    "Upon the occurrence of a material default, the non-defaulting Party may, in addition to any other remedies available under applicable law, terminate this Agreement by providing written notice specifying the nature of the default."
  );
  p(
    `The defaulting Party shall have ${u(values.defaultCureDays, 3)} days from receipt of such notice to cure the default. Failure to cure within the specified period shall entitle the non-defaulting Party to pursue all available legal and equitable remedies.`
  );
  y += 1;

  // ── 11. FORCE MAJEURE ──────────────────────────────────────────────────
  heading("11. Force Majeure");
  p(
    'Neither Party shall be liable for any failure or delay in performance due to events beyond its reasonable control ("Force Majeure Event"), provided that prompt written notice is given.'
  );
  p(
    "Force Majeure Events include, but are not limited to, acts of God, epidemics, pandemics, governmental actions, natural disasters, war, riots, strikes, lockouts, or other labor disputes."
  );
  p(
    "The affected Party shall use commercially reasonable efforts to mitigate the impact of such events and resume performance as soon as practicable."
  );
  y += 1;

  // ── 12. DISPUTE RESOLUTION ────────────────────────────────────────────
  heading("12. Dispute Resolution");
  p(
    "The Parties shall first attempt to resolve any dispute arising out of or relating to this Agreement through good faith negotiations."
  );
  p(
    "If such dispute is not resolved, the Parties agree to submit the matter to alternative dispute resolution, including mediation, in accordance with applicable laws and procedures."
  );
  y += 1;

  // ── 13. CONFIDENTIALITY ───────────────────────────────────────────────
  heading("13. Confidentiality");
  p(
    "Each Party agrees to maintain the confidentiality of all non-public, proprietary, or confidential information obtained in connection with this Agreement and shall not disclose such information to any third party without prior written consent."
  );
  p(
    "Upon termination of this Agreement, each Party shall promptly return or destroy all confidential materials belonging to the other Party."
  );
  y += 1;

  // ── 14. NOTICES ───────────────────────────────────────────────────────
  heading("14. Notices");
  p(
    "All notices required or permitted under this Agreement shall be in writing and shall be deemed duly given when delivered personally or sent by certified mail, return receipt requested, to the addresses set forth above, or to such other address as may be designated in writing."
  );
  y += 1;

  // ── 15. ENTIRE AGREEMENT ──────────────────────────────────────────────
  heading("15. Entire Agreement");
  p(
    "This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, negotiations, or understandings, whether written or oral."
  );
  y += 1;

  // ── 16. SEVERABILITY ──────────────────────────────────────────────────
  heading("16. Severability");
  p(
    "If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect."
  );
  y += 1;

  // ── 17. AMENDMENTS ────────────────────────────────────────────────────
  heading("17. Amendments");
  p(
    "This Agreement may be amended or modified only by a written instrument duly executed by both Parties."
  );
  y += 1;

  // ── 18. WAIVER ────────────────────────────────────────────────────────
  heading("18. Waiver");
  p(
    "The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of such provision or of the right to enforce it at any later time."
  );
  y += 1;

  // ── 19. GOVERNING LAW ─────────────────────────────────────────────────
  heading("19. Governing Law");
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw)}.`
  );
  y += 1;

  // ── 20. EXECUTION ─────────────────────────────────────────────────────
  heading("20. Execution");
  p(
    "This Agreement may be executed in counterparts and shall become effective as of the Effective Date first written above."
  );
  y += 3;
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");
  y += 6;

  // ── SIGNATURES (vertical blocks per draft) ────────────────────────────
  checkBreak(55);

  p("SELLER:", true);
  sigLine("Name", values.sellerSignName || values.sellerName);
  sigLine("Signature");
  sigLine("Date", values.sellerSignDate);
  y += 4;

  p("BUYER:", true);
  sigLine("Name", values.buyerSignName || values.buyerName);
  sigLine("Signature");
  sigLine("Date", values.buyerSignDate);

  doc.save("sales_agreement_products.pdf");
};

// ==================== COMPONENT ====================
export default function SaleAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Sales Agreement for Products"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="saleagreement"
    />
  );
}
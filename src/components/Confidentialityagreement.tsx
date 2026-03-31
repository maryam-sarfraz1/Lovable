import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State / Province", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "zip", label: "ZIP / Postal Code", type: "text", required: true },
    ],
  },
  {
    label: "Effective Date and Owner",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "ownerName", label: "Owner / Disclosing party full legal name", type: "text", required: true },
      { name: "ownerAddress", label: "Owner address", type: "text", required: true },
      { name: "ownerTitle", label: "Owner title / designation", type: "text", required: false, placeholder: "e.g. Director, CEO" },
      { name: "ownerBusinessDescription", label: "Owner business description", type: "text", required: true },
    ],
  },
  {
    label: "Recipient",
    fields: [
      { name: "recipientName", label: "Recipient / Receiving party full legal name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: true },
      { name: "recipientTitle", label: "Recipient title / designation", type: "text", required: false, placeholder: "e.g. Manager, Partner" },
      { name: "recipientBusinessDescription", label: "Recipient business description", type: "text", required: true },
    ],
  },
  {
    label: "Confidentiality Terms",
    fields: [
      { name: "permittedPurpose", label: "Permitted purpose (authorized in writing by Owner)", type: "text", required: true },
      { name: "returnDestroyDays", label: "Return/destruction timeline in business days", type: "text", required: true, placeholder: "5" },
      { name: "survivalYears", label: "Confidentiality survival period in years", type: "text", required: true },
    ],
  },
  {
    label: "Governing Law",
    fields: [
      { name: "governingLawState", label: "Governing law state / jurisdiction", type: "text", required: true },
      { name: "courtJurisdiction", label: "Courts with exclusive jurisdiction", type: "text", required: true, placeholder: "e.g. State of New York" },
    ],
  },
  {
    label: "Owner Signature",
    fields: [
      { name: "ownerSignName", label: "Owner name", type: "text", required: true },
      { name: "ownerSignTitle", label: "Owner title", type: "text", required: false, placeholder: "e.g. Director" },
      { name: "ownerSignature", label: "Owner signature name", type: "text", required: true },
      { name: "ownerSignDate", label: "Owner signature date", type: "date", required: true },
    ],
  },
  {
    label: "Recipient Signature",
    fields: [
      { name: "recipientSignName", label: "Recipient name", type: "text", required: true },
      { name: "recipientSignTitle", label: "Recipient title", type: "text", required: false, placeholder: "e.g. Manager" },
      { name: "recipientSignature", label: "Recipient signature name", type: "text", required: true },
      { name: "recipientSignDate", label: "Recipient signature date", type: "date", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [{ name: "reviewedBy", label: "Reviewed by (optional)", type: "text", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 16;
  const textW = pageW - margin * 2;
  const lineH = 5.3;
  const pageLimit = 280;
  let y = 20;

  // ── Core helpers ────────────────────────────────────────────────────

  const u = (val?: string, fallback = "____________________") =>
    val && val.trim() ? val.trim() : fallback;

  const checkY = (needed: number) => {
    if (y + needed > pageLimit) {
      doc.addPage();
      y = 20;
    }
  };

  const p = (text: string, bold = false, indent = 0, gapAfter = 2.5) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + gapAfter);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + gapAfter;
  };

  const heading = (text: string) => {
    checkY(lineH + 7);
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10.2);
  };

  const subHeading = (num: string, title: string) => {
    checkY(lineH + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.2);
    doc.text(`${num}  ${title}`, margin, y);
    y += lineH + 1.5;
  };

  const bullet = (text: string, indent = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + 2.2);
    doc.text("\u2022", margin + 1.5, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 2.2;
  };

  const clause = (letter: string, text: string, indent = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    const lbl = `(${letter}) `;
    const lblW = doc.getTextWidth(lbl);
    const lines = doc.splitTextToSize(text, textW - indent - lblW);
    checkY(lines.length * lineH + 2.2);
    doc.text(lbl, margin + indent, y);
    doc.text(lines, margin + indent + lblW, y);
    y += lines.length * lineH + 2.2;
  };

  const miscClause = (num: string, title: string, body: string) => {
    checkY(lineH * 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.2);
    const lbl = `${num}  ${title} \u2014 `;
    const lblW = doc.getTextWidth(lbl);
    doc.text(lbl, margin, y);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(body, textW - lblW);
    if (lines[0]) doc.text(lines[0], margin + lblW, y);
    y += lineH;
    for (let i = 1; i < lines.length; i++) {
      checkY(lineH + 1);
      doc.text(lines[i], margin + 4, y);
      y += lineH;
    }
    y += 2.5;
  };

  const field = (label: string, value: string, lineLen = 65) => {
    checkY(lineH + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.2);
    const lbl = `${label}: `;
    doc.text(lbl, margin, y);
    const lblW = doc.getTextWidth(lbl);
    doc.setFont("helvetica", "normal");
    const val = value.trim();
    if (val) {
      doc.text(val, margin + lblW, y);
      doc.line(margin + lblW, y + 1.2, margin + lblW + Math.max(lineLen, doc.getTextWidth(val) + 2), y + 1.2);
    } else {
      doc.line(margin + lblW, y + 1.2, margin + lblW + lineLen, y + 1.2);
    }
    y += lineH + 2.5;
  };

  // ── TITLE ──────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "CONFIDENTIALITY AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const halfTW = doc.getTextWidth(title) / 2;
  doc.line(pageW / 2 - halfTW, y + 1.3, pageW / 2 + halfTW, y + 1.3);
  y += 10;
  doc.setFontSize(10.2);

  // ── PREAMBLE ───────────────────────────────────────────────────────
  p(
    `This Confidentiality Agreement (the "Agreement") is made and entered into as of ${u(v.effectiveDate, "<insert date>")} (the "Effective Date"), by and between:`
  );
  p(`${u(v.ownerName, "[Full Legal Name of Owner]")}, having its principal place of business at ${u(v.ownerAddress, "[Address]")} (hereinafter referred to as the "Owner"); and`, false, 4);
  p(`${u(v.recipientName, "[Full Legal Name of Recipient]")}, having its principal place of business at ${u(v.recipientAddress, "[Address]")} (hereinafter referred to as the "Recipient").`, false, 4);
  p(`The Owner and the Recipient may hereinafter be referred to individually as a "Party" and collectively as the "Parties."`);

  // ── RECITALS ───────────────────────────────────────────────────────
  heading("RECITALS");
  p(`WHEREAS, the Owner is engaged in the business of ${u(v.ownerBusinessDescription, "[Insert Description]")};`);
  p(`WHEREAS, the Recipient is engaged in the business of ${u(v.recipientBusinessDescription, "[Insert Description]")};`);
  p(`WHEREAS, the Owner possesses certain confidential, proprietary, and commercially valuable information of substantial commercial value;`);
  p(`WHEREAS, the Recipient desires to receive such information for the limited purpose of ${u(v.permittedPurpose, "[the Permitted Purpose]")} (the "Permitted Purpose");`);
  p(`WHEREAS, the Owner is willing to disclose such Confidential Information to the Recipient subject to the terms and conditions set forth herein;`);
  p(`WHEREAS, the Owner possesses certain confidential, proprietary, and trade secret information of substantial commercial value and has agreed to disclose certain of such information to the Recipient solely for the limited purposes contemplated under this Agreement;`);
  p(`WHEREAS, the Recipient agrees to receive such information in strict confidence and to use it only in accordance with the terms of this Agreement;`);
  p(`NOW, THEREFORE, in consideration of the mutual covenants and undertakings contained herein, and intending to be legally bound, the Parties hereby agree as follows:`);

  // ── 1. DEFINITION OF CONFIDENTIAL INFORMATION ─────────────────────
  heading("1.  DEFINITION OF CONFIDENTIAL INFORMATION");

  subHeading("1.1", "Meaning");
  p(
    `"Confidential Information" shall mean any and all information, whether oral, written, electronic, graphic, or in any other form, disclosed by or on behalf of the Owner to the Recipient, whether before or after the Effective Date, including but not limited to any and all non-public, proprietary, or confidential data, information, and material:`,
    false, 4, 2
  );
  bullet("Business plans, strategies, forecasts, and financial information;");
  bullet("Business records, operational data, and strategic plans;");
  bullet("Financial statements, projections, and budgets;");
  bullet("Trade secrets, know-how, processes, formulas, and methodologies;");
  bullet("Technical data, designs, specifications, and software;");
  bullet("Product designs, specifications, prototypes, and technical data;");
  bullet("Software, source code, and algorithms;");
  bullet("Customer lists, supplier information, and market data;");
  bullet("Customer lists, supplier details, pricing information, and marketing plans;");
  bullet("Any analyses, compilations, studies, or other materials derived from such information.");

  y += 1;
  p(`Confidential Information shall also include any information that is designated as confidential or which, by its nature or circumstances of disclosure, ought reasonably to be understood to be confidential.`, false, 4, 2);

  subHeading("1.2", "Exclusions");
  p("Confidential Information shall not include information that the Recipient can demonstrate by written evidence:", false, 4, 2);
  clause("a", "is or becomes publicly available through no breach of this Agreement;");
  clause("b", "was lawfully in the possession of the Recipient prior to disclosure by the Owner;");
  clause("c", "is lawfully received by the Recipient from a third party without restriction and without breach of any obligation of confidentiality;");
  clause("d", "is independently developed by the Recipient without use of or reference to the Confidential Information;");
  clause("e", "is required to be disclosed pursuant to applicable law, regulation, or court order, provided that the Recipient gives prompt written notice to the Owner and cooperates in seeking protective measures;");
  clause("f", "is approved for release in writing by the Owner; or");
  clause("g", "both parties agree in writing is not confidential.");

  // ── 2. OBLIGATIONS OF THE RECIPIENT ───────────────────────────────
  heading("2.  OBLIGATIONS OF THE RECIPIENT");

  subHeading("2.1", "Non-Disclosure and Non-Use");
  p(
    `The Recipient shall hold all Confidential Information in the strictest confidence, maintaining it with at least the same degree of care as it uses to protect its own confidential information, but in no event less than reasonable care. The Recipient shall not disclose, publish, or otherwise disseminate Confidential Information to any third party without the prior written consent of the Owner, and shall not use Confidential Information for any purpose other than ${u(v.permittedPurpose, "[the limited purpose]")} authorized in writing by the Owner.`,
    false, 4, 3
  );

  subHeading("2.2", "No Copying or Modification");
  p(
    `The Recipient shall not copy, reproduce, adapt, summarize, or otherwise duplicate or modify the Confidential Information, in whole or in part, without the prior written consent of the Owner, except as strictly necessary for the permitted purpose.`,
    false, 4, 3
  );

  subHeading("2.3", "Disclosure to Representatives / Employees / Agents");
  p(
    `The Recipient shall restrict access to the Confidential Information to its employees, officers, advisors, contractors, or agents ("Representatives") who have a strict and legitimate need to know for the Permitted Purpose and who are bound by confidentiality obligations no less stringent than those contained herein. The Recipient shall be fully responsible for any breach of this Agreement by its Representatives.`,
    false, 4, 3
  );

  subHeading("2.4", "Additional Restrictions");
  p("The Recipient shall not:", false, 4, 2);
  bullet("copy, reproduce, adapt, or modify the Confidential Information without prior written consent;");
  bullet("reverse engineer, decompile, or disassemble any Confidential Information;");
  bullet("use the Confidential Information for any competitive or unauthorized purpose.");

  subHeading("2.5", "Injunctive Relief / Unauthorized Disclosure and Remedies");
  p(
    `The Recipient acknowledges that any unauthorized disclosure or use of Confidential Information may cause irreparable harm to the Owner for which monetary damages may be inadequate. Accordingly, in the event of any actual or threatened breach, the Owner shall be entitled to:`,
    false, 4, 2
  );
  bullet("seek injunctive or equitable relief without the necessity of proving actual damages or posting bond;");
  bullet("recover all losses, damages, costs, and expenses (including reasonable legal fees);");
  bullet("pursue any other remedies available under applicable law or in equity.");

  // ── 3. RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION ──────────
  heading("3.  RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION");
  p(
    `Upon the earlier of (i) written request by the Owner or (ii) termination of this Agreement, the Recipient shall, within ${u(v.returnDestroyDays, "five (5)")} business days:`,
    false, 0, 2
  );
  clause("a", "promptly return or destroy all Confidential Information, including all copies, summaries, and derivatives thereof;");
  clause("b", "permanently delete or destroy all electronic copies; and");
  clause("c", "certify in writing within the specified period that such return or destruction has been completed, signed by an authorized representative.");
  p(`Notwithstanding the foregoing, the Recipient may retain one archival copy solely for legal or compliance purposes, subject to continued confidentiality obligations.`, false, 4, 2);

  // ── 4. NO LICENSE OR TRANSFER OF RIGHTS ───────────────────────────
  heading("4.  NO LICENSE OR TRANSFER OF RIGHTS");
  p(`Nothing contained in this Agreement shall be construed as granting, by implication, estoppel, or otherwise, any license or right under any intellectual property of the Owner. Except for the limited right to use the Confidential Information for the permitted purpose, no license, ownership interest, or other rights to intellectual property are granted under this Agreement.`);
  p(`All Confidential Information shall remain the sole and exclusive property of the Owner. Any improvements, suggestions, or feedback provided by the Recipient relating to the Confidential Information shall be deemed the property of the Owner.`);

  // ── 5. NO WARRANTY ─────────────────────────────────────────────────
  heading("5.  NO WARRANTY");
  p(`All Confidential Information is provided on an "AS IS" basis. The Owner makes no representations or warranties, express or implied, including but not limited to accuracy, completeness, or reliability of the information, or merchantability or fitness for a particular purpose. The Owner shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of the Confidential Information.`);

  // ── 6. RELATIONSHIP OF THE PARTIES ────────────────────────────────
  heading("6.  RELATIONSHIP OF THE PARTIES");
  p(`Nothing in this Agreement shall be deemed to create any partnership, joint venture, agency, employment, or fiduciary relationship between the Parties. Neither Party shall have authority to bind the other in any manner whatsoever. This Agreement shall not obligate either party to enter into any business relationship or transaction.`);

  // ── 7. TERM AND SURVIVAL ───────────────────────────────────────────
  heading("7.  TERM AND SURVIVAL");
  subHeading("7.1", "Term");
  p(
    `This Agreement shall commence on the Effective Date and shall remain in effect unless terminated by either Party upon written notice, or until terminated by mutual written agreement.`,
    false, 4, 3
  );
  subHeading("7.2", "Survival");
  p(
    `Notwithstanding termination, the Recipient's obligations of confidentiality and non-use shall survive for a period of ${u(v.survivalYears, "[Insert Years]")} years following the date of disclosure of the Confidential Information, or for the maximum period permitted by applicable law, or for such longer period as the information remains confidential and proprietary.`,
    false, 4, 3
  );

  // ── 8. AMENDMENTS ─────────────────────────────────────────────────
  heading("8.  AMENDMENTS");
  p(`This Agreement may be amended or modified only by a written instrument duly executed by both Parties.`);

  // ── 9. SEVERABILITY ───────────────────────────────────────────────
  heading("9.  SEVERABILITY");
  p(`If any provision of this Agreement is held to be invalid, illegal, or unenforceable, such provision shall be modified to the minimum extent necessary to render it enforceable, and the remaining provisions shall remain in full force and effect.`);

  // ── 10. WAIVER ─────────────────────────────────────────────────────
  heading("10.  WAIVER");
  p(`The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of such provision or any future enforcement thereof.`);

  // ── 11. ASSIGNMENT ─────────────────────────────────────────────────
  heading("11.  ASSIGNMENT");
  p(`Neither Party may assign or transfer its rights or obligations under this Agreement without the prior written consent of the other Party. Any attempted assignment in violation of this clause shall be null and void.`);

  // ── 12. GOVERNING LAW AND JURISDICTION ────────────────────────────
  heading("12.  GOVERNING LAW AND JURISDICTION");
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(v.governingLawState, "[Insert Governing State/Jurisdiction]")}, without regard to conflict of law principles.`);
  p(`The courts of ${u(v.courtJurisdiction, "[Insert Court Jurisdiction]")} shall have exclusive jurisdiction over any disputes arising out of or in connection with this Agreement.`);

  // ── 13. MISCELLANEOUS ──────────────────────────────────────────────
  heading("13.  MISCELLANEOUS");
  miscClause("13.1", "Entire Agreement",
    "This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior discussions, negotiations, or agreements, whether oral or written."
  );
  miscClause("13.2", "Counterparts",
    "This Agreement may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument."
  );
  miscClause("13.3", "Notices",
    "All notices required or permitted under this Agreement shall be in writing and shall be deemed duly given when delivered personally, sent by registered or certified mail, or delivered by a recognized courier service to the addresses set forth herein."
  );

  // ── IN WITNESS WHEREOF ─────────────────────────────────────────────
  checkY(lineH + 6);
  y += 3;
  p(`IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.`, false, 0, 5);

  // Owner block
  checkY(lineH * 7);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.2);
  doc.text("THE OWNER (Disclosing Party):", margin, y);
  y += lineH + 2;
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + 80, y);
  y += lineH + 2;
  field("Name", u(v.ownerSignName, ""));
  field("Title", u(v.ownerSignTitle || v.ownerTitle, ""));
  field("Signature", u(v.ownerSignature, ""));
  field("Date", u(v.ownerSignDate, ""));

  y += 5;

  // Recipient block
  checkY(lineH * 7);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.2);
  doc.text("THE RECIPIENT (Receiving Party):", margin, y);
  y += lineH + 2;
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + 80, y);
  y += lineH + 2;
  field("Name", u(v.recipientSignName, ""));
  field("Title", u(v.recipientSignTitle || v.recipientTitle, ""));
  field("Signature", u(v.recipientSignature, ""));
  field("Date", u(v.recipientSignDate, ""));

  y += 3;

  // Jurisdiction footer
  checkY(lineH + 3);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.2);
  const jurisdiction = [v.city, v.state, v.country, v.zip].filter(Boolean).join(", ");
  if (jurisdiction.trim()) {
    p(`Jurisdiction: ${jurisdiction}`);
  }

  if (v.reviewedBy?.trim()) {
    p(`Reviewed by: ${v.reviewedBy.trim()}`);
  }

  doc.save("confidentiality_agreement.pdf");
};

export default function ConfidentialityAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Confidentiality Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="confidentialityagreement"
    />
  );
}
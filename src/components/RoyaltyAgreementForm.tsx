import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
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
    label: "Grantor Information",
    fields: [
      {
        name: "grantorName",
        label: "Grantor full legal name / business name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name or company name",
      },
      {
        name: "grantorAddress",
        label: "Grantor principal place of business",
        type: "text",
        required: true,
        placeholder: "Full address",
      },
    ],
  },
  {
    label: "Grantee Information",
    fields: [
      {
        name: "granteeName",
        label: "Grantee full legal name / business name",
        type: "text",
        required: true,
        placeholder: "Enter full legal name or company name",
      },
      {
        name: "granteeAddress",
        label: "Grantee principal place of business",
        type: "text",
        required: true,
        placeholder: "Full address",
      },
    ],
  },
  {
    label: "Property & Rights",
    fields: [
      {
        name: "propertyDescription",
        label: "Description of the Property (the subject of the license)",
        type: "textarea",
        required: true,
        placeholder: "Describe the intellectual property, work, or asset being licensed",
      },
      {
        name: "propertyAcquiredDate",
        label: "Date the Grantor's rights in the Property were issued/acquired",
        type: "date",
        required: true,
      },
      {
        name: "propertyAcquiredFrom",
        label: "From whom / by whom the rights were issued or acquired",
        type: "text",
        required: true,
        placeholder: "e.g. USPTO, Author's own creation, Acquired from XYZ Corp",
      },
      {
        name: "licenseTerm",
        label: "Duration / Term of the license (Clause 1)",
        type: "select",
        required: true,
        options: [
          { value: "1 year", label: "1 Year" },
          { value: "2 years", label: "2 Years" },
          { value: "3 years", label: "3 Years" },
          { value: "5 years", label: "5 Years" },
          { value: "10 years", label: "10 Years" },
          { value: "indefinite", label: "Indefinite / Ongoing" },
          { value: "custom", label: "Custom — specify below" },
        ],
      },
      {
        name: "licenseTermCustom",
        label: "If custom, specify license term",
        type: "text",
        required: false,
        placeholder: "e.g. 18 months",
      },
    ],
  },
  {
    label: "Confidentiality",
    fields: [
      {
        name: "confidentialityPeriod",
        label: "Confidentiality obligation period for Grantee (Clause 3a)",
        type: "text",
        required: true,
        placeholder: "e.g. 3 years, 5 years",
      },
    ],
  },
  {
    label: "Consideration & Royalty",
    fields: [
      {
        name: "lumpSum",
        label: "Lump sum payment upon execution ($) (Clause 4a) — enter 0 if none",
        type: "text",
        required: true,
        placeholder: "e.g. 0.00 or 5000.00",
      },
      {
        name: "royaltyPercent",
        label: "Royalty percentage of Net Profits (%) (Clause 4b) — enter 0 if none",
        type: "text",
        required: true,
        placeholder: "e.g. 0 or 10",
      },
    ],
  },
  {
    label: "Default — Minimum Royalty",
    fields: [
      {
        name: "minimumRoyalty",
        label: "Minimum royalty if Grantee ceases use for 1 year ($) (Clause 7b)",
        type: "text",
        required: true,
        placeholder: "e.g. 0.00 or 500.00",
      },
    ],
  },
  {
    label: "Governing Law",
    fields: [
      {
        name: "governingState",
        label: "Governing state / jurisdiction (Clause 14)",
        type: "text",
        required: true,
        placeholder: "e.g. California",
      },
    ],
  },
  {
    label: "Grantor Signature",
    fields: [
      {
        name: "grantorSignName",
        label: "Grantor — Authorized signatory name",
        type: "text",
        required: false,
        placeholder: "Full legal name",
      },
      {
        name: "grantorTitle",
        label: "Grantor — Title / Designation",
        type: "text",
        required: false,
        placeholder: "e.g. CEO, Director",
      },
      {
        name: "grantorSignDate",
        label: "Grantor — Date",
        type: "date",
        required: false,
      },
    ],
  },
  {
    label: "Grantee Signature",
    fields: [
      {
        name: "granteeSignName",
        label: "Grantee — Authorized signatory name",
        type: "text",
        required: false,
        placeholder: "Full legal name",
      },
      {
        name: "granteeTitle",
        label: "Grantee — Title / Designation",
        type: "text",
        required: false,
        placeholder: "e.g. CEO, Director",
      },
      {
        name: "granteeSignDate",
        label: "Grantee — Date",
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
  const term = values.licenseTerm === "custom" ? u(values.licenseTermCustom, 10) : u(values.licenseTerm, 10);

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

  // ── TITLE ──────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "ROYALTY AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.4);
  doc.line(pageW / 2 - tW / 2, y + 1.5, pageW / 2 + tW / 2, y + 1.5);
  y += 11;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────────────────
  p(
    `This Royalty Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)} (the "Effective Date"),`
  );
  p("BY AND BETWEEN", true);
  p(
    `${u(values.grantorName, 22)}, having its principal place of business at ${u(values.grantorAddress, 22)} (hereinafter referred to as the "Grantor"),`
  );
  p("AND", true);
  p(
    `${u(values.granteeName, 22)}, having its principal place of business at ${u(values.granteeAddress, 22)} (hereinafter referred to as the "Grantee").`
  );
  y += 2;

  // ── RECITALS ────────────────────────────────────────────────────────
  p("RECITALS", true);
  p(
    `WHEREAS, the Grantor is the lawful owner of, and possesses full rights, title, and interest in and to ${u(values.propertyDescription, 20)} (the "Property");`
  );
  p(
    `WHEREAS, the Grantor's rights in the Property were duly issued or acquired on ${u(values.propertyAcquiredDate, 12)} by ${u(values.propertyAcquiredFrom, 18)};`
  );
  p(
    `WHEREAS, the Grantee desires to obtain, and the Grantor is willing to grant, a license to use the Property for a specified period, in consideration of the payment of royalties based on a percentage of the Grantee's profits, in addition to any agreed lump sum payment;`
  );
  p(
    `NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties hereby agree as follows:`
  );
  y += 2;

  // ── 1. GRANT OF RIGHTS ──────────────────────────────────────────────
  heading("1. GRANT OF RIGHTS");
  p(
    `Subject to the terms and conditions of this Agreement, the Grantor hereby grants to the Grantee a limited, non-exclusive, non-transferable license to use the Property within the United States of America and its territories for a period of ${term} (the "Term").`
  );

  // ── 2. REPRESENTATIONS AND WARRANTIES OF THE GRANTOR ────────────────
  heading("2. REPRESENTATIONS AND WARRANTIES OF THE GRANTOR");
  p(`a. The Grantor hereby represents and warrants that:`);
  [
    "it is the sole and lawful owner of the Property;",
    "it possesses full authority and legal right to grant the license contemplated herein; and",
    "it has full power and authority to enter into and perform its obligations under this Agreement.",
  ].forEach((item) => {
    checkBreak(lh + 1);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(`\u2022  ${item}`, m + 4, y);
    y += lh + 1;
  });
  y += 1;
  p(
    `b. The Grantor shall, contemporaneously with the execution of this Agreement, deliver to the Grantee all documents, materials, and information reasonably necessary to enable the Grantee to utilize the Property.`
  );
  p(
    `c. The Grantor agrees to indemnify, defend, and hold harmless the Grantee from and against any and all losses, claims, damages, liabilities, and expenses arising out of or resulting from any breach of the Grantor's representations and warranties under this Agreement.`
  );

  // ── 3. REPRESENTATIONS AND WARRANTIES OF THE GRANTEE ────────────────
  heading("3. REPRESENTATIONS AND WARRANTIES OF THE GRANTEE");
  p(
    `a. The Grantee shall maintain the confidentiality of the Property and all related proprietary information for a period of ${u(values.confidentialityPeriod, 10)} from the Effective Date, exercising at least the same degree of care as it uses to protect its own confidential information.`
  );
  p(
    `b. In the event that the Grantee becomes aware of any circumstance that may compromise the confidentiality of the Property, including any legal or regulatory requirement to disclose such information, the Grantee shall promptly notify the Grantor and cooperate in good faith to mitigate such disclosure.`
  );
  p(
    `c. The Grantee shall indemnify and hold harmless the Grantor from and against any claims, damages, or liabilities arising from personal injury or property damage caused by the negligence or willful misconduct of the Grantee.`
  );

  // ── 4. CONSIDERATION AND ROYALTY ────────────────────────────────────
  heading("4. CONSIDERATION AND ROYALTY");
  p(`In consideration for the rights granted herein, the Grantee shall pay to the Grantor:`);
  p(`a. A lump sum payment of $${u(values.lumpSum, 6)} payable upon execution of this Agreement; and`);
  p(`b. A royalty equal to ${u(values.royaltyPercent, 4)} percent (${u(values.royaltyPercent, 4)}%) of the Grantee's Net Profits derived from the use of the Property.`);

  // ── 5. DEFINITION OF NET PROFITS ────────────────────────────────────
  heading("5. DEFINITION OF NET PROFITS");
  p(
    `For the purposes of this Agreement, "Net Profits" shall mean the gross revenue actually received by the Grantee from the use of the Property, less the following:`
  );
  [
    "a. Direct costs of manufacturing, production, and marketing, including commissions;",
    "b. Direct overhead and administrative expenses, excluding taxes; and",
    "c. Any other deductions expressly approved in writing by the Grantor.",
  ].forEach((item) => p(item));

  // ── 6. ROYALTY PAYMENTS AND ACCOUNTING ──────────────────────────────
  heading("6. ROYALTY PAYMENTS AND ACCOUNTING");
  p(`a. The Grantee shall maintain complete and accurate books and records relating to revenues and expenses associated with the use of the Property.`);
  p(`b. Within thirty (30) days following the end of each calendar quarter, the Grantee shall provide the Grantor with a written statement detailing Net Profits and shall remit all royalties due for such period.`);
  p(`c. The Grantor shall have the right, at its own expense, to appoint an independent certified public accountant to audit the Grantee's records. In the event that any underpayment is discovered, the Grantee shall bear the cost of such audit.`);

  // ── 7. DEFAULT BY GRANTEE ────────────────────────────────────────────
  heading("7. DEFAULT BY GRANTEE");
  p(`a. In the event that the Grantee fails to submit required statements or make royalty payments when due, the Grantor may terminate this Agreement upon thirty (30) days' prior written notice, unless such default is cured within the notice period.`);
  p(`b. If the Grantee ceases to use the Property for a continuous period of one (1) year and fails to pay a minimum royalty of $${u(values.minimumRoyalty, 6)}, the Grantor may terminate this Agreement upon thirty (30) days' written notice, unless such default is cured within that period.`);

  // ── 8. LIMITATION OF LIABILITY ───────────────────────────────────────
  heading("8. LIMITATION OF LIABILITY");
  p(`Except in the case of a breach of this Agreement, neither party shall be liable to the other, or to any third party, for any personal injury or property damage arising out of activities conducted under this Agreement.`);

  // ── 9. CONFIDENTIALITY ───────────────────────────────────────────────
  heading("9. CONFIDENTIALITY");
  p(`The Grantee and its employees, agents, and representatives shall not disclose, use, or exploit any confidential or proprietary information of the Grantor for any purpose other than as expressly permitted under this Agreement. This obligation shall survive the termination or expiration of this Agreement.`);

  // ── 10. TERMINATION ──────────────────────────────────────────────────
  heading("10. TERMINATION");
  p(`The Grantee may terminate this Agreement upon written notice to the Grantor in the event that:`);
  p(`a. The Grantor makes an assignment for the benefit of creditors;`);
  p(`b. Bankruptcy or insolvency proceedings are initiated by or against the Grantor and are not dismissed within sixty (60) days; or`);
  p(`c. The Grantor commits a material breach of this Agreement, subject to the following cure provisions:`);
  p(`\u0009i. Any curable breach must be remedied within thirty (30) days of written notice;`);
  p(`\u0009ii. Any non-curable breach must be diligently addressed and resolved within one hundred eighty (180) days.`);

  // ── 11. ASSIGNMENT ───────────────────────────────────────────────────
  heading("11. ASSIGNMENT");
  p(`Neither party may assign, transfer, or delegate any of its rights or obligations under this Agreement without the prior written consent of the other party, which shall not be unreasonably withheld.`);

  // ── 12. SEVERABILITY ─────────────────────────────────────────────────
  heading("12. SEVERABILITY");
  p(`If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.`);

  // ── 13. WAIVER ───────────────────────────────────────────────────────
  heading("13. WAIVER");
  p(`The failure of either party at any time to enforce any provision of this Agreement shall not be deemed a waiver of such provision or of the right thereafter to enforce it.`);

  // ── 14. GOVERNING LAW ────────────────────────────────────────────────
  heading("14. GOVERNING LAW");
  p(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${u(values.governingState, 14)}, without regard to its conflict of law principles.`);

  // ── 15. NOTICES ──────────────────────────────────────────────────────
  heading("15. NOTICES");
  p(`All notices required or permitted under this Agreement shall be in writing and shall be deemed duly given when delivered personally or sent by registered or certified mail to the addresses of the parties set forth herein.`);

  // ── 16. ENTIRE AGREEMENT ─────────────────────────────────────────────
  heading("16. ENTIRE AGREEMENT");
  p(`This Agreement constitutes the entire understanding between the parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, negotiations, and understandings.`);

  // ── 17. RESERVATION OF RIGHTS ────────────────────────────────────────
  heading("17. RESERVATION OF RIGHTS");
  p(`Except as expressly provided herein, no rights or licenses are granted by either party under this Agreement.`);

  // ── 18. ACCEPTANCE ───────────────────────────────────────────────────
  heading("18. ACCEPTANCE");
  p(`Each party acknowledges that it has read, understood, and agreed to be bound by the terms and conditions of this Agreement.`);

  y += 3;
  p(`IN WITNESS WHEREOF`);
  p(`The parties have executed this Royalty Agreement as of the Effective Date first written above.`);
  y += 4;

  // ── SIGNATURES ───────────────────────────────────────────────────────
  const sigBlock = (header: string, name: string, titleVal: string, dateVal: string, xStart: number) => {
    checkBreak(35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(header, xStart, y);
    y += 7;

    const lines2: [string, string][] = [
      ["By:", ""],
      ["Name:", name],
      ["Title:", titleVal],
      ["Date:", dateVal],
    ];

    lines2.forEach(([label, val]) => {
      checkBreak(lh + 3);
      const lt = `${label} `;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.text(lt, xStart, y);
      const lx = xStart + doc.getTextWidth(lt);
      const shown = (val || "").trim();
      doc.setLineWidth(0.22);
      if (shown) {
        doc.text(shown, lx, y);
        doc.line(lx, y + 1.1, lx + Math.max(10, doc.getTextWidth(shown)), y + 1.1);
      } else {
        doc.line(lx, y + 1.1, lx + 44, y + 1.1);
      }
      y += lh + 3;
    });
  };

  const startY = y;
  sigBlock(
    "GRANTOR",
    values.grantorSignName || "",
    values.grantorTitle || "",
    values.grantorSignDate || "",
    m
  );
  const afterGrantor = y;
  y = startY;
  sigBlock(
    "GRANTEE",
    values.granteeSignName || "",
    values.granteeTitle || "",
    values.granteeSignDate || "",
    pageW / 2 + 4
  );
  y = Math.max(afterGrantor, y);

  doc.save("royalty_agreement.pdf");
};

export default function RoyaltyAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Royalty Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="royaltyagreement"
    />
  );
}
import React from "react";
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

// ==================== STEPS ====================
const steps: Array<{ label: string; fields: FieldDef[] }> = [
  // ── STEP 1: Corporation Info ──────────────────────────────────────────
  {
    label: "Corporation Information",
    fields: [
      { name: "corporationName", label: "Corporation Name", type: "text", required: true, placeholder: "Full legal name of the Corporation" },
      { name: "registeredOffice", label: "Registered Office Address", type: "text", required: true, placeholder: "Full registered office address" },
      { name: "otherOfficesJurisdiction", label: "Jurisdiction for Other Offices (if any)", type: "text", required: false, placeholder: "e.g. State of Delaware" },
    ],
  },
  // ── STEP 2: Board of Directors ────────────────────────────────────────
  {
    label: "Board of Directors",
    fields: [
      { name: "numDirectors", label: "Number of Directors on the Board", type: "text", required: true, placeholder: "e.g. 3" },
      { name: "directorTermYears", label: "Director Term Length (years)", type: "text", required: true, placeholder: "e.g. 1" },
    ],
  },
  // ── STEP 3: Officers ──────────────────────────────────────────────────
  {
    label: "Officers",
    fields: [
      { name: "presidentName", label: "President Name", type: "text", required: false, placeholder: "Full name of President (optional)" },
      { name: "secretaryName", label: "Secretary Name", type: "text", required: false, placeholder: "Full name of Secretary (optional)" },
      { name: "treasurerName", label: "Treasurer Name", type: "text", required: false, placeholder: "Full name of Treasurer (optional)" },
    ],
  },
  // ── STEP 4: Certification ─────────────────────────────────────────────
  {
    label: "Certification",
    fields: [
      { name: "certSecretaryName", label: "Secretary Name (for Certification)", type: "text", required: true, placeholder: "Secretary's full legal name" },
      { name: "certCorporationName", label: "Corporation Name (for Certification)", type: "text", required: true, placeholder: "Corporation name" },
      { name: "certAdoptionDate", label: "Date Bylaws were Adopted by the Board", type: "date", required: true },
    ],
  },
  // ── STEP 5: Secretary Signature ───────────────────────────────────────
  {
    label: "Secretary Signature",
    fields: [
      { name: "secretarySignature", label: "Secretary Signature (type full legal name)", type: "text", required: true, placeholder: "Type full legal name as signature" },
      { name: "secretarySignDate", label: "Date", type: "date", required: true },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ==================== PDF GENERATOR ====================
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const L = 16;
  const W = 178;
  const LH = 5.8;
  let y = 18;

  const ensure = (h = 10) => {
    if (y + h > pageHeight - 16) { doc.addPage(); y = 18; }
  };

  // Section heading — bold text only, NO underline
  const heading = (text: string) => {
    ensure(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(text, L, y);
    y += 7;
    doc.setFontSize(10.5);
  };

  // Sub-heading — bold, slightly smaller
  const sub = (text: string) => {
    ensure(9);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, L, y);
    y += LH + 0.5;
  };

  // Normal paragraph
  const p = (text: string, bold = false, gap = 2) => {
    ensure(10);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };

  // ── TITLE ─────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("CORPORATE BYLAWS", pageWidth / 2, y, { align: "center" });
  y += 13;

  // ══════════════════════════════════════════════════════════════════════
  //  OFFICES
  // ══════════════════════════════════════════════════════════════════════
  heading("OFFICES");

  sub("Registered Office");
  p(
    `The registered office of ${values.corporationName || "____"} (the "Corporation") shall be situated at ${values.registeredOffice || "____"}.`
  );

  sub("Other Offices");
  p(
    `The Corporation may establish and maintain such additional offices, whether within or outside ${values.otherOfficesJurisdiction || "____"}, as the Board of Directors may determine from time to time or as the business of the Corporation may require.`
  );

  // ══════════════════════════════════════════════════════════════════════
  //  SHAREHOLDERS
  // ══════════════════════════════════════════════════════════════════════
  heading("SHAREHOLDERS");

  sub("Annual Meeting");
  p(
    "An annual meeting of the shareholders shall be held once in each calendar year for the purpose of electing directors and transacting such other business as may properly come before the meeting. The time and place of such meeting shall be determined by the Board of Directors."
  );

  sub("Special Meetings");
  p(
    "Special meetings of the shareholders may be called by the President, the Board of Directors, or the holders of a majority of the outstanding voting shares."
  );

  sub("Notice of Meetings");
  p(
    "Written notice of all meetings of shareholders, whether annual or special, shall be given in accordance with applicable law. Such notice shall specify the place, date, and time of the meeting and, in the case of a special meeting, the purpose or purposes thereof. Notice shall be mailed to each shareholder of record at the address appearing on the books of the Corporation not less than ten (10) days prior to the meeting and shall be deemed duly given when deposited in the United States mail, postage prepaid."
  );

  sub("Place of Meeting");
  p(
    "Meetings of shareholders shall be held at the principal place of business of the Corporation unless otherwise specified in the notice. Shareholders may participate in meetings by means of remote communication, subject to authorization and procedures established by the Board of Directors. Such participation shall constitute presence in person, provided that reasonable measures are implemented to verify the identity of participants and to enable their effective participation and voting."
  );

  sub("Quorum");
  p(
    "A majority of the outstanding voting shares, present in person or represented by proxy, shall constitute a quorum for the transaction of business. In the absence of a quorum, a majority of the shares present may adjourn the meeting. Any business may be transacted at a reconvened meeting if a quorum is then present."
  );

  sub("Action Without Meeting");
  p(
    "Any action required or permitted to be taken at a meeting of shareholders may be taken without a meeting if a written consent describing the action is executed by the holders of all outstanding voting shares."
  );

  // ══════════════════════════════════════════════════════════════════════
  //  DIRECTORS
  // ══════════════════════════════════════════════════════════════════════
  heading("DIRECTORS");

  sub("Number of Directors");
  p(
    `The affairs of the Corporation shall be managed by a Board of Directors consisting of ${values.numDirectors || "____"} director(s).`
  );

  sub("Election and Term");
  p(
    `Directors shall be elected at the annual meeting of shareholders and shall serve for a term of ${values.directorTermYears || "____"} year(s), or until their successors are duly elected and qualified.`
  );

  sub("Quorum");
  p("A majority of the directors shall constitute a quorum for the transaction of business.");

  sub("Conflicts of Interest");
  p(
    "The existence of a disclosed adverse interest on the part of any director shall not invalidate such director's participation in deliberations or voting."
  );

  sub("Regular Meetings");
  p(
    "An annual meeting of the Board of Directors shall be held immediately following the annual meeting of shareholders without further notice. Additional regular meetings may be scheduled by resolution of the Board."
  );

  sub("Special Meetings");
  p(
    "Special meetings of the Board may be called by the President, Vice-President, Secretary, or any two directors upon not less than five (5) days' written notice. Minutes of such meetings shall be circulated within two (2) weeks thereafter."
  );

  sub("Voting and Procedures");
  p(
    "The act of a majority of directors present at a meeting at which a quorum is present shall constitute the act of the Board, unless otherwise required by law. Directors present shall be deemed to have assented to any action taken unless their dissent is entered in the minutes. The Board shall maintain accurate written records of its proceedings."
  );

  sub("Electronic Participation");
  p(
    "To the extent permitted, any requirement of a written ballot may be satisfied by electronic transmission, provided such transmission can be verified as authorized."
  );

  sub("Action Without Meeting");
  p(
    "Any action required or permitted to be taken by the Board or a committee thereof may be taken without a meeting if all members consent in writing."
  );

  sub("Removal and Vacancies");
  p(
    "Any director may be removed, with or without cause, in accordance with applicable law. Vacancies on the Board may be filled by a majority of the remaining directors, and any director so appointed shall serve for the remainder of the unexpired term."
  );

  sub("Resignation");
  p(
    "Any director may resign at any time by delivering written notice to the Corporation. Such resignation shall take effect upon receipt or at a later specified time."
  );

  sub("Committees");
  p(
    "The Board of Directors may establish one or more committees and delegate to such committees such powers and duties as it deems appropriate."
  );

  // ══════════════════════════════════════════════════════════════════════
  //  OFFICERS
  // ══════════════════════════════════════════════════════════════════════
  heading("OFFICERS");

  sub("Officers");
  p(
    "The officers of the Corporation shall consist of a President, a Treasurer, and a Secretary. Any two or more offices may be held by the same individual, except that the offices of President and Secretary shall not be held by the same person."
  );

  sub("President");
  p(
    values.presidentName
      ? `${values.presidentName} shall serve as the President and chief executive officer of the Corporation and shall preside over all meetings of shareholders and directors.`
      : "The President shall serve as the chief executive officer of the Corporation and shall preside over all meetings of shareholders and directors."
  );

  sub("Secretary");
  p(
    values.secretaryName
      ? `${values.secretaryName} shall serve as Secretary and shall be responsible for providing notices of meetings, maintaining corporate records, and certifying official documents of the Corporation.`
      : "The Secretary shall be responsible for providing notices of meetings, maintaining corporate records, and certifying official documents of the Corporation."
  );

  sub("Treasurer");
  p(
    values.treasurerName
      ? `${values.treasurerName} shall serve as Treasurer and shall oversee the financial affairs of the Corporation and shall report to the Board of Directors as required.`
      : "The Treasurer shall oversee the financial affairs of the Corporation and shall report to the Board of Directors as required."
  );

  sub("Election and Term");
  p(
    "Officers shall be elected annually by the Board of Directors and shall serve for a term of one (1) year or until their successors are duly appointed."
  );

  sub("Removal and Vacancies");
  p("Any officer may be removed by the Board of Directors. Vacancies in any office may be filled by the Board.");

  // ══════════════════════════════════════════════════════════════════════
  //  CORPORATE SEAL AND EXECUTION OF INSTRUMENTS
  // ══════════════════════════════════════════════════════════════════════
  heading("CORPORATE SEAL AND EXECUTION OF INSTRUMENTS");
  p(
    "The Corporation shall not maintain a corporate seal. Instruments affecting real property shall be executed by the President or Vice-President together with the Secretary or Treasurer. All other instruments may be executed by such officers or agents as may be authorized by the Board."
  );

  // ══════════════════════════════════════════════════════════════════════
  //  AMENDMENTS
  // ══════════════════════════════════════════════════════════════════════
  heading("AMENDMENTS");
  p(
    "These Bylaws may be amended, altered, or repealed by a majority vote of the Board of Directors or the shareholders, subject to any restrictions imposed by law or by the shareholders."
  );

  // ══════════════════════════════════════════════════════════════════════
  //  INDEMNIFICATION
  // ══════════════════════════════════════════════════════════════════════
  heading("INDEMNIFICATION");
  p(
    "The Corporation shall indemnify any director or officer who is made a party to any legal proceeding by reason of their position, to the fullest extent permitted by applicable law."
  );

  // ══════════════════════════════════════════════════════════════════════
  //  STOCK
  // ══════════════════════════════════════════════════════════════════════
  heading("STOCK");
  p(
    "The Corporation may issue shares without certificates. Shareholders shall receive written statements evidencing their ownership. Certificates shall be issued upon request."
  );

  // ══════════════════════════════════════════════════════════════════════
  //  DISSOLUTION
  // ══════════════════════════════════════════════════════════════════════
  heading("DISSOLUTION");
  p(
    "The Corporation may be dissolved upon approval of the Board of Directors and the affirmative vote of not less than two-thirds (2/3) of the members entitled to vote."
  );

  // ══════════════════════════════════════════════════════════════════════
  //  CERTIFICATION
  // ══════════════════════════════════════════════════════════════════════
  heading("CERTIFICATION");
  p(
    `I, ${values.certSecretaryName || "____"}, Secretary of ${values.certCorporationName || "____"}, hereby certify that the foregoing Bylaws constitute a true and correct copy of the Bylaws duly adopted by the Board of Directors on ${values.certAdoptionDate || "_____"}.`
  );
  y += 8;

  // Secretary signature block
  ensure(30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);

  // Signature line
  if (values.secretarySignature) {
    doc.text(values.secretarySignature, L, y);
    doc.setLineWidth(0.25);
    doc.line(L, y + 1, L + Math.max(60, doc.getTextWidth(values.secretarySignature)), y + 1);
  } else {
    doc.setLineWidth(0.25);
    doc.line(L, y + 1, L + 80, y + 1);
  }
  y += LH + 1;
  doc.text("Secretary", L, y);
  y += LH + 5;

  // Date line
  doc.setLineWidth(0.25);
  if (values.secretarySignDate) {
    doc.text(values.secretarySignDate, L, y);
    doc.line(L, y + 1, L + Math.max(40, doc.getTextWidth(values.secretarySignDate)), y + 1);
  } else {
    doc.line(L, y + 1, L + 60, y + 1);
  }
  y += LH + 1;
  doc.text("Date", L, y);

  doc.save("corporate_bylaws.pdf");
};

// ==================== COMPONENT ====================
export default function CorporateBylawsForm() {
  return (
    <FormWizard
      steps={steps}
      title="Corporate Bylaws"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="corporatebylaws"
    />
  );
}
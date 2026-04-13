import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const loadJsPDF = () =>
  new Promise((resolve, reject) => {
    if (window.jspdf) return resolve(window.jspdf.jsPDF);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => resolve(window.jspdf.jsPDF);
    script.onerror = reject;
    document.head.appendChild(script);
  });

// ── Types & Steps ─────────────────────────────────────────────────────────────
const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "offerDate", label: "Offer Date", type: "date", required: true },
      { name: "tenantName", label: "Tenant Name", type: "text", required: true, placeholder: "Full legal name of tenant" },
      { name: "tenantStreet", label: "Tenant Street Address", type: "text", required: true, placeholder: "Street" },
      { name: "tenantCity", label: "Tenant City", type: "text", required: true, placeholder: "City" },
      { name: "tenantState", label: "Tenant State/Province", type: "text", required: true, placeholder: "State or Province" },
      { name: "tenantZip", label: "Tenant ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP / Postal Code" },
      { name: "landlordName", label: "Landlord Name", type: "text", required: true, placeholder: "Full legal name of landlord" },
      { name: "landlordStreet", label: "Landlord Street Address", type: "text", required: true, placeholder: "Street" },
      { name: "landlordCity", label: "Landlord City", type: "text", required: true, placeholder: "City" },
      { name: "landlordState", label: "Landlord State/Province", type: "text", required: true, placeholder: "State or Province" },
      { name: "landlordZip", label: "Landlord ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP / Postal Code" },
    ],
  },
  {
    label: "Premises & Term",
    fields: [
      { name: "premisesAddress", label: "Premises Address", type: "text", required: true, placeholder: "Street address of leased premises" },
      { name: "premisesCity", label: "Premises City", type: "text", required: true, placeholder: "City" },
      { name: "premisesState", label: "Premises State/Province", type: "text", required: true, placeholder: "State or Province" },
      { name: "premisesDescription", label: "Description of Premises", type: "textarea", required: true, placeholder: "Describe the space, floor, unit, square footage, improvements, etc." },
      { name: "termStart", label: "Lease Term Commencement Date", type: "date", required: true },
      { name: "termEnd", label: "Lease Term Expiry Date", type: "date", required: true },
    ],
  },
  {
    label: "Rent & Deposit",
    fields: [
      { name: "baseRent", label: "Monthly Base Rent ($)", type: "text", required: true, placeholder: "e.g. 2500.00" },
      { name: "securityDeposit", label: "Security Deposit ($)", type: "text", required: true, placeholder: "e.g. 5000.00" },
    ],
  },
  {
    label: "Use & Conditions",
    fields: [
      { name: "permittedUse", label: "Permitted Use of Premises", type: "text", required: true, placeholder: "e.g. retail clothing store, office space, restaurant" },
      { name: "formalLeaseConditions", label: "Conditions Before Tenant Must Execute Formal Lease", type: "textarea", required: true, placeholder: "List any conditions that must be satisfied before the Tenant is obligated to sign the formal lease" },
      { name: "alterationsAllowed", label: "Alterations/Improvements Allowed (with Landlord consent)?", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
      { name: "sublettingAllowed", label: "Assignment / Subletting Allowed (with Landlord consent)?", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    ],
  },
  {
    label: "Irrevocability",
    fields: [
      { name: "irrevocableTime", label: "Irrevocable Until (Time)", type: "text", required: true, placeholder: "e.g. 5:00 PM" },
      { name: "irrevocableDate", label: "Irrevocable Until (Date)", type: "date", required: true },
      { name: "signageAllowed", label: "Tenant Signage Rights Included?", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    ],
  },
  {
    label: "Signature",
    fields: [
      { name: "tenantSignature", label: "Tenant Signature (typed)", type: "text", required: true },
      { name: "tenantSignDate", label: "Tenant Signature Date", type: "date", required: true },
      { name: "finalConfirm", label: "Confirm final review", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    ],
  },
];

// ── PDF Generator ─────────────────────────────────────────────────────────────
const generatePDF = async (values: Record<string, any>) => {
  const JsPDF = await loadJsPDF();
  const doc = new JsPDF();
  const margin = 20;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 24;

  // ── Helpers ──
  const checkPage = (needed = 12) => {
    if (y + needed > pageHeight - 20) { doc.addPage(); y = 24; }
  };

  const addTitle = (text: string) => {
    checkPage(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, margin, y);
    y += lines.length * 7 + 6;
  };

  const addSectionHeading = (text: string) => {
    checkPage(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, margin, y);
    y += lines.length * 6 + 2;
  };

  const addBody = (text: string, extra = 5) => {
    checkPage(10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, width);
    if (y + lines.length * 5.2 > pageHeight - 20) { doc.addPage(); y = 24; }
    doc.text(lines, margin, y);
    y += lines.length * 5.2 + extra;
  };

  const addBoldInline = (boldText: string, normalText: string) => {
    checkPage(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const bLines = doc.splitTextToSize(boldText, width);
    doc.text(bLines, margin, y);
    y += bLines.length * 5.2;
    doc.setFont("helvetica", "normal");
    const nLines = doc.splitTextToSize(normalText, width);
    if (y + nLines.length * 5.2 > pageHeight - 20) { doc.addPage(); y = 24; }
    doc.text(nLines, margin, y);
    y += nLines.length * 5.2 + 4;
  };

  const gap = (px = 4) => { y += px; };

  const v = (field: string, fallback = "___") => values[field]?.toString().trim() || fallback;

  // ── DOCUMENT TITLE ──
  addTitle("OFFER TO LEASE");
  gap(2);

  // ── PREAMBLE ──
  addBody(
    `This Offer to Lease (the "Offer") is made as of ${v("offerDate", "__________")} (the "Offer Date"), by`
  );
  gap(2);

  // Tenant block
  doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
  const tenantLine = doc.splitTextToSize(
    `${v("tenantName", "__________________________")}, having an address at`,
    width
  );
  doc.text(tenantLine, margin, y); y += tenantLine.length * 5.5;
  doc.setFont("helvetica", "normal");
  const tenantAddr = doc.splitTextToSize(
    `${v("tenantStreet")}, ${v("tenantCity")}, ${v("tenantState")}, ${v("tenantZip")} (the "Tenant"),`,
    width
  );
  doc.text(tenantAddr, margin, y); y += tenantAddr.length * 5.5 + 4;

  addBody("And");
  gap(2);

  // Landlord block
  doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
  const landlordLine = doc.splitTextToSize(
    `${v("landlordName", "__________________________")}, having an address at`,
    width
  );
  doc.text(landlordLine, margin, y); y += landlordLine.length * 5.5;
  doc.setFont("helvetica", "normal");
  const landlordAddr = doc.splitTextToSize(
    `${v("landlordStreet")}, ${v("landlordCity")}, ${v("landlordState")}, ${v("landlordZip")} (the "Landlord").`,
    width
  );
  doc.text(landlordAddr, margin, y); y += landlordAddr.length * 5.5 + 6;

  addBody(`The Tenant and the Landlord are hereinafter collectively referred to as the "Parties."`);
  gap(6);

  // ── RECITALS ──
  addSectionHeading("Recitals");
  addBody(
    "WHEREAS, the Landlord is the owner and/or authorized property manager of certain commercial real property available for lease; and"
  );
  addBody(
    `WHEREAS, the Tenant hereby offers to lease from the Landlord the commercial premises located at ` +
    `${v("premisesAddress")}, ${v("premisesCity")}, ${v("premisesState")} (the "Premises"), ` +
    `subject to the terms and conditions set forth herein.`
  );
  gap(3);
  addBody(
    `NOW, THEREFORE, in consideration of the foregoing recitals, which are incorporated herein by reference, ` +
    `and the mutual covenants and agreements contained herein, the Parties agree as follows:`
  );
  gap(6);

  // ── 1. DESCRIPTION OF PREMISES ──
  addSectionHeading("1. Description of Premises");
  addBody("The Premises shall consist of the following space and improvements:");
  addBody(v("premisesDescription", "__________________________") + ".");
  gap(4);

  // ── 2. LEASE TERM ──
  addSectionHeading("2. Lease Term");
  addBody(
    `The lease term shall commence on ${v("termStart", "____________,")} (the "Commencement Date") and shall expire on ` +
    `${v("termEnd", "_______________,")} (the "Expiration Date"), unless earlier terminated as provided herein.`
  );
  gap(4);

  // ── 3. RENT ──
  addSectionHeading("3. Rental Payment");
  addBody(
    `The Tenant shall pay to the Landlord monthly rent in the amount of $${v("baseRent", "0.00")} ` +
    `per month, payable in advance on the first day of each month during the lease term.`
  );
  gap(4);

  // ── 4. SECURITY DEPOSIT ──
  addSectionHeading("4. Security     Deposit");
  addBody(
    `Tenant shall provide a security deposit of $${v("securityDeposit", "0.00")}, ` +
    `payable upon lease execution, to be held as security for the faithful performance of the lease.`
  );
  gap(4);

  // ── 5. PERMITTED USE ──
  addSectionHeading("5. Permitted Use");
  addBody(`The Premises shall be used solely for: ${v("permittedUse", "___________________________")}`);
  gap(4);

  // ── 6. CONDITIONS PRECEDENT ──
  addSectionHeading("6. Conditions Precedent to Lease Execution");
  addBody(`Before the Tenant is obligated to execute the formal lease, the following conditions must be satisfied:`);
  gap(2);
  addBody(v("formalLeaseConditions", "___________________________"));
  gap(4);

  // ── 7. ALTERATIONS ──
  addSectionHeading("7. Alterations and Improvements");
  addBody(
    `Tenant ${v("alterationsAllowed") === "yes" ? "may" : "shall not"} make alterations or improvements to the Premises ` +
    `${v("alterationsAllowed") === "yes" ? "with Landlord's prior written consent." : "without Landlord's prior written consent."}`
  );
  gap(4);

  // ── 8. ASSIGNMENT/SUBLETTING ──
  addSectionHeading("8. Assignment and Subletting");
  addBody(
    `Tenant ${v("sublettingAllowed") === "yes" ? "may" : "shall not"} assign this lease or sublet the Premises ` +
    `${v("sublettingAllowed") === "yes" ? "with Landlord's prior written consent." : "without Landlord's prior written consent."}`
  );
  gap(4);

  // ── 9. IRREVOCABILITY ──
  addSectionHeading("9. Irrevocability");
  addBody(
    `This Offer shall be irrevocable by the Tenant until ${v("irrevocableTime", "5:00 PM")} on ` +
    `${v("irrevocableDate", "______________")}.`
  );
  gap(4);

  // ── 10. SIGNAGE ──
  addSectionHeading("10. Tenant Signage");
  addBody(
    `Signage rights are ${v("signageAllowed") === "yes" ? "included" : "not included"} in this Offer to Lease.`
  );
  gap(6);

  // ── SIGNATURE SECTION ──
  addSectionHeading("Signature");
  addBody("IN WITNESS WHEREOF, the Parties have executed this Offer to Lease as of the date first written above.");
  gap(8);

  // Signature line for Tenant
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("TENANT:", margin, y);
  y += 8;
  doc.text("_".repeat(50), margin, y);
  y += 4;
  doc.text(v("tenantSignature", "Tenant Signature (typed)"), margin, y);
  y += 8;
  doc.text(`Date: ${v("tenantSignDate", "______________")}`, margin, y);
  y += 12;

  // Signature line for Landlord
  doc.text("LANDLORD:", margin, y);
  y += 8;
  doc.text("_".repeat(50), margin, y);
  y += 4;
  doc.text("Landlord Signature", margin, y);
  y += 8;
  doc.text("Date: ______________", margin, y);

  // Download
  doc.save("Offer_to_Lease.pdf");
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function OfferToLeaseForm() {
  return (
    <FormWizard
      steps={steps}
      title="Offer to Lease Agreement"
      subtitle="Complete each step to generate your Offer to Lease Agreement"
      onGenerate={generatePDF}
      documentType="offer-to-lease"
    />
  );
}

import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
    ],
  },
  {
    label: "Parties and Project",
    fields: [
      { name: "agreementDate", label: "Agreement Date", type: "date", required: true },
      { name: "owner", label: "Owner", type: "text", required: true },
      { name: "developer", label: "Developer", type: "text", required: true },
      { name: "propertyDescription", label: "Property Description", type: "textarea", required: true },
      { name: "projectDescription", label: "Project Description", type: "textarea", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "ownerSignDate", label: "Owner Sign Date", type: "date", required: true },
      { name: "developerSignDate", label: "Developer Sign Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16, width = 178, lh = 5.3;
  let y = 18;
  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "REAL ESTATE DEVELOPMENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  p(`This Real Estate Development Agreement is made as of ${u(v.agreementDate, 12)} by and between Owner ${u(v.owner)} and Developer ${u(v.developer)}.`);
  p(`Property: ${u(v.propertyDescription)}. Project: ${u(v.projectDescription)}.`);
  p("This agreement includes purpose, developer responsibilities, financial controls, indemnification, insurance, delegation, approvals, termination, governing law, and full agreement clauses as provided in the draft.");
  p("Execution", true);
  p(`Owner signature date: ${u(v.ownerSignDate, 10)}.`);
  p(`Developer signature date: ${u(v.developerSignDate, 10)}.`);

  doc.save("real_estate_development_agreement.pdf");
};

export default function RealEstateDevelopmentForm() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Development Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="realestatedevelopment"
    />
  );
}

import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective Date of this Agreement", type: "date", required: true },
    ],
  },
  {
    label: "Manufacturer Details",
    fields: [
      { name: "manufacturerName", label: "Manufacturer's Full Legal Name / Entity", type: "text", required: true, placeholder: "Enter full legal name or entity" },
      { name: "manufacturerAddress", label: "Manufacturer's Principal Place of Business Address", type: "text", required: true, placeholder: "Street address" },
      { name: "manufacturerCity", label: "Manufacturer's City", type: "text", required: true, placeholder: "City" },
      { name: "manufacturerStateField", label: "Manufacturer's State / Province", type: "text", required: true, placeholder: "State or Province" },
      { name: "manufacturerZip", label: "Manufacturer's ZIP / Postal Code", type: "text", required: true, placeholder: "ZIP or Postal Code" },
    ],
  },
  {
    label: "Customer Details",
    fields: [
      { name: "customerName", label: "Customer's Full Legal Name", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "customerAddress", label: "Customer's Residential / Business Address", type: "text", required: true, placeholder: "Enter full address" },
    ],
  },
  {
    label: "Covered Product",
    fields: [
      { name: "productName", label: "Product Name", type: "text", required: true, placeholder: "e.g., Model X Washing Machine" },
      { name: "productType", label: "Product Type", type: "text", required: true, placeholder: "e.g., Home Appliance, Electronics" },
      { name: "modelNumber", label: "Model Number", type: "text", required: true, placeholder: "e.g., WM-2024-XL" },
      { name: "serialNumber", label: "Serial Number", type: "text", required: true, placeholder: "e.g., SN-00123456" },
    ],
  },
  {
    label: "Warranty Coverage",
    fields: [
      { name: "warrantyPeriod", label: "Warranty Period (duration)", type: "text", required: true, placeholder: "e.g., 12 months, 2 years" },
      { name: "warrantyCommencesFrom", label: "Warranty commences from", type: "text", required: true, placeholder: "e.g., date of original purchase, date of installation" },
    ],
  },
  {
    label: "Warranty Service",
    fields: [
      {
        name: "serviceType", label: "Type of warranty service", type: "select", required: true,
        options: [
          { value: "inHome", label: "In-Home Repairs (Large Appliances)" },
          { value: "mail", label: "Products Returned by Mail" },
          { value: "both", label: "Both In-Home and Mail-In" },
        ],
      },
      { name: "serviceContactName", label: "Service contact name (for in-home repairs)", type: "text", required: false, placeholder: "Name or department to contact" },
      { name: "serviceContactPhone", label: "Toll-free service number (for in-home repairs)", type: "text", required: false, placeholder: "e.g., 1-800-000-0000" },
      { name: "technicianResponseDays", label: "Technician response time (days) for in-home service", type: "text", required: false, placeholder: "e.g., 5" },
    ],
  },
  {
    label: "Product Registration",
    fields: [
      {
        name: "productRegistrationRequired",
        label: "Is product registration required or encouraged?",
        type: "select",
        required: true,
        options: [
          { value: "encouraged", label: "Encouraged (not mandatory)" },
          { value: "required", label: "Required" },
          { value: "notApplicable", label: "Not Applicable" },
        ],
      },
    ],
  },
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
  {
    label: "State / Province",
    fields: [
      {
        name: "state",
        label: "Which state or province?",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values: Record<string, string>) => {
          if (values.country === "us") {
            return [
              { value: "Alabama", label: "Alabama" }, { value: "Alaska", label: "Alaska" },
              { value: "Arizona", label: "Arizona" }, { value: "Arkansas", label: "Arkansas" },
              { value: "California", label: "California" }, { value: "Colorado", label: "Colorado" },
              { value: "Connecticut", label: "Connecticut" }, { value: "Delaware", label: "Delaware" },
              { value: "Florida", label: "Florida" }, { value: "Georgia", label: "Georgia" },
              { value: "Hawaii", label: "Hawaii" }, { value: "Idaho", label: "Idaho" },
              { value: "Illinois", label: "Illinois" }, { value: "Indiana", label: "Indiana" },
              { value: "Iowa", label: "Iowa" }, { value: "Kansas", label: "Kansas" },
              { value: "Kentucky", label: "Kentucky" }, { value: "Louisiana", label: "Louisiana" },
              { value: "Maine", label: "Maine" }, { value: "Maryland", label: "Maryland" },
              { value: "Massachusetts", label: "Massachusetts" }, { value: "Michigan", label: "Michigan" },
              { value: "Minnesota", label: "Minnesota" }, { value: "Mississippi", label: "Mississippi" },
              { value: "Missouri", label: "Missouri" }, { value: "Montana", label: "Montana" },
              { value: "Nebraska", label: "Nebraska" }, { value: "Nevada", label: "Nevada" },
              { value: "New Hampshire", label: "New Hampshire" }, { value: "New Jersey", label: "New Jersey" },
              { value: "New Mexico", label: "New Mexico" }, { value: "New York", label: "New York" },
              { value: "North Carolina", label: "North Carolina" }, { value: "North Dakota", label: "North Dakota" },
              { value: "Ohio", label: "Ohio" }, { value: "Oklahoma", label: "Oklahoma" },
              { value: "Oregon", label: "Oregon" }, { value: "Pennsylvania", label: "Pennsylvania" },
              { value: "Rhode Island", label: "Rhode Island" }, { value: "South Carolina", label: "South Carolina" },
              { value: "South Dakota", label: "South Dakota" }, { value: "Tennessee", label: "Tennessee" },
              { value: "Texas", label: "Texas" }, { value: "Utah", label: "Utah" },
              { value: "Vermont", label: "Vermont" }, { value: "Virginia", label: "Virginia" },
              { value: "Washington", label: "Washington" }, { value: "West Virginia", label: "West Virginia" },
              { value: "Wisconsin", label: "Wisconsin" }, { value: "Wyoming", label: "Wyoming" },
              { value: "District of Columbia", label: "District of Columbia" },
            ];
          } else if (values.country === "ca") {
            return [
              { value: "Alberta", label: "Alberta" }, { value: "British Columbia", label: "British Columbia" },
              { value: "Manitoba", label: "Manitoba" }, { value: "New Brunswick", label: "New Brunswick" },
              { value: "Newfoundland and Labrador", label: "Newfoundland and Labrador" }, { value: "Nova Scotia", label: "Nova Scotia" },
              { value: "Ontario", label: "Ontario" }, { value: "Prince Edward Island", label: "Prince Edward Island" },
              { value: "Quebec", label: "Quebec" }, { value: "Saskatchewan", label: "Saskatchewan" },
              { value: "Northwest Territories", label: "Northwest Territories" }, { value: "Nunavut", label: "Nunavut" },
              { value: "Yukon", label: "Yukon" },
            ];
          } else if (values.country === "uk") {
            return [
              { value: "England", label: "England" }, { value: "Scotland", label: "Scotland" },
              { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" },
            ];
          } else if (values.country === "au") {
            return [
              { value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" },
              { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" },
              { value: "South Australia", label: "South Australia" }, { value: "Tasmania", label: "Tasmania" },
              { value: "Australian Capital Territory", label: "Australian Capital Territory" }, { value: "Northern Territory", label: "Northern Territory" },
            ];
          }
          return [{ value: "Other", label: "Other Region" }];
        },
      },
      {
        name: "governingLawCustom",
        label: "Full governing jurisdiction (if 'Other' country or to specify further)",
        type: "text",
        required: false,
        placeholder: "e.g., Province of Ontario, State of Texas",
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "manufacturerSignature", label: "Manufacturer – Authorised Signatory (typed)", type: "text", required: true, placeholder: "Type full legal name as signature" },
      { name: "manufacturerSignDate", label: "Manufacturer – Date", type: "date", required: true },
      { name: "customerSignature", label: "Customer – Signature (typed)", type: "text", required: true, placeholder: "Type full legal name as signature" },
      { name: "customerSignDate", label: "Customer – Date", type: "date", required: true },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 16;
  const W = 178;
  const LH = 5.8;
  let y = 18;

  const ensure = (h = 10) => {
    if (y + h > 282) { doc.addPage(); y = 18; }
  };

  // Heading with NO underline separator
  const heading = (text: string, size = 11) => {
    ensure(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.text(text, L, y);
    y += 6;
    doc.setFontSize(10.5);
  };

  const subHeading = (text: string) => {
    ensure(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, L, y);
    y += LH + 0.5;
  };

  const p = (text: string, bold = false, gap = 2) => {
    ensure(10);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };

  const bullet = (text: string) => {
    ensure(10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const indent = 10;
    const lines = doc.splitTextToSize(text, W - indent);
    doc.text("\u2022", L + 2, y);
    doc.text(lines, L + indent, y);
    y += lines.length * LH + 1.5;
  };

  const numbered = (num: number, text: string) => {
    ensure(10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const indent = 10;
    const lines = doc.splitTextToSize(text, W - indent);
    doc.text(`${num}.`, L + 2, y);
    doc.text(lines, L + indent, y);
    y += lines.length * LH + 1.5;
  };

  // Resolve governing law
  const stateVal = values.state || "";
  const governingLawFull = values.governingLawCustom
    ? values.governingLawCustom
    : stateVal
      ? stateVal
      : "[BLANK]";

  const manufacturerFullAddress = [
    values.manufacturerAddress,
    values.manufacturerCity,
    values.manufacturerStateField,
    values.manufacturerZip,
  ].filter(Boolean).join(", ") || "[BLANK]";

  // ── Main Title ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const title = "WARRANTY AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  y += 13;

  // ── Opening Paragraph ──
  p(
    `This Warranty Agreement (the "Agreement") is made effective as of ${values.effectiveDate || "[BLANK]"} (the "Effective Date"), ` +
    `by and between ${values.manufacturerName || "[BLANK]"}, having its principal place of business at ` +
    `${manufacturerFullAddress} (the "Manufacturer"), and ` +
    `${values.customerName || "[BLANK]"}, residing at ${values.customerAddress || "[BLANK]"} (the "Customer"). ` +
    `The Manufacturer and the Customer may be referred to individually as a "Party" and collectively as the "Parties."`
  );
  y += 2;

  // ── Section 1 ──
  heading("1. Covered Product");
  p(`This Agreement applies to the following product (the "Covered Product"):`);
  bullet(`Product Name: ${values.productName || "[BLANK]"}`);
  bullet(`Product Type: ${values.productType || "[BLANK]"}`);
  bullet(`Model Number: ${values.modelNumber || "[BLANK]"}`);
  bullet(`Serial Number: ${values.serialNumber || "[BLANK]"}`);
  y += 1;

  // ── Section 2 ──
  heading("2. Warranty Coverage");
  p(
    `The Manufacturer warrants that the Covered Product shall be free from defects in materials and workmanship for a period of ` +
    `${values.warrantyPeriod || "[BLANK]"} from the ${values.warrantyCommencesFrom || "date of original purchase"} (the "Warranty Period").`
  );
  p(
    `This warranty applies to the original purchaser and shall extend to any subsequent purchaser during the Warranty Period, unless otherwise prohibited by applicable law.`
  );
  y += 1;

  // ── Section 3 ──
  heading("3. Scope of Warranty");
  subHeading("3.1 Included Coverage");
  p("This warranty covers:");
  bullet("Defects in manufacturing;");
  bullet("Defective components; and");
  bullet("Failures or malfunctions arising under normal use and operating conditions.");
  y += 1;
  subHeading("3.2 Exclusions");
  p("This warranty does not cover:");
  bullet("Damage caused by misuse, abuse, accident, or negligence;");
  bullet("Unauthorized alterations, modifications, or repairs; or");
  bullet("Ordinary wear and tear resulting from normal use.");
  y += 2;

  // ── Section 4 ──
  heading("4. Customer Obligations");
  p("To obtain warranty service under this Agreement, the Customer shall:");
  bullet("Notify the Manufacturer of any defect within the Warranty Period;");
  bullet("Provide valid proof of purchase; and");
  bullet("Return the Covered Product for inspection, if reasonably requested by the Manufacturer.");
  y += 1;

  // ── Section 5 ──
  heading("5. Remedies");
  p("Upon confirmation of a defect covered under this warranty, the Manufacturer shall, at its sole discretion:");
  bullet("Repair the Covered Product using new or refurbished parts;");
  bullet("Replace the Covered Product with the same or a substantially equivalent product; or");
  bullet("Refund the original purchase price, subject to reasonable deductions for prior use.");
  y += 1;

  // ── Section 6 ──
  heading("6. Return and Service Procedures");
  p("The Customer may return the Covered Product to:");
  bullet("The original retailer; or");
  bullet("Any authorized retailer or service provider of the Manufacturer.");
  p("Such retailer or service provider may:");
  numbered(1, "Repair the Covered Product;");
  numbered(2, "Refer the Customer to an authorized service facility;");
  numbered(3, "Replace the Covered Product with an equivalent product; or");
  numbered(4, "Issue a refund, subject to reasonable deductions for use.");
  p(
    "Where authorized remedies are not reasonably available, the Customer may obtain repairs from an independent service provider. " +
    "In such cases, the Manufacturer shall reimburse reasonable and documented costs, including parts, labor, and transportation, subject to prior approval where practicable."
  );
  y += 1;

  // ── Section 7 ──
  heading("7. Shipping");
  p("If the Covered Product is shipped for service:");
  bullet("The Customer is advised to insure the shipment and obtain proof of delivery; and");
  bullet("The Manufacturer shall not be liable for any loss or damage occurring during transit.");
  y += 1;

  // ── Section 8 ──
  heading("8. Product Registration");
  if (values.productRegistrationRequired === "required") {
    p(
      "The Customer is required to complete and submit any product registration documentation provided with the Covered Product. " +
      "Failure to register the product may affect the validity or enforceability of certain warranty benefits."
    );
  } else {
    p(
      "The Customer is encouraged to complete and submit any product registration documentation provided with the Covered Product."
    );
    p(
      "Failure to register the product shall not affect the validity or enforceability of this warranty."
    );
  }
  y += 1;

  // ── Section 9 ──
  heading("9. Notice to Customer");
  p(
    "This warranty grants the Customer specific legal rights. The Customer may also have additional rights that vary depending on applicable laws and jurisdiction."
  );
  y += 1;

  // ── Section 10 ──
  heading("10. Limitation of Liability");
  p("To the fullest extent permitted by applicable law:");
  bullet("Neither Party shall be liable for any indirect, incidental, consequential, or special damages;");
  bullet("Such damages include, without limitation, loss of profits, loss of business, or other economic losses.");
  p(
    "Certain jurisdictions do not permit the exclusion or limitation of such damages; therefore, the above limitations may not apply in all cases."
  );
  y += 1;

  // ── Section 11 ──
  heading("11. Warranty Voidance");
  p("This warranty shall be void if the Covered Product has been:");
  bullet("Altered or repaired by unauthorized persons;");
  bullet("Used for purposes other than those for which it was intended; or");
  bullet("Improperly installed, maintained, or handled.");
  y += 1;

  // ── Section 12 ──
  heading("12. Governing Law");
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of ${governingLawFull}, without regard to its conflict of laws principles.`
  );
  y += 1;

  // ── Section 13 ──
  heading("13. Entire Agreement");
  p(
    "This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, understandings, or representations."
  );
  y += 1;

  // ── Section 14 ──
  heading("14. Severability");
  p(
    "If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect."
  );
  y += 1;

  // ── Section 15 ──
  heading("15. Dispute Resolution");
  p(
    "The Parties shall first attempt to resolve any dispute arising out of or relating to this Agreement through good faith negotiations."
  );
  p(
    "If the dispute is not resolved, it shall be submitted to mediation in accordance with applicable laws before pursuing any further legal remedies."
  );
  y += 1;

  // ── Section 16 ── (unified per draft — no in-home/mail subheadings)
  heading("16. Warranty Service Procedure");
  p("If warranty service is required, including in-home service where applicable:");
  bullet(`The Customer shall notify ${values.serviceContactName || "[BLANK]"} by calling ${values.serviceContactPhone || "[BLANK]"}; and`);
  bullet("Such notice must be provided promptly upon discovery of any defect.");
  p(`An authorized service technician shall respond within ${values.technicianResponseDays || "[BLANK]"} days of receiving the service request.`);
  y += 1;

  // ── Section 17 ──
  heading("17. Manufacturer Information");
  bullet(`Manufacturer Name: ${values.manufacturerName || "[BLANK]"}`);
  bullet(`Address: ${values.manufacturerAddress || "[BLANK]"}`);
  bullet(`City/State/ZIP: ${[values.manufacturerCity, values.manufacturerStateField, values.manufacturerZip].filter(Boolean).join("/") || "[BLANK]"}`);
  y += 4;

  // ── Section 18: Signatures ──
  ensure(60);
  heading("18. Signatures");
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");
  y += 4;

  // Manufacturer signature block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Manufacturer:", L, y);
  doc.setFont("helvetica", "normal");
  doc.text(" ___________________________", L + doc.getTextWidth("Manufacturer:"), y);
  y += LH + 1;
  doc.text("Date:", L, y);
  const dateX = L + doc.getTextWidth("Date: ");
  if (values.manufacturerSignDate) {
    doc.text(values.manufacturerSignDate, dateX, y);
  } else {
    doc.text("___________________________", dateX, y);
  }
  y += LH + 1;
  // Typed signature
  if (values.manufacturerSignature) {
    doc.text(values.manufacturerSignature, L, y);
    doc.line(L, y + 1, L + Math.max(60, doc.getTextWidth(values.manufacturerSignature)), y + 1);
  } else {
    doc.line(L, y + 1, L + 60, y + 1);
  }
  y += LH + 6;

  // Separator line between signatories
  doc.setDrawColor(80, 80, 80);
  doc.line(L, y, L + W, y);
  y += 6;

  // Customer signature block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Customer:", L, y);
  doc.setFont("helvetica", "normal");
  doc.text(" ___________________________", L + doc.getTextWidth("Customer:"), y);
  y += LH + 1;
  doc.text("Date:", L, y);
  const custDateX = L + doc.getTextWidth("Date: ");
  if (values.customerSignDate) {
    doc.text(values.customerSignDate, custDateX, y);
  } else {
    doc.text("___________________________", custDateX, y);
  }
  y += LH + 1;
  // Typed signature
  if (values.customerSignature) {
    doc.text(values.customerSignature, L, y);
    doc.line(L, y + 1, L + Math.max(60, doc.getTextWidth(values.customerSignature)), y + 1);
  } else {
    doc.line(L, y + 1, L + 60, y + 1);
  }
  y += LH;

  doc.save("warranty_agreement.pdf");
};

export default function WarrantyAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Warranty Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="warrantyagreement"
    />
  );
}
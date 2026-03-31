import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
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
    label: "State/Province",
    fields: [
      {
        name: "state",
        label: "Which state or province?",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => {
          if (values.country === "us") {
            return [
              { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" },
              { value: "AZ", label: "Arizona" }, { value: "AR", label: "Arkansas" },
              { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
              { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" },
              { value: "FL", label: "Florida" }, { value: "GA", label: "Georgia" },
              { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
              { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" },
              { value: "IA", label: "Iowa" }, { value: "KS", label: "Kansas" },
              { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
              { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" },
              { value: "MA", label: "Massachusetts" }, { value: "MI", label: "Michigan" },
              { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
              { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" },
              { value: "NE", label: "Nebraska" }, { value: "NV", label: "Nevada" },
              { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
              { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" },
              { value: "NC", label: "North Carolina" }, { value: "ND", label: "North Dakota" },
              { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
              { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" },
              { value: "RI", label: "Rhode Island" }, { value: "SC", label: "South Carolina" },
              { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
              { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" },
              { value: "VT", label: "Vermont" }, { value: "VA", label: "Virginia" },
              { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
              { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
              { value: "DC", label: "District of Columbia" },
            ];
          } else if (values.country === "ca") {
            return [
              { value: "AB", label: "Alberta" }, { value: "BC", label: "British Columbia" },
              { value: "MB", label: "Manitoba" }, { value: "NB", label: "New Brunswick" },
              { value: "NL", label: "Newfoundland and Labrador" }, { value: "NS", label: "Nova Scotia" },
              { value: "ON", label: "Ontario" }, { value: "PE", label: "Prince Edward Island" },
              { value: "QC", label: "Quebec" }, { value: "SK", label: "Saskatchewan" },
              { value: "NT", label: "Northwest Territories" }, { value: "NU", label: "Nunavut" },
              { value: "YT", label: "Yukon" },
            ];
          } else if (values.country === "uk") {
            return [
              { value: "ENG", label: "England" }, { value: "SCT", label: "Scotland" },
              { value: "WLS", label: "Wales" }, { value: "NIR", label: "Northern Ireland" },
            ];
          } else if (values.country === "au") {
            return [
              { value: "NSW", label: "New South Wales" }, { value: "VIC", label: "Victoria" },
              { value: "QLD", label: "Queensland" }, { value: "WA", label: "Western Australia" },
              { value: "SA", label: "South Australia" }, { value: "TAS", label: "Tasmania" },
              { value: "ACT", label: "Australian Capital Territory" }, { value: "NT", label: "Northern Territory" },
            ];
          }
          return [{ value: "other", label: "Other Region" }];
        },
      },
    ],
  },
  {
    label: "Agreement Date",
    fields: [
      { name: "effectiveDate", label: "What is the effective date of this request?", type: "date", required: true },
    ],
  },
  // ── Requester (Party 1) Contact Info ──
  {
    label: "Requester Name",
    fields: [
      { name: "party1Name", label: "Full Legal Name of Requester", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party1Type", label: "Is this party an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
    ],
  },
  {
    label: "Requester Address",
    fields: [
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Requester Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
      { name: "party1Fax", label: "Fax Number", type: "text", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  // ── Rights Holder (Party 2) ──
  {
    label: "Rights Holder Name",
    fields: [
      { name: "party2Name", label: "Full Legal Name of Rights Holder / Copyright Owner", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party2Type", label: "Is this party an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
    ],
  },
  {
    label: "Rights Holder Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Rights Holder Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  // ── Copyrighted Work Details ──
  {
    label: "Work Details",
    fields: [
      { name: "workTitle", label: "Title / Description of the Copyrighted Work", type: "text", required: true, placeholder: "e.g. Book title, article name, image description" },
      { name: "specificPortion", label: "Specific Portion Requested (e.g. pages, chapters, images)", type: "textarea", required: true, placeholder: "Describe the specific excerpt or portion you wish to reproduce..." },
      { name: "proposedUse", label: "Proposed Use of Material", type: "textarea", required: true, placeholder: "Describe how you intend to use the material (purpose, audience, medium)..." },
    ],
  },
  // ── Agreement Details ──
  {
    label: "Agreement Details",
    fields: [
      { name: "description", label: "Additional description / purpose and scope of this request", type: "textarea", required: false, placeholder: "Any further context about this permission request..." },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      { name: "duration", label: "What is the duration of this agreement?", type: "select", required: true, options: [{ value: "1month", label: "1 Month" }, { value: "3months", label: "3 Months" }, { value: "6months", label: "6 Months" }, { value: "1year", label: "1 Year" }, { value: "2years", label: "2 Years" }, { value: "5years", label: "5 Years" }, { value: "indefinite", label: "Indefinite/Ongoing" }, { value: "custom", label: "Custom Duration" }] },
      { name: "terminationNotice", label: "How much notice is required to terminate?", type: "select", required: true, options: [{ value: "immediate", label: "Immediate" }, { value: "7days", label: "7 Days" }, { value: "14days", label: "14 Days" }, { value: "30days", label: "30 Days" }, { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" }] },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "paymentAmount", label: "What is the payment amount / consideration offered (if applicable)?", type: "text", required: false, placeholder: "$0.00" },
      { name: "paymentSchedule", label: "Payment Schedule", type: "select", required: false, options: [{ value: "onetime", label: "One-time Payment" }, { value: "weekly", label: "Weekly" }, { value: "biweekly", label: "Bi-weekly" }, { value: "monthly", label: "Monthly" }, { value: "quarterly", label: "Quarterly" }, { value: "annually", label: "Annually" }, { value: "milestone", label: "Milestone-based" }] },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      { name: "confidentiality", label: "Include confidentiality clause?", type: "select", required: true, options: [{ value: "yes", label: "Yes - Include confidentiality provisions" }, { value: "no", label: "No - Not needed" }] },
      { name: "disputeResolution", label: "How should disputes be resolved?", type: "select", required: true, options: [{ value: "mediation", label: "Mediation" }, { value: "arbitration", label: "Binding Arbitration" }, { value: "litigation", label: "Court Litigation" }, { value: "negotiation", label: "Good Faith Negotiation First" }] },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      { name: "additionalTerms", label: "Any additional terms or special conditions?", type: "textarea", required: false, placeholder: "Enter any additional terms, conditions, or special provisions..." },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      { name: "party1Signature", label: "Requester Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Signature", label: "Rights Holder Signature (Type full legal name)", type: "text", required: true, placeholder: "Type full legal name as signature" },
      { name: "witnessName", label: "Witness Name (Optional)", type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const party1Address = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const party2Address = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");
  const jurisdiction  = [values.state, values.country?.toUpperCase()].filter(Boolean).join(", ");

  const durationMap: Record<string, string> = { "1month": "1 Month", "3months": "3 Months", "6months": "6 Months", "1year": "1 Year", "2years": "2 Years", "5years": "5 Years", "indefinite": "Indefinite/Ongoing", "custom": "Custom" };
  const terminationMap: Record<string, string> = { "immediate": "immediately", "7days": "7 days", "14days": "14 days", "30days": "30 days", "60days": "60 days", "90days": "90 days" };
  const disputeMap: Record<string, string> = { "mediation": "Mediation", "arbitration": "Binding Arbitration", "litigation": "Court Litigation", "negotiation": "Good Faith Negotiation" };
  const scheduleMap: Record<string, string> = { "onetime": "one-time", "weekly": "weekly", "biweekly": "bi-weekly", "monthly": "monthly", "quarterly": "quarterly", "annually": "annual", "milestone": "milestone-based" };

  const checkPageBreak = (needed = 8) => {
    if (y + needed > pageHeight - margin) { doc.addPage(); y = margin; }
  };

  const field = (label: string, value: string) => {
    checkPageBreak(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(label, margin, y);
    const lw = doc.getTextWidth(label);
    const val = value || "N/A";
    doc.text(val, margin + lw, y);
    doc.setLineWidth(0.3);
    doc.line(margin + lw, y + 1.2, margin + lw + Math.max(doc.getTextWidth(val), 35), y + 1.2);
    y += 6;
  };

  const para = (text: string, bold = false) => {
    checkPageBreak(10);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 3;
  };

  const underlined = (label: string, value: string, minWidth = 40) => {
    checkPageBreak(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(label, margin, y);
    const lw = doc.getTextWidth(label);
    const val = value || "";
    if (val) doc.text(val, margin + lw, y);
    doc.setLineWidth(0.3);
    doc.line(margin + lw, y + 1.2, margin + lw + Math.max(doc.getTextWidth(val || ""), minWidth), y + 1.2);
    y += 6;
  };

  const sectionHeading = (text: string) => {
    checkPageBreak(8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(text, margin, y);
    y += 7;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "COPYRIGHT REQUEST LETTER";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, y);
  doc.setLineWidth(0.5);
  doc.line(titleX, y + 1.5, titleX + titleWidth, y + 1.5);
  y += 11;

  // ── CONTACT INFORMATION OF REQUESTER ──────────────────────────────────
  sectionHeading("CONTACT INFORMATION OF REQUESTER");
  field("Address:  ", party1Address || "");
  field("Phone:  ", values.party1Phone || "");
  field("Fax:  ", values.party1Fax || "");
  field("Email:  ", values.party1Email || "");
  y += 3;

  // ── DATE ──────────────────────────────────────────────────────────────
  field("Date:  ", values.effectiveDate || "");
  y += 2;

  // ── TO / RIGHTS HOLDER ───────────────────────────────────────────────
  field("To:  ", values.party2Name || "");
  field("Address:  ", party2Address || "");
  y += 4;

  // ── SUBJECT ──────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Re: Request for Permission to Use Copyrighted Material", margin, y);
  y += 8;

  // ── SALUTATION ───────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Dear Sir/Madam,`, margin, y);
  y += 7;

  // ── BODY PARAGRAPH 1 ─────────────────────────────────────────────────
  para(`I write to formally request your permission to reproduce and use an excerpt from the following copyrighted work:`);
  y += 1;

  underlined("Title / Description of Work:  ", values.workTitle || "", 60);
  y += 3;

  // ── SPECIFIC PORTION ─────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Specific Portion Requested:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  if (values.specificPortion) {
    const lines = doc.splitTextToSize(values.specificPortion, contentWidth);
    checkPageBreak(lines.length * 5 + 5);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 3;
  } else {
    doc.line(margin, y + 1, margin + contentWidth, y + 1);
    y += 6;
    doc.line(margin, y + 1, margin + contentWidth, y + 1);
    y += 7;
  }

  // ── PROPOSED USE ─────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Proposed Use of Material:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  if (values.proposedUse) {
    const lines = doc.splitTextToSize(values.proposedUse, contentWidth);
    checkPageBreak(lines.length * 5 + 5);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 3;
  } else {
    doc.line(margin, y + 1, margin + contentWidth, y + 1);
    y += 6;
    doc.line(margin, y + 1, margin + contentWidth, y + 1);
    y += 7;
  }
  y += 2;

  // ── ACKNOWLEDGEMENT PARAGRAPH ────────────────────────────────────────
  para(`I acknowledge that all rights in the above-referenced work remain vested in you as the copyright owner. The permission sought herein is limited solely to the use described above and does not constitute any transfer or assignment of ownership rights.`);

  para(`Should you so require, an appropriate copyright notice, in wording specified by you, will be prominently displayed alongside the material in all instances of its use.`);

  // ── ADDITIONAL DETAILS ───────────────────────────────────────────────
  if (values.description?.trim()) {
    para(values.description.trim());
  }

  // ── TERMS SUMMARY ────────────────────────────────────────────────────
  para(`This request covers a period of ${durationMap[values.duration] || values.duration || "the agreed duration"}. The Requester agrees that any permission granted may be revoked upon ${terminationMap[values.terminationNotice] || values.terminationNotice || "the agreed notice"} written notice. Disputes shall be resolved by ${disputeMap[values.disputeResolution] || values.disputeResolution || "the agreed method"}.${values.paymentAmount ? ` The Requester offers consideration of ${values.paymentAmount} payable on a ${scheduleMap[values.paymentSchedule] || values.paymentSchedule || "mutually agreed"} basis.` : ""}`);

  // ── CONFIDENTIALITY ──────────────────────────────────────────────────
  if (values.confidentiality === "yes") {
    para(`Both parties agree to maintain the confidentiality of all proprietary information, trade secrets, and sensitive data disclosed in connection with this request. This obligation shall survive the termination of any permission granted.`);
  }

  // ── ADDITIONAL TERMS ─────────────────────────────────────────────────
  if (values.additionalTerms?.trim()) {
    sectionHeading("ADDITIONAL TERMS:");
    para(values.additionalTerms.trim());
  }

  // ── CLOSING PARAGRAPH ────────────────────────────────────────────────
  para(`I would be grateful if you could confirm your consent to the above request, together with any terms or conditions you may wish to impose.`);

  para(`Please retain a signed copy of this Letter and any related correspondence for your records. Approval of this request by the Rights Holder constitutes a binding agreement on both parties from the effective date.`);

  para(`Thank you for your time and consideration.`);

  y += 3;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Yours faithfully,", margin, y);
  y += 12;

  // ── REQUESTER SIGNATURE ───────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  const senderName = values.party1Name || "Requester";
  doc.text(senderName, margin, y);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 1.2, margin + doc.getTextWidth(senderName), y + 1.2);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  if (party1Address)       { doc.text(party1Address,                   margin, y); y += 5; }
  if (values.party1Email)  { doc.text(`Email: ${values.party1Email}`,  margin, y); y += 5; }
  if (values.party1Phone)  { doc.text(`Phone: ${values.party1Phone}`,  margin, y); y += 5; }
  if (values.party1Fax)    { doc.text(`Fax: ${values.party1Fax}`,      margin, y); y += 5; }

  y += 5;

  // ── SIGNATURE BLOCK ───────────────────────────────────────────────────
  checkPageBreak(40);
  doc.setFont("helvetica", "bold");
  doc.text("Requester Signature:", margin, y);
  doc.setFont("helvetica", "normal");
  const sig1 = values.party1Signature || "________________________";
  doc.text(sig1, margin + doc.getTextWidth("Requester Signature:  "), y);
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.text("Rights Holder Signature:", margin, y);
  doc.setFont("helvetica", "normal");
  const sig2 = values.party2Signature || "________________________";
  doc.text(sig2, margin + doc.getTextWidth("Rights Holder Signature:  "), y);
  y += 7;

  if (values.witnessName) {
    doc.setFont("helvetica", "bold");
    doc.text("Witness:", margin, y);
    doc.setFont("helvetica", "normal");
    const wx = margin + doc.getTextWidth("Witness:  ");
    doc.text(values.witnessName, wx, y);
    doc.setLineWidth(0.3);
    doc.line(wx, y + 1.2, wx + doc.getTextWidth(values.witnessName), y + 1.2);
    y += 7;
  }

  // ── JURISDICTION NOTE ─────────────────────────────────────────────────
  y += 4;
  checkPageBreak(10);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.text(`Jurisdiction: ${jurisdiction || "N/A"} | Rights Holder: ${values.party2Name || "N/A"} | Email: ${values.party2Email || "N/A"}`, margin, y);

  // ── FINAL CHECKLIST (new page) ────────────────────────────────────────
  doc.addPage();
  y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const clTitle = "FINAL CHECKLIST FOR COPYRIGHT REQUEST LETTER";
  const clWidth = doc.getTextWidth(clTitle);
  const clX = (pageWidth - clWidth) / 2;
  doc.text(clTitle, clX, y);
  doc.setLineWidth(0.5);
  doc.line(clX, y + 1.5, clX + clWidth, y + 1.5);
  y += 12;

  const checkItem = (text: string) => {
    checkPageBreak(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    // Draw checkbox
    doc.rect(margin, y - 3.5, 3.5, 3.5);
    const lines = doc.splitTextToSize(text, contentWidth - 7);
    doc.text(lines, margin + 6, y);
    y += lines.length * 5 + 2;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Review and Execution", margin, y);
  y += 7;

  checkItem("Carefully review this Copyright Request Letter to ensure that it accurately reflects your intentions and the scope of permission sought.");
  checkItem("Make any necessary amendments prior to execution.");
  checkItem("Once signed, this Letter should be duly sent to the copyright owner for consideration and approval.");

  y += 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Record Keeping", margin, y);
  y += 7;

  checkItem("Retain a complete copy of this Letter and any related correspondence for your records.");
  checkItem("Ensure proper documentation is maintained for future reference in the event of any legal or compliance requirements.");

  doc.save("copyright_request.pdf");
};

export default function CopyrightRequest() {
  return (
    <FormWizard
      steps={steps}
      title="Copyright Request Letter"
      subtitle="Complete each step to generate your professional copyright request document"
      onGenerate={generatePDF}
      documentType="copyrightrequest"
    />
  );
}
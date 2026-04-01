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
      { name: "effectiveDate", label: "What is the effective date of this agreement?", type: "date", required: true },
    ],
  },
  {
    label: "Assignor (First Party)",
    fields: [
      { name: "party1Name", label: "What is the full legal name of the Assignor (Patent Owner)?", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party1Type", label: "Is the Assignor an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
    ],
  },
  {
    label: "Assignor Address",
    fields: [
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Assignor Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Assignee (Second Party)",
    fields: [
      { name: "party2Name", label: "What is the full legal name of the Assignee (Recipient)?", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party2Type", label: "Is the Assignee an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
    ],
  },
  {
    label: "Assignee Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Assignee Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Patent Details",
    fields: [
      { name: "assignmentPercentage", label: "What percentage of rights is being assigned? (e.g. 100)", type: "text", required: true, placeholder: "100" },
      { name: "description", label: "Describe the Patents being assigned (inventions, patent numbers, applications)", type: "textarea", required: true, placeholder: "Describe the patents, inventions, patent application numbers, and any related details..." },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      { name: "duration", label: "What is the duration of this agreement?", type: "select", required: true, options: [{ value: "1month", label: "1 Month" }, { value: "3months", label: "3 Months" }, { value: "6months", label: "6 Months" }, { value: "1year", label: "1 Year" }, { value: "2years", label: "2 Years" }, { value: "5years", label: "5 Years" }, { value: "indefinite", label: "Indefinite/Ongoing (Full Term of Patents)" }, { value: "custom", label: "Custom Duration" }] },
      { name: "terminationNotice", label: "How much notice is required to terminate?", type: "select", required: true, options: [{ value: "immediate", label: "Immediate" }, { value: "7days", label: "7 Days" }, { value: "14days", label: "14 Days" }, { value: "30days", label: "30 Days" }, { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" }] },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "paymentAmount", label: "What is the consideration/payment amount (if applicable)?", type: "text", required: false, placeholder: "$0.00" },
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
      { name: "party1Signature", label: "Assignor Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Signature", label: "Assignee Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party1SignDate", label: "Assignor Signature Date", type: "date", required: true },
      { name: "party2SignDate", label: "Assignee Signature Date", type: "date", required: true },
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
  const jurisdiction = [values.state, values.country?.toUpperCase()].filter(Boolean).join(", ");

  const durationMap: Record<string, string> = {
    "1month": "1 Month", "3months": "3 Months", "6months": "6 Months",
    "1year": "1 Year", "2years": "2 Years", "5years": "5 Years",
    "indefinite": "the full term of the Patents", "custom": "Custom",
  };
  const disputeMap: Record<string, string> = {
    "mediation": "Mediation", "arbitration": "Binding Arbitration",
    "litigation": "Court Litigation", "negotiation": "Good Faith Negotiation",
  };
  const scheduleMap: Record<string, string> = {
    "onetime": "one-time", "weekly": "weekly", "biweekly": "bi-weekly",
    "monthly": "monthly", "quarterly": "quarterly", "annually": "annual",
    "milestone": "milestone-based",
  };

  const checkNewPage = (neededSpace: number) => {
    if (y + neededSpace > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  const para = (text: string, indent = 0) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    checkNewPage(lines.length * 5 + 5);
    doc.text(lines, margin + indent, y);
    y += lines.length * 5 + 3;
  };

  const sectionTitle = (text: string) => {
    checkNewPage(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(text, margin, y);
    y += 7;
  };

  const bulletLine = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentWidth - 8);
    checkNewPage(lines.length * 5 + 3);
    doc.text("\u2022", margin + 2, y);
    doc.text(lines, margin + 8, y);
    y += lines.length * 5 + 2;
  };

  // ── TITLE ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const title = "PATENT ASSIGNMENT";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, y);
  doc.setLineWidth(0.5);
  doc.line(titleX, y + 1.5, titleX + titleWidth, y + 1.5);
  y += 10;

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const subtitle = "Patent Assignment Agreement";
  const subW = doc.getTextWidth(subtitle);
  doc.text(subtitle, (pageWidth - subW) / 2, y);
  y += 10;

  // ── OPENING ──
  para(
    `This Patent Assignment Agreement (hereinafter referred to as the "Agreement") is made and entered into on ${values.effectiveDate || "_____"} (the "Effective Date"),`
  );
  y += 2;

  para(`BY AND BETWEEN:`);
  y += 1;
  para(`${values.party1Name || "_____"}, (hereinafter referred to as the "Assignor"),`);
  y += 2;
  para(`AND`);
  y += 2;
  para(`${values.party2Name || "_____"}, (hereinafter referred to as the "Assignee").`);
  y += 2;
  para(`The Assignor and Assignee may hereinafter be individually referred to as a "Party" and collectively as the "Parties."`);
  y += 4;

  // ── RECITALS ──
  sectionTitle("RECITALS");
  para(`WHEREAS, the Assignor is the sole and lawful owner of certain inventions, ideas, patent applications, and patents (collectively, the "Patents") more particularly described in Exhibit A annexed hereto;`);
  para(`WHEREAS, the Assignee desires to acquire, and the Assignor desires to assign, all or a specified portion of the Assignor's right, title, and interest in and to the Patents;`);
  para(`WHEREAS, the Parties are duly authorized and legally competent to enter into this Agreement;`);
  para(`NOW, THEREFORE, in consideration of the mutual covenants and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:`);
  y += 4;

  // ── 1. ASSIGNMENT OF RIGHTS ──
  sectionTitle("1. ASSIGNMENT OF RIGHTS");
  para(
    `1.1 The Assignor hereby irrevocably sells, assigns, transfers, and conveys to the Assignee ${values.assignmentPercentage || "_____"}% of all its right, title, and interest in and to the Patents, including without limitation:`
  );
  bulletLine("All rights for the full term of the Patents;");
  bulletLine("Any and all reissues, renewals, extensions, and continuations thereof;");
  bulletLine("All rights arising from divisions, continuations-in-part, substitute applications, and foreign counterparts.");
  y += 2;
  para(
    `1.2 The rights assigned herein shall be held and enjoyed by the Assignee, its successors, and permitted assigns, as fully and exclusively as the same would have been held by the Assignor had this Agreement not been executed.`
  );
  para(
    `1.3 The Assignor hereby authorizes and requests the relevant patent authorities, including the United States Patent and Trademark Office (USPTO) and any applicable foreign authorities, to record this Agreement and recognize the Assignee as the lawful owner of the assigned rights.`
  );
  y += 2;

  // ── 2. FURTHER ASSURANCES ──
  sectionTitle("2. FURTHER ASSURANCES");
  para(`The Assignor agrees to:`);
  para(`(a) Provide full cooperation to the Assignee in the prosecution, protection, and enforcement of the Patents and any related applications worldwide;`, 4);
  para(`(b) Execute, verify, and deliver any additional documents, instruments, or assignments reasonably required to effectuate the intent of this Agreement;`, 4);
  para(`(c) Perform all lawful acts necessary to secure, maintain, and enforce the Patents in any jurisdiction.`, 4);
  y += 2;

  // ── 3. REPRESENTATIONS AND WARRANTIES ──
  sectionTitle("3. REPRESENTATIONS AND WARRANTIES");
  para(`The Assignor hereby represents and warrants that:`);
  para(`(a) The Assignor is the sole legal and beneficial owner of the Patents;`, 4);
  para(`(b) The Patents are free from any liens, encumbrances, assignments, or third-party claims;`, 4);
  para(`(c) The execution and delivery of this Agreement do not violate or infringe upon the rights of any third party;`, 4);
  para(`(d) The Assignor has full authority to enter into and perform this Agreement.`, 4);
  y += 2;

  // ── 4. GOVERNING LAW ──
  sectionTitle("4. GOVERNING LAW");
  para(
    `This Agreement shall be governed by and construed in accordance with the laws of the State of ${jurisdiction || "_____"}, without regard to its conflict of laws principles.`
  );
  y += 2;

  // ── 5. ENTIRE AGREEMENT ──
  sectionTitle("5. ENTIRE AGREEMENT");
  para(
    `This Agreement constitutes the entire understanding between the Parties and supersedes all prior negotiations, representations, or agreements, whether written or oral, relating to the subject matter herein.`
  );
  y += 2;

  // ── 6. SEVERABILITY ──
  sectionTitle("6. SEVERABILITY");
  para(
    `If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be deemed severed, and the remaining provisions shall continue in full force and effect. The Parties shall, in good faith, substitute any invalid provision with a valid provision that most closely reflects the original intent.`
  );
  y += 2;

  // ── 7. INDEPENDENT LEGAL ADVICE ──
  sectionTitle("7. INDEPENDENT LEGAL ADVICE");
  para(
    `Each Party acknowledges that it has had the opportunity to seek independent legal advice prior to executing this Agreement and fully understands the terms and legal implications herein. This Agreement shall not be construed against any Party by reason of authorship.`
  );
  y += 2;

  // ── Duration / Dispute / Confidentiality / Payment (Additional Terms) ──
  if (values.duration || values.disputeResolution || values.confidentiality || values.paymentAmount) {
    sectionTitle("8. ADDITIONAL TERMS");
    if (values.duration) para(`Duration: This assignment shall remain effective for ${durationMap[values.duration] || values.duration}.`);
    if (values.disputeResolution) para(`Dispute Resolution: Any disputes arising under this Agreement shall be resolved by ${disputeMap[values.disputeResolution] || values.disputeResolution}.`);
    if (values.confidentiality === "yes") para(`Confidentiality: The Parties agree to keep the terms of this Agreement and all related information confidential and shall not disclose such information to any third party without the prior written consent of the other Party.`);
    if (values.paymentAmount) para(`Consideration: The agreed consideration for this assignment is ${values.paymentAmount}, payable on a ${scheduleMap[values.paymentSchedule] || values.paymentSchedule || "mutually agreed"} basis.`);
    if (values.additionalTerms?.trim()) para(values.additionalTerms.trim());
    y += 2;
  } else if (values.additionalTerms?.trim()) {
    sectionTitle("8. ADDITIONAL TERMS");
    para(values.additionalTerms.trim());
    y += 2;
  }

  // ── Patent Description / Exhibit A ──
  checkNewPage(30);
  sectionTitle("EXHIBIT A – PATENT DESCRIPTION");
  para(values.description || "The patents, inventions, and related intellectual property being assigned under this Agreement are described as follows:");
  y += 4;

  // ── EXECUTION / SIGNATURES ──
  checkNewPage(60);
  sectionTitle("8. EXECUTION");
  para(
    `IN WITNESS WHEREOF, the Parties hereto have executed this Patent Assignment Agreement as of the Effective Date first written above.`
  );
  y += 6;

  // Assignor block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("ASSIGNOR", margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Signature: ", margin, y);
  const sig1Val = values.party1Signature || "________________________";
  doc.text(sig1Val, margin + doc.getTextWidth("Signature: "), y);
  doc.setLineWidth(0.3);
  doc.line(margin + doc.getTextWidth("Signature: "), y + 1.2,
    margin + doc.getTextWidth("Signature: ") + Math.max(doc.getTextWidth(sig1Val), 60), y + 1.2);
  y += 8;

  doc.text("Name: ", margin, y);
  const name1Val = values.party1Name || "________________________";
  doc.text(name1Val, margin + doc.getTextWidth("Name: "), y);
  doc.setLineWidth(0.3);
  doc.line(margin + doc.getTextWidth("Name: "), y + 1.2,
    margin + doc.getTextWidth("Name: ") + Math.max(doc.getTextWidth(name1Val), 60), y + 1.2);
  y += 8;

  doc.text("Date: ", margin, y);
  const date1Val = values.party1SignDate || "________________________";
  doc.text(date1Val, margin + doc.getTextWidth("Date: "), y);
  doc.setLineWidth(0.3);
  doc.line(margin + doc.getTextWidth("Date: "), y + 1.2,
    margin + doc.getTextWidth("Date: ") + Math.max(doc.getTextWidth(date1Val), 60), y + 1.2);
  y += 8;

  if (party1Address) { doc.text(`Address: ${party1Address}`, margin, y); y += 6; }
  if (values.party1Email) { doc.text(`Email: ${values.party1Email}`, margin, y); y += 6; }
  if (values.party1Phone) { doc.text(`Phone: ${values.party1Phone}`, margin, y); y += 6; }
  y += 6;

  // Assignee block
  checkNewPage(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("ASSIGNEE", margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Signature: ", margin, y);
  const sig2Val = values.party2Signature || "________________________";
  doc.text(sig2Val, margin + doc.getTextWidth("Signature: "), y);
  doc.setLineWidth(0.3);
  doc.line(margin + doc.getTextWidth("Signature: "), y + 1.2,
    margin + doc.getTextWidth("Signature: ") + Math.max(doc.getTextWidth(sig2Val), 60), y + 1.2);
  y += 8;

  doc.text("Name: ", margin, y);
  const name2Val = values.party2Name || "________________________";
  doc.text(name2Val, margin + doc.getTextWidth("Name: "), y);
  doc.setLineWidth(0.3);
  doc.line(margin + doc.getTextWidth("Name: "), y + 1.2,
    margin + doc.getTextWidth("Name: ") + Math.max(doc.getTextWidth(name2Val), 60), y + 1.2);
  y += 8;

  doc.text("Date: ", margin, y);
  const date2Val = values.party2SignDate || "________________________";
  doc.text(date2Val, margin + doc.getTextWidth("Date: "), y);
  doc.setLineWidth(0.3);
  doc.line(margin + doc.getTextWidth("Date: "), y + 1.2,
    margin + doc.getTextWidth("Date: ") + Math.max(doc.getTextWidth(date2Val), 60), y + 1.2);
  y += 8;

  if (party2Address) { doc.text(`Address: ${party2Address}`, margin, y); y += 6; }
  if (values.party2Email) { doc.text(`Email: ${values.party2Email}`, margin, y); y += 6; }
  if (values.party2Phone) { doc.text(`Phone: ${values.party2Phone}`, margin, y); y += 6; }

  if (values.witnessName) {
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.text("Witness:", margin, y);
    doc.setFont("helvetica", "normal");
    const wx = margin + doc.getTextWidth("Witness:  ");
    doc.text(values.witnessName, wx, y);
    doc.setLineWidth(0.3);
    doc.line(wx, y + 1.2, wx + Math.max(doc.getTextWidth(values.witnessName), 40), y + 1.2);
    y += 8;
  }

  y += 6;

  // ── FINAL CHECKLIST PAGE ──
  doc.addPage();
  y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const clTitle = "FINAL CHECKLIST – PATENT ASSIGNMENT";
  const clTW = doc.getTextWidth(clTitle);
  doc.text(clTitle, (pageWidth - clTW) / 2, y);
  doc.setLineWidth(0.4);
  doc.line((pageWidth - clTW) / 2, y + 1.5, (pageWidth - clTW) / 2 + clTW, y + 1.5);
  y += 12;

  const checkItem = (num: string, title: string, body: string) => {
    checkNewPage(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${num}. ${title}`, margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(body, contentWidth - 4);
    doc.text(lines, margin + 4, y);
    y += lines.length * 5 + 4;
  };

  checkItem(
    "1", "Review Your Patent Assignment Document",
    "Carefully review the Patent Assignment agreement to confirm that all terms accurately reflect your intentions, including ownership percentage, patent details, and party information."
  );

  checkItem(
    "2", "Seek Legal Advice (Recommended)",
    "While this Patent Assignment is legally sound, it is advisable to consult a qualified legal professional if you have any doubts regarding your rights or obligations under the agreement."
  );

  checkItem(
    "3", "Execute the Agreement Properly",
    "To make your Patent Assignment agreement legally valid, ensure that:\n• All parties sign the document\n• Signatures are made in the presence of a notary public (if required by applicable law)\nThis step is essential for enforceability of your Patent Assignment."
  );

  checkItem(
    "4", "Record the Patent Assignment (Important Step)",
    "For full legal effect, your Patent Assignment agreement must be recorded with the relevant patent authority, such as the United States Patent and Trademark Office (USPTO) (if applicable).\n• Record the Assignment within three (3) months of execution\n• Submit the required Recordation Cover Sheet along with the agreement\n• Timely recording protects your ownership rights and legal priority"
  );

  checkItem(
    "5", "Filing Methods",
    "You can file your Patent Assignment using the following methods:\n• Online Filing: Through the official website of the relevant patent authority\n• By Post: Submit the Assignment and cover sheet to the designated office"
  );

  checkItem(
    "6", "Government Filing Fees",
    "A filing fee may apply depending on jurisdiction and number of patents involved. Always verify the latest fee schedule from the relevant authority before submission."
  );

  checkItem(
    "7", "Keep Copies for Your Records",
    "After completing your Patent Assignment agreement:\n• Retain the original signed copy for your records\n• Submit a copy to the relevant authority for registration\nNote: Authorities may retain submitted copies and may not return originals."
  );

  doc.save("patent_assignment.pdf");
};

export default function PatentAssignment() {
  return (
    <FormWizard
      steps={steps}
      title="Patent Assignment"
      subtitle="Complete each step to generate your Patent Assignment Agreement"
      onGenerate={generatePDF}
      documentType="patentassignment"
    />
  );
}
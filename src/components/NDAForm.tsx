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
      {
        name: "effectiveDate",
        label: "What is the effective date of this agreement?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Disclosing Party",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the Disclosing Party?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Disclosing Party an individual or a business?",
        type: "select",
        required: true,
        options: [
          { value: "individual", label: "Individual" },
          { value: "business", label: "Business/Company" },
        ],
      },
    ],
  },
  {
    label: "Disclosing Party Address",
    fields: [
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Disclosing Party Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Recipient Party",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the Recipient?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Recipient an individual or a business?",
        type: "select",
        required: true,
        options: [
          { value: "individual", label: "Individual" },
          { value: "business", label: "Business/Company" },
        ],
      },
    ],
  },
  {
    label: "Recipient Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Recipient Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Agreement Details",
    fields: [
      {
        name: "description",
        label: "Describe the purpose and scope of this agreement",
        type: "textarea",
        required: true,
        placeholder: "Describe what confidential information will be shared and the purpose for sharing it...",
      },
    ],
  },
  {
    label: "Term & Termination",
    fields: [
      {
        name: "terminationDate",
        label: "What is the Termination Date of this Agreement?",
        type: "date",
        required: true,
      },
      {
        name: "terminationNoticeDays",
        label: "How many days' notice is required for Early Termination?",
        type: "text",
        required: true,
        placeholder: "e.g. 30",
      },
      {
        name: "nonCircumventPeriod",
        label: "Non-Circumvention Period after termination (e.g. 1 year)",
        type: "text",
        required: false,
        placeholder: "e.g. 1 year",
      },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      {
        name: "duration",
        label: "What is the duration of this agreement?",
        type: "select",
        required: true,
        options: [
          { value: "1month", label: "1 Month" },
          { value: "3months", label: "3 Months" },
          { value: "6months", label: "6 Months" },
          { value: "1year", label: "1 Year" },
          { value: "2years", label: "2 Years" },
          { value: "5years", label: "5 Years" },
          { value: "indefinite", label: "Indefinite/Ongoing" },
          { value: "custom", label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice",
        label: "How much notice is required to terminate?",
        type: "select",
        required: true,
        options: [
          { value: "immediate", label: "Immediate" },
          { value: "7days", label: "7 Days" },
          { value: "14days", label: "14 Days" },
          { value: "30days", label: "30 Days" },
          { value: "60days", label: "60 Days" },
          { value: "90days", label: "90 Days" },
        ],
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "What is the payment amount (if applicable)?",
        type: "text",
        required: false,
        placeholder: "$0.00",
      },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: false,
        options: [
          { value: "onetime", label: "One-time Payment" },
          { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" },
          { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "annually", label: "Annually" },
          { value: "milestone", label: "Milestone-based" },
        ],
      },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      {
        name: "confidentiality",
        label: "Include confidentiality clause?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes - Include confidentiality provisions" },
          { value: "no", label: "No - Not needed" },
        ],
      },
      {
        name: "disputeResolution",
        label: "How should disputes be resolved?",
        type: "select",
        required: true,
        options: [
          { value: "mediation", label: "Mediation" },
          { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation", label: "Court Litigation" },
          { value: "negotiation", label: "Good Faith Negotiation First" },
        ],
      },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      {
        name: "additionalTerms",
        label: "Any additional terms or special conditions?",
        type: "textarea",
        required: false,
        placeholder: "Enter any additional terms, conditions, or special provisions...",
      },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      {
        name: "party1Signature",
        label: "Disclosing Party Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Recipient Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "executionRepresentative1",
        label: "Executed by (on behalf of Disclosing Party)",
        type: "text",
        required: false,
        placeholder: "Name of authorized representative",
      },
      {
        name: "executionRepresentative2",
        label: "Executed by (Recipient name)",
        type: "text",
        required: false,
        placeholder: "Name of authorized representative",
      },
      {
        name: "witnessName",
        label: "Witness Name (Optional)",
        type: "text",
        required: false,
        placeholder: "Witness full legal name",
      },
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
  const title = "NON-DISCLOSURE AGREEMENT (NDA)";
  const titleW = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleW) / 2, y);
  doc.setLineWidth(0.5);
  doc.line((pageWidth - titleW) / 2, y + 1.5, (pageWidth - titleW) / 2 + titleW, y + 1.5);
  y += 12;

  // ── OPENING ──
  para(
    `This Non-Disclosure Agreement ("Agreement") is made and entered into as of ${values.effectiveDate || "__"} ("Effective Date"), by and between ${values.party1Name || "__"} ("Disclosing Party") and ${values.party2Name || "__"} ("Recipient").`
  );
  para(`WHEREAS, the Disclosing Party intends to disclose certain confidential and proprietary information to the Recipient; and`);
  para(`WHEREAS, the Recipient agrees to receive and safeguard such information under the terms set forth herein;`);
  para(`NOW, THEREFORE, in consideration of the mutual covenants and undertakings contained herein, the parties agree as follows:`);
  y += 4;

  // ── I. Confidential Information ──
  sectionTitle("I. Confidential Information");
  para(
    `"Confidential Information" means any and all non-public, proprietary, or confidential information disclosed by the Disclosing Party to the Recipient on or after the Effective Date, whether directly or indirectly, in any form, including but not limited to written, oral, electronic, visual, or observational disclosures.`
  );
  para(`Confidential Information includes, without limitation:`);
  bulletLine("Trade secrets");
  bulletLine("Financial and accounting data");
  bulletLine("Budgets, forecasts, and projections");
  bulletLine("Business plans, strategies, and operations");
  bulletLine("Product and service information");
  bulletLine("Product specifications, designs, and concepts");
  bulletLine("Research and development data");
  bulletLine("Systems, processes, techniques, and know-how");
  bulletLine("Intellectual property and proprietary rights");
  bulletLine("Software, code, and works of authorship");
  bulletLine("Marketing and distribution strategies");
  bulletLine("Pricing structures and market analyses");
  bulletLine("Employee, client, and supplier information");
  y += 2;
  para(`Confidential Information shall be deemed protected if:`);
  para(`(a) It is designated as confidential at the time of disclosure; or`, 4);
  para(`(b) It is identified as confidential at the time of disclosure if not in written form.`, 4);
  para(
    `Notwithstanding the foregoing, information shall be considered confidential if a reasonable person would understand its nature to be confidential, whether or not expressly marked.`
  );
  y += 2;

  // ── II. Term ──
  sectionTitle("II. Term");
  para(
    `This Agreement shall commence on the Effective Date and shall continue in full force and effect until ${values.terminationDate || "__"} ("Termination Date"), unless earlier terminated in accordance with this Agreement.`
  );
  para(`The Termination Date may be amended by mutual written agreement of the parties.`);
  para(`The Recipient's obligations with respect to Confidential Information shall survive the termination or expiration of this Agreement.`);
  y += 2;

  // ── III. Termination ──
  sectionTitle("III. Termination");
  para(
    `Either party may terminate this Agreement, with or without cause, by providing ${values.terminationNoticeDays || "__"} days' prior written notice to the other party ("Early Termination").`
  );
  para(`Termination shall not relieve the Recipient of its continuing obligations to protect Confidential Information.`);
  y += 2;

  // ── IV. Protection of Confidential Information ──
  sectionTitle("IV. Protection of Confidential Information");
  para(`The Recipient acknowledges that the Confidential Information:`);
  bulletLine("Has been developed through substantial effort and expense");
  bulletLine("Is valuable, proprietary, and unique");
  bulletLine("Provides the Disclosing Party with a competitive advantage");
  y += 2;
  para(`Accordingly, the Recipient agrees as follows:`);
  y += 1;
  para(`(a) Non-Disclosure`, 0);
  para(`The Recipient shall not disclose any Confidential Information to any third party without the prior written consent of the Disclosing Party.`, 4);
  y += 1;
  para(`(b) No Copying or Modification`, 0);
  para(`The Recipient shall not copy, reproduce, or modify Confidential Information without prior written authorization.`, 4);
  y += 1;
  para(`(c) Notification of Unauthorized Use`, 0);
  para(`The Recipient shall promptly notify the Disclosing Party of any unauthorized access, use, or disclosure of Confidential Information.`, 4);
  y += 1;
  para(`(d) Disclosure to Employees`, 0);
  para(`The Recipient may disclose Confidential Information only to those employees or representatives who:`, 4);
  bulletLine("Have a legitimate need to know for permitted purposes; and");
  bulletLine("Are bound by confidentiality obligations no less restrictive than those set forth herein.");
  y += 2;

  // ── V. Prohibition on Use with AI/ML ──
  sectionTitle("V. Prohibition on Use with Artificial Intelligence and Machine Learning");
  para(`The Recipient shall not, directly or indirectly:`);
  para(
    `(a) Input, upload, or disclose this Agreement or any Confidential Information to any artificial intelligence (AI), machine learning (ML), large language model (LLM), or similar system; or`,
    4
  );
  para(
    `(b) Use Confidential Information to train, develop, enhance, or validate any AI or machine learning models.`,
    4
  );
  y += 2;
  para(`Any permitted use of AI tools must strictly ensure:`);
  bulletLine("Complete data isolation");
  bulletLine("No retention or reuse of input data");
  bulletLine("No use for training purposes");
  bulletLine("Encryption and secure processing");
  bulletLine("Full compliance with applicable data protection laws");
  para(`These restrictions apply regardless of system ownership, control, or data anonymization.`);
  y += 2;

  // ── VI. Exclusions ──
  sectionTitle("VI. Exclusions from Confidential Information");
  para(`Confidential Information shall not include information that:`);
  bulletLine("Is or becomes publicly available without breach of this Agreement");
  bulletLine("Is lawfully obtained from a third party without restriction");
  bulletLine("Is independently developed without use of Confidential Information");
  bulletLine("Is required to be disclosed by law, regulation, or court order");
  bulletLine("Is expressly designated in writing as non-confidential by the Disclosing Party");
  y += 2;

  // ── VII. Injunctive Relief ──
  sectionTitle("VII. Unauthorized Disclosure – Injunctive Relief");
  para(
    `The Recipient acknowledges that any breach of this Agreement may result in irreparable harm to the Disclosing Party for which monetary damages alone may be insufficient.`
  );
  para(`Accordingly, the Disclosing Party shall be entitled to seek:`);
  bulletLine("Immediate injunctive or equitable relief (temporary or permanent); and");
  bulletLine("Any additional remedies available at law or in equity.");
  y += 2;

  // ── VIII. Remedies ──
  sectionTitle("VIII. Remedies");
  para(`The Recipient agrees that:`);
  bulletLine("Monetary damages may be inadequate to remedy a breach; and");
  bulletLine("The Disclosing Party shall have the right to pursue equitable relief in addition to any other remedies.");
  para(`The Recipient shall immediately notify the Disclosing Party upon becoming aware of any breach or threatened breach.`);
  y += 2;

  // ── IX. Alternative Dispute Resolution ──
  sectionTitle("IX. Alternative Dispute Resolution");
  para(
    `The parties agree to first attempt to resolve any dispute arising under this Agreement through good faith negotiations.`
  );
  para(`If such dispute remains unresolved, the parties shall proceed to mediation in accordance with applicable laws.`);
  y += 2;

  // ── X. Whistleblower Protection ──
  sectionTitle("X. Whistleblower Protection");
  para(
    `Nothing in this Agreement shall prohibit or restrict disclosures protected under applicable trade secret or whistleblower laws, including disclosures:`
  );
  bulletLine("To government authorities or legal counsel for reporting violations of law; or");
  bulletLine("Made in sealed court filings.");
  y += 2;

  // ── XI. Non-Circumvention ──
  sectionTitle("XI. Non-Circumvention");
  para(
    `During the term of this Agreement and for a period of ${values.nonCircumventPeriod || "__"} thereafter, the Recipient shall not, directly or indirectly:`
  );
  bulletLine("Circumvent or bypass the Disclosing Party; or");
  bulletLine(
    "Engage in business with any clients, customers, or contacts introduced by the Disclosing Party without prior written consent."
  );
  y += 2;

  // ── XII. Return or Destruction ──
  sectionTitle("XII. Return or Destruction of Confidential Information");
  para(
    `Upon termination of this Agreement or upon written request by the Disclosing Party, the Recipient shall:`
  );
  bulletLine("Promptly return or destroy all Confidential Information;");
  bulletLine("Include all documents, records, notes, data, materials, and equipment; and");
  bulletLine("Permanently delete all copies in any form.");
  y += 2;

  // ── XIII. Relationship of Parties ──
  sectionTitle("XIII. Relationship of the Parties");
  para(`Nothing in this Agreement shall be deemed to create any:`);
  bulletLine("Partnership");
  bulletLine("Joint venture");
  bulletLine("Agency or employment relationship");
  para(`between the parties.`);
  y += 2;

  // ── XIV. No Warranty ──
  sectionTitle("XIV. No Warranty");
  para(`All Confidential Information is provided on an "AS IS" basis.`);
  para(
    `The Disclosing Party makes no representations or warranties, express or implied, regarding:`
  );
  bulletLine("Accuracy");
  bulletLine("Completeness");
  bulletLine("Reliability");
  bulletLine("Fitness for a particular purpose");
  para(`The Recipient assumes all risks associated with its use.`);
  y += 2;

  // ── XV. Limited License ──
  sectionTitle("XV. Limited License");
  para(`The Recipient is granted no rights of ownership in the Confidential Information.`);
  para(`The Recipient may use such information solely for the purposes expressly permitted under this Agreement.`);
  para(`All intellectual property rights shall remain the exclusive property of the Disclosing Party.`);
  y += 2;

  // ── XVI. Indemnification ──
  sectionTitle("XVI. Indemnification");
  para(
    `The Recipient agrees to indemnify, defend, and hold harmless the Disclosing Party from and against any and all:`
  );
  bulletLine("Losses");
  bulletLine("Damages");
  bulletLine("Liabilities");
  bulletLine("Costs and expenses (including legal fees)");
  para(`arising out of or related to any breach or misuse of Confidential Information.`);
  y += 2;

  // ── XVII. Entire Agreement ──
  sectionTitle("XVII. Entire Agreement");
  para(
    `This Agreement constitutes the entire understanding between the parties and supersedes all prior or contemporaneous agreements, whether written or oral, relating to its subject matter.`
  );
  y += 2;

  // ── XVIII. Amendment ──
  sectionTitle("XVIII. Amendment");
  para(`This Agreement may be amended or modified only by a written instrument duly executed by both parties.`);
  y += 2;

  // ── XIX. Successors and Assigns ──
  sectionTitle("XIX. Successors and Assigns");
  para(
    `This Agreement shall be binding upon and inure to the benefit of the parties and their respective successors and permitted assigns.`
  );
  y += 2;

  // ── XX. Severability ──
  sectionTitle("XX. Severability");
  para(
    `If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.`
  );
  y += 2;

  // ── XXI. Waiver ──
  sectionTitle("XXI. Waiver");
  para(
    `The failure of either party to enforce any provision of this Agreement shall not constitute a waiver of future enforcement of that or any other provision.`
  );
  y += 2;

  // ── XXII. Governing Law ──
  sectionTitle("XXII. Governing Law");
  para(
    `This Agreement shall be governed by and construed in accordance with the laws of ${jurisdiction || "__"}.`
  );
  y += 2;

  // ── XXIII. Execution ──
  sectionTitle("XXIII. Execution");
  para(
    `This Agreement may be executed by ${values.executionRepresentative1 || "__"} on behalf of ${values.party1Name || "__"} and by ${values.executionRepresentative2 || values.party2Name || "__"}, in accordance with applicable law. Execution may be in counterparts and by electronic means.`
  );
  y += 2;

  // ── Additional Terms from Form ──
  if (values.description?.trim()) {
    sectionTitle("XXIV. Purpose of Disclosure");
    para(values.description.trim());
    y += 2;
  }

  if (values.paymentAmount) {
    sectionTitle("XXV. Financial Terms");
    para(`Payment: ${values.paymentAmount}`);
    if (values.paymentSchedule) para(`Payment Schedule: ${values.paymentSchedule}`);
    y += 2;
  }

  if (values.additionalTerms?.trim()) {
    sectionTitle("XXVI. Additional Terms");
    para(values.additionalTerms.trim());
    y += 2;
  }

  // ── SIGNATURES ──
  checkNewPage(70);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const sigTitle = "SIGNATURES";
  const sigTW = doc.getTextWidth(sigTitle);
  doc.text(sigTitle, (pageWidth - sigTW) / 2, y);
  doc.setLineWidth(0.4);
  doc.line((pageWidth - sigTW) / 2, y + 1.5, (pageWidth - sigTW) / 2 + sigTW, y + 1.5);
  y += 10;

  // Disclosing Party Signature
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("The Disclosing Party:", margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const dp1Sig = values.party1Signature || "________________________________________";
  doc.text(dp1Sig, margin, y);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 1.2, margin + Math.max(doc.getTextWidth(dp1Sig), 80), y + 1.2);
  y += 8;

  doc.text(`Name: ${values.party1Name || "________________________"}`, margin, y); y += 6;
  if (values.executionRepresentative1) {
    doc.text(`Executed by: ${values.executionRepresentative1}`, margin, y); y += 6;
  }
  if (party1Address) { doc.text(`Address: ${party1Address}`, margin, y); y += 6; }
  if (values.party1Email) { doc.text(`Email: ${values.party1Email}`, margin, y); y += 6; }
  if (values.party1Phone) { doc.text(`Phone: ${values.party1Phone}`, margin, y); y += 6; }
  doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, y); y += 10;

  // Recipient Signature
  checkNewPage(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("The Recipient:", margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const dp2Sig = values.party2Signature || "________________________________________";
  doc.text(dp2Sig, margin, y);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 1.2, margin + Math.max(doc.getTextWidth(dp2Sig), 80), y + 1.2);
  y += 8;

  doc.text(`Name: ${values.party2Name || "________________________"}`, margin, y); y += 6;
  if (values.executionRepresentative2) {
    doc.text(`Executed by: ${values.executionRepresentative2}`, margin, y); y += 6;
  }
  if (party2Address) { doc.text(`Address: ${party2Address}`, margin, y); y += 6; }
  if (values.party2Email) { doc.text(`Email: ${values.party2Email}`, margin, y); y += 6; }
  if (values.party2Phone) { doc.text(`Phone: ${values.party2Phone}`, margin, y); y += 6; }
  doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, y); y += 10;

  if (values.witnessName) {
    checkNewPage(20);
    doc.setFont("helvetica", "bold");
    doc.text("Witness:", margin, y);
    doc.setFont("helvetica", "normal");
    const wx = margin + doc.getTextWidth("Witness:  ");
    doc.text(values.witnessName, wx, y);
    doc.setLineWidth(0.3);
    doc.line(wx, y + 1.2, wx + Math.max(doc.getTextWidth(values.witnessName), 40), y + 1.2);
  }

  doc.save("non_disclosure_agreement.pdf");
};

export default function NDA() {
  return (
    <FormWizard
      steps={steps}
      title="Non-Disclosure Agreement (NDA)"
      subtitle="Complete each step to generate your NDA"
      onGenerate={generatePDF}
      documentType="nda"
    />
  );
}
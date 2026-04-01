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
    label: "Effective Date",
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
    label: "Recipient (First Party) Name",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the Recipient?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
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
      {
        name: "party1Street",
        label: "Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "party1City",
        label: "City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "party1Zip",
        label: "ZIP/Postal Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
    ],
  },
  {
    label: "Recipient Contact",
    fields: [
      {
        name: "party1Email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party1Phone",
        label: "Phone Number",
        type: "phone",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Contractor (Second Party) Name",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the Contractor?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Contractor an individual or a business?",
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
    label: "Contractor Address",
    fields: [
      {
        name: "party2Street",
        label: "Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "party2City",
        label: "City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "party2Zip",
        label: "ZIP/Postal Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
    ],
  },
  {
    label: "Contractor Contact",
    fields: [
      {
        name: "party2Email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party2Phone",
        label: "Phone Number",
        type: "phone",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Description of Services",
    fields: [
      {
        name: "description",
        label: "Describe the services, scope, deliverables, milestones, and timelines",
        type: "textarea",
        required: true,
        placeholder: "Provide a detailed description of services...",
      },
    ],
  },
  {
    label: "Term & Termination",
    fields: [
      {
        name: "startDate",
        label: "Agreement Start Date",
        type: "date",
        required: true,
      },
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
        label: "What is the total fee/payment amount?",
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
          { value: "onetime", label: "One-time Payment (lump sum upon completion)" },
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
          { value: "yes", label: "Yes – Include confidentiality provisions" },
          { value: "no", label: "No – Not needed" },
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
    label: "Signatures",
    fields: [
      {
        name: "party1Signature",
        label: "Recipient Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Contractor Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
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
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  const checkPage = (needed = 10) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const para = (text: string, gap = 4) => {
    checkPage(14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentWidth);
    if (y + lines.length * 5 + gap > pageHeight - margin) { doc.addPage(); y = margin; }
    doc.text(lines, margin, y);
    y += lines.length * 5 + gap;
  };

  const bulletPara = (text: string) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentWidth - 8);
    if (y + lines.length * 5 + 3 > pageHeight - margin) { doc.addPage(); y = margin; }
    doc.text("\u2022", margin + 2, y);
    doc.text(lines, margin + 7, y);
    y += lines.length * 5 + 3;
  };

  const sectionHeader = (num: string, text: string) => {
    checkPage(12);
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${num}. ${text}`, margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  };

  const subSection = (num: string, text: string) => {
    checkPage(8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(`${num} ${text}`, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 3;
    doc.setFont("helvetica", "normal");
  };

  const sigBlock = (role: string, name: string, sig: string) => {
    checkPage(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(role.toUpperCase(), margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Signature: ", margin, y);
    const sigVal = sig || "________________________";
    doc.setFont("helvetica", "italic");
    doc.text(sigVal, margin + doc.getTextWidth("Signature: "), y);
    doc.setFont("helvetica", "normal");
    doc.setLineWidth(0.3);
    const sigX = margin + doc.getTextWidth("Signature: ");
    doc.line(sigX, y + 1.5, sigX + Math.max(doc.getTextWidth(sigVal) + 5, 60), y + 1.5);
    y += 8;
    doc.text(`Name: ${name || "________________________"}`, margin, y);
    y += 7;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, y);
    y += 10;
  };

  const jurisdiction = [values.state, values.country?.toUpperCase()].filter(Boolean).join(", ");
  const party1Address = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const party2Address = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");
  const durationMap: Record<string, string> = { "1month": "1 Month", "3months": "3 Months", "6months": "6 Months", "1year": "1 Year", "2years": "2 Years", "5years": "5 Years", "indefinite": "Indefinite/Ongoing", "custom": "Custom" };
  const terminationMap: Record<string, string> = { "immediate": "immediately", "7days": "7 days", "14days": "14 days", "30days": "30 days", "60days": "60 days", "90days": "90 days" };
  const disputeMap: Record<string, string> = { "mediation": "Mediation", "arbitration": "Binding Arbitration", "litigation": "Court Litigation", "negotiation": "Good Faith Negotiation" };
  const scheduleMap: Record<string, string> = { "onetime": "lump sum upon satisfactory completion of the Services", "weekly": "weekly", "biweekly": "bi-weekly", "monthly": "monthly", "quarterly": "quarterly", "annually": "annually", "milestone": "milestone-based" };

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("INDEPENDENT CONTRACTOR AGREEMENT", pageWidth / 2, y, { align: "center" });
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `This Independent Contractor Agreement ("Agreement") is made and entered into as of ${values.effectiveDate || "________________"}, by and between:`,
    margin, y
  );
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.text(`${values.party1Name || "____________________"}, of ${party1Address || "____________________"}`, margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text('(hereinafter referred to as the "Recipient"),', margin, y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text("AND", margin, y);
  y += 6;
  doc.text(`${values.party2Name || "____________________"}, of ${party2Address || "____________________"}`, margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text('(hereinafter referred to as the "Contractor").', margin, y);
  y += 6;
  para(
    'The Recipient and the Contractor may hereinafter be referred to individually as a "Party" and collectively as the "Parties."'
  );

  // ── 1. DESCRIPTION OF SERVICES ────────────────────────────────────────────
  sectionHeader("1", "DESCRIPTION OF SERVICES");
  para(
    "The Contractor agrees to perform and deliver the following services (collectively, the \"Services\"):"
  );
  para(values.description || "[Insert detailed description of services, scope, deliverables, milestones, and timelines]");
  para(
    "The Contractor shall perform the Services in a professional, diligent, and workmanlike manner, consistent with industry standards."
  );

  // ── 2. PERFORMANCE OF SERVICES ────────────────────────────────────────────
  sectionHeader("2", "PERFORMANCE OF SERVICES");
  subSection("2.1", "The Contractor is engaged as an independent professional and shall determine, in their sole discretion, the manner, method, techniques, and means of performing the Services.");
  subSection("2.2", "The Contractor shall not be subject to training, supervision, or control by the Recipient regarding the performance of the Services, except with respect to the final results.");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("2.3 The Contractor shall:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  bulletPara("Perform the Services at such times and locations as they deem appropriate;");
  bulletPara("Supply and utilize their own tools, equipment, materials, and resources;");
  bulletPara("Exercise full control over the manner in which the Services are executed.");
  subSection("2.4", "The Services provided by the Contractor shall not be deemed integrated into the regular business operations of the Recipient.");
  subSection("2.5", "The Contractor shall comply with all applicable laws, regulations, and ordinances, and shall obtain and maintain all licenses, permits, and registrations necessary for the lawful performance of the Services.");

  // ── 3. TERM ───────────────────────────────────────────────────────────────
  sectionHeader("3", "TERM");
  const startDate = values.startDate || values.effectiveDate || "________________";
  const durationLabel = durationMap[values.duration] || values.duration || "________________";
  para(
    `This Agreement shall commence on ${startDate} and shall continue in full force and effect for ${durationLabel} (the "Termination Date"), unless earlier terminated in accordance with the provisions of this Agreement.`
  );

  // ── 4. TERMINATION ────────────────────────────────────────────────────────
  sectionHeader("4", "TERMINATION");
  subSection("4.1", `Either Party may terminate this Agreement, with or without cause, by providing ${terminationMap[values.terminationNotice] || values.terminationNotice || "______"} prior written notice to the other Party ("Early Termination").`);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("4.2 Upon termination:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  bulletPara("The Contractor shall cease all Services immediately unless otherwise directed;");
  bulletPara("The Contractor shall be entitled to receive payment on a pro-rata basis for Services properly performed up to the effective date of termination;");
  bulletPara("All outstanding obligations, including confidentiality and intellectual property provisions, shall survive termination.");

  // ── 5. COMPENSATION ───────────────────────────────────────────────────────
  sectionHeader("5", "COMPENSATION");
  subSection("5.1", `In consideration for the Services, the Recipient agrees to pay the Contractor a total fee of ${values.paymentAmount || "________________"}.`);
  subSection("5.2", `Unless otherwise agreed in writing, payment shall be made ${scheduleMap[values.paymentSchedule] || values.paymentSchedule || "as mutually agreed"}.`);
  subSection("5.3", "The Contractor shall submit invoices, if required, detailing the Services performed.");

  // ── 6. EXPENSES AND TAXES ─────────────────────────────────────────────────
  sectionHeader("6", "EXPENSES AND TAXES");
  subSection("6.1", "The Contractor shall bear all costs and expenses incurred in connection with the performance of the Services, including but not limited to business, operational, and travel expenses, unless expressly approved in writing by the Recipient.");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("6.2 The Contractor shall be solely responsible for:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  bulletPara("All taxes, duties, and statutory contributions, including income tax, social security, and any other applicable obligations;");
  bulletPara("Filing all required tax returns and reports.");
  para("The Recipient shall not withhold any taxes on behalf of the Contractor.");

  // ── 7. RELATIONSHIP OF THE PARTIES ────────────────────────────────────────
  sectionHeader("7", "RELATIONSHIP OF THE PARTIES");
  subSection("7.1", "The Contractor is an independent contractor and not an employee, partner, or agent of the Recipient.");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("7.2 Nothing in this Agreement shall be construed to create:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  bulletPara("An employer-employee relationship;");
  bulletPara("A partnership or joint venture.");
  subSection("7.3", "The Contractor shall not be entitled to any employee benefits, including but not limited to insurance, paid leave, retirement benefits, or bonuses.");
  subSection("7.4", "The Contractor shall have no authority to bind or obligate the Recipient in any manner whatsoever.");
  subSection("7.5", "The relationship between the Parties is non-exclusive, and the Contractor may provide services to other clients, provided such services do not conflict with this Agreement.");

  // ── 8. RECIPIENT'S LIMITED CONTROL ────────────────────────────────────────
  sectionHeader("8", "RECIPIENT'S LIMITED CONTROL");
  para(
    "The Recipient shall have no right to control or direct the manner or means by which the Contractor performs the Services. The Recipient's interest shall be limited solely to the results of the Services, except in exceptional circumstances requiring coordination."
  );

  // ── 9. ASSIGNMENT ─────────────────────────────────────────────────────────
  sectionHeader("9", "ASSIGNMENT");
  para(
    "The Contractor shall not assign, transfer, or delegate any rights or obligations under this Agreement without the prior written consent of the Recipient."
  );
  para("Any unauthorized assignment shall be null, void, and of no legal effect.");

  // ── 10. OWNERSHIP OF SOCIAL MEDIA AND DIGITAL ASSETS ─────────────────────
  sectionHeader("10", "OWNERSHIP OF SOCIAL MEDIA AND DIGITAL ASSETS");
  para(
    "Any social media accounts, digital platforms, contacts, followers, or online assets created, developed, or managed by the Contractor on behalf of the Recipient shall remain the sole and exclusive property of the Recipient."
  );

  // ── 11. INTELLECTUAL PROPERTY RIGHTS ─────────────────────────────────────
  sectionHeader("11", "INTELLECTUAL PROPERTY RIGHTS");
  subSection("11.1", 'All work product created, developed, or delivered by the Contractor in connection with the Services, including but not limited to:');
  bulletPara("Designs, drawings, and models");
  bulletPara("Reports, documents, and plans");
  bulletPara("Specifications and data");
  bulletPara("Inventions, discoveries, and innovations");
  bulletPara("Software, content, and other materials");
  para(
    '(collectively, the "Work Product") shall be deemed "work made for hire" and shall be the sole and exclusive property of the Recipient.'
  );
  subSection("11.2", "To the extent any Work Product does not qualify as a work made for hire, the Contractor hereby irrevocably assigns all rights, title, and interest therein to the Recipient.");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("11.3 The Contractor agrees to:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  bulletPara("Execute all documents necessary to perfect such ownership;");
  bulletPara("Provide assistance in securing patents, copyrights, or other protections.");

  // ── 12. CONFIDENTIALITY ───────────────────────────────────────────────────
  sectionHeader("12", "CONFIDENTIALITY");
  if (values.confidentiality === "yes") {
    subSection("12.1", 'The Contractor acknowledges that they may have access to confidential and proprietary information of the Recipient ("Confidential Information"), including but not limited to:');
    bulletPara("Financial, technical, and operational data");
    bulletPara("Customer and client information");
    bulletPara("Pricing structures and business strategies");
    bulletPara("Trade secrets and internal processes");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("12.2 The Contractor agrees to:", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    bulletPara("Maintain strict confidentiality of all Confidential Information;");
    bulletPara("Not disclose, use, copy, or exploit such information for any purpose other than fulfilling obligations under this Agreement;");
    bulletPara("Take all reasonable measures to safeguard such information.");
    subSection("12.3", "These obligations shall survive the termination or expiration of this Agreement.");
    subSection("12.4", "Upon termination, the Contractor shall promptly return or destroy all Confidential Information and related materials.");
  } else {
    para("No confidentiality clause is included in this Agreement.");
  }

  // ── 13. TRADE SECRETS DISCLOSURE PROTECTION ───────────────────────────────
  sectionHeader("13", "TRADE SECRETS DISCLOSURE PROTECTION");
  para(
    "Nothing in this Agreement shall restrict or prohibit the Contractor from reporting violations of law to any governmental authority or from making disclosures protected under applicable whistleblower or trade secrets laws."
  );

  // ── 14. INSURANCE ─────────────────────────────────────────────────────────
  sectionHeader("14", "INSURANCE");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  para("The Contractor shall, at their own expense:");
  bulletPara("Obtain and maintain appropriate insurance coverage;");
  bulletPara("Be solely responsible for any injuries, damages, or losses incurred during the performance of the Services;");
  bulletPara("Provide proof of insurance upon reasonable request by the Recipient.");

  // ── 15. INDEMNIFICATION ───────────────────────────────────────────────────
  sectionHeader("15", "INDEMNIFICATION");
  para(
    "The Contractor agrees to indemnify, defend, and hold harmless the Recipient, its affiliates, officers, and representatives from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to:"
  );
  bulletPara("The Contractor's acts, omissions, or negligence;");
  bulletPara("Breach of this Agreement;");
  bulletPara("Violation of applicable laws.");

  // ── 16. DISPUTE RESOLUTION ────────────────────────────────────────────────
  sectionHeader("16", "DISPUTE RESOLUTION");
  subSection("16.1", "The Parties shall first attempt to resolve any dispute arising out of or in connection with this Agreement through good faith negotiations.");
  subSection("16.2", `If the dispute cannot be resolved amicably, it shall be submitted to ${disputeMap[values.disputeResolution] || values.disputeResolution || "the agreed method"} in accordance with applicable laws.`);

  // ── 17–21. STANDARD BOILERPLATE ───────────────────────────────────────────
  sectionHeader("17", "ENTIRE AGREEMENT");
  para(
    "This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations, understandings, or agreements, whether written or oral."
  );

  sectionHeader("18", "AMENDMENTS");
  para(
    "No amendment, modification, or variation of this Agreement shall be valid unless made in writing and signed by both Parties."
  );

  sectionHeader("19", "WAIVER");
  para(
    "The failure of either Party to enforce any provision of this Agreement shall not be deemed a waiver of such provision or any future enforcement thereof."
  );

  sectionHeader("20", "SEVERABILITY");
  para(
    "If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect."
  );

  sectionHeader("21", "GOVERNING LAW");
  para(
    `This Agreement shall be governed by and construed in accordance with the laws of ${jurisdiction || "the applicable jurisdiction"}.`
  );

  // ── ADDITIONAL TERMS ──────────────────────────────────────────────────────
  if (values.additionalTerms?.trim()) {
    sectionHeader("22", "ADDITIONAL TERMS");
    para(values.additionalTerms.trim());
  }

  // ── SIGNATURES ────────────────────────────────────────────────────────────
  checkPage(60);
  y += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("22. SIGNATURES", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.",
    margin, y
  );
  y += 10;

  sigBlock("RECIPIENT", values.party1Name, values.party1Signature);
  sigBlock("CONTRACTOR", values.party2Name, values.party2Signature);

  if (values.witnessName) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("WITNESS", margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${values.witnessName}`, margin, y);
    y += 7;
    doc.text("Signature: ________________________", margin, y);
    y += 7;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, y);
  }

  doc.save("independent_contractor_agreement.pdf");
};

export default function IndependentContractorForm() {
  return (
    <FormWizard
      steps={steps}
      title="Independent Contractor Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="independentcontractor"
    />
  );
}
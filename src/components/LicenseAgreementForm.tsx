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
    label: "Licensor (First Party)",
    fields: [
      { name: "party1Name", label: "What is the full legal name of the Licensor?", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party1Type", label: "Is this party an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
    ],
  },
  {
    label: "Licensor Address",
    fields: [
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Licensor Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Licensee (Second Party)",
    fields: [
      { name: "party2Name", label: "What is the full legal name of the Licensee?", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party2Type", label: "Is this party an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
    ],
  },
  {
    label: "Licensee Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Licensee Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Authored Work",
    fields: [
      { name: "authoredWork", label: "Describe the Authored Work being licensed", type: "textarea", required: true, placeholder: "Describe the work (e.g., software, book, artwork, music, etc.)..." },
      { name: "territory", label: "What is the geographical territory of the license?", type: "text", required: true, placeholder: "e.g., United States, Worldwide, North America..." },
    ],
  },
  {
    label: "Royalty & Payment",
    fields: [
      { name: "royaltyTerms", label: "Describe the royalty calculation terms", type: "textarea", required: true, placeholder: "e.g., 10% of net sales, $500 per unit, flat fee of $5,000..." },
      { name: "paymentAmount", label: "Payment Amount (if applicable)", type: "text", required: false, placeholder: "$0.00" },
      { name: "paymentSchedule", label: "Payment Schedule", type: "select", required: false, options: [{ value: "onetime", label: "One-time Payment" }, { value: "weekly", label: "Weekly" }, { value: "biweekly", label: "Bi-weekly" }, { value: "monthly", label: "Monthly" }, { value: "quarterly", label: "Quarterly" }, { value: "annually", label: "Annually" }, { value: "milestone", label: "Milestone-based" }] },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      { name: "duration", label: "What is the duration of this agreement?", type: "select", required: true, options: [{ value: "1month", label: "1 Month" }, { value: "3months", label: "3 Months" }, { value: "6months", label: "6 Months" }, { value: "1year", label: "1 Year" }, { value: "2years", label: "2 Years" }, { value: "5years", label: "5 Years" }, { value: "indefinite", label: "Indefinite/Ongoing" }, { value: "custom", label: "Custom Duration" }] },
      { name: "terminationDate", label: "What is the termination date? (if fixed)", type: "date", required: false },
      { name: "terminationNotice", label: "How much notice is required to terminate?", type: "select", required: true, options: [{ value: "immediate", label: "Immediate" }, { value: "7days", label: "7 Days" }, { value: "14days", label: "14 Days" }, { value: "30days", label: "30 Days" }, { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" }] },
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
      { name: "party1Signature", label: "Licensor Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Signature", label: "Licensee Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
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
    "indefinite": "Indefinite/Ongoing", "custom": "Custom",
  };
  const terminationMap: Record<string, string> = {
    "immediate": "immediately", "7days": "7 days", "14days": "14 days",
    "30days": "30 days", "60days": "60 days", "90days": "90 days",
  };
  const disputeMap: Record<string, string> = {
    "mediation": "Mediation", "arbitration": "Binding Arbitration",
    "litigation": "Court Litigation", "negotiation": "Good Faith Negotiation",
  };
  const scheduleMap: Record<string, string> = {
    "onetime": "one-time", "weekly": "weekly", "biweekly": "bi-weekly",
    "monthly": "monthly", "quarterly": "quarterly", "annually": "annual", "milestone": "milestone-based",
  };

  const checkPage = (needed = 12) => {
    if (y + needed > pageHeight - margin) { doc.addPage(); y = margin; }
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

  const sectionHeader = (num: string, title: string) => {
    checkPage(14);
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${num}. ${title}`, margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  };

  const subClause = (num: string, text: string) => {
    checkPage(12);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(`${num}  ${text}`, contentWidth - 5);
    if (y + lines.length * 5 + 4 > pageHeight - margin) { doc.addPage(); y = margin; }
    doc.text(lines, margin, y);
    y += lines.length * 5 + 4;
  };

  const bulletLine = (text: string) => {
    checkPage(10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(`•  ${text}`, contentWidth - 8);
    doc.text(lines, margin + 3, y);
    y += lines.length * 5 + 3;
  };

  const fieldLine = (label: string, value: string, minW = 50) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(label, margin, y);
    const lw = doc.getTextWidth(label);
    const val = value || "";
    doc.text(val, margin + lw, y);
    doc.setLineWidth(0.3);
    doc.line(margin + lw, y + 1.2, margin + lw + Math.max(doc.getTextWidth(val) + 2, minW), y + 1.2);
    y += 7;
  };

  const sigBlock = (role: string, name: string, sig: string) => {
    checkPage(28);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(role.toUpperCase(), margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    fieldLine("Name: ", name);
    // Signature line
    doc.text("Signature: ", margin, y);
    const sw = doc.getTextWidth("Signature: ");
    if (sig) {
      doc.setFont("helvetica", "italic");
      doc.text(sig, margin + sw, y);
      doc.setLineWidth(0.3);
      doc.line(margin + sw, y + 1.2, margin + sw + Math.max(doc.getTextWidth(sig) + 2, 60), y + 1.2);
      doc.setFont("helvetica", "normal");
    } else {
      doc.line(margin + sw, y + 1.2, margin + sw + 60, y + 1.2);
    }
    y += 7;
    fieldLine("Date: ", values.effectiveDate || "");
    y += 3;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "LICENSE AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  doc.setLineWidth(0.5);
  const tw = doc.getTextWidth(title);
  doc.line((pageWidth - tw) / 2, y + 1.5, (pageWidth + tw) / 2, y + 1.5);
  y += 12;

  // ── PREAMBLE ───────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  para(
    `This License Agreement (the "Agreement") is made and entered into as of ${values.effectiveDate || "[●]"} (the "Effective Date"),`
  );
  para("BY AND BETWEEN:");
  para(
    `${values.party1Name || "[Licensor Name]"}, of ${party1Address || "[Address]"} (hereinafter referred to as the "Licensor", which expression shall, where the context so admits, include its successors and permitted assigns);`
  );
  para("AND");
  para(
    `${values.party2Name || "[Licensee Name]"}, of ${party2Address || "[Address]"} (hereinafter referred to as the "Licensee", which expression shall, where the context so admits, include its successors and permitted assigns).`
  );
  para(
    'The Licensor and the Licensee are hereinafter collectively referred to as the "Parties" and individually as a "Party."'
  );

  // ── 1. GRANT OF LICENSE ────────────────────────────────────────────────────
  sectionHeader("1", "GRANT OF LICENSE");
  subClause("1.1", `The Licensor represents and warrants that it is the lawful owner of ${values.authoredWork || "[describe the work]"} (the "Authored Work").`);
  subClause("1.2", `Subject to the terms and conditions of this Agreement, the Licensor hereby grants to the Licensee an exclusive, limited, and non-transferable license to use the Authored Work solely within the geographical territory of ${values.territory || "[●]"} (the "Territory").`);
  subClause("1.3", "Notwithstanding the foregoing, all rights, title, and interest in and to the Authored Work shall remain vested exclusively in the Licensor.");
  subClause("1.4", "Any and all modifications, enhancements, or derivative works created by or on behalf of the Licensee shall vest in and be deemed automatically assigned to the Licensor.");

  // ── 2. ROYALTY AND PAYMENT ─────────────────────────────────────────────────
  sectionHeader("2", "ROYALTY AND PAYMENT");
  subClause("2.1", `In consideration of the rights granted herein, the Licensee shall pay to the Licensor royalties calculated as follows: ${values.royaltyTerms || "[●]"}.`);
  subClause("2.2", "The Licensee shall provide, together with each royalty payment, a detailed written statement setting forth the basis of calculation of such royalty.");
  subClause("2.3", "All payments shall be made in accordance with the timelines and manner agreed between the Parties.");
  if (values.paymentAmount) {
    subClause("", `Payment Amount: ${values.paymentAmount} on a ${scheduleMap[values.paymentSchedule] || values.paymentSchedule || "mutually agreed"} basis.`);
  }

  // ── 3. RESTRICTIONS AND MODIFICATIONS ────────────────────────────────────
  sectionHeader("3", "RESTRICTIONS AND MODIFICATIONS");
  subClause("3.1", "The Licensee shall not modify, adapt, alter, translate, or create derivative works of the Authored Work without the prior written consent of the Licensor.");
  subClause("3.2", "Any permitted modifications shall remain the exclusive property of the Licensor.");

  // ── 4. TERM ────────────────────────────────────────────────────────────────
  sectionHeader("4", "TERM");
  para(
    `This Agreement shall commence on the Effective Date and shall continue in full force and effect until ${values.terminationDate || durationMap[values.duration] || "[●]"} (the "Termination Date"), unless earlier terminated in accordance with this Agreement.`
  );

  // ── 5. TERMINATION ────────────────────────────────────────────────────────
  sectionHeader("5", "TERMINATION");
  subClause("5.1", `Either Party may terminate this Agreement by providing ${terminationMap[values.terminationNotice] || "[●]"} days' prior written notice to the other Party.`);
  subClause("5.2", "The Licensor may terminate this Agreement upon written notice in the event of any material breach by the Licensee, including failure to make timely royalty payments.");
  subClause("5.3", "The Licensee may cure such breach within the notice period, failing which termination shall become effective.");

  // ── 6. DEFAULT ────────────────────────────────────────────────────────────
  sectionHeader("6", "DEFAULT");
  para("In the event of default by the Licensee, the Licensor shall have the right to terminate this Agreement upon written notice, unless such default is remedied within the prescribed cure period.");

  // ── 7. NON-EXCLUSIVE LICENSE BACK ─────────────────────────────────────────
  sectionHeader("7", "NON-EXCLUSIVE LICENSE BACK");
  para("The Licensor shall retain and hereby reserves a non-exclusive, royalty-free right to use, reproduce, and exploit the Authored Work, including the right to create derivative works, provided that such use shall not derogate from the rights granted to the Licensee under this Agreement.");

  // ── 8. ASSIGNMENT ─────────────────────────────────────────────────────────
  sectionHeader("8", "ASSIGNMENT");
  para("Neither Party shall assign, transfer, or otherwise dispose of its rights or obligations under this Agreement without the prior written consent of the other Party, which shall not be unreasonably withheld.");
  para("This Agreement shall be binding upon and inure to the benefit of the Parties and their respective successors and permitted assigns.");

  // ── 9. CONFIDENTIALITY ────────────────────────────────────────────────────
  sectionHeader("9", "CONFIDENTIALITY");
  subClause("9.1", `For the purposes of this Agreement, "Confidential Information" shall mean all proprietary, technical, financial, and business information disclosed by the Licensor to the Licensee, whether in written, oral, or electronic form.`);
  subClause("9.2", "The Licensee shall:");
  const conf92 = [
    "(a)  maintain strict confidentiality of all Confidential Information;",
    "(b)  not disclose such information to any third party without prior written consent;",
    "(c)  use such information solely for the purposes of this Agreement;",
    "(d)  restrict access to employees strictly on a need-to-know basis, subject to confidentiality obligations.",
  ];
  conf92.forEach((line) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const ls = doc.splitTextToSize(line, contentWidth - 10);
    doc.text(ls, margin + 5, y);
    y += ls.length * 5 + 3;
  });
  subClause("9.3", "Confidential Information shall not include information that:");
  bulletLine("is publicly available through no fault of the Licensee;");
  bulletLine("is lawfully obtained from a third party;");
  bulletLine("is independently developed without reference to the Confidential Information;");
  bulletLine("is disclosed pursuant to legal or regulatory requirements.");

  if (values.confidentiality === "yes") {
    para("The confidentiality obligations set forth in this Section shall survive termination or expiry of this Agreement.");
  }

  // ── 10. INDEMNIFICATION ───────────────────────────────────────────────────
  sectionHeader("10", "INDEMNIFICATION");
  para("The Licensee shall indemnify, defend, and hold harmless the Licensor from and against any and all claims, losses, damages, liabilities, and expenses arising out of or in connection with the Licensee's use of the Authored Work in breach of this Agreement.");

  // ── 11. WARRANTIES AND DISCLAIMER ────────────────────────────────────────
  sectionHeader("11", "WARRANTIES AND DISCLAIMER");
  subClause("11.1", 'The Authored Work is provided on an "as is" basis without any warranties, express or implied.');
  subClause("11.2", "The Licensor disclaims all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.");

  // ── 12. LIMITATION OF LIABILITY ──────────────────────────────────────────
  sectionHeader("12", "LIMITATION OF LIABILITY");
  para("To the fullest extent permitted by law, neither Party shall be liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, revenue, or business opportunities.");

  // ── 13. DISPUTE RESOLUTION ───────────────────────────────────────────────
  sectionHeader("13", "DISPUTE RESOLUTION");
  subClause("13.1", "The Parties shall first attempt to resolve any dispute amicably through good faith negotiations.");
  subClause("13.2", `In the event of failure to resolve the dispute, the matter shall be referred to ${disputeMap[values.disputeResolution] || "mediation"} in accordance with applicable laws.`);

  // ── 14. GOVERNING LAW ────────────────────────────────────────────────────
  sectionHeader("14", "GOVERNING LAW");
  para(`This Agreement shall be governed by and construed in accordance with the laws of ${jurisdiction || "[●]"}.`);

  // ── 15. ENTIRE AGREEMENT ─────────────────────────────────────────────────
  sectionHeader("15", "ENTIRE AGREEMENT");
  para("This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements, negotiations, and understandings, whether written or oral.");

  // ── 16. AMENDMENTS ───────────────────────────────────────────────────────
  sectionHeader("16", "AMENDMENTS");
  para("No amendment or modification of this Agreement shall be valid unless made in writing and signed by both Parties.");

  // ── 17. SEVERABILITY ─────────────────────────────────────────────────────
  sectionHeader("17", "SEVERABILITY");
  para("If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.");

  // ── 18. WAIVER ───────────────────────────────────────────────────────────
  sectionHeader("18", "WAIVER");
  para("Failure or delay by either Party in enforcing any provision shall not constitute a waiver of such provision or any other provision.");

  // ── ADDITIONAL TERMS ─────────────────────────────────────────────────────
  if (values.additionalTerms?.trim()) {
    sectionHeader("19", "ADDITIONAL TERMS");
    para(values.additionalTerms.trim());
  }

  // ── EXECUTION ────────────────────────────────────────────────────────────
  checkPage(60);
  y += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("19. EXECUTION", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  para("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");

  // Two-column signature blocks
  checkPage(50);
  y += 4;

  // Licensor block (left)
  const colLeft = margin;
  const colRight = pageWidth / 2 + 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("LICENSOR", colLeft, y);
  doc.text("LICENSEE", colRight, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Name lines
  doc.text("Name: ", colLeft, y);
  const licNameVal = values.party1Name || "";
  doc.text(licNameVal, colLeft + doc.getTextWidth("Name: "), y);
  doc.setLineWidth(0.3);
  doc.line(colLeft + doc.getTextWidth("Name: "), y + 1.2, colLeft + doc.getTextWidth("Name: ") + 55, y + 1.2);

  doc.text("Name: ", colRight, y);
  const leeNameVal = values.party2Name || "";
  doc.text(leeNameVal, colRight + doc.getTextWidth("Name: "), y);
  doc.line(colRight + doc.getTextWidth("Name: "), y + 1.2, colRight + doc.getTextWidth("Name: ") + 55, y + 1.2);
  y += 8;

  // Signature lines
  doc.text("Signature: ", colLeft, y);
  const licSig = values.party1Signature || "";
  if (licSig) {
    doc.setFont("helvetica", "italic");
    doc.text(licSig, colLeft + doc.getTextWidth("Signature: "), y);
    doc.setFont("helvetica", "normal");
  }
  doc.line(colLeft + doc.getTextWidth("Signature: "), y + 1.2, colLeft + doc.getTextWidth("Signature: ") + 55, y + 1.2);

  doc.text("Signature: ", colRight, y);
  const leeSig = values.party2Signature || "";
  if (leeSig) {
    doc.setFont("helvetica", "italic");
    doc.text(leeSig, colRight + doc.getTextWidth("Signature: "), y);
    doc.setFont("helvetica", "normal");
  }
  doc.line(colRight + doc.getTextWidth("Signature: "), y + 1.2, colRight + doc.getTextWidth("Signature: ") + 55, y + 1.2);
  y += 8;

  // Date lines
  doc.text("Date: ", colLeft, y);
  doc.text(values.effectiveDate || "", colLeft + doc.getTextWidth("Date: "), y);
  doc.line(colLeft + doc.getTextWidth("Date: "), y + 1.2, colLeft + doc.getTextWidth("Date: ") + 55, y + 1.2);

  doc.text("Date: ", colRight, y);
  doc.text(values.effectiveDate || "", colRight + doc.getTextWidth("Date: "), y);
  doc.line(colRight + doc.getTextWidth("Date: "), y + 1.2, colRight + doc.getTextWidth("Date: ") + 55, y + 1.2);
  y += 12;

  // Witness block
  if (values.witnessName) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS", colLeft, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text("Name: ", colLeft, y);
    doc.text(values.witnessName, colLeft + doc.getTextWidth("Name: "), y);
    doc.setLineWidth(0.3);
    doc.line(colLeft + doc.getTextWidth("Name: "), y + 1.2, colLeft + doc.getTextWidth("Name: ") + 55, y + 1.2);
    y += 8;
    doc.text("Signature: ", colLeft, y);
    doc.line(colLeft + doc.getTextWidth("Signature: "), y + 1.2, colLeft + doc.getTextWidth("Signature: ") + 55, y + 1.2);
    y += 8;
    doc.text("Date: ", colLeft, y);
    doc.line(colLeft + doc.getTextWidth("Date: "), y + 1.2, colLeft + doc.getTextWidth("Date: ") + 55, y + 1.2);
  }

  doc.save("license_agreement.pdf");
};

export default function LicenseAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="License Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="licenseagreement"
    />
  );
}
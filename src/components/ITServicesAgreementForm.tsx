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
    label: "Recipient (First Party)",
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
        label: "Is this party an individual or a business?",
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
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Provider (Second Party)",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the Provider?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is this party an individual or a business?",
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
    label: "Provider Address",
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
    label: "Provider Contact",
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
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Computer System & Services",
    fields: [
      {
        name: "computerSystemDesc",
        label: "Describe the Computer System (hardware, software, networks, components - Exhibit A)",
        type: "textarea",
        required: true,
        placeholder: "Describe all hardware, equipment, software, networks, and related components...",
      },
      {
        name: "servicesCommenceDate",
        label: "Date when the Provider shall commence Services",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Performance Standards",
    fields: [
      {
        name: "uptimePercent",
        label: "Minimum Uptime percentage required (%)",
        type: "text",
        required: true,
        placeholder: "e.g., 99.5",
      },
      {
        name: "operatingHoursFrom",
        label: "Operating Hours - From (e.g., 08:00 AM)",
        type: "text",
        required: true,
        placeholder: "08:00 AM",
      },
      {
        name: "operatingHoursTo",
        label: "Operating Hours - To (e.g., 06:00 PM)",
        type: "text",
        required: true,
        placeholder: "06:00 PM",
      },
    ],
  },
  {
    label: "Agreement Details",
    fields: [
      {
        name: "description",
        label: "Describe the scope of IT Services",
        type: "textarea",
        required: true,
        placeholder: "Provide a detailed description of the IT services to be provided...",
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
        name: "terminationDate",
        label: "Termination Date (if fixed)",
        type: "date",
        required: false,
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
      {
        name: "curePeriodDays",
        label: "Default cure period (days)",
        type: "text",
        required: true,
        placeholder: "e.g., 14",
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "What is the payment amount?",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "earlyPaymentDiscount",
        label: "Early payment discount (%)",
        type: "text",
        required: false,
        placeholder: "e.g., 2",
      },
      {
        name: "earlyPaymentDays",
        label: "Early payment within (days of invoice)",
        type: "text",
        required: false,
        placeholder: "e.g., 10",
      },
      {
        name: "lateInterestRate",
        label: "Late payment interest rate (% per annum)",
        type: "text",
        required: false,
        placeholder: "e.g., 18",
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
    label: "Liquidated Damages",
    fields: [
      {
        name: "liquidatedDamagesDesc",
        label: "Service credit for each percentage point below agreed Uptime",
        type: "text",
        required: false,
        placeholder: "e.g., $200 per percentage point",
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
        label: "Recipient Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Provider Signature (Type full legal name)",
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

  const party1Address = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const party2Address = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");
  const jurisdiction = [values.state, values.country?.toUpperCase()].filter(Boolean).join(", ");

  const durationMap: Record<string, string> = {
    "1month": "1 Month", "3months": "3 Months", "6months": "6 Months",
    "1year": "1 Year", "2years": "2 Years", "5years": "5 Years",
    "indefinite": "Indefinite/Ongoing", "custom": "Custom",
  };
  const terminationMap: Record<string, string> = {
    "immediate": "immediately", "7days": "7", "14days": "14",
    "30days": "30", "60days": "60", "90days": "90",
  };
  const disputeMap: Record<string, string> = {
    "mediation": "mediation", "arbitration": "binding arbitration",
    "litigation": "court litigation", "negotiation": "good faith negotiation",
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

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "IT SERVICES AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  doc.setLineWidth(0.5);
  const tw = doc.getTextWidth(title);
  doc.line((pageWidth - tw) / 2, y + 1.5, (pageWidth + tw) / 2, y + 1.5);
  y += 12;

  // ── PREAMBLE ───────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  para(`This IT Services Agreement (this "Agreement") is made and entered into as of ${values.effectiveDate || "________"} (the "Effective Date"),`);
  para("BY AND BETWEEN:");
  para(`${values.party1Name || "[Recipient Name]"}, of ${party1Address || "[Address]"} (hereinafter referred to as the "Recipient");`);
  para("AND");
  para(`${values.party2Name || "[Provider Name]"}, of ${party2Address || "[Address]"} (hereinafter referred to as the "Provider").`);
  para('The Recipient and the Provider may hereinafter be referred to individually as a "Party" and collectively as the "Parties."');
  y += 3;

  // ── RECITALS ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("RECITALS", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  para('WHEREAS, the Recipient is the owner, lessor, or lawful licensee of certain computer systems and related infrastructure (the "Computer System");');
  para("WHEREAS, the Recipient desires to engage the Provider to render certain IT-related services in connection with the Computer System;");
  para("WHEREAS, the Provider represents and warrants that it possesses the necessary expertise, experience, personnel, and resources to perform such services;");
  para("NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and for other good and valuable consideration, the sufficiency of which is hereby acknowledged, the Parties agree as follows:");

  // ── 1. DEFINITIONS ────────────────────────────────────────────────────────
  sectionHeader("1", "DEFINITIONS");
  para("For purposes of this Agreement, the following terms shall have the meanings set forth below:");
  subClause("1.1", `"Computer System" means all hardware, equipment, software, networks, and related components${values.computerSystemDesc ? ": " + values.computerSystemDesc : " identified in Exhibit A"}, including all peripherals and configurations.`);
  subClause("1.2", '"Services" means the operation, maintenance, and management of the Computer System, as further described in Section 2.');
  subClause("1.3", '"Operation" means the utilization, control, processing, and transmission of data through the Computer System.');
  subClause("1.4", '"Maintenance" includes both preventive and corrective maintenance necessary to ensure proper system functionality.');
  subClause("1.5", '"Management" means system administration activities, including scheduling usage, procurement of parts and supplies, and recommending upgrades or enhancements.');
  subClause("1.6", '"Uptime" means the percentage of time, measured on a weekly basis, during which the Computer System is fully operational and available for use during scheduled operating hours.');

  // ── 2. SCOPE AND PERFORMANCE OF SERVICES ─────────────────────────────────
  sectionHeader("2", "SCOPE AND PERFORMANCE OF SERVICES");
  subClause("2.1", `Commencement. The Provider shall commence the Services on ${values.servicesCommenceDate || "________"} and shall continue to perform the Services throughout the Term.`);
  subClause("2.2", "Standard of Performance. The Provider shall:");
  const perfItems = [
    "(a)  perform the Services in a professional, diligent, and workmanlike manner in accordance with industry best practices;",
    "(b)  assign qualified and competent personnel and, upon reasonable request by the Recipient, promptly replace any personnel deemed unsatisfactory;",
    `(c)  ensure that the Computer System maintains a minimum Uptime of ${values.uptimePercent || "___"}% during operational hours of ${values.operatingHoursFrom || "______"} to ${values.operatingHoursTo || "______"}, Monday through Friday, excluding officially recognized public holidays;`,
    "(d)  perform preventive maintenance outside normal operational hours wherever reasonably practicable;",
    "(e)  where maintenance during operational hours is unavoidable, provide appropriate backup systems or continuity measures at no additional cost to the Recipient.",
  ];
  perfItems.forEach((item) => {
    checkPage(10);
    const ls = doc.splitTextToSize(item, contentWidth - 10);
    doc.text(ls, margin + 5, y);
    y += ls.length * 5 + 3;
  });

  if (values.description) {
    checkPage(12);
    para(`Scope of Services: ${values.description}`);
  }

  // ── 3. FEES AND PAYMENT TERMS ─────────────────────────────────────────────
  sectionHeader("3", "FEES AND PAYMENT TERMS");
  subClause("3.1", `Fees. In consideration for the Services, the Recipient shall pay the Provider the sum of ${values.paymentAmount ? "$" + values.paymentAmount : "$________"}, unless otherwise agreed in writing.`);
  if (values.earlyPaymentDiscount && values.earlyPaymentDays) {
    subClause("3.2", `Early Payment Discount. A discount of ${values.earlyPaymentDiscount}% shall apply if payment is made within ${values.earlyPaymentDays} days of the invoice date.`);
  } else {
    subClause("3.2", "Early Payment Discount. A discount of ___% shall apply if payment is made within ___ days of the invoice date.");
  }
  subClause("3.3", `Late Payments. Any overdue amount shall accrue interest at the rate of ${values.lateInterestRate ? values.lateInterestRate + "%" : "___%"} per annum or the maximum rate permitted by applicable law, whichever is lower.`);
  subClause("3.4", "Collection Costs. The Recipient shall be responsible for all reasonable costs of collection, including attorneys' fees.");
  subClause("3.5", "Suspension for Non-Payment. Failure to make timely payment shall constitute a material breach, entitling the Provider to suspend Services and/or terminate this Agreement.");
  if (values.paymentSchedule) {
    para(`Payment Schedule: ${scheduleMap[values.paymentSchedule] || values.paymentSchedule}.`);
  }

  // ── 4. TERM AND TERMINATION ───────────────────────────────────────────────
  sectionHeader("4", "TERM AND TERMINATION");
  subClause("4.1", `Term. This Agreement shall commence on the Effective Date and remain in effect until ${values.terminationDate || durationMap[values.duration] || "________"} (the "Termination Date"), unless earlier terminated.`);
  subClause("4.2", `Termination for Convenience. Either Party may terminate this Agreement without cause upon ${terminationMap[values.terminationNotice] || "___"} days' prior written notice.`);
  subClause("4.3", "Effect of Termination. Upon termination:");
  const termItems = [
    "(a)  all outstanding amounts shall become immediately due and payable;",
    "(b)  the Provider may cease all Services;",
    "(c)  the Provider may recover any unpaid equipment or materials, if applicable.",
  ];
  termItems.forEach((item) => {
    checkPage(8);
    const ls = doc.splitTextToSize(item, contentWidth - 10);
    doc.text(ls, margin + 5, y);
    y += ls.length * 5 + 3;
  });

  // ── 5. WARRANTIES AND DISCLAIMERS ─────────────────────────────────────────
  sectionHeader("5", "WARRANTIES AND DISCLAIMERS");
  subClause("5.1", "Provider Warranties. The Provider warrants that:");
  const warrantItems = [
    "(a)  the Services shall be performed in a professional and workmanlike manner;",
    "(b)  the Services shall conform to generally accepted industry standards;",
    "(c)  the Computer System shall operate in accordance with agreed specifications, subject to limitations inherent in technology.",
  ];
  warrantItems.forEach((item) => {
    checkPage(8);
    const ls = doc.splitTextToSize(item, contentWidth - 10);
    doc.text(ls, margin + 5, y);
    y += ls.length * 5 + 3;
  });
  subClause("5.2", "Disclaimer. EXCEPT AS EXPRESSLY PROVIDED HEREIN, THE PROVIDER DISCLAIMS ALL OTHER WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:");
  const disclaimers = [
    "MERCHANTABILITY;",
    "FITNESS FOR A PARTICULAR PURPOSE;",
    "NON-INFRINGEMENT;",
    "ACCURACY OR COMPLETENESS OF RESULTS;",
    "UNINTERRUPTED OR ERROR-FREE OPERATION.",
  ];
  disclaimers.forEach((d) => bulletLine(d));

  // ── 6. EVENTS OF DEFAULT ──────────────────────────────────────────────────
  sectionHeader("6", "EVENTS OF DEFAULT");
  para("Each of the following shall constitute a material default:");
  const defaults = [
    "(a)  failure by either Party to make any payment when due;",
    "(b)  insolvency, bankruptcy, or liquidation of either Party;",
    "(c)  attachment, seizure, or assignment of a Party's assets;",
    "(d)  failure by the Provider to maintain adequate operational support or resources.",
  ];
  defaults.forEach((item) => {
    checkPage(8);
    const ls = doc.splitTextToSize(item, contentWidth - 10);
    doc.text(ls, margin + 5, y);
    y += ls.length * 5 + 3;
  });

  // ── 7. REMEDIES ───────────────────────────────────────────────────────────
  sectionHeader("7", "REMEDIES");
  subClause("7.1", "Termination for Default. The non-defaulting Party may terminate this Agreement upon written notice.");
  subClause("7.2", `Cure Period. The defaulting Party shall have ${values.curePeriodDays || "___"} days to cure such default, failing which termination shall take effect automatically.`);
  subClause("7.3", "Cumulative Remedies. All remedies provided herein shall be cumulative and not exclusive of any remedies available at law or in equity.");

  // ── 8. LIQUIDATED DAMAGES (UPTIME) ────────────────────────────────────────
  sectionHeader("8", "LIQUIDATED DAMAGES (UPTIME)");
  para("The Parties acknowledge that damages resulting from failure to meet Uptime requirements are difficult to quantify.");
  para(`Accordingly, for each percentage point below the agreed Uptime of ${values.uptimePercent || "___"}%, the Provider shall issue a service credit of ${values.liquidatedDamagesDesc || "an agreed amount"}.`);
  para("Such credit shall constitute the Recipient's sole and exclusive remedy for Uptime deficiencies.");

  // ── 9. INTELLECTUAL PROPERTY AND WORK PRODUCT ─────────────────────────────
  sectionHeader("9", "INTELLECTUAL PROPERTY AND WORK PRODUCT");
  para("All deliverables, work product, inventions, designs, reports, and developments created by the Provider in connection with the Services shall be the exclusive property of the Recipient.");
  para("The Provider hereby assigns, and agrees to assign, all rights, title, and interest therein to the Recipient and shall execute all documents necessary to effectuate such ownership.");

  // ── 10. CONFIDENTIALITY ───────────────────────────────────────────────────
  sectionHeader("10", "CONFIDENTIALITY");
  para("The Provider shall:");
  const confItems = [
    "(a)  maintain strict confidentiality of all proprietary and confidential information;",
    "(b)  not disclose or use such information except as required for performance of the Services;",
    "(c)  ensure compliance by its employees, agents, and subcontractors.",
  ];
  confItems.forEach((item) => {
    checkPage(8);
    const ls = doc.splitTextToSize(item, contentWidth - 10);
    doc.text(ls, margin + 5, y);
    y += ls.length * 5 + 3;
  });
  para("These obligations shall survive termination of this Agreement. Upon termination, all confidential materials shall be returned or destroyed, as directed by the Recipient.");

  // ── 11. INDEMNIFICATION ───────────────────────────────────────────────────
  sectionHeader("11", "INDEMNIFICATION");
  para("The Provider shall indemnify, defend, and hold harmless the Recipient from and against any and all claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to:");
  const indemnItems = [
    "(a)  the Provider's negligence, misconduct, or omission;",
    "(b)  any breach of this Agreement.",
  ];
  indemnItems.forEach((item) => {
    checkPage(8);
    const ls = doc.splitTextToSize(item, contentWidth - 10);
    doc.text(ls, margin + 5, y);
    y += ls.length * 5 + 3;
  });

  // ── 12. DISPUTE RESOLUTION ────────────────────────────────────────────────
  sectionHeader("12", "DISPUTE RESOLUTION");
  para("The Parties shall first attempt to resolve any dispute through good faith negotiations.");
  para(`If unresolved, the dispute shall be submitted to ${disputeMap[values.disputeResolution] || "mediation"}, and thereafter resolved in accordance with applicable laws governing dispute resolution.`);

  // ── 13. RELATIONSHIP OF THE PARTIES ──────────────────────────────────────
  sectionHeader("13", "RELATIONSHIP OF THE PARTIES");
  para("The Provider is an independent contractor.");
  para("Nothing in this Agreement shall be deemed to create any partnership, joint venture, agency, or employment relationship between the Parties.");

  // ── 14. ASSIGNMENT ────────────────────────────────────────────────────────
  sectionHeader("14", "ASSIGNMENT");
  para("Neither Party may assign or transfer this Agreement without the prior written consent of the other Party, which shall not be unreasonably withheld or delayed.");

  // ── 15. ATTORNEYS' FEES ───────────────────────────────────────────────────
  sectionHeader("15", "ATTORNEYS' FEES");
  para("In any legal proceeding arising out of this Agreement, the prevailing Party shall be entitled to recover its reasonable attorneys' fees and costs.");

  // ── 16. ENTIRE AGREEMENT ─────────────────────────────────────────────────
  sectionHeader("16", "ENTIRE AGREEMENT");
  para("This Agreement constitutes the entire agreement between the Parties and supersedes all prior or contemporaneous agreements, negotiations, or understandings.");

  // ── 17. SEVERABILITY ─────────────────────────────────────────────────────
  sectionHeader("17", "SEVERABILITY");
  para("If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.");

  // ── 18. AMENDMENTS ───────────────────────────────────────────────────────
  sectionHeader("18", "AMENDMENTS");
  para("This Agreement may be amended only by a written instrument duly executed by both Parties.");

  // ── 19. GOVERNING LAW ────────────────────────────────────────────────────
  sectionHeader("19", "GOVERNING LAW");
  para(`This Agreement shall be governed by and construed in accordance with the laws of ${jurisdiction || "________"}.`);

  // ── 20. NOTICES ──────────────────────────────────────────────────────────
  sectionHeader("20", "NOTICES");
  para("All notices under this Agreement shall be in writing and shall be deemed duly given when delivered personally or sent by registered or certified mail to the addresses set forth above.");

  // ── 21. WAIVER ───────────────────────────────────────────────────────────
  sectionHeader("21", "WAIVER");
  para("Failure by either Party to enforce any provision shall not constitute a waiver of such provision or any future enforcement thereof.");

  // ── ADDITIONAL TERMS ─────────────────────────────────────────────────────
  if (values.additionalTerms?.trim()) {
    sectionHeader("22", "ADDITIONAL TERMS");
    para(values.additionalTerms.trim());
  }

  // ── EXECUTION / SIGNATURES ───────────────────────────────────────────────
  checkPage(60);
  y += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", margin, y);
  y += 10;

  // Two-column signature layout
  const colLeft = margin;
  const colRight = pageWidth / 2 + 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("THE RECIPIENT", colLeft, y);
  doc.text("THE PROVIDER", colRight, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Name row
  doc.text("Name: ", colLeft, y);
  const recNameVal = values.party1Name || "";
  doc.text(recNameVal, colLeft + doc.getTextWidth("Name: "), y);
  doc.setLineWidth(0.3);
  doc.line(colLeft + doc.getTextWidth("Name: "), y + 1.2, colLeft + doc.getTextWidth("Name: ") + 55, y + 1.2);

  doc.text("Name: ", colRight, y);
  const provNameVal = values.party2Name || "";
  doc.text(provNameVal, colRight + doc.getTextWidth("Name: "), y);
  doc.line(colRight + doc.getTextWidth("Name: "), y + 1.2, colRight + doc.getTextWidth("Name: ") + 55, y + 1.2);
  y += 8;

  // Signature row
  doc.text("Signature: ", colLeft, y);
  const recSigX = colLeft + doc.getTextWidth("Signature: ");
  const recSig = values.party1Signature || "";
  if (recSig) {
    doc.setFont("helvetica", "italic");
    doc.text(recSig, recSigX, y);
    doc.setFont("helvetica", "normal");
  }
  doc.setLineWidth(0.3);
  doc.line(recSigX, y + 1.2, recSigX + Math.max(doc.getTextWidth(recSig) + 2, 55), y + 1.2);

  doc.text("Signature: ", colRight, y);
  const provSigX = colRight + doc.getTextWidth("Signature: ");
  const provSig = values.party2Signature || "";
  if (provSig) {
    doc.setFont("helvetica", "italic");
    doc.text(provSig, provSigX, y);
    doc.setFont("helvetica", "normal");
  }
  doc.line(provSigX, y + 1.2, provSigX + Math.max(doc.getTextWidth(provSig) + 2, 55), y + 1.2);
  y += 8;

  // Date row
  doc.text("Date: ", colLeft, y);
  const dateVal = values.effectiveDate || new Date().toLocaleDateString();
  doc.text(dateVal, colLeft + doc.getTextWidth("Date: "), y);
  doc.line(colLeft + doc.getTextWidth("Date: "), y + 1.2, colLeft + doc.getTextWidth("Date: ") + 55, y + 1.2);

  doc.text("Date: ", colRight, y);
  doc.text(dateVal, colRight + doc.getTextWidth("Date: "), y);
  doc.line(colRight + doc.getTextWidth("Date: "), y + 1.2, colRight + doc.getTextWidth("Date: ") + 55, y + 1.2);
  y += 12;

  // Separator line
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Witness block
  if (values.witnessName) {
    checkPage(24);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("WITNESS", margin, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text("Name: ", margin, y);
    const wNameX = margin + doc.getTextWidth("Name: ");
    doc.text(values.witnessName, wNameX, y);
    doc.setLineWidth(0.3);
    doc.line(wNameX, y + 1.2, wNameX + Math.max(doc.getTextWidth(values.witnessName) + 2, 55), y + 1.2);
    y += 8;
    doc.text("Signature: ", margin, y);
    const wSigX = margin + doc.getTextWidth("Signature: ");
    doc.line(wSigX, y + 1.2, wSigX + 55, y + 1.2);
    y += 8;
    doc.text("Date: ", margin, y);
    const wDateX = margin + doc.getTextWidth("Date: ");
    doc.line(wDateX, y + 1.2, wDateX + 55, y + 1.2);
  }

  doc.save("it_services_agreement.pdf");
};

export default function ITServicesAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="IT Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="itservicesagreement"
    />
  );
}
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
    label: "Business Identity",
    fields: [
      { name: "entityType", label: "Entity type (e.g. LLC, Corporation, Partnership)", type: "text", required: true, placeholder: "e.g. Limited Liability Company" },
      { name: "businessCity", label: "Business City", type: "text", required: true, placeholder: "City" },
      { name: "legalStructure", label: "Legal structure", type: "text", required: true, placeholder: "e.g. LLC, S-Corp" },
      { name: "jurisdiction", label: "Jurisdiction (governing laws)", type: "text", required: true, placeholder: "e.g. State of Delaware" },
    ],
  },
  {
    label: "Management",
    fields: [
      { name: "leaderName", label: "Name of business leader / founder", type: "text", required: true, placeholder: "Full legal name" },
      { name: "leaderTitle", label: "Designation / Title", type: "text", required: true, placeholder: "e.g. Chief Executive Officer" },
      { name: "industryName", label: "Industry name", type: "text", required: true, placeholder: "e.g. Technology, Healthcare" },
    ],
  },
  {
    label: "Product / Service",
    fields: [
      { name: "productName", label: "Product or service name/type", type: "text", required: true, placeholder: "e.g. SaaS platform, consulting service" },
      { name: "productDescription", label: "Product / service description", type: "textarea", required: true, placeholder: "Describe the innovative product or service..." },
      { name: "productSpec1", label: "Product Specification 1", type: "text", required: true, placeholder: "Specification 1" },
      { name: "productSpec2", label: "Product Specification 2", type: "text", required: false, placeholder: "Specification 2" },
      { name: "productSpec3", label: "Product Specification 3", type: "text", required: false, placeholder: "Specification 3" },
    ],
  },
  {
    label: "Funding Request",
    fields: [
      { name: "fundingAmount", label: "Funding amount requested ($)", type: "text", required: true, placeholder: "e.g. 500,000" },
      { name: "fundingType", label: "Funding type", type: "select", required: true, options: [{ value: "loan", label: "Loan" }, { value: "equity", label: "Equity Investment" }, { value: "grant", label: "Grant" }, { value: "other", label: "Other" }] },
      { name: "fundingTerm", label: "Funding term / duration", type: "text", required: true, placeholder: "e.g. 3 years" },
      { name: "fundingPurpose1", label: "Funding purpose 1", type: "text", required: true, placeholder: "e.g. Product development" },
      { name: "fundingPurpose2", label: "Funding purpose 2", type: "text", required: false, placeholder: "e.g. Marketing and promotion" },
      { name: "fundingPurpose3", label: "Funding purpose 3", type: "text", required: false, placeholder: "e.g. Operational expenses" },
    ],
  },
  {
    label: "Sales & Marketing Strategy",
    fields: [
      { name: "salesTactic1", label: "Sales promotion tactic 1", type: "text", required: true, placeholder: "e.g. Referral program" },
      { name: "salesTactic2", label: "Sales promotion tactic 2", type: "text", required: false, placeholder: "e.g. Discount campaigns" },
      { name: "salesTactic3", label: "Sales promotion tactic 3", type: "text", required: false, placeholder: "e.g. Trade show participation" },
    ],
  },
  {
    label: "Financial Plan",
    fields: [
      { name: "monthlyOpEx", label: "Estimated monthly operating expenses ($)", type: "text", required: true, placeholder: "e.g. 25,000" },
      { name: "firstYearRevenue", label: "Projected first-year revenue ($)", type: "text", required: true, placeholder: "e.g. 300,000" },
      { name: "grossProfit", label: "Expected gross profit ($)", type: "text", required: true, placeholder: "e.g. 120,000" },
      { name: "breakEvenPeriod", label: "Break-even period (after product launch)", type: "text", required: true, placeholder: "e.g. 18 months" },
      { name: "roiPercentage", label: "Minimum estimated ROI (%)", type: "text", required: true, placeholder: "e.g. 25" },
    ],
  },
  {
    label: "Funding Allocation",
    fields: [
      { name: "marketingAllocation", label: "Marketing allocation ($)", type: "text", required: true, placeholder: "e.g. 100,000" },
      { name: "staffingAllocation", label: "Staffing allocation ($)", type: "text", required: true, placeholder: "e.g. 150,000" },
      { name: "otherAllocationLabel", label: "Other allocation purpose", type: "text", required: false, placeholder: "e.g. Equipment" },
      { name: "otherAllocationAmount", label: "Other allocation amount ($)", type: "text", required: false, placeholder: "e.g. 50,000" },
    ],
  },
  {
    label: "Target Markets",
    fields: [
      { name: "targetMarket1", label: "Target market segment 1", type: "text", required: true, placeholder: "e.g. Small businesses" },
      { name: "targetMarket2", label: "Target market segment 2", type: "text", required: false, placeholder: "e.g. Enterprise clients" },
      { name: "targetMarket3", label: "Target market segment 3", type: "text", required: false, placeholder: "e.g. Government agencies" },
      { name: "potentialCustomers", label: "Number of potential customers in market area", type: "text", required: true, placeholder: "e.g. 10,000" },
      { name: "marketSpendingCapacity", label: "Anticipated spending capacity ($)", type: "text", required: true, placeholder: "e.g. 5,000,000" },
    ],
  },
  {
    label: "Industry Overview",
    fields: [
      { name: "usIndustryRevenue", label: "US industry annual revenue ($)", type: "text", required: true, placeholder: "e.g. 50,000,000,000" },
      { name: "regionalRevenue", label: "Regional market revenue ($)", type: "text", required: true, placeholder: "e.g. 2,000,000,000" },
    ],
  },
  {
    label: "First Party",
    fields: [
      { name: "party1Name", label: "Full legal name of first party", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party1Type", label: "Individual or business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Second Party",
    fields: [
      { name: "party2Name", label: "Full legal name of second party", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party2Type", label: "Individual or business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      { name: "duration", label: "Duration of this agreement?", type: "select", required: true, options: [{ value: "1month", label: "1 Month" }, { value: "3months", label: "3 Months" }, { value: "6months", label: "6 Months" }, { value: "1year", label: "1 Year" }, { value: "2years", label: "2 Years" }, { value: "5years", label: "5 Years" }, { value: "indefinite", label: "Indefinite/Ongoing" }, { value: "custom", label: "Custom Duration" }] },
      { name: "terminationNotice", label: "Notice required to terminate?", type: "select", required: true, options: [{ value: "immediate", label: "Immediate" }, { value: "7days", label: "7 Days" }, { value: "14days", label: "14 Days" }, { value: "30days", label: "30 Days" }, { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" }] },
      { name: "confidentiality", label: "Include confidentiality clause?", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
      { name: "disputeResolution", label: "Dispute resolution method?", type: "select", required: true, options: [{ value: "mediation", label: "Mediation" }, { value: "arbitration", label: "Binding Arbitration" }, { value: "litigation", label: "Court Litigation" }, { value: "negotiation", label: "Good Faith Negotiation First" }] },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "paymentAmount", label: "Payment amount (if applicable)", type: "text", required: false, placeholder: "$0.00" },
      { name: "paymentSchedule", label: "Payment Schedule", type: "select", required: false, options: [{ value: "onetime", label: "One-time Payment" }, { value: "weekly", label: "Weekly" }, { value: "biweekly", label: "Bi-weekly" }, { value: "monthly", label: "Monthly" }, { value: "quarterly", label: "Quarterly" }, { value: "annually", label: "Annually" }, { value: "milestone", label: "Milestone-based" }] },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      { name: "additionalTerms", label: "Any additional terms or special conditions?", type: "textarea", required: false, placeholder: "Enter any additional terms..." },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      { name: "party1Signature", label: "First Party Signature (type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Signature", label: "Second Party Signature (type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "witnessName", label: "Witness Name (Optional)", type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  const lineH = 5.2;
  const pageLimit = pageHeight - 18;
  let y = 20;

  const u = (val?: string, fallback = "N/A") => (val && val.trim() ? val.trim() : fallback);

  const checkY = (needed: number) => {
    if (y + needed > pageLimit) { doc.addPage(); y = 20; }
  };

  const para = (text: string, indent = 0) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 3;
  };

  const heading = (text: string) => {
    checkY(lineH + 8);
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, contentWidth);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10);
  };

  const subHeading = (text: string) => {
    checkY(lineH + 4);
    y += 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(text, margin, y);
    y += lineH + 2;
  };

  const bullet = (text: string, indent = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    checkY(lines.length * lineH + 2);
    doc.text("\u2022", margin + 1.5, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 2;
  };

  const field = (label: string, value: string) => {
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

  const party1Address = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const party2Address = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");
  const jurisdiction  = [values.state, values.country?.toUpperCase()].filter(Boolean).join(", ");
  const durationMap: Record<string, string> = { "1month": "1 Month", "3months": "3 Months", "6months": "6 Months", "1year": "1 Year", "2years": "2 Years", "5years": "5 Years", "indefinite": "Indefinite/Ongoing", "custom": "Custom" };
  const terminationMap: Record<string, string> = { "immediate": "immediately", "7days": "7 days", "14days": "14 days", "30days": "30 days", "60days": "60 days", "90days": "90 days" };
  const disputeMap: Record<string, string> = { "mediation": "Mediation", "arbitration": "Binding Arbitration", "litigation": "Court Litigation", "negotiation": "Good Faith Negotiation" };

  // ── TITLE ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "BUSINESS PLAN";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, y);
  doc.setLineWidth(0.5);
  doc.line(titleX, y + 1.5, titleX + titleWidth, y + 1.5);
  y += 12;

  // Header fields
  field("Date:  ", u(values.effectiveDate));
  field("Prepared by:  ", u(values.party1Name));
  field("Submitted to:  ", u(values.party2Name));
  field("Address:  ", party2Address || "N/A");
  field("Jurisdiction:  ", jurisdiction || "N/A");
  y += 3;

  // ── EXECUTIVE SUMMARY ──
  heading("EXECUTIVE SUMMARY");
  para(`The Business (the "Business") is proposed to be established as a ${u(values.entityType, "[entity type]")}, located at ${u(values.businessCity, "[City]")}, ${jurisdiction || "[State, Country]"}, and is strategically positioned for accelerated growth within the ${u(values.industryName, "[industry name]")} industry. The Business intends to capitalize on a defined market opportunity by introducing an innovative ${u(values.productDescription, "[product/service description]")}, which demonstrates strong potential to capture substantial market share and achieve industry leadership.`);
  para("The Business is seeking funding to support product development, market entry, and operational expansion, enabling it to leverage this time-sensitive opportunity effectively.");

  // ── BUSINESS DESCRIPTION ──
  heading("BUSINESS DESCRIPTION");
  para(`The Business shall be organized as a ${u(values.legalStructure, "[legal structure]")}, duly formed and authorized under the laws of ${u(values.jurisdiction, "[jurisdiction]")}. The management and strategic direction of the Business will be led by ${u(values.leaderName, "[name]")}, who shall serve as ${u(values.leaderTitle, "[designation/title]")}, bringing relevant expertise and leadership necessary for successful execution of the Business objectives.`);

  // ── NEW PRODUCT ──
  heading("NEW PRODUCT");
  para(`The Business has developed a ${u(values.productName, "[product name/type]")}, designed to meet specific market demands and address existing gaps within the ${u(values.industryName, "[industry]")} industry.`);
  subHeading("Product Specifications:");
  if (values.productSpec1) bullet(values.productSpec1);
  if (values.productSpec2) bullet(values.productSpec2);
  if (values.productSpec3) bullet(values.productSpec3);
  y += 1;
  para("The Business is uniquely positioned to introduce this product during a critical window of opportunity, enabling rapid adoption and the acquisition of a meaningful share of the target market.");

  // ── FUNDING REQUEST ──
  heading("FUNDING REQUEST");
  para(`The Business seeks funding in the amount of $${u(values.fundingAmount, "[amount]")}, structured as a ${u(values.fundingType, "[loan/equity investment]")} for a term of ${u(values.fundingTerm, "[duration]")}.`);
  subHeading("The requested funds shall be allocated as follows:");
  if (values.fundingPurpose1) bullet(values.fundingPurpose1);
  if (values.fundingPurpose2) bullet(values.fundingPurpose2);
  if (values.fundingPurpose3) bullet(values.fundingPurpose3);

  // ── SERVICES ──
  heading("SERVICES");
  para("The Business is committed to delivering exceptional and personalized services, which will serve as a cornerstone in establishing and maintaining a strong brand presence within the market.");
  subHeading("Customer satisfaction will be prioritized through:");
  bullet("Prompt and effective resolution of customer concerns");
  bullet("A customer-centric approach to service delivery");
  bullet("Continuous improvement based on customer feedback");
  para("This approach is intended to foster long-term customer relationships and enhance customer retention.");

  // ── STRATEGY AND IMPLEMENTATION SUMMARY ──
  heading("STRATEGY AND IMPLEMENTATION SUMMARY");
  para("The Business will implement a structured strategy to drive growth and market penetration.");
  subHeading("Sales Promotion Tactics:");
  if (values.salesTactic1) bullet(values.salesTactic1);
  if (values.salesTactic2) bullet(values.salesTactic2);
  if (values.salesTactic3) bullet(values.salesTactic3);
  subHeading("Marketing Campaigns:");
  bullet("Digital marketing initiatives, including social media and search engine optimization");
  bullet("Strategic partnerships and collaborations");
  bullet("Promotional events and targeted advertising campaigns");

  // ── FINANCIAL PLAN ──
  heading("FINANCIAL PLAN");
  para("The financial projections outlined in this Business Plan reflect the anticipated start-up and operational costs associated with establishing and scaling the Business.");
  subHeading("Key financial highlights include:");
  bullet(`Estimated monthly operating expenses: $${u(values.monthlyOpEx, "[amount]")}`);
  bullet(`Projected first-year revenue: $${u(values.firstYearRevenue, "[amount]")}`);
  bullet(`Expected gross profit: $${u(values.grossProfit, "[amount]")}`);
  para("Additional costs include maintenance, production, and administrative expenses necessary for sustainable operations.");

  // ── SEASONAL FACTORS ──
  heading("SEASONAL FACTORS");
  para("The Business is expected to experience minimal seasonal fluctuations. Demand for its products/services spans multiple industries and customer segments, thereby reducing dependency on seasonal trends. Any variations are anticipated to align with general market slowdowns rather than industry-specific cycles.");

  // ── POSITION IN THE INDUSTRY ──
  heading("POSITION IN THE INDUSTRY");
  para(`The Business aims to establish a competitive position within the ${u(values.industryName, "[industry name]")} industry by leveraging innovation, superior service delivery, and targeted marketing strategies. It seeks to differentiate itself through quality, efficiency, and customer-focused solutions.`);

  // ── LEGAL ISSUES ──
  heading("LEGAL ISSUES");
  para("The promoters of the Business have ensured compliance with all applicable legal and regulatory requirements. All necessary patents, trademarks, and intellectual property rights related to the Business's products and processes have been duly secured in accordance with governing laws.");

  // ── MARKETING SUMMARY ──
  heading("MARKETING SUMMARY");
  subHeading("Target Markets");
  para("The Business will primarily focus on the following target markets:");
  if (values.targetMarket1) bullet(values.targetMarket1);
  if (values.targetMarket2) bullet(values.targetMarket2);
  if (values.targetMarket3) bullet(values.targetMarket3);
  para(`It is estimated that approximately ${u(values.potentialCustomers, "[number]")} potential customers exist within the defined market area, with an anticipated spending capacity of $${u(values.marketSpendingCapacity, "[amount]")}.`);

  subHeading("Market Focus Areas");
  para("To maximize profitability, the Business will concentrate on:");
  bullet("High-demand customer segments");
  bullet("Niche market opportunities");
  bullet("Underserved geographic or demographic areas");

  // ── COMPETITION ──
  heading("COMPETITION");
  para("Customer purchasing decisions within this industry are primarily influenced by factors such as:");
  bullet("Pricing");
  bullet("Product quality");
  bullet("Brand reputation");
  bullet("Customer service");
  para("The Business intends to achieve a competitive advantage by excelling in these areas while addressing gaps identified in competitor offerings.");

  // ── FUNDING ALLOCATION ──
  heading("FUNDING ALLOCATION");
  para("The requested funding will be distributed as follows:");
  bullet(`$${u(values.marketingAllocation, "[amount]")} for Marketing — Allocated toward advertising, branding, and promotional activities.`);
  bullet(`$${u(values.staffingAllocation, "[amount]")} for Staffing — Designated for recruitment, training, and employee compensation.`);
  if (values.otherAllocationLabel && values.otherAllocationAmount) {
    bullet(`$${values.otherAllocationAmount} for ${values.otherAllocationLabel} — To support additional operational or strategic requirements.`);
  }

  // ── FINANCIAL OUTLOOK ──
  heading("FINANCIAL OUTLOOK");
  para(`The Business is seeking long-term debt or investment financing. Financial projections indicate that the Business is expected to reach its break-even point within ${u(values.breakEvenPeriod, "[time period]")} following product launch.`);
  para(`Conservative forecasts estimate a minimum return on investment (ROI) of ${u(values.roiPercentage, "[percentage]")}% by the end of the financing term.`);

  // ── BUSINESS SUMMARY ──
  heading("BUSINESS SUMMARY");
  para(`The Business is a start-up venture focused on providing ${u(values.productName, "[products/services]")} to its clients, with an emphasis on quality, innovation, and customer satisfaction.`);

  // ── INDUSTRY OVERVIEW ──
  heading("INDUSTRY OVERVIEW");
  para(`The ${u(values.industryName, "[industry name]")} industry in the United States currently generates approximately $${u(values.usIndustryRevenue, "[amount]")} in annual revenue. The regional market in which the Business will operate is estimated to generate $${u(values.regionalRevenue, "[amount]")}, indicating significant growth potential and favorable market conditions.`);

  // ── AGREEMENT TERMS ──
  heading("AGREEMENT TERMS");
  para(`This Business Plan Agreement is entered into as of ${u(values.effectiveDate)}, between ${u(values.party1Name, "the First Party")} (${values.party1Type === "business" ? "a business entity" : "an individual"}) and ${u(values.party2Name, "the Second Party")} (${values.party2Type === "business" ? "a business entity" : "an individual"}), governed by the laws of ${jurisdiction || "the applicable jurisdiction"}, effective immediately.`);
  para(`This agreement shall remain in effect for ${durationMap[values.duration] || values.duration || "the agreed duration"} and may be terminated upon ${terminationMap[values.terminationNotice] || values.terminationNotice || "the agreed notice"} written notice to the other party. Disputes shall be resolved by ${disputeMap[values.disputeResolution] || values.disputeResolution || "the agreed method"}.${values.confidentiality === "yes" ? " A confidentiality clause is included and binding on both parties." : ""}${values.paymentAmount ? ` The agreed financial commitment is $${values.paymentAmount} on a ${values.paymentSchedule || "mutually agreed"} basis.` : ""}`);

  if (values.additionalTerms?.trim()) {
    subHeading("Additional Terms:");
    para(values.additionalTerms.trim());
  }

  para("Both parties are bound by the terms stated herein from the effective date. Please retain a signed copy of this agreement for your records.");

  // ── SIGNATURES ──
  heading("IN WITNESS WHEREOF");
  para("The parties have executed this Business Plan as of the date first written above.");
  y += 3;

  // First party block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  checkY(40);
  doc.text("FIRST PARTY:", margin, y);
  y += lineH + 1;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const p1sig = u(values.party1Signature, "");
  doc.text("Signature: ", margin, y);
  const p1lw = doc.getTextWidth("Signature: ");
  if (p1sig) doc.text(p1sig, margin + p1lw, y);
  doc.line(margin + p1lw, y + 1.2, margin + p1lw + 70, y + 1.2);
  y += lineH + 1;
  doc.text(`Name: ${u(values.party1Name)}`, margin, y); y += lineH;
  if (party1Address) { doc.text(`Address: ${party1Address}`, margin, y); y += lineH; }
  if (values.party1Email) { doc.text(`Email: ${values.party1Email}`, margin, y); y += lineH; }
  if (values.party1Phone) { doc.text(`Phone: ${values.party1Phone}`, margin, y); y += lineH; }
  doc.text(`Date: ${u(values.effectiveDate)}`, margin, y); y += lineH + 6;

  // Second party block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  checkY(40);
  doc.text("SECOND PARTY:", margin, y);
  y += lineH + 1;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const p2sig = u(values.party2Signature, "");
  doc.text("Signature: ", margin, y);
  const p2lw = doc.getTextWidth("Signature: ");
  if (p2sig) doc.text(p2sig, margin + p2lw, y);
  doc.line(margin + p2lw, y + 1.2, margin + p2lw + 70, y + 1.2);
  y += lineH + 1;
  doc.text(`Name: ${u(values.party2Name)}`, margin, y); y += lineH;
  if (party2Address) { doc.text(`Address: ${party2Address}`, margin, y); y += lineH; }
  if (values.party2Email) { doc.text(`Email: ${values.party2Email}`, margin, y); y += lineH; }
  if (values.party2Phone) { doc.text(`Phone: ${values.party2Phone}`, margin, y); y += lineH; }
  doc.text(`Date: ${u(values.effectiveDate)}`, margin, y); y += lineH + 6;

  // Witness
  if (values.witnessName) {
    checkY(20);
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS:", margin, y);
    y += lineH + 1;
    doc.setFont("helvetica", "normal");
    doc.text("Signature: ", margin, y);
    const wlw = doc.getTextWidth("Signature: ");
    doc.line(margin + wlw, y + 1.2, margin + wlw + 70, y + 1.2);
    y += lineH + 1;
    doc.text(`Name: ${values.witnessName}`, margin, y); y += lineH;
    doc.setLineWidth(0.3);
    doc.line(margin, y + 1.2, margin + doc.getTextWidth(values.witnessName) + 10, y + 1.2);
  }

  doc.save("business_plan.pdf");
};

export default function BusinessPlan() {
  return (
    <FormWizard
      steps={steps}
      title="Business Plan"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="businessplan"
    />
  );
}
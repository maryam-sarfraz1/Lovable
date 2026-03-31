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
    label: "Company Details",
    fields: [
      { name: "companyName", label: "Full legal name of the Company", type: "text", required: true, placeholder: "e.g. Acme Corp LLC" },
    ],
  },
  {
    label: "First Party (Owner 1)",
    fields: [
      { name: "party1Name", label: "Full legal name of Owner 1", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party1Type", label: "Individual or business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
      { name: "party1CNIC", label: "CNIC / ID Number", type: "text", required: false, placeholder: "ID or CNIC number" },
    ],
  },
  {
    label: "Owner 1 Address",
    fields: [
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Second Party (Owner 2)",
    fields: [
      { name: "party2Name", label: "Full legal name of Owner 2", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party2Type", label: "Individual or business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
      { name: "party2CNIC", label: "CNIC / ID Number", type: "text", required: false, placeholder: "ID or CNIC number" },
    ],
  },
  {
    label: "Owner 2 Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Agreement Details",
    fields: [
      { name: "description", label: "Describe the purpose and scope of this agreement", type: "textarea", required: true, placeholder: "Provide a detailed description of the agreement terms..." },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      { name: "duration", label: "Duration of this agreement?", type: "select", required: true, options: [{ value: "1month", label: "1 Month" }, { value: "3months", label: "3 Months" }, { value: "6months", label: "6 Months" }, { value: "1year", label: "1 Year" }, { value: "2years", label: "2 Years" }, { value: "5years", label: "5 Years" }, { value: "indefinite", label: "Indefinite/Ongoing" }, { value: "custom", label: "Custom Duration" }] },
      { name: "terminationNotice", label: "Notice required to terminate?", type: "select", required: true, options: [{ value: "immediate", label: "Immediate" }, { value: "7days", label: "7 Days" }, { value: "14days", label: "14 Days" }, { value: "30days", label: "30 Days" }, { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" }] },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "paymentAmount", label: "Payment / purchase price amount (if applicable)", type: "text", required: false, placeholder: "$0.00" },
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
    label: "Witnesses",
    fields: [
      { name: "witness1Name", label: "Witness 1 Full Name", type: "text", required: false, placeholder: "Witness 1 full legal name" },
      { name: "witness1CNIC", label: "Witness 1 CNIC / ID No.", type: "text", required: false, placeholder: "CNIC or ID number" },
      { name: "witness1Address", label: "Witness 1 Address", type: "text", required: false, placeholder: "Witness 1 address" },
      { name: "witness2Name", label: "Witness 2 Full Name", type: "text", required: false, placeholder: "Witness 2 full legal name" },
      { name: "witness2CNIC", label: "Witness 2 CNIC / ID No.", type: "text", required: false, placeholder: "CNIC or ID number" },
      { name: "witness2Address", label: "Witness 2 Address", type: "text", required: false, placeholder: "Witness 2 address" },
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
      { name: "companyRepName", label: "Company Representative Name", type: "text", required: true, placeholder: "Authorized representative full name" },
      { name: "companyRepTitle", label: "Company Representative Designation", type: "text", required: true, placeholder: "e.g. Director, CEO" },
      { name: "party1Signature", label: "Owner 1 Signature (type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Signature", label: "Owner 2 Signature (type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
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
    y += lineH + 1;
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

  const clause = (letter: string, text: string, indent = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lbl = `(${letter}) `;
    const lblW = doc.getTextWidth(lbl);
    const lines = doc.splitTextToSize(text, contentWidth - indent - lblW);
    checkY(lines.length * lineH + 2);
    doc.text(lbl, margin + indent, y);
    doc.text(lines, margin + indent + lblW, y);
    y += lines.length * lineH + 2;
  };

  const sigLine = (label: string, value: string) => {
    checkY(lineH + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const lbl = `${label}: `;
    doc.text(lbl, margin, y);
    const lblW = doc.getTextWidth(lbl);
    doc.setFont("helvetica", "normal");
    const val = value.trim();
    if (val) { doc.text(val, margin + lblW, y); }
    doc.setLineWidth(0.3);
    doc.line(margin + lblW, y + 1.2, margin + lblW + Math.max(70, doc.getTextWidth(val) + 4), y + 1.2);
    y += lineH + 2;
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
  const title = "BUY-SELL AGREEMENT";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, y);
  doc.setLineWidth(0.5);
  doc.line(titleX, y + 1.5, titleX + titleWidth, y + 1.5);
  y += 12;

  // Preamble
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  para(`This Buy-Sell Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate)}, by and among ${u(values.companyName, "[Company Name]")}, a company duly incorporated under the applicable laws (the "Company"), and each of the individuals listed below (each, an "Owner" and collectively, the "Owners").`);

  // Header fields
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const hfield = (label: string, value: string) => {
    doc.text(label, margin, y);
    const lw = doc.getTextWidth(label);
    const val = value || "N/A";
    doc.text(val, margin + lw, y);
    doc.setLineWidth(0.3);
    doc.line(margin + lw, y + 1.2, margin + lw + Math.max(doc.getTextWidth(val), 35), y + 1.2);
    y += 6;
  };
  hfield("Date:  ", u(values.effectiveDate));
  hfield("Company:  ", u(values.companyName));
  hfield("State/Province:  ", jurisdiction || "N/A");
  y += 3;

  // ── RECITALS ──
  heading("RECITALS");
  para(`WHEREAS, the Owners collectively own all of the issued and outstanding ownership interests of the Company (the "Units");`);
  para(`WHEREAS, the Owners desire to establish terms and conditions governing the ownership, transfer, and disposition of such Units in order to promote stability in ownership, ensure continuity of the business, and protect their respective interests and those of the Company;`);
  para(`NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:`);

  if (values.description?.trim()) {
    para(values.description.trim());
  }

  // ── 1. TRANSFER RESTRICTIONS ──
  heading("1. TRANSFER RESTRICTIONS");
  subHeading("1.1 General Prohibition on Transfer");
  para(`Except as expressly permitted under this Agreement, no Owner shall, directly or indirectly, voluntarily or involuntarily, sell, assign, transfer, convey, pledge, hypothecate, encumber, or otherwise dispose of any Units, whether presently owned or hereafter acquired, nor permit the same to occur by operation of law or otherwise, without first complying strictly with the provisions of this Agreement and obtaining the prior written consent of the Company and all other Owners.`);
  para(`Any attempted or purported Transfer in violation of this Agreement shall be null, void, and of no legal force or effect ab initio, and the Company shall not record or recognize such Transfer in its books, nor shall any rights be conferred upon the purported transferee.`);

  subHeading('1.2 Definition of "Transfer"');
  para(`For purposes of this Agreement, the term "Transfer" shall be interpreted broadly and shall include any act, transaction, or event, whether direct or indirect, voluntary, involuntary, or by operation of law, pursuant to which any right, title, or interest in or to any Units is conveyed, assigned, encumbered, or otherwise disposed of, including, without limitation:`);
  bullet("Any sale, assignment, conveyance, or exchange for consideration;");
  bullet("Any transfer to another Owner or to a third party;");
  bullet("Any gift, donation, bequest, devise, or inheritance;");
  bullet("Any pledge, mortgage, lien, charge, security interest, or other encumbrance;");
  bullet("Any transfer arising pursuant to court order, judgment, decree, or administrative action;");
  bullet("Any disposition occurring during the Owner's lifetime or upon death;");
  bullet("Any transfer resulting from merger, reorganization, or restructuring affecting the Owner.");

  subHeading("1.3 Permitted Transfers (Estate Planning Exception)");
  para(`Notwithstanding the foregoing, an Owner may Transfer Units to a revocable or irrevocable self-settled trust established solely for bona fide estate planning purposes, provided that:`);
  clause("a", "the Owner remains the primary beneficiary or retains control of such trust;");
  clause("b", "such Transfer does not circumvent or frustrate the intent and purpose of this Agreement; and");
  clause("c", "the trustee and beneficiaries expressly agree in writing to be bound by the terms and conditions of this Agreement.");

  // ── 2. VOLUNTARY TRANSFERS DURING LIFETIME ──
  heading("2. VOLUNTARY TRANSFERS DURING LIFETIME");
  subHeading("2.1 Notice of Proposed Transfer");
  para(`In the event that an Owner (the "Selling Owner") desires to Transfer any Units to a third party, such Owner shall first deliver a written notice (the "Transfer Notice") to the Company and all other Owners. The Transfer Notice shall include, in reasonable detail:`);
  bullet("The identity and background of the proposed transferee;");
  bullet("The number and class of Units proposed to be transferred;");
  bullet("The proposed purchase price and method of payment; and");
  bullet("All other material terms and conditions of the proposed transaction.");
  para(`Such Transfer Notice shall constitute an irrevocable offer by the Selling Owner to sell the specified Units (the "Offered Units") to the other Owners in accordance with this Agreement.`);

  subHeading("2.2 Right of First Refusal");
  para(`Upon receipt of the Transfer Notice, each non-selling Owner shall have a period of thirty (30) days to elect, by written notice, to purchase all (but not less than all) of the Offered Units. The Offered Units shall be allocated among the electing Owners in proportion to their respective ownership interests, unless otherwise mutually agreed in writing.`);
  para("The purchase price payable by the electing Owners shall be the lesser of:");
  clause("a", "the price and terms offered by the proposed third-party transferee; or");
  clause("b", "the price determined in accordance with the valuation provisions of this Agreement.");
  para("Failure by any Owner to respond within the specified period shall constitute a waiver of such Owner's right of first refusal.");

  subHeading("2.3 Transfer to Third Parties");
  para("If the non-selling Owners do not exercise their rights within the prescribed period:");
  clause("a", "the Selling Owner may proceed to Transfer the Offered Units to the identified third party, subject to the approval of Owners holding a majority of the outstanding Units;");
  clause("b", "such Transfer shall be effected strictly on terms no more favorable to the transferee than those set forth in the Transfer Notice; and");
  clause("c", "the proposed transferee shall, as a condition precedent to such Transfer, execute a written joinder agreement agreeing to be bound by all provisions of this Agreement.");
  para("If the Transfer is not consummated within sixty (60) days following the expiration of the option period, the Selling Owner shall be required to reinitiate the process under this Section.");

  // ── 3. INVOLUNTARY TRANSFERS ──
  heading("3. INVOLUNTARY TRANSFERS");
  subHeading("3.1 Definition of Involuntary Disposition");
  para(`An "Involuntary Disposition" shall include any actual, attempted, or threatened Transfer of Units arising without the voluntary consent of the Owner, including, without limitation:`);
  bullet("Foreclosure or enforcement of any security interest;");
  bullet("Bankruptcy, insolvency, liquidation, or receivership proceedings;");
  bullet("Court order or legal adjudication, including incapacity or incompetency;");
  bullet("Divorce, separation, or division of marital property; or");
  bullet("Any similar legal or equitable proceeding affecting ownership rights.");

  subHeading("3.2 Deemed Offer and Purchase Rights");
  para("Upon the occurrence of an Involuntary Disposition, the affected Units shall automatically be deemed offered for sale to the remaining Owners, who shall have thirty (30) days to elect to purchase such Units in accordance with the terms of this Agreement.");

  // ── 4. TERMINATION OF EMPLOYMENT ──
  heading("4. TERMINATION OF EMPLOYMENT");
  para("If an Owner who is also employed by the Company ceases to be employed for any reason whatsoever, whether voluntary or involuntary (other than approved early retirement), such Owner shall be deemed to have irrevocably offered all of their Units for sale to the remaining Owners.");
  para("The remaining Owners shall be obligated to purchase such Units, either in proportion to their respective ownership interests or in such proportions as may be agreed in writing.");

  subHeading("4.1 Disabled Owner");
  para(`An Owner shall be deemed a "Disabled Owner" upon the occurrence of any of the following:`);
  bullet("A legal determination of incapacity or incompetence;");
  bullet("Qualification for disability benefits at a level exceeding fifty percent (50%); or");
  bullet("Inability to perform substantially all material duties for a continuous period of not less than one hundred eighty (180) days, as certified by a qualified medical professional.");

  // ── 5. DEATH OF AN OWNER ──
  heading("5. DEATH OF AN OWNER");
  para("Upon the death of an Owner:");
  clause("a", "the deceased Owner's Personal Representative shall be deemed to have offered all Units for sale to the Company and/or the remaining Owners; and");
  clause("b", "the remaining Owners shall be obligated to purchase such Units in accordance with this Agreement.");

  subHeading("5.1 Personal Representative");
  para(`"Personal Representative" shall mean and include any executor, administrator, trustee, or other legally authorized individual responsible for administering the estate of the deceased Owner.`);

  // ── 6. COMPANY PURCHASE OPTION ──
  heading("6. COMPANY PURCHASE OPTION");
  para("The Company shall have a primary or secondary option (as specified herein) to purchase any Offered Units before or concurrently with the other Owners, in accordance with the terms, conditions, and timelines set forth in this Agreement.");
  para("The Company is authorized to procure, maintain, and assign life insurance policies on the lives of the Owners for the purpose of funding its obligations under this Agreement.");

  // ── 7. PURCHASE PRICE AND VALUATION ──
  heading("7. PURCHASE PRICE AND VALUATION");
  subHeading("7.1 Determination of Purchase Price");
  para("Unless otherwise agreed in writing, the purchase price of the Units shall be equal to their fair book value as of the most recent fiscal or accounting date immediately preceding the triggering event.");
  if (values.paymentAmount) {
    para(`The agreed purchase price is $${values.paymentAmount}${values.paymentSchedule ? ` on a ${values.paymentSchedule} basis` : ""}.`);
  }

  subHeading("7.2 Independent Valuation Mechanism");
  para("The determination of book value shall be made by an independent Certified Public Accountant (CPA) appointed by the Company, in accordance with generally accepted accounting principles (GAAP), applied consistently.");
  para("Such determination shall be final and binding upon all parties. All costs associated with such valuation shall be borne by the Company.");

  // ── 8. PAYMENT TERMS ──
  heading("8. PAYMENT TERMS");
  subHeading("8.1 Payment Structure");
  para("The purchase price shall be paid as follows:");
  bullet("First, from the proceeds of any applicable life insurance policies;");
  bullet("Second, any remaining balance shall be payable in cash at closing or through a promissory note;");
  bullet("Any deferred payments shall be amortized over a period not exceeding sixty (60) months;");
  bullet("Interest shall accrue on unpaid balances at the prevailing prime rate or such other rate as may be agreed.");

  subHeading("8.2 Closing of Transaction");
  para("The closing of any purchase and sale transaction contemplated under this Agreement shall take place at the principal place of business of the Company, or such other location as may be agreed, within:");
  bullet("One hundred eighty (180) days following death or retirement; or");
  bullet("Thirty (30) days in all other cases.");

  // ── 9. DELIVERY, SECURITY, AND ENFORCEMENT ──
  heading("9. DELIVERY, SECURITY, AND ENFORCEMENT");
  subHeading("9.1 Delivery of Units");
  para("The Selling Owner (or Personal Representative) shall deliver duly endorsed certificates or instruments evidencing ownership of the Units, free and clear of all liens, claims, and encumbrances.");

  subHeading("9.2 Irrevocable Power of Attorney");
  para("Each Owner hereby irrevocably appoints the Company as its true and lawful attorney-in-fact, with full authority to execute and deliver all documents necessary to effectuate any Transfer required under this Agreement in the event of such Owner's failure or inability to do so.");

  subHeading("9.3 Escrow Security");
  para("In the event of deferred payment, the Units may be deposited into escrow with a mutually agreed escrow agent and held as security until full payment of the purchase price.");

  // ── 10. INSURANCE PROVISIONS ──
  heading("10. INSURANCE PROVISIONS");
  subHeading("10.1 Mandatory Insurance Coverage");
  para("Each Owner shall maintain, or cause to be maintained, life insurance policies on the lives of the other Owners in such amounts as are reasonably sufficient to fund the purchase obligations arising under this Agreement.");

  subHeading("10.2 Premium Obligations and Remedies");
  para("Each Owner shall be responsible for timely payment of insurance premiums and shall provide evidence of such payment upon request. Failure to maintain such policies shall entitle any other Owner to make such payments and recover the same, together with interest, from the defaulting Owner.");

  // ── 11. TERMINATION AND AMENDMENT ──
  heading("11. TERMINATION AND AMENDMENT");
  subHeading("11.1 Termination Events");
  para("This Agreement shall terminate upon the occurrence of:");
  bullet("Dissolution, liquidation, bankruptcy, or receivership of the Company; or");
  bullet("Written agreement of Owners holding the requisite percentage of Units.");
  para(`This agreement shall remain in effect for ${durationMap[values.duration] || values.duration || "the agreed duration"} and may be terminated upon ${terminationMap[values.terminationNotice] || values.terminationNotice || "the agreed notice"} written notice.`);

  subHeading("11.2 Amendments");
  para("No amendment, modification, or waiver of any provision of this Agreement shall be valid unless made in writing and executed by Owners holding the requisite percentage of Units.");

  // ── 12. MISCELLANEOUS ──
  heading("12. MISCELLANEOUS");
  subHeading("12.1 Tax Preservation Covenant");
  para("No Transfer shall be effected if such Transfer would adversely affect the Company's tax classification, status, or elections.");

  subHeading("12.2 Binding Effect");
  para("This Agreement shall be binding upon and inure to the benefit of the parties and their respective heirs, legal representatives, successors, and permitted assigns.");

  subHeading("12.3 Governing Law");
  para(`This Agreement shall be governed by and construed in accordance with the laws of ${jurisdiction || "the applicable jurisdiction"}. Disputes shall be resolved by ${disputeMap[values.disputeResolution] || values.disputeResolution || "the agreed method"}.${values.confidentiality === "yes" ? " A confidentiality clause is included and binding on both parties." : ""}`);

  subHeading("12.4 Severability");
  para("If any provision of this Agreement is determined to be invalid or unenforceable, such provision shall be severed, and the remaining provisions shall remain in full force and effect.");

  subHeading("12.5 Notices");
  para("All notices required or permitted under this Agreement shall be in writing and shall be deemed duly given when delivered personally or sent by registered or certified mail (or equivalent courier service).");

  subHeading("12.6 Entire Agreement");
  para("This Agreement constitutes the entire agreement among the parties and supersedes all prior negotiations, understandings, and agreements.");

  subHeading("12.7 Waiver");
  para("No waiver of any breach or provision shall be deemed a waiver of any subsequent breach or provision.");

  subHeading("12.8 Spousal Consent");
  para("Each Owner shall procure the execution of a spousal consent, whereby such spouse acknowledges and agrees to be bound by the terms of this Agreement.");

  subHeading("12.9 Effective Date");
  para("This Agreement shall become effective upon execution by all Owners, their respective spouses (where applicable), and an authorized representative of the Company.");

  subHeading("12.10 Continuing Applicability");
  para("This Agreement shall apply to all Units now owned or hereafter acquired and shall bind all transferees of such Units.");

  if (values.additionalTerms?.trim()) {
    heading("ADDITIONAL TERMS");
    para(values.additionalTerms.trim());
  }

  // ── IN WITNESS WHEREOF ──
  heading("IN WITNESS WHEREOF");
  para("The Parties hereto have executed this Buy-Sell Agreement as of the date first written above.");
  y += 4;

  // Company block
  checkY(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("COMPANY", margin, y);
  y += lineH + 1;
  doc.setFont("helvetica", "normal");
  para(`For and on behalf of ${u(values.companyName, "[Company Name]")}`, 0);
  sigLine("By", "");
  sigLine("Name", u(values.companyRepName, ""));
  sigLine("Designation", u(values.companyRepTitle, ""));
  sigLine("Date", u(values.effectiveDate, ""));
  y += 4;

  // Owner 1 block
  checkY(50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("OWNERS / SHAREHOLDERS", margin, y);
  y += lineH + 2;
  doc.text("Owner 1:", margin, y);
  y += lineH + 1;
  doc.setFont("helvetica", "normal");
  sigLine("Signature", u(values.party1Signature, ""));
  sigLine("Name", u(values.party1Name, ""));
  if (values.party1CNIC) { doc.setFont("helvetica", "normal"); doc.text(`CNIC / ID No.: ${values.party1CNIC}`, margin, y); y += lineH + 1; }
  doc.text(`Address: ${party1Address || "N/A"}`, margin, y); y += lineH + 1;
  sigLine("Date", u(values.effectiveDate, ""));
  y += 4;

  // Owner 2 block
  checkY(50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Owner 2:", margin, y);
  y += lineH + 1;
  doc.setFont("helvetica", "normal");
  sigLine("Signature", u(values.party2Signature, ""));
  sigLine("Name", u(values.party2Name, ""));
  if (values.party2CNIC) { doc.text(`CNIC / ID No.: ${values.party2CNIC}`, margin, y); y += lineH + 1; }
  doc.text(`Address: ${party2Address || "N/A"}`, margin, y); y += lineH + 1;
  sigLine("Date", u(values.effectiveDate, ""));
  y += 6;

  // Witnesses block
  if (values.witness1Name || values.witness2Name) {
    checkY(60);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("WITNESSES", margin, y);
    y += lineH + 2;

    if (values.witness1Name) {
      doc.text("Witness 1:", margin, y);
      y += lineH + 1;
      doc.setFont("helvetica", "normal");
      sigLine("Signature", "");
      sigLine("Name", values.witness1Name);
      if (values.witness1CNIC) { doc.text(`CNIC / ID No.: ${values.witness1CNIC}`, margin, y); y += lineH + 1; }
      if (values.witness1Address) { doc.text(`Address: ${values.witness1Address}`, margin, y); y += lineH + 1; }
      y += 4;
    }

    if (values.witness2Name) {
      checkY(40);
      doc.setFont("helvetica", "bold");
      doc.text("Witness 2:", margin, y);
      y += lineH + 1;
      doc.setFont("helvetica", "normal");
      sigLine("Signature", "");
      sigLine("Name", values.witness2Name);
      if (values.witness2CNIC) { doc.text(`CNIC / ID No.: ${values.witness2CNIC}`, margin, y); y += lineH + 1; }
      if (values.witness2Address) { doc.text(`Address: ${values.witness2Address}`, margin, y); y += lineH + 1; }
    }
  }

  doc.save("buy_sell_agreement.pdf");
};

export default function BuySellAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Buy Sell Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="buysellagreement"
    />
  );
}
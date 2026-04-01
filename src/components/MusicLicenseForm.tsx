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
    label: "Copyright Owner",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of the Copyright Owner",
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
    label: "Copyright Owner Address",
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
    label: "Copyright Owner Contact",
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
    label: "Licensee",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of the Licensee",
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
    label: "Licensee Address",
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
    label: "Licensee Contact",
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
    label: "Music Details",
    fields: [
      {
        name: "musicDescription",
        label: "Describe the Music (compositions, lyrics, recordings, associated rights)",
        type: "textarea",
        required: true,
        placeholder: "e.g. Original compositions titled 'Song A' and 'Song B', including all lyrics and master recordings...",
      },
      {
        name: "territory",
        label: "Territory (geographical area of license)",
        type: "text",
        required: true,
        placeholder: "e.g. Worldwide / United States / North America",
      },
    ],
  },
  {
    label: "License Type",
    fields: [
      {
        name: "licenseType",
        label: "Is this license exclusive or non-exclusive?",
        type: "select",
        required: true,
        options: [
          { value: "non-exclusive", label: "Non-exclusive" },
          { value: "exclusive", label: "Exclusive" },
        ],
      },
      {
        name: "description",
        label: "Describe the purpose and scope of this agreement",
        type: "textarea",
        required: true,
        placeholder: "Provide a detailed description of the agreement terms...",
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
        name: "curePeriodDays",
        label: "Cure period (days) before termination for default",
        type: "select",
        required: true,
        options: [
          { value: "7", label: "7 Days" },
          { value: "14", label: "14 Days" },
          { value: "30", label: "30 Days" },
          { value: "60", label: "60 Days" },
          { value: "90", label: "90 Days" },
        ],
      },
    ],
  },
  {
    label: "Royalties & Payments",
    fields: [
      {
        name: "royaltyType",
        label: "Royalty structure",
        type: "select",
        required: true,
        options: [
          { value: "percent_gross", label: "Percentage of Gross Revenue" },
          { value: "percent_net", label: "Percentage of Net Revenue" },
          { value: "flat_fee", label: "Flat Fee" },
          { value: "other", label: "Other / Custom" },
        ],
      },
      {
        name: "paymentAmount",
        label: "Royalty percentage (%) or flat fee amount ($)",
        type: "text",
        required: true,
        placeholder: "e.g. 10% or $5,000",
      },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: true,
        options: [
          { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "biannually", label: "Bi-annually" },
          { value: "annually", label: "Annually" },
        ],
      },
      {
        name: "paymentDueDays",
        label: "Days after reporting period payment is due",
        type: "select",
        required: true,
        options: [
          { value: "15", label: "15 Days" },
          { value: "30", label: "30 Days" },
          { value: "45", label: "45 Days" },
          { value: "60", label: "60 Days" },
        ],
      },
    ],
  },
  {
    label: "Interest & Sell-Off",
    fields: [
      {
        name: "lateInterestRate",
        label: "Late payment interest rate (% per annum)",
        type: "text",
        required: false,
        placeholder: "e.g. 1.5",
      },
      {
        name: "sellOffDays",
        label: "Sell-off period after termination (days)",
        type: "select",
        required: true,
        options: [
          { value: "30", label: "30 Days" },
          { value: "60", label: "60 Days" },
          { value: "90", label: "90 Days" },
          { value: "180", label: "180 Days" },
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
          { value: "arbitration", label: "Binding Arbitration (AAA)" },
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
        name: "party1SignatureName",
        label: "Copyright Owner — Signatory Name",
        type: "text",
        required: true,
        placeholder: "Full legal name",
      },
      {
        name: "party1SignatureTitle",
        label: "Copyright Owner — Title",
        type: "text",
        required: false,
        placeholder: "e.g. Director / Owner",
      },
      {
        name: "party2SignatureName",
        label: "Licensee — Signatory Name",
        type: "text",
        required: true,
        placeholder: "Full legal name",
      },
      {
        name: "party2SignatureTitle",
        label: "Licensee — Title",
        type: "text",
        required: false,
        placeholder: "e.g. Director / CEO",
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

// ─── PDF Helpers ──────────────────────────────────────────────────────────────

const addPage = (doc: jsPDF, y: number, margin: number): number => {
  if (y > 272) { doc.addPage(); return margin; }
  return y;
};

const writeWrapped = (doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number, margin: number): number => {
  const lines: string[] = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line: string) => {
    y = addPage(doc, y, margin);
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
};

const sectionTitle = (doc: jsPDF, text: string, x: number, y: number, margin: number): number => {
  y = addPage(doc, y, margin);
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "bold");
  doc.text(text, x, y);
  return y + 5;
};

const body = (doc: jsPDF, text: string, x: number, y: number, w: number, lh: number, margin: number): number => {
  y = addPage(doc, y, margin);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  return writeWrapped(doc, text, x, y, w, lh, margin);
};

const bullet = (doc: jsPDF, text: string, x: number, y: number, w: number, lh: number, margin: number): number => {
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  return writeWrapped(doc, `\u2022  ${text}`, x + 4, y, w - 4, lh, margin);
};

// ─── generatePDF ──────────────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 20;
  const R = 190;
  const W = R - L;
  const lh = 5;
  let y = 18;

  const durMap: Record<string, string> = {
    "1month": "1 Month", "3months": "3 Months", "6months": "6 Months",
    "1year": "1 Year", "2years": "2 Years", "5years": "5 Years",
    "indefinite": "Indefinite/Ongoing", "custom": "Custom Duration",
  };

  const p1name       = values.party1Name || "Copyright Owner";
  const p2name       = values.party2Name || "Licensee";
  const p1addr       = `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`;
  const p2addr       = `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`;
  const eDate        = values.effectiveDate || "___";
  const juris        = `${values.state || "___"}, ${(values.country || "").toUpperCase()}`;
  const dur          = durMap[values.duration] || values.duration || "___";
  const musicDesc    = values.musicDescription || "___";
  const territory    = values.territory || "___";
  const licType      = values.licenseType || "non-exclusive";
  const royaltyType  = values.royaltyType || "percent_gross";
  const payAmt       = values.paymentAmount || "___";
  const paySched     = values.paymentSchedule || "___";
  const payDue       = values.paymentDueDays || "30";
  const lateRate     = values.lateInterestRate || "___";
  const cureDays     = values.curePeriodDays || "30";
  const sellOffDays  = values.sellOffDays || "90";
  const sig1Name     = values.party1SignatureName || p1name;
  const sig1Title    = values.party1SignatureTitle || "";
  const sig2Name     = values.party2SignatureName || p2name;
  const sig2Title    = values.party2SignatureTitle || "";

  const royaltyDesc = royaltyType === "flat_fee"
    ? `Flat fee of $${payAmt}`
    : royaltyType === "percent_gross"
    ? `${payAmt}% of gross revenue derived from exploitation of the Music`
    : royaltyType === "percent_net"
    ? `${payAmt}% of net revenue derived from exploitation of the Music`
    : payAmt;

  // ── Title ──
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("MUSIC LICENSE AGREEMENT", 105, y, { align: "center" });
  y += 7;
  doc.setLineWidth(0.5);
  doc.line(L, y, R, y);
  y += 6;

  // ── Parties intro ──
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const intro = `This Music License Agreement (the "Agreement") is made and entered into as of ${eDate} (the "Effective Date"), by and between ${p1name}, having an address at ${p1addr} (the "Copyright Owner"), AND ${p2name}, having an address at ${p2addr} (the "Licensee"). The Copyright Owner and the Licensee may each be referred to herein as a "Party" and collectively as the "Parties."`;
  y = writeWrapped(doc, intro, L, y, W, lh, L);
  y += 3;

  // ── RECITALS ──
  y = sectionTitle(doc, "RECITALS", L, y, L);
  y = body(doc, "WHEREAS, the Copyright Owner is the sole owner of all copyrights, publishing rights, and related intellectual property rights in and to certain musical works, compositions, sound recordings, and related materials (collectively, the \"Music\");", L, y, W, lh, L);
  y = body(doc, "WHEREAS, the Licensee desires to obtain certain rights to use the Music, and the Copyright Owner is willing to grant such rights, subject to the terms and conditions set forth herein;", L, y, W, lh, L);
  y = body(doc, "NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the Parties agree as follows:", L, y, W, lh, L);
  y += 2;

  // ── 1. DEFINITIONS ──
  y = sectionTitle(doc, "1. DEFINITIONS", L, y, L);
  y = body(doc, "For purposes of this Agreement:", L, y, W, lh, L);
  y = bullet(doc, `"Music" means ${musicDesc}, including all compositions, lyrics, recordings, and associated rights.`, L, y, W, lh, L);
  y = bullet(doc, `"Territory" means ${territory}, as defined in Section 3.`, L, y, W, lh, L);
  y = bullet(doc, '"Licensed Uses" means the rights granted under Section 2.', L, y, W, lh, L);
  y += 2;

  // ── 2. GRANT OF LICENSE ──
  y = sectionTitle(doc, "2. GRANT OF LICENSE", L, y, L);
  y = sectionTitle(doc, "2.1 License Grant", L, y, L);
  y = body(doc, `Subject to the terms and conditions of this Agreement, the Copyright Owner hereby grants to the Licensee a ${licType}, non-transferable, and non-sublicensable license to use the Music solely for the purposes expressly permitted under this Agreement.`, L, y, W, lh, L);
  y = sectionTitle(doc, "2.2 Permitted Uses", L, y, L);
  y = body(doc, "The Licensee shall have the right to:", L, y, W, lh, L);
  y = bullet(doc, "Record, reproduce, and copy the Music;", L, y, W, lh, L);
  y = bullet(doc, "Synchronize the Music with visual or audiovisual content (including films, advertisements, digital media, and broadcasts);", L, y, W, lh, L);
  y = bullet(doc, "Distribute, market, and sell products incorporating the Music in physical and digital formats (including CD, DVD, streaming platforms, and downloads); and", L, y, W, lh, L);
  y = bullet(doc, "Publicly perform and communicate the Music within the Territory, subject to applicable law.", L, y, W, lh, L);
  y = sectionTitle(doc, "2.3 Reservation of Rights", L, y, L);
  y = body(doc, "All rights not expressly granted herein are reserved by the Copyright Owner. Title and ownership of the Music shall remain exclusively with the Copyright Owner.", L, y, W, lh, L);
  y += 2;

  // ── 3. TERRITORY ──
  y = sectionTitle(doc, "3. TERRITORY", L, y, L);
  y = body(doc, `This Agreement shall apply solely within the following geographical territory: ${territory} (the "Territory"). The Licensee shall not exploit or authorize the exploitation of the Music outside the Territory without prior written consent of the Copyright Owner.`, L, y, W, lh, L);
  y += 2;

  // ── 4. TERM ──
  y = sectionTitle(doc, "4. TERM", L, y, L);
  y = body(doc, `This Agreement shall commence on the Effective Date and shall continue for a period of ${dur}, unless earlier terminated in accordance with this Agreement.`, L, y, W, lh, L);
  y += 2;

  // ── 5. ROYALTIES AND PAYMENT ──
  y = sectionTitle(doc, "5. ROYALTIES AND PAYMENT", L, y, L);
  y = sectionTitle(doc, "5.1 Royalty", L, y, L);
  y = body(doc, `The Licensee shall pay to the Copyright Owner a royalty calculated as follows: ${royaltyDesc}.`, L, y, W, lh, L);
  y = sectionTitle(doc, "5.2 Reporting", L, y, L);
  y = body(doc, "Each royalty payment shall be accompanied by a detailed written report specifying:", L, y, W, lh, L);
  y = bullet(doc, "Units sold or distributed;", L, y, W, lh, L);
  y = bullet(doc, "Revenue generated;", L, y, W, lh, L);
  y = bullet(doc, "Deductions (if applicable); and", L, y, W, lh, L);
  y = bullet(doc, "Royalty calculations.", L, y, W, lh, L);
  y = sectionTitle(doc, "5.3 Payment Schedule", L, y, L);
  y = body(doc, `Payments shall be made on a ${paySched} basis within ${payDue} days following the end of each reporting period. Late payments may accrue interest at the rate of ${lateRate}% per annum or the maximum rate permitted by law.`, L, y, W, lh, L);
  y += 2;

  // ── 6. RIGHTS AND OBLIGATIONS ──
  y = sectionTitle(doc, "6. RIGHTS AND OBLIGATIONS", L, y, L);
  y = sectionTitle(doc, "6.1 Obligations of Licensee", L, y, L);
  y = body(doc, "The Licensee shall:", L, y, W, lh, L);
  y = bullet(doc, "Bear all costs associated with production, distribution, and marketing;", L, y, W, lh, L);
  y = bullet(doc, "Be solely responsible for recording and synchronization activities;", L, y, W, lh, L);
  y = bullet(doc, "Ensure compliance with all applicable laws and regulations; and", L, y, W, lh, L);
  y = bullet(doc, "Properly credit the Copyright Owner in all uses of the Music, including product packaging, promotional materials, and advertising and media content.", L, y, W, lh, L);
  y = sectionTitle(doc, "6.2 Ownership of Derivative Works", L, y, L);
  y = body(doc, "The Licensee shall own the final product into which the Music is incorporated, provided that such ownership does not extend to the Music itself.", L, y, W, lh, L);
  y += 2;

  // ── 7. RESTRICTIONS ──
  y = sectionTitle(doc, "7. RESTRICTIONS AND MODIFICATIONS", L, y, L);
  y = body(doc, "The Licensee shall not:", L, y, W, lh, L);
  y = bullet(doc, "Modify, adapt, remix, or alter the Music in any manner without the prior written consent of the Copyright Owner;", L, y, W, lh, L);
  y = bullet(doc, "Use the Music in any unlawful, defamatory, or misleading manner; or", L, y, W, lh, L);
  y = bullet(doc, "Exploit the Music beyond the scope of the Licensed Uses.", L, y, W, lh, L);
  y += 2;

  // ── 8. DEFAULT AND TERMINATION ──
  y = sectionTitle(doc, "8. DEFAULT AND TERMINATION", L, y, L);
  y = sectionTitle(doc, "8.1 Events of Default", L, y, L);
  y = body(doc, "A Party shall be deemed in default if it:", L, y, W, lh, L);
  y = bullet(doc, "Fails to make required payments;", L, y, W, lh, L);
  y = bullet(doc, "Breaches any material term of this Agreement; or", L, y, W, lh, L);
  y = bullet(doc, "Becomes insolvent or subject to bankruptcy proceedings.", L, y, W, lh, L);
  y = sectionTitle(doc, "8.2 Cure Period", L, y, L);
  y = body(doc, `The non-defaulting Party may terminate this Agreement upon ${cureDays} days' written notice, unless the default is cured within such period.`, L, y, W, lh, L);
  y += 2;

  // ── 9. DISPUTE RESOLUTION ──
  y = sectionTitle(doc, "9. DISPUTE RESOLUTION", L, y, L);
  y = body(doc, "Any dispute arising out of or relating to this Agreement shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association (or applicable local arbitration authority).", L, y, W, lh, L);
  y = bullet(doc, "Either Party may initiate arbitration upon thirty (30) days' written notice;", L, y, W, lh, L);
  y = bullet(doc, "Arbitration costs shall be shared equally, unless otherwise awarded;", L, y, W, lh, L);
  y = bullet(doc, "The arbitral award shall be final and enforceable in any court of competent jurisdiction.", L, y, W, lh, L);
  y += 2;

  // ── 10. WARRANTIES AND DISCLAIMERS ──
  y = sectionTitle(doc, "10. WARRANTIES AND DISCLAIMERS", L, y, L);
  y = sectionTitle(doc, "10.1 Copyright Owner Warranty", L, y, L);
  y = body(doc, "The Copyright Owner represents and warrants that it has the full right, power, and authority to grant the rights set forth herein.", L, y, W, lh, L);
  y = sectionTitle(doc, "10.2 Disclaimer", L, y, L);
  y = body(doc, "Except as expressly stated, the Music is provided \"AS IS,\" and neither Party makes any additional warranties, express or implied. To the fullest extent permitted by law, neither Party shall be liable for any indirect, incidental, or consequential damages.", L, y, W, lh, L);
  y += 2;

  // ── 11. INDEMNIFICATION ──
  y = sectionTitle(doc, "11. INDEMNIFICATION", L, y, L);
  y = sectionTitle(doc, "11.1 By Copyright Owner", L, y, L);
  y = body(doc, "The Copyright Owner shall indemnify and hold harmless the Licensee against claims arising from any breach of its representations and warranties.", L, y, W, lh, L);
  y = sectionTitle(doc, "11.2 By Licensee", L, y, L);
  y = body(doc, "The Licensee shall indemnify and hold harmless the Copyright Owner and its affiliates against any claims, damages, liabilities, or expenses arising from:", L, y, W, lh, L);
  y = bullet(doc, "Use or exploitation of the Music;", L, y, W, lh, L);
  y = bullet(doc, "Third-party claims;", L, y, W, lh, L);
  y = bullet(doc, "Intellectual property infringement (to the extent caused by Licensee's use); or", L, y, W, lh, L);
  y = bullet(doc, "Breach of this Agreement.", L, y, W, lh, L);
  y += 2;

  // ── 12. ASSIGNMENT ──
  y = sectionTitle(doc, "12. ASSIGNMENT", L, y, L);
  y = body(doc, "This Agreement shall be binding upon and inure to the benefit of the Parties and their respective successors and permitted assigns. Neither Party may assign or transfer this Agreement without the prior written consent of the other Party, except in connection with a merger or sale of substantially all assets.", L, y, W, lh, L);
  y += 2;

  // ── 13. TERMINATION ──
  y = sectionTitle(doc, "13. TERMINATION", L, y, L);
  y = body(doc, "Either Party may terminate this Agreement upon thirty (30) days' written notice. This Agreement shall also terminate automatically upon:", L, y, W, lh, L);
  y = bullet(doc, "Expiration of the Term;", L, y, W, lh, L);
  y = bullet(doc, "Material breach not cured within the applicable cure period; or", L, y, W, lh, L);
  y = bullet(doc, "Mutual written agreement of the Parties.", L, y, W, lh, L);
  y += 2;

  // ── 14. EFFECT OF TERMINATION ──
  y = sectionTitle(doc, "14. EFFECT OF TERMINATION", L, y, L);
  y = body(doc, "Upon termination:", L, y, W, lh, L);
  y = bullet(doc, "All rights granted to the Licensee shall immediately revert to the Copyright Owner;", L, y, W, lh, L);
  y = bullet(doc, "The Licensee shall cease all use of the Music;", L, y, W, lh, L);
  y = bullet(doc, `The Licensee may, for a period of ${sellOffDays} days, sell off existing inventory (if permitted); and`, L, y, W, lh, L);
  y = bullet(doc, "All outstanding payment obligations shall survive termination.", L, y, W, lh, L);
  y += 2;

  // ── 15. CONFIDENTIALITY ──
  if (values.confidentiality === "yes") {
    y = sectionTitle(doc, "15. CONFIDENTIALITY", L, y, L);
    y = body(doc, "Each Party agrees to keep confidential all non-public, proprietary, or financial information disclosed in connection with this Agreement. This obligation shall survive termination of this Agreement.", L, y, W, lh, L);
    y += 2;
  }

  // ── 16. NOTICES ──
  y = sectionTitle(doc, "16. NOTICES", L, y, L);
  y = body(doc, "All notices under this Agreement shall be in writing and delivered by certified or registered mail, courier, or email (with confirmation of receipt) to the addresses set forth above.", L, y, W, lh, L);
  y += 2;

  // ── 17. GOVERNING LAW ──
  y = sectionTitle(doc, "17. GOVERNING LAW", L, y, L);
  y = body(doc, `This Agreement shall be governed by and construed in accordance with the laws of the State of ${juris}, without regard to its conflict of laws principles.`, L, y, W, lh, L);
  y += 2;

  // ── 18. MISCELLANEOUS ──
  y = sectionTitle(doc, "18. MISCELLANEOUS", L, y, L);
  y = sectionTitle(doc, "18.1 Entire Agreement", L, y, L);
  y = body(doc, "This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements.", L, y, W, lh, L);
  y = sectionTitle(doc, "18.2 Amendments", L, y, L);
  y = body(doc, "This Agreement may only be amended in writing signed by both Parties.", L, y, W, lh, L);
  y = sectionTitle(doc, "18.3 Severability", L, y, L);
  y = body(doc, "If any provision is held invalid, the remaining provisions shall remain in full force and effect.", L, y, W, lh, L);
  y = sectionTitle(doc, "18.4 Waiver", L, y, L);
  y = body(doc, "Failure to enforce any provision shall not constitute a waiver of future enforcement.", L, y, W, lh, L);
  y = sectionTitle(doc, "18.5 Headings", L, y, L);
  y = body(doc, "Section headings are for convenience only and shall not affect interpretation.", L, y, W, lh, L);

  if (values.additionalTerms) {
    y += 2;
    y = sectionTitle(doc, "ADDITIONAL TERMS", L, y, L);
    y = body(doc, values.additionalTerms, L, y, W, lh, L);
  }

  // ── SIGNATURES ──
  y += 4;
  y = addPage(doc, y, L);
  doc.setLineWidth(0.4);
  doc.line(L, y, R, y);
  y += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("19. SIGNATURES", L, y);
  y += 5;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", L, y);
  y += 7;

  // COPYRIGHT OWNER block
  doc.setFont("helvetica", "bold");
  doc.text("COPYRIGHT OWNER:", L, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("By: ______________________________", L, y); y += 5;
  doc.setFont("helvetica", "italic");
  doc.text(sig1Name, L + 8, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Name: " + sig1Name, L, y); y += 5;
  doc.text("Title: " + (sig1Title || "______________________________"), L, y); y += 5;
  doc.text("Date: ______________________________", L, y); y += 5;
  doc.text("Address: " + p1addr, L, y); y += 5;
  doc.text("Email: " + (values.party1Email || ""), L, y);
  if (values.party1Phone) { y += 5; doc.text("Phone: " + values.party1Phone, L, y); }
  y += 10;

  // LICENSEE block
  doc.setFont("helvetica", "bold");
  doc.text("LICENSEE:", L, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("By: ______________________________", L, y); y += 5;
  doc.setFont("helvetica", "italic");
  doc.text(sig2Name, L + 8, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("Name: " + sig2Name, L, y); y += 5;
  doc.text("Title: " + (sig2Title || "______________________________"), L, y); y += 5;
  doc.text("Date: ______________________________", L, y); y += 5;
  doc.text("Address: " + p2addr, L, y); y += 5;
  doc.text("Email: " + (values.party2Email || ""), L, y);
  if (values.party2Phone) { y += 5; doc.text("Phone: " + values.party2Phone, L, y); }

  if (values.witnessName) {
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS:", L, y); y += 5;
    doc.setFont("helvetica", "normal");
    doc.text("Name: " + values.witnessName, L, y); y += 5;
    doc.text("Signature: ______________________________", L, y); y += 5;
    doc.text("Date: ______________________________", L, y);
  }

  doc.save("music_license_agreement.pdf");
};

export default function MusicLicense() {
  return (
    <FormWizard
      steps={steps}
      title="Music License Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="musiclicense"
    />
  );
}
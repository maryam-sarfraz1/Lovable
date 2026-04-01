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
        label: "What is the effective date of this document?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Corporation Details",
    fields: [
      {
        name: "corporationName",
        label: "What is the full legal name of the Corporation?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name of the Corporation",
      },
      {
        name: "numberOfDirectors",
        label: "How many directors will be on the Board?",
        type: "text",
        required: true,
        placeholder: "e.g. 3",
      },
      {
        name: "directorTermYears",
        label: "How many years will directors serve per term?",
        type: "text",
        required: true,
        placeholder: "e.g. 1",
      },
    ],
  },
  {
    label: "First Party Name",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the first party (Founder)?",
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
    label: "First Party Address",
    fields: [
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "First Party Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Second Party Name",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the second party (Organization)?",
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
    label: "Second Party Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Second Party Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Document Details",
    fields: [
      {
        name: "description",
        label: "Describe the purpose and details of this nonprofit",
        type: "textarea",
        required: true,
        placeholder: "Describe the nonprofit's charitable, educational, or public benefit objectives...",
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
      { name: "paymentAmount", label: "What is the payment amount (if applicable)?", type: "text", required: false, placeholder: "$0.00" },
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
        placeholder: "Enter any additional terms...",
      },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      { name: "party1Signature", label: "First Party Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Signature", label: "Second Party Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "secretaryName", label: "Secretary Name (for Certification)", type: "text", required: true, placeholder: "Secretary's full legal name" },
      { name: "certificationDate", label: "Certification Date", type: "date", required: true },
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

  const articleTitle = (text: string) => {
    checkNewPage(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    const tw = doc.getTextWidth(text);
    doc.text(text, (pageWidth - tw) / 2, y);
    y += 8;
  };

  const corpName = values.corporationName || "[CORPORATION NAME]";
  const stateProvince = jurisdiction || "[STATE/PROVINCE]";
  const numDirectors = values.numberOfDirectors || "[____]";
  const directorTerm = values.directorTermYears || "[____]";

  // ── TITLE ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const title = "NON-PROFIT BY LAWS";
  const titleW = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleW) / 2, y);
  doc.setLineWidth(0.5);
  doc.line((pageWidth - titleW) / 2, y + 1.5, (pageWidth - titleW) / 2 + titleW, y + 1.5);
  y += 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const subLine = `${corpName} | Effective: ${values.effectiveDate || "N/A"} | Jurisdiction: ${stateProvince}`;
  const subW = doc.getTextWidth(subLine);
  doc.text(subLine, (pageWidth - subW) / 2, y);
  y += 12;

  // ── ARTICLE I ──
  articleTitle("ARTICLE I");
  sectionTitle("OFFICES");

  sectionTitle("Section 1. Registered Office");
  para(
    `The registered office of ${corpName} (the "Corporation") shall be situated at such place as may be specified in the Corporation's formation documents or as otherwise determined in accordance with applicable law.`
  );

  sectionTitle("Section 2. Other Offices");
  para(
    `The Corporation may maintain such additional offices, both within and outside ${stateProvince}, as the Board of Directors (the "Board") may from time to time determine or as the business of the Corporation may require.`
  );
  y += 4;

  // ── ARTICLE II ──
  articleTitle("ARTICLE II");
  sectionTitle("SHAREHOLDERS");

  sectionTitle("Section 1. Annual Meeting");
  para(
    `An annual meeting of the shareholders shall be held once in each calendar year for the purpose of electing directors and transacting such other business as may properly come before the meeting. The time and place of such meeting shall be determined by the Board.`
  );

  sectionTitle("Section 2. Special Meetings");
  para(
    `Special meetings of the shareholders may be called by the President, the Board, or by shareholders holding a majority of the outstanding voting shares.`
  );

  sectionTitle("Section 3. Notice of Meetings");
  para(
    `Written notice of all meetings of shareholders, whether annual or special, shall be given in accordance with applicable law. Such notice shall specify the place, date, and time of the meeting, and, in the case of a special meeting, the purpose or purposes thereof. Notice shall be delivered to each shareholder of record at least ten (10) days prior to the meeting and shall be deemed effective upon deposit in the ordinary mail, properly addressed, with postage prepaid.`
  );

  sectionTitle("Section 4. Place of Meetings");
  para(
    `Meetings of shareholders shall be held at the principal place of business of the Corporation unless otherwise specified in the notice. Shareholders may participate in meetings by means of remote communication, to the extent authorized by the Board, provided that appropriate procedures are adopted to verify participation and voting. Participation by such means shall constitute presence in person.`
  );

  sectionTitle("Section 5. Quorum");
  para(
    `A majority of the outstanding voting shares, present in person or represented by proxy, shall constitute a quorum for the transaction of business. In the absence of a quorum, a majority of the shares represented may adjourn the meeting. Any business may be transacted at a reconvened meeting provided a quorum is present.`
  );

  sectionTitle("Section 6. Action Without Meeting");
  para(
    `Any action required or permitted to be taken at a meeting of shareholders may be taken without a meeting and without prior notice if a written consent thereto is signed by shareholders holding all of the outstanding voting shares.`
  );
  y += 4;

  // ── ARTICLE III ──
  articleTitle("ARTICLE III");
  sectionTitle("BOARD OF DIRECTORS");

  sectionTitle("Section 1. Number");
  para(
    `The business and affairs of the Corporation shall be managed by a Board consisting of ${numDirectors} director(s).`
  );

  sectionTitle("Section 2. Election and Term");
  para(
    `Directors shall be elected at the annual meeting of shareholders and shall serve for a term of ${directorTerm} year(s), or until their successors have been duly elected and qualified.`
  );

  sectionTitle("Section 3. Quorum");
  para(`A majority of the directors then in office shall constitute a quorum for the transaction of business.`);

  sectionTitle("Section 4. Conflicts of Interest");
  para(
    `The disclosure of any actual or potential conflict of interest by a director shall not, in itself, invalidate any action taken by the Board, provided such disclosure is made in accordance with applicable law.`
  );

  sectionTitle("Section 5. Regular Meetings");
  para(
    `An annual meeting of the Board shall be held immediately following the annual meeting of shareholders, without the necessity of notice. Additional regular meetings may be scheduled by resolution of the Board.`
  );

  sectionTitle("Section 6. Special Meetings");
  para(
    `Special meetings of the Board may be called by the President, Vice-President, Secretary, or any two (2) directors upon not less than five (5) days' prior written notice.`
  );

  sectionTitle("Section 7. Voting and Procedures");
  para(
    `The act of a majority of the directors present at a meeting at which a quorum is present shall constitute the act of the Board, unless otherwise required by law or these Bylaws. A director who is present at a meeting shall be presumed to have assented to any action taken unless such director's dissent is entered into the minutes.`
  );

  sectionTitle("Section 8. Action Without Meeting");
  para(`Any action required or permitted to be taken by the Board may be taken without a meeting if all directors consent thereto in writing.`);

  sectionTitle("Section 9. Removal and Vacancies");
  para(
    `Any director may be removed, with or without cause, in accordance with applicable law. Vacancies on the Board may be filled by the remaining directors, and any director so elected shall serve for the unexpired term of their predecessor.`
  );

  sectionTitle("Section 10. Resignation");
  para(
    `A director may resign at any time by submitting written notice to the Corporation. Such resignation shall take effect upon receipt unless otherwise specified therein.`
  );

  sectionTitle("Section 11. Committees");
  para(
    `The Board may, by resolution, establish one or more committees and delegate to such committees such authority as permitted by law.`
  );
  y += 4;

  // ── ARTICLE IV ──
  articleTitle("ARTICLE IV");
  sectionTitle("OFFICERS");

  sectionTitle("Section 1. Officers");
  para(
    `The officers of the Corporation shall include a President, a Secretary, and a Treasurer. Two or more offices may be held by the same individual, except that the offices of President and Secretary shall not be held by the same person.`
  );

  sectionTitle("Section 2. President");
  para(
    `The President shall serve as the chief executive officer of the Corporation and shall preside at all meetings of shareholders and directors, and shall perform such other duties as may be assigned by the Board.`
  );

  sectionTitle("Section 3. Secretary");
  para(
    `The Secretary shall be responsible for giving notice of meetings, maintaining corporate records, certifying official documents, and recording the minutes of all meetings.`
  );

  sectionTitle("Section 4. Treasurer");
  para(
    `The Treasurer shall oversee the financial affairs of the Corporation, maintain accurate financial records, and provide regular reports to the Board.`
  );

  sectionTitle("Section 5. Election and Term");
  para(
    `Officers shall be elected annually by the Board and shall serve for a term of one (1) year or until their successors are duly elected and qualified.`
  );

  sectionTitle("Section 6. Removal and Vacancies");
  para(`Any officer may be removed by the Board at any time, with or without cause. Vacancies in any office may be filled by the Board.`);
  y += 4;

  // ── ARTICLE V ──
  articleTitle("ARTICLE V");
  sectionTitle("CORPORATE SEAL AND EXECUTION OF INSTRUMENTS");
  para(
    `The Corporation shall not maintain a corporate seal. Instruments affecting real property shall be executed by the President or Vice-President together with the Secretary or Treasurer. All other instruments may be executed by such officers or agents as may be duly authorized by the Board.`
  );
  y += 4;

  // ── ARTICLE VI ──
  articleTitle("ARTICLE VI");
  sectionTitle("STOCK CERTIFICATES");
  para(
    `The Corporation may issue shares with or without certificates, as permitted by law. In the absence of certificates, shareholders shall be provided with written statements evidencing their ownership. Certificates shall be issued upon request.`
  );
  y += 4;

  // ── ARTICLE VII ──
  articleTitle("ARTICLE VII");
  sectionTitle("INDEMNIFICATION");
  para(
    `To the fullest extent permitted by applicable law, the Corporation shall indemnify and hold harmless any director or officer who is or was a party to any proceeding by reason of their position with the Corporation.`
  );
  y += 4;

  // ── ARTICLE VIII ──
  articleTitle("ARTICLE VIII");
  sectionTitle("AMENDMENTS");
  para(
    `These Bylaws may be amended, altered, or repealed by a majority vote of the Board or the shareholders, provided that certain provisions may be reserved exclusively for amendment by shareholders where required by law or specified herein.`
  );
  y += 4;

  // ── ARTICLE IX ──
  articleTitle("ARTICLE IX");
  sectionTitle("DISSOLUTION");
  para(
    `The Corporation may be dissolved upon authorization of the Board and approval by not less than two-thirds (2/3) of the shareholders, in accordance with applicable law.`
  );
  y += 4;

  // ── Additional Terms from Form ──
  if (values.description || values.additionalTerms || values.duration || values.disputeResolution) {
    articleTitle("ADDITIONAL PROVISIONS");

    if (values.description?.trim()) {
      sectionTitle("Purpose and Objectives");
      para(values.description.trim());
    }

    if (values.duration) {
      sectionTitle("Duration");
      para(`This agreement shall remain in effect for ${durationMap[values.duration] || values.duration} and may be terminated upon ${terminationMap[values.terminationNotice] || values.terminationNotice || "the agreed notice"} written notice to the other party.`);
    }

    if (values.disputeResolution) {
      sectionTitle("Dispute Resolution");
      para(`Disputes shall be resolved by ${disputeMap[values.disputeResolution] || values.disputeResolution}.`);
    }

    if (values.confidentiality === "yes") {
      sectionTitle("Confidentiality");
      para(`A confidentiality clause is included and binding on both parties.`);
    }

    if (values.paymentAmount) {
      sectionTitle("Financial Contributions");
      para(`The agreed funding contribution is ${values.paymentAmount} on a ${values.paymentSchedule || "mutually agreed"} basis.`);
    }

    if (values.additionalTerms?.trim()) {
      sectionTitle("Special Conditions");
      para(values.additionalTerms.trim());
    }
    y += 4;
  }

  // ── CERTIFICATION ──
  checkNewPage(50);
  articleTitle("CERTIFICATION");
  para(
    `I, ${values.secretaryName || "[__________]"}, Secretary of ${corpName}, hereby certify that the foregoing Bylaws constitute a true and correct copy of the Bylaws of the Corporation, duly adopted by the initial Board of Directors on ${values.certificationDate || values.effectiveDate || "[__________]"}.`
  );
  y += 8;

  // Secretary Signature
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const secSigVal = values.party1Signature || "________________________";
  doc.text(secSigVal, margin, y);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 1.2, margin + Math.max(doc.getTextWidth(secSigVal), 60), y + 1.2);
  y += 6;
  doc.text("Secretary", margin, y);
  y += 10;

  const certDateVal = values.certificationDate || "________________________";
  doc.text(certDateVal, margin, y);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 1.2, margin + Math.max(doc.getTextWidth(certDateVal), 50), y + 1.2);
  y += 6;
  doc.text("Date", margin, y);
  y += 12;

  // ── FORMATION AGREEMENT SIGNATURES ──
  checkNewPage(70);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const sigTitle = "NONPROFIT FORMATION AGREEMENT – EXECUTION";
  const sigTW = doc.getTextWidth(sigTitle);
  doc.text(sigTitle, (pageWidth - sigTW) / 2, y);
  doc.setLineWidth(0.4);
  doc.line((pageWidth - sigTW) / 2, y + 1.5, (pageWidth - sigTW) / 2 + sigTW, y + 1.5);
  y += 10;

  para(
    `This Nonprofit Formation Agreement is entered into as of ${values.effectiveDate || "N/A"}, between ${values.party1Name || "the Founder"} (${values.party1Type === "business" ? "a business entity" : "an individual"}) and ${values.party2Name || "the Organization"}, governed by the laws of ${jurisdiction || "the applicable jurisdiction"}.`
  );
  y += 4;

  // First Party Signature
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("First Party Signature:", margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const fp1Sig = values.party1Signature || "________________________";
  doc.text(fp1Sig, margin, y);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 1.2, margin + Math.max(doc.getTextWidth(fp1Sig), 70), y + 1.2);
  y += 8;

  doc.text(`Name: ${values.party1Name || "________________________"}`, margin, y); y += 6;
  if (party1Address) { doc.text(`Address: ${party1Address}`, margin, y); y += 6; }
  if (values.party1Email) { doc.text(`Email: ${values.party1Email}`, margin, y); y += 6; }
  if (values.party1Phone) { doc.text(`Phone: ${values.party1Phone}`, margin, y); y += 6; }
  y += 6;

  // Second Party Signature
  checkNewPage(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Second Party Signature:", margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const fp2Sig = values.party2Signature || "________________________";
  doc.text(fp2Sig, margin, y);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 1.2, margin + Math.max(doc.getTextWidth(fp2Sig), 70), y + 1.2);
  y += 8;

  doc.text(`Name: ${values.party2Name || "________________________"}`, margin, y); y += 6;
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
  }

  doc.save("nonprofit_bylaws.pdf");
};

export default function NonprofitFormation() {
  return (
    <FormWizard
      steps={steps}
      title="Non-Profit Bylaws & Formation"
      subtitle="Complete each step to generate your Nonprofit Bylaws and Formation Agreement"
      onGenerate={generatePDF}
      documentType="nonprofitformation"
    />
  );
}
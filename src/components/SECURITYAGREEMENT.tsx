import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Agreement Date",
    fields: [
      { name: "agreementDay",   label: "Day — e.g. 5th",      type: "text", required: true,  placeholder: "e.g. 5th"     },
      { name: "agreementMonth", label: "Month — e.g. January", type: "text", required: true,  placeholder: "e.g. January" },
      { name: "agreementYear",  label: "Year — e.g. 2025",     type: "text", required: true,  placeholder: "e.g. 2025"    },
    ],
  },
  {
    label: "Step 2: Debtor",
    fields: [
      { name: "debtorName",         label: "Debtor — Full Legal Name",    type: "text", required: true, placeholder: "Full legal name of Debtor" },
      { name: "debtorAddress",      label: "Debtor — Street Address",     type: "text", required: true, placeholder: "Street address"           },
      { name: "debtorCityStateZip", label: "Debtor — City / State / ZIP", type: "text", required: true, placeholder: "City, State, ZIP"         },
    ],
  },
  {
    label: "Step 3: Secured Party",
    fields: [
      { name: "securedPartyName",         label: "Secured Party — Full Legal Name",    type: "text", required: true, placeholder: "Full legal name of Secured Party" },
      { name: "securedPartyAddress",      label: "Secured Party — Street Address",     type: "text", required: true, placeholder: "Street address"                   },
      { name: "securedPartyCityStateZip", label: "Secured Party — City / State / ZIP", type: "text", required: true, placeholder: "City, State, ZIP"                 },
    ],
  },
  {
    label: "Step 4: Promissory Note & Collateral",
    fields: [
      { name: "principalAmount",       label: "Promissory Note — Principal Amount ($)", type: "text",     required: true, placeholder: "e.g. $10,000.00" },
      { name: "collateralDescription", label: "Collateral — Property Description",      type: "textarea", required: true, placeholder: "Describe the collateral in detail" },
      { name: "collateralLocation",    label: "Collateral — Location",                  type: "text",     required: true, placeholder: "Full address where collateral is located" },
    ],
  },
  {
    label: "Step 5: Debtor Covenants & Insurance",
    fields: [
      {
        name: "collateralRemovalAllowed",
        label: "May the Debtor remove collateral from premises?",
        type: "select",
        required: true,
        options: [
          { value: "no",             label: "No — prior written consent required" },
          { value: "ordinaryCourse", label: "Yes — in the ordinary course of business only" },
          { value: "yes",            label: "Yes — freely removable" },
        ],
      },
      { name: "insuranceRequirements", label: "Insurance requirements for collateral", type: "text", required: false, placeholder: "e.g., fire, theft; minimum coverage $50,000" },
    ],
  },
  {
    label: "Step 6: Notices",
    fields: [
      { name: "noticeAddressDebtor",       label: "Notice Address — Debtor",        type: "text", required: true, placeholder: "Full address for notices to Debtor"        },
      { name: "noticeAddressSecuredParty", label: "Notice Address — Secured Party", type: "text", required: true, placeholder: "Full address for notices to Secured Party" },
    ],
  },
  {
    label: "Step 7: Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Which country's laws will govern this document?",
        type: "select",
        required: true,
        options: [
          { value: "us",    label: "United States" },
          { value: "ca",    label: "Canada" },
          { value: "uk",    label: "United Kingdom" },
          { value: "au",    label: "Australia" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    label: "Step 8: State / Province",
    fields: [
      {
        name: "state",
        label: "Which state or province?",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values: Record<string, string>) => {
          if (values.country === "us") {
            return [
              { value: "Alabama", label: "Alabama" }, { value: "Alaska", label: "Alaska" },
              { value: "Arizona", label: "Arizona" }, { value: "Arkansas", label: "Arkansas" },
              { value: "California", label: "California" }, { value: "Colorado", label: "Colorado" },
              { value: "Connecticut", label: "Connecticut" }, { value: "Delaware", label: "Delaware" },
              { value: "Florida", label: "Florida" }, { value: "Georgia", label: "Georgia" },
              { value: "Hawaii", label: "Hawaii" }, { value: "Idaho", label: "Idaho" },
              { value: "Illinois", label: "Illinois" }, { value: "Indiana", label: "Indiana" },
              { value: "Iowa", label: "Iowa" }, { value: "Kansas", label: "Kansas" },
              { value: "Kentucky", label: "Kentucky" }, { value: "Louisiana", label: "Louisiana" },
              { value: "Maine", label: "Maine" }, { value: "Maryland", label: "Maryland" },
              { value: "Massachusetts", label: "Massachusetts" }, { value: "Michigan", label: "Michigan" },
              { value: "Minnesota", label: "Minnesota" }, { value: "Mississippi", label: "Mississippi" },
              { value: "Missouri", label: "Missouri" }, { value: "Montana", label: "Montana" },
              { value: "Nebraska", label: "Nebraska" }, { value: "Nevada", label: "Nevada" },
              { value: "New Hampshire", label: "New Hampshire" }, { value: "New Jersey", label: "New Jersey" },
              { value: "New Mexico", label: "New Mexico" }, { value: "New York", label: "New York" },
              { value: "North Carolina", label: "North Carolina" }, { value: "North Dakota", label: "North Dakota" },
              { value: "Ohio", label: "Ohio" }, { value: "Oklahoma", label: "Oklahoma" },
              { value: "Oregon", label: "Oregon" }, { value: "Pennsylvania", label: "Pennsylvania" },
              { value: "Rhode Island", label: "Rhode Island" }, { value: "South Carolina", label: "South Carolina" },
              { value: "South Dakota", label: "South Dakota" }, { value: "Tennessee", label: "Tennessee" },
              { value: "Texas", label: "Texas" }, { value: "Utah", label: "Utah" },
              { value: "Vermont", label: "Vermont" }, { value: "Virginia", label: "Virginia" },
              { value: "Washington", label: "Washington" }, { value: "West Virginia", label: "West Virginia" },
              { value: "Wisconsin", label: "Wisconsin" }, { value: "Wyoming", label: "Wyoming" },
              { value: "District of Columbia", label: "District of Columbia" },
            ];
          } else if (values.country === "ca") {
            return [
              { value: "Alberta", label: "Alberta" }, { value: "British Columbia", label: "British Columbia" },
              { value: "Manitoba", label: "Manitoba" }, { value: "New Brunswick", label: "New Brunswick" },
              { value: "Newfoundland and Labrador", label: "Newfoundland and Labrador" }, { value: "Nova Scotia", label: "Nova Scotia" },
              { value: "Ontario", label: "Ontario" }, { value: "Prince Edward Island", label: "Prince Edward Island" },
              { value: "Quebec", label: "Quebec" }, { value: "Saskatchewan", label: "Saskatchewan" },
              { value: "Northwest Territories", label: "Northwest Territories" }, { value: "Nunavut", label: "Nunavut" },
              { value: "Yukon", label: "Yukon" },
            ];
          } else if (values.country === "uk") {
            return [
              { value: "England", label: "England" }, { value: "Scotland", label: "Scotland" },
              { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" },
            ];
          } else if (values.country === "au") {
            return [
              { value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" },
              { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" },
              { value: "South Australia", label: "South Australia" }, { value: "Tasmania", label: "Tasmania" },
              { value: "Australian Capital Territory", label: "Australian Capital Territory" }, { value: "Northern Territory", label: "Northern Territory" },
            ];
          }
          return [{ value: "Other", label: "Other Region" }];
        },
      },
      {
        name: "governingLawCustom",
        label: "Full governing jurisdiction (if 'Other' country or to specify further)",
        type: "text",
        required: false,
        placeholder: "e.g., Province of Ontario, State of Texas",
      },
    ],
  },
  {
    label: "Step 9: Signatures",
    fields: [
      { name: "debtorSigner",    label: "Debtor — Full Legal Name (for signature)",        type: "text", required: true,  placeholder: "Full legal name" },
      { name: "debtorSignDate",  label: "Debtor — Date",                                   type: "date", required: true  },
      { name: "securedSigner",   label: "Secured Party — Full Legal Name (for signature)", type: "text", required: true,  placeholder: "Full legal name" },
      { name: "securedSignDate", label: "Secured Party — Date",                            type: "date", required: true  },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc   = new jsPDF({ unit: "mm", format: "a4" });
  const w     = 210;
  const m     = 18;
  const tw    = w - m * 2;
  const lh    = 6;
  const limit = 275;
  let y = 20;

  const newPageIfNeeded = (need: number) => {
    if (y + need > limit) { doc.addPage(); y = 20; }
  };

  const val = (key: string, fallback = "___") =>
    (v[key] || "").trim() || fallback;

  const p = (text: string, bold = false, gap = 2.5) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const bullet = (text: string, gap = 2.2) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const bulletIndent = 5;
    const textIndent   = 10;
    const lines = doc.splitTextToSize(text, tw - textIndent);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text("\u2022", m + bulletIndent, y);
    lines.forEach((line: string, i: number) => {
      newPageIfNeeded(lh);
      doc.text(line, m + textIndent, y);
      if (i < lines.length - 1) y += lh;
    });
    y += lh + gap;
  };

  const heading = (text: string, gapBefore = 2, gapAfter = 2) => {
    y += gapBefore;
    newPageIfNeeded(lh + gapAfter + 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    doc.text(lines, m, y);
    y += lines.length * lh + gapAfter;
  };

  const uf = (label: string, value: string | undefined, lineChars = 38, gap = 2.2) => {
    newPageIfNeeded(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lt  = `${label}: `;
    doc.text(lt, m, y);
    const x      = m + doc.getTextWidth(lt);
    const shown  = (value || "").trim();
    const minLen = doc.getTextWidth("_".repeat(lineChars));
    doc.setLineWidth(0.22);
    if (shown) {
      const maxVal = tw - doc.getTextWidth(lt);
      if (doc.getTextWidth(shown) > maxVal) {
        y += lh;
        newPageIfNeeded(lh + gap);
        doc.text(shown, m + 4, y);
        doc.line(m + 4, y + 1.2, m + 4 + doc.getTextWidth(shown), y + 1.2);
      } else {
        doc.text(shown, x, y);
        doc.line(x, y + 1.2, x + Math.max(minLen, doc.getTextWidth(shown)), y + 1.2);
      }
    } else {
      doc.line(x, y + 1.2, x + minLen, y + 1.2);
    }
    y += lh + gap;
  };

  // Resolve governing law
  const stateVal = v.state || "";
  const governingLawFull = v.governingLawCustom
    ? v.governingLawCustom
    : stateVal || "___";

  const debtorFull  = val("debtorName");
  const debtorLoc   = `${val("debtorAddress")}, ${val("debtorCityStateZip")}`;
  const securedFull = val("securedPartyName");
  const securedLoc  = `${val("securedPartyAddress")}, ${val("securedPartyCityStateZip")}`;
  const agreementDate = `${val("agreementDay", "___")} day of ${val("agreementMonth", "_______________")}, ${val("agreementYear", "______")}`;

  // ── Title ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const title = "SECURITY AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  y += 12;

  // ── Opening Paragraph ──
  p(
    `This Security Agreement (the "Agreement") is made and entered into as of ${agreementDate} (the "Effective Date"), ` +
    `by and between ${debtorFull}, of ${debtorLoc} (the "Debtor"), ` +
    `and ${securedFull}, of ${securedLoc} (the "Secured Party"). ` +
    `The Debtor and the Secured Party may hereinafter be referred to individually as a "Party" and collectively as the "Parties."`
  );

  // ── 1. Creation of Security Interest ──
  heading("1. Creation of Security Interest");
  p("The Secured Party is hereby granted a security interest to secure:");
  p(
    `(a) the due and punctual payment and performance of that certain promissory note ` +
    `executed by the Debtor in favor of the Secured Party in the principal amount of $${val("principalAmount", "___")} (the "Note"); and`
  );
  p(
    `(b) the payment and performance of any and all other present or future obligations, liabilities, and indebtedness of the Debtor to the Secured Party, ` +
    `whether direct or indirect, absolute or contingent, now existing or hereafter arising (collectively, the "Secured Obligations").`
  );
  p(
    `To secure the Secured Obligations, the Debtor hereby grants to the Secured Party a continuing security interest in the Collateral (as defined below).`
  );

  // ── 2. Collateral ──
  heading("2. Collateral");
  p(`The collateral subject to this Agreement (the "Collateral") consists of the following:`);
  bullet(`Property Description: ${val("collateralDescription", "___")}`);
  bullet(`Location: ${val("collateralLocation", "___")}`);
  p(
    `The term "Collateral" shall include all additions, replacements, substitutions, and proceeds thereof, whether now owned or hereafter acquired.`
  );

  // ── 3. Grant of Security Interest ──
  heading("3. Grant of Security Interest");
  p(
    `The Debtor hereby grants to the Secured Party a continuing, first-priority (subject to applicable law) security interest in and to the Collateral, ` +
    `whether presently owned or hereafter acquired, and wherever located, including at the premises identified above.`
  );

  // ── 4. Representations, Warranties, and Covenants ──
  heading("4. Representations, Warranties, and Covenants");
  p("The Debtor hereby represents, warrants, and covenants as follows:");

  p("(a) The Debtor shall duly and timely pay all amounts owing under the Note and all Secured Obligations.");

  const removalText = v.collateralRemovalAllowed === "ordinaryCourse"
    ? "(b) The Collateral shall not be removed from its stated location except in the ordinary course of business without the prior written consent of the Secured Party."
    : v.collateralRemovalAllowed === "yes"
      ? "(b) The Collateral may be removed from its stated location by the Debtor without prior consent of the Secured Party."
      : "(b) The Collateral shall not be removed from its stated location except in the ordinary course of business without the prior written consent of the Secured Party.";
  p(removalText);

  p("(c) The Debtor shall promptly notify the Secured Party in writing of any change in its address or principal place of business.");
  p("(d) The Debtor shall not sell, assign, lease, transfer, or otherwise dispose of any Collateral without the prior written consent of the Secured Party.");
  p("(e) The Debtor shall keep the Collateral free and clear of all liens, claims, taxes, and encumbrances, except those permitted by the Secured Party.");
  p(
    `(f) The Debtor shall maintain adequate insurance coverage on the Collateral against loss or damage, including but not limited to fire, theft, and other customary risks` +
    (v.insuranceRequirements ? ` (${v.insuranceRequirements})` : "") +
    `, with policies acceptable to the Secured Party.`
  );
  p("(g) The Debtor shall maintain the Collateral in good working order and condition, reasonable wear and tear excepted, and shall make all necessary repairs and replacements.");

  // ── 5. Events of Default ──
  heading("5. Events of Default");
  p("The occurrence of any of the following shall constitute an \"Event of Default\":");
  p("(a) Failure by the Debtor to perform or comply with any obligation under this Agreement or the Note; or");
  p("(b) Any breach of the representations or warranties contained herein.");

  // ── 6. Remedies Upon Default ──
  heading("6. Remedies Upon Default");
  p("Upon the occurrence of an Event of Default, the Secured Party shall have the right, at its option and without further notice:");
  p("(a) to declare all Secured Obligations immediately due and payable; and");
  p("(b) to exercise any and all rights and remedies available under applicable law, including, without limitation, those provided under secured transactions law.");

  // ── 7. Waiver ──
  heading("7. Waiver");
  p(
    "The failure or delay of either Party at any time to enforce any provision of this Agreement shall not constitute a waiver of such provision or of the right thereafter to enforce the same or any other provision."
  );

  // ── 8. Notices ──
  heading("8. Notices");
  p("All notices, requests, demands, or other communications under this Agreement shall:");
  bullet("be in writing; and");
  bullet("be delivered personally or sent by registered or certified mail (postage prepaid, return receipt requested).");
  p("Notices shall be deemed effective:");
  bullet("upon actual delivery if delivered personally; or");
  bullet("upon mailing if sent by registered or certified mail.");
  p("Addresses for Notice:");
  bullet(`Debtor: ${val("noticeAddressDebtor", "___")}`);
  bullet(`Secured Party: ${val("noticeAddressSecuredParty", "___")}`);
  p("Either Party may change its address by providing written notice to the other Party.");

  // ── 9. Successors and Assigns ──
  heading("9. Successors and Assigns");
  p("This Agreement shall be binding upon and inure to the benefit of the Parties and their respective successors and permitted assigns.");

  // ── 10. Severability ──
  heading("10. Severability");
  p(
    "If any provision of this Agreement is determined to be invalid, illegal, or unenforceable, such provision shall be modified to the minimum extent necessary to render it enforceable, " +
    "and the remaining provisions shall continue in full force and effect."
  );

  // ── 11. Entire Agreement ──
  heading("11. Entire Agreement");
  p(
    "This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior and contemporaneous agreements, " +
    "negotiations, and understandings, whether written or oral."
  );

  // ── 12. Amendments ──
  heading("12. Amendments");
  p("This Agreement may be amended, modified, or supplemented only by a written instrument duly executed by both Parties.");

  // ── 13. Attorneys' Fees ──
  heading("13. Attorneys' Fees");
  p(
    "In the event of any dispute, claim, or legal proceeding arising out of or relating to this Agreement, the prevailing Party shall be entitled to recover its reasonable attorneys' fees and costs."
  );

  // ── 14. Governing Law ──
  heading("14. Governing Law");
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of ${governingLawFull}.`
  );

  // ── 15. Execution / Signatures ──
  heading("15. Execution");
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", true);
  y += 4;

  // Debtor signature block
  p("DEBTOR (Borrower):", true);
  uf("Signature", undefined, 28);
  uf("Name", v.debtorSigner, 28);
  uf("Date", v.debtorSignDate, 18);
  y += 2;

  // Separator line (as in draft)
  newPageIfNeeded(4);
  doc.setLineWidth(0.3);
  doc.line(m, y, w - m, y);
  y += 6;

  // Secured Party signature block
  p("SECURED PARTY (Lender):", true);
  uf("Signature", undefined, 28);
  uf("Name", v.securedSigner, 28);
  uf("Date", v.securedSignDate, 18);

  doc.save("security_agreement.pdf");
};

export default function SecurityAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Security Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="securityagreement"
    />
  );
}
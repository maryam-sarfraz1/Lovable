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
        getOptions: (value) => {
          if (value === "us") {
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
    label: "Declarant (Principal)",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the Declarant (Principal)?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1DateOfBirth",
        label: "Date of Birth",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Declarant Address",
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
    label: "Declarant Contact",
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
    label: "Terminal Illness Elections",
    fields: [
      {
        name: "lifeSustainingTerminal",
        label: "1. Do you request the administration of life-sustaining treatment if you are terminally ill or injured?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes – Administer life-sustaining treatment" },
          { value: "no", label: "No – Do not administer life-sustaining treatment" },
        ],
      },
    ],
  },
  {
    label: "Nutrition & Hydration Elections",
    fields: [
      {
        name: "artificialNutritionTerminal",
        label: "2. Do you request artificially provided nutrition and hydration if you are terminally ill?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes – Provide artificial nutrition and hydration" },
          { value: "no", label: "No – Do not provide artificial nutrition and hydration" },
        ],
      },
      {
        name: "nutritionConsultPerson",
        label: "Name of person your physician may consult regarding nutrition/hydration decisions",
        type: "text",
        required: false,
        placeholder: "Full name of person to consult",
      },
    ],
  },
  {
    label: "Permanent Unconsciousness Elections",
    fields: [
      {
        name: "lifeSustainingUnconscious",
        label: "3. Do you request life-sustaining treatment if you are permanently unconscious?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes – Administer life-sustaining treatment" },
          { value: "no", label: "No – Do not administer life-sustaining treatment" },
        ],
      },
      {
        name: "artificialNutritionUnconscious",
        label: "Do you request artificially provided nutrition and hydration if permanently unconscious?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes – Provide artificial nutrition and hydration" },
          { value: "no", label: "No – Do not provide artificial nutrition and hydration" },
        ],
      },
    ],
  },
  {
    label: "Additional Instructions",
    fields: [
      {
        name: "additionalInstructions",
        label: "4. Any additional instructions or special directions? (Leave blank if none)",
        type: "textarea",
        required: false,
        placeholder: "Enter any additional instructions. If none, leave blank.",
      },
    ],
  },
  {
    label: "Health Care Proxy",
    fields: [
      {
        name: "appointProxy",
        label: "Do you wish to appoint a Health Care Proxy?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes – I appoint a health care proxy" },
          { value: "no", label: "No – I do not appoint a health care proxy" },
        ],
      },
    ],
  },
  {
    label: "Primary Proxy Details",
    fields: [
      {
        name: "proxy1Name",
        label: "Primary Proxy Full Name",
        type: "text",
        required: false,
        placeholder: "Full legal name of primary proxy",
      },
      {
        name: "proxy1Address",
        label: "Primary Proxy Address",
        type: "text",
        required: false,
        placeholder: "Street address",
      },
      {
        name: "proxy1CityStateZip",
        label: "Primary Proxy City/State/ZIP",
        type: "text",
        required: false,
        placeholder: "City, State, ZIP",
      },
      {
        name: "proxy1Phone",
        label: "Primary Proxy Phone Number",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Alternate Proxy Details",
    fields: [
      {
        name: "proxy2Name",
        label: "Alternate Proxy Full Name (if primary is unavailable)",
        type: "text",
        required: false,
        placeholder: "Full legal name of alternate proxy",
      },
      {
        name: "proxy2Address",
        label: "Alternate Proxy Address",
        type: "text",
        required: false,
        placeholder: "Street address",
      },
      {
        name: "proxy2CityStateZip",
        label: "Alternate Proxy City/State/ZIP",
        type: "text",
        required: false,
        placeholder: "City, State, ZIP",
      },
      {
        name: "proxy2Phone",
        label: "Alternate Proxy Phone Number",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Proxy Authority",
    fields: [
      {
        name: "proxyNutritionAuth",
        label: "Do you authorize your health care proxy to make decisions regarding artificially provided nutrition and hydration?",
        type: "select",
        required: false,
        options: [
          { value: "yes", label: "Yes – Authorize proxy for nutrition/hydration decisions" },
          { value: "no", label: "No – Do not authorize proxy for nutrition/hydration decisions" },
        ],
      },
      {
        name: "proxyScope",
        label: "Scope of proxy authority:",
        type: "select",
        required: false,
        options: [
          { value: "strict", label: "Proxy shall strictly follow instructions in this document" },
          { value: "flexible", label: "Proxy shall follow instructions and may decide on matters not addressed herein" },
          { value: "full", label: "Proxy has full discretion, even if decisions differ from instructions herein" },
        ],
      },
    ],
  },
  {
    label: "Consulting Persons",
    fields: [
      {
        name: "consultingPersons",
        label: "Names of persons your physician shall consult when considering withdrawal/withholding of treatment (if any)",
        type: "textarea",
        required: false,
        placeholder: "Enter names separated by commas, or leave blank",
      },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      {
        name: "party1Signature",
        label: "Declarant/Principal Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "witness1Name",
        label: "First Witness Full Name",
        type: "text",
        required: true,
        placeholder: "First witness full legal name",
      },
      {
        name: "witness1Address",
        label: "First Witness Address",
        type: "text",
        required: true,
        placeholder: "First witness address",
      },
      {
        name: "witness2Name",
        label: "Second Witness Full Name",
        type: "text",
        required: true,
        placeholder: "Second witness full legal name",
      },
      {
        name: "witness2Address",
        label: "Second Witness Address",
        type: "text",
        required: true,
        placeholder: "Second witness address",
      },
      {
        name: "proxyAcceptanceName",
        label: "Health Care Proxy Acceptance – Proxy's Full Name (if applicable)",
        type: "text",
        required: false,
        placeholder: "Proxy's full name for acceptance signature",
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

  const para = (text: string, extraGap = 3) => {
    checkPage(14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentWidth);
    // check page for all lines
    if (y + lines.length * 5 + extraGap > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(lines, margin, y);
    y += lines.length * 5 + extraGap;
  };

  const sectionHeader = (text: string) => {
    checkPage(12);
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(text, margin, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  };

  const subHeader = (text: string) => {
    checkPage(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(text, margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
  };

  const fieldLine = (label: string, value: string, minW = 60) => {
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

  const electionLine = (label: string, yes: boolean) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const yesBox = yes ? "[X]" : "[ ]";
    const noBox = yes ? "[ ]" : "[X]";
    const lines = doc.splitTextToSize(label, contentWidth - 30);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 1;
    doc.text(`${yesBox} Yes   ${noBox} No`, margin + 5, y);
    y += 7;
  };

  const sigLine = (label: string, value: string) => {
    checkPage(14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(label, margin, y);
    y += 7;
    const val = value || "________________________";
    doc.setFont("helvetica", "italic");
    doc.text(val, margin, y);
    doc.setLineWidth(0.4);
    doc.line(margin, y + 1.5, margin + Math.max(doc.getTextWidth(val) + 5, 80), y + 1.5);
    doc.setFont("helvetica", "normal");
    y += 8;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "LIVING WILL AND HEALTH CARE PROXY";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const stateLabel = values.state ? `State of ${values.state} (USA)` : "State of _________ (USA)";
  doc.text(
    `This document is intended for use within the ${stateLabel} to formally record an individual's wishes`,
    pageWidth / 2, y, { align: "center" }
  );
  y += 5;
  doc.text(
    "concerning medical treatment and health care decisions in circumstances where the individual is",
    pageWidth / 2, y, { align: "center" }
  );
  y += 5;
  doc.text("no longer capable of communicating such decisions.", pageWidth / 2, y, { align: "center" });
  y += 5;
  doc.text(
    "Execution of this document is voluntary. If executed, the principal is advised to inform their physician,",
    pageWidth / 2, y, { align: "center" }
  );
  y += 5;
  doc.text("family members, and trusted persons of its existence and location.", pageWidth / 2, y, { align: "center" });
  y += 10;

  // ── SECTION I ──────────────────────────────────────────────────────────────
  sectionHeader("I. DECLARATION OF LIVING WILL");

  para(
    `I, ${values.party1Name || "____________________"}, being of sound mind and at least nineteen (19) years of age, hereby make, declare, and publish this Living Will, directing that my family members, physicians, health care providers, and all other relevant persons comply with the instructions set forth herein.`
  );
  para(
    "I acknowledge that I may revoke or amend this Living Will at any time by executing a subsequent written document or by destroying this document and communicating my intent to revoke to another individual of at least nineteen (19) years of age."
  );
  para(
    "This Living Will shall become operative only in the event that I am unable to communicate my health care decisions."
  );

  // 1. Terminal Illness
  subHeader("1. TERMINAL ILLNESS OR INJURY");
  para(
    'For the purposes of this document, a "terminal illness or injury" refers to a condition certified by my attending physician and one additional physician as incurable and likely to result in death within the foreseeable future.'
  );
  para(
    '"Life-sustaining treatment" includes any medical intervention, procedure, or device intended to prolong life without curing the underlying condition. I understand that refusal of such treatment does not preclude the provision of palliative care or measures necessary for comfort and pain relief.'
  );
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("Election (Initial One):", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  electionLine(
    "I request the administration of life-sustaining treatment if I am terminally ill or injured:",
    values.lifeSustainingTerminal === "yes"
  );

  // 2. Nutrition
  subHeader("2. ARTIFICIALLY PROVIDED NUTRITION AND HYDRATION");
  para(
    "I understand that, in the event of a terminal condition, I may require nutrition and hydration administered through artificial means, including but not limited to feeding tubes or intravenous methods."
  );
  if (values.nutritionConsultPerson) {
    para(
      `My physician is authorized to consult with ${values.nutritionConsultPerson} regarding decisions to withhold or withdraw such measures.`
    );
  } else {
    para(
      "My physician is authorized to consult with ____________________ regarding decisions to withhold or withdraw such measures."
    );
  }
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("Election (Initial One):", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  electionLine(
    "I request artificially provided nutrition and hydration under such circumstances:",
    values.artificialNutritionTerminal === "yes"
  );

  // 3. Permanent Unconsciousness
  subHeader("3. PERMANENT UNCONSCIOUSNESS");
  para(
    '"Permanent unconsciousness" refers to a condition, as determined by my physician and a second qualified physician, in which I lack awareness, cognition, and the ability to experience sensation, and for which there is no reasonable expectation of recovery.'
  );
  para(
    "I acknowledge that life-sustaining treatment may prolong biological life without restoring consciousness and that palliative care will be provided irrespective of my election."
  );
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("Election (Initial One):", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  electionLine(
    "I request life-sustaining treatment if I am permanently unconscious:",
    values.lifeSustainingUnconscious === "yes"
  );
  para(
    "I further acknowledge that artificial nutrition and hydration may be required under such circumstances."
  );
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("Election (Initial One):", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  electionLine(
    "I request artificially provided nutrition and hydration if I am permanently unconscious:",
    values.artificialNutritionUnconscious === "yes"
  );

  // 4. Additional Instructions
  subHeader("4. ADDITIONAL INSTRUCTIONS");
  para(
    "In addition to the provisions set forth above, I direct as follows:"
  );
  if (values.additionalInstructions?.trim()) {
    para(values.additionalInstructions.trim());
  } else {
    para("[No additional instructions provided.]");
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.text("[ ] I have no additional instructions.", margin + 5, y);
    y += 8;
  }

  // ── SECTION II ─────────────────────────────────────────────────────────────
  sectionHeader("II. APPOINTMENT OF HEALTH CARE PROXY");
  para(
    "This document may also serve to appoint a health care proxy (agent) to make medical decisions on my behalf in the event of my incapacity."
  );

  subHeader("1. DESIGNATION");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("Election (Initial One):", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  const appointYes = values.appointProxy === "yes";
  doc.text(`${appointYes ? "[ ]" : "[X]"} I do not appoint a health care proxy.`, margin + 5, y);
  y += 6;
  doc.text("OR", margin + 5, y);
  y += 6;
  doc.text(`${appointYes ? "[X]" : "[ ]"} I appoint the following individual as my health care proxy:`, margin + 5, y);
  y += 8;

  if (appointYes) {
    doc.setFont("helvetica", "bold");
    doc.text("Primary Proxy:", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    fieldLine("Name: ", values.proxy1Name || "");
    fieldLine("Address: ", values.proxy1Address || "");
    fieldLine("City/State/ZIP: ", values.proxy1CityStateZip || "");
    fieldLine("Phone Number: ", values.proxy1Phone || "");
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.text("Alternate Proxy (if primary is unavailable):", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    fieldLine("Name: ", values.proxy2Name || "");
    fieldLine("Address: ", values.proxy2Address || "");
    fieldLine("City/State/ZIP: ", values.proxy2CityStateZip || "");
    fieldLine("Phone Number: ", values.proxy2Phone || "");
  } else {
    fieldLine("Name: ", "");
    fieldLine("Address: ", "");
    fieldLine("City/State/ZIP: ", "");
    fieldLine("Phone Number: ", "");
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.text("Alternate Proxy (if primary is unavailable):", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    fieldLine("Name: ", "");
    fieldLine("Address: ", "");
    fieldLine("City/State/ZIP: ", "");
    fieldLine("Phone Number: ", "");
  }

  para(
    "Note: A health care provider or a non-relative employee thereof may not serve as proxy."
  );

  subHeader("2. AUTHORITY AND INSTRUCTIONS TO PROXY");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("Election (Initial One):", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  electionLine(
    "I authorize my health care proxy to make decisions regarding artificially provided nutrition and hydration:",
    values.proxyNutritionAuth === "yes"
  );

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("Scope of Authority (Initial One):", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");

  const scopeMap: Record<string, string> = {
    strict: "My proxy shall strictly follow the instructions contained in this document.",
    flexible: "My proxy shall follow these instructions and may make additional decisions on matters not addressed herein.",
    full: "My proxy shall have full discretion to make final decisions, even if such decisions differ from the instructions stated herein.",
  };
  const selectedScope = values.proxyScope || "";
  ["strict", "flexible", "full"].forEach((key) => {
    checkPage(8);
    const tick = selectedScope === key ? "[X]" : "[ ]";
    const lines = doc.splitTextToSize(`${tick} ${scopeMap[key]}`, contentWidth - 10);
    doc.text(lines, margin + 5, y);
    y += lines.length * 5 + 4;
  });

  // ── SECTION III ────────────────────────────────────────────────────────────
  sectionHeader("III. GENERAL PROVISIONS");
  para(
    "I acknowledge and understand the following:"
  );

  const provisions = [
    "If a physician or health care facility declines to comply with this Living Will, arrangements must be made to transfer me to a provider willing to honor my directives.",
    "If I am pregnant at the time this document would otherwise become effective, these directives shall not be implemented until after the birth of the child.",
    `In circumstances involving withdrawal or withholding of life-sustaining treatment or artificial nutrition and hydration, my physician shall consult with my proxy (if appointed) and the following individuals: ${values.consultingPersons || "____________________"}`,
  ];
  provisions.forEach((p, i) => {
    checkPage(14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(`${i + 1}. ${p}`, contentWidth);
    if (y + lines.length * 5 + 4 > pageHeight - margin) { doc.addPage(); y = margin; }
    doc.text(lines, margin, y);
    y += lines.length * 5 + 4;
  });

  // ── SECTION IV ─────────────────────────────────────────────────────────────
  sectionHeader("IV. SEVERABILITY");
  para(
    "If any provision of this document is determined to be invalid or unenforceable, such determination shall not affect the validity of the remaining provisions, which shall continue in full force and effect."
  );

  // ── SECTION V – SIGNATURE OF PRINCIPAL ────────────────────────────────────
  sectionHeader("V. SIGNATURE OF PRINCIPAL");
  checkPage(40);
  fieldLine("Name: ", values.party1Name || "");
  fieldLine("Address: ", [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", "));
  fieldLine("Date of Birth: ", values.party1DateOfBirth || "");
  sigLine("Signature:", values.party1Signature || "");
  fieldLine("Date: ", values.effectiveDate || new Date().toLocaleDateString());

  // ── SECTION VI – WITNESSES ─────────────────────────────────────────────────
  sectionHeader("VI. WITNESSES");
  para(
    "We, the undersigned, certify that the principal appears to be of sound mind and under no duress, fraud, or undue influence. We are not related to the principal by blood, marriage, or adoption, are not entitled to any portion of the principal's estate, and are not designated as health care proxy."
  );

  checkPage(40);
  doc.setFont("helvetica", "bold");
  doc.text("First Witness:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  fieldLine("Name: ", values.witness1Name || "");
  fieldLine("Address: ", values.witness1Address || "");
  sigLine("Signature:", "");
  fieldLine("Date: ", new Date().toLocaleDateString());

  y += 3;
  doc.setFont("helvetica", "bold");
  doc.text("Second Witness:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  fieldLine("Name: ", values.witness2Name || "");
  fieldLine("Address: ", values.witness2Address || "");
  sigLine("Signature:", "");
  fieldLine("Date: ", new Date().toLocaleDateString());

  // ── SECTION VII – PROXY ACCEPTANCE ────────────────────────────────────────
  sectionHeader("VII. ACCEPTANCE BY HEALTH CARE PROXY");
  const proxyAcceptName = values.proxyAcceptanceName || values.proxy1Name || "____________________";
  para(
    `I, ${proxyAcceptName}, hereby accept the appointment as health care proxy and agree to act in accordance with the principal's wishes as expressed in this document.`
  );
  checkPage(20);
  sigLine("Signature:", "");
  fieldLine("Date: ", new Date().toLocaleDateString());

  doc.save("living_will.pdf");
};

export default function LivingWill() {
  return (
    <FormWizard
      steps={steps}
      title="Living Will"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="livingwill"
    />
  );
}
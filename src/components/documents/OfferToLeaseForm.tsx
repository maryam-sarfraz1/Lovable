import { useState, useEffect } from "react";

const loadJsPDF = () =>
  new Promise((resolve, reject) => {
    if (window.jspdf) return resolve(window.jspdf.jsPDF);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => resolve(window.jspdf.jsPDF);
    script.onerror = reject;
    document.head.appendChild(script);
  });

// ── Types & Steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    label: "Parties",
    fields: [
      { name: "offerDate", label: "Offer Date", type: "date", required: true },
      { name: "tenantName", label: "Tenant Name", type: "text", required: true, placeholder: "Full legal name of tenant" },
      { name: "tenantStreet", label: "Tenant Street Address", type: "text", required: true, placeholder: "Street" },
      { name: "tenantCity", label: "Tenant City", type: "text", required: true, placeholder: "City" },
      { name: "tenantState", label: "Tenant State/Province", type: "text", required: true, placeholder: "State or Province" },
      { name: "tenantZip", label: "Tenant ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP / Postal Code" },
      { name: "landlordName", label: "Landlord Name", type: "text", required: true, placeholder: "Full legal name of landlord" },
      { name: "landlordStreet", label: "Landlord Street Address", type: "text", required: true, placeholder: "Street" },
      { name: "landlordCity", label: "Landlord City", type: "text", required: true, placeholder: "City" },
      { name: "landlordState", label: "Landlord State/Province", type: "text", required: true, placeholder: "State or Province" },
      { name: "landlordZip", label: "Landlord ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP / Postal Code" },
    ],
  },
  {
    label: "Premises & Term",
    fields: [
      { name: "premisesAddress", label: "Premises Address", type: "text", required: true, placeholder: "Street address of leased premises" },
      { name: "premisesCity", label: "Premises City", type: "text", required: true, placeholder: "City" },
      { name: "premisesState", label: "Premises State/Province", type: "text", required: true, placeholder: "State or Province" },
      { name: "premisesDescription", label: "Description of Premises", type: "textarea", required: true, placeholder: "Describe the space, floor, unit, square footage, improvements, etc." },
      { name: "termStart", label: "Lease Term Commencement Date", type: "date", required: true },
      { name: "termEnd", label: "Lease Term Expiry Date", type: "date", required: true },
    ],
  },
  {
    label: "Rent & Deposit",
    fields: [
      { name: "baseRent", label: "Monthly Base Rent ($)", type: "text", required: true, placeholder: "e.g. 2500.00" },
      { name: "securityDeposit", label: "Security Deposit ($)", type: "text", required: true, placeholder: "e.g. 5000.00" },
    ],
  },
  {
    label: "Use & Conditions",
    fields: [
      { name: "permittedUse", label: "Permitted Use of Premises", type: "text", required: true, placeholder: "e.g. retail clothing store, office space, restaurant" },
      { name: "formalLeaseConditions", label: "Conditions Before Tenant Must Execute Formal Lease", type: "textarea", required: true, placeholder: "List any conditions that must be satisfied before the Tenant is obligated to sign the formal lease" },
      { name: "alterationsAllowed", label: "Alterations/Improvements Allowed (with Landlord consent)?", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
      { name: "sublettingAllowed", label: "Assignment / Subletting Allowed (with Landlord consent)?", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    ],
  },
  {
    label: "Irrevocability",
    fields: [
      { name: "irrevocableTime", label: "Irrevocable Until (Time)", type: "text", required: true, placeholder: "e.g. 5:00 PM" },
      { name: "irrevocableDate", label: "Irrevocable Until (Date)", type: "date", required: true },
      { name: "signageAllowed", label: "Tenant Signage Rights Included?", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    ],
  },
  {
    label: "Signature",
    fields: [
      { name: "tenantSignature", label: "Tenant Signature (typed)", type: "text", required: true },
      { name: "tenantSignDate", label: "Tenant Signature Date", type: "date", required: true },
      { name: "finalConfirm", label: "Confirm final review", type: "select", required: true, options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    ],
  },
];

// ── PDF Generator ─────────────────────────────────────────────────────────────
const generatePDF = async (values) => {
  const JsPDF = await loadJsPDF();
  const doc = new JsPDF();
  const margin = 20;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 24;

  // ── Helpers ──
  const checkPage = (needed = 12) => {
    if (y + needed > pageHeight - 20) { doc.addPage(); y = 24; }
  };

  const addTitle = (text) => {
    checkPage(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, margin, y);
    y += lines.length * 7 + 6;
  };

  const addSectionHeading = (text) => {
    checkPage(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, margin, y);
    y += lines.length * 6 + 2;
  };

  const addBody = (text, extra = 5) => {
    checkPage(10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, width);
    if (y + lines.length * 5.2 > pageHeight - 20) { doc.addPage(); y = 24; }
    doc.text(lines, margin, y);
    y += lines.length * 5.2 + extra;
  };

  const addBoldInline = (boldText, normalText) => {
    checkPage(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const bLines = doc.splitTextToSize(boldText, width);
    doc.text(bLines, margin, y);
    y += bLines.length * 5.2;
    doc.setFont("helvetica", "normal");
    const nLines = doc.splitTextToSize(normalText, width);
    if (y + nLines.length * 5.2 > pageHeight - 20) { doc.addPage(); y = 24; }
    doc.text(nLines, margin, y);
    y += nLines.length * 5.2 + 4;
  };

  const gap = (px = 4) => { y += px; };

  const v = (field, fallback = "___") => values[field]?.trim() || fallback;

  // ── DOCUMENT TITLE ──
  addTitle("OFFER TO LEASE");
  gap(2);

  // ── PREAMBLE ──
  addBody(
    `This Offer to Lease (the "Offer") is made as of ${v("offerDate", "__________")} (the "Offer Date"), by`
  );
  gap(2);

  // Tenant block
  doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
  const tenantLine = doc.splitTextToSize(
    `${v("tenantName", "__________________________")}, having an address at`,
    width
  );
  doc.text(tenantLine, margin, y); y += tenantLine.length * 5.5;
  doc.setFont("helvetica", "normal");
  const tenantAddr = doc.splitTextToSize(
    `${v("tenantStreet")}, ${v("tenantCity")}, ${v("tenantState")}, ${v("tenantZip")} (the "Tenant"),`,
    width
  );
  doc.text(tenantAddr, margin, y); y += tenantAddr.length * 5.5 + 4;

  addBody("And");
  gap(2);

  // Landlord block
  doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
  const landlordLine = doc.splitTextToSize(
    `${v("landlordName", "__________________________")}, having an address at`,
    width
  );
  doc.text(landlordLine, margin, y); y += landlordLine.length * 5.5;
  doc.setFont("helvetica", "normal");
  const landlordAddr = doc.splitTextToSize(
    `${v("landlordStreet")}, ${v("landlordCity")}, ${v("landlordState")}, ${v("landlordZip")} (the "Landlord").`,
    width
  );
  doc.text(landlordAddr, margin, y); y += landlordAddr.length * 5.5 + 6;

  addBody(`The Tenant and the Landlord are hereinafter collectively referred to as the "Parties."`);
  gap(6);

  // ── RECITALS ──
  addSectionHeading("Recitals");
  addBody(
    "WHEREAS, the Landlord is the owner and/or authorized property manager of certain commercial real property available for lease; and"
  );
  addBody(
    `WHEREAS, the Tenant hereby offers to lease from the Landlord the commercial premises located at ` +
    `${v("premisesAddress")}, ${v("premisesCity")}, ${v("premisesState")} (the "Premises"), ` +
    `subject to the terms and conditions set forth herein.`
  );
  gap(3);
  addBody(
    `NOW, THEREFORE, in consideration of the foregoing recitals, which are incorporated herein by reference, ` +
    `and the mutual covenants and agreements contained herein, the Parties agree as follows:`
  );
  gap(6);

  // ── 1. DESCRIPTION OF PREMISES ──
  addSectionHeading("1. Description of Premises");
  addBody("The Premises shall consist of the following space and improvements:");
  addBody(v("premisesDescription", "__________________________") + ".");
  gap(5);

  // ── 2. TERM ──
  addSectionHeading("2. Term");
  addBody(
    `The term of the lease (the "Term") shall commence on ${v("termStart", "__________")} and shall expire on ` +
    `${v("termEnd", "__________")}, unless earlier terminated in accordance with the terms of the lease.`
  );
  gap(5);

  // ── 3. RENT ──
  addSectionHeading("3. Rent");
  addBody(
    `As consideration for leasing the Premises, the Tenant shall pay to the Landlord a monthly base rent ` +
    `(the "Base Rent") in the amount of $${v("baseRent", "__________")}, payable in advance on such dates ` +
    `and in such manner as shall be specified in the lease.`
  );
  gap(5);

  // ── 4. SIGNAGE ──
  addSectionHeading("4. Signage");
  if (values.signageAllowed === "yes") {
    addBody(
      `The Tenant shall have the right, at its sole cost and expense, to install, maintain, and display signage ` +
      `identifying the Tenant and its business operations on the Premises, subject to compliance with all applicable ` +
      `municipal by-laws, zoning regulations, and governmental requirements. Upon termination or expiration of the lease, ` +
      `the Tenant may remove such signage, provided that any damage caused by such removal shall be promptly repaired ` +
      `by the Tenant at its own expense.`
    );
  } else {
    addBody(
      `The Tenant shall not install, maintain, or display any signage on the Premises without the prior written ` +
      `consent of the Landlord.`
    );
  }
  gap(5);

  // ── 5. SEVERABILITY ──
  addSectionHeading("5. Severability");
  addBody(
    `If any provision of this Offer is held by a court of competent jurisdiction to be invalid or unenforceable, ` +
    `and such determination is final and non-appealable, such provision shall be severed, and the remaining provisions ` +
    `of this Offer shall remain in full force and effect and shall be construed so as to best give effect to the intent of the Parties.`
  );
  gap(5);

  // ── 6. BINDING EFFECT ──
  addSectionHeading("6. Binding Effect");
  addBody(
    `Upon written acceptance of this Offer by the Landlord, this Offer shall constitute a legally binding agreement ` +
    `between the Parties, enforceable in accordance with its terms.`
  );
  gap(5);

  // ── 7. IRREVOCABILITY ──
  addSectionHeading("7. Irrevocability");
  addBody(
    `This Offer shall be irrevocable until ${v("irrevocableTime", "____")} on ${v("irrevocableDate", "__________")}, ` +
    `after which time, if not accepted by the Landlord, it shall automatically lapse and become null and void ` +
    `without further action by either Party.`
  );
  gap(5);

  // ── 8. SECURITY DEPOSIT ──
  addSectionHeading("8. Security Deposit");
  addBody(
    `Upon execution of the formal lease, the Tenant shall pay to the Landlord a security deposit ` +
    `(the "Security Deposit") in the amount of $${v("securityDeposit", "__________")}. ` +
    `The Security Deposit shall be held by the Landlord in accordance with the lease and shall be refundable ` +
    `at the end of the tenancy, less any lawful deductions. The Security Deposit shall not be applied toward ` +
    `payment of Base Rent.`
  );
  gap(5);

  // ── 9. FORMAL LEASE ──
  addSectionHeading("9. Formal Lease");
  addBody(
    `A formal lease agreement shall be prepared by the Landlord and executed by both Parties promptly following ` +
    `acceptance of this Offer. The lease shall incorporate all material terms and conditions contained herein and ` +
    `shall be subject to the Tenant's approval and review by the Tenant's legal counsel. The Tenant shall not be ` +
    `obligated to execute the lease unless and until the following conditions have been satisfied:`
  );
  addBody(v("formalLeaseConditions", "__________________________") + ".");
  gap(5);

  // ── 10. USE OF PREMISES ──
  addSectionHeading("10. Use of Premises");
  addBody(
    `The Premises shall be used solely for ${v("permittedUse", "__________________________")} ` +
    `(the "Permitted Use") and for no other purpose without the prior written consent of the Landlord.`
  );
  gap(5);

  // ── 11. POSSESSION AND OCCUPANCY ──
  addSectionHeading("11. Possession and Occupancy");
  addBody(
    `The Landlord shall deliver vacant possession of the Premises to the Tenant on or before the commencement ` +
    `date of the Term. The Landlord represents and warrants that, as of such date, the Premises shall be free ` +
    `from any existing leases, options, rights of renewal, or other leasehold interests.`
  );
  gap(5);

  // ── 12. ALTERATIONS AND IMPROVEMENTS ──
  addSectionHeading("12. Alterations and Improvements");
  if (values.alterationsAllowed === "no") {
    addBody(
      `The Tenant shall not make any alterations, renovations, or improvements to the Premises without the ` +
      `prior written consent of the Landlord.`
    );
  } else {
    addBody(
      `The Tenant shall have the right to make alterations, renovations, or improvements to the Premises, ` +
      `subject to the prior written consent of the Landlord, which consent shall not be unreasonably withheld ` +
      `or delayed. All work shall comply with applicable municipal by-laws, building codes, and governmental regulations.`
    );
  }
  gap(5);

  // ── 13. ASSIGNMENT AND SUBLETTING ──
  addSectionHeading("13. Assignment and Subletting");
  if (values.sublettingAllowed === "no") {
    addBody(
      `The Tenant shall not assign the lease or sublet all or any portion of the Premises without the prior ` +
      `written consent of the Landlord.`
    );
  } else {
    addBody(
      `The Tenant may assign the lease or sublet all or any portion of the Premises with the prior written consent ` +
      `of the Landlord, such consent not to be unreasonably withheld, conditioned, or delayed.`
    );
  }
  gap(5);

  // ── 14. COMPLIANCE WITH LAWS ──
  addSectionHeading("14. Compliance With Laws");
  addBody(
    `The Landlord represents and warrants that the building and the Premises have been constructed and maintained ` +
    `in compliance with all applicable zoning regulations, building codes, and requirements of all governmental ` +
    `authorities having jurisdiction.`
  );
  gap(8);

  // ── EXECUTION ──
  addSectionHeading("Execution");
  addBody(
    `IN WITNESS WHEREOF, the Tenant has executed this Offer in accordance with applicable law as of the Offer Date first written above.`
  );
  gap(6);

  checkPage(40);
  doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
  doc.text("TENANT:", margin, y); y += 10;

  doc.setFont("helvetica", "normal"); doc.setFontSize(10.5);
  doc.text(`Name: ${v("tenantName", "__________________________")}`, margin, y); y += 8;
  doc.text(`Signature: ${v("tenantSignature", "__________________________")}`, margin, y); y += 8;
  doc.text(`Date: ${v("tenantSignDate", "__________")}`, margin, y); y += 12;

  // Signature line
  checkPage(20);
  doc.setDrawColor(0); doc.setLineWidth(0.3);
  doc.line(margin, y, margin + 80, y);
  y += 4;
  doc.setFontSize(9); doc.setFont("helvetica", "normal");
  doc.text("Authorized Signature", margin, y);
  y += 12;

  doc.save("offer_to_lease.pdf");
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function OfferToLeaseForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [generating, setGenerating] = useState(false);

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const progress = Math.round(((currentStep) / (steps.length - 1)) * 100);
  const nextStepLabel = !isLast ? steps[currentStep + 1]?.label : null;

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const e = { ...prev }; delete e[name]; return e; });
  };

  const validate = () => {
    const newErrors = {};
    for (const field of step.fields) {
      if (field.required && !values[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validate()) setCurrentStep((s) => s + 1); };
  const handleBack = () => { setCurrentStep((s) => s - 1); setErrors({}); };
  const handleGenerate = async () => {
    if (!validate()) return;
    setGenerating(true);
    try { await generatePDF(values); } catch (e) { alert("PDF generation failed. Please try again."); }
    setGenerating(false);
  };

  const inputBase = `w-full px-3 py-2.5 border rounded-lg text-sm bg-white text-gray-800 outline-none transition-all focus:ring-2 focus:ring-orange-300 focus:border-orange-400 placeholder-gray-400`;
  const inputNormal = `border-gray-300`;
  const inputError = `border-red-400 bg-red-50`;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f5f5f5", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span style={{ fontWeight: 600, fontSize: 16, color: "#111827" }}>Offer to Lease</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
          <span style={{ color: "#6b7280" }}>Step {currentStep + 1} of {steps.length}</span>
          <span style={{ color: "#ea580c", fontWeight: 700 }}>{progress}% Complete</span>
        </div>
      </div>

      {/* Orange progress bar */}
      <div style={{ height: 5, background: "#e5e7eb" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "#ea580c", transition: "width 0.4s ease" }} />
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 240, background: "#fff", borderRight: "1px solid #e5e7eb", padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
          {steps.map((s, i) => {
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                borderRadius: 8, cursor: "default",
                background: isActive ? "#fff7ed" : "transparent",
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                  border: isActive ? "2px solid #ea580c" : isDone ? "2px solid #ea580c" : "2px solid #d1d5db",
                  background: isDone ? "#ea580c" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {isDone ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : isActive ? (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ea580c" }} />
                  ) : null}
                </div>
                <span style={{ fontSize: 14, fontWeight: isActive ? 600 : 400, color: isActive ? "#ea580c" : isDone ? "#374151" : "#9ca3af" }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
          {/* Step header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ background: "#1f2937", color: "#fff", fontWeight: 700, fontSize: 13, padding: "2px 10px", borderRadius: 4 }}>
                Step {currentStep + 1}
              </span>
              {nextStepLabel && (
                <span style={{ color: "#9ca3af", fontSize: 13 }}>→ Next: {nextStepLabel}</span>
              )}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111827", margin: 0 }}>{step.label}</h1>
          </div>

          {/* Form card */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 28px", maxWidth: 720 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {step.fields.map((field) => (
                <div key={field.name}>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
                    {field.label}
                    {field.required && <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>}
                  </label>

                  {field.type === "select" ? (
                    <select
                      value={values[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      style={{
                        width: "100%", padding: "10px 12px", border: `1px solid ${errors[field.name] ? "#f87171" : "#d1d5db"}`,
                        borderRadius: 8, fontSize: 14, background: "#fff", color: values[field.name] ? "#111827" : "#9ca3af",
                        outline: "none", cursor: "pointer", appearance: "auto"
                      }}
                    >
                      <option value="">Select {field.label}…</option>
                      {field.options?.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      placeholder={field.placeholder}
                      value={values[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      style={{
                        width: "100%", padding: "10px 12px", border: `1px solid ${errors[field.name] ? "#f87171" : "#d1d5db"}`,
                        borderRadius: 8, fontSize: 14, background: "#fff", color: "#111827",
                        outline: "none", resize: "vertical", fontFamily: "inherit",
                        boxSizing: "border-box"
                      }}
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={values[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      style={{
                        width: "100%", padding: "10px 12px", border: `1px solid ${errors[field.name] ? "#f87171" : "#d1d5db"}`,
                        borderRadius: 8, fontSize: 14, background: "#fff", color: "#111827",
                        outline: "none", boxSizing: "border-box"
                      }}
                    />
                  )}

                  {errors[field.name] && (
                    <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        {/* Back */}
        <button
          onClick={handleBack}
          disabled={isFirst}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 20px",
            border: "none", background: "none", cursor: isFirst ? "not-allowed" : "pointer",
            fontSize: 14, fontWeight: 500, color: isFirst ? "#d1d5db" : "#374151"
          }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Dot indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>{currentStep} of {steps.length} steps completed</span>
          <div style={{ display: "flex", gap: 6 }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                width: 10, height: 10, borderRadius: "50%",
                background: i < currentStep ? "#ea580c" : i === currentStep ? "#ea580c" : "#d1d5db",
                opacity: i === currentStep ? 1 : i < currentStep ? 0.5 : 1
              }} />
            ))}
          </div>
        </div>

        {/* Continue / Generate */}
        {isLast ? (
          <button
            onClick={handleGenerate}
            disabled={generating}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "11px 28px",
              borderRadius: 8, border: "none", cursor: generating ? "wait" : "pointer",
              background: "#ea580c", color: "#fff", fontWeight: 600, fontSize: 14
            }}
          >
            {generating ? "Generating…" : (
              <>
                Generate PDF
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "11px 28px",
              borderRadius: 8, border: "none", cursor: "pointer",
              background: "#ea580c", color: "#fff", fontWeight: 600, fontSize: 14
            }}
          >
            Continue
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
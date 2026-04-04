// ============================================================================
// LEGALGRAM - HOLY GRAIL DOCUMENT CONTENT DATABASE
// Full descriptions, FAQs, and detailed guides for all document types
// ============================================================================

export interface DocumentFAQ {
  q: string;
  a: string;
}

export interface DocumentContent {
  title: string;
  otherNames?: string[];
  whatIs: string;
  whenToUse: string[];
  faqs: DocumentFAQ[];
  keyProtections?: string[];
  whatYouNeed?: string[];
  estimatedTime?: string;
  legalDisclaimer?: string;
}

// ============================================================================
// COMPREHENSIVE DOCUMENT CONTENT DATABASE
// ============================================================================

export const documentContent: Record<string, DocumentContent> = {
  // === VEHICLE & PROPERTY LEASES ===
  "Vehicle Lease Agreement": {
    title: "Vehicle Lease Agreement",
    whatIs: "A legally binding contract between a vehicle owner (Lessor) and an individual or business (Lessee). It clearly defines rights, duties, and obligations, covering lease duration, payment structure, permitted use, insurance, and mileage limits. Unlike a sale, ownership does not transfer. This agreement protects both parties by establishing clear expectations for vehicle condition, maintenance responsibilities, and procedures for ending the lease.",
    whenToUse: [
      "You want to lease a vehicle without going through a dealership.",
      "You need a clear written record of lease terms and payments to prevent disputes.",
      "You want legal protection for both lessor and lessee regarding damage and liability.",
      "You're leasing your personal vehicle to generate income (e.g., rideshare, delivery services).",
      "You need to establish mileage limits and overage penalties."
    ],
    faqs: [
      { q: "Is this legally binding?", a: "Yes. Like any contract, once signed by both parties, it is enforceable under state law. Both parties are legally obligated to follow the terms specified in the agreement." },
      { q: "What happens if the vehicle is damaged?", a: "The agreement specifies insurance requirements and liability. Typically, the Lessee is responsible for repairs beyond normal wear and tear. Comprehensive and collision insurance is usually required." },
      { q: "Can I end the lease early?", a: "Early termination is possible but usually involves penalties specified in the agreement. These may include paying remaining lease payments or a flat termination fee." },
      { q: "What if the Lessee exceeds the mileage limit?", a: "Overage charges apply as specified in the agreement. These are typically calculated per mile over the limit and can add up quickly." },
      { q: "Do I need to notarize this agreement?", a: "Notarization is not strictly required but is highly recommended for added legal protection and to verify the identities of both parties." }
    ],
    keyProtections: [
      "Clear liability assignment for accidents and damages",
      "Defined mileage limits with overage penalties",
      "Security deposit terms and return conditions",
      "Insurance requirements and coverage specifications",
      "Early termination clauses and penalties"
    ],
    whatYouNeed: [
      "Vehicle information (VIN, make, model, year, color)",
      "Lessor and Lessee full legal names and addresses",
      "Lease duration and payment terms",
      "Insurance policy details",
      "Current odometer reading"
    ],
    estimatedTime: "10-15 minutes"
  },

  // === SECURITY & FINANCIAL AGREEMENTS ===
  "Security Agreement": {
    title: "Security Agreement",
    whatIs: "A contract that pledges specific personal property (collateral) to secure a loan. If the borrower defaults, the lender has the legal right to claim the assets. It protects the lender and ensures repayment security. This document creates a 'security interest' in the collateral, giving the secured party priority over other creditors. Common collateral includes vehicles, equipment, inventory, accounts receivable, and other business assets.",
    whenToUse: [
      "You are lending money and want collateral protection (e.g., machinery, equipment, jewelry).",
      "You are borrowing money and the lender requires security to lower the interest rate.",
      "You need a formal, enforceable loan structure.",
      "You want to perfect your security interest by filing a UCC-1 statement.",
      "You're financing equipment or inventory for a business."
    ],
    faqs: [
      { q: "Does this cover Real Estate?", a: "No. For land or homes, use a Mortgage or Deed of Trust. Security Agreements are specifically for personal property (movable assets), not real property." },
      { q: "Do I need to notarize it?", a: "It is highly recommended for stronger legal protection, though not always strictly required by law. Notarization adds authenticity and can be crucial in disputes." },
      { q: "What is 'perfecting' a security interest?", a: "Perfection establishes your priority over other creditors. This is typically done by filing a UCC-1 Financing Statement with the Secretary of State." },
      { q: "What happens if the borrower defaults?", a: "The secured party can repossess the collateral, following state law procedures. They may then sell it to recover the debt, with any excess returned to the borrower." },
      { q: "Can I use multiple items as collateral?", a: "Yes. The agreement can list multiple assets, and you can even use 'after-acquired property' clauses to include future assets." }
    ],
    keyProtections: [
      "Detailed description of collateral",
      "Default event definitions",
      "Remedies upon default",
      "Rights to inspect collateral",
      "Insurance requirements for collateral",
      "UCC filing provisions"
    ],
    whatYouNeed: [
      "Debtor and secured party full legal information",
      "Detailed collateral description (serial numbers, values)",
      "Loan amount and repayment terms",
      "Default conditions and cure periods",
      "State where collateral is located"
    ],
    estimatedTime: "12-18 minutes"
  },

  // === AFFIDAVITS ===
  "Affidavit of Character": {
    title: "Affidavit of Character",
    whatIs: "A formal legal document used to provide a character reference under oath. The affiant declares—on the basis of personal knowledge—that a specific individual is of good moral character, integrity, and reputation. This sworn statement carries legal weight because false statements can result in perjury charges. Character affidavits are commonly used in court proceedings, immigration matters, and professional licensing applications.",
    whenToUse: [
      "Child custody proceedings where a parent's character is questioned.",
      "Immigration cases requiring proof of moral standing.",
      "Employment background checks or professional licensing.",
      "Criminal sentencing hearings where character evidence may help.",
      "Adoption proceedings requiring character verification.",
      "Security clearance applications."
    ],
    faqs: [
      { q: "Does it require a Notary?", a: "Yes. An affidavit must be sworn before a Notary Public to be valid in court. The notary verifies the identity of the person making the statement and witnesses their signature." },
      { q: "Can a family member sign it?", a: "Yes, but an unbiased third party (neighbor, employer, clergy, longtime friend) is often viewed as more credible by courts and agencies. Family members may be seen as biased." },
      { q: "What should I include in the statement?", a: "Include specific examples of the person's character, how long you've known them, the nature of your relationship, and any relevant observations about their moral conduct." },
      { q: "Can I refuse to provide an affidavit?", a: "Yes. Providing a character affidavit is voluntary. No one can compel you to write one." },
      { q: "What if my statement is false?", a: "Making false statements in an affidavit constitutes perjury, which is a criminal offense punishable by fines and imprisonment." }
    ],
    keyProtections: [
      "Sworn statement under penalty of perjury",
      "Specific examples of character traits",
      "Clear documentation of relationship history",
      "Professional observations when applicable",
      "Notarized verification of identity"
    ],
    whatYouNeed: [
      "Subject's full legal name",
      "Affiant's relationship to the subject",
      "Specific character observations and examples",
      "Duration of relationship",
      "Notary Public availability"
    ],
    estimatedTime: "6-10 minutes"
  },

  "Affidavit of Ownership": {
    title: "Affidavit of Ownership",
    whatIs: "A sworn legal statement declaring that you are the rightful owner of a specific piece of property, typically a vehicle, boat, or other titled asset. It's commonly used when original title documents are lost or during transfers of ownership. This document is legally binding and made under penalty of perjury.",
    whenToUse: [
      "You need to prove ownership without a title document.",
      "You're applying for a duplicate title at the DMV.",
      "You're transferring ownership of untitled property.",
      "Original ownership documents have been lost or destroyed.",
      "You need to establish a chain of ownership."
    ],
    faqs: [
      { q: "When is this typically required?", a: "DMVs often require this when applying for a duplicate title, registering a vehicle purchased without proper documentation, or transferring inherited property." },
      { q: "Does it replace a title?", a: "No, but it supports your application for a new title and serves as evidence of ownership while obtaining proper documentation." },
      { q: "Must it be notarized?", a: "Yes, notarization is required for the affidavit to be legally valid and accepted by government agencies." }
    ],
    keyProtections: [
      "Legal declaration under penalty of perjury",
      "Detailed property description",
      "Chain of ownership history",
      "Encumbrance disclosures",
      "Notary verification"
    ],
    whatYouNeed: [
      "Full property description (VIN, serial numbers)",
      "Purchase documentation or bill of sale",
      "Previous owner information",
      "Your identification",
      "Notary public availability"
    ],
    estimatedTime: "5-8 minutes"
  },

  "General Affidavit": {
    title: "General Affidavit",
    whatIs: "A written sworn statement of fact that can be used as evidence in legal proceedings or to verify information for official purposes. The person making the statement (affiant) swears under penalty of perjury that the contents are true. This versatile document is admissible in court and can be used for countless purposes.",
    whenToUse: [
      "You need to make a formal, sworn statement of fact for court.",
      "You're verifying identity or personal information for an agency.",
      "You need to document specific events or circumstances.",
      "You're providing evidence for an insurance claim.",
      "You need sworn testimony but cannot appear in person."
    ],
    faqs: [
      { q: "What makes an affidavit different from a regular written statement?", a: "An affidavit is sworn under oath and notarized, making it legally binding. False statements are punishable as perjury." },
      { q: "Can I write my own affidavit?", a: "Yes, but it must follow legal formatting requirements and be notarized to be valid." },
      { q: "Is an affidavit admissible in court?", a: "Yes, affidavits are generally admissible as evidence, though the opposing party may have the right to cross-examine the affiant." }
    ],
    keyProtections: [
      "Legally binding sworn statement",
      "Admissible as evidence",
      "Penalty of perjury clause",
      "Notary verification",
      "Clear factual statements"
    ],
    whatYouNeed: [
      "Specific facts to be attested",
      "Purpose of the affidavit",
      "Your identification",
      "Witness information (if required)",
      "Notary public availability"
    ],
    estimatedTime: "5-8 minutes"
  },

  // === HEALTHCARE & POWER OF ATTORNEY ===
  "Medical Power of Attorney": {
    title: "Medical Power of Attorney",
    whatIs: "A legal document that authorizes a trusted person (Agent) to make healthcare decisions on your behalf if you are unable to communicate. It is 'durable', meaning it stays effective during incapacity. This document ensures your healthcare wishes are respected when you cannot speak for yourself and prevents family disputes about treatment decisions.",
    whenToUse: [
      "Before undergoing major surgery.",
      "If you are diagnosed with a progressive illness.",
      "General emergency planning for all adults over 18.",
      "You want to ensure specific treatment preferences are followed.",
      "You need someone to communicate with doctors on your behalf."
    ],
    faqs: [
      { q: "Is the Agent responsible for my bills?", a: "No. The agent makes medical decisions but is not personally liable for your medical costs. They only have authority over healthcare choices, not financial obligations." },
      { q: "Can I revoke it?", a: "Yes, as long as you are mentally competent, you can cancel or update it at any time. Simply inform your agent in writing and destroy existing copies." },
      { q: "Who should I choose as my agent?", a: "Choose someone you trust completely who knows your values and wishes. They should be able to make difficult decisions under pressure and advocate for you effectively." },
      { q: "Does it cover mental health treatment?", a: "You can specifically include or exclude mental health treatment authority. Many people create separate mental health directives." },
      { q: "What if my agent is unavailable?", a: "You should designate an alternate agent who can step in if your primary agent is unable or unwilling to serve." }
    ],
    keyProtections: [
      "Clearly defined agent authority",
      "HIPAA authorization for medical records access",
      "End-of-life care preferences",
      "Organ donation wishes",
      "Mental health treatment directives",
      "Agent succession planning"
    ],
    whatYouNeed: [
      "Healthcare agent's full contact information",
      "Alternate agent information",
      "Your specific medical preferences",
      "Witness signatures (two required in most states)",
      "Notary (required in some states)"
    ],
    estimatedTime: "8-12 minutes"
  },

  "Healthcare Power of Attorney": {
    title: "Healthcare Power of Attorney",
    whatIs: "A legal document that authorizes a trusted person (your healthcare agent or proxy) to make medical decisions on your behalf if you become incapacitated and cannot communicate your wishes. This document is 'durable,' meaning it remains effective even when you are unconscious or mentally incapacitated.",
    whenToUse: [
      "Before undergoing major surgery or medical procedures.",
      "When diagnosed with a serious or progressive illness.",
      "As part of general estate and healthcare planning.",
      "If you want someone specific to make medical decisions for you.",
      "To ensure your treatment preferences are respected."
    ],
    faqs: [
      { q: "What decisions can my agent make?", a: "Your agent can consent to or refuse treatment, choose doctors and hospitals, access your medical records, and make end-of-life decisions according to your wishes." },
      { q: "Is this the same as a Living Will?", a: "No. A Living Will states your specific wishes; a Healthcare POA designates someone to make decisions. Many people have both." },
      { q: "Can I limit my agent's authority?", a: "Yes. You can specify exactly what decisions they can and cannot make, or exclude certain treatments." }
    ],
    keyProtections: [
      "Clearly defined agent authority",
      "HIPAA authorization",
      "End-of-life care preferences",
      "Organ donation wishes",
      "Agent succession planning"
    ],
    whatYouNeed: [
      "Healthcare agent's contact information",
      "Alternate agent information",
      "Your medical preferences",
      "Witness signatures",
      "Notary (in some states)"
    ],
    estimatedTime: "8-12 minutes"
  },

  "Living Will": {
    title: "Living Will",
    whatIs: "A legal document that expresses your wishes regarding life-sustaining medical treatment if you become terminally ill or permanently unconscious. Unlike a Healthcare Power of Attorney (which appoints someone to decide for you), a Living Will directly states YOUR decisions about end-of-life care.",
    whenToUse: [
      "You want to specify your end-of-life care preferences.",
      "You want to relieve family members of difficult decisions.",
      "You have specific wishes about life support, resuscitation, or feeding tubes.",
      "You're planning your estate and healthcare directives."
    ],
    faqs: [
      { q: "What treatments can I address?", a: "You can address mechanical ventilation, CPR, tube feeding, dialysis, antibiotics, pain medication, and other life-prolonging treatments." },
      { q: "Is it legally binding?", a: "Yes, in all 50 states. Healthcare providers are legally required to follow your documented wishes." },
      { q: "Can I change it later?", a: "Yes. You can update or revoke your Living Will at any time while mentally competent." }
    ],
    keyProtections: [
      "Specific treatment preferences documented",
      "Pain management instructions",
      "Comfort care specifications",
      "Organ donation decisions",
      "Legally binding directives"
    ],
    whatYouNeed: [
      "Your specific end-of-life preferences",
      "Two witness signatures",
      "Notarization (some states)",
      "Discussion with your doctor"
    ],
    estimatedTime: "10-15 minutes"
  },

  // === BUSINESS AGREEMENTS ===
  "Non-Disclosure Agreement": {
    title: "Non-Disclosure Agreement (NDA)",
    whatIs: "A legally binding contract that creates a confidential relationship between parties. The party receiving confidential information agrees not to disclose it to third parties. NDAs protect trade secrets, business strategies, client lists, and other proprietary information from being shared with competitors or the public.",
    whenToUse: [
      "Sharing business ideas with potential investors.",
      "Hiring employees who will access sensitive information.",
      "Discussing partnerships or joint ventures.",
      "Working with contractors or consultants.",
      "Before merger or acquisition negotiations."
    ],
    faqs: [
      { q: "How long does an NDA last?", a: "Typically 1-5 years, but trade secrets can be protected indefinitely. The duration depends on the nature of the information and industry standards." },
      { q: "Can an NDA be broken?", a: "Yes, but the breaching party can be sued for damages, injunctive relief, and attorney's fees. Courts can order the return of confidential materials." },
      { q: "What makes information 'confidential'?", a: "Generally, it must be identified as confidential, not publicly known, and provide competitive advantage." }
    ],
    keyProtections: [
      "Clear definition of confidential information",
      "Permitted uses and disclosures",
      "Duration of confidentiality obligations",
      "Return or destruction of materials",
      "Remedies for breach"
    ],
    whatYouNeed: [
      "Party names and addresses",
      "Description of confidential information",
      "Purpose of disclosure",
      "Duration of agreement",
      "Governing state law"
    ],
    estimatedTime: "8-10 minutes"
  },

  "Independent Contractor Agreement": {
    title: "Independent Contractor Agreement",
    otherNames: ["Freelance Contract", "Consulting Agreement", "Contract Labor Form", "Independent Contractor Contract", "Freelancer Contractor Agreement", "Consulting Contract", "Consulting Services Agreement"],
    whatIs: "A legal contract establishing a business relationship between a company and an independent contractor. It defines the scope of work, payment terms, and clarifies that the contractor is not an employee. This distinction is crucial for tax purposes, liability protection, and compliance. The contractor controls how they perform the work, uses their own equipment, can work for others, and handles their own taxes and business expenses.",
    whenToUse: [
      "Hiring freelancers or consultants for specific projects",
      "Engaging specialists for temporary or ongoing work",
      "Outsourcing specific business functions or services",
      "Working with vendors or service providers",
      "When the worker operates their own business"
    ],
    faqs: [
      { q: "Why do I need an Independent Contractor Agreement?", a: "It sets clear expectations, protects intellectual property ownership, maintains confidentiality, defines the scope of work, and most importantly documents that the relationship is independent—not employment. This protects both parties from IRS misclassification penalties." },
      { q: "What's the difference between a contractor and an employee?", a: "Contractors work independently, control how they perform work, use their own equipment, can work for multiple clients, set their own hours, and pay their own taxes and business expenses. Employees work under the hiring party's direction, receive company equipment, work set hours, and have taxes deducted by the employer." },
      { q: "Can I sign an Independent Contractor Agreement online?", a: "Yes, with proper e-signature tools like DocuSign or Hellosign that are legally binding in most jurisdictions. Both parties can sign securely and electronically, making the process faster and more convenient." },
      { q: "Who owns the work created by the contractor?", a: "This should be clearly specified in the contract. Without an explicit clause, the contractor typically retains ownership of work they create. You can assign ownership to yourself through a Work-Made-For-Hire clause if needed." },
      { q: "What happens if a contractor is misclassified?", a: "Misclassification can result in significant IRS penalties, back taxes, unpaid payroll taxes, unemployment insurance liability, and workers' compensation violations. A properly drafted agreement demonstrating true contractor status can provide protection." }
    ],
    keyProtections: [
      "Clear scope of work and deliverables definition",
      "Payment terms, rates, and milestone schedule",
      "Intellectual property ownership specification",
      "Confidentiality and non-disclosure clauses",
      "Independent contractor status confirmation",
      "Termination conditions and notice requirements",
      "Limitation of liability provisions",
      "Compliance with tax and employment laws",
      "Insurance and indemnification",
      "Dispute resolution procedures"
    ],
    whatYouNeed: [
      "Contractor's business name, address, and tax ID",
      "Hiring party's name and business information",
      "Detailed description of services/deliverables",
      "Project scope and timeline",
      "Compensation amount and payment schedule",
      "Confidentiality and IP ownership preferences",
      "Insurance requirements (if applicable)",
      "Term length and termination conditions",
      "Any special provisions or requirements",
      "Governing law jurisdiction"
    ],
    estimatedTime: "15-20 minutes"
  },

  "Loan Agreement": {
    title: "Loan Agreement",
    whatIs: "A comprehensive contract for lending money that specifies the principal amount, interest rate, repayment schedule, collateral (if any), and all terms governing the lending relationship. This document protects both lender and borrower by clearly establishing expectations and consequences.",
    whenToUse: [
      "Lending money to friends or family (document it!).",
      "Business loans between companies.",
      "Personal loans requiring formal documentation.",
      "Any situation where you want enforceable repayment terms.",
      "When interest will be charged on a loan."
    ],
    faqs: [
      { q: "Is interest required?", a: "No. You can make an interest-free loan, but even then, a written agreement protects both parties and documents the transaction." },
      { q: "What if the borrower doesn't pay?", a: "The agreement provides legal grounds for collection, including small claims court, mediation, or hiring a collection agency." },
      { q: "Do I need collateral?", a: "Not required, but secured loans offer better protection. Collateral gives you something to claim if the borrower defaults." }
    ],
    keyProtections: [
      "Loan amount and disbursement terms",
      "Interest rate and calculation method",
      "Repayment schedule with due dates",
      "Prepayment options",
      "Default provisions and remedies",
      "Collection procedures"
    ],
    whatYouNeed: [
      "Loan amount",
      "Interest rate (if any)",
      "Repayment schedule",
      "Borrower information",
      "Collateral description (if secured)"
    ],
    estimatedTime: "12-18 minutes"
  },

  // === LICENSE AGREEMENTS ===
  "License Agreement": {
    title: "License Agreement",
    otherNames: ["Licensing Agreement", "Software License Agreement", "Trademark License Agreement"],
    whatIs: "A License Agreement is a legally binding contract under which one party (the licensor) grants permission to another party (the licensee) to use specific intellectual property, business concepts, software, trademarks, or products. This agreement defines scope, duration, territorial restrictions, and financial terms while the licensor retains ownership. License Agreements enable businesses to commercialize their intellectual property while maintaining control and receiving compensation.",
    whenToUse: [
      "To grant usage rights to intellectual property or business assets",
      "To create exclusive or non-exclusive licensing arrangements",
      "To define territorial or geographical usage restrictions",
      "To establish royalty or payment terms",
      "To authorize manufacturing or distribution of your product"
    ],
    faqs: [
      { q: "What should be included in a License Agreement?", a: "A comprehensive agreement includes: term and duration, licensing fees and royalties, confidentiality provisions, permitted and prohibited uses, transfer and resale rights, warranties and indemnities, and termination clauses." },
      { q: "What types of property can be licensed?", a: "You can license various types of intellectual property including trademarks, software and digital assets, copyrights, and patents. Each requires careful definition of scope and usage rights." },
      { q: "Should I consult a lawyer?", a: "While you can download and customize a license agreement template, consulting a legal professional is advisable to ensure the agreement fully protects your interests and complies with applicable laws." },
      { q: "What is an Unlimited License Agreement?", a: "An Unlimited License Agreement typically applies to software, allowing unrestricted usage or access. This is common for enterprise software solutions and internal business tool licensing." },
      { q: "Can I grant exclusive or non-exclusive licenses?", a: "Yes. An exclusive license means only the licensee can use the property. A non-exclusive license allows the licensor to grant usage to multiple parties. Specify this clearly in your agreement." }
    ],
    keyProtections: [
      "Clear grant of rights (exclusive or non-exclusive)",
      "Term and termination conditions",
      "Royalty and payment terms",
      "Geographical scope limitations",
      "Permitted scope of use and modifications",
      "Confidentiality and non-disclosure clauses",
      "Warranties and quality assurances",
      "Dispute resolution procedures",
      "Control of improvements and modifications",
      "Transfer and sublicense restrictions"
    ],
    whatYouNeed: [
      "Licensor and licensee legal names and information",
      "Clear description of licensed intellectual property",
      "Scope of rights granted (exclusive/non-exclusive)",
      "Territory and geographical limitations",
      "Term duration and renewal provisions",
      "Royalty rates and payment schedule",
      "Quality control standards (if applicable)",
      "Confidentiality and non-disclosure requirements",
      "Termination conditions and notice periods",
      "Dispute resolution method"
    ],
    estimatedTime: "15-20 minutes"
  },

  // === PROPERTY & LEASE AGREEMENTS ===
  "Commercial Lease Agreement": {
    title: "Commercial Lease Agreement",
    whatIs: "A binding contract between a landlord and a business tenant for rental of commercial property. Unlike residential leases, commercial leases have fewer legal protections for tenants and allow for greater negotiation flexibility. These agreements typically cover longer terms and include provisions for rent increases, build-outs, and operating expenses.",
    whenToUse: [
      "Renting office, retail, or industrial space.",
      "Leasing warehouse or storage facilities.",
      "Opening a new business location.",
      "Renewing an existing commercial lease.",
      "Subleasing commercial property."
    ],
    faqs: [
      { q: "What's a triple net (NNN) lease?", a: "The tenant pays base rent PLUS property taxes, insurance, and maintenance costs. Common in commercial real estate." },
      { q: "Can I negotiate the terms?", a: "Yes! Unlike residential leases, commercial leases are highly negotiable. Everything from rent to build-out allowances can be discussed." },
      { q: "What about improvements to the space?", a: "The lease should specify who pays for improvements, who owns them, and what happens when the lease ends." }
    ],
    keyProtections: [
      "Rent amount and escalation clauses",
      "Lease term and renewal options",
      "Permitted use restrictions",
      "Maintenance responsibilities",
      "Insurance requirements",
      "Build-out and improvement terms"
    ],
    whatYouNeed: [
      "Property address and description",
      "Landlord and tenant information",
      "Rent amount and payment terms",
      "Lease duration",
      "Intended business use"
    ],
    estimatedTime: "15-20 minutes"
  },

  "Residential Lease Agreement": {
    title: "Residential Lease Agreement",
    whatIs: "A legal contract between a landlord and tenant for rental of residential property. It establishes the rights and responsibilities of both parties, including rent amount, security deposit, lease term, and rules for the property. State and local laws provide significant protections for residential tenants.",
    whenToUse: [
      "Renting out a house, apartment, or condo.",
      "Becoming a tenant in a rental property.",
      "Renewing an existing residential lease.",
      "Converting a verbal agreement to written form."
    ],
    faqs: [
      { q: "Can a landlord enter without notice?", a: "Generally no. Most states require 24-48 hours notice except in emergencies. Check your state's laws." },
      { q: "What's a reasonable security deposit?", a: "Most states limit deposits to 1-2 months' rent. The lease must specify deposit amount and return conditions." },
      { q: "Can I break the lease early?", a: "There may be penalties. The lease should specify early termination procedures and costs." }
    ],
    keyProtections: [
      "Rent amount and due date",
      "Security deposit terms",
      "Lease duration",
      "Maintenance responsibilities",
      "Pet policies",
      "Termination procedures"
    ],
    whatYouNeed: [
      "Property address",
      "Landlord and tenant information",
      "Monthly rent amount",
      "Security deposit amount",
      "Lease start and end dates"
    ],
    estimatedTime: "10-15 minutes"
  },

  // === FAMILY & PERSONAL ===
  "Prenuptial Agreement": {
    title: "Prenuptial Agreement",
    whatIs: "A legal contract between two people planning to marry that outlines how assets, debts, and financial matters will be handled during the marriage and in the event of divorce or death. Often called a 'prenup,' this document can protect family businesses, inheritances, and ensure fair treatment for both parties.",
    whenToUse: [
      "Either party has significant assets or debts.",
      "One or both parties have children from previous relationships.",
      "One party owns a business or expects an inheritance.",
      "There's a significant income disparity between partners.",
      "Either party wants to protect specific assets."
    ],
    faqs: [
      { q: "Does a prenup mean we'll get divorced?", a: "No. A prenup is financial planning, like insurance. Most couples who sign prenups never need to use them for divorce." },
      { q: "Can a prenup be thrown out?", a: "Yes, if it's found to be unconscionable, signed under duress, or if there wasn't full financial disclosure." },
      { q: "Do both parties need lawyers?", a: "It's highly recommended. Each party should have independent legal counsel for the agreement to be enforceable." }
    ],
    keyProtections: [
      "Property division provisions",
      "Debt responsibility allocation",
      "Spousal support terms",
      "Business interest protection",
      "Inheritance rights",
      "Financial disclosure requirements"
    ],
    whatYouNeed: [
      "Complete financial disclosure from both parties",
      "List of separate vs. marital property",
      "Debt information",
      "Future expectations (inheritance, business growth)",
      "Wedding date"
    ],
    estimatedTime: "20-30 minutes"
  },

  "Child Care Authorization": {
    title: "Child Care Authorization",
    whatIs: "A legal document that grants a specified adult temporary authority to make decisions for a minor child, including medical care, school activities, and general welfare. This is essential when parents will be unavailable and another adult needs legal authority to care for the child.",
    whenToUse: [
      "Leaving your child with grandparents or relatives.",
      "Business trips where you'll be unreachable.",
      "Vacation without your children.",
      "Military deployment.",
      "Any extended absence from your child."
    ],
    faqs: [
      { q: "Does this give up parental rights?", a: "No. This is temporary authorization only. You retain all parental rights and can revoke the authorization at any time." },
      { q: "Can the caregiver make all medical decisions?", a: "You can specify what decisions they can make. Emergency care is typically included; major surgery may require additional consent." },
      { q: "Is notarization required?", a: "While not always legally required, notarization helps medical providers and schools accept the authorization." }
    ],
    keyProtections: [
      "Clear scope of authority",
      "Medical treatment permissions",
      "Emergency contact procedures",
      "Duration of authorization",
      "Revocation procedures"
    ],
    whatYouNeed: [
      "Child's full information",
      "Caregiver's full information",
      "Duration of authorization",
      "Medical and insurance information",
      "Emergency contacts"
    ],
    estimatedTime: "8-10 minutes"
  },

  // === EMPLOYMENT ===
  "Employment Agreement": {
    title: "Employment Agreement",
    whatIs: "A formal contract between an employer and employee that outlines the terms and conditions of employment. This includes compensation, benefits, job duties, confidentiality obligations, termination procedures, and other workplace policies. A written agreement protects both parties and prevents misunderstandings.",
    whenToUse: [
      "Hiring a new employee.",
      "Promoting an employee to a new position.",
      "Changing employment terms significantly.",
      "When confidential information access is involved.",
      "For executive or key employee positions."
    ],
    faqs: [
      { q: "Is a written agreement required?", a: "Not always legally required, but highly recommended. Without a written agreement, disputes become he-said-she-said situations." },
      { q: "What's 'at-will' employment?", a: "Either party can end employment at any time for any legal reason. This is the default in most states unless otherwise specified." },
      { q: "Can I include a non-compete?", a: "Depends on your state. Some states (like California) heavily restrict non-competes. Others allow reasonable restrictions." }
    ],
    keyProtections: [
      "Job title and responsibilities",
      "Compensation and benefits",
      "Work schedule and location",
      "Confidentiality obligations",
      "Termination procedures",
      "Non-compete/non-solicitation clauses"
    ],
    whatYouNeed: [
      "Employee information",
      "Job description and title",
      "Salary and benefits package",
      "Start date",
      "Reporting structure"
    ],
    estimatedTime: "15-20 minutes"
  },

  "Severance Agreement": {
    title: "Severance Agreement",
    whatIs: "A contract between an employer and departing employee that outlines the terms of separation. The employer typically provides severance pay and benefits in exchange for the employee's agreement not to sue, not to disparage the company, and often to keep certain information confidential.",
    whenToUse: [
      "Laying off employees.",
      "Terminating an employee for non-cause reasons.",
      "Offering early retirement packages.",
      "Resolving potential employment disputes.",
      "Downsizing or restructuring."
    ],
    faqs: [
      { q: "Am I required to offer severance?", a: "Generally no, unless required by contract or company policy. However, it can provide valuable legal protection in exchange." },
      { q: "Can the employee negotiate?", a: "Yes. Severance terms are negotiable, and employees should have time to review the agreement with an attorney." },
      { q: "What about non-disparagement?", a: "Both parties typically agree not to make negative statements about each other. Violations can result in legal action." }
    ],
    keyProtections: [
      "Severance payment amount and schedule",
      "Benefits continuation",
      "Release of claims",
      "Non-disparagement provisions",
      "Confidentiality obligations",
      "Reference provisions"
    ],
    whatYouNeed: [
      "Employee information",
      "Severance amount and payment terms",
      "Benefits to be continued",
      "Non-compete considerations",
      "Return of company property list"
    ],
    estimatedTime: "12-15 minutes"
  },

  // === SALES & TRANSACTIONS ===
  "Bill of Sale": {
    title: "Bill of Sale",
    whatIs: "A legal document that records the transfer of ownership of personal property from a seller to a buyer. It serves as proof of the transaction and protects both parties by documenting the sale details, including the item description, purchase price, and any warranties or conditions.",
    whenToUse: [
      "Selling a vehicle, boat, or motorcycle.",
      "Selling equipment or machinery.",
      "Transferring ownership of valuable personal property.",
      "Documenting a gift of property for tax purposes.",
      "Any private party sale of significant items."
    ],
    faqs: [
      { q: "Is a Bill of Sale the same as a title?", a: "No. A title is official government documentation of ownership. A Bill of Sale documents the transaction itself. You need both for vehicles." },
      { q: "Do I need to notarize it?", a: "Depends on the item and state. Vehicle sales often require notarization. For other property, it's recommended but not always required." },
      { q: "What about 'as-is' sales?", a: "You can sell items 'as-is' without warranty, but this should be clearly stated in the Bill of Sale." }
    ],
    keyProtections: [
      "Item description and condition",
      "Purchase price",
      "Seller and buyer information",
      "Transfer date",
      "Warranty terms (or 'as-is' statement)",
      "Signatures of both parties"
    ],
    whatYouNeed: [
      "Complete item description",
      "Sale price",
      "Seller and buyer names and addresses",
      "Date of sale",
      "Any serial numbers or VINs"
    ],
    estimatedTime: "5-10 minutes"
  },

  // === IT SERVICE AGREEMENTS ===
  "IT Service Agreement": {
    title: "IT Service Agreement",
    whatIs: "An IT Service Agreement is a legally binding contract that defines the terms, scope, and conditions under which IT services are provided between a service provider and a client. This contract ensures clarity in service delivery, payment terms, responsibilities, and legal protection for both parties. It establishes a professional framework by clearly defining expectations, minimizing disputes, and protecting both the service provider and client.",
    whenToUse: [
      "You are providing IT services to a client or company",
      "You are hiring an IT professional or support provider",
      "You want a clear and enforceable IT Service Contract",
      "You need to define service scope, timelines, and payments",
      "You require formal documentation of IT support arrangements"
    ],
    faqs: [
      { q: "Should every IT provider create an IT Service Agreement?", a: "Yes. Every IT professional should use an agreement to clearly define expectations. This helps avoid payment disputes, clarify roles and responsibilities, set timelines and deliverables, and reduce legal risks. Without one, issues like underpayment, delays, and misunderstandings may arise." },
      { q: "What is included in the best format of IT Service Agreement?", a: "You will need: client and service provider details, scope of IT services, payment terms and schedule, start and end dates, and confidentiality clauses. The agreement should include essential legal protections and be customizable to fit your needs." },
      { q: "What is the cost of drafting an IT Service Agreement with a lawyer?", a: "Hiring a lawyer can cost $100 to $350+ per hour depending on experience and complexity. Using a professionally drafted template saves both time and cost while ensuring legal compliance and professional quality." },
      { q: "What to do after downloading your IT Service Agreement?", a: "Review the document carefully, share it with the other party, make necessary edits, sign the agreement, and keep a copy for records. This ensures your agreement is legally enforceable and ready for use." },
      { q: "Can I get my IT Service Agreement reviewed?", a: "Yes. After creating or downloading your agreement, it is recommended to have a legal expert review it. A professionally drafted template minimizes risks, but legal review adds an extra layer of protection." }
    ],
    keyProtections: [
      "Detailed description of IT services",
      "Service levels and performance standards (SLAs)",
      "Roles and responsibilities of both parties",
      "Payment terms and pricing structure",
      "Data security and confidentiality clauses",
      "Termination conditions and notice periods",
      "Liability limitations and dispute resolution",
      "Support hours and response times",
      "Intellectual property rights",
      "Compliance and regulatory requirements"
    ],
    whatYouNeed: [
      "Service provider and client information",
      "Detailed scope of services",
      "Payment terms and schedule",
      "Service level agreements (SLAs)",
      "Support hours and contact information",
      "Confidentiality requirements",
      "Termination conditions"
    ],
    estimatedTime: "10-15 minutes"
  },

  // === BUSINESS PLAN ===
  "Business Plan": {
    title: "Business Plan",
    whatIs: "A Business Plan is a structured legal and strategic document that outlines the financial, marketing, and operational framework of a business. It defines your business goals and provides a clear roadmap for growth and sustainability. A comprehensive business plan clearly communicates your business vision to investors, partners, and stakeholders while establishing a professional foundation for decision-making.",
    whenToUse: [
      "Starting a new business or startup",
      "Seeking funding from investors or financial institutions",
      "Expanding or restructuring your business",
      "Aligning your team with business goals and strategies",
      "Entering new markets or launching new products"
    ],
    faqs: [
      { q: "What makes a strong business plan?", a: "A strong plan includes clear objectives, realistic financial projections, thorough market analysis, competitive positioning, and a practical implementation timeline. It should be specific, measurable, and grounded in research." },
      { q: "Who needs to see a business plan?", a: "Banks, investors, venture capitalists, partners, employees, and stakeholders all benefit from a well-written business plan. It demonstrates your understanding of the market and credibility of your business model." },
      { q: "How often should I update my business plan?", a: "Review and update your plan at least annually or when significant business changes occur. This ensures it remains relevant and serves as an effective management tool." },
      { q: "What financial information must be included?", a: "Include startup costs, income projections, cash flow forecasts, profit/loss statements, break-even analysis, and balance sheet projections. These should be realistic and based on actual market research." },
      { q: "Can I use a template?", a: "Yes, templates provide a strong framework and ensure you don't miss critical components. Templates can be customized to fit your specific business model and industry requirements." }
    ],
    keyProtections: [
      "Clear business objectives and goals",
      "Executive summary for quick overview",
      "Market analysis and competitive positioning",
      "Operational and management structure",
      "Financial projections and break-even analysis",
      "Marketing and implementation strategy",
      "Risk assessment and contingency plans",
      "SWOT analysis",
      "Customer needs and market segmentation",
      "Revenue model and pricing strategy"
    ],
    whatYouNeed: [
      "Business concept and company overview",
      "Target market identification",
      "Competitive analysis",
      "Marketing and sales strategy",
      "Operations and management information",
      "Financial statements and projections",
      "Funding requirements",
      "Implementation timeline",
      "Key personnel information",
      "Industry and trend research"
    ],
    estimatedTime: "15-20 minutes"
  },

  // === BUY-SELL AGREEMENT ===
  "Buy-Sell Agreement": {
    title: "Buy-Sell Agreement",
    whatIs: "A Buy-Sell Agreement is a legally binding contract that governs how company ownership shares are bought, sold, or transferred between owners. It clearly outlines who is allowed to purchase an owner's shares, how the price will be determined, and what happens to ownership in case of death, disability, retirement, divorce, or bankruptcy. This agreement ensures business continuity and prevents disputes while protecting all parties' interests.",
    whenToUse: [
      "You want to restrict who can become a shareholder or partner",
      "You need a clear plan for events like death, disability, or retirement",
      "You want to fix a fair valuation method in advance",
      "You wish to protect ownership interests during divorce or bankruptcy",
      "You want inherited shares to be sold back to the company"
    ],
    faqs: [
      { q: "Is this Buy-Sell Agreement legally valid?", a: "Yes. This agreement is designed to be legally binding when properly executed by all parties and notarized if required by your state." },
      { q: "Can I customize the agreement?", a: "Absolutely. You can edit and tailor the agreement to suit your specific business structure and ownership requirements." },
      { q: "What happens if an owner dies?", a: "The agreement specifies what occurs - typically the deceased owner's shares are purchased by the remaining owners or the company at a pre-determined price." },
      { q: "Who should have a Buy-Sell Agreement?", a: "Any business with multiple owners - corporations, LLCs, partnerships, and S-Corps. It's especially important for businesses relying on the continued involvement of specific owners." },
      { q: "Can this protect against unwanted ownership?", a: "Yes. It prevents ownership transfer to outsiders by defining who can purchase shares and establishing buyback provisions that trigger automatically." }
    ],
    keyProtections: [
      "Clear definition of triggering events (death, disability, retirement, etc.)",
      "Pre-determined share valuation method",
      "Restrictions on who can purchase shares",
      "Buyback provisions for unwanted ownership transfers",
      "Payment terms and financing arrangements",
      "Right of first refusal for existing owners",
      "Business continuity during transitions",
      "Protection against divorce-related share transfers",
      "Bankruptcy protection provisions",
      "Clear succession planning framework"
    ],
    whatYouNeed: [
      "Complete ownership structure and percentage stakes",
      "Names and contact information of all owners",
      "Current business valuation",
      "Valuation method preference (formula, appraiser, etc.)",
      "Triggering events to address (death, disability, retirement)",
      "Payment terms and financing options",
      "Business entity type and state of incorporation",
      "Any existing agreements to consider",
      "Insurance arrangements (if applicable)",
      "Key person information"
    ],
    estimatedTime: "12-18 minutes"
  },

  // === CONFIDENTIALITY AGREEMENT ===
  "Confidential Information Agreement": {
    title: "Confidential Information Agreement",
    whatIs: "A Confidentiality Agreement is a legally enforceable contract that protects your proprietary business information from unauthorized disclosure. Whether you are sharing trade secrets, client data, financial records, or business strategies, this agreement ensures your information remains secure and provides legal recourse if confidential material is misused or revealed.",
    whenToUse: [
      "You need to share confidential information with a third party",
      "You are receiving sensitive business information",
      "You are hiring employees, freelancers, or consultants",
      "You are entering into partnerships, mergers, or vendor agreements",
      "You want to protect trade secrets and proprietary information"
    ],
    faqs: [
      { q: "When should I use a Confidentiality Agreement?", a: "Use a confidentiality agreement to protect sensitive information shared with employees, clients, vendors, or partners. Most businesses benefit from using an agreement to secure their operations and establish clear obligations regarding confidential information." },
      { q: "What does a Confidentiality Agreement do?", a: "A Confidentiality Agreement prevents unauthorized disclosure of confidential information. Unilateral NDAs protect one party's information, while mutual NDAs protect both parties' information. Choose based on whether information flows one way or both directions." },
      { q: "What information is required to draft a Confidentiality Agreement?", a: "You need: names of the parties involved, effective date and duration, nature of business relationship, description of confidential information, and purpose of disclosure. Clear definitions help ensure enforceability." },
      { q: "What are the limitations of a Confidentiality Agreement?", a: "Publicly known information cannot be protected, enforcement can be difficult without proof of breach, and legal enforceability depends on jurisdiction. However, having a Confidentiality Agreement significantly strengthens your legal protection." },
      { q: "Who should sign a Confidentiality Agreement?", a: "Request Confidentiality Agreements from employees, clients, vendors, freelancers or contractors, and business partners in mergers or acquisitions. The broader your coverage, the better protected your confidential information will be." }
    ],
    keyProtections: [
      "Clear definition of confidential information",
      "Restrictions on unauthorized disclosure",
      "Permitted use specifications",
      "Duration and term limitations",
      "Exceptions to confidentiality (public domain information)",
      "Return or destruction of confidential materials",
      "Remedies for breach of confidentiality",
      "No license or ownership transfer provisions",
      "Mutual obligations and responsibilities",
      "Dispute resolution mechanisms"
    ],
    whatYouNeed: [
      "Names and contact information of all parties",
      "Nature of business relationship",
      "Effective date and duration period",
      "Specific description of confidential information",
      "Purpose and scope of disclosure",
      "Permitted uses of confidential information",
      "Whether agreement is unilateral or mutual",
      "Return/destruction procedures",
      "Key contact information for notices",
      "Any required survival periods after termination"
    ],
    estimatedTime: "8-12 minutes"
  },

  // === CORPORATE BYLAWS ===
  "Corporate Bylaws": {
    title: "Corporate Bylaws",
    whatIs: "Corporate Bylaws are the internal rules and regulations that govern how a corporation operates. They establish the structure of the company, define the roles and responsibilities of the board of directors and officers, outline shareholder rights and voting procedures, and specify how meetings are conducted and decisions are made. Unlike Articles of Incorporation which create the corporation, Bylaws provide the operational framework. They are legally binding on all shareholders, directors, and officers, and help ensure the corporation operates in an organized, consistent manner while complying with state corporate laws.",
    whenToUse: [
      "You are forming a new corporation and need to establish governance structure",
      "You are managing a small business or startup and need operational rules",
      "You need to create formal internal procedures for decision-making",
      "You need to ensure your corporation complies with state corporate law requirements",
      "You are restructuring existing governance or adding new corporate procedures"
    ],
    faqs: [
      { q: "What is the difference between Bylaws and Articles of Incorporation?", a: "Articles of Incorporation create the corporation and are filed with the state. Bylaws establish the internal operating rules and are not filed with the state. Articles are more fundamental and harder to change, while Bylaws can be amended more easily by shareholders or directors." },
      { q: "Are Corporate Bylaws mandatory?", a: "While state law generally requires corporations to have bylaws or comparable governance documents, the specific requirements vary by state. Even where not strictly mandated, bylaws are highly recommended to establish clear organizational structure and governance procedures." },
      { q: "Who adopts the Corporate Bylaws?", a: "Bylaws are typically adopted by the board of directors at the corporation's first organizational meeting, often with shareholder approval. Some bylaws may be amended only by shareholders, while others can be amended by either shareholders or the board, depending on the specific provisions." },
      { q: "What topics should Corporate Bylaws cover?", a: "Bylaws should cover: board of directors size and duties, officer roles and selection, shareholder meeting procedures, voting rights, quorum requirements, annual meeting timing, special meeting procedures, profit distribution (if applicable), amendment procedures, and indemnification of directors and officers." },
      { q: "Can I modify or amend my Bylaws after adoption?", a: "Yes. Bylaws can be amended through procedures specified in the bylaws themselves, typically requiring shareholder approval for major changes. Some provisions may allow director-level amendments, but significant changes usually need shareholder votes." }
    ],
    keyProtections: [
      "Clearly defined board of directors structure and composition",
      "Specified duties and powers of officers and directors",
      "Shareholder voting rights and procedures",
      "Annual and special meeting requirements and procedures",
      "Quorum requirements for valid meetings",
      "Procedures for director appointment and removal",
      "Share issuance and stock management rules",
      "Amendment and modification procedures",
      "Indemnification protections for directors and officers",
      "Dispute resolution and governance compliance mechanisms"
    ],
    whatYouNeed: [
      "Corporation name and state of incorporation",
      "Principal office address",
      "Desired number of directors",
      "Officer positions and titles",
      "Shareholder structure and information",
      "Meeting frequency preferences",
      "Voting and quorum policies",
      "Amendment procedures",
      "Indemnification intentions",
      "Any special governance provisions"
    ],
    estimatedTime: "20-30 minutes"
  },

  // === COPYRIGHT LICENSE ===
  "Copyright License": {
    title: "Copyright License",
    whatIs: "A Copyright License is a legally binding arrangement that allows one party (the licensee) to use copyrighted material owned by another party (the licensor), subject to defined terms and conditions. This agreement clearly sets out how the copyrighted content may be used, the duration of use, and any applicable fees or royalties. Unlike an assignment, this license grants a limited and revocable right to use the copyrighted material while the licensor retains ownership.",
    whenToUse: [
      "You own copyrighted material and want to allow another party to use it",
      "You want to license your creative work for commercial or non-commercial purposes",
      "You need to obtain rights to use copyrighted content owned by another party",
      "You want a clear, written agreement to avoid disputes and misuse",
      "You need to establish usage limitations and geographic restrictions"
    ],
    faqs: [
      { q: "What is the difference between a Copyright License and an assignment?", a: "A Copyright License grants limited, revocable usage rights while the licensor retains ownership. An assignment transfers ownership completely to another party. Use a license when you want to maintain control while allowing others to use your work." },
      { q: "Can I revoke a Copyright License?", a: "Yes, copyright licenses can typically be revoked if the licensee violates the terms or after the agreed-upon duration expires. The agreement should specify conditions for termination and any notice requirements." },
      { q: "What should a Copyright License include?", a: "A comprehensive license should include: scope of permitted uses, duration, geographical limitations, payment terms/royalties, attribution requirements, warranties, indemnification, and termination conditions." },
      { q: "Do I need a Copyright License in writing?", a: "While verbal licenses technically exist, a written Copyright License is strongly recommended for clarity, enforceability, and to prevent disputes about the scope and terms of usage." },
      { q: "Can I grant exclusive or non-exclusive licenses?", a: "Yes. An exclusive license means only the licensee can use the copyrighted material. A non-exclusive license allows the licensor to grant usage to multiple parties. Specify this clearly in your agreement." }
    ],
    keyProtections: [
      "Clear definition of copyrighted material being licensed",
      "Specification of permitted uses and purposes",
      "Duration and term of the license",
      "Geographical and territorial limitations",
      "Exclusive vs. non-exclusive usage rights",
      "Payment terms and royalty arrangements",
      "Attribution and credit requirements",
      "Restriction on sublicensing or transfer rights",
      "Warranty and indemnification provisions",
      "Termination conditions and procedures"
    ],
    whatYouNeed: [
      "Clear description of copyrighted material",
      "Licensor and licensee information",
      "Type of license (exclusive or non-exclusive)",
      "Permitted uses and purposes",
      "Geographical scope and territories",
      "Duration and effective dates",
      "Payment terms and royalty rates",
      "Attribution and credit requirements",
      "Restrictions on modification or derivative works",
      "Termination and renewal conditions"
    ],
    estimatedTime: "10-15 minutes"
  },

  // === GENERAL CONTRACT FOR PRODUCTS ===
  "General Contract for Products": {
    title: "General Contract for Products",
    whatIs: "A General Contract for Products (also called a General Contract for Goods or Products Agreement) is a legally binding agreement used when businesses buy or sell tangible goods. This contract clearly defines the terms of the transaction, including product specifications, quantities, pricing, delivery schedules, payment terms, and warranties. By formalizing your transaction in writing, you reduce miscommunication risks and protect both parties' interests. Whether you're a buyer purchasing from a supplier or a seller offering products to customers, this agreement establishes mutual expectations and keeps business relationships professional and compliant.",
    whenToUse: [
      "You are a business purchasing goods from another business or supplier",
      "You are a business selling products to customers or other companies",
      "You want to document the transaction formally to avoid disputes",
      "You need clarity on product specifications, quantity, delivery, and payment terms",
      "You want to establish warranty provisions and liability limitations"
    ],
    faqs: [
      { q: "What is the difference between a General Contract for Products and other sales agreements?", a: "A General Contract for Products is specifically designed for tangible goods sales between businesses. It covers product specifications, delivery, and payment terms. It differs from service contracts (which cover services), real estate agreements, or digital product licenses. This agreement is designed for standard commercial transactions." },
      { q: "What goods does this agreement cover?", a: "This contract applies to tangible physical products sold in business-to-business transactions. It does not cover real estate, software, digital products, intellectual property, financial instruments (stocks/securities), or services. The agreement is ideal for goods like merchandise, equipment, raw materials, and manufactured products." },
      { q: "Does this agreement include warranties?", a: "Yes. The contract includes provisions for product warranties, specifications, quality standards, and limitations of liability. Both parties should clearly define what warranties are provided, their duration, and any exclusions or disclaimers regarding product condition, merchantability, and fitness for specific purposes." },
      { q: "What happens if delivery is late or goods are damaged?", a: "The contract specifies delivery obligations, risk of loss, and remedies for breach. Late delivery provisions and damage liability are outlined in the agreement. You can include penalties for late delivery, inspection rights upon receipt, and procedures for handling damaged or defective goods." },
      { q: "Can this contract be used for recurring purchases?", a: "Yes. This General Contract for Products can be used as a framework for one-time purchases or ongoing business relationships. For recurring orders, you can reference this contract in individual purchase orders, or modify it to include terms for multiple purchases over time with specified quantities and pricing." }
    ],
    keyProtections: [
      "Clear identification of buyer and seller parties and their responsibilities",
      "Detailed product description, specifications, and quantities",
      "Agreed unit price or total price with payment terms",
      "Delivery schedule, location, and shipping responsibilities",
      "Transfer of title and risk of loss provisions",
      "Warranty disclaimers and product quality standards",
      "Inspection rights and procedures for defective goods",
      "Limitation of liability and indemnification clauses",
      "Termination and cancellation procedures",
      "Dispute resolution and governing law provisions"
    ],
    whatYouNeed: [
      "Legal names and contact information of buyer and seller",
      "Detailed product description and specifications",
      "Product quantity and unit pricing",
      "Delivery date(s) and delivery location address",
      "Shipping method and responsibility (FOB, CIF, etc.)",
      "Payment terms and payment method",
      "Any applicable warranties or guarantees",
      "Inspection and acceptance procedures",
      "Return or cancellation policies",
      "Any specific terms or conditions unique to the transaction"
    ],
    estimatedTime: "15-20 minutes"
  },

  // === MANUFACTURING AGREEMENTS ===
  "Manufacturing Contract": {
    title: "Manufacturing Contract",
    otherNames: ["Private Label Manufacturing", "Contract Manufacturing", "Production Agreement", "Manufacturing Agreement", "Production Contract"],
    whatIs: "A Manufacturing Contract is a legally binding agreement between a product developer and a manufacturer that sets out the terms under which goods are produced. This contract defines essential elements such as product specifications, production standards, order quantities, delivery timelines, pricing, and payment terms. It protects both parties by clearly establishing responsibilities, quality standards, intellectual property rights, and dispute resolution procedures to ensure smooth production operations.",
    whenToUse: [
      "When your business is ready to launch a product and you need a manufacturer to produce it",
      "When you are a manufacturer entering into a production arrangement with a client",
      "When you want to clearly define responsibilities, quality standards, timelines, and payment terms",
      "When you want to avoid disputes by establishing a comprehensive and legally binding manufacturing agreement"
    ],
    faqs: [
      { q: "What is a contract manufacturer and how does it work?", a: "A contract manufacturer is a company that produces goods on behalf of another business. Under a Manufacturing Contract, the manufacturer is responsible for sourcing raw materials, managing production processes, and meeting agreed standards for quality, quantity, and delivery timelines." },
      { q: "What is contract manufacturing known as?", a: "Contract manufacturing is also commonly referred to as private label manufacturing, where products are produced by one company and branded by another. This arrangement allows businesses to focus on marketing and sales while outsourcing production." },
      { q: "What is an example of contract manufacturing?", a: "Common examples include mobile phones, electronics, gaming consoles, and consumer goods produced under Manufacturing Contracts for global brands. Contract manufacturing is prevalent in technology, apparel, and consumer product industries." },
      { q: "What is the difference between toll manufacturing and contract manufacturing?", a: "Toll Manufacturing: The hiring company supplies raw materials, and the manufacturer provides only production services. Contract Manufacturing: The manufacturer handles both sourcing raw materials and producing the finished goods. Contract manufacturing typically involves higher responsibility for the manufacturer." },
      { q: "Why is a written Manufacturing Contract essential?", a: "A written Manufacturing Contract protects both parties by clearly defining specifications, timelines, quality standards, payment terms, and intellectual property rights. It prevents disputes, reduces misunderstandings, and provides legal recourse if either party fails to perform." }
    ],
    keyProtections: [
      "Detailed product specifications and design documentation",
      "Production and delivery schedules with timeline commitments",
      "Quality control requirements and inspection procedures",
      "Pricing structure and payment terms arrangement",
      "Intellectual property protection and confidentiality clauses",
      "Liability limitations and indemnification provisions",
      "Raw materials sourcing and responsibility definition",
      "Production process standards and modification controls",
      "Order quantity commitments and minimum order requirements",
      "Dispute resolution and governing law provisions"
    ],
    whatYouNeed: [
      "Product specifications, design documents, and drawings",
      "Manufacturing timeline and production schedule",
      "Order quantities and delivery schedules",
      "Quality standards and inspection requirements",
      "Pricing structure and payment terms",
      "Raw materials sourcing arrangement and responsibility",
      "Intellectual property details and ownership rights",
      "Liability limits and insurance requirements",
      "Confidentiality and trade secrets protection requirements",
      "Dispute resolution method and governing jurisdiction"
    ],
    estimatedTime: "15-20 minutes"
  },

  // === MUSIC & LICENSING AGREEMENTS ===
  "Master Use License Agreement": {
    title: "Master Use License Agreement",
    otherNames: ["Music Use Licensing Agreement", "Master Use Licensing Contract", "Music License Agreement", "Sound Recording License", "Music Licensing Agreement"],
    whatIs: "A Master Use License Agreement is a legally binding contract that allows one party to use a sound recording owned by another party. This draft agreement is commonly used when music is incorporated into films, TV shows, advertisements, online content, or other creative productions. It clearly defines usage rights, ownership permissions, compensation terms, and restrictions to protect both the rights holder and the licensee while enabling legitimate use of the music.",
    whenToUse: [
      "You own a sound recording or music and want to license it for films, TV shows, or digital content",
      "You need a clear, written music licensing agreement draft that is legally binding and enforceable",
      "Multiple parties share ownership of the music and must approve usage",
      "You want to establish fair compensation and royalty terms for music usage"
    ],
    faqs: [
      { q: "What is a Master Use License Agreement?", a: "A Master Use License Agreement is a contract granting permission to use a specific sound recording in a project. It covers the right to use the actual recorded version of the music, distinct from the composition itself. It defines scope, territory, duration, and compensation for music usage." },
      { q: "Who needs a Master Use License Agreement?", a: "Record labels, music producers, independent artists, and sound recording owners use this agreement when licensing music. Filmmakers, producers, advertisers, and content creators use it when licensing music for their projects. Any legitimate music use typically requires this agreement." },
      { q: "What formats can be licensed under this agreement?", a: "Master Use License Agreements can cover films, television shows, commercials, online videos, podcasts, streaming content, video games, YouTube videos, social media content, and other digital or traditional media formats." },
      { q: "What rights does the licensee receive?", a: "The licensee receives the right to use the specific sound recording in the agreed-upon format and territory for a defined term. Rights typically include public performance, distribution, and synchronization for the specified purpose, but not ownership of the recording." },
      { q: "Can multiple parties own the master recording?", a: "Yes. When multiple parties own the recording, all owners must typically approve usage and licensing. The agreement should clearly identify all owners, their ownership percentages, and approval requirements. This prevents disputes and ensures proper compensation distribution." }
    ],
    keyProtections: [
      "Clear definition of scope of music usage (format, territory, duration)",
      "Public performance and distribution rights specification",
      "Compensation and royalty payment terms and schedule",
      "Screen credit and attribution provisions",
      "Ownership rights confirmation and approval requirements",
      "Representations and warranties from both parties",
      "Restrictions on sublicensing and derivative works",
      "Termination conditions and reversion of rights",
      "Quality control and modification approval clauses",
      "Dispute resolution and governing law provisions"
    ],
    whatYouNeed: [
      "Music title, artist name, and sound recording identification",
      "Rights holder or owner information and contact details",
      "Licensee name and intended use/project details",
      "Scope of usage (film, TV, online, commercial, etc.)",
      "Territory or geographic scope of licensing",
      "License term duration and any renewal conditions",
      "Compensation amount or royalty rate structure",
      "Payment schedule and invoicing information",
      "Screen credit/attribution requirements (if any)",
      "Multiple ownership details and approval process (if applicable)"
    ],
    estimatedTime: "15-20 minutes"
  },

  // === MUSIC LICENSING AGREEMENTS ===
  "Music License Agreement": {
    title: "Music License Agreement",
    otherNames: ["Music Licensing Agreement", "Music License Contract", "Music Rights Agreement", "Music Copyright License Agreement"],
    whatIs: "A Music License Agreement is a legally binding contract that grants permission to use music under defined terms and conditions. This agreement ensures that both the music owner and the user clearly understand their rights and obligations. If you are a musician, this agreement guarantees that you receive fair compensation when your work is used. If you are a producer or business, it ensures that you are legally authorized to use copyrighted music. Without a proper Music License Agreement, you risk copyright infringement issues, making this essential for protecting your interests.",
    whenToUse: [
      "You own music, songs, or audio content and want to license it",
      "You want legal permission to use music in films, ads, or media projects",
      "You are entering into a commercial agreement involving copyrighted music",
      "You need to define royalty payments and usage restrictions"
    ],
    faqs: [
      { q: "What is a Music License Agreement and why do I need one?", a: "A Music License Agreement is a legally binding contract that protects your music rights and defines usage terms. Without it, you risk copyright infringement issues. It ensure both parties understand their rights and obligations, preventing disputes and protecting fair compensation for music creators." },
      { q: "What types of royalties can be defined in the agreement?", a: "Music License Agreements can specify percentage-based royalties, fixed fees, custom payment terms, minimum guarantees, or combination structures. The agreement should clearly define calculation methods, reporting requirements, and payment schedules to ensure transparency and fair compensation." },
      { q: "How do I specify where and how the music can be used?", a: "Specify the permitted geographic territories, media formats (film, TV, streaming, radio, advertising, etc.), duration of use, and whether rights are exclusive or non-exclusive. You can also restrict modifications, sublicensing, and commercial or non-commercial use categories." },
      { q: "What must happen after the Music License Agreement is signed?", a: "After execution, both parties receive signed copies. The licensee receives permission to use music under agreed terms. The licensor retains ownership and can monitor compliance with usage restrictions, royalty payments, and reporting requirements throughout the agreement term." },
      { q: "Can licensing rights be transferred or sublicensed?", a: "This depends on agreement terms. Most licenses prohibit transfer or sublicensing without explicit licensor consent. If allowed, the agreement should specify approval procedures, whether the licensor receives additional fees, and that the original licensee remains responsible for sublicensee compliance." }
    ],
    keyProtections: [
      "Clear definition of permitted music usage and formats",
      "Geographic and territorial scope restrictions",
      "Duration and term of the licensing agreement",
      "Royalty and compensation payment terms",
      "Exclusive vs. non-exclusive usage rights",
      "Restrictions on modification or derivative works",
      "Sublicensing prohibition or approval procedures",
      "Ownership retention by the music creator",
      "Payment schedule and royalty reporting",
      "Termination and renewal provisions"
    ],
    whatYouNeed: [
      "Music title and artist/owner identification",
      "Music owner or copyright holder contact information",
      "Licensee name and business information",
      "Specific permitted uses and media formats",
      "Geographic territory for music usage rights",
      "License term and duration",
      "Royalty rate or flat fee structure",
      "Payment schedule and reporting requirements",
      "Exclusive or non-exclusive rights preference",
      "Any modification or sublicensing restrictions"
    ],
    estimatedTime: "15-20 minutes"
  },

  // === MUTUAL NDA ===
  "Mutual Non-Disclosure Agreement": {
    title: "Mutual Non-Disclosure Agreement",
    otherNames: ["Mutual Confidentiality Agreement", "Mutual NDA", "MNDA", "Bilateral NDA"],
    whatIs: "A Mutual Non-Disclosure Agreement (Mutual NDA) is a legally binding confidentiality agreement that enables two parties to share and receive sensitive or proprietary information securely. This agreement is ideal when both parties expect to exchange confidential data, such as trade secrets, business plans, financial details, or intellectual property. It clearly defines confidentiality obligations and protects information from unauthorized disclosure, giving both parties legal rights to take action in case of breach.",
    whenToUse: [
      "You are sharing confidential or proprietary information with another party",
      "You will receive sensitive information from another individual or organization",
      "You are entering into partnerships, vendor agreements, or consulting arrangements",
      "Both parties need mutual confidentiality protection during negotiations or collaborations"
    ],
    faqs: [
      { q: "Where can I get a free Mutual NDA?", a: "You can download a Mutual Non-Disclosure Agreement template from legal document providers instantly. Simply customize your draft agreement with party information and protected details, and your document will be ready in minutes without expensive attorney fees." },
      { q: "Do I need a lawyer to draft a Mutual NDA?", a: "Not necessarily. With professionally structured templates, you can create an enforceable Mutual NDA without high legal fees. However, consult a legal expert for particularly complex cases involving significant intellectual property or unique business situations." },
      { q: "What is the cost of a Mutual NDA?", a: "Hiring a lawyer may cost between $200-$1,000. Using professionally drafted templates, you can enjoy a free or low-cost download and save significantly while still maintaining legal enforceability and comprehensive protection." },
      { q: "What should I do after creating a Mutual NDA?", a: "After downloading your Mutual NDA, edit and review it for accuracy, then print or share it digitally with the other party. Both parties must sign the document electronically or physically, then each party should receive and securely store a signed copy for their records." },
      { q: "Does a Mutual NDA require notarization?", a: "No, notarization is generally not required for a Mutual NDA to be legally enforceable. A properly signed agreement between parties is sufficient. However, notarization can add an extra layer of authenticity and may be helpful in certain circumstances or jurisdictions." }
    ],
    keyProtections: [
      "Clear definition of confidential information by both parties",
      "Bilateral confidentiality obligations and restrictions",
      "Permitted and prohibited uses of shared information",
      "Duration and term of confidentiality obligations",
      "Exceptions to confidentiality (public domain, prior knowledge)",
      "Return or destruction of confidential materials",
      "Remedies for breach of confidentiality",
      "Non-compete and non-solicitation provisions",
      "Dispute resolution and governing law",
      "Equal protection for both parties' information"
    ],
    whatYouNeed: [
      "Names and legal information of both parties",
      "Description of confidential information shared",
      "Purpose of disclosure and information sharing",
      "Duration of confidentiality obligations",
      "Permitted business uses of shared information",
      "Whether agreement is exclusive or non-exclusive",
      "Return/destruction procedures for materials",
      "Remedies and enforcement procedures",
      "Authorized signatories for both parties",
      "Governing law and dispute resolution methods"
    ],
    estimatedTime: "15-20 minutes"
  },

  "nonCircumventionAgreement": {
    title: "Non-Circumvention Agreement",
    otherNames: ["Non-Circumvent Agreement", "Non-Compete Agreement", "Contact Protection Agreement", "Bypass Prevention Agreement"],
    whatIs: "A Non-Circumvention Agreement is a legally binding contract that prevents one party from bypassing another to directly engage with shared business contacts. This agreement ensures that confidential business relationships remain protected, the receiving party cannot circumvent or bypass the disclosing party, and any unauthorized dealings result in financial penalties or compensation. Once you execute a Non-Circumvention Agreement, you secure your business against unfair competition and unauthorized dealings while protecting valuable client relationships and business contacts.",
    whenToUse: [
      "You are working with another business in the same or similar industry and sharing contacts",
      "Your client list or business contacts are confidential and valuable",
      "You want to prevent third parties from bypassing your business relationships",
      "You are entering into partnerships, vendor agreements, or consulting relationships"
    ],
    faqs: [
      { q: "What is a Non-Circumvention, Non-Disclosure Agreement?", a: "It combines confidentiality and non-circumvention protections, ensuring that shared information and contacts are not disclosed or misused. It provides comprehensive protection for both confidential information and valuable business relationships." },
      { q: "Is a Non-Circumvention Agreement enforceable?", a: "In most jurisdictions, yes. However, enforceability may vary by region (certain restrictions may apply in states like California). Always review local laws before executing your Non-Circumvention Agreement." },
      { q: "What is a Non-Disclosure Clause?", a: "A non-disclosure clause prevents parties from sharing confidential information. It is often included within a Non-Circumvention Agreement for added protection of business secrets and contact information." },
      { q: "Do I need a lawyer to draft this agreement?", a: "Our professionally structured templates allow you to create an enforceable Non-Circumvention Agreement without expensive legal fees. However, consult an attorney for complex situations or significant business relationships." },
      { q: "How long should a Non-Circumvention period last?", a: "Typical periods range from 1-5 years after the business relationship ends, depending on industry standards and the sensitivity of the business contacts involved. Customize the duration based on your specific needs." }
    ],
    keyProtections: [
      "Prevents unauthorized bypass of business relationships",
      "Protects confidential client and contact information",
      "Establishes financial penalties for circumvention violations",
      "Enforces non-disclosure of shared business intelligence",
      "Protects against unfair competition"
    ],
    whatYouNeed: [
      "Names and business information of both parties",
      "Description of protected business relationships and contacts",
      "Definition of what constitutes circumvention",
      "Agreed-upon penalty or compensation amounts",
      "Duration of the non-circumvention obligation"
    ],
    estimatedTime: "15-20 minutes"
  },

  "Patent Assignment Agreement": {
    title: "Patent Assignment",
    otherNames: ["Patent Assignment Form", "Patent Assignment Contract", "Draft Patent Assignment Agreement", "Intellectual Property Assignment"],
    whatIs: "A Patent Assignment is a legally binding agreement that facilitates the transfer of ownership rights in a patent or patent application from one party to another. This agreement serves as a formal 'bill of sale' for intellectual property, ensuring that all rights, title, and interest in the patent are properly assigned and recorded. A Patent Assignment ensures legal clarity, enforceability, and protection of ownership interests when transferring patent rights whether the patent is registered or pending.",
    whenToUse: [
      "You are buying or selling a patent or patent application",
      "You need to add, remove, or update the name of a patent owner",
      "You are transferring rights between individuals, businesses, or partners",
      "You are formalizing ownership structure in a joint invention or business arrangement"
    ],
    faqs: [
      { q: "What is a Patent Assignment?", a: "A Patent Assignment is a formal legal document that transfers ownership rights in a patent or patent application from one party to another. It serves as a 'bill of sale' for intellectual property and ensures all rights, title, and interest are properly documented and recorded." },
      { q: "Why do I need a Patent Assignment?", a: "A Patent Assignment is essential whenever intellectual property rights are transferred, sold, or reassigned. Similar to transferring tangible assets, this document ensures all legal formalities are fulfilled before the transfer becomes effective and protects both parties' interests." },
      { q: "What rights are transferred in a Patent Assignment?", a: "A Patent Assignment can transfer all rights, title, and interest in the patent, including exclusive rights to use, sell, license, and enforce the patent. The assignment can be complete (full ownership transfer) or partial (retaining some rights)." },
      { q: "Can I assign partial rights to a patent?", a: "Yes. A Patent Assignment can be structured to transfer complete ownership or partial rights. You can retain certain rights while assigning others, or share ownership with co-inventors or partners as defined in the agreement." },
      { q: "Is a Patent Assignment recorded with the patent office?", a: "Patent assignments should be recorded with the appropriate patent office (USPTO in the US) to establish a clear chain of title and provide public notice of the ownership transfer. This recording provides legal protection and enforceability." }
    ],
    keyProtections: [
      "Formal transfer of patent ownership rights",
      "Clear documentation of all rights, title, and interest",
      "Legal enforceability of ownership transfer",
      "Protection of both assignor and assignee interests",
      "Proper recording capability with patent offices"
    ],
    whatYouNeed: [
      "Patent application or patent number and details",
      "Names and information of all parties involved",
      "Description of rights being transferred",
      "Consideration (payment or other value exchanged)",
      "Signatures of authorized representatives"
    ],
    estimatedTime: "15-20 minutes"
  },

  // === DEFAULT FALLBACK ===
  "default": {
    title: "Legal Document",
    whatIs: "This is a legal document that formalizes an agreement or declaration between parties. Legal documents provide clarity, establish rights and obligations, and serve as evidence in case of disputes. They are designed to protect all parties involved by clearly documenting terms and expectations.",
    whenToUse: [
      "You need a formal, written record of an agreement.",
      "You want legal protection and clarity.",
      "You need documentation for court or official purposes.",
      "You're entering into a business or personal arrangement."
    ],
    faqs: [
      { q: "Do I need a lawyer?", a: "Not always required, but consulting an attorney is recommended for complex matters or high-value transactions." },
      { q: "Is this legally binding?", a: "Yes, when properly executed. Signatures from all parties (and notarization when required) make documents enforceable." },
      { q: "How long should I keep this document?", a: "Keep important legal documents indefinitely or at least 7 years. Store copies in a safe place." }
    ],
    keyProtections: [
      "Clear documentation of terms",
      "Defined rights and obligations",
      "Evidence for potential disputes",
      "Legal enforceability"
    ],
    whatYouNeed: [
      "Names and information of all parties",
      "Specific terms of the agreement",
      "Signatures from all parties",
      "Witnesses or notarization (if required)"
    ],
    estimatedTime: "10-15 minutes"
  }
};

// ============================================================================
// HELPER FUNCTION TO GET CONTENT
// ============================================================================

export function getDocumentContent(title: string): DocumentContent {
  // Try exact match first
  if (documentContent[title]) {
    return documentContent[title];
  }
  
  // Try case-insensitive match
  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const [key, value] of Object.entries(documentContent)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalizedKey === normalizedTitle) {
      return value;
    }
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(documentContent)) {
    if (title.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(title.toLowerCase())) {
      return value;
    }
  }
  
  // Return default
  return {
    ...documentContent["default"],
    title: title
  };
}

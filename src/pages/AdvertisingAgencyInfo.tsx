import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

const AdvertisingAgencyInfo = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '48px 16px', backgroundColor: '#ffffff' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
            <FileText style={{ width: '32px', height: '32px', color: '#d97706' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '12px 0 0 0' }}>Advertising Agency Agreement</h1>
            <p style={{ color: '#4b5563', marginTop: '8px', margin: 0 }}>A legally binding contract defining the professional relationship between an advertising agency and its client</p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fef9e7', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #fde68a' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>What is an Advertising Agency Agreement?</h2>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          An Advertising Agency Agreement is a legally binding contract that defines the professional relationship between an advertising agency and its client. This agreement clearly outlines the scope of advertising and marketing services, timelines, fees, and responsibilities, ensuring transparency and mutual understanding from the start of the engagement.
        </p>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          A professionally prepared draft Advertising Agency Agreement is far more effective than a generic template. Using the best format of Advertising Agency Agreement helps protect both parties and reduces the risk of disputes related to performance, payments, or deliverables. In the event of disagreement, the agreement serves as a clear written record of the parties' intentions.
        </p>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>When Should You Use an Advertising Agency Agreement?</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            "When an advertising or creative agency secures a client for marketing, branding, or advertising services",
            "When a business hires an advertising agency to manage campaigns, promotions, or media planning",
            "When you want clarity regarding project deliverables and timelines",
            "When payment terms and fee structures need to be clearly defined",
            "When you need to establish creative control and approval processes"
          ].map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: '#d97706', fontWeight: 'bold', fontSize: '18px', marginTop: '4px' }}>•</span>
              <span style={{ color: '#374151' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>What Should an Advertising Agency Agreement Include?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Full Party Details</h3>
            <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
              Full name and address of both the client and the advertising agency, including contact information and business registration details.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Scope of Services</h3>
            <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
              Detailed description of advertising and marketing services to be provided, including specific deliverables, media channels, and campaign parameters.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Engagement Period</h3>
            <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
              Start date and end date of the agreement, including any renewal or termination conditions and notice periods required.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Fees and Billing</h3>
            <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
              Fees, billing terms, and payment schedule, including hourly rates, project-based fees, or retainers, and expense reimbursement policies.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Dispute Resolution and Additional Clauses</h3>
            <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
              Standard clauses covering the independent contractor relationship, dispute resolution, indemnity, intellectual property ownership, confidentiality, and governing law.
            </p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fef3c7', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #fde68a' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Key Protections</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {[
            "Identifies client, agency, and all services included",
            "Specifies fees, billing terms, and payment schedule",
            "Defines scope of work and deliverables",
            "Includes timelines and project deadlines",
            "Establishes approval and feedback processes",
            "Discloses performance expectations and metrics",
            "Clarifies intellectual property ownership",
            "Protects both parties from misunderstandings",
            "Legally enforceable and binding",
            "Reduces disputes over performance or payments"
          ].map((protection, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px' }}>
              <span style={{ color: '#d97706', fontWeight: 'bold', fontSize: '18px', marginTop: '2px' }}>✓</span>
              <span style={{ color: '#374151' }}>{protection}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Why Use a Draft Advertising Agency Agreement?</h2>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          Whether you are an experienced agency or new to the industry, using a draft Advertising Agency Agreement is essential. It provides several important benefits:
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            "Clear understanding of the duration of the engagement",
            "Defined roles and responsibilities for both the agency and the client",
            "Transparency regarding invoicing schedules and payment terms",
            "Legal protection in case of disputes or miscommunication",
            "Professional framework for successful collaboration"
          ].map((benefit, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: '#d97706', fontWeight: 'bold', fontSize: '18px', marginTop: '4px' }}>•</span>
              <span style={{ color: '#374151' }}>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              q: "Why Use a Draft Advertising Agency Agreement?",
              a: "Without a written agreement, parties often face late or unpaid invoices and miscommunication regarding project scope and expectations. A professional agreement provides clarity, accountability, and legal protection for both the agency and the client."
            },
            {
              q: "What Should an Advertising Agency Agreement Include?",
              a: "A properly structured agreement should include full party names and addresses, detailed description of services, start and end dates, fees and billing terms, payment schedules, and standard clauses covering independent contractor status, dispute resolution, indemnity, intellectual property, and governing law."
            },
            {
              q: "Where Can I Create an Advertising Agency Agreement for Free?",
              a: "You can free download Advertising Agency Agreement templates directly from our platform. Our agreements are prepared in a professional and legally sound format and are easy to customize. Similar agreements prepared by traditional law firms often cost hundreds of dollars."
            },
            {
              q: "What Should I Do After Creating an Advertising Agency Agreement?",
              a: "Once completed, your agreement can be downloaded in PDF or Word format, printed, and signed electronically. After execution, a fully signed copy should always be provided to the client for record-keeping and legal certainty."
            },
            {
              q: "Can a Lawyer Review My Advertising Agency Agreement?",
              a: "Independent legal reviews can be time-consuming and costly. A more convenient option is to seek professional review through our legal support services. With appropriate membership, you can consult an experienced attorney to review your agreement or answer related questions."
            },
            {
              q: "What Happens Without a Written Advertising Agency Agreement?",
              a: "Without a written agreement, parties often face disputes over deliverables, timelines, payment terms, and intellectual property ownership. A professional agreement prevents misunderstandings and provides legal recourse in case of disagreements."
            }
          ].map((faq, index) => (
            <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  backgroundColor: '#f9fafb',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
              >
                <span style={{ fontWeight: 600, color: '#111827' }}>{faq.q}</span>
                {expandedFAQ === index ? (
                  <ChevronUp style={{ width: '20px', height: '20px', color: '#d97706' }} />
                ) : (
                  <ChevronDown style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
                )}
              </button>
              {expandedFAQ === index && (
                <div style={{ padding: '16px 24px', backgroundColor: '#ffffff', borderTop: '1px solid #f3f4f6' }}>
                  <p style={{ color: '#374151', margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#e0f2fe', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #bae6fd' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0c4a6e', marginBottom: '16px' }}>Download Advertising Agency Agreement</h2>
        <p style={{ color: '#0369a1', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          You can now download Advertising Agency Agreement in the best format directly from our website. Our templates are prepared in a professional, legally sound format and are easy to customize for your specific needs.
        </p>
        <p style={{ color: '#0369a1', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          Given the level of personalization, similar agreements prepared by traditional law firms often cost hundreds of dollars. Our free download Advertising Agency Agreement helps you save time and legal expenses while ensuring accuracy and compliance.
        </p>
        <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '6px', border: '1px solid #7dd3fc' }}>
          <p style={{ color: '#0369a1', margin: 0, fontWeight: 600 }}>👉 Ready to create your Advertising Agency Agreement? Click the button below to get started!</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#fef3c7', borderRadius: '8px', padding: '24px', marginBottom: '32px', borderLeft: '4px solid #f59e0b' }}>
        <p style={{ fontSize: '14px', color: '#78350f', margin: 0 }}>
          <span style={{ fontWeight: 600 }}>Legal Disclaimer:</span> This information is provided for educational purposes only and should not be considered as legal advice. Advertising Agency Agreements may have different requirements based on jurisdiction and industry standards. Please consult with a legal professional for guidance.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <button 
          onClick={() => navigate("/advertising-agency-agreement-form")}
          style={{
            backgroundColor: '#d97706',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: '8px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b45309')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d97706')}
        >
          Create Advertising Agency Agreement
        </button>
        <button 
          onClick={() => navigate("/documents")}
          style={{
            backgroundColor: '#ffffff',
            color: '#111827',
            padding: '12px 32px',
            borderRadius: '8px',
            fontWeight: 600,
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
        >
          Back to Documents
        </button>
      </div>
    </div>
  );
};

export default AdvertisingAgencyInfo;

import React, { useState } from "react";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContractExtensionInfo: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '48px 16px', backgroundColor: '#ffffff' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
            <FileText style={{ width: '32px', height: '32px', color: '#2563eb' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '12px 0 0 0' }}>Contract Extension Agreement</h1>
            <p style={{ color: '#4b5563', marginTop: '8px', margin: 0 }}>Also known as: Contract Extension Letter, Extension of Contract Agreement</p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #bfdbfe' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>What is a Contract Extension Agreement?</h2>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          A Contract Extension Agreement is a legally binding document used when the parties to an existing contract wish to continue their relationship beyond the original expiration date. Instead of drafting a completely new contract, this agreement allows the parties to extend the term of the original contract while keeping all other provisions in effect, unless specifically amended.
        </p>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
          Using the best format of Contract Extension Agreement makes the extension process simple and efficient. A properly drafted Contract Extension Agreement allows the parties to move forward without interruption while maintaining legal certainty and clarity.
        </p>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>When Should You Use a Contract Extension Agreement?</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            "When an existing contract is nearing its expiration and the parties wish to extend it beyond the original end date",
            "When the parties want to set a new termination date and make limited revisions to the original agreement",
            "When the parties are satisfied with the original contract terms and only need to extend the duration",
            "When it's more practical than preparing a new contract or an additional amendment",
            "When you want to maintain legal certainty and clarity in extending the relationship",
            "When multiple parties need to formally document the extension of an existing agreement"
          ].map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '18px', marginTop: '4px' }}>•</span>
              <span style={{ color: '#374151' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>What Should a Draft Contract Extension Agreement Include?</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '24px' }}>
          {[
            "The effective date of the Contract Extension Agreement",
            "The full names, addresses, and authorized signatories of all parties",
            "The title and date of the original contract",
            "The original end date of the contract",
            "The new extended termination date",
            "Any specific amendments to the original contract provisions, clearly identifying what is added, modified, or deleted"
          ].map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '18px', marginTop: '4px' }}>•</span>
              <span style={{ color: '#374151' }}>{item}</span>
            </li>
          ))}
        </ul>
        <p style={{ color: '#374151', fontSize: '14px', fontStyle: 'italic', margin: 0 }}>
          For clarity and record-keeping, parties may also attach a copy of the original contract to the draft Contract Extension Agreement to show all changes in context.
        </p>
      </div>

      <div style={{ backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #bbf7d0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Key Legal Protections</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {[
            "Clearly identifies the original contract and all parties",
            "Specifies the new extended termination date",
            "Maintains all original contract provisions unless specifically amended",
            "Outlines any amendments or changes to original terms",
            "Ensures legal enforceability of the extension",
            "Protects interests of all parties",
            "Provides continuity and certainty in the business relationship",
            "Includes authorized signatories and effective date",
            "Documents all changes in context",
            "Legally binding once signed by all parties"
          ].map((protection, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px' }}>
              <span style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '18px', marginTop: '2px' }}>✓</span>
              <span style={{ color: '#374151' }}>{protection}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              q: "What is a Contract Extension Agreement?",
              a: "A Contract Extension Agreement is a legally binding document used when the parties to an existing contract wish to continue their relationship beyond the original expiration date. It makes the extension process simple and efficient while maintaining legal certainty."
            },
            {
              q: "What should a Contract Extension Agreement include?",
              a: "A well-structured Contract Extension Agreement should clearly set out the effective date, full names and addresses of all parties, the title and date of the original contract, the original end date, the new extended termination date, and any specific amendments to the original contract provisions."
            },
            {
              q: "When should I use a Contract Extension Agreement?",
              a: "You should use this agreement when an existing contract is nearing expiration and the parties wish to extend it, or when the parties want to set a new termination date and make limited revisions. It's more practical than preparing a new contract."
            },
            {
              q: "Is a Contract Extension Agreement legally binding?",
              a: "Yes. When properly completed and signed by all parties, a Contract Extension Agreement is legally binding and enforceable. This agreement has been customized over 60,700 times."
            },
            {
              q: "What's the difference between a Contract Extension and an Amendment?",
              a: "A Contract Extension extends the term of an existing contract while keeping existing provisions intact. An amendment modifies specific terms within the existing contract. Both serve different purposes."
            },
            {
              q: "Can I download a Contract Extension Agreement template?",
              a: "Yes. You can download Contract Extension Agreement in a professional customizable format. It can be signed online for free and is suitable for businesses, professionals, and individuals."
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
                  <ChevronUp style={{ width: '20px', height: '20px', color: '#2563eb' }} />
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

      <div style={{ backgroundColor: '#fef3c7', borderRadius: '8px', padding: '24px', marginBottom: '32px', borderLeft: '4px solid #f59e0b' }}>
        <p style={{ fontSize: '14px', color: '#78350f', margin: 0 }}>
          <span style={{ fontWeight: 600 }}>Legal Disclaimer:</span> This information is provided for educational purposes only and should not be considered as legal advice. Contract Extension Agreements may have different requirements based on the original contract and jurisdiction. Consult a legal professional for guidance.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <button 
          onClick={() => navigate("/contract-extension-form")}
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: '8px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          Create Contract Extension Agreement
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

export default ContractExtensionInfo;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MergerAgreementInfo = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is a Merger Agreement?",
      a: "A Merger Agreement is a legally binding contract used when two companies decide to combine into a single business entity. It defines the structure, process, and legal framework of the merger, outlines how one company will be dissolved into the other, and specifies whether the surviving entity will continue under an existing name or adopt a new one."
    },
    {
      q: "What does a draft Merger Agreement cover?",
      a: "A comprehensive Merger Agreement covers: a complete accounting of each company's assets and liabilities, valuation of shares and ownership interests under the new or surviving entity, rules governing daily business operations during the merger process, limitations on entering new contracts during the transition period, and procedures for forming a new board of directors and appointing its members."
    },
    {
      q: "When should I use a Merger Agreement?",
      a: "You should use a Merger Agreement when you intend to merge another company into your business as the surviving entity, or when you have agreed to dissolve your business into another company through a merger. In both cases, using a written agreement is essential to protect business interests and ensure a seamless transition."
    },
    {
      q: "Why use a draft Merger Agreement?",
      a: "A properly drafted Merger Agreement helps manage operational challenges and ensures smooth integration of both businesses. Given the complexity of mergers, having a well-structured agreement is essential. The agreement has been customized thousands of times, reflecting its reliability and widespread use. When properly completed and signed, it is legally binding and enforceable."
    },
    {
      q: "Can I get professional review of my Merger Agreement?",
      a: "Yes. Given the complexity and high-value nature of mergers, parties may consult legal professionals to request a professional review of the agreement before finalizing it. Legal experts can ensure compliance with state laws and that all necessary provisions are included."
    },
    {
      q: "How do I download and use a Merger Agreement?",
      a: "You can download a Merger Agreement in a professional and customizable format. The template follows the best format of Merger Agreement and can be edited, customized, printed, and signed online for convenience. Simply complete the agreement with your specific transaction details, review for accuracy, and execute with all parties."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '12px',
          color: '#1f2937'
        }}>
          Merger Agreement
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Legally binding contract for combining two companies into a single business entity
        </p>

        {/* Definition Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#1f2937'
          }}>What Is a Merger Agreement?</h2>
          <p style={{
            fontSize: '15px',
            color: '#4b5563',
            lineHeight: '1.7',
            marginBottom: '12px'
          }}>
            A Merger Agreement is a legally binding contract used when two companies decide to combine into a single business entity. Whether one company is absorbed into another or both businesses unite to form a new organization, this agreement defines the structure, process, and legal framework of the merger.
          </p>
          <p style={{
            fontSize: '15px',
            color: '#4b5563',
            lineHeight: '1.7',
            marginBottom: '12px'
          }}>
            A properly drafted Merger Agreement outlines how one company will be dissolved into the other and whether the surviving entity will continue under an existing name or adopt a new one. Mergers commonly occur between competing businesses seeking to strengthen market position, when one company acquires another, or when a financially struggling business merges with a more stable organization.
          </p>
          <p style={{
            fontSize: '15px',
            color: '#4b5563',
            lineHeight: '1.7'
          }}>
            Using the best format of Merger Agreement ensures clarity and legal certainty throughout the transition period.
          </p>
        </div>

        {/* What It Covers */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#1f2937'
          }}>What Does a Draft Merger Agreement Cover?</h2>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            {[
              'Complete accounting of each company\'s assets and liabilities',
              'Valuation of shares and ownership interests under the new or surviving entity',
              'Rules governing daily business operations during the merger process',
              'Limitations on entering new contracts during the transition period',
              'Procedures for forming a new board of directors and appointing its members',
              'Definition of surviving entity and post-merger structure',
              'Tax consequences and treatment specification',
              'Employee and contractor transition procedures',
              'Representations and warranties of both parties',
              'Dispute resolution and governing law provisions'
            ].map((item, index) => (
              <li key={index} style={{
                fontSize: '15px',
                color: '#4b5563',
                marginBottom: '12px',
                paddingLeft: '24px',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#d97706',
                  fontWeight: 'bold'
                }}>•</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{
            fontSize: '15px',
            color: '#4b5563',
            lineHeight: '1.7',
            marginTop: '16px'
          }}>
            Because no two mergers are the same, a well-structured Merger Agreement helps manage operational challenges and ensures a smooth integration of both businesses.
          </p>
        </div>

        {/* When to Use */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#1f2937'
          }}>When Should You Use a Merger Agreement?</h2>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            {[
              'When you intend to merge another company into your business as the surviving entity to enhance market position',
              'When you have agreed to dissolve your business into another company through a merger',
              'When you need to clearly define the structure, process, and legal framework of the merger',
              'When you want protection for business interests and a seamless transition',
              'When you need to account for assets, liabilities, and establish governance during the transition'
            ].map((item, index) => (
              <li key={index} style={{
                fontSize: '15px',
                color: '#4b5563',
                marginBottom: '12px',
                paddingLeft: '24px',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#d97706',
                  fontWeight: 'bold'
                }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Why Use It */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#1f2937'
          }}>Why Use a Draft Merger Agreement?</h2>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            {[
              'Reliable and trusted - customized over 20,700 times reflecting widespread use',
              'Manages complexity - addresses complex integration issues and allocates risk clearly',
              'Clear valuation - ensures transparent methods and ownership allocations',
              'Governance planning - documents board formation and post-merger structure',
              'Legally binding - when properly executed, it is enforceable in court'
            ].map((item, index) => (
              <li key={index} style={{
                fontSize: '15px',
                color: '#4b5563',
                marginBottom: '12px',
                paddingLeft: '24px',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#d97706',
                  fontWeight: 'bold'
                }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#1f2937'
          }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: expandedFaq === index ? '#fef3c7' : '#f9fafb',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#1f2937',
                    textAlign: 'left'
                  }}
                >
                  <span>{faq.q}</span>
                  {expandedFaq === index ? (
                    <ChevronUp size={20} style={{ color: '#d97706', flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={20} style={{ color: '#d97706', flexShrink: 0 }} />
                  )}
                </button>
                {expandedFaq === index && (
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#fafbfc',
                    borderTop: '1px solid #e5e7eb',
                    fontSize: '15px',
                    color: '#4b5563',
                    lineHeight: '1.6'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div style={{
          backgroundColor: '#fffbeb',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '24px',
          border: '1px solid #fcd34d'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#92400e'
          }}>Download Merger Agreement</h2>
          <p style={{
            fontSize: '14px',
            color: '#b45309',
            marginBottom: '16px',
            lineHeight: '1.6'
          }}>
            Get your free Merger Agreement template in professional format. Download in PDF or Word, customize to your specific merger details, and start preparing for your transaction today. Professional format and legally sound template ready for immediate use.
          </p>
          <button
            onClick={() => navigate('/merger-agreement-form')}
            style={{
              backgroundColor: '#d97706',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px'
            }}
          >
            Download Now
          </button>
        </div>

        {/* Legal Disclaimer */}
        <div style={{
          backgroundColor: '#f3f4f6',
          padding: '20px',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#6b7280',
          lineHeight: '1.6',
          borderLeft: '4px solid #d97706'
        }}>
          <p style={{ margin: '0', fontWeight: '600', marginBottom: '8px' }}>Legal Disclaimer:</p>
          <p style={{ margin: '0' }}>
            This template is provided for informational purposes. Mergers involve complex legal, tax, and regulatory considerations. For complex transactions or jurisdiction-specific concerns, consult with qualified legal and financial professionals to ensure the agreement complies with all applicable laws and includes all necessary provisions for your specific situation.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate('/merger-agreement-form')}
            style={{
              backgroundColor: '#d97706',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px'
            }}
          >
            Create Agreement
          </button>
          <button
            onClick={() => navigate('/documents')}
            style={{
              backgroundColor: 'white',
              color: '#d97706',
              padding: '12px 28px',
              borderRadius: '6px',
              border: '2px solid #d97706',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px'
            }}
          >
            Back to Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default MergerAgreementInfo;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AdministrativeServicesInfo = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "When should I use an Administrative Services Agreement?",
      a: "You should use an Administrative Services Agreement when providing administrative services as an independent contractor, or when hiring an independent contractor to perform administrative or back-office services. Having a written agreement is essential for defining responsibilities and protecting both parties."
    },
    {
      q: "Do administrative professionals need an Administrative Services Agreement?",
      a: "Yes, even if administrative services are not your full-time profession, documenting your arrangement is crucial. A written agreement helps prevent misunderstandings by clearly defining roles and responsibilities, providing a transparent payment structure and schedule, and ensuring certainty regarding the duration of engagement."
    },
    {
      q: "What should a draft Administrative Services Agreement include?",
      a: "A comprehensive agreement should cover: full contact information of the client, a clear description of the administrative services to be provided, the start date and end date of the engagement, agreed fees, payment method and payment schedule, independent contractor relationship clarification, confidentiality obligations, dispute resolution mechanisms, indemnification, limitation of liability, and the governing jurisdiction."
    },
    {
      q: "Where can I create an Administrative Services Agreement for free?",
      a: "You can download Administrative Services Agreement templates from legal document platforms. These templates are prepared in professional and legally sound formats and guide you step-by-step through completion. A professionally drafted template saves you time and legal expense compared to hiring a lawyer, which often costs hundreds of dollars."
    },
    {
      q: "What should I do after creating my Administrative Services Agreement?",
      a: "Once finalized, edit the document as needed, download it in PDF or Word format, print it, and sign it electronically. After execution, always share a fully signed copy with the client for record-keeping and future reference."
    },
    {
      q: "Can a lawyer review my Administrative Services Agreement?",
      a: "Yes. While many lawyers prefer not to review documents they didn't draft, you can seek professional review through legal support services or law firm review programs. With appropriate memberships, you can consult an experienced lawyer to review your agreement or answer any related legal questions."
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
          Administrative Services Agreement
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Professional relationship agreement covering administrative services provision
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
          }}>What Is an Administrative Services Agreement?</h2>
          <p style={{
            fontSize: '15px',
            color: '#4b5563',
            lineHeight: '1.7',
            marginBottom: '12px'
          }}>
            An Administrative Services Agreement is a legally binding contract that governs the provision of administrative services between an administrative professional and a client. This agreement clearly defines the scope of services, duties, timelines, and payment terms, helping both parties establish expectations from the very beginning of their professional relationship.
          </p>
          <p style={{
            fontSize: '15px',
            color: '#4b5563',
            lineHeight: '1.7',
            marginBottom: '12px'
          }}>
            Unlike a basic administrative assistant template, a properly drafted Administrative Services Agreement offers stronger legal protection. A well-structured agreement safeguards the rights of both parties and reduces the risk of disputes. If questions arise regarding performance or payment, the agreement serves as a reliable written record.
          </p>
          <p style={{
            fontSize: '15px',
            color: '#4b5563',
            lineHeight: '1.7'
          }}>
            Using the best format of Administrative Services Agreement ensures clarity, professionalism, and enforceability throughout the engagement.
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
          }}>When Should You Use This Agreement?</h2>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            {[
              'When you are providing administrative services to a company as an independent contractor',
              'When you are hiring an independent contractor to perform administrative or back-office services',
              'When you need to clearly define responsibilities and protect both parties',
              'When establishing payment terms, schedules, and service expectations',
              'When you want to prevent misunderstandings and document the professional relationship'
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
          }}>What Should It Include?</h2>
          <p style={{
            fontSize: '15px',
            color: '#4b5563',
            marginBottom: '12px',
            lineHeight: '1.7'
          }}>A comprehensive draft Administrative Services Agreement should cover:</p>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            {[
              'Full contact information of the client and service provider',
              'Clear description of administrative services to be provided',
              'Start date and end date of the engagement',
              'Agreed fees, payment method, and payment schedule',
              'Independent contractor relationship clarification',
              'Confidentiality obligations and limitations',
              'Dispute resolution mechanisms',
              'Indemnification and limitation of liability clauses',
              'Termination conditions and notice requirements',
              'Governing jurisdiction and applicable law'
            ].map((item, index) => (
              <li key={index} style={{
                fontSize: '15px',
                color: '#4b5563',
                marginBottom: '10px',
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

        {/* Key Benefits */}
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
          }}>Why Use an Administrative Services Agreement?</h2>
          <ul style={{
            listStyle: 'none',
            padding: 0
          }}>
            {[
              'Clearly defined roles and responsibilities',
              'Transparent payment structure and schedule',
              'Certainty regarding the duration of the engagement',
              'Prevention of disputes over deliverables and expectations',
              'Professional documentation of the working relationship'
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
          }}>Download Administrative Services Agreement</h2>
          <p style={{
            fontSize: '14px',
            color: '#b45309',
            marginBottom: '16px',
            lineHeight: '1.6'
          }}>
            Get your free Administrative Services Agreement template in professional format. Download in PDF or Word, customize to your needs, and start protecting your administrative services arrangement today. No hidden fees, no legal jargon—just straightforward legal protection.
          </p>
          <button
            onClick={() => navigate('/administrative-services-form')}
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
            This template is provided for informational purposes. Requirements and best practices vary by jurisdiction and individual circumstances. For complex administrative arrangements or jurisdiction-specific concerns, consult with a qualified attorney to ensure the agreement complies with all applicable laws and includes necessary provisions for your specific situation.
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
            onClick={() => navigate('/administrative-services-form')}
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

export default AdministrativeServicesInfo;

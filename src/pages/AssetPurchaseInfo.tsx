import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

const AssetPurchaseInfo = () => {
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
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '12px 0 0 0' }}>Asset Purchase Agreement</h1>
            <p style={{ color: '#4b5563', marginTop: '8px', margin: 0 }}>Also known as: APA, Asset Sale and Purchase Agreement, Business Asset Purchase Agreement, Asset Acquisition Agreement</p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fef9e7', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #fde68a' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>What is an Asset Purchase Agreement?</h2>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          An Asset Purchase Agreement (commonly referred to as an APA) is a legally binding contract used to record the terms and conditions under which one business purchases specific assets from another business. This agreement provides legal clarity for both parties by clearly identifying what is being sold, how much is being paid, and the conditions governing the transaction.
        </p>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          A properly drafted Asset Purchase Agreement protects both buyers and sellers. Buyers gain certainty regarding the assets they are acquiring, while sellers retain a clear written record of the sale. Using the best format of Asset Purchase Agreement ensures the transaction is enforceable and minimizes the risk of disputes.
        </p>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
          A draft Asset Purchase Agreement typically covers the sale of both tangible assets, such as equipment, inventory, vehicles, furniture, or real estate, and intangible assets, including business names, customer databases, contracts, trademarks, goodwill, and other intellectual property.
        </p>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>When Should You Use an Asset Purchase Agreement?</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            "When purchasing the assets of an existing business and you want all terms and conditions documented in writing",
            "When selling business assets and you need a clear, legally sound agreement defining the sale",
            "When you want transparency and accountability for both parties",
            "When legal protection is necessary to prevent disputes and misunderstandings",
            "When you need to define what assets are included in the transaction",
            "When you want to specify the purchase price, payment terms, and closing date"
          ].map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: '#d97706', fontWeight: 'bold', fontSize: '18px', marginTop: '4px' }}>•</span>
              <span style={{ color: '#374151' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>What Does a Draft Asset Purchase Agreement Cover?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Inventory of Assets</h3>
            <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
              The agreement includes a detailed inventory identifying the assets being sold. This may cover tangible assets such as machinery, equipment, inventory, vehicles, and real estate, as well as intangible assets like trademarks, patents, customer lists, goodwill, and contracts.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Representations and Warranties</h3>
            <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
              The seller provides representations and warranties confirming ownership, condition, and legal compliance of the assets. These provisions also disclose any known defects, liabilities, or issues related to the assets.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Governing Law</h3>
            <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
              The agreement specifies the governing law or jurisdiction that will apply. The selected jurisdiction typically has a direct connection to one or both parties, such as the place of business or registration.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Books and Accounts</h3>
            <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
              The buyer is entitled to inspect the seller's books and accounts on an agreed date. The seller confirms that these records accurately reflect the financial affairs of the business and include a complete record of its assets.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Closing and Escrow</h3>
            <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
              The agreement sets out the closing date and time, at which point ownership of the assets is transferred. Time is of the essence, and closing must occur by the agreed deadline. The parties may appoint a title company or escrow agent to facilitate the transaction. All required documents and contractual conditions must be satisfied prior to closing.
            </p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fef3c7', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #fde68a' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Key Legal Protections</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {[
            "Identifies buyer, seller, and all assets included",
            "Specifies the purchase price and payment terms",
            "Defines closing date and transfer of ownership",
            "Includes representations and warranties from seller",
            "Discloses known defects and liabilities",
            "Establishes governing law and jurisdiction",
            "Allows buyer to inspect books and accounts",
            "Protects both parties from legal disputes",
            "Legally enforceable and binding",
            "Minimizes transaction risk and misunderstandings"
          ].map((protection, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px' }}>
              <span style={{ color: '#d97706', fontWeight: 'bold', fontSize: '18px', marginTop: '2px' }}>✓</span>
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
              q: "What is an Asset Purchase Agreement?",
              a: "An Asset Purchase Agreement (APA) is a legally binding contract used to record the terms and conditions under which one business purchases specific assets from another business. It provides legal clarity by identifying what is being sold, how much is being paid, and the conditions governing the transaction. A properly drafted APA protects both buyers and sellers."
            },
            {
              q: "When should I use an Asset Purchase Agreement?",
              a: "You should use an Asset Purchase Agreement when purchasing or selling business assets and want all terms and conditions documented in writing. It's essential when you need transparency, accountability, and legal protection for both parties. A written agreement ensures that disputes are minimized and both parties understand their obligations."
            },
            {
              q: "What assets can be included in an Asset Purchase Agreement?",
              a: "An Asset Purchase Agreement can cover both tangible assets (machinery, equipment, inventory, vehicles, real estate) and intangible assets (business names, customer databases, contracts, trademarks, goodwill, and other intellectual property). The agreement includes a detailed inventory of all assets being transferred."
            },
            {
              q: "What does the seller warrant in an Asset Purchase Agreement?",
              a: "The seller provides representations and warranties confirming ownership, condition, and legal compliance of the assets. These provisions disclose any known defects, liabilities, or issues related to the assets. The seller also guarantees that the books and accounts accurately reflect the financial affairs of the business."
            },
            {
              q: "What happens at closing?",
              a: "At closing, ownership of the assets is transferred from the seller to the buyer. The agreed closing date and time are specified in the agreement, and time is of the essence. The parties may appoint a title company or escrow agent to facilitate the transaction. All required documents and contractual conditions must be satisfied prior to closing."
            },
            {
              q: "Can I customize an Asset Purchase Agreement?",
              a: "Yes. You can download Asset Purchase Agreement templates from our platform and customize them for your specific transaction. The templates are prepared in a professional, legally sound format and are easy to modify. This allows you to save time and legal costs while ensuring compliance and accuracy."
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
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0c4a6e', marginBottom: '16px' }}>Download Asset Purchase Agreement</h2>
        <p style={{ color: '#0369a1', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          You do not need to draft your agreement from scratch. You can download Asset Purchase Agreement templates directly from our platform. This free download Asset Purchase Agreement is prepared in a professional, legally sound format and is easy to customize for your transaction.
        </p>
        <p style={{ color: '#0369a1', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          The Asset Purchase Agreement template follows the best format and helps you save time and legal costs while ensuring compliance and accuracy. Simply customize the template with your specific transaction details and you're ready to go.
        </p>
        <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '6px', border: '1px solid #7dd3fc' }}>
          <p style={{ color: '#0369a1', margin: 0, fontWeight: 600 }}>👉 Ready to create your Asset Purchase Agreement? Click the button below to get started!</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#fef3c7', borderRadius: '8px', padding: '24px', marginBottom: '32px', borderLeft: '4px solid #f59e0b' }}>
        <p style={{ fontSize: '14px', color: '#78350f', margin: 0 }}>
          <span style={{ fontWeight: 600 }}>Legal Disclaimer:</span> This information is provided for educational purposes only and should not be considered as legal advice. Asset Purchase Agreements may have different requirements based on jurisdiction and the nature of the assets. Please consult with a legal professional for guidance.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <button 
          onClick={() => navigate("/asset-purchase-form")}
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
          Create Asset Purchase Agreement
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

export default AssetPurchaseInfo;

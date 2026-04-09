import React, { useState } from "react";
import { Building2, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VehicleLeaseInfo: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  const doc = {
    title: "Vehicle Lease Agreement",
    otherNames: [
      "Car Lease Agreement",
      "Auto Lease Agreement",
      "Vehicle Rental Agreement",
    ],
    whatIs:
      "A Vehicle Lease Agreement is a legally binding contract between a vehicle owner or leasing company (the Lessor) and an individual or business (the Lessee) who leases the vehicle. This Vehicle Lease Agreement clearly defines the rights, duties, and obligations of both parties throughout the lease term, helping to prevent disputes and misunderstandings.\n\nThis draft Vehicle Lease Agreement sets out the essential terms of leasing a car, truck, or SUV, including lease duration, payment structure, permitted use, insurance requirements, mileage limits, and end-of-term responsibilities. Using the best format of Vehicle Lease Agreement ensures legal clarity and enforceability under applicable law.",
    whenToUse: [
      "You want to lease a vehicle without going through a dealership",
      "You need a clear written record of lease terms and payments",
      "You want legal protection for both lessor and lessee",
      "You want a professional Vehicle Lease Agreement that is easy to download and use",
      "You need to define insurance, taxes, fees, and maintenance obligations",
      "You want to establish mileage limits and excessive wear terms",
    ],
    faqs: [
      {
        q: "What is a Vehicle Lease Agreement?",
        a: "A Vehicle Lease Agreement is a legally binding contract between a vehicle owner or leasing company (the Lessor) and an individual or business (the Lessee) who leases the vehicle. This agreement clearly defines the rights, duties, and obligations of both parties throughout the lease term, helping to prevent disputes and misunderstandings. It sets out essential terms including lease duration, payment structure, permitted use, insurance requirements, mileage limits, and end-of-term responsibilities.",
      },
      {
        q: "Why should I use a Vehicle Lease Agreement?",
        a: "Signing a properly drafted Vehicle Lease Agreement helps both parties avoid future conflicts by clearly recording the agreed terms in writing. Whether you are leasing a vehicle privately or outside a dealership, this agreement provides a simple, reliable, and professional legal framework. With a well-structured agreement, you can access a professional Vehicle Lease Agreement that is easy to customize and suitable for personal or business use.",
      },
      {
        q: "Is a Vehicle Lease Agreement legally binding?",
        a: "Yes. Like any contract, a Vehicle Lease Agreement becomes legally binding once all parties sign it. Using a well-structured draft Vehicle Lease Agreement helps ensure enforceability under state law and reduces legal risk. The agreement is suitable for online signing and provides legal protection for both lessor and lessee.",
      },
      {
        q: "What information is included in a Vehicle Lease Agreement?",
        a: "A comprehensive Vehicle Lease Agreement template typically includes: vehicle description and identification details; lease term and monthly payment amount; residual value and end-of-lease liability; insurance and maintenance requirements; default, termination, and dispute resolution clauses; mileage limits and excessive wear terms; and governing law, arbitration, and indemnification clauses. All essential legal provisions are included to ensure completeness.",
      },
      {
        q: "When should I use a Vehicle Lease Agreement?",
        a: "You should use a Vehicle Lease Agreement if you want to lease a vehicle without going through a dealership; need a clear written record of lease terms and payments; want legal protection for both lessor and lessee; or need a professional agreement that is easy to download and use. This agreement is suitable for personal or business vehicle leasing situations.",
      },
      {
        q: "What are the steps to create a Vehicle Lease Agreement?",
        a: "The process is simple: First, make the document by customizing your Vehicle Lease Agreement by answering simple questions and save anytime. Second, review the agreement to ensure terms accurately reflect your understanding before signing. Third, sign the agreement - both lessor and lessee must sign with electronic signing supported. Finally, download and share - everyone receives a copy and can securely download the agreement from your account.",
      },
    ],
    keyProtections: [
      "Clearly identifies the leased vehicle and its specifications",
      "Defines lease payments, lease term, and total lease cost",
      "Covers insurance, taxes, fees, and maintenance obligations",
      "Explains mileage limits, excessive wear, and early termination",
      "Includes governing law, arbitration, and indemnification clauses",
      "Legally binding and enforceable once signed",
      "Professional format suitable for online signing",
      "Customizable based on specific lease details",
      "Provides legal protection for both lessor and lessee",
      "Reduces legal risk and ensures enforceability under state law",
    ],
    whatYouNeed: [
      "Vehicle description and identification details (VIN, make, model, year)",
      "Lessor information and contact details",
      "Lessee information and contact details",
      "Lease term duration (e.g., 24, 36, or 48 months)",
      "Monthly lease payment amount",
      "Residual value and end-of-lease liability terms",
      "Insurance requirements and coverage limits",
      "Maintenance and repair obligations",
      "Mileage limits and excessive wear terms",
      "Default and early termination conditions",
      "Proof of insurance documentation",
      "Dispute resolution and arbitration preferences",
    ],
    estimatedTime: "15-20 minutes",
  };

  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '48px 16px', backgroundColor: '#ffffff' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
            <Building2 style={{ width: '32px', height: '32px', color: '#2563eb' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '12px 0 0 0' }}>Vehicle Lease Agreement</h1>
            <p style={{ color: '#4b5563', marginTop: '8px', margin: 0 }}>Also known as: Car Lease Agreement, Auto Lease Agreement, Vehicle Rental Agreement</p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #bfdbfe' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>What is a Vehicle Lease Agreement?</h2>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          A Vehicle Lease Agreement is a legally binding contract between a vehicle owner or leasing company (the Lessor) and an individual or business (the Lessee) who leases the vehicle. This agreement clearly defines the rights, duties, and obligations of both parties throughout the lease term, helping to prevent disputes and misunderstandings.
        </p>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
          This agreement sets out the essential terms of leasing a car, truck, or SUV, including lease duration, payment structure, permitted use, insurance requirements, mileage limits, and end-of-term responsibilities. Using the best format of Vehicle Lease Agreement ensures legal clarity and enforceability under applicable law.
        </p>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>When Should You Use a Vehicle Lease Agreement?</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            "You want to lease a vehicle without going through a dealership",
            "You need a clear written record of lease terms and payments",
            "You want legal protection for both lessor and lessee",
            "You want a professional Vehicle Lease Agreement that is easy to download and use",
            "You need to define insurance, taxes, fees, and maintenance obligations",
            "You want to establish mileage limits and excessive wear terms"
          ].map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '18px', marginTop: '4px' }}>•</span>
              <span style={{ color: '#374151' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #bbf7d0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Key Legal Protections</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {[
            "Clearly identifies the leased vehicle and its specifications",
            "Defines lease payments, lease term, and total lease cost",
            "Covers insurance, taxes, fees, and maintenance obligations",
            "Explains mileage limits, excessive wear, and early termination",
            "Includes governing law, arbitration, and indemnification clauses",
            "Legally binding and enforceable once signed",
            "Professional format suitable for online signing",
            "Customizable based on specific lease details",
            "Provides legal protection for both lessor and lessee",
            "Reduces legal risk and ensures enforceability under state law"
          ].map((protection, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px' }}>
              <span style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '18px', marginTop: '2px' }}>✓</span>
              <span style={{ color: '#374151' }}>{protection}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #bfdbfe' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Important Insurance Information</h3>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          When leasing a vehicle, automobile insurance must be obtained and maintained for the entire lease term. While insurance requirements vary by state, most Vehicle Lease Agreements require:
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '16px' }}>
          {[
            "Comprehensive coverage",
            "Collision coverage",
            "Liability coverage",
            "Gap insurance (optional but recommended)"
          ].map((item, index) => (
            <li key={index} style={{ color: '#374151', marginBottom: '8px' }}>• {item}</li>
          ))}
        </ul>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>
          Proof of insurance is usually required before signing the Vehicle Lease Agreement.
        </p>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              q: "What is a Vehicle Lease Agreement?",
              a: "A Vehicle Lease Agreement is a legally binding contract between a vehicle owner or leasing company (the Lessor) and an individual or business (the Lessee). It clearly defines rights, duties, and obligations throughout the lease term. The agreement sets out essential terms including lease duration, payment structure, permitted use, insurance requirements, mileage limits, and end-of-term responsibilities."
            },
            {
              q: "Why should I use a Vehicle Lease Agreement?",
              a: "A properly drafted Vehicle Lease Agreement helps both parties avoid future conflicts by clearly recording the agreed terms in writing. Whether leasing privately or outside a dealership, it provides a simple, reliable, and professional legal framework. With a well-structured agreement, you get a professional template that is easy to customize and suitable for personal or business use."
            },
            {
              q: "Is a Vehicle Lease Agreement legally binding?",
              a: "Yes. A Vehicle Lease Agreement becomes legally binding once all parties sign it. A well-structured agreement ensures enforceability under state law and reduces legal risk. The agreement is suitable for online signing and provides legal protection for both lessor and lessee."
            },
            {
              q: "What information is included in a Vehicle Lease Agreement?",
              a: "A comprehensive Vehicle Lease Agreement typically includes: vehicle description and identification details; lease term and monthly payment amount; residual value and end-of-lease liability; insurance and maintenance requirements; default, termination, and dispute resolution clauses; mileage limits and excessive wear terms; and governing law, arbitration, and indemnification clauses."
            },
            {
              q: "When should I use a Vehicle Lease Agreement?",
              a: "You should use a Vehicle Lease Agreement if you want to lease a vehicle without going through a dealership; need a clear written record of lease terms and payments; want legal protection for both lessor and lessee; or need a professional agreement that is easy to download and use. Suitable for personal or business vehicle leasing."
            },
            {
              q: "What are the steps to create a Vehicle Lease Agreement?",
              a: "First, customize your Vehicle Lease Agreement by answering simple questions and save anytime. Second, review the agreement to ensure terms accurately reflect your understanding before signing. Third, sign the agreement - both lessor and lessee must sign with electronic signing supported. Finally, download and share - everyone receives a copy."
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
          <span style={{ fontWeight: 600 }}>Legal Disclaimer:</span> This information is provided for educational purposes only and should not be considered as legal advice. Vehicle Lease Agreements may have different requirements based on jurisdiction. Please consult with a legal professional for guidance.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <button 
          onClick={() => navigate("/vehicle-lease-form")}
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
          Create Vehicle Lease Agreement
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

export default VehicleLeaseInfo;

import React, { useState } from "react";
import { Home, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CohabitationInfo: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  const doc = {
    title: "Cohabitation Agreement",
    otherNames: [
      "Living Together Agreement",
      "Domestic Partnership Agreement",
      "Non-Marital Cohabitation Agreement",
    ],
    whatIs:
      "A Cohabitation Agreement is a legally binding contract entered into by two individuals who live together in a non-marital relationship. This Cohabitation Agreement clearly defines each party's rights, responsibilities, and financial arrangements while sharing a residence.\n\nIf you and your partner are also roommates, a Cohabitation Agreement is an effective way to protect your property, income, and assets. It ensures that living together does not create unintended legal rights similar to marriage. This agreement is especially useful where parties share expenses, household responsibilities, or a draft tenancy agreement.",
    whenToUse: [
      "You live with your significant other and want to remain legally recognized as cohabitants",
      "You plan to move in together and want to define financial and property arrangements",
      "You share rent, expenses, or assets and want legal certainty",
      "You want to protect your property from future claims",
      "You want to establish rules for property division if the relationship ends",
      "You're in a long-term living arrangement and need legal protection",
    ],
    faqs: [
      {
        q: "What is a Cohabitation Agreement?",
        a: "A Cohabitation Agreement is a legally binding contract entered into by two individuals who live together in a non-marital relationship. This agreement clearly defines each party's rights, responsibilities, and financial arrangements while sharing a residence. It ensures that living together does not create unintended legal rights similar to marriage and protects both parties' property, income, and assets.",
      },
      {
        q: "Why is a Cohabitation Agreement important?",
        a: "A properly drafted Cohabitation Agreement helps avoid disputes by setting clear expectations from the outset. It allows parties to preserve their legal status as cohabitants (not spouses), define ownership of property and assets, clarify financial contributions and household expenses, protect against liability for the other party's debts, and establish rules for property division if the relationship ends.",
      },
      {
        q: "When should I use a Cohabitation Agreement?",
        a: "You should use a Cohabitation Agreement if you live with your significant other and want to remain legally recognized as cohabitants; plan to move in together and want clear financial and property arrangements; share rent, expenses, or assets and want legal certainty; or want to protect your property from future claims. This agreement is suitable for both new and long-term living arrangements.",
      },
      {
        q: "What does a Cohabitation Agreement cover?",
        a: "A comprehensive Cohabitation Agreement typically addresses separate and jointly owned property; property acquired before and during cohabitation; earnings, income, and asset ownership; household expenses and responsibilities; gifts, inheritance, and property transfers; waiver of spousal rights and support; termination procedures and property division; and governing law and dispute resolution.",
      },
      {
        q: "Is a Cohabitation Agreement legally binding?",
        a: "Yes. A Cohabitation Agreement is legally binding and enforceable once signed by both parties. It provides court-ready legal protection and clarity about each party's rights and responsibilities. The agreement ensures that both parties have legal certainty regarding their living arrangement and property interests.",
      },
      {
        q: "Can I use a Cohabitation Agreement with a tenancy agreement?",
        a: "Yes. A Cohabitation Agreement works perfectly alongside a tenancy agreement or lease. While a tenancy agreement addresses landlord-tenant relationships, a Cohabitation Agreement defines the personal relationship, financial arrangements, and property ownership between cohabitants, providing comprehensive legal protection for your living situation.",
      },
    ],
    keyProtections: [
      "Preserve legal status as cohabitants, not spouses",
      "Define ownership of property and assets",
      "Clarify financial contributions and household expenses",
      "Protect against liability for the other party's debts",
      "Establish rules for property division if relationship ends",
      "Court-ready legal drafting",
      "Professional and enforceable legal language",
      "Clear expectations from the outset",
      "Compatible with tenancy agreements",
      "Easy to customize and execute online",
    ],
    whatYouNeed: [
      "Information about separate property owned before cohabitation",
      "Details about jointly owned or acquired property",
      "Income and earnings information for both parties",
      "Breakdown of household expenses and contributions",
      "Information on gifts and inheritance policies",
      "Clarification on spousal rights waiver",
      "Details on property division preferences",
      "Information on termination and exit procedures",
      "Preferred governing law and jurisdiction",
      "Contact information for both parties",
      "Asset and liability inventory",
      "Household responsibility allocation details",
    ],
    estimatedTime: "15-20 minutes",
  };

  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '48px 16px', backgroundColor: '#ffffff' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '12px', backgroundColor: '#dcfce7', borderRadius: '8px' }}>
            <Home style={{ width: '32px', height: '32px', color: '#16a34a' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', margin: '12px 0 0 0' }}>Cohabitation Agreement</h1>
            <p style={{ color: '#4b5563', marginTop: '8px', margin: 0 }}>Also known as: Living Together Agreement, Domestic Partnership Agreement, Non-Marital Cohabitation Agreement</p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #bbf7d0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>What is a Cohabitation Agreement?</h2>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px', marginBottom: '16px' }}>
          A Cohabitation Agreement is a legally binding contract entered into by two individuals who live together in a non-marital relationship. This agreement clearly defines each party's rights, responsibilities, and financial arrangements while sharing a residence.
        </p>
        <p style={{ color: '#374151', lineHeight: '1.6', fontSize: '16px' }}>
          If you and your partner are also roommates, a Cohabitation Agreement is an effective way to protect your property, income, and assets. It ensures that living together does not create unintended legal rights similar to marriage. This agreement is especially useful where parties share expenses, household responsibilities, or a draft tenancy agreement.
        </p>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>When Should You Use a Cohabitation Agreement?</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            "You live with your significant other and want to remain legally recognized as cohabitants",
            "You plan to move in together and want to define financial and property arrangements",
            "You share rent, expenses, or assets and want legal certainty",
            "You want to protect your property from future claims",
            "You want to establish rules for property division if the relationship ends",
            "You're in a long-term living arrangement and need legal protection"
          ].map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '18px', marginTop: '4px' }}>•</span>
              <span style={{ color: '#374151' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #bbf7d0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>What Does a Cohabitation Agreement Cover?</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            "Separate and jointly owned property",
            "Property acquired before and during cohabitation",
            "Earnings, income, and asset ownership",
            "Household expenses and responsibilities",
            "Gifts, inheritance, and property transfers",
            "Waiver of spousal rights and support",
            "Termination procedures and property division",
            "Governing law and dispute resolution"
          ].map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '18px', marginTop: '4px' }}>•</span>
              <span style={{ color: '#374151' }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '32px', marginBottom: '32px', border: '1px solid #bbf7d0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>Key Legal Protections</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {[
            "Preserve legal status as cohabitants, not spouses",
            "Define ownership of property and assets",
            "Clarify financial contributions and household expenses",
            "Protect against liability for the other party's debts",
            "Establish rules for property division if relationship ends",
            "Court-ready legal drafting",
            "Professional and enforceable legal language",
            "Clear expectations from the outset",
            "Compatible with tenancy agreements",
            "Easy to customize and execute online"
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
              q: "What is a Cohabitation Agreement?",
              a: "A Cohabitation Agreement is a legally binding contract entered into by two individuals who live together in a non-marital relationship. This agreement clearly defines each party's rights, responsibilities, and financial arrangements while sharing a residence. It ensures that living together does not create unintended legal rights similar to marriage."
            },
            {
              q: "Why is a Cohabitation Agreement important?",
              a: "A properly drafted Cohabitation Agreement helps avoid disputes by setting clear expectations from the outset. It allows parties to preserve their legal status as cohabitants, define ownership of property and assets, clarify financial contributions and household expenses, protect against liability for the other party's debts, and establish rules for property division."
            },
            {
              q: "When should I use a Cohabitation Agreement?",
              a: "You should use a Cohabitation Agreement if you live with your significant other and want to remain legally recognized as cohabitants; plan to move in together and want clear financial and property arrangements; share rent, expenses, or assets and want legal certainty; or want to protect your property. Suitable for both new and long-term arrangements."
            },
            {
              q: "What does a Cohabitation Agreement cover?",
              a: "A comprehensive Cohabitation Agreement typically addresses separate and jointly owned property; property acquired before and during cohabitation; earnings, income, and asset ownership; household expenses and responsibilities; gifts, inheritance, and property transfers; waiver of spousal rights and support; termination procedures and property division; and governing law."
            },
            {
              q: "Is a Cohabitation Agreement legally binding?",
              a: "Yes. A Cohabitation Agreement is legally binding and enforceable once signed by both parties. It provides court-ready legal protection and clarity about each party's rights and responsibilities. The agreement ensures that both parties have legal certainty regarding their living arrangement and property interests."
            },
            {
              q: "Can I use a Cohabitation Agreement with a tenancy agreement?",
              a: "Yes. A Cohabitation Agreement works perfectly alongside a tenancy agreement or lease. While a tenancy agreement addresses landlord-tenant relationships, a Cohabitation Agreement defines the personal relationship, financial arrangements, and property ownership between cohabitants."
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
                  <ChevronUp style={{ width: '20px', height: '20px', color: '#16a34a' }} />
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
          <span style={{ fontWeight: 600 }}>Legal Disclaimer:</span> This information is provided for educational purposes only and should not be considered as legal advice. Cohabitation Agreements may have different requirements based on jurisdiction and local laws. Please consult with a legal professional for guidance.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <button 
          onClick={() => navigate("/cohabitation-form")}
          style={{
            backgroundColor: '#16a34a',
            color: '#ffffff',
            padding: '12px 32px',
            borderRadius: '8px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#15803d')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
        >
          Create Cohabitation Agreement
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

export default CohabitationInfo;

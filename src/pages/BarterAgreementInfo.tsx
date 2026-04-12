import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Handshake, Clock, Info } from "lucide-react";
import { documentContent } from "@/data/documentContent";

interface ExpandedFAQ {
  [key: number]: boolean;
}

const BarterAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<ExpandedFAQ>({});

  const data = documentContent["Barter Agreement"];

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <p>Document information not found</p>
      </div>
    );
  }

  const toggleFAQ = (index: number) => {
    setExpandedFAQ((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Handshake className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">{data.title}</h1>
          </div>
          {data.otherNames && data.otherNames.length > 0 && (
            <p className="text-sm text-gray-600">
              Also known as: {data.otherNames.join(", ")}
            </p>
          )}
        </div>

        {/* What Is Section */}
        <Card className="bg-white border-l-4 border-l-purple-600 mb-8 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What Is a Barter Agreement?
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {data.whatIs}
          </p>
        </Card>

        {/* When to Use Section */}
        <Card className="bg-purple-50 border border-purple-200 mb-8 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            When To Use This Agreement
          </h2>
          <ul className="space-y-3">
            {data.whenToUse?.map((item: string, index: number) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Key Protections Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Key Protections Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.keyProtections?.map((protection: string, index: number) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 p-4"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <p className="text-gray-700">{protection}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {data.faqs?.map((faq: { q: string; a: string }, index: number) => (
              <Card
                key={index}
                className="bg-white border border-gray-200 overflow-hidden hover:border-purple-300 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-50 transition-colors"
                >
                  <span className="text-left text-gray-900 font-medium">
                    {faq.q}
                  </span>
                  {expandedFAQ[index] ? (
                    <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ[index] && (
                  <div className="px-6 py-4 bg-purple-50 border-t border-gray-100">
                    <p className="text-gray-700 whitespace-pre-line">
                      {faq.a}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* What You Need Section */}
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white mb-8 p-6">
          <h2 className="text-2xl font-semibold mb-4">
            What You Need to Prepare
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.whatYouNeed?.map((item: string, index: number) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Important Note */}
        <Card className="bg-blue-50 border border-blue-200 mb-8 p-6">
          <div className="flex gap-3">
            <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Important Note
              </h3>
              <p className="text-blue-800">
                While this template provides a solid starting point, tax implications of barter exchanges can be complex. Consider consulting with a tax professional or attorney to ensure compliance with all applicable tax laws and regulations.
              </p>
            </div>
          </div>
        </Card>

        {/* Estimated Time & CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 font-medium">
              Estimated time to complete: {data.estimatedTime}
            </span>
          </div>
          <Button
            onClick={() => navigate("/barter-agreement-form")}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Create Agreement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BarterAgreementInfo;

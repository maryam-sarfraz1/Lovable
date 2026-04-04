import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, Home, Lock } from "lucide-react";
import { documentContent } from "@/data/documentContent";

const WarrantyAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  const doc = documentContent["Warranty Deed Agreement"] || documentContent["default"];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Home className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">{doc.title}</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6">{doc.whatIs}</p>

            {/* Other Names / Aliases */}
            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* When to Use Section */}
          {doc.whenToUse && doc.whenToUse.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                When to Use
              </h2>
              <ul className="space-y-3">
                {doc.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What You Need Section */}
          {doc.whatYouNeed && doc.whatYouNeed.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                What You Need
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doc.whatYouNeed.map((item, idx) => (
                  <Card key={idx} className="border-emerald-100 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-700">{item}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Key Protections Section */}
          {doc.keyProtections && doc.keyProtections.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-emerald-600" />
                Key Protections
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {doc.keyProtections.map((protection, idx) => (
                  <Card key={idx} className="border-emerald-100 bg-emerald-50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{protection}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {doc.faqs && doc.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {doc.faqs.map((faq, idx) => (
                  <Card key={idx} className="border-emerald-100 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-emerald-700">{faq.q}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="mb-12 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Important Note:</strong> A Warranty Deed Agreement is a serious legal document. While our templates provide professional guidance, consider having a local real estate attorney review your specific transaction to ensure compliance with your state's laws and to address any unique circumstances.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="px-6 py-2"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => navigate("/documents/warranty-deed-agreement")}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Get Warranty Deed Agreement
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WarrantyAgreementInfo;

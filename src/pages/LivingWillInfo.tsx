import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LivingWillInfo = () => {
  const navigate = useNavigate();

  const documentContent = {
    title: "Living Will",
    otherNames: ["Advance Directive", "Advance Healthcare Directive", "Medical Directive", "Advance Medical Directive", "Advance Health Care Directive"],
    whatIs: "A Living Will is a legally binding document that outlines your medical wishes in advance, especially regarding life-sustaining treatments and end-of-life care. It allows you to clearly specify whether you accept or refuse particular medical treatments and permits you to designate a trusted healthcare agent to make medical decisions if you become incapacitated. This ensures your healthcare preferences are respected and reduces the burden on family members during critical situations.",
    whenToUse: [
      "Planning ahead for medical emergencies and ensuring your wishes are documented",
      "Ensuring your healthcare preferences are followed during end-of-life care situations",
      "Avoiding family disputes over healthcare decisions and treatment options",
      "Communicating clearly with doctors and healthcare providers about your medical preferences"
    ],
    faqs: [
      {
        question: "How can I create a Living Will for free?",
        answer: "You can download a Living Will template, fill in your personal and medical preferences, and sign it according to legal requirements. Most states require two witnesses or notarization for validity."
      },
      {
        question: "Do I need a lawyer to draft a Living Will?",
        answer: "No, you can use a professionally drafted template. However, legal advice is recommended for complex situations or if you have specific medical conditions requiring detailed provisions."
      },
      {
        question: "Does a Living Will need to be notarized?",
        answer: "While not always mandatory, notarization or witnesses significantly strengthen the validity and enforceability of your document. Check your state's specific requirements."
      },
      {
        question: "What happens after I create a Living Will?",
        answer: "Share copies with your healthcare agent, primary physician, and family members. Keep the original in a safe but accessible location, and inform loved ones about your decisions."
      },
      {
        question: "What's the difference between a Living Will and a Power of Attorney?",
        answer: "A Living Will focuses on medical decisions and life-support preferences. A Durable Power of Attorney grants broader authority including financial and legal matters. Both are important for a comprehensive legal plan."
      }
    ]
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <Heart className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{documentContent.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ensure your medical wishes are honored with a legally binding healthcare directive
          </p>
        </div>

        {/* Other Names */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Also Known As</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {documentContent.otherNames.map((name, index) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What Is */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What Is a Living Will?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{documentContent.whatIs}</p>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Honored Wishes</h3>
                <p className="text-sm text-gray-600">Ensure your healthcare preferences are respected when you cannot communicate your desires</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Clear Guidance</h3>
                <p className="text-sm text-gray-600">Provide doctors and family with clear instructions about your medical treatment preferences</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <AlertTriangle className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Peace of Mind</h3>
                <p className="text-sm text-gray-600">Reduce family burden during medical emergencies and avoid disputes over end-of-life care</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* When to Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>When to Use This Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documentContent.whenToUse.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentContent.faqs.map((faq, index) => {
                const colors = ["bg-blue-50", "bg-green-50", "bg-purple-50", "bg-yellow-50", "bg-red-50"];
                const borderColors = ["border-l-4 border-blue-500", "border-l-4 border-green-500", "border-l-4 border-purple-500", "border-l-4 border-yellow-500", "border-l-4 border-red-500"];
                return (
                  <div key={index} className={`${colors[index]} ${borderColors[index]} rounded-lg p-4`}>
                    <p className="font-semibold text-gray-900 mb-2">{faq.question}</p>
                    <p className="text-gray-700 text-sm">{faq.answer}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Important Notice</h3>
            <p className="text-amber-800 text-sm">
              A Living Will is an important healthcare planning document. Requirements vary by state regarding witnesses, notarization, and specific healthcare preferences. Consult with a qualified attorney to ensure your Living Will complies with your state's laws, clearly expresses your medical wishes, and properly designates your healthcare agent.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/documents/living-will")}
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3"
          >
            Start Living Will
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Estimated time: 15-20 minutes
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LivingWillInfo;

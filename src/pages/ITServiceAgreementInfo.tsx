import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  HelpCircle,
  Download,
  Briefcase,
  Clock,
} from "lucide-react";

const ITServiceAgreementInfo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/documents")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Button>
        </div>

        {/* Hero */}
        <div className="text-center mb-10">
          <Briefcase className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IT Service Agreement</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A legally binding contract that defines the terms, scope, and conditions under which
            IT services are provided between a service provider and a client.
          </p>
        </div>

        <div className="grid gap-6 mb-8">

          {/* Other Names */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Other Names
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-gray-700">
                <li>• IT Service Contract</li>
                <li>• IT Support Contract</li>
                <li>• IT Services Agreement</li>
              </ul>
            </CardContent>
          </Card>

          {/* What is an IT Service Agreement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-indigo-600" />
                What is an IT Service Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                This is a legal document that formalizes an agreement or declaration between parties. Legal documents provide clarity, establish rights and obligations, and serve as evidence in case of disputes. They are designed to protect all parties involved by clearly documenting terms and expectations.
              </p>
              <p>
                An IT Service Agreement is a legally binding contract that defines the terms, scope, and conditions under which IT services are provided between a service provider and a client. It ensures clarity in service delivery, payment terms, responsibilities, and legal protection for both parties.
              </p>
              <div>
                <p className="font-semibold mb-2">A comprehensive IT Service Agreement typically includes:</p>
                <ul className="space-y-1 pl-2">
                  <li>• Detailed description of IT services to be provided</li>
                  <li>• Service levels and performance standards (SLAs)</li>
                  <li>• Roles and responsibilities of both parties</li>
                  <li>• Payment terms and pricing structure</li>
                  <li>• Data security and confidentiality clauses</li>
                  <li>• Termination conditions and notice periods</li>
                  <li>• Liability limitations and dispute resolution</li>
                  <li>• Support hours and response times</li>
                  <li>• Intellectual property rights</li>
                  <li>• Compliance and regulatory requirements</li>
                </ul>
              </div>
              <p>
                A well-drafted IT Service Agreement protects both the service provider and client by clearly defining expectations, reducing disputes, and establishing a professional framework for the IT relationship.
              </p>
            </CardContent>
          </Card>

          {/* Why Use Legalgram */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Benefits of Using an IT Service Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Professionally drafted and legally sound
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Fully customizable to your specific needs
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Clear definition of scope and deliverables
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Protection for both service provider and client
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Suitable for businesses, freelancers, and IT professionals
                </li>
              </ul>
              <p className="mt-4 text-gray-700">
                Whether you are a service provider or hiring IT services, an IT Service Agreement ensures complete legal clarity and protects both parties.
              </p>
            </CardContent>
          </Card>

          {/* When to Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-600" />
                When to Use an IT Service Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">You should use this IT Service Agreement template when:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You are providing IT services to a client or company
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You are hiring an IT professional or support provider
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You want a clear and enforceable IT Service Contract draft
                </li>
                <li className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                  You need to define service scope, timelines, and payments
                </li>
              </ul>
              <p className="mt-4 text-gray-600 italic">
                Create an IT Service Agreement today to avoid misunderstandings and future disputes.
              </p>
            </CardContent>
          </Card>

          {/* Sample IT Service Agreement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-blue-600" />
                Sample IT Service Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Our IT Service Agreement template is fully customizable. Tailor the terms and conditions to match your specific requirements and business model.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Trusted by thousands of IT professionals
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Legally binding and enforceable contract
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                  Easy to edit and download
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-purple-600" />
                IT Service Agreement FAQs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">
                  Should every IT provider create an IT Service Agreement?
                </h4>
                <p className="text-purple-700 text-sm mb-2">
                  Yes. Every IT professional should use a draft IT Service Agreement to clearly define
                  expectations. This helps:
                </p>
                <ul className="text-purple-700 text-sm space-y-1 pl-2">
                  <li>• Avoid payment disputes</li>
                  <li>• Clarify roles and responsibilities</li>
                  <li>• Set timelines and deliverables</li>
                  <li>• Reduce legal risks</li>
                </ul>
                <p className="text-purple-700 text-sm mt-2">
                  Without a proper IT Service Agreement, issues like underpayment, delays, and
                  misunderstandings may arise.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  What is included in the best format of IT Service Agreement?
                </h4>
                <p className="text-blue-700 text-sm mb-2">
                  To create a comprehensive IT Service Agreement, you will need:
                </p>
                <ul className="text-blue-700 text-sm space-y-1 pl-2">
                  <li>• Client and service provider details</li>
                  <li>• Scope of IT services</li>
                  <li>• Payment terms and schedule</li>
                  <li>• Start and end dates</li>
                  <li>• Confidentiality clauses</li>
                </ul>
                <p className="text-blue-700 text-sm mt-2">
                  A good service agreement template includes essential legal protections and can be customized easily to fit your needs.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  What is the cost of drafting an IT Service Agreement with a lawyer?
                </h4>
                <p className="text-green-700 text-sm">
                  Hiring a lawyer to draft an IT Service Contract can cost anywhere between $100 to $350+ per hour depending on experience and complexity. Using a professionally drafted template saves both time and cost while ensuring legal compliance and professional quality.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  What to do after downloading your IT Service Agreement?
                </h4>
                <p className="text-yellow-700 text-sm mb-2">
                  After you create or download your IT Service Agreement:
                </p>
                <ol className="text-yellow-700 text-sm space-y-1 list-decimal list-inside">
                  <li>Review the document carefully</li>
                  <li>Share it with the other party</li>
                  <li>Make necessary edits</li>
                  <li>Sign the agreement</li>
                  <li>Keep a copy for records</li>
                </ol>
                <p className="text-yellow-700 text-sm mt-2">
                  This ensures your IT Service Agreement is legally enforceable and ready for use.
                </p>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">
                  Can I get my IT Service Agreement reviewed?
                </h4>
                <p className="text-red-700 text-sm">
                  Yes. After you create or download your IT Service Agreement, it is always
                  recommended to have it reviewed by a legal expert. Using a professionally drafted
                  IT Service Agreement template from Legalgram already minimizes risks, but legal
                  review adds an extra layer of protection.
                </p>
              </div>

            </CardContent>
          </Card>

        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Ready to Create Your IT Service Agreement?</h3>
              <p className="text-gray-600 mb-4">
                Create your IT Service Agreement today and ensure complete legal clarity for your IT services and business relationships.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Instant download • Fully customizable • Professionally drafted
              </p>
              <Button
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/it-service-agreement-form")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Document
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ITServiceAgreementInfo;
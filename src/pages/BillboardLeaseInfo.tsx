import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, CheckCircle, Clock, DollarSign, HelpCircle, MapPin, Shield, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sectionCardClass = "border border-gray-200 shadow-sm";

const faqs = [
  {
    q: "Is a Billboard Lease Agreement legally binding?",
    a: "Yes. A properly signed Billboard Lease Agreement from Legalgram is enforceable by law.",
  },
  {
    q: "What happens if I don’t use a Billboard Lease Agreement?",
    a: "Without a draft Billboard Lease Agreement, you risk payment disputes, unclear terms, and legal issues.",
  },
  {
    q: "What should be included in a Billboard Lease Agreement?",
    a: "A Billboard Lease Agreement draft should include property details, rent, duration, and responsibilities.",
  },
  {
    q: "Can I customize the Billboard Lease Agreement?",
    a: "Yes. You can easily download and customize Billboard Lease Agreement from Legalgram.",
  },
];

const BillboardLeaseInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="mx-auto max-w-5xl px-4">
        <Button variant="outline" onClick={() => navigate("/documents")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Billboard Lease Agreement Information
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
                Billboard Lease Agreement
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                A legally binding agreement for placing billboard advertising on a specific property, with clear terms for access, payment, maintenance, and liability.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:w-[320px]">
              <div className="rounded-2xl bg-amber-50 p-4">
                <Clock className="h-5 w-5 text-amber-600" />
                <p className="mt-3 text-sm font-medium text-amber-900">Fast setup</p>
                <p className="text-sm text-amber-800">Clear lease terms before installation</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4">
                <Shield className="h-5 w-5 text-emerald-600" />
                <p className="mt-3 text-sm font-medium text-emerald-900">Legal protection</p>
                <p className="text-sm text-emerald-800">Protects property owners and advertisers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className={sectionCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                What is a Billboard Lease Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 leading-7">
              <p>
                A Billboard Lease Agreement is a legally binding contract between a property owner (lessor) and an advertiser or billboard company (lessee), allowing the placement of a billboard on a specific property.
              </p>
              <p>
                This draft Billboard Lease Agreement from Legalgram includes property description and location, details of the lessor and lessee, lease duration and renewal terms, rental amount and payment schedule, and maintenance and utility responsibilities.
              </p>
              <p>
                The best format Billboard Lease Agreement from Legalgram ensures clarity, transparency, and legal protection for both parties.
              </p>
            </CardContent>
          </Card>

          <Card className={sectionCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Why You Need a Billboard Lease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {[
                "Clearly define rental income and payment terms",
                "Establish responsibilities for maintenance and utilities",
                "Avoid misunderstandings between property owner and advertiser",
                "Protect your property rights legally",
                "Ensure long-term stability of the lease",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
              <div className="md:col-span-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                Get your free download Billboard Lease Agreement from Legalgram today and secure your advertising lease.
              </div>
            </CardContent>
          </Card>

          <Card className={sectionCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                When to Use a Billboard Lease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {[
                "You want to lease your land for billboard advertising",
                "You need permission to place a billboard on someone else's property",
                "You want to define lease duration and payment terms",
                "You want legal protection for both parties",
                "You want to avoid disputes regarding usage and access",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-blue-600" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
              <div className="md:col-span-2 rounded-xl bg-blue-50 p-4 text-blue-900">
                The Billboard Lease Agreement on Legalgram is ideal for property owners and advertisers alike.
              </div>
            </CardContent>
          </Card>

          <Card className={sectionCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-violet-600" />
                Key Features of the Best Billboard Lease Agreement Format
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="font-semibold text-slate-900">1. Property Details</p>
                <p className="mt-1 text-sm text-slate-600">Clear description and location of the leased space</p>
              </div>
              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="font-semibold text-slate-900">2. Parties Information</p>
                <p className="mt-1 text-sm text-slate-600">Details of lessor (owner) and lessee (advertiser)</p>
              </div>
              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="font-semibold text-slate-900">3. Lease Term</p>
                <p className="mt-1 text-sm text-slate-600">Defines duration, renewal, and termination conditions</p>
              </div>
              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="font-semibold text-slate-900">4. Rent & Payment Terms</p>
                <p className="mt-1 text-sm text-slate-600">Specifies rental amount, due dates, and payment method</p>
              </div>
              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="font-semibold text-slate-900">5. Access & Utilities</p>
                <p className="mt-1 text-sm text-slate-600">Covers access rights, electricity supply, and installation</p>
              </div>
              <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                <p className="font-semibold text-slate-900">6. Maintenance & Liability</p>
                <p className="mt-1 text-sm text-slate-600">Defines responsibility for upkeep and damages</p>
              </div>
            </CardContent>
          </Card>

          <Card className={sectionCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-slate-700" />
                How Does a Billboard Lease Agreement Work?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700 leading-7">
              <p>
                A draft Billboard Lease Agreement from Legalgram works by clearly outlining the terms under which a billboard can be installed and maintained on a property.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  "A steady income stream for property owners",
                  "Clear rights for advertisers",
                  "Legal protection in case of disputes",
                ].map((item) => (
                  <div key={item} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
              <p>
                Download Billboard Lease Agreement from Legalgram to create a secure and professional leasing arrangement.
              </p>
            </CardContent>
          </Card>

          <Card className={sectionCardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-indigo-600" />
                Billboard Lease Agreement FAQs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="font-semibold text-slate-900">{faq.q}</p>
                  <p className="mt-2 text-slate-700 leading-7">{faq.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-slate-950 text-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                Download Billboard Lease Agreement - Legalgram
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {[
                "Professionally drafted",
                "Easy to customize",
                "Legally reliable format",
                "Instant download",
              ].map((item) => (
                <div key={item} className="rounded-xl bg-white/10 p-4 text-sm text-white/90">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillboardLeaseInfo;

import { CheckCircle2 } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="bg-slate-50 min-h-[calc(100vh-[header-height]-[footer-height])] py-20 flex items-center justify-center">
            <div className="container max-w-7xl px-4 md:px-6">
                <div className="mx-auto max-w-4xl text-center mb-16">
                    <div className="inline-flex max-w-fit items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-semibold text-violet-800 tracking-tight transition-colors hover:bg-violet-100 mb-6 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2">
                        Pricing Options
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
                        Choose the right plan for you
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed font-medium text-balance">
                        Whether you need basic document edits or a full suite of professional PDF tools, we have a plan designed specifically for you.
                    </p>
                </div>

                <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-5xl lg:grid-cols-3 items-center">

                    {/* Free Tier */}
                    <div className="rounded-3xl p-8 xl:p-10 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow relative z-10">
                        <div className="flex items-center justify-between gap-x-4 mb-4">
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Basic</h3>
                        </div>
                        <p className="text-sm text-slate-500 min-h-[40px]">The essentials to provide your best document edits.</p>

                        <div className="mt-8 flex items-baseline gap-x-1">
                            <span className="text-5xl font-extrabold tracking-tight text-slate-900">Free</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">Forever</p>

                        <a href="#" className="mt-8 block w-full rounded-xl px-4 py-3 text-center text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition-all shadow-sm">
                            Get started
                        </a>

                        <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-slate-600">
                            {[
                                'Up to 3 documents per day',
                                'Basic merge and compress',
                                'Max file size: 10MB',
                                'Ads enabled',
                            ].map((feature) => (
                                <li key={feature} className="flex gap-x-3 items-start">
                                    <CheckCircle2 className="h-5 w-5 flex-none text-violet-600 shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pro Tier (Highlighted) */}
                    <div className="rounded-3xl p-8 xl:p-10 border-2 border-violet-600 bg-white shadow-2xl relative z-20 transform lg:-translate-y-4">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                            Most Popular
                        </div>
                        <div className="flex items-center justify-between gap-x-4 mb-4">
                            <h3 className="text-xl font-bold text-violet-600 tracking-tight">Pro</h3>
                        </div>
                        <p className="text-sm text-slate-500 min-h-[40px]">Unlock the full potential of your work with professional tools.</p>

                        <div className="mt-8 flex items-baseline gap-x-1">
                            <span className="text-5xl font-extrabold tracking-tight text-slate-900">$12</span>
                            <span className="text-sm font-bold text-slate-500">/month</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">Billed annually</p>

                        <a href="#" className="mt-8 block w-full rounded-xl px-4 py-3 text-center text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 shadow-md hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-all">
                            Start free trial
                        </a>

                        <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-slate-600">
                            {[
                                'Unlimited document processing',
                                'Advanced compression & encryption',
                                'Max file size: 1GB',
                                'Ad-free experience',
                                'OCR (Optical Character Recognition)',
                            ].map((feature) => (
                                <li key={feature} className="flex gap-x-3 items-start font-medium text-slate-700">
                                    <CheckCircle2 className="h-5 w-5 flex-none text-violet-600 shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Business Tier */}
                    <div className="rounded-3xl p-8 xl:p-10 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow relative z-10">
                        <div className="flex items-center justify-between gap-x-4 mb-4">
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Business</h3>
                        </div>
                        <p className="text-sm text-slate-500 min-h-[40px]">Dedicated support and infrastructure for your company.</p>

                        <div className="mt-8 flex items-baseline gap-x-1">
                            <span className="text-5xl font-extrabold tracking-tight text-slate-900">$30</span>
                            <span className="text-sm font-bold text-slate-500">/user/mo</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">Billed annually</p>

                        <a href="#" className="mt-8 block w-full rounded-xl px-4 py-3 text-center text-sm font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-all">
                            Contact Sales
                        </a>

                        <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-slate-600">
                            {[
                                'Everything in Pro',
                                'API Access & Webhooks',
                                'Custom branding (White-label)',
                                'Dedicated Account Manager',
                            ].map((feature) => (
                                <li key={feature} className="flex gap-x-3 items-start">
                                    <CheckCircle2 className="h-5 w-5 flex-none text-violet-600 shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

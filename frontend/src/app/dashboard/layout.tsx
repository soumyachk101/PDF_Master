import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r border-primary/10 bg-white dark:bg-slate-900 overflow-y-auto hidden md:flex flex-col">
                <div className="flex flex-col h-full p-4">
                    <div className="flex items-center gap-3 mb-8 px-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <span className="material-symbols-outlined text-primary text-2xl">picture_as_pdf</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-none">PDFMaster</h1>
                            <p className="text-primary text-xs font-semibold uppercase tracking-wider mt-1">Premium Plan</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1 flex-1">
                        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white font-semibold transition-all shadow-md shadow-primary/20">
                            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                            <span className="text-[14px]">Dashboard</span>
                        </Link>
                        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 transition-all">
                            <span className="material-symbols-outlined text-[22px]">category</span>
                            <span className="text-[14px]">All Tools</span>
                        </Link>
                        <Link href="/dashboard/history" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 transition-all">
                            <span className="material-symbols-outlined text-[22px]">history</span>
                            <span className="text-[14px]">Recent Files</span>
                        </Link>
                        <Link href="/dashboard/subscription" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 transition-all">
                            <span className="material-symbols-outlined text-[22px]">payments</span>
                            <span className="text-[14px]">Subscription</span>
                        </Link>

                        <div className="my-4 mx-2 border-t border-slate-100 dark:border-slate-800"></div>
                        <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</p>

                        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 transition-all">
                            <span className="material-symbols-outlined text-[22px]">settings</span>
                            <span className="text-[14px]">Settings</span>
                        </Link>
                    </nav>

                    <div className="mt-auto pt-6">
                        <div className="bg-primary/5 rounded-xl p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-xs font-semibold text-slate-500 uppercase">Usage</p>
                                <p className="text-xs font-bold text-primary">10%</p>
                            </div>
                            <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: '10%' }}></div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2">5/50 files used this hour</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="flex justify-between items-center bg-white dark:bg-slate-900 border-b border-primary/10 p-4 shrink-0 md:hidden z-10">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-2xl">picture_as_pdf</span>
                        <span className="font-bold text-lg">PDFMaster</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-0">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Welcome back, User</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">Here's an overview of your PDF productivity today.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-full border border-primary/10 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors relative">
                                <span className="material-symbols-outlined text-[24px]">notifications</span>
                            </button>
                            <div className="h-10 w-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-bold">
                                U
                            </div>
                        </div>
                    </header>
                    {children}
                </div>
            </main>
        </div>
    );
}

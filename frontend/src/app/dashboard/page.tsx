'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import {
    BarChart3,
    Clock,
    Cloud,
    FileCheck,
    FileCode,
    FileStack,
    History,
    LayoutDashboard,
    LogOut,
    Settings,
    Zap,
    ArrowUpRight,
    TrendingUp,
    Download,
    MoreVertical,
    Plus,
    Star,
    Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
    const { user, accessToken, logout } = useAuthStore();
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/v1/user/profile', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                } else {
                    logout();
                    router.push('/auth/login');
                }
            } catch (e) {
                console.error('Failed to fetch profile', e);
            }
        };

        fetchProfile();
    }, [user, accessToken, logout, router]);

    if (!profile) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
                <p className="font-bold text-slate-500 animate-pulse uppercase tracking-widest text-xs">Synchronizing Workspace...</p>
            </div>
        </div>
    );

    const totalProcessed = profile.usageRecords?.length || 0;
    const cloudStorage = profile.usageRecords?.reduce((acc: number, curr: any) => acc + (Number(curr.totalSize) || 0), 0) / (1024 * 1024) || 0;
    const storagePercent = Math.min((cloudStorage / 100) * 100, 100); // Mock 100MB limit

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto py-12 px-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Status: Optimal</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Global Dashboard
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Welcome back, <span className="text-violet-600 font-bold">{profile.name || profile.email.split('@')[0]}</span>. Here's your processing activity.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button size="lg" className="rounded-xl bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 font-bold px-6 shadow-sm" onClick={() => logout()}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                        <Button size="lg" className="rounded-xl bg-violet-600 text-white font-bold px-6 shadow-xl shadow-violet-200 dark:shadow-none transition-transform hover:scale-[1.02]" asChild>
                            <Link href="/">
                                <Plus className="w-4 h-4 mr-2" />
                                New Job
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Overivew Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <CardStat
                        icon={<FileCheck className="text-violet-600" />}
                        label="Total Files"
                        value={totalProcessed.toString()}
                        trend="+12% this week"
                    />
                    <CardStat
                        icon={<Cloud className="text-blue-600" />}
                        label="Storage Used"
                        value={`${cloudStorage.toFixed(1)} MB`}
                        trend={`${storagePercent.toFixed(0)}% of quota`}
                    />
                    <CardStat
                        icon={<Zap className="text-orange-600" />}
                        label="Compute Speed"
                        value="1.2s avg"
                        trend="Elite performance"
                    />
                    <CardStat
                        icon={<TrendingUp className="text-green-600" />}
                        label="Active Plan"
                        value={profile.subscription?.plan || 'Free Tier'}
                        trend="Upgrade available"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Jobs Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-1000">
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                                        <History className="size-5 text-slate-400" />
                                    </div>
                                    <h3 className="font-black text-xl text-slate-900 dark:text-white">Recent Activity</h3>
                                </div>
                                <button className="text-xs font-black uppercase tracking-widest text-violet-600 hover:text-violet-700 transition-colors">View History Archive</button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">
                                            <th className="px-8 py-5 text-left">Internal ID</th>
                                            <th className="px-8 py-5 text-left">Operation</th>
                                            <th className="px-8 py-5 text-left">Timestamp</th>
                                            <th className="px-8 py-5 text-left">Status</th>
                                            <th className="px-8 py-5 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {profile.usageRecords?.length > 0 ? profile.usageRecords.slice(0, 5).map((record: any) => (
                                            <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <span className="text-xs font-mono font-bold text-slate-400">PJ-{record.id.slice(0, 6).toUpperCase()}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center text-violet-600 transition-transform group-hover:scale-110">
                                                            <FileCode className="size-5" />
                                                        </div>
                                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{record.toolType}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-medium text-slate-500">
                                                    {new Date(record.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                                        <div className="size-1.5 rounded-full bg-current" />
                                                        Processed
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                                                        <Download className="size-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-20 text-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <div className="size-16 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-300">
                                                            <Layers className="size-8" />
                                                        </div>
                                                        <p className="text-slate-400 font-bold max-w-xs mx-auto">No processing cycles detected. Start your first job to see analytics here.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar widgets */}
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                        {/* Storage Box */}
                        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
                            <h3 className="font-black text-lg mb-6 flex items-center gap-2">
                                <Cloud className="size-5 text-violet-400" />
                                Cloud Capacity
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-3xl font-black">{storagePercent.toFixed(1)}%</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cloudStorage.toFixed(1)}MB / 100MB</span>
                                </div>
                                <Progress value={storagePercent} className="h-2 bg-slate-800 [&>div]:bg-violet-500" />
                                <p className="text-xs text-slate-400 font-bold leading-relaxed pt-2">
                                    Your storage is purged every 24 hours to ensure maximal privacy.
                                </p>
                            </div>
                        </div>

                        {/* Upgrade Box */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm group">
                            <div className="size-14 bg-orange-50 dark:bg-orange-950 rounded-2xl flex items-center justify-center text-orange-600 mb-6 transition-transform group-hover:rotate-12">
                                <Star className="size-7 fill-orange-600" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Upgrade to Pro</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-6">
                                Unlock unlimited file sizes, permanent cloud storage, and priority compute queues.
                            </p>
                            <Button className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 dark:shadow-none" asChild>
                                <Link href="/pricing">Explore Pricing</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CardStat({ icon, label, value, trend }: any) {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6 hover:shadow-xl hover:border-violet-500/30 transition-all duration-500 group">
            <div className="flex justify-between items-start">
                <div className="size-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                    {icon}
                </div>
                <div className="size-8 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-violet-50 transition-colors">
                    <ArrowUpRight className="size-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
                </div>
            </div>
            <div>
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
                <div className="flex items-baseline gap-3">
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h4>
                </div>
                <span className="text-xs font-bold text-slate-400 mt-2 block">{trend}</span>
            </div>
        </div>
    )
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadZone } from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { MoveLeft, Scissors, ArrowRight, Download, CheckCircle, Settings2, FileText, Zap } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function SplitPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<{ downloadUrl: string, fileCount: number } | null>(null);
    const [splitMode, setSplitMode] = useState("all");
    const { accessToken } = useAuthStore();
    const { toast } = useToast();

    const handleFilesChange = (newFiles: File[]) => {
        setFiles(newFiles);
    };

    const pollJobStatus = async (id: string) => {
        return new Promise<void>((resolve, reject) => {
            const interval = setInterval(async () => {
                try {
                    const headers: any = {};
                    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

                    const res = await fetch(`http://localhost:3001/api/v1/jobs/${id}`, {
                        headers
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setProgress(data.progress || 10);

                        if (data.status === 'COMPLETED') {
                            clearInterval(interval);
                            const fileId = data.outputFiles[0]?.id;
                            setResult({
                                downloadUrl: `http://localhost:3001/api/v1/download/${fileId}`,
                                fileCount: data.outputFiles.length
                            });
                            resolve();
                        } else if (data.status === 'FAILED') {
                            clearInterval(interval);
                            reject(new Error(data.errorMessage || 'Job failed'));
                        }
                    }
                } catch (err) {
                    console.error('Polling error', err);
                }
            }, 1000);
        });
    };

    const handleSplit = async () => {
        if (files.length === 0) return;

        setIsProcessing(true);
        setProgress(0);

        try {
            const formData = new FormData();
            formData.append('file', files[0]);

            const headers: any = {};
            if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

            const uploadRes = await fetch('http://localhost:3001/api/v1/upload', {
                method: 'POST',
                headers,
                body: formData,
            });

            if (!uploadRes.ok) throw new Error('Failed to upload file');
            const uploadData = await uploadRes.json();
            setProgress(30);

            const jobHeaders: any = { 'Content-Type': 'application/json' };
            if (accessToken) jobHeaders['Authorization'] = `Bearer ${accessToken}`;

            const jobRes = await fetch('http://localhost:3001/api/v1/jobs', {
                method: 'POST',
                headers: jobHeaders,
                body: JSON.stringify({
                    toolType: 'SPLIT',
                    fileIds: [uploadData.fileId],
                    options: { splitMode }
                }),
            });

            if (!jobRes.ok) throw new Error('Failed to start split job');
            const jobData = await jobRes.json();
            await pollJobStatus(jobData.jobId);

            toast({
                title: "Split Complete",
                description: "Your PDF has been successfully split!",
            });

        } catch (error) {
            toast({
                title: "Split Failed",
                description: "There was an error splitting your document.",
                variant: "destructive"
            })
        } finally {
            setIsProcessing(false);
        }
    }

    const resetTool = () => {
        setFiles([]);
        setResult(null);
        setProgress(0);
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

            <div className="container max-w-5xl px-6 relative z-10">

                <Link href="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 mb-12 transition-colors group">
                    <MoveLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Workspace
                </Link>

                <div className="flex flex-col items-center justify-center text-center space-y-6 mb-16">
                    <div className="inline-flex items-center rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-black text-orange-600 dark:text-orange-400 tracking-[0.1em] uppercase">
                        <Scissors className="mr-2 h-4 w-4" /> Atomic Decoupling
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                        Split <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">PDF</span> Documents
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Divide massive files into precise individual documents or extract custom ranges in milliseconds.
                    </p>
                </div>

                {!result ? (
                    <div className="grid lg:grid-cols-3 gap-10 items-start">
                        <div className="lg:col-span-2">
                            <div className="glass rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">
                                {!isProcessing ? (
                                    <div className="p-10">
                                        <UploadZone
                                            onFilesChange={handleFilesChange}
                                            acceptText="Supports: PDF"
                                            maxSizeText="Max: 100MB per file"
                                            limitReached={files.length >= 1}
                                        />
                                    </div>
                                ) : (
                                    <div className="p-20 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 min-h-[450px]">
                                        <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-8 shadow-xl"></div>
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Extracting Cycles...</h3>
                                        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm font-medium">Decompressing and isolating pages based on your defined logic.</p>
                                        <div className="w-full max-w-sm bg-slate-100 dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-inner">
                                            <Progress value={progress} className="h-2.5 bg-slate-200 dark:bg-slate-700 [&>div]:bg-orange-600" />
                                            <div className="flex justify-between mt-4 text-xs font-black uppercase tracking-widest text-slate-400">
                                                <span>Isolation Status</span>
                                                <span className="text-orange-600">{progress}%</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1 glass rounded-[2.5rem] p-8 shadow-2xl sticky top-24 animate-in slide-in-from-right-8 duration-700">
                            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                                <div className="size-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-200 dark:shadow-none">
                                    <Settings2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">Split Rules</h3>
                                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Logic Config</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <ModeCard
                                    active={splitMode === 'all'}
                                    onClick={() => setSplitMode("all")}
                                    title="Burst Split"
                                    desc="Every page becomes a new PDF"
                                />
                                <ModeCard
                                    active={splitMode === 'range'}
                                    onClick={() => setSplitMode("range")}
                                    title="Extract Ranges"
                                    desc="Select specific pages to isolate"
                                />
                            </div>

                            <Button
                                size="lg"
                                className="w-full h-16 rounded-2xl shadow-xl text-lg font-black bg-gradient-to-r from-orange-600 to-amber-600 hover:scale-[1.02] transition-all disabled:opacity-50"
                                disabled={files.length === 0 || isProcessing}
                                onClick={handleSplit}
                            >
                                {isProcessing ? "Splitting..." : "Initialize Split"}
                                {!isProcessing && <ArrowRight className="w-5 h-5 ml-2" />}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="glass rounded-[3rem] shadow-3xl overflow-hidden text-center max-w-2xl mx-auto animate-in slide-in-from-bottom-12 duration-1000">
                        <div className="bg-emerald-500/10 dark:bg-emerald-500/5 border-b border-emerald-500/10 pb-12 pt-16">
                            <div className="mx-auto size-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20 border-4 border-white dark:border-slate-900">
                                <CheckCircle className="size-12 text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Split Successful</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-3 font-bold uppercase tracking-[0.2em] text-xs">
                                Process ID: {Math.random().toString(36).substring(7).toUpperCase()}
                            </p>
                        </div>
                        <div className="p-12">
                            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 mb-10 flex items-center justify-between text-left shadow-inner">
                                <div className="flex items-center gap-6">
                                    <div className="size-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg">
                                        <FileText className="size-8" />
                                    </div>
                                    <div>
                                        <p className="font-black text-xl text-slate-900 dark:text-white tracking-tight">results_archive.zip</p>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                                            {result.fileCount} Documents Isolated
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button size="lg" className="h-16 rounded-2xl shadow-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg group" asChild>
                                    <a href={result.downloadUrl} className="flex items-center justify-center">
                                        <Download className="w-6 h-6 mr-3 group-hover:-translate-y-1 transition-transform" />
                                        Fetch Archive
                                    </a>
                                </Button>
                                <Button variant="outline" size="lg" className="h-16 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-900" onClick={resetTool}>
                                    New Operation
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ModeCard({ active, onClick, title, desc }: { active: boolean, onClick: () => void, title: string, desc: string }) {
    return (
        <div
            onClick={onClick}
            className={`p-5 rounded-[1.5rem] border cursor-pointer transition-all ${active ? 'bg-orange-600 border-orange-500 shadow-lg shadow-orange-200 dark:shadow-none translate-x-1' : 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800'}`}
        >
            <div className="flex items-center gap-4">
                <div className={`size-5 rounded-full border-2 flex items-center justify-center ${active ? 'border-white' : 'border-slate-300'}`}>
                    {active && <div className="size-2.5 rounded-full bg-white" />}
                </div>
                <div>
                    <span className={`block font-black text-sm tracking-tight ${active ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{title}</span>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${active ? 'text-orange-100' : 'text-slate-400'}`}>{desc}</p>
                </div>
            </div>
        </div>
    )
}

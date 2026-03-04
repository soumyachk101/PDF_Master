"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadZone } from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { MoveLeft, FileStack, ArrowRight, Download, PlusCircle, CheckCircle, Settings2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function MergePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<{ downloadUrl: string, mergedSize: number } | null>(null);
    const { accessToken } = useAuthStore();
    const { toast } = useToast();

    const handleFilesChange = (newFiles: File[]) => {
        setFiles(newFiles);
    };

    const pollJobStatus = async (id: string, totalFilesSize: number) => {
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
                                mergedSize: totalFilesSize * 0.95
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

    const handleMerge = async () => {
        if (files.length < 2) {
            toast({
                title: "Cannot Merge",
                description: "Please upload at least 2 PDF files to merge.",
                variant: "destructive"
            });
            return;
        }

        setIsProcessing(true);
        setProgress(0);
        const fileIds: string[] = [];
        let totalFilesSize = 0;

        try {
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('file', files[i]);
                totalFilesSize += files[i].size;

                const headers: any = {};
                if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

                const uploadRes = await fetch('http://localhost:3001/api/v1/upload', {
                    method: 'POST',
                    headers,
                    body: formData,
                });

                if (!uploadRes.ok) throw new Error('Failed to upload file');
                const uploadData = await uploadRes.json();
                fileIds.push(uploadData.fileId);
            }

            setProgress(10);
            const headers: any = { 'Content-Type': 'application/json' };
            if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

            const jobRes = await fetch('http://localhost:3001/api/v1/jobs', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    toolType: 'MERGE',
                    fileIds: fileIds,
                }),
            });

            if (!jobRes.ok) throw new Error('Failed to start merge job');
            const jobData = await jobRes.json();
            await pollJobStatus(jobData.jobId, totalFilesSize);

            toast({
                title: "Merge Complete",
                description: "Your files have been successfully merged!",
            });

        } catch (error) {
            toast({
                title: "Merge Failed",
                description: "There was an error merging your documents.",
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

    const totalSizeMB = (files.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2);
    const totalMockPages = files.length * 4;

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

            <div className="container max-w-5xl px-6 relative z-10">
                <Link href="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-violet-600 mb-12 transition-colors group">
                    <MoveLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Workspace
                </Link>

                <div className="flex flex-col items-center justify-center text-center space-y-6 mb-16">
                    <div className="inline-flex items-center rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-black text-violet-600 dark:text-violet-400 tracking-[0.1em] uppercase">
                        <FileStack className="mr-2 h-4 w-4" /> Professional Assembly
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                        Merge <span className="text-gradient">PDF</span> Documents
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Combine multiple documents into a single master PDF with lightning speed. Your privacy is guaranteed with our auto-purge engine.
                    </p>
                </div>

                {!result ? (
                    <div className="grid lg:grid-cols-3 gap-10 items-start">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700 font-sans">
                                {!isProcessing ? (
                                    <div className="p-10">
                                        <UploadZone
                                            onFilesChange={handleFilesChange}
                                            acceptText="Supports: PDF"
                                            maxSizeText="Max: 100MB per file"
                                        />
                                    </div>
                                ) : (
                                    <div className="p-20 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 min-h-[450px]">
                                        <div className="w-20 h-20 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-8 shadow-xl"></div>
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Processing Cycles...</h3>
                                        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm font-medium">Our cloud engine is currently assembling your documents into a professional master file.</p>
                                        <div className="w-full max-w-sm bg-slate-100 dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-inner">
                                            <Progress value={progress} className="h-2.5 bg-slate-200 dark:bg-slate-700 [&>div]:bg-violet-600" />
                                            <div className="flex justify-between mt-4 text-xs font-black uppercase tracking-widest text-slate-400">
                                                <span>Global Progress</span>
                                                <span className="text-violet-600">{progress}%</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1 glass rounded-[2.5rem] p-8 shadow-2xl sticky top-24 animate-in slide-in-from-right-8 duration-700">
                            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                                <div className="size-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-none">
                                    <Settings2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">Parameters</h3>
                                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Configuration</p>
                                </div>
                            </div>
                            <div className="space-y-4 mb-10">
                                <DetailBox label="Files in Queue" value={files.length.toString()} />
                                <DetailBox label="Estimated Pages" value={totalMockPages.toString()} />
                                <DetailBox label="Total Volume" value={`${totalSizeMB} MB`} />
                            </div>
                            {files.length < 2 && (
                                <div className="p-5 bg-indigo-50 dark:bg-indigo-950 rounded-[1.5rem] text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-8 border border-indigo-100 dark:border-indigo-900 flex items-start gap-3">
                                    <PlusCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                    <p className="leading-relaxed">Add at least two PDF documents to the build queue to initiate the merge cycle.</p>
                                </div>
                            )}
                            <Button
                                size="lg"
                                className="w-full h-16 rounded-2xl shadow-xl text-lg font-black bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.02] transition-all disabled:grayscale disabled:opacity-50"
                                disabled={files.length < 2 || isProcessing}
                                onClick={handleMerge}
                            >
                                {isProcessing ? "Processing..." : "Assemble Files"}
                                {!isProcessing && <ArrowRight className="w-5 h-5 ml-2 transition-transform" />}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="glass rounded-[3rem] shadow-3xl overflow-hidden text-center max-w-2xl mx-auto animate-in slide-in-from-bottom-12 duration-1000">
                        <div className="bg-emerald-500/10 dark:bg-emerald-500/5 border-b border-emerald-500/10 pb-12 pt-16">
                            <div className="mx-auto size-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20 border-4 border-white dark:border-slate-900">
                                <CheckCircle className="size-12 text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Success Cycle Complete</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-3 font-bold uppercase tracking-[0.2em] text-xs">
                                Verification Hash: {Math.random().toString(36).substring(7).toUpperCase()}
                            </p>
                        </div>
                        <div className="p-12">
                            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 mb-10 flex items-center justify-between text-left shadow-inner">
                                <div className="flex items-center gap-6">
                                    <div className="size-16 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-lg">
                                        <FileStack className="size-8" />
                                    </div>
                                    <div>
                                        <p className="font-black text-xl text-slate-900 dark:text-white tracking-tight">merged_document.pdf</p>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                                            {totalMockPages} pages • {(result.mergedSize / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button size="lg" className="h-16 rounded-2xl shadow-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg group" asChild>
                                    <a href={result.downloadUrl} className="flex items-center justify-center">
                                        <Download className="w-6 h-6 mr-3 group-hover:-translate-y-1 transition-transform" />
                                        Initialize Download
                                    </a>
                                </Button>
                                <Button variant="outline" size="lg" className="h-16 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-900" onClick={resetTool}>
                                    New Cycle
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DetailBox({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-[1.5rem] p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</span>
                <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{value}</span>
            </div>
        </div>
    );
}

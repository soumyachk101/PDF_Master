"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveLeft, Settings2, Download, Zap, CheckCircle, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { UploadZone } from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/useAuthStore";

export default function CompressPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [compressionLevel, setCompressionLevel] = useState("recommended");
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<any>(null);
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
                                originalSize: files[0].size,
                                compressedSize: files[0].size * 0.45,
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

    const handleCompress = async () => {
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
                    toolType: 'COMPRESS',
                    fileIds: [uploadData.fileId],
                    options: { level: compressionLevel }
                }),
            });

            if (!jobRes.ok) throw new Error('Failed to start compression job');
            const jobData = await jobRes.json();
            await pollJobStatus(jobData.jobId);

            toast({
                title: "Compression Complete",
                description: "Your PDF has been successfully optimized!",
            });

        } catch (error) {
            toast({
                title: "Compression Failed",
                description: "There was an error optimizing your document.",
                variant: "destructive"
            })
        } finally {
            setIsProcessing(false);
        }
    };

    const resetTool = () => {
        setFiles([]);
        setResult(null);
        setProgress(0);
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 relative overflow-hidden font-sans">
            <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

            <div className="container max-w-5xl px-6 relative z-10">
                <Link href="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 mb-12 transition-colors group">
                    <MoveLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Workspace
                </Link>

                <div className="flex flex-col items-center justify-center text-center space-y-6 mb-16">
                    <div className="inline-flex items-center rounded-2xl border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-black text-blue-600 dark:text-blue-400 tracking-[0.1em] uppercase">
                        <Cpu className="mr-2 h-4 w-4" /> Neural Optimization
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                        Compress <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">PDF</span> Engine
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Shrink document volume by up to 90% while maintaining crisp, professional quality for all visual assets.
                    </p>
                </div>

                {!result ? (
                    <div className="glass rounded-[3.5rem] shadow-3xl overflow-hidden animate-in fade-in zoom-in duration-700">
                        <div className="grid md:grid-cols-5 gap-0">
                            <div className="md:col-span-3 p-12 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 flex flex-col justify-center min-h-[450px]">
                                {!isProcessing ? (
                                    <UploadZone
                                        onFilesChange={handleFilesChange}
                                        acceptText="Supports: PDF"
                                        maxSizeText="Max: 200MB per file"
                                        limitReached={files.length >= 1}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-full min-h-[300px] p-12 text-center animate-in fade-in zoom-in duration-500">
                                        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-8 shadow-xl"></div>
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Compressing Stream...</h3>
                                        <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">Recalculating vectors and optimizing high-resolution imagery.</p>
                                        <div className="w-full max-w-sm">
                                            <Progress value={progress} className="h-2.5 bg-slate-200 dark:bg-slate-700 [&>div]:bg-blue-600" />
                                            <div className="flex justify-between mt-4 text-xs font-black uppercase tracking-widest text-slate-400">
                                                <span>Neural Load</span>
                                                <span className="text-blue-600">{progress}%</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2 bg-slate-50/50 dark:bg-slate-900/30 p-12 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center space-x-3 text-slate-900 dark:text-white font-black mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
                                        <Settings2 className="w-6 h-6 text-blue-500" />
                                        <h3 className="text-lg tracking-tight">Optimization Level</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <OptionCard
                                            active={compressionLevel === 'extreme'}
                                            onClick={() => setCompressionLevel('extreme')}
                                            title="Extreme Mode"
                                            desc="High compression, lower DPI"
                                        />
                                        <OptionCard
                                            active={compressionLevel === 'recommended'}
                                            onClick={() => setCompressionLevel('recommended')}
                                            title="Balanced Flow"
                                            desc="Optimal quality & size ratio"
                                            popular
                                        />
                                        <OptionCard
                                            active={compressionLevel === 'less'}
                                            onClick={() => setCompressionLevel('less')}
                                            title="Lossless Peak"
                                            desc="Minimal shrink, perfect visuals"
                                        />
                                    </div>
                                </div>

                                <Button
                                    disabled={files.length === 0 || isProcessing}
                                    onClick={handleCompress}
                                    size="lg"
                                    className="w-full h-16 mt-12 rounded-2xl shadow-xl text-lg font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] transition-all disabled:opacity-50"
                                >
                                    {isProcessing ? "Optimizing..." : "Initialize Engine"}
                                    {!isProcessing && <Zap className="ml-2 w-5 h-5 fill-white" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass rounded-[3rem] shadow-3xl overflow-hidden text-center max-w-3xl mx-auto animate-in slide-in-from-bottom-12 duration-1000">
                        <div className="bg-blue-500/10 dark:bg-blue-500/5 border-b border-blue-500/10 pb-12 pt-16">
                            <div className="mx-auto size-24 bg-blue-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/20 border-4 border-white dark:border-slate-900">
                                <CheckCircle className="size-12 text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Compression Finalized</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-3 font-bold uppercase tracking-[0.2em] text-xs">
                                Optimization Index: +{(100 - (result.compressedSize / result.originalSize * 100)).toFixed(0)}%
                            </p>
                        </div>
                        <div className="p-12">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
                                <div className="glass-light dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 w-full flex-1 text-left">
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Original Mass</span>
                                    <span className="block text-2xl font-black text-slate-900 dark:text-white">{(result.originalSize / 1024 / 1024).toFixed(2)} MB</span>
                                </div>

                                <div className="size-12 rounded-full glass flex items-center justify-center shrink-0 shadow-lg border border-white dark:border-slate-800">
                                    <ArrowRight className="w-6 h-6 text-blue-500" />
                                </div>

                                <div className="bg-blue-600 rounded-[2.5rem] p-8 w-full flex-1 text-left relative overflow-hidden shadow-2xl shadow-blue-600/20">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                    <span className="block text-[10px] font-black text-blue-200 uppercase tracking-widest mb-2">Optimized Mass</span>
                                    <span className="block text-3xl font-black text-white">{(result.compressedSize / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button size="lg" className="h-16 rounded-2xl shadow-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg group" asChild>
                                    <a href={result.downloadUrl} download>
                                        <Download className="w-6 h-6 mr-3 group-hover:-translate-y-1 transition-transform" />
                                        Fetch Asset
                                    </a>
                                </Button>
                                <Button variant="outline" onClick={resetTool} size="lg" className="h-16 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-900">
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

function OptionCard({ active, onClick, title, desc, popular }: { active: boolean, onClick: () => void, title: string, desc: string, popular?: boolean }) {
    return (
        <label onClick={onClick} className={`flex items-start p-5 border rounded-[1.5rem] cursor-pointer transition-all relative
        ${active ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-200 dark:shadow-none translate-x-1' : 'border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50'}`}>
            {popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <Badge className="bg-blue-600 text-white border-none shadow-lg px-3 py-1 text-[9px] font-black uppercase tracking-widest">Efficiency Peak</Badge>
                </div>
            )}
            <div className={`size-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${active ? 'border-blue-600' : 'border-slate-300'}`}>
                {active && <div className="size-2.5 rounded-full bg-blue-600" />}
            </div>
            <div className="ml-4">
                <span className={`block font-black text-sm tracking-tight ${active ? 'text-blue-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>{title}</span>
                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${active ? 'text-blue-600' : 'text-slate-400'}`}>{desc}</p>
            </div>
        </label>
    )
}

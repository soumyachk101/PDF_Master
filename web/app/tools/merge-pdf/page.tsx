/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef, useState } from 'react';
import axios from 'axios';
import { Loader2, Upload, FileText, X, ArrowRight } from 'lucide-react';

type UploadedFile = {
  id: string;
  name: string;
  size: number;
};

type JobStatus =
  | { state: 'idle' }
  | { state: 'uploading' }
  | { state: 'creatingJob' }
  | { state: 'processing' }
  | { state: 'completed'; downloadUrl: string; fileName: string }
  | { state: 'error'; message: string };

const MAX_FREE_FILES = 20;

export default function MergePdfPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [jobStatus, setJobStatus] = useState<JobStatus>({ state: 'idle' });

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const handleSelectFiles = () => {
    inputRef.current?.click();
  };

  const handleFilesChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    if (!selected.length) return;

    if (files.length + selected.length > MAX_FREE_FILES) {
      setJobStatus({
        state: 'error',
        message: `You can upload up to ${MAX_FREE_FILES} files for merge.`
      });
      return;
    }

    try {
      setJobStatus({ state: 'uploading' });

      const uploaded: UploadedFile[] = [];
      for (const file of selected) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await axios.post(
          `${backendUrl}/api/v1/upload`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );

        const data = res.data.data;
        uploaded.push({
          id: data.fileId,
          name: data.fileName ?? file.name,
          size: data.size ?? file.size
        });
      }

      setFiles((prev) => [...prev, ...uploaded]);
      setJobStatus({ state: 'idle' });
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        'Failed to upload files. Please try again.';
      setJobStatus({ state: 'error', message });
    } finally {
      event.target.value = '';
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setJobStatus({
        state: 'error',
        message: 'Please upload at least 2 PDF files to merge.'
      });
      return;
    }

    try {
      setJobStatus({ state: 'creatingJob' });

      const res = await axios.post(`${backendUrl}/api/v1/jobs`, {
        tool: 'merge',
        fileIds: files.map((f) => f.id),
        options: {}
      });

      const jobId: string = res.data.data.jobId;
      setJobStatus({ state: 'processing' });

      // Poll job status
      let attempts = 0;
      const maxAttempts = 60;

      while (attempts < maxAttempts) {
        const statusRes = await axios.get(`${backendUrl}/api/v1/jobs/${jobId}`);
        const status = statusRes.data.data;

        if (status.status === 'COMPLETED') {
          setJobStatus({
            state: 'completed',
            downloadUrl: status.result.downloadUrl,
            fileName: status.result.fileName
          });
          return;
        }

        if (status.status === 'FAILED') {
          setJobStatus({
            state: 'error',
            message: status.errorMessage || 'Merge failed. Please try again.'
          });
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        attempts += 1;
      }

      setJobStatus({
        state: 'error',
        message: 'Merge is taking too long. Please try again later.'
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        'Failed to create merge job. Please try again.';
      setJobStatus({ state: 'error', message });
    }
  };

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <section className="mb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Merge PDF</h1>
        <p className="text-sm text-slate-600">
          Combine multiple PDF files into a single document. Files are encrypted in transit and
          deleted automatically after processing.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-[2fr,1.2fr]">
        <div className="space-y-4">
          <div
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-10 text-center transition hover:border-primary-600 hover:bg-slate-50"
            onClick={handleSelectFiles}
          >
            <Upload className="mb-3 h-8 w-8 text-primary-600" />
            <p className="mb-1 text-sm font-semibold">Drop PDF files here or click to browse</p>
            <p className="text-xs text-slate-500">
              Supports PDF • Up to {MAX_FREE_FILES} files • Free tier size limits apply
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              multiple
              className="hidden"
              onChange={handleFilesChange}
            />
          </div>

          {!!files.length && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Selected files
                </p>
                <p className="text-xs text-slate-500">
                  {files.length} file{files.length > 1 ? 's' : ''} •{' '}
                  {(totalSize / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>
              <ul className="space-y-2">
                {files.map((file) => (
                  <li
                    key={file.id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary-600" />
                      <span className="max-w-[200px] truncate md:max-w-xs">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-500">
                        {(file.size / (1024 * 1024)).toFixed(1)} MB
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(file.id)}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleMerge}
                  disabled={
                    files.length < 2 ||
                    jobStatus.state === 'uploading' ||
                    jobStatus.state === 'creatingJob' ||
                    jobStatus.state === 'processing'
                  }
                  className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {jobStatus.state === 'processing' ||
                  jobStatus.state === 'creatingJob' ||
                  jobStatus.state === 'uploading' ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5" />
                  )}
                  {jobStatus.state === 'uploading'
                    ? 'Uploading...'
                    : jobStatus.state === 'creatingJob'
                    ? 'Creating job...'
                    : jobStatus.state === 'processing'
                    ? 'Merging...'
                    : 'Merge PDFs'}
                </button>
              </div>
            </div>
          )}

          {jobStatus.state === 'error' && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {jobStatus.message}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          {jobStatus.state === 'completed' ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                Merge complete
              </p>
              <p className="mb-3 text-slate-700">
                Your merged document is ready. Click below to download it.
              </p>
              <a
                href={jobStatus.downloadUrl}
                className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Download {jobStatus.fileName || 'merged.pdf'}
              </a>
              <p className="mt-2 text-[11px] text-emerald-900">
                The file will expire automatically according to the retention policy.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                How it works
              </p>
              <ol className="mb-3 list-decimal space-y-1 pl-4 text-slate-600">
                <li>Upload 2–20 PDF files from your device.</li>
                <li>We securely upload and store them in temporary storage.</li>
                <li>
                  A background worker merges your PDFs and prepares a single download file.
                </li>
                <li>Download the merged PDF and your files are cleaned up automatically.</li>
              </ol>
              <p className="text-[11px] text-slate-500">
                For details, see the system design and file management documents in this project.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Security & limits
            </p>
            <ul className="space-y-1 text-slate-600">
              <li>Files are deleted automatically after the configured TTL (see docs).</li>
              <li>No public bucket access; downloads use signed URLs only.</li>
              <li>Free tier size limits and rate limits are enforced on the backend.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}


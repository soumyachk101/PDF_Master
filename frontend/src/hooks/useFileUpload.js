import { useState, useCallback } from 'react';
import axios from 'axios';
import { getToolBySlug } from '../utils/tools';

import API_BASE_URL from '../config/api';

export function useFileUpload(toolSlug) {
    const tool = getToolBySlug(toolSlug);
    const [appState, setAppState] = useState('upload'); // 'upload' | 'processing' | 'success' | 'error'
    const [progress, setProgress] = useState(0);
    const [resultUrl, setResultUrl] = useState(null);
    const [resultFilename, setResultFilename] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const resetState = useCallback(() => {
        setAppState('upload');
        setProgress(0);
        setResultUrl(null);
        setResultFilename(null);
        setErrorMsg('');
    }, []);

    const processFiles = useCallback(async (files = [], additionalData = {}) => {
        // Files can be empty for certain tools like html-to-pdf
        if ((!files || files.length === 0) && !additionalData.url) return;

        setAppState('processing');
        setProgress(0);
        setErrorMsg('');

        const formData = new FormData();
        if (files && files.length > 0) {
            files.forEach(file => {
                formData.append('files', file); // 'files' must match Multer backend
            });
        }

        Object.keys(additionalData).forEach(key => {
            formData.append(key, additionalData[key]);
        });

        try {
            const directBackendUrl = API_BASE_URL.replace(/\/+$/, '');

            const axiosConfig = {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob',
                timeout: 300000,
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(Math.min(percentCompleted / 2, 50));
                },
            };

            const response = await axios.post(`${directBackendUrl}/api/pdf/${toolSlug}`, formData, axiosConfig);

            let fakeProgress = setInterval(() => {
                setProgress(p => {
                    if (p >= 99) {
                        clearInterval(fakeProgress);
                        return 99;
                    }
                    return p + 2;
                });
            }, 300);

            // Handle blob response
            clearInterval(fakeProgress);
            setProgress(100);

            // Extract filename from Content-Disposition header if available
            let filename = `${toolSlug}-result${tool?.outputExt || '.pdf'}`;
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                if (filenameMatch && filenameMatch.length === 2) {
                    filename = filenameMatch[1];
                }
            }
            
            // Extract the actual mime type sent by the backend
            const contentType = response.headers['content-type'] || tool?.outputMime || 'application/pdf';

            // Create ObjectURL for the download
            const blob = response.data instanceof Blob ? response.data : new Blob([response.data], { type: contentType });
            console.log(`[download] Created blob: size=${blob.size}, type=${blob.type}, name=${filename}`);
            
            const downloadUrl = window.URL.createObjectURL(blob);

            setResultUrl(downloadUrl);
            setResultFilename(filename);
            setAppState('success');

        } catch (error) {
            console.error('File processing error:', error);
            setAppState('error');

            // When responseType is 'blob', error.response.data is a Blob — parse it
            let message = 'An error occurred during file processing.';
            if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
                message = 'Request timed out. The file might be too large or the connection is slow. Please try again with a smaller file or better connection.';
            } else if (error.response?.data instanceof Blob) {
                try {
                    const text = await error.response.data.text();
                    if (text.startsWith('{')) {
                        const json = JSON.parse(text);
                        message = json?.error?.message || json?.message || message;
                    } else {
                        // If it's not JSON, it might be an HTML error page (like Railway 404)
                        message = `Server Error: ${text.substring(0, 100)}...`;
                    }
                } catch { /* ignore parse errors */ }
            } else if (error.response?.data?.error?.message) {
                message = error.response.data.error.message;
            } else if (error.code === 'ERR_NETWORK') {
                message = 'Network error. Cannot reach the server. Please check your internet connection and make sure the backend is running.';
            } else if (!error.response) {
                message = 'Cannot reach the server. Make sure the backend is running and check your internet connection.';
            }
            setErrorMsg(message);
        }
    }, [toolSlug, tool]);

    return {
        appState,
        setAppState,
        progress,
        resultUrl,
        resultFilename,
        errorMsg,
        resetState,
        processFiles
    };
}

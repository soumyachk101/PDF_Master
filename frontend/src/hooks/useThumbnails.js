import { useState, useEffect } from 'react';
import axios from 'axios';

// Shared by organize-pdf, redact-pdf and edit-pdf — all three need a page
// preview before the user can reorder, mark, or annotate anything. Mirrors
// useFileUpload's cold-start retry pattern since this hits the same backend.
//
// `loading`/`pages`/`pageCount` are all derived from whether `fetchedForFile`
// matches the current `file`, rather than set directly — every setState call
// below happens inside an async .then()/.catch(), never synchronously in the
// effect body, which is what this project's lint rules require.
export function useThumbnails(file, enabled) {
    const [result, setResult] = useState(null); // { pages, pageCount } | null
    const [errorMsg, setErrorMsg] = useState('');
    const [fetchedForFile, setFetchedForFile] = useState(null);

    useEffect(() => {
        if (!enabled || !file || fetchedForFile === file) return;

        let cancelled = false;
        const formData = new FormData();
        formData.append('files', file);

        const RETRY_DELAYS_MS = [8000, 25000];
        const fetchThumbnails = async () => {
            for (let attempt = 0; ; attempt++) {
                try {
                    const response = await axios.post('/api/pdf/thumbnails', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        timeout: 90000,
                    });
                    return response.data;
                } catch (err) {
                    const status = err.response?.status;
                    const retryable = [502, 503, 504].includes(status);
                    if (!retryable || attempt >= RETRY_DELAYS_MS.length) throw err;
                    await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
                }
            }
        };

        fetchThumbnails()
            .then((data) => {
                if (cancelled) return;
                setResult(data);
                setErrorMsg('');
                setFetchedForFile(file);
            })
            .catch((err) => {
                if (cancelled) return;
                setResult(null);
                setErrorMsg(err.response?.data?.error?.message || 'Could not load page previews — the file may be too large or corrupted.');
                setFetchedForFile(file);
            });

        return () => { cancelled = true; };
    }, [file, enabled, fetchedForFile]);

    if (!enabled || !file) {
        return { pages: [], pageCount: 0, loading: false, error: '' };
    }

    const loading = fetchedForFile !== file;
    if (loading) {
        return { pages: [], pageCount: 0, loading: true, error: '' };
    }

    return { pages: result?.pages || [], pageCount: result?.pageCount || 0, loading: false, error: errorMsg };
}

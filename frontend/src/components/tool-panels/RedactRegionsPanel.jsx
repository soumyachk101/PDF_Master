'use client';

import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { useThumbnails } from '@/hooks/useThumbnails';

// Minimum drag distance (px) before a region counts as drawn, so an accidental
// click doesn't create a zero-size region.
const MIN_REGION_SIZE = 8;

export default function RedactRegionsPanel({ file, onRegionsChange }) {
    const { pages, loading, error } = useThumbnails(file, !!file);
    // { [pageIndex]: [{ id, x, y, w, h }] } in on-screen pixel space, per page container
    const [regionsByPage, setRegionsByPage] = useState({});
    const containerRefs = useRef({});
    // Live drag state is read during render (to show the in-progress rectangle),
    // so it must be React state, not a ref — refs can't be read during render.
    const [drag, setDrag] = useState(null);

    const totalRegions = Object.values(regionsByPage).reduce((n, arr) => n + arr.length, 0);

    // PyMuPDF (the engine behind redact-pdf) uses a top-left origin, y-down page
    // space — empirically verified, same orientation as these on-screen pixels.
    // This is a straight scale, NOT the bottom-left/y-up flip pdf-lib paths need.
    const emit = (next) => {
        setRegionsByPage(next);
        const output = [];
        Object.entries(next).forEach(([pageIndexStr, rects]) => {
            const pageIndex = Number(pageIndexStr);
            const page = pages.find((p) => p.index === pageIndex);
            const container = containerRefs.current[pageIndex];
            if (!page || !container || rects.length === 0) return;
            const scale = page.width / container.clientWidth;
            rects.forEach((r) => {
                output.push({
                    page: pageIndex,
                    x: r.x * scale,
                    y: r.y * scale,
                    width: r.w * scale,
                    height: r.h * scale,
                });
            });
        });
        onRegionsChange(output);
    };

    const handlePointerDown = (pageIndex, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setDrag({
            pageIndex,
            startX: e.clientX - rect.left,
            startY: e.clientY - rect.top,
            curX: null,
            curY: null,
        });
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (pageIndex, e) => {
        if (!drag || drag.pageIndex !== pageIndex) return;
        const rect = e.currentTarget.getBoundingClientRect();
        setDrag({ ...drag, curX: e.clientX - rect.left, curY: e.clientY - rect.top });
    };

    const handlePointerUp = (pageIndex) => {
        const d = drag;
        setDrag(null);
        if (!d || d.curX == null) return;
        const x = Math.min(d.startX, d.curX);
        const y = Math.min(d.startY, d.curY);
        const w = Math.abs(d.curX - d.startX);
        const h = Math.abs(d.curY - d.startY);
        if (w < MIN_REGION_SIZE || h < MIN_REGION_SIZE) return;
        const id = `${pageIndex}-${x}-${y}-${w}-${h}`;
        const next = { ...regionsByPage, [pageIndex]: [...(regionsByPage[pageIndex] || []), { id, x, y, w, h }] };
        emit(next);
    };

    const removeRegion = (pageIndex, id) => {
        const next = { ...regionsByPage, [pageIndex]: (regionsByPage[pageIndex] || []).filter((r) => r.id !== id) };
        emit(next);
    };

    if (loading) {
        return (
            <div className="mt-5 text-center py-8">
                <div className="w-8 h-8 rounded-full border-2 border-[#e5e7eb] border-t-[#000000] animate-spin mx-auto mb-3" />
                <p className="text-xs text-[#444444] font-suisseintlmono">Loading page previews...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-5 p-3 border border-red-600 bg-red-50 text-red-600 text-xs font-suisseintlmono rounded-[8px]">
                {error}
            </div>
        );
    }

    if (pages.length === 0) return null;

    return (
        <div className="mt-5 space-y-3 text-left">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                Drag a box over anything to redact — {totalRegions} region{totalRegions === 1 ? '' : 's'} marked
            </label>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {pages.map((page) => {
                    const isDraggingThis = drag && drag.pageIndex === page.index && drag.curX != null;
                    return (
                        <div key={page.index} className="border border-[#000000]/20 p-2 rounded-[8px]">
                            <p className="text-[9px] font-suisseintlmono text-[#444444] mb-1">Page {page.index}</p>
                            <div
                                ref={(el) => { containerRefs.current[page.index] = el; }}
                                className="relative select-none touch-none cursor-crosshair inline-block"
                                onPointerDown={(e) => handlePointerDown(page.index, e)}
                                onPointerMove={(e) => handlePointerMove(page.index, e)}
                                onPointerUp={() => handlePointerUp(page.index)}
                            >
                                <img
                                    src={page.thumbnail}
                                    alt={`Page ${page.index}`}
                                    className="block max-w-full h-auto pointer-events-none"
                                    draggable={false}
                                />
                                {(regionsByPage[page.index] || []).map((r) => (
                                    <div
                                        key={r.id}
                                        className="absolute bg-black/85 border border-red-500 group"
                                        style={{ left: r.x, top: r.y, width: r.w, height: r.h }}
                                    >
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeRegion(page.index, r.id); }}
                                            className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Remove region"
                                        >
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                                {isDraggingThis && (
                                    <div
                                        className="absolute border-2 border-dashed border-red-500 bg-red-500/20 pointer-events-none"
                                        style={{
                                            left: Math.min(drag.startX, drag.curX),
                                            top: Math.min(drag.startY, drag.curY),
                                            width: Math.abs(drag.curX - drag.startX),
                                            height: Math.abs(drag.curY - drag.startY),
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

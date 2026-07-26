'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Type, Pen, Undo2, Trash2 } from 'lucide-react';
import { useThumbnails } from '@/hooks/useThumbnails';
import { cn } from '@/components/ui/IndustrialComponents';

const COLORS = ['#000000', '#dc2626', '#2563eb', '#16a34a'];
// Minimum on-screen distance (px) between recorded pen points — avoids a
// pointermove-per-pixel flood turning into hundreds of near-duplicate segments.
const MIN_POINT_DISTANCE = 4;

export default function EditAnnotationsPanel({ file, onAnnotationsChange }) {
    const { pages, loading, error } = useThumbnails(file, !!file);
    const [activeTool, setActiveTool] = useState('text'); // 'text' | 'pen'
    const [activeColor, setActiveColor] = useState(COLORS[0]);
    // { [pageIndex]: [{ type: 'text', x, y, text, color } | { type: 'draw', points, color }] }
    const [itemsByPage, setItemsByPage] = useState({});
    const [textInputAt, setTextInputAt] = useState(null); // { pageIndex, x, y }
    const [textInputValue, setTextInputValue] = useState('');
    const containerRefs = useRef({});
    const canvasRefs = useRef({});
    const drawingRef = useRef(null); // { pageIndex, points: [{x,y}] } while actively dragging

    const totalItems = Object.values(itemsByPage).reduce((n, arr) => n + arr.length, 0);

    // pdf-lib (the engine behind edit-pdf) is bottom-left origin, y-up — the
    // opposite orientation from redact-pdf's PyMuPDF path. Flip is required here.
    const emit = useCallback((next) => {
        setItemsByPage(next);
        const output = [];
        Object.entries(next).forEach(([pageIndexStr, items]) => {
            const pageIndex = Number(pageIndexStr);
            const page = pages.find((p) => p.index === pageIndex);
            const container = containerRefs.current[pageIndex];
            if (!page || !container) return;
            const scale = page.width / container.clientWidth;
            items.forEach((item) => {
                if (item.type === 'text') {
                    output.push({
                        type: 'text',
                        page: pageIndex,
                        x: item.x * scale,
                        y: page.height - item.y * scale,
                        text: item.text,
                        size: 14,
                        color: item.color,
                    });
                } else if (item.type === 'draw') {
                    output.push({
                        type: 'draw',
                        page: pageIndex,
                        points: item.points.map((p) => ({ x: p.x * scale, y: page.height - p.y * scale })),
                        color: item.color,
                        width: 2,
                    });
                }
            });
        });
        onAnnotationsChange(output);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages]);

    const redrawCanvas = useCallback((pageIndex) => {
        const canvas = canvasRefs.current[pageIndex];
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const drawStroke = (points, color) => {
            if (points.length < 2) return;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
        };

        (itemsByPage[pageIndex] || []).forEach((item) => {
            if (item.type === 'draw') drawStroke(item.points, item.color);
        });

        if (drawingRef.current && drawingRef.current.pageIndex === pageIndex) {
            drawStroke(drawingRef.current.points, activeColor);
        }
    }, [itemsByPage, activeColor]);

    useEffect(() => {
        pages.forEach((page) => redrawCanvas(page.index));
    }, [pages, itemsByPage, redrawCanvas]);

    const sizeCanvasToImage = (pageIndex, imgEl) => {
        const canvas = canvasRefs.current[pageIndex];
        if (!canvas || !imgEl) return;
        canvas.width = imgEl.clientWidth;
        canvas.height = imgEl.clientHeight;
        redrawCanvas(pageIndex);
    };

    const handleContainerClick = (pageIndex, e) => {
        if (activeTool !== 'text') return;
        const rect = e.currentTarget.getBoundingClientRect();
        setTextInputAt({ pageIndex, x: e.clientX - rect.left, y: e.clientY - rect.top });
        setTextInputValue('');
    };

    const commitTextInput = () => {
        if (textInputAt && textInputValue.trim()) {
            const { pageIndex, x, y } = textInputAt;
            const next = {
                ...itemsByPage,
                [pageIndex]: [...(itemsByPage[pageIndex] || []), { type: 'text', x, y, text: textInputValue.trim(), color: activeColor }],
            };
            emit(next);
        }
        setTextInputAt(null);
        setTextInputValue('');
    };

    const handlePointerDown = (pageIndex, e) => {
        if (activeTool !== 'pen') return;
        const rect = e.currentTarget.getBoundingClientRect();
        drawingRef.current = { pageIndex, points: [{ x: e.clientX - rect.left, y: e.clientY - rect.top }] };
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (pageIndex, e) => {
        if (activeTool !== 'pen' || !drawingRef.current || drawingRef.current.pageIndex !== pageIndex) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const pts = drawingRef.current.points;
        const last = pts[pts.length - 1];
        if (Math.hypot(x - last.x, y - last.y) >= MIN_POINT_DISTANCE) {
            pts.push({ x, y });
            redrawCanvas(pageIndex);
        }
    };

    const handlePointerUp = (pageIndex) => {
        const d = drawingRef.current;
        drawingRef.current = null;
        if (!d || d.points.length < 2) { redrawCanvas(pageIndex); return; }
        const next = {
            ...itemsByPage,
            [pageIndex]: [...(itemsByPage[pageIndex] || []), { type: 'draw', points: d.points, color: activeColor }],
        };
        emit(next);
    };

    const undoLast = () => {
        const pageIndexes = Object.keys(itemsByPage).map(Number);
        let lastPage = null;
        pageIndexes.forEach((p) => { if ((itemsByPage[p] || []).length > 0) lastPage = p; });
        if (lastPage == null) return;
        const next = { ...itemsByPage, [lastPage]: itemsByPage[lastPage].slice(0, -1) };
        emit(next);
    };

    const clearAll = () => emit({});

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
            <div className="flex flex-wrap items-center gap-2">
                {[{ id: 'text', label: 'Text', icon: Type }, { id: 'pen', label: 'Pen', icon: Pen }].map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveTool(t.id)}
                        className={cn(
                            'h-9 px-3 border text-[10px] font-bold uppercase flex items-center gap-1.5 transition-all duration-150 font-suisseintlmono',
                            activeTool === t.id ? 'bg-[#000000] text-[#ffffff] border-[#000000]' : 'bg-[#ffffff] text-[#444444] border-[#000000]/15 hover:border-[#000000]'
                        )}
                    >
                        <t.icon size={13} /> {t.label}
                    </button>
                ))}
                <div className="flex items-center gap-1 ml-1">
                    {COLORS.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setActiveColor(c)}
                            aria-label={`Color ${c}`}
                            className={cn('w-6 h-6 rounded-full border-2', activeColor === c ? 'border-[#000000]' : 'border-[#000000]/15')}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-1 ml-auto">
                    <button type="button" onClick={undoLast} disabled={totalItems === 0} className="h-9 px-3 border border-[#000000]/15 text-[#444444] hover:border-[#000000] hover:text-[#000000] disabled:opacity-30 flex items-center gap-1.5 text-[10px] font-bold uppercase font-suisseintlmono">
                        <Undo2 size={13} /> Undo
                    </button>
                    <button type="button" onClick={clearAll} disabled={totalItems === 0} className="h-9 px-3 border border-[#000000]/15 text-[#444444] hover:border-red-600 hover:text-red-600 disabled:opacity-30 flex items-center gap-1.5 text-[10px] font-bold uppercase font-suisseintlmono">
                        <Trash2 size={13} /> Clear
                    </button>
                </div>
            </div>

            <p className="font-suisseintlmono text-[9px] text-[#444444]">
                {activeTool === 'text' ? 'Click anywhere on a page to place text.' : 'Drag across a page to draw.'} {totalItems} annotation{totalItems === 1 ? '' : 's'} placed.
            </p>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {pages.map((page) => (
                    <div key={page.index} className="border border-[#000000]/20 p-2 rounded-[8px]">
                        <p className="text-[9px] font-suisseintlmono text-[#444444] mb-1">Page {page.index}</p>
                        <div
                            ref={(el) => { containerRefs.current[page.index] = el; }}
                            className={cn('relative select-none touch-none inline-block', activeTool === 'pen' ? 'cursor-crosshair' : 'cursor-text')}
                            onClick={(e) => handleContainerClick(page.index, e)}
                            onPointerDown={(e) => handlePointerDown(page.index, e)}
                            onPointerMove={(e) => handlePointerMove(page.index, e)}
                            onPointerUp={() => handlePointerUp(page.index)}
                        >
                            <img
                                src={page.thumbnail}
                                alt={`Page ${page.index}`}
                                className="block max-w-full h-auto pointer-events-none"
                                draggable={false}
                                onLoad={(e) => sizeCanvasToImage(page.index, e.currentTarget)}
                            />
                            <canvas
                                ref={(el) => { canvasRefs.current[page.index] = el; }}
                                className="absolute inset-0 pointer-events-none"
                            />
                            {(itemsByPage[page.index] || []).filter((i) => i.type === 'text').map((item, i) => (
                                <span
                                    key={i}
                                    className="absolute text-sm font-bold pointer-events-none select-none"
                                    style={{ left: item.x, top: item.y - 10, color: item.color }}
                                >
                                    {item.text}
                                </span>
                            ))}
                            {textInputAt && textInputAt.pageIndex === page.index && (
                                <input
                                    autoFocus
                                    type="text"
                                    value={textInputValue}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => setTextInputValue(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') commitTextInput(); if (e.key === 'Escape') { setTextInputAt(null); setTextInputValue(''); } }}
                                    onBlur={commitTextInput}
                                    placeholder="Type..."
                                    className="absolute z-10 h-7 px-2 text-sm border border-[#000000] bg-[#ffffff] focus:outline-none rounded-[4px]"
                                    style={{ left: textInputAt.x, top: textInputAt.y - 14, color: activeColor }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

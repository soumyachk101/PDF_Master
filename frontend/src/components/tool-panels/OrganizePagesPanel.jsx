'use client';

import { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { X, GripVertical } from 'lucide-react';
import { useThumbnails } from '@/hooks/useThumbnails';

export default function OrganizePagesPanel({ file, onOrderChange }) {
    const { pages, loading, error } = useThumbnails(file, !!file);
    const [items, setItems] = useState([]);
    // Reset the editable (reorderable/deletable) copy whenever a new set of
    // pages arrives, computed during render rather than via an effect — React's
    // documented alternative to "derive state from props" for editable local copies.
    const [syncedPages, setSyncedPages] = useState(pages);
    if (pages !== syncedPages) {
        setSyncedPages(pages);
        setItems(pages.map((p) => ({ originalIndex: p.index, thumbnail: p.thumbnail })));
    }

    useEffect(() => {
        onOrderChange(items.map((i) => i.originalIndex).join(','));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const removeItem = (originalIndex) => {
        setItems((prev) => prev.filter((i) => i.originalIndex !== originalIndex));
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

    if (items.length === 0) return null;

    return (
        <div className="mt-5 space-y-2 text-left">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] font-suisseintlmono">
                Drag to reorder — {items.length} page{items.length === 1 ? '' : 's'}
            </label>
            <Reorder.Group
                axis="y"
                values={items}
                onReorder={setItems}
                className="space-y-2 max-h-[400px] overflow-y-auto pr-1"
            >
                {items.map((item) => (
                    <Reorder.Item
                        key={item.originalIndex}
                        value={item}
                        className="flex items-center gap-3 p-2 border border-[#000000]/20 bg-[#ffffff] rounded-[8px] cursor-grab active:cursor-grabbing"
                    >
                        <GripVertical size={16} className="text-[#444444] flex-shrink-0" />
                        <img
                            src={item.thumbnail}
                            alt={`Page ${item.originalIndex}`}
                            className="h-16 w-auto border border-[#000000]/10 flex-shrink-0 pointer-events-none"
                            draggable={false}
                        />
                        <span className="text-xs font-suisseintlmono text-[#444444] flex-1">
                            Page {item.originalIndex}
                        </span>
                        <button
                            type="button"
                            onClick={() => removeItem(item.originalIndex)}
                            className="w-7 h-7 flex items-center justify-center border border-[#000000]/15 hover:border-red-600 hover:text-red-600 text-[#444444] flex-shrink-0 transition-colors"
                            aria-label={`Remove page ${item.originalIndex}`}
                        >
                            <X size={14} />
                        </button>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
}

"use client";

import { useState } from "react";
import { X, Grid3X3, Plus, Minus } from "lucide-react";

interface TableEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (rows: number, cols: number) => void;
}

export function TableEditor({ isOpen, onClose, onInsert }: TableEditorProps) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  if (!isOpen) return null;

  const handleInsert = () => {
    onInsert(rows, cols);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[var(--card)] rounded-xl shadow-xl w-96 max-w-[90vw] overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Grid3X3 size={18} />
            Insert Table
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[var(--border)] rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Rows</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRows(Math.max(1, rows - 1))}
                  className="p-1 hover:bg-[var(--border)] rounded transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-mono">{rows}</span>
                <button
                  onClick={() => setRows(Math.min(20, rows + 1))}
                  className="p-1 hover:bg-[var(--border)] rounded transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Columns</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCols(Math.max(1, cols - 1))}
                  className="p-1 hover:bg-[var(--border)] rounded transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-mono">{cols}</span>
                <button
                  onClick={() => setCols(Math.min(10, cols + 1))}
                  className="p-1 hover:bg-[var(--border)] rounded transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[var(--background)] rounded-lg">
            <p className="text-xs opacity-60 mb-2">Preview:</p>
            <div className="space-y-1">
              {/* Header row */}
              <div className="flex gap-1">
                {Array.from({ length: cols }).map((_, i) => (
                  <div
                    key={`header-${i}`}
                    className="flex-1 h-6 bg-[var(--accent-primary)]/20 rounded border border-[var(--border)]"
                  />
                ))}
              </div>
              {/* Data rows */}
              {Array.from({ length: Math.min(rows - 1, 3) }).map((_, rowIdx) => (
                <div key={`row-${rowIdx}`} className="flex gap-1">
                  {Array.from({ length: cols }).map((_, colIdx) => (
                    <div
                      key={`cell-${rowIdx}-${colIdx}`}
                      className="flex-1 h-6 bg-[var(--card)] rounded border border-[var(--border)]"
                    />
                  ))}
                </div>
              ))}
              {rows > 4 && (
                <p className="text-xs text-center opacity-40">
                  + {rows - 4} more rows
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--border)] transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleInsert}
              className="flex-1 px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-white hover:opacity-90 transition-opacity text-sm"
            >
              Insert Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

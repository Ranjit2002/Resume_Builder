"use client";

import React, { useRef, useState } from "react";
import { Upload, Trash2, Image as ImageIcon, Link as LinkIcon, Smartphone } from "lucide-react";
import { Button } from "./Button";

export interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholderUrl?: string;
  helperText?: string;
}

/**
 * Resizes and compresses image to prevent localStorage QuotaExceeded errors
 * while maintaining crisp resolution on resumes and PDFs.
 */
function compressImage(
  file: File,
  maxWidth = 600,
  maxHeight = 600,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const rawData = e.target?.result as string;
      if (!rawData) {
        resolve("");
        return;
      }

      // For SVGs or non-bitmap images, return data directly
      if (file.type === "image/svg+xml") {
        resolve(rawData);
        return;
      }

      const img = new Image();
      img.onerror = () => resolve(rawData);
      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(rawData);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const outputType =
            file.type === "image/png" ? "image/png" : "image/jpeg";
          const compressed = canvas.toDataURL(outputType, quality);
          resolve(compressed);
        } catch {
          resolve(rawData);
        }
      };
      img.src = rawData;
    };
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({
  label = "Profile Photo (URL or Device Upload)",
  value = "",
  onChange,
  placeholderUrl = "https://example.com/avatar.jpg",
  helperText,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isDataUrl = value?.startsWith("data:image");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WebP, etc.)");
      return;
    }

    try {
      setIsUploading(true);
      const compressedDataUrl = await compressImage(file);
      onChange(compressedDataUrl);
    } catch (err) {
      console.error("Failed to process image file:", err);
      alert("Could not load this image file. Please try another image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please drop a valid image file");
      return;
    }

    try {
      setIsUploading(true);
      const compressedDataUrl = await compressImage(file);
      onChange(compressedDataUrl);
    } catch (err) {
      console.error("Failed to process image file:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {label}
        </label>
      )}

      {/* Main Container */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-3 rounded-2xl border transition-all ${isDragging
          ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20"
          : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60"
          }`}
      >
        {/* Hidden Native File Input (works for PC files & Mobile gallery/camera) */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Top row: Preview thumbnail + Device Upload button */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          {/* Avatar Thumbnail Preview */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden flex items-center justify-center shadow-2xs">
              {value ? (
                <img
                  src={value}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder icon if URL fails
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <ImageIcon className="w-6 h-6 text-slate-400 dark:text-slate-500" />
              )}
            </div>
            {value && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            )}
          </div>

          {/* Action buttons */}
          <div className="flex-1 min-w-[200px] flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              leftIcon={<Upload className="w-3.5 h-3.5" />}
              className="text-xs h-8 px-3"
            >
              {isUploading ? "Uploading..." : "Upload from Device"}
            </Button>

            {value && (
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition-colors"
                title="Remove current photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            )}

          </div>
        </div>

        {/* Divider / Secondary option */}
        <div className="relative my-2.5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-50/50 dark:bg-slate-900/60 px-2 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
              or enter photo URL
            </span>
          </div>
        </div>

        {/* URL Input field */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <LinkIcon className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            placeholder={placeholderUrl}
            value={isDataUrl ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 shadow-2xs transition-colors"
          />
          {isDataUrl && (
            <div className="mt-1 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400">
              <span>✓ Photo loaded from device</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Type above to switch to external URL
              </span>
            </div>
          )}
        </div>
      </div>

      {helperText && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
}

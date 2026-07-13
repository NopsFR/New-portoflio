import React, { useState, useEffect, useCallback } from 'react';
import { getSession } from '../../lib/auth';
import {
  Upload,
  Image,
  Trash2,
  Loader2,
  CheckCircle2,
  XCircle,
  Download,
  Copy,
  ExternalLink,
  RefreshCw,
  FolderOpen,
  FileImage,
} from 'lucide-react';

// Admin token for API requests - matches the serverless function
const ADMIN_TOKEN = 'Blindedbythesun@72';

function MediaPage() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // { type: 'success'|'error', message }
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);
  const session = getSession();

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/list-images');
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      }
    } catch (err) {
      console.error('Failed to fetch images:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    const fileInput = document.getElementById('media-file-input');
    const file = fileInput?.files?.[0];

    if (!file) {
      setUploadStatus({ type: 'error', message: 'Please select a file first' });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setUploadStatus({
        type: 'success',
        message: `Uploaded: ${file.name} (${(data.size / 1024).toFixed(1)} KB)`,
      });

      // Reset
      fileInput.value = '';
      setPreview(null);

      // Refresh image list
      await fetchImages();
    } catch (err) {
      setUploadStatus({ type: 'error', message: err.message });
    } finally {
      setUploading(false);
      setTimeout(() => setUploadStatus(null), 5000);
    }
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString();
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const input = document.getElementById('media-file-input');
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono font-bold text-white">Media Library</h1>
          <p className="text-gray-500 font-mono text-sm mt-1">
            Upload and manage images via Vercel Blob Storage
          </p>
        </div>
        <button
          onClick={fetchImages}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 font-mono text-xs hover:bg-gray-700 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Upload Section */}
      <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6">
        <h2 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4 text-[#00ff41]" />
          Upload Image
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
              dragging
                ? 'border-[#00ff41] bg-[#00ff41]/5'
                : 'border-gray-700 hover:border-gray-500 bg-[#050508]'
            }`}
            onClick={() => document.getElementById('media-file-input')?.click()}
          >
            <input
              id="media-file-input"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
              onChange={handleFileSelect}
              className="hidden"
            />

            {preview ? (
              <div className="space-y-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg border border-gray-700"
                />
                <p className="text-gray-400 font-mono text-xs">Click to change image</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#00ff41]/10 border border-[#00ff41]/30 flex items-center justify-center">
                  <Image className="w-7 h-7 text-[#00ff41]" />
                </div>
                <p className="text-gray-300 font-mono text-sm">
                  Drag & drop an image here, or click to browse
                </p>
                <p className="text-gray-600 font-mono text-xs">
                  JPEG, PNG, GIF, WebP, SVG — Max 10MB
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={uploading || !preview}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-sm transition-all bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/20 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload to Blob Storage
              </>
            )}
          </button>
        </form>

        {/* Status Message */}
        {uploadStatus && (
          <div className={`mt-4 flex items-center gap-2 p-3 rounded-lg font-mono text-xs ${
            uploadStatus.type === 'success'
              ? 'bg-green-900/20 border border-green-800/50 text-green-400'
              : 'bg-red-900/20 border border-red-800/50 text-red-400'
          }`}>
            {uploadStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {uploadStatus.message}
          </div>
        )}
      </div>

      {/* Image Gallery */}
      <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6">
        <h2 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-[#00ff41]" />
          Stored Images ({images.length})
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-[#00ff41] animate-spin" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <FileImage className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 font-mono text-sm">No images uploaded yet</p>
            <p className="text-gray-600 font-mono text-xs mt-1">
              Upload your first image above
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div
                key={img.pathname || i}
                className="bg-[#050508] border border-gray-800 rounded-lg overflow-hidden group hover:border-[#00ff41]/30 transition-all"
              >
                {/* Image Preview */}
                <div className="relative aspect-square bg-[#0a0a0f] flex items-center justify-center">
                  <img
                    src={img.url}
                    alt={img.pathname}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/20 transition-all"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => copyToClipboard(img.url)}
                      className="p-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 hover:bg-gray-600 transition-all"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 space-y-1">
                  <p className="text-gray-300 font-mono text-[11px] truncate" title={img.pathname}>
                    {img.pathname.split('/').pop()}
                  </p>
                  <div className="flex justify-between text-gray-500 font-mono text-[10px]">
                    <span>{formatSize(img.size)}</span>
                    <span>{img.contentType?.split('/')[1] || 'unknown'}</span>
                  </div>
                  <div className="text-gray-600 font-mono text-[9px]">
                    {formatDate(img.uploadedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Storage Info */}
      <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
        <h3 className="text-white font-mono font-bold mb-3">Storage Info</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-mono font-bold text-[#00ff41]">{images.length}</p>
            <p className="text-gray-500 font-mono text-xs mt-1">Total Images</p>
          </div>
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-mono font-bold text-blue-400">
              {formatSize(images.reduce((sum, img) => sum + (img.size || 0), 0))}
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">Total Size</p>
          </div>
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-mono font-bold text-purple-400">
              Vercel Blob
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">Storage Backend</p>
          </div>
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-mono font-bold text-yellow-400">
              Public
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">Access Level</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaPage;
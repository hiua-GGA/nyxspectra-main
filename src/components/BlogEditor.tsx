import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('File must be an image (JPEG, PNG, GIF, or WEBP)');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size exceeds 5MB limit');
      return;
    }

    // Upload image
    setIsUploading(true);
    setUploadError('');

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error uploading image');
      }

      // Insert image HTML at cursor position
      const imageHTML = `<img src="${data.filePath}" alt="Uploaded image" class="max-w-full h-auto rounded-lg my-4" />`;
      
      if (editorRef.current) {
        const cursorPos = editorRef.current.selectionStart;
        const textBefore = value.substring(0, cursorPos);
        const textAfter = value.substring(cursorPos);
        
        // Add a newline before and after the image if not already there
        const newValue = `${textBefore}${textBefore.endsWith('\n') ? '' : '\n'}${imageHTML}${textAfter.startsWith('\n') ? '' : '\n'}${textAfter}`;
        
        onChange(newValue);
        
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Error uploading image');
      console.error('Error uploading image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleBoldClick = () => {
    if (editorRef.current) {
      const start = editorRef.current.selectionStart;
      const end = editorRef.current.selectionEnd;
      const selectedText = value.substring(start, end);
      const textBefore = value.substring(0, start);
      const textAfter = value.substring(end);
      
      onChange(`${textBefore}<strong>${selectedText}</strong>${textAfter}`);
    }
  };

  const handleItalicClick = () => {
    if (editorRef.current) {
      const start = editorRef.current.selectionStart;
      const end = editorRef.current.selectionEnd;
      const selectedText = value.substring(start, end);
      const textBefore = value.substring(0, start);
      const textAfter = value.substring(end);
      
      onChange(`${textBefore}<em>${selectedText}</em>${textAfter}`);
    }
  };

  const handleHeadingClick = () => {
    if (editorRef.current) {
      const start = editorRef.current.selectionStart;
      const end = editorRef.current.selectionEnd;
      const selectedText = value.substring(start, end);
      const textBefore = value.substring(0, start);
      const textAfter = value.substring(end);
      
      onChange(`${textBefore}<h2>${selectedText}</h2>${textAfter}`);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center">
        <button
          type="button"
          onClick={handleBoldClick}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded mr-1"
          title="Bold"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 10a3.5 3.5 0 01-3.5 3.5H5V6h5a3.5 3.5 0 013.5 3.5v.5zm0 0a3.5 3.5 0 003.5 3.5H15V6h-2a3.5 3.5 0 00-3.5 3.5v.5z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleItalicClick}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded mr-1"
          title="Italic"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 5v10h2V5H6zm4 0v10h2V5h-2zm4 0v10h2V5h-2z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleHeadingClick}
          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded mr-1"
          title="Heading"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4a1.5 1.5 0 100 3h-7a1.5 1.5 0 100-3h7zm-7 6a1.5 1.5 0 100 3h7a1.5 1.5 0 100-3h-7zm-6 8a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z" />
          </svg>
        </button>
        <div className="h-4 w-0.5 bg-gray-300 mx-2"></div>
        <button
          type="button"
          onClick={handleImageClick}
          className={`p-1.5 text-gray-600 hover:bg-gray-200 rounded mr-1 flex items-center ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isUploading}
          title="Insert Image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          {isUploading && <span className="ml-2 text-xs">Uploading...</span>}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Error message */}
      {uploadError && (
        <div className="bg-red-50 text-red-600 px-3 py-2 text-sm">
          {uploadError}
        </div>
      )}

      {/* Editor */}
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        className="w-full px-4 py-2 focus:outline-none"
        placeholder="Write your content here... HTML is supported for formatting."
      ></textarea>
    </div>
  );
} 
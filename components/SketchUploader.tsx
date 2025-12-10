import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface SketchUploaderProps {
  onImageSelected: (base64: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export const SketchUploader: React.FC<SketchUploaderProps> = ({ onImageSelected, selectedImage, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelected(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  }, [onImageSelected]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  if (selectedImage) {
    return (
      <div className="relative group w-full h-64 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-200">
        <img 
          src={selectedImage} 
          alt="Sketch Preview" 
          className="w-full h-full object-contain p-4"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={onClear}
            className="bg-white/90 text-red-600 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-white transition-colors shadow-lg"
          >
            <X size={18} /> Remove Sketch
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer
        ${isDragging ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}
      `}
    >
      <label className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
        <div className="bg-indigo-100 p-4 rounded-full mb-4">
          <Upload className="text-indigo-600 w-8 h-8" />
        </div>
        <p className="text-slate-700 font-medium text-lg">Upload your UI Sketch</p>
        <p className="text-slate-500 text-sm mt-2">Drag & drop or click to browse</p>
        <p className="text-slate-400 text-xs mt-4">Supports JPG, PNG, WEBP</p>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

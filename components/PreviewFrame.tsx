import React, { useEffect, useRef } from 'react';
import { RefreshCw, Smartphone, Monitor } from 'lucide-react';

interface PreviewFrameProps {
  htmlCode: string;
  isGenerating: boolean;
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({ htmlCode, isGenerating }) => {
  const [device, setDevice] = React.useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
      <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-slate-400 text-xs ml-3 font-mono">live-preview.html</span>
        </div>
        
        <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-700">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-md transition-all ${device === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Desktop View"
          >
            <Monitor size={16} />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-md transition-all ${device === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Mobile View"
          >
            <Smartphone size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative w-full bg-white flex justify-center overflow-hidden">
        {isGenerating && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <RefreshCw className="animate-spin text-indigo-400 w-10 h-10 mb-4" />
              <p className="text-white font-medium animate-pulse">Generative AI at work...</p>
            </div>
          </div>
        )}
        
        <iframe
          title="Generated Preview"
          srcDoc={htmlCode || '<div style="display:flex;height:100%;align-items:center;justify-content:center;color:#64748b;font-family:sans-serif;">Ready to visualize your sketch</div>'}
          className={`h-full transition-all duration-300 bg-white ${device === 'mobile' ? 'w-[375px] border-x border-slate-200 shadow-xl' : 'w-full'}`}
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
};

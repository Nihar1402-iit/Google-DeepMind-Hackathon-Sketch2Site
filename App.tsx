import React, { useState } from 'react';
import { SketchUploader } from './components/SketchUploader';
import { PreviewFrame } from './components/PreviewFrame';
import { generateCodeFromSketch, refineCode } from './services/geminiService';
import { AppStatus } from './types';
import { Code, Play, Send, Sparkles, AlertCircle, Wand2, ArrowRight, X } from 'lucide-react';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [refinementPrompt, setRefinementPrompt] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleImageSelect = (base64: string) => {
    setSelectedImage(base64);
    setStatus(AppStatus.IDLE);
    setErrorMsg(null);
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setStatus(AppStatus.GENERATING);
    setErrorMsg(null);
    try {
      const code = await generateCodeFromSketch(selectedImage);
      setGeneratedCode(code);
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate code. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleRefine = async () => {
    if (!refinementPrompt.trim() || !generatedCode) return;

    const currentPrompt = refinementPrompt;
    setRefinementPrompt(""); // Clear input early
    setStatus(AppStatus.GENERATING);
    
    try {
      const newCode = await refineCode(generatedCode, currentPrompt);
      setGeneratedCode(newCode);
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to refine code. Please try again.");
      setStatus(AppStatus.SUCCESS); // Revert to success to show old code
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRefine();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10 h-16 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Wand2 className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Sketch2Site
          </h1>
          <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full border border-indigo-100 font-medium">
            Beta
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-purple-500" />
            Powered by Gemini 2.5 Flash
          </span>
          <a 
            href="#" 
            className="hover:text-indigo-600 transition-colors"
            onClick={(e) => { e.preventDefault(); setShowCode(!showCode); }}
          >
            {showCode ? 'Hide Code' : 'View Code'}
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Inputs */}
        <div className="w-1/3 min-w-[350px] max-w-[500px] bg-white border-r border-slate-200 flex flex-col p-6 overflow-y-auto">
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">1. Upload Sketch</h2>
            <p className="text-slate-500 text-sm mb-4">Upload a photo of your hand-drawn wireframe or UI sketch.</p>
            <SketchUploader 
              selectedImage={selectedImage} 
              onImageSelected={handleImageSelect}
              onClear={() => {
                setSelectedImage(null);
                setGeneratedCode("");
                setStatus(AppStatus.IDLE);
              }}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">2. Generate Code</h2>
            <p className="text-slate-500 text-sm mb-4">Gemini will analyze your sketch and write the code.</p>
            <button
              onClick={handleGenerate}
              disabled={!selectedImage || status === AppStatus.GENERATING}
              className={`
                w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all shadow-md hover:shadow-lg
                ${!selectedImage || status === AppStatus.GENERATING
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.98]'}
              `}
            >
              {status === AppStatus.GENERATING ? (
                <>Generating...</>
              ) : (
                <>
                  <Play size={18} fill="currentColor" /> Generate Website
                </>
              )}
            </button>
            {errorMsg && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start gap-2 text-sm">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {errorMsg}
              </div>
            )}
          </div>

          {generatedCode && (
            <div className="flex-1 flex flex-col min-h-[150px]">
              <h2 className="text-lg font-semibold text-slate-800 mb-2">3. Refine Result</h2>
              <p className="text-slate-500 text-sm mb-4">Not quite right? Describe changes below.</p>
              
              <div className="flex-1 flex flex-col gap-2">
                <div className="relative">
                  <textarea
                    value={refinementPrompt}
                    onChange={(e) => setRefinementPrompt(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="e.g., 'Make the hero button larger and blue', 'Add a footer with copyright'"
                    className="w-full p-4 pr-12 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none text-sm min-h-[120px]"
                    disabled={status === AppStatus.GENERATING}
                  />
                  <button
                    onClick={handleRefine}
                    disabled={status === AppStatus.GENERATING || !refinementPrompt.trim()}
                    className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:text-slate-500 transition-colors"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Preview */}
        <div className="flex-1 bg-slate-100 p-6 flex flex-col relative">
          {showCode && generatedCode ? (
             <div className="absolute inset-6 z-10 bg-slate-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-slate-700">
               <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                 <h3 className="text-slate-200 font-mono text-sm flex items-center gap-2">
                   <Code size={16} /> Source Code
                 </h3>
                 <button onClick={() => setShowCode(false)} className="text-slate-400 hover:text-white">
                   <X size={18} />
                 </button>
               </div>
               <textarea 
                readOnly 
                value={generatedCode} 
                className="flex-1 bg-slate-900 text-slate-300 font-mono text-sm p-4 outline-none resize-none"
               />
             </div>
          ) : null}
          
          <PreviewFrame htmlCode={generatedCode} isGenerating={status === AppStatus.GENERATING} />
        </div>
      </main>
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { type Property } from '../data/mockDb';
import { Megaphone, Camera, MessageCircle, Mail, Loader2, Sparkles, Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

export const Marketing: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [platform, setPlatform] = useState<'instagram' | 'facebook' | 'email'>('instagram');
  const [tone, setTone] = useState('Luxury & Exclusive');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        if (data.length > 0) setSelectedProperty(data[0].id);
      })
      .catch(err => console.error("Failed to fetch properties:", err));
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedContent('');
    setCopied(false);

    try {
      const property = properties.find(p => p.id === selectedProperty);
      const productStr = property ? `${property.title} in ${property.location} priced at $${property.price}` : 'a luxury real estate property';
      
      const response = await fetch('/api/campaigns/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, tone, product: productStr })
      });
      
      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error(error);
      setGeneratedContent("Failed to connect to the AI server.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">AI Marketing</h1>
        <p className="text-muted">Generate brand-aligned copy for social media and campaigns.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg h-fit">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Campaign Setup
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Select Property</label>
              <select 
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.title} - ${p.price.toLocaleString()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'instagram', icon: Camera, label: 'IG' },
                  { id: 'facebook', icon: MessageCircle, label: 'FB' },
                  { id: 'email', icon: Mail, label: 'Email' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id as any)}
                    className={clsx(
                      "flex flex-col items-center justify-center p-3 rounded-xl border transition-all",
                      platform === p.id 
                        ? "bg-primary/20 border-primary text-primary" 
                        : "bg-[#0B0F19] border-border text-muted hover:border-muted"
                    )}
                  >
                    <p.icon className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">Brand Tone</label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-[#0B0F19] border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option>Luxury & Exclusive</option>
                <option>Warm & Welcoming</option>
                <option>Urgent & Exciting</option>
                <option>Professional & Data-Driven</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Megaphone className="w-5 h-5" />}
              {isGenerating ? 'Drafting Content...' : 'Generate Copy'}
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Generated Result
            </h3>
            {generatedContent && (
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
            )}
          </div>

          <div className="flex-1 bg-[#0B0F19] border border-border rounded-xl p-6 relative">
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted animate-pulse">
                <Sparkles className="w-8 h-8 mb-4 text-primary" />
                <p>Applying brand guidelines...</p>
              </div>
            ) : generatedContent ? (
              <div className="text-gray-200 whitespace-pre-wrap leading-relaxed animate-slide-up text-lg font-light">
                {generatedContent}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted opacity-50">
                <Megaphone className="w-16 h-16 mb-4" />
                <p className="text-lg text-center max-w-sm">
                  Select your parameters and click generate to create high-converting marketing copy.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

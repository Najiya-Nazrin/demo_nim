import React, { useState, useEffect } from 'react';
import { type Lead } from '../data/mockDb';
import { Bot, User, CheckCircle2, MessageSquare, Send, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export const SalesAgent: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDraft, setAiDraft] = useState<{ qualification: string, draft: string } | null>(null);

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(data);
        if (data.length > 0) setSelectedLead(data[0]);
      })
      .catch(err => console.error("Failed to fetch leads:", err));
  }, []);

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setAiDraft(null);
  };

  const runAiAnalysis = async () => {
    if (!selectedLead) return;
    setIsAnalyzing(true);
    
    try {
      const response = await fetch(`/api/leads/${selectedLead.id}/analyze`, { method: 'POST' });
      const data = await response.json();
      setAiDraft(data);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      setAiDraft({ qualification: "Error", draft: "Failed to connect to AI server." });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">AI Sales Agent</h1>
        <p className="text-muted">Automated lead qualification and reply drafting.</p>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Leads List */}
        <div className="w-1/3 flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
            <h3 className="font-semibold text-white">Recent Leads</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {leads.map(lead => (
              <button
                key={lead.id}
                onClick={() => handleLeadSelect(lead)}
                className={clsx(
                  "w-full text-left p-3 rounded-xl transition-all duration-200",
                  selectedLead.id === lead.id 
                    ? "bg-primary/10 border border-primary/20" 
                    : "hover:bg-white/5 border border-transparent"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-white">{lead.name}</span>
                  <span className={clsx(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    lead.score >= 80 ? "bg-accent/10 text-accent" : "bg-yellow-500/10 text-yellow-500"
                  )}>
                    {lead.score} Score
                  </span>
                </div>
                <div className="text-sm text-muted">{lead.source}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Details & AI Action */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
          <div className="p-6 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User className="w-6 h-6" />
              </div>
              {selectedLead && (
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedLead.name}</h2>
                  <p className="text-sm text-muted">{selectedLead.email} • {selectedLead.phone}</p>
                </div>
              )}
            </div>
            <button 
              onClick={runAiAnalysis}
              disabled={isAnalyzing || !selectedLead}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
              {isAnalyzing ? 'Analyzing Lead...' : 'Generate AI Action'}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-[#0B0F19]/50">
            {aiDraft ? (
              <div className="space-y-6 animate-slide-up">
                {/* AI Qualification */}
                <div className="bg-card border border-border rounded-xl p-5 shadow-md">
                  <div className="flex items-center gap-2 mb-3 text-accent">
                    <CheckCircle2 className="w-5 h-5" />
                    <h3 className="font-semibold">AI Lead Qualification</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{aiDraft.qualification}</p>
                </div>

                {/* AI Draft */}
                <div className="bg-card border border-border rounded-xl p-5 shadow-md">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <MessageSquare className="w-5 h-5" />
                    <h3 className="font-semibold">Drafted WhatsApp Response</h3>
                  </div>
                  <div className="bg-[#0B0F19] border border-border rounded-lg p-4 mb-4 whitespace-pre-wrap text-gray-300">
                    {aiDraft.draft}
                  </div>
                  <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-muted hover:text-white transition-colors">
                      Edit Draft
                    </button>
                    <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-accent/20">
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted">
                <Bot className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">Click "Generate AI Action" to qualify lead and draft response</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

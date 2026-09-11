import React, { useState, useEffect } from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, ArrowRight, Activity, Zap } from 'lucide-react';

export const CEOAssistant: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [insight, setInsight] = useState<{ summary: string, recommendations: string[] } | null>(null);

  useEffect(() => {
    // Simulate AI analyzing company data on load
    const timer = setTimeout(() => {
      setInsight({
        summary: "Revenue is up 22% quarter-over-quarter, driven primarily by high conversion rates in the luxury segment. However, lead volume from Facebook Ads has dropped 15% in the last two weeks, causing a bottleneck at the top of the funnel.",
        recommendations: [
          "Reallocate 20% of the Facebook Ad budget to Google Search Ads for the next 14 days to stabilize lead flow.",
          "Prioritize follow-ups for the 15 'Qualified' leads in the pipeline—closing just 3 of them will hit this month's target.",
          "Consider running a remarketing campaign for the 'Downtown Apartment' properties as interest is high but conversions are lagging."
        ]
      });
      setIsGenerating(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">CEO Assistant</h1>
        <p className="text-muted">High-level insights and strategic recommendations based on live CRM data.</p>
      </div>

      {isGenerating ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-card border border-border rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse"></div>
          <Zap className="w-16 h-16 text-primary mb-6 animate-bounce" />
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Company Data</h2>
          <p className="text-muted flex items-center gap-2">
            <Activity className="w-4 h-4 animate-spin" /> Cross-referencing pipelines and revenue metrics...
          </p>
        </div>
      ) : (
        <div className="space-y-6 animate-slide-up">
          {/* Executive Summary Card */}
          <div className="bg-gradient-to-br from-[#1A2235] to-[#101726] border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Executive AI Briefing</h2>
            </div>
            
            <p className="text-xl text-gray-200 leading-relaxed font-light z-10 relative">
              {insight?.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Recommendations */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" /> Strategic Action Plan
              </h3>
              <div className="space-y-4">
                {insight?.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-[#0B0F19] border border-border/50 hover:border-primary/50 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" /> Detected Risks
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
                  <h4 className="font-semibold text-yellow-500 mb-2">Pipeline Velocity Dropping</h4>
                  <p className="text-sm text-yellow-500/80">
                    Leads in the "Contacted" stage have aged by an average of 4.2 days this week. Recommend automated follow-up sequence.
                  </p>
                  <button className="mt-4 text-sm font-medium text-yellow-500 flex items-center gap-1 hover:text-yellow-400">
                    Deploy AI Follow-ups <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

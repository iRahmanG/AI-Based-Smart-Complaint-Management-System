import React from 'react';
import { BarChart3, Activity, TrendingUp, Clock } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Real-time Insights</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Visualizing resolution bottlenecks across districts.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <Activity size={16} /> Total Complaints
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 600 }}>1,248</div>
          <div style={{ color: 'var(--success)', fontSize: '0.8rem', marginTop: '0.5rem' }}>+12% this month</div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <Clock size={16} /> Avg. Resolution
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 600 }}>14.2 hrs</div>
          <div style={{ color: 'var(--success)', fontSize: '0.8rem', marginTop: '0.5rem' }}>-2.4 hrs improvement</div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <TrendingUp size={16} /> Citizen Sat.
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--success)' }}>4.8/5</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Based on 500+ reviews</div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <BarChart3 size={16} /> Automation Rate
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--primary)' }}>94%</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>AI successful routing</div>
        </div>
      </div>

      <div className="card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ width: '80%', height: '80%', background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-muted)' }}>Interactive Map / Heatmap Visualization (Placeholder)</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

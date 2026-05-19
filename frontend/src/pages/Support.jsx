import React from 'react';
import { Mail, Phone, FileText } from 'lucide-react';

const Support = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Help & Support</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Get assistance with the Aegis AI platform.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <FileText size={48} style={{ color: 'var(--primary)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Documentation</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Read the Aegis API docs and usage guides.</p>
          <button className="btn btn-secondary">View Docs</button>
        </div>
        
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <Mail size={48} style={{ color: 'var(--success)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Contact Support</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Create a support ticket for technical issues.</p>
          <button className="btn btn-secondary">Email Support</button>
        </div>
      </div>
    </div>
  );
};

export default Support;

import React from 'react';
import { Shield, Bell, Lock, Database } from 'lucide-react';

const Settings = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Platform Settings</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure Aegis AI core preferences.</p>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Bell size={24} style={{ color: 'var(--primary)' }} />
            <div>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Notification Preferences</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Manage email and SMS routing alerts.</p>
            </div>
          </div>
          <button className="btn btn-secondary">Configure</button>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Shield size={24} style={{ color: 'var(--success)' }} />
            <div>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>AI Routing Sensitivity</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Adjust NLP confidence thresholds.</p>
            </div>
          </div>
          <button className="btn btn-secondary">Configure</button>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Lock size={24} style={{ color: 'var(--warning)' }} />
            <div>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Security & Access</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Manage 2FA and active sessions.</p>
            </div>
          </div>
          <button className="btn btn-secondary">Manage</button>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Database size={24} style={{ color: 'var(--text-muted)' }} />
            <div>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Database Backups</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>MongoDB cluster sync settings.</p>
            </div>
          </div>
          <button className="btn btn-secondary">View Logs</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

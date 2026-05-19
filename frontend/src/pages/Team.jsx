import React from 'react';

const Team = () => {
  const members = [
    { name: 'Sarah Connor', role: 'System Admin', dept: 'IT Services' },
    { name: 'John Smith', role: 'Field Agent', dept: 'Water Supply' },
    { name: 'Emily Chen', role: 'Dispatcher', dept: 'Electricity' },
    { name: 'Marcus Johnson', role: 'Manager', dept: 'Sanitation' }
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Team Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage internal users and department agents.</p>
        </div>
        <button className="btn btn-primary">Add Member</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {members.map((m, i) => (
          <div key={i} className="list-item" style={{ borderBottom: i === members.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary)', marginRight: '1rem' }}>
              {m.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>{m.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{m.role} &bull; {m.dept}</p>
            </div>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Edit Role</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;

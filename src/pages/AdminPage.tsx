import { useEffect, useState } from 'react';

interface RSVPEntry {
  id: string;
  name: string;
  guests: number;
  attending: boolean;
  meal: string;
  message: string;
  timestamp: string;
}

export default function AdminPage() {
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('onyx_rsvp_data') || '[]');
    setRsvps(data);
  }, []);

  const exportCSV = () => {
    const headers = ['Name', 'Guests', 'Attending', 'Meal', 'Message', 'Timestamp'];
    const rows = rsvps.map(r => [r.name, r.guests, r.attending ? 'Yes' : 'No', r.meal, r.message, r.timestamp]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvps.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-background p-8 font-body">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display italic text-4xl text-foreground">RSVP Responses</h1>
          <button
            onClick={exportCSV}
            className="px-6 py-2 bg-foreground text-primary-foreground font-body text-[12px] tracking-[0.15em] uppercase rounded-lg hover:bg-accent transition-colors duration-300"
          >
            Export CSV
          </button>
        </div>

        {rsvps.length === 0 ? (
          <p className="text-muted-foreground font-body">No RSVPs yet.</p>
        ) : (
          <div className="space-y-2">
            {/* Header */}
            <div className="grid grid-cols-6 gap-4 px-6 py-3 font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <span>Name</span>
              <span>Guests</span>
              <span>Attending</span>
              <span>Meal</span>
              <span>Message</span>
              <span>Date</span>
            </div>
            {rsvps.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-6 gap-4 px-6 py-4 bg-card rounded-lg text-[14px] text-foreground"
                style={{ boxShadow: '0 2px 8px rgba(107, 98, 89, 0.06)' }}
              >
                <span className="font-body">{r.name}</span>
                <span className="font-body">{r.guests}</span>
                <span className={`font-body ${r.attending ? 'text-accent' : 'text-muted-foreground'}`}>
                  {r.attending ? 'Yes' : 'No'}
                </span>
                <span className="font-body capitalize">{r.meal}</span>
                <span className="font-body text-muted-foreground truncate">{r.message || '—'}</span>
                <span className="font-body text-muted-foreground text-[12px]">
                  {new Date(r.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

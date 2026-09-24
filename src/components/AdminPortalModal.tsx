import { useState, useEffect } from 'react';
import { X, ShieldCheck, Sparkles, Wrench, Truck, ThermometerSnowflake, DollarSign, Award, Clock, Flame, AlertTriangle } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PASSKEY = 'hvac2026';

const mockTickets = [
  { id: 'TKT-1081', client: 'Pinnacle Tower Office Suites', issue: 'Chiller Loop Pressure Drop (Compressor 2)', tech: 'Mike Kowalski (Van #4)', urgency: 'CRITICAL', status: 'en_route', est: '$4,850' },
  { id: 'TKT-1082', client: 'Dr. Katherine Price Residence', issue: 'Heat Pump Inverter Error code E4', tech: 'Devon Vance (Van #1)', urgency: 'HIGH', status: 'in_progress', est: '$1,420' },
  { id: 'TKT-1083', client: 'Mesa Cold Logistics Dock', issue: 'Walk-In Refrigeration Sensor Drift', tech: 'Carlos Ortiz (Van #6)', urgency: 'CRITICAL', status: 'dispatched', est: '$3,200' },
  { id: 'TKT-1084', client: 'Bel-Air Estate Guest House', issue: 'Seasonal VRF Maintenance Inspection', tech: 'Samira Patel (Van #2)', urgency: 'STANDARD', status: 'scheduled', est: '$890' },
];

const mockTechs = [
  { id: 'TECH-1', name: 'Mike Kowalski', cert: 'NATE & EPA Universal 608', van: 'Ford Transit 250 (Van #4)', status: 'Active (On Job)', jobsToday: 3 },
  { id: 'TECH-2', name: 'Devon Vance', cert: 'Inverter Diagnostics Master', van: 'Mercedes Sprinter (Van #1)', status: 'Active (On Job)', jobsToday: 2 },
  { id: 'TECH-3', name: 'Carlos Ortiz', cert: 'Commercial Refrigeration Certified', van: 'Ram ProMaster (Van #6)', status: 'Dispatched', jobsToday: 4 },
  { id: 'TECH-4', name: 'Samira Patel', cert: 'Heat Pump & VRF Lead', van: 'Ford Transit 250 (Van #2)', status: 'Staging Next Job', jobsToday: 2 },
];

const metrics = [
  { label: 'Today Dispatched GMV', value: '$10,360', icon: DollarSign, color: 'text-emerald-400' },
  { label: 'Active Fleet in Field', value: '4 / 4 Vans', icon: Truck, color: 'text-blue-400' },
  { label: 'Emergency Triage SLA', value: '18 Mins', icon: Clock, color: 'text-amber-400' },
  { label: 'First-Visit Fix Rate', value: '94.2%', icon: Award, color: 'text-emerald-400' },
];

export default function AdminPortalModal({ isOpen, onClose }: AdminPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'fleet' | 'supabase'>('overview');
  const [passkey, setPasskey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAuthenticated(false);
      setPasskey('');
      setAuthError('');
      setActiveTab('overview');
    }
  }, [isOpen]);

  const handleAuth = () => {
    if (passkey === PASSKEY) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passkey. Click the auto-fill demo passkey button below.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#09090b] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0c0c0e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-sm font-bold">
              HVAC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">HVAC DISPATCH OS</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">v1.0.0 VIP</span>
              </div>
              <p className="text-xs text-zinc-400">Field Operations Command, Triage Board &amp; Fleet Telemetry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {!authenticated ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-medium text-xl text-white">Dispatch Terminal Gate</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Enter your administrative key to access live field technician routes, emergency call logs, and customer service agreements.
              </p>
            </div>

            <div className="w-full space-y-3">
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                placeholder="Enter passkey (e.g. hvac2026)"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-center text-sm focus:outline-none focus:border-emerald-400 placeholder-zinc-600"
              />
              {authError && <p className="text-xs text-rose-400 font-mono">{authError}</p>}
              <button
                onClick={handleAuth}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-all cursor-pointer"
              >
                Authenticate Dispatch Gate
              </button>
              <button
                type="button"
                onClick={() => {
                  setPasskey(PASSKEY);
                  setAuthenticated(true);
                  setAuthError('');
                }}
                className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                [ AUTO-FILL DEMO PASS: hvac2026 ]
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-zinc-800 bg-[#0c0c0e]/50 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-zinc-800/80 text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Field Telemetry
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'tickets'
                    ? 'bg-zinc-800/80 text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Live Job Triage (4)
              </button>
              <button
                onClick={() => setActiveTab('fleet')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'fleet'
                    ? 'bg-zinc-800/80 text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Technician Fleet (4)
              </button>
              <button
                onClick={() => setActiveTab('supabase')}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-t-lg transition-colors cursor-pointer ${
                  activeTab === 'supabase'
                    ? 'bg-zinc-800/80 text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Supabase Engine
              </button>
            </div>

            {/* Tab Panels */}
            <div className="p-6 overflow-y-auto space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{m.label}</span>
                          <m.icon className={`w-4 h-4 ${m.color}`} />
                        </div>
                        <p className="text-xl font-bold font-mono text-white">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Operational Status Card */}
                  <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/20 via-zinc-900 to-zinc-900 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider">TRIAGE DISPATCH QUEUE: NORMAL</span>
                      </div>
                      <p className="text-xs text-zinc-300">All 4 mobile fleet units reporting active telemetry. GPS routes synchronized across metropolitan area.</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 font-mono text-xs text-zinc-300">
                      Fleet Efficiency: 98.4%
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tickets' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">Active Service Tickets</h4>
                    <span className="text-xs text-emerald-400 font-mono">4 Tickets Dispatched</span>
                  </div>
                  <div className="border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-900 text-zinc-400 font-mono uppercase text-[10px] border-b border-zinc-800">
                        <tr>
                          <th className="p-3">Ticket</th>
                          <th className="p-3">Commercial/Residential Client</th>
                          <th className="p-3">Issue Description</th>
                          <th className="p-3">Assigned Tech</th>
                          <th className="p-3">Urgency</th>
                          <th className="p-3 text-right">Job Estimate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800 font-mono text-zinc-300">
                        {mockTickets.map((t) => (
                          <tr key={t.id} className="hover:bg-zinc-900/40">
                            <td className="p-3 text-emerald-400 font-bold">{t.id}</td>
                            <td className="p-3 font-semibold text-white">{t.client}</td>
                            <td className="p-3 text-zinc-400">{t.issue}</td>
                            <td className="p-3">{t.tech}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                                t.urgency === 'CRITICAL' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                                t.urgency === 'HIGH' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                                'bg-zinc-800 text-zinc-400'
                              }`}>
                                {t.urgency}
                              </span>
                            </td>
                            <td className="p-3 text-right font-bold text-white">{t.est}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'fleet' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">Field Technician Roster</h4>
                    <span className="text-xs text-emerald-400 font-mono">100% On-Duty</span>
                  </div>
                  <div className="space-y-3">
                    {mockTechs.map((tech) => (
                      <div key={tech.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <p className="font-semibold text-sm text-white">{tech.name} &bull; <span className="text-emerald-400 font-mono text-xs">{tech.van}</span></p>
                          <p className="text-xs text-zinc-400">{tech.cert}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-zinc-300">{tech.jobsToday} Jobs Completed</span>
                          <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-[10px] font-mono uppercase">
                            {tech.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'supabase' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                    <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">PostgreSQL Schema &amp; Dispatch Ledgers</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Production PostgreSQL database wired with Row Level Security (RLS) policies for field technician logs, service tickets, and annual maintenance agreements.
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-[10px] font-mono text-zinc-500">TABLE 1</p>
                        <p className="text-xs font-mono font-bold text-white">service_tickets</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-[10px] font-mono text-zinc-500">TABLE 2</p>
                        <p className="text-xs font-mono font-bold text-white">fleet_technicians</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-center">
                        <p className="text-[10px] font-mono text-zinc-500">TABLE 3</p>
                        <p className="text-xs font-mono font-bold text-white">maintenance_plans</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

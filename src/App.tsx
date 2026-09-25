import { useState, useEffect } from 'react';
import { 
  Wrench, 
  Truck, 
  Flame, 
  ThermometerSnowflake, 
  Clock, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FolderLock, 
  Calendar, 
  DollarSign, 
  Activity, 
  Zap, 
  AlertCircle 
} from 'lucide-react';
import AdminPortalModal from './components/AdminPortalModal';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [serviceType, setServiceType] = useState<'emergency' | 'replacement' | 'maintenance'>('emergency');
  const [systemType, setSystemType] = useState<'heat_pump' | 'central_ac' | 'commercial'>('heat_pump');
  const [estimatedCost, setEstimatedCost] = useState('$189 Diagnostic Fee');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  useEffect(() => {
    if ((window.location.pathname.includes('admin') || window.location.hash.includes('admin')) || window.location.pathname.startsWith('/admin')) {
      setIsAdminOpen(true);
    }
  }, []);

  const handleCalculate = (svc: typeof serviceType, sys: typeof systemType) => {
    setServiceType(svc);
    setSystemType(sys);
    if (svc === 'emergency') {
      setEstimatedCost('$189 Standard Diagnostic + Triage');
    } else if (svc === 'replacement') {
      if (sys === 'heat_pump') setEstimatedCost('$4,800 - $8,200 Complete Install');
      else if (sys === 'central_ac') setEstimatedCost('$3,900 - $6,500 Full System');
      else setEstimatedCost('$12,000+ Commercial Rooftop Package');
    } else {
      setEstimatedCost('$19/mo Residential VIP Agreement');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* Sticky Obsidian Dispatch Header */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                APEX HVAC <span className="text-xs font-semibold tracking-wider font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">24/7 DISPATCH</span>
              </span>
              <p className="text-xs font-semibold text-zinc-400 font-mono">Emergency Thermal Triage &amp; Certified Fleet</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Next Field Tech Available: <strong className="text-white">18 Mins</strong></span>
            </div>
            <a 
              href="#booking"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Book Emergency Dispatch
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 font-mono text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              LICENSED EPA 608 UNIVERSAL &bull; NATE MASTER TECHS
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Rapid HVAC Dispatch &amp; Climate Fleet Operations.
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed max-w-2xl">
              When heat pumps fail or commercial chillers fault, downtime costs thousands. Our computerized dispatch triage routes certified EPA technicians to your residential estate or commercial facility with fully equipped mobile part inventory.
            </p>

            {/* Quick Metrics Banner */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-850">
              <div>
                <p className="text-2xl font-bold font-mono text-white">18 Min</p>
                <p className="text-xs text-zinc-300 font-mono">Average Triage SLA</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-emerald-400">94.2%</p>
                <p className="text-xs text-zinc-300 font-mono">First-Visit Fix Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white">4,800+</p>
                <p className="text-xs text-zinc-300 font-mono">Systems Serviced</p>
              </div>
            </div>
          </div>

          {/* Interactive Live Triage Card */}
          <div id="booking" className="lg:col-span-5 bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wider font-mono uppercase text-emerald-400 font-bold tracking-wider">INSTANT DISPATCH WIZARD</span>
              <h3 className="text-xl font-bold text-white">Request Field Service</h3>
              <p className="text-base text-zinc-200 leading-relaxed">Select your problem profile for immediate computerized triage.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold font-mono text-zinc-400 block mb-2">1. Priority Level</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleCalculate('emergency', systemType)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      serviceType === 'emergency' ? 'bg-rose-950 text-rose-300 border border-rose-700' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    🚨 Emergency
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalculate('replacement', systemType)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      serviceType === 'replacement' ? 'bg-amber-950 text-amber-300 border border-amber-700' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    Replace Unit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalculate('maintenance', systemType)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      serviceType === 'maintenance' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    Service Tune
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold font-mono text-zinc-400 block mb-2">2. Equipment Class</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleCalculate(serviceType, 'heat_pump')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      systemType === 'heat_pump' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    Heat Pump
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalculate(serviceType, 'central_ac')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      systemType === 'central_ac' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    Central AC
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalculate(serviceType, 'commercial')}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      systemType === 'commercial' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    Commercial VRF
                  </button>
                </div>
              </div>

              {/* Estimate Pill */}
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">Estimate Range:</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{estimatedCost}</span>
              </div>

              {!bookingSubmitted ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingSubmitted(true);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    required
                    placeholder="Customer Name / Organization"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-base min-h-[44px] font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Site Street Address & Zip"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-base min-h-[44px] font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Dispatch Contact Phone"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-base min-h-[44px] font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-500 text-black font-semibold text-base font-semibold min-h-[44px] font-mono uppercase tracking-wider hover:bg-emerald-400 transition-colors cursor-pointer"
                  >
                    Confirm Dispatch Triage
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="text-xs font-bold text-white">Technician Dispatched!</p>
                  <p className="text-xs font-semibold text-zinc-400 font-mono">Van #1 (Devon Vance) has been queued with your equipment profile.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Fleet Capabilities */}
        <section className="space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">COMMERCIAL &amp; RESIDENTIAL INFRASTRUCTURE</span>
            <h2 className="text-3xl font-bold text-white">Built for Private Equity &amp; Regional Trade Portfolios</h2>
            <p className="text-base text-zinc-200 leading-relaxed">Engineered with multi-branch service agreements, inventory barcode audits, and live GPS dispatching.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Mobile Parts Depot Fleet</h4>
              <p className="text-base text-zinc-200 leading-relaxed leading-relaxed">
                Every service transit van carries 1,200+ fast-moving OEM capacitors, contactors, TXV valves, and refrigerant cylinders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Annual Membership Agreements</h4>
              <p className="text-base text-zinc-200 leading-relaxed leading-relaxed">
                Automated seasonal coil cleaning, heat exchanger inspections, and priority zero-wait triage for enrolled estates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Supabase PostgreSQL Sync</h4>
              <p className="text-base text-zinc-200 leading-relaxed leading-relaxed">
                Real-time job logging, technician GPS status, equipment warranty archives, and digital customer signature sign-offs.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#09090b] py-8 text-center text-xs text-zinc-300 font-mono">
        <p>© 2026 APEX HVAC DISPATCH OS &bull; Turnkey Digital Operating System &bull; Ghost Factory™ Flagship #56</p>
      </footer>

      {/* Floating VIP Admin Portal Pass Button */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-zinc-950 text-white border border-emerald-500/40 hover:border-emerald-400 px-4 py-3 rounded-xl shadow-2xl transition-all duration-200 flex items-center gap-2 cursor-pointer font-mono text-xs font-bold uppercase tracking-wider group hover:text-emerald-400"
        id="hvac-admin-pass-btn"
      >
        <FolderLock className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
        [ DISPATCH PASS ]
      </button>

      {/* Admin Portal Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

    </div>
  );
}

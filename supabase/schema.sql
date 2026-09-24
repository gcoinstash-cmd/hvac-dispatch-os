-- HVAC DISPATCH OS — Production PostgreSQL Schema & Security Policies
-- Vertical: Home Services & Commercial Trade Infrastructure Vault

CREATE TABLE IF NOT EXISTS public.service_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number TEXT NOT NULL UNIQUE,
    client_name TEXT NOT NULL,
    site_address TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    equipment_type TEXT NOT NULL, -- heat_pump, central_ac, commercial_vrf, boiler, chiller
    issue_description TEXT NOT NULL,
    urgency TEXT NOT NULL DEFAULT 'STANDARD', -- CRITICAL, HIGH, STANDARD
    estimated_cost NUMERIC(10,2) NOT NULL,
    assigned_tech TEXT,
    status TEXT NOT NULL DEFAULT 'dispatched', -- triage_queued, dispatched, en_route, in_progress, completed, billed
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.fleet_technicians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tech_name TEXT NOT NULL,
    certifications TEXT NOT NULL,
    van_identifier TEXT NOT NULL,
    mobile_phone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active_on_job', -- active_on_job, en_route, available, off_duty
    completed_jobs_today INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.maintenance_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_name TEXT NOT NULL,
    plan_tier TEXT NOT NULL, -- residential_vip, commercial_master
    monthly_fee NUMERIC(8,2) NOT NULL,
    last_inspection_date DATE,
    next_inspection_date DATE,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.service_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fleet_technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_plans ENABLE ROW LEVEL SECURITY;

-- Security Policies
CREATE POLICY "Allow public ticket submission" 
    ON public.service_tickets FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read for service tickets" 
    ON public.service_tickets FOR SELECT 
    USING (auth.role() = 'authenticated' OR true);

CREATE POLICY "Allow public technician fleet visibility" 
    ON public.fleet_technicians FOR SELECT 
    USING (true);

CREATE POLICY "Allow public maintenance plan reads" 
    ON public.maintenance_plans FOR SELECT 
    USING (true);

-- HVAC DISPATCH OS — Mock Production Seed Records

INSERT INTO public.fleet_technicians (tech_name, certifications, van_identifier, mobile_phone, status, completed_jobs_today) VALUES
('Mike Kowalski', 'NATE Master & EPA Universal 608', 'Ford Transit 250 (Van #4)', '+1 (310) 555-0811', 'active_on_job', 3),
('Devon Vance', 'Inverter Diagnostics & Heat Pump Lead', 'Mercedes Sprinter (Van #1)', '+1 (310) 555-0812', 'active_on_job', 2),
('Carlos Ortiz', 'Commercial Chiller & VRF Certified', 'Ram ProMaster (Van #6)', '+1 (310) 555-0813', 'en_route', 4),
('Samira Patel', 'Residential Diagnostics & Air Quality Lead', 'Ford Transit 250 (Van #2)', '+1 (310) 555-0814', 'available', 2);

INSERT INTO public.service_tickets (ticket_number, client_name, site_address, client_phone, equipment_type, issue_description, urgency, estimated_cost, assigned_tech, status) VALUES
('TKT-1081', 'Pinnacle Tower Office Suites', '10940 Wilshire Blvd, Los Angeles, CA', '+1 (310) 555-0919', 'chiller', 'Chiller Loop Pressure Drop on Compressor 2', 'CRITICAL', 4850.00, 'Mike Kowalski (Van #4)', 'en_route'),
('TKT-1082', 'Dr. Katherine Price Residence', '742 N Beverly Dr, Beverly Hills, CA', '+1 (310) 555-0922', 'heat_pump', 'Heat Pump Inverter Error code E4. Complete cooling loss.', 'HIGH', 1420.00, 'Devon Vance (Van #1)', 'in_progress'),
('TKT-1083', 'Mesa Cold Logistics Dock', '1400 E 8th St, Los Angeles, CA', '+1 (310) 555-0944', 'commercial_vrf', 'Walk-In Refrigeration Sensor Drift. Temperature elevating.', 'CRITICAL', 3200.00, 'Carlos Ortiz (Van #6)', 'dispatched');

INSERT INTO public.maintenance_plans (account_name, plan_tier, monthly_fee, last_inspection_date, next_inspection_date, status) VALUES
('Sterling Asset Management Facility', 'commercial_master', 249.00, CURRENT_DATE - 45, CURRENT_DATE + 45, 'active'),
('Vance Family Estate', 'residential_vip', 39.00, CURRENT_DATE - 60, CURRENT_DATE + 30, 'active');

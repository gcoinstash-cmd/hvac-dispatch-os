# HVAC DISPATCH OS — 3-Minute Turnkey Database Setup

Follow these simple steps to connect your production PostgreSQL database and unlock computerized emergency triage, field technician routing, and recurring maintenance agreement billing.

---

### Step 1: Create a Supabase Project
1. Log in to [supabase.com](https://supabase.com) and click **New Project**.
2. Name your project `hvac-dispatch-os` and select your nearest geographic region.

---

### Step 2: Run the Schema & Seed SQL
1. In the Supabase Dashboard, navigate to the **SQL Editor** tab on the left sidebar.
2. Click **New Query**, open `supabase/schema.sql`, copy its contents, paste them into the editor, and click **Run**.
3. Create another query, paste `supabase/seed.sql`, and click **Run** to load field technician rosters, live service tickets, and maintenance agreements.

---

### Step 3: Connect Your Environment Variables
1. Navigate to **Project Settings** > **API**.
2. Copy your **Project URL** and **anon public key**.
3. Create a `.env.local` file in your root directory:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
4. Restart your development server or trigger a fresh deployment:
```bash
npm run dev
```

---

### 1-Click Administrative Passkey
- **Route**: `https://<your-domain>/admin` (or click `[ DISPATCH PASS ]` on bottom-right)
- **Demo Passkey**: `hvac2026`

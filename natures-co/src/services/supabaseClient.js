import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aimgohnijdamdikgoswf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpbWdvaG5pamRhbWRpa2dvc3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NDQ2NjEsImV4cCI6MjA0NzIyMDY2MX0.qySbsKsnog0wXiu0V_kpUQfLUAiEbt52wdYPFN2X5-0";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
      queryParams: {
        prompt: 'select_account', // This is the magic line
        access_type: 'offline',   // Optional: useful if you need refresh tokens later
      },
    }
  });
  
  if (error) console.error('Error logging in:', error.message);
}

// --- Logout Logic ---
async function logout() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error logging out:', error.message);
  } else {
    console.log('Successfully logged out!');
    // Redirect back to the main app path
    window.location.href = `${window.location.origin}${import.meta.env.BASE_URL}`;
  }
}

document.getElementById('logout-btn')?.addEventListener('click', logout);

// --- Auth State Observer ---
supabase.auth.onAuthStateChange((event, session) => {
  const loginBtn = document.getElementById('google-login-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if (session) {
    console.log("Logged in as:", session.user.email);
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'block';
  } else {
    console.log("Logged out");
    if (loginBtn) loginBtn.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
});
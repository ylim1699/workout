import { createClient } from '@supabase/supabase-js'

// const supabase = createClient(,);
console.log(import.meta.env.VITE_SUPABASE_URL);
// Link the button to your function
document.getElementById('google-login-btn').addEventListener('click', () => {
  signInWithGoogle();
});

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // Where the user goes after logging in
      redirectTo: window.location.origin 
    }
  })
  
  if (error) console.error('Error logging in:', error.message)
}



// supabase.auth.onAuthStateChange((event, session) => {
//   if (session) {
//     console.log("Logged in as:", session.user.email);
//     // Hide login button, show workout planner
//   } else {
//     console.log("Logged out");
//     // Show login button
//   }
// });
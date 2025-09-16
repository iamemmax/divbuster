// app/auth/linkedin/callback/page.tsx (App Router)
// OR
// pages/auth/linkedin/callback.tsx (Pages Router)

'use client'; // Only needed for App Router

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LinkedInCallback() {
  const router = useRouter();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (processed) return;

    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        console.log('LinkedIn callback params:', { code, state, error });

        if (error) {
          console.error('LinkedIn OAuth error:', error);
          setProcessed(true);
          setTimeout(() => {
            router.push('/login?error=linkedin_failed');
          }, 2000);
          return;
        }

        if (code && state) {
          // Store the callback data for the LinkedIn hook to process
          sessionStorage.setItem('linkedin_callback_code', code);
          sessionStorage.setItem('linkedin_callback_state', state);
          
          setProcessed(true);
          
          // Redirect to the page where your SocialAuth component is mounted
          // This allows the useLinkedIn hook to detect and process the callback
          router.push('/login'); // Change this to wherever your SocialAuth component is
        } else {
          console.error('Missing LinkedIn OAuth parameters');
          setProcessed(true);
          setTimeout(() => {
            router.push('/login?error=linkedin_invalid');
          }, 2000);
        }
      } catch (error) {
        console.error('Callback processing error:', error);
        setProcessed(true);
        setTimeout(() => {
          router.push('/login?error=callback_error');
        }, 2000);
      }
    };

    // Small delay to ensure the page is fully loaded
    const timer = setTimeout(handleCallback, 100);
    
    return () => clearTimeout(timer);
  }, [router, processed]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-lg font-medium text-gray-900">Processing LinkedIn login...</h2>
        <p className="text-gray-500 mt-2">Please wait while we complete your authentication.</p>
        <div className="mt-4 text-xs text-gray-400">
          If this takes too long, <button onClick={() => router.push('/login')} className="text-blue-600 underline">click here</button> to return to login.
        </div>
      </div>
    </div>
  );
}
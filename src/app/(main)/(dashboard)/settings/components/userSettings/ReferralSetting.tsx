import React, { useState } from 'react';
import { Copy, Check, Facebook, Twitter, Instagram } from 'lucide-react';


const ReferralSetting = () => {
  const [copied, setCopied] = useState(false);
  
  const referralLink = "https://www.divebusters.com/add-friends";
  
  const invites = [
    { name: "Kinslee Boone", date: "22/04/24" },
    { name: "Malayah Sanchez", date: "22/04/24" },
    { name: "Averie Benitez", date: "22/04/24" },
    { name: "Jensen Rowland", date: "22/04/24" },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform:string) => {
    const text = "Join me on Dive Busters - an amazing diving community!";
    const url = referralLink;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so copy link instead
        handleCopyLink();
        break;
      case 'reddit':
        window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, '_blank');
        break;
    }
  };

  return (
    <div className="max-w-2xl  sm:px-6 bg-white">
      {/* Header */}
      <div className="">
       

          <h1 className="text-2xl font-semibold font-archivo text-[#09090B] mb-2">
        Dive Busters Referrals
      </h1>
      <p className="text-[#71717A] max-w-md text-xs font-archivo mb-8">
         You have been selected to join this amazing family. Refer your Friends and Family 
          and have the best moments together.
      </p>
      </div>

      {/* Referral Link Section */}
      <div className="mb-12">
        <h2 className="block text-xs font-archivo font-medium text-[#36394A] mb-2">
          Referral Link & Code
        </h2>
        
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex-1 text-gray-700 font-mono text-xxs sm:text-sm mr-4">
            {referralLink}
          </div>
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-[#ECFDF3]  text-[#027A48] text-xxs sm:text-xs rounded-[16px] transition-colors duration-200 flex items-center gap-2 font-medium"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>

      {/* Social Sharing Section */}
      <div className="mb-12">
        <div className="flex items-center justify-center mb-8">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-6 text-gray-500 font-medium">or share link via</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        
        <div className="flex justify-center gap-6">
          <button
            onClick={() => handleSocialShare('facebook')}
            className="w-[2.8125rem] h-[2.8125rem] bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200 group"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-8 h-8 text-white" fill="currentColor" />
          </button>
          
          <button
            onClick={() => handleSocialShare('twitter')}
            className="w-[2.8125rem] h-[2.8125rem] bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-200 group"
            aria-label="Share on Twitter/X"
          >
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          
          <button
            onClick={() => handleSocialShare('instagram')}
            className="w-[2.8125rem] h-[2.8125rem] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-all duration-200 group"
            aria-label="Share on Instagram"
          >
            <Instagram className="w-8 h-8 text-white" />
          </button>
          
          <button
            onClick={() => handleSocialShare('reddit')}
            className="w-[2.8125rem] h-[2.8125rem] bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors duration-200 group"
            aria-label="Share on Reddit"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Invites List */}
      <div className="mb-8">
        <h2 className="text-lg font-archivo font-semibold text-[#36394A] mb-6">
          All your Invites
        </h2>
        
        <div className="space-y-4">
          {invites.map((invite, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3  border-b border-gray-200  transition-colors duration-150"
            >
              <div className="font-medium text-[#191D31] text-xs sm:text-sm font-archivo">
                {invite.name}
              </div>
              <div className="text-[#191D31] font-medium text-xs sm:text-sm font-archivo">
                {invite.date}
              </div>
            </div>
          ))}
        </div>
        
        {invites.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No invites yet</p>
            <p className="text-sm mt-2">Share your referral link to start inviting friends!</p>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ReferralSetting;
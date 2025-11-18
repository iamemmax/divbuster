import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useAuth } from '@/contexts/authentication';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, RedditShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, RedditIcon } from 'react-share';
import '@/i18n/config';


const ReferralSetting = () => {
  const {authState}=useAuth()
  const {user}=authState
  const [copied, setCopied] = useState(false);
  const { t, i18n } = useTranslation();
  
  const referralLink = `${process.env.NEXT_PUBLIC_APP_URL}/sign-up?referral_code=${user?.profile_details?.referral_code}`;
  
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleInstagramShare = async () => {
    const text = `${t('shareText')} ${referralLink}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    alert('Content copied! Open Instagram and paste in your story or post.');
  };

  const handleRedditShare = () => {
    const text = encodeURIComponent(t('shareText'));
    const url = encodeURIComponent(referralLink);
    window.open(`https://www.reddit.com/submit?url=${url}&title=${text}`, '_blank');
  };

  return (
    <div className="max-w-2xl  sm:px-6 bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-semibold font-archivo text-[#09090B] dark:text-gray-100 mb-2 transition-colors duration-200">
              {t('title')}
            </h1>
            <p className="text-[#71717A] dark:text-gray-400 max-w-md text-xs font-archivo mb-8 transition-colors duration-200">
              {t('description')}
            </p>
          </div>
          <select 
            value={i18n.language} 
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="px-3 py-1 text-xs border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="mb-12">
        <h2 className="block text-xs font-archivo font-medium text-[#36394A] dark:text-gray-300 mb-2 transition-colors duration-200">
          {t('referralLinkCode')}
        </h2>
        
        <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 transition-colors duration-200">
          <div className="flex-1 text-gray-700 dark:text-gray-300 font-mono text-xxs sm:text-sm mr-4 transition-colors duration-200">
            {referralLink}
          </div>
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-[#ECFDF3]  text-[#027A48] text-xxs sm:text-xs rounded-[16px] transition-colors duration-200 flex items-center gap-2 font-medium"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                {t('copied')}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {t('copyLink')}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Social Sharing Section */}
      <div className="mb-12">
        <div className="flex items-center justify-center mb-8">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-6 text-gray-500 dark:text-gray-400 font-medium transition-colors duration-200">{t('shareVia')}</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>
        
        <div className="flex justify-center gap-4">
          <FacebookShareButton url={referralLink} title={t('shareText')}>
            <FacebookIcon size={45} round />
          </FacebookShareButton>
          
          <TwitterShareButton url={referralLink} title={t('shareText')}>
            <TwitterIcon size={45} round />
          </TwitterShareButton>
          
          <WhatsappShareButton url={referralLink} title={t('shareText')}>
            <WhatsappIcon size={45} round />
          </WhatsappShareButton>
          
          <button
            onClick={handleRedditShare}
            className="w-[45px] h-[45px] bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Share on Reddit"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
            </svg>
          </button>
          
          <button
            onClick={handleInstagramShare}
            className="w-[45px] h-[45px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-all duration-200"
            aria-label="Share to Instagram"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Invites List */}
      <div className="mb-8">
        <h2 className="text-lg font-archivo font-semibold text-[#36394A] dark:text-gray-200 mb-6 transition-colors duration-200">
          {t('allInvites')}
        </h2>
        
        <div className="space-y-4">
          {user?.profile_details?.downlines?.map((invite, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3  border-b border-gray-200 dark:border-gray-700  transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium">
                  {invite?.image ? (
                    <img src={invite?.image} alt={invite.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    invite.name?.charAt(0)?.toUpperCase()
                  )}
                </div>
                <div className="font-medium text-[#191D31] dark:text-gray-200 text-xs sm:text-sm font-archivo transition-colors duration-200">
                  {invite.name}
                </div>
              </div>
              <div className="text-[#191D31] dark:text-gray-200 font-medium text-xs sm:text-sm font-archivo transition-colors duration-200">
                {moment(invite.date_joined).format('MMMM Do YYYY')}
              </div>
            </div>
          ))}
        </div>
        
        {user?.profile_details?.downlines?.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 transition-colors duration-200">
            <p className="text-lg">{t('noInvites')}</p>
            <p className="text-sm mt-2">{t('shareMessage')}</p>
          </div>
        )}
      </div>

      {/* Save Button */}
      {/* <div className="flex justify-end">
        <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none">
          Save Changes
        </button>
      </div> */}
    </div>
  );
};

export default ReferralSetting;
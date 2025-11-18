import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "Dive Busters Referrals",
      description: "You have been selected to join this amazing family. Refer your Friends and Family and have the best moments together.",
      referralLinkCode: "Referral Link & Code",
      copyLink: "Copy Link",
      copied: "Copied!",
      shareVia: "or share link via",
      allInvites: "All your Invites",
      noInvites: "No invites yet",
      shareMessage: "Share your referral link to start inviting friends!",
      shareText: "Join me on Dive Busters - an amazing diving community!"
    }
  },
  es: {
    translation: {
      title: "Referencias de Dive Busters",
      description: "Has sido seleccionado para unirte a esta increíble familia. Refiere a tus amigos y familiares y vive los mejores momentos juntos.",
      referralLinkCode: "Enlace y Código de Referencia",
      copyLink: "Copiar Enlace",
      copied: "¡Copiado!",
      shareVia: "o compartir enlace vía",
      allInvites: "Todas tus Invitaciones",
      noInvites: "Aún no hay invitaciones",
      shareMessage: "¡Comparte tu enlace de referencia para comenzar a invitar amigos!",
      shareText: "¡Únete a mí en Dive Busters - una increíble comunidad de buceo!"
    }
  },
  fr: {
    translation: {
      title: "Parrainages Dive Busters",
      description: "Vous avez été sélectionné pour rejoindre cette famille incroyable. Parrainez vos amis et votre famille et vivez les meilleurs moments ensemble.",
      referralLinkCode: "Lien et Code de Parrainage",
      copyLink: "Copier le Lien",
      copied: "Copié!",
      shareVia: "ou partager le lien via",
      allInvites: "Toutes vos Invitations",
      noInvites: "Aucune invitation pour le moment",
      shareMessage: "Partagez votre lien de parrainage pour commencer à inviter des amis!",
      shareText: "Rejoignez-moi sur Dive Busters - une communauté de plongée incroyable!"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
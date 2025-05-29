export type Language = 'en' | 'es' | 'fr' | 'nl' ;

export interface Translations {
  basicInfo: {
    title: string;
    subtitle: string;
    preferredLanguage: string;
    selectLanguage: string;
    nextButton: string;
  };
  accountDetails: {
    title: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    backButton: string;
    nextButton: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    emailPlaceholder: string;
    errors: {
      firstNameRequired: string;
      lastNameRequired: string;
      invalidEmail: string;
    };
  };
  socialLogins: {
    reddit: string;
    microsoft: string;
    linkedin: string;
    apple: string;
    connecting: string;
    google: string;
  };
  // Add missing properties for login/registration
  googleLogin: string;
  googleConnecting: string;
  noAccount: string;
  register: string;
  orText: string;
  diveProfile: {
    title: string;
    subtitle: string;
    nickname: string;
    dateOfBirth: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    backButton: string;
    nextButton: string;
    nicknamePlaceholder: string;
    dateOfBirthPlaceholder: string;
    phoneNumberPlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    errors: {
      nicknameRequired: string;
      dateOfBirthRequired: string;
      phoneNumberRequired: string;
      passwordMinLength: string;
      passwordComplexity: string;
      confirmPasswordRequired: string;
      passwordsDoNotMatch: string;
    };
  };
  accountType: {
    title: string;
    subtitle: string;
    unitOfMeasure: string;
    selectUnit: string;
    temperature: string;
    selectTemperature: string;
    bodySize: string;
    selectBodySize: string;
    shoeSize: string;
    selectShoeSize: string;
    country: string;
    selectCountry: string;
    backButton: string;
    nextButton: string;
    // New dropdown options
    metricOption: string;
    imperialOption: string;
    celsiusOption: string;
    fahrenheitOption: string;
    kelvinOption: string;
    xsmallOption: string;
    smallOption: string;
    mediumOption: string;
    largeOption: string;
    xlargeOption: string;
    euOption: string;
    usOption: string;
    ukOption: string;
    // Error messages
    errors: {
      unitRequired: string;
      temperatureRequired: string;
      bodySizeRequired: string;
      shoeSizeRequired: string;
      countryRequired: string;
    };
  };
  profilePicture: {
    title: string;
    subtitle: string;
    uploadText: string;
    dragDropText: string;
    fileTypeText: string;
    backButton: string;
    submitButton: string;
    skipButton: string;
  };
  accountTypeSelection: {
    title: string;
    subtitle: string;
    diverTypeLabel: string;
    scubaDiver: string;
    freeDiver: string;
    recreativeTitle: string;
    recreativeDescription: string;
    recreativeExample: string;
    professionalTitle: string;
    professionalDescription: string;
    professionalExample: string;
    combinedTitle: string;
    combinedDescription: string;
    combinedBenefit: string;
    peoplesChoice: string;
    backButton: string;
    continueButton: string;
    errors: {
      diverTypeRequired: string;
      accountTypeRequired: string;
    };
  };
  emailVerification: {
    title: string;
    subtitle: string;
    mfaTitle: string;
    mfaSubtitle: string;
    emailTabLabel: string;
    qrTabLabel: string;
    verificationCodeLabel: string;
    verificationCodePlaceholder: string;
    submitButton: string;
    noCodeText: string;
    resendButton: string;
    resendingText: string;
    closeButton: string;
    // Add password-related fields
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    errors: {
      tokenRequired: string;
      passwordRequired: string;
      passwordMinLength: string;
      passwordComplexity: string;
      confirmPasswordRequired: string;
      passwordsDoNotMatch: string;
    };
  };
  mfaVerification: {
    generatedCodeLabel: string;
    generatedCodePlaceholder: string;
    submitButton: string;
    submittingText: string;
    noCodeText: string;
    regenerateButton: string;
    regeneratingText: string;
    qrRegeneratedMessage: string;
    errors: {
      mfaCodeRequired: string;
    };

  };

  verifyEmail:{
    title:string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    verifyEmail:{
title:"Kindly verify account to continue"
    },
    basicInfo: {
      title: "Create an Account",
      subtitle: "Proceed with your Registration",
      preferredLanguage: "Preferred Language",
      selectLanguage: "Select your preferred language",
      nextButton: "Next",
    },
    accountDetails: {
      title: "Account Details",
      subtitle: "Enter your personal information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phoneNumber: "Phone Number",
      backButton: "Back",
      nextButton: "Next",
      firstNamePlaceholder: "Enter your first name",
      lastNamePlaceholder: "Enter your last name",
      emailPlaceholder: "Enter your email address",
      errors: {
        firstNameRequired: "First name is required",
        lastNameRequired: "Last name is required",
        invalidEmail: "Invalid email address"
      }
    },
    socialLogins: {
      reddit: "Login with Reddit",
      microsoft: "Login with Microsoft 365",
      linkedin: "Login with LinkedIn",
      apple: "Login with Apple ID",
      connecting: "Connecting...",
      google: "Login with Google"
    },
    googleLogin: "Login with Google",
    googleConnecting: "Connecting...",
    noAccount: "Don't have an account?",
    register: "Register",
    orText: "Or",
    diveProfile: {
      title: "Dive Profile",
      subtitle: "Tell us about yourself",
      nickname: "Nickname",
      dateOfBirth: "Date of Birth",
      phoneNumber: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      backButton: "Back",
      nextButton: "Next",
      nicknamePlaceholder: "Enter your nickname",
      dateOfBirthPlaceholder: "Select your date of birth",
      phoneNumberPlaceholder: "Enter your phone number",
      passwordPlaceholder: "Enter your password",
      confirmPasswordPlaceholder: "Enter your password again",
      errors: {
        nicknameRequired: "Nickname is required",
        dateOfBirthRequired: "Date of birth is required",
        phoneNumberRequired: "Phone number is required",
        passwordMinLength: "Password must be at least 8 characters",
        passwordComplexity: "Password must contain uppercase, lowercase, number, and special character",
        confirmPasswordRequired: "Please confirm your password",
        passwordsDoNotMatch: "Passwords do not match"
      }
    },
    accountType: {
      title: "Measurement Preferences",
      subtitle: "Set your preferred measurement units",
      unitOfMeasure: "Unit of Measure",
      selectUnit: "Select your preferred unit of measure",
      temperature: "Temperature",
      selectTemperature: "Select your preferred temperature unit",
      bodySize: "Body Size",
      selectBodySize: "Select your body size",
      shoeSize: "Shoe Size",
      selectShoeSize: "Select your shoe size",
      country: "Country",
      selectCountry: "Select your Country",
      backButton: "Back",
      nextButton: "Next",
      // New dropdown options
      metricOption: "metric",
      imperialOption: "imperial",
      celsiusOption: "celsius",
      fahrenheitOption: "fahrenheit",
      kelvinOption: "kelvin",
      xsmallOption: "xsmall",
      smallOption: "small",
      mediumOption: "medium",
      largeOption: "large",
      xlargeOption: "xlarge",
      euOption: "EU",
      usOption: "US",
      ukOption: "UK",
      // Error messages
      errors: {
        unitRequired: "Unit of measure is required",
        temperatureRequired: "Temperature is required",
        bodySizeRequired: "Body size is required",
        shoeSizeRequired: "Shoe size is required",
        countryRequired: "Country is required",
      },
    },
    profilePicture: {
      title: "Add a Profile Picture",
      subtitle: "Add a profile picture to your account",
      uploadText: "Click to upload",
      dragDropText: "or drag and drop",
      fileTypeText: "PNG or JPG (max. 800×400px)",
      backButton: "Back",
      submitButton: "Submit",
      skipButton: "Skip this Step",
    },
    accountTypeSelection: {
      title: "Select your Account Type",
      subtitle: "Choose the type of Account you'd want to create.",
      diverTypeLabel: "Type of Diver",
      scubaDiver: "scuba",
      freeDiver: "free",
      recreativeTitle: "Recreative & Student",
      recreativeDescription: "For passionate, certified, and uncertified divers that dive for fun and want to keep track of all their adventures with their friends and families.",
      recreativeExample: "Ex: Open, Advanced, Night, Rescue e.t.c",
      professionalTitle: "Professional & Experts",
      professionalDescription: "For professionals who are connected to a dive school, store and organization and want to promote themselves.",
      professionalExample: "Ex: Divemasters, Instructors.",
      combinedTitle: "Combined",
      combinedDescription: "For professional divers connected to a dive school, but also dive recreative at their spare time with their buddies.",
      combinedBenefit: "Benefit: All dives will be logged under one profile.",
      peoplesChoice: "People's Choice",
      backButton: "Back",
      continueButton: "Continue",
      errors: {
        diverTypeRequired: "Diver type is required",
        accountTypeRequired: "Account type is required"
      }
    },
    emailVerification: {
      title: "Email Verification",
      subtitle: "We need to validate your email address - therefore you will a verification code.",
      mfaTitle: "Multi-factor authentication",
      mfaSubtitle: "Please scan the QR code into your Divebuster application or browser and enter the code provided below.",
      emailTabLabel: "Verify via Email Address",
      qrTabLabel: "Verify via QR Code",
      verificationCodeLabel: "Verification Code",
      verificationCodePlaceholder: "Enter your verification code",
      submitButton: "Submit",
      noCodeText: "Don't receive the code?",
      resendButton: "Resend",
      resendingText: "Resending...",
      closeButton: "Close",
      // Add password-related translations
      passwordLabel: "New Password",
      passwordPlaceholder: "Enter your new password",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your new password",
      errors: {
        tokenRequired: "Verification code is required",
        passwordRequired: "Password is required",
        passwordMinLength: "Password must be at least 8 characters",
        passwordComplexity: "Password must contain uppercase, lowercase, number, and special character",
        confirmPasswordRequired: "Confirm password is required",
        passwordsDoNotMatch: "Passwords don't match"
      }
    },
    mfaVerification: {
      generatedCodeLabel: "Generated Code",
      generatedCodePlaceholder: "Enter the generated code",
      submitButton: "Submit",
      submittingText: "Submitting...",
      noCodeText: "Don't receive the code?",
      regenerateButton: "Regenerate QR Code",
      regeneratingText: "Regenerating...",
      qrRegeneratedMessage: "QR code regenerated successfully!",
      errors: {
        mfaCodeRequired: "MFA code is required"
      }
    }
  },
  es: {
    verifyEmail:{
title:"Por favor verifica tu cuenta para continuar"
    },
    basicInfo: {
      title: "Crear una Cuenta",
      subtitle: "Continúa con tu Registro",
      preferredLanguage: "Idioma Preferido",
      selectLanguage: "Selecciona tu idioma preferido",
      nextButton: "Siguiente",
    },
    accountDetails: {
      title: "Detalles de la Cuenta",
      subtitle: "Ingresa tu información personal",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      phoneNumber: "Número de Teléfono",
      backButton: "Atrás",
      nextButton: "Siguiente",
      firstNamePlaceholder: "Ingresa tu nombre",
      lastNamePlaceholder: "Ingresa tu apellido",
      emailPlaceholder: "Ingresa tu correo electrónico",
      errors: {
        firstNameRequired: "El nombre es obligatorio",
        lastNameRequired: "El apellido es obligatorio",
        invalidEmail: "Dirección de correo electrónico inválida"
      }
    },
    socialLogins: {
      reddit: "Iniciar sesión con Reddit",
      microsoft: "Iniciar sesión con Microsoft 365",
      linkedin: "Iniciar sesión con LinkedIn",
      apple: "Iniciar sesión con Apple ID",
      connecting: "Conectando...",
      google: "Iniciar sesión con Google"
    },
    googleLogin: "Iniciar sesión con Google",
    googleConnecting: "Conectando...",
    noAccount: "¿No tienes una cuenta?",
    register: "Regístrate",
    orText: "O",
    diveProfile: {
      title: "Perfil de Buceo",
      subtitle: "Cuéntanos sobre ti",
      nickname: "Apodo",
      dateOfBirth: "Fecha de Nacimiento",
      phoneNumber: "Número de Teléfono",
      password: "Contraseña",
      confirmPassword: "Confirmar Contraseña",
      backButton: "Atrás",
      nextButton: "Siguiente",
      nicknamePlaceholder: "Ingresa tu apodo",
      dateOfBirthPlaceholder: "Selecciona tu fecha de nacimiento",
      phoneNumberPlaceholder: "Ingresa tu número de teléfono",
      passwordPlaceholder: "Ingresa tu contraseña",
      confirmPasswordPlaceholder: "Ingresa tu contraseña nuevamente",
      errors: {
        nicknameRequired: "El apodo es obligatorio",
        dateOfBirthRequired: "La fecha de nacimiento es obligatoria",
        phoneNumberRequired: "El número de teléfono es obligatorio",
        passwordMinLength: "La contraseña debe tener al menos 8 caracteres",
        passwordComplexity: "La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales",
        confirmPasswordRequired: "Por favor confirma tu contraseña",
        passwordsDoNotMatch: "Las contraseñas no coinciden"
      }
    },
    accountType: {
      title: "Preferencias de Medición",
      subtitle: "Establece tus unidades de medida preferidas",
      unitOfMeasure: "Unidad de Medida",
      selectUnit: "Selecciona tu unidad de medida preferida",
      temperature: "Temperatura",
      selectTemperature: "Selecciona tu unidad de temperatura preferida",
      bodySize: "Talla Corporal",
      selectBodySize: "Selecciona tu talla corporal",
      shoeSize: "Talla de Calzado",
      selectShoeSize: "Selecciona tu talla de calzado",
      country: "País",
      selectCountry: "Selecciona tu País",
      backButton: "Atrás",
      nextButton: "Siguiente",
      // New dropdown options
      metricOption: "Métrico",
      imperialOption: "Imperial",
      celsiusOption: "Celsius",
      fahrenheitOption: "Fahrenheit",
      kelvinOption: "Kelvin",
      xsmallOption: "Extra Pequeño",
      smallOption: "Pequeño",
      mediumOption: "Mediano",
      largeOption: "Grande",
      xlargeOption: "Extra Grande",
      euOption: "EU",
      usOption: "US",
      ukOption: "UK",
      // Error messages
      errors: {
        unitRequired: "La unidad de medida es requerida",
        temperatureRequired: "La temperatura es requerida",
        bodySizeRequired: "La talla corporal es requerida",
        shoeSizeRequired: "La talla de calzado es requerida",
        countryRequired: "El país es requerido",
      },
    },
    profilePicture: {
      title: "Añadir Foto de Perfil",
      subtitle: "Añade una foto de perfil a tu cuenta",
      uploadText: "Haz clic para subir",
      dragDropText: "o arrastra y suelta",
      fileTypeText: "PNG o JPG (máx. 800×400px)",
      backButton: "Atrás",
      submitButton: "Enviar",
      skipButton: "Omitir este Paso",
    },
    accountTypeSelection: {
      title: "Selecciona tu Tipo de Cuenta",
      subtitle: "Elige el tipo de cuenta que deseas crear.",
      diverTypeLabel: "Tipo de Buceador",
      scubaDiver: "Buceador con Escafandra",
      freeDiver: "Buceador Libre",
      recreativeTitle: "Recreativo y Estudiante",
      recreativeDescription: "Para buceadores apasionados, certificados y no certificados que bucean por diversión y quieren llevar un registro de todas sus aventuras con amigos y familiares.",
      recreativeExample: "Ej: Open, Avanzado, Nocturno, Rescate, etc.",
      professionalTitle: "Profesional y Expertos",
      professionalDescription: "Para profesionales que están conectados a una escuela de buceo, tienda u organización y quieren promocionarse.",
      professionalExample: "Ej: Divemasters, Instructores.",
      combinedTitle: "Combinado",
      combinedDescription: "Para buceadores profesionales conectados a una escuela de buceo, pero que también bucean de forma recreativa en su tiempo libre con sus compañeros.",
      combinedBenefit: "Beneficio: Todas las inmersiones se registrarán bajo un solo perfil.",
      peoplesChoice: "Elección Popular",
      backButton: "Atrás",
      continueButton: "Continuar",
      errors: {
        diverTypeRequired: "El tipo de buceador es obligatorio",
        accountTypeRequired: "El tipo de cuenta es obligatorio"
      }
    },
    emailVerification: {
      title: "Verificación de Correo",
      subtitle: "Necesitamos validar tu dirección de correo electrónico - por lo tanto, recibirás un código de verificación.",
      mfaTitle: "Autenticación de múltiples factores",
      mfaSubtitle: "Por favor, escanea el código QR en tu aplicación Divebuster o navegador e ingresa el código proporcionado a continuación.",
      emailTabLabel: "Verificar por Correo Electrónico",
      qrTabLabel: "Verificar por Código QR",
      verificationCodeLabel: "Código de Verificación",
      verificationCodePlaceholder: "Ingresa tu código de verificación",
      submitButton: "Enviar",
      noCodeText: "¿No recibiste el código?",
      resendButton: "Reenviar",
      resendingText: "Reenviando...",
      closeButton: "Cerrar",
      // Add password-related translations in Spanish
      passwordLabel: "Nueva Contraseña",
      passwordPlaceholder: "Ingresa tu nueva contraseña",
      confirmPasswordLabel: "Confirmar Contraseña",
      confirmPasswordPlaceholder: "Confirma tu nueva contraseña",
      errors: {
        tokenRequired: "El código de verificación es obligatorio",
        passwordRequired: "La contraseña es obligatoria",
        passwordMinLength: "La contraseña debe tener al menos 8 caracteres",
        passwordComplexity: "La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales",
        confirmPasswordRequired: "Confirmar contraseña es obligatorio",
        passwordsDoNotMatch: "Las contraseñas no coinciden"
      }
    },
    mfaVerification: {
      generatedCodeLabel: "Código Generado",
      generatedCodePlaceholder: "Ingresa el código generado",
      submitButton: "Enviar",
      submittingText: "Enviando...",
      noCodeText: "¿No recibiste el código?",
      regenerateButton: "Regenerar Código QR",
      regeneratingText: "Regenerando...",
      qrRegeneratedMessage: "¡Código QR regenerado con éxito!",
      errors: {
        mfaCodeRequired: "El código MFA es obligatorio"
      }
    }
  },
  fr: {
    verifyEmail:{
      title:"Veuillez vérifier votre compte pour continuer"
    },
    basicInfo: {
      title: "Créer un Compte",
      subtitle: "Poursuivez votre Inscription",
      preferredLanguage: "Langue Préférée",
      selectLanguage: "Sélectionnez votre langue préférée",
      nextButton: "Suivant",
    },
    accountDetails: {
      title: "Détails du Compte",
      subtitle: "Entrez vos informations personnelles",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Adresse Email",
      phoneNumber: "Numéro de Téléphone",
      backButton: "Retour",
      nextButton: "Suivant",
      firstNamePlaceholder: "Entrez votre prénom",
      lastNamePlaceholder: "Entrez votre nom",
      emailPlaceholder: "Entrez votre adresse email",
      errors: {
        firstNameRequired: "Le prénom est requis",
        lastNameRequired: "Le nom est requis",
        invalidEmail: "Adresse email invalide"
      }
    },
    socialLogins: {
      reddit: "Se connecter avec Reddit",
      microsoft: "Se connecter avec Microsoft 365",
      linkedin: "Se connecter avec LinkedIn",
      apple: "Se connecter avec Apple ID",
      connecting: "Connexion en cours...",
      google: "Se connecter avec Google"
    },
    googleLogin: "Se connecter avec Google",
    googleConnecting: "Connexion en cours...",
    noAccount: "Vous n'avez pas de compte ?",
    register: "S'inscrire",
    orText: "Ou",
    diveProfile: {
      title: "Profil de Plongée",
      subtitle: "Parlez-nous de vous",
      nickname: "Surnom",
      dateOfBirth: "Date de Naissance",
      phoneNumber: "Numéro de Téléphone",
      password: "Mot de Passe",
      confirmPassword: "Confirmer le Mot de Passe",
      backButton: "Retour",
      nextButton: "Suivant",
      nicknamePlaceholder: "Entrez votre pseudo",
      dateOfBirthPlaceholder: "Sélectionnez votre date de naissance",
      phoneNumberPlaceholder: "Entrez votre numéro de téléphone",
      passwordPlaceholder: "Entrez votre mot de passe",
      confirmPasswordPlaceholder: "Entrez à nouveau votre mot de passe",
      errors: {
        nicknameRequired: "Le pseudo est requis",
        dateOfBirthRequired: "La date de naissance est requise",
        phoneNumberRequired: "Le numéro de téléphone est requis",
        passwordMinLength: "Le mot de passe doit contenir au moins 8 caractères",
        passwordComplexity: "Le mot de passe doit contenir des majuscules, des minuscules, des chiffres et des caractères spéciaux",
        confirmPasswordRequired: "Veuillez confirmer votre mot de passe",
        passwordsDoNotMatch: "Les mots de passe ne correspondent pas"
      }
    },
    accountType: {
      title: "Préférences de Mesure",
      subtitle: "Définissez vos unités de mesure préférées",
      unitOfMeasure: "Unité de Mesure",
      selectUnit: "Sélectionnez votre unité de mesure préférée",
      temperature: "Température",
      selectTemperature: "Sélectionnez votre unité de température préférée",
      bodySize: "Taille Corporelle",
      selectBodySize: "Sélectionnez votre taille corporelle",
      shoeSize: "Pointure",
      selectShoeSize: "Sélectionnez votre pointure",
      country: "Pays",
      selectCountry: "Sélectionnez votre Pays",
      backButton: "Retour",
      nextButton: "Suivant",
      // New dropdown options
      metricOption: "Métrique",
      imperialOption: "Impérial",
      celsiusOption: "Celsius",
      fahrenheitOption: "Fahrenheit",
      kelvinOption: "Kelvin",
      xsmallOption: "Extra Petit",
      smallOption: "Petit",
      mediumOption: "Moyen",
      largeOption: "Grand",
      xlargeOption: "Extra Grand",
      euOption: "UE",
      usOption: "États-Unis",
      ukOption: "Royaume-Uni",
      // Error messages
      errors: {
        unitRequired: "L'unité de mesure est requise",
        temperatureRequired: "La température est requise",
        bodySizeRequired: "La taille corporelle est requise",
        shoeSizeRequired: "La pointure est requise",
        countryRequired: "Le pays est requis",
      },
    },
    profilePicture: {
      title: "Ajouter une Photo de Profil",
      subtitle: "Ajoutez une photo de profil à votre compte",
      uploadText: "Cliquez pour télécharger",
      dragDropText: "ou glissez-déposez",
      fileTypeText: "PNG ou JPG (max. 800×400px)",
      backButton: "Retour",
      submitButton: "Soumettre",
      skipButton: "Passer cette Étape",
    },
    accountTypeSelection: {
      title: "Sélectionnez votre Type de Compte",
      subtitle: "Choisissez le type de compte que vous souhaitez créer.",
      diverTypeLabel: "Type de Plongeur",
      scubaDiver: "Plongeur en Scaphandre",
      freeDiver: "Plongeur en Apnée",
      recreativeTitle: "Récréatif et Étudiant",
      recreativeDescription: "Pour les plongeurs passionnés, certifiés et non certifiés qui plongent pour le plaisir et souhaitent garder une trace de toutes leurs aventures avec leurs amis et leurs familles.",
      recreativeExample: "Ex: Open, Avancé, Nuit, Sauvetage, etc.",
      professionalTitle: "Professionnel et Experts",
      professionalDescription: "Pour les professionnels qui sont liés à une école de plongée, un magasin ou une organisation et qui veulent se promouvoir.",
      professionalExample: "Ex: Divemasters, Instructeurs.",
      combinedTitle: "Combiné",
      combinedDescription: "Pour les plongeurs professionnels liés à une école de plongée, mais qui plongent également de façon récréative pendant leur temps libre avec leurs compagnons.",
      combinedBenefit: "Avantage: Toutes les plongées seront enregistrées sous un seul profil.",
      peoplesChoice: "Choix Populaire",
      backButton: "Retour",
      continueButton: "Continuer",
      errors: {
        diverTypeRequired: "Le type de plongeur est requis",
        accountTypeRequired: "Le type de compte est requis"
      }
    },
    emailVerification: {
      title: "Vérification de l'Email",
      subtitle: "Nous devons valider votre adresse e-mail - vous recevrez donc un code de vérification.",
      mfaTitle: "Authentification à plusieurs facteurs",
      mfaSubtitle: "Veuillez scanner le code QR dans votre application Divebuster ou navigateur et entrer le code fourni ci-dessous.",
      emailTabLabel: "Vérifier par Email",
      qrTabLabel: "Vérifier par Code QR",
      verificationCodeLabel: "Code de Vérification",
      verificationCodePlaceholder: "Entrez votre code de vérification",
      submitButton: "Soumettre",
      noCodeText: "Vous n'avez pas reçu le code ?",
      resendButton: "Renvoyer",
      resendingText: "Renvoi en cours...",
      closeButton: "Fermer",
      // Add password-related translations in French
      passwordLabel: "Nouveau Mot de Passe",
      passwordPlaceholder: "Entrez votre nouveau mot de passe",
      confirmPasswordLabel: "Confirmer le Mot de Passe",
      confirmPasswordPlaceholder: "Confirmez votre nouveau mot de passe",
      errors: {
        tokenRequired: "Le code de vérification est requis",
        passwordRequired: "Le mot de passe est requis",
        passwordMinLength: "Le mot de passe doit comporter au moins 8 caractères",
        confirmPasswordRequired: "La confirmation du mot de passe est requise",
        passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
        passwordComplexity: "Le mot de passe doit contenir des majuscules, des minuscules, des chiffres et des caractères spéciaux"

      }
    },
    mfaVerification: {
      generatedCodeLabel: "Code Généré",
      generatedCodePlaceholder: "Entrez le code généré",
      submitButton: "Soumettre",
      submittingText: "Soumission en cours...",
      noCodeText: "Vous n'avez pas reçu le code ?",
      regenerateButton: "Régénérer le Code QR",
      regeneratingText: "Régénération en cours...",
      qrRegeneratedMessage: "Code QR régénéré avec succès !",
      errors: {
        mfaCodeRequired: "Le code MFA est requis"
      }
    }
  },
  nl: {
    verifyEmail:{
      title:"Verifieer je account om door te gaan"
    },
    basicInfo: {
      title: "Account Aanmaken",
      subtitle: "Ga verder met je Registratie",
      preferredLanguage: "Voorkeurstaal",
      selectLanguage: "Selecteer je voorkeurstaal",
      nextButton: "Volgende",
    },
    accountDetails: {
      title: "Accountgegevens",
      subtitle: "Voer je persoonlijke gegevens in",
      firstName: "Voornaam",
      lastName: "Achternaam",
      email: "E-mailadres",
      phoneNumber: "Telefoonnummer",
      backButton: "Terug",
      nextButton: "Volgende",
      firstNamePlaceholder: "Voer je voornaam in",
      lastNamePlaceholder: "Voer je achternaam in",
      emailPlaceholder: "Voer je e-mailadres in",
      errors: {
        firstNameRequired: "Voornaam is verplicht",
        lastNameRequired: "Achternaam is verplicht",
        invalidEmail: "Ongeldig e-mailadres"
      }
    },
    socialLogins: {
      reddit: "Inloggen met Reddit",
      microsoft: "Inloggen met Microsoft 365",
      linkedin: "Inloggen met LinkedIn",
      apple: "Inloggen met Apple ID",
      connecting: "Verbinden...",
      google: "Inloggen met Google"
    },
    googleLogin: "Inloggen met Google",
    googleConnecting: "Verbinden...",
    noAccount: "Heb je geen account?",
    register: "Registreren",
    orText: "Of",
    diveProfile: {
      title: "Duikprofiel",
      subtitle: "Vertel ons over jezelf",
      nickname: "Bijnaam",
      dateOfBirth: "Geboortedatum",
      phoneNumber: "Telefoonnummer",
      password: "Wachtwoord",
      confirmPassword: "Bevestig Wachtwoord",
      backButton: "Terug",
      nextButton: "Volgende",
      nicknamePlaceholder: "Voer je bijnaam in",
      dateOfBirthPlaceholder: "Selecteer je geboortedatum",
      phoneNumberPlaceholder: "Voer je telefoonnummer in",
      passwordPlaceholder: "Voer je wachtwoord in",
      confirmPasswordPlaceholder: "Voer je wachtwoord opnieuw in",
      errors: {
        nicknameRequired: "Bijnaam is verplicht",
        dateOfBirthRequired: "Geboortedatum is verplicht",
        phoneNumberRequired: "Telefoonnummer is verplicht",
        passwordMinLength: "Wachtwoord moet minimaal 8 tekens bevatten",
        passwordComplexity: "Wachtwoord moet hoofdletters, kleine letters, cijfers en speciale tekens bevatten",
        confirmPasswordRequired: "Bevestig je wachtwoord",
        passwordsDoNotMatch: "Wachtwoorden komen niet overeen"
      }
    },
    accountType: {
      title: "Meetvoorkeuren",
      subtitle: "Stel je voorkeurseenheden in",
      unitOfMeasure: "Maateenheid",
      selectUnit: "Selecteer je voorkeurseenheid",
      temperature: "Temperatuur",
      selectTemperature: "Selecteer je temperatuureenheid",
      bodySize: "Lichaamsgrootte",
      selectBodySize: "Selecteer je lichaamsgrootte",
      shoeSize: "Schoenmaat",
      selectShoeSize: "Selecteer je schoenmaat",
      country: "Land",
      selectCountry: "Selecteer je Land",
      backButton: "Terug",
      nextButton: "Volgende",
      // New dropdown options
      metricOption: "Metrisch",
      imperialOption: "Imperiaal",
      celsiusOption: "Celsius",
      fahrenheitOption: "Fahrenheit",
      kelvinOption: "Kelvin",
      xsmallOption: "Extra Klein",
      smallOption: "Klein",
      mediumOption: "Gemiddeld",
      largeOption: "Groot",
      xlargeOption: "Extra Groot",
      euOption: "EU",
      usOption: "VS",
      ukOption: "UK",
      // Error messages
      errors: {
        unitRequired: "Maateenheid is verplicht",
        temperatureRequired: "Temperatuur is verplicht",
        bodySizeRequired: "Lichaamsgrootte is verplicht",
        shoeSizeRequired: "Schoenmaat is verplicht",
        countryRequired: "Land is verplicht",
      },
    },
    profilePicture: {
      title: "Profielfoto Toevoegen",
      subtitle: "Voeg een profielfoto toe aan je account",
      uploadText: "Klik om te uploaden",
      dragDropText: "of sleep en laat los",
      fileTypeText: "PNG of JPG (max. 800×400px)",
      backButton: "Terug",
      submitButton: "Indienen",
      skipButton: "Deze Stap Overslaan",
    },
    accountTypeSelection: {
      title: "Selecteer je Accounttype",
      subtitle: "Kies het type account dat je wilt aanmaken.",
      diverTypeLabel: "Type Duiker",
      scubaDiver: "Scubaduiker",
      freeDiver: "Freediver",
      recreativeTitle: "Recreatief & Student",
      recreativeDescription: "Voor gepassioneerde, gecertificeerde en niet-gecertificeerde duikers die voor plezier duiken en al hun avonturen met vrienden en familie willen bijhouden.",
      recreativeExample: "Bijv: Open, Advanced, Night, Rescue, enz.",
      professionalTitle: "Professioneel & Experts",
      professionalDescription: "Voor professionele duikers die verbonden zijn aan een duikschool, winkel of organisatie en zichzelf willen promoten.",
      professionalExample: "Bijv: Duikmasters, instructeurs.",
      combinedTitle: "Gecombineerd",
      combinedDescription: "Voor professionele duikers die verbonden zijn aan een duikschool, maar ook recreatief duiken in hun vrije tijd met hun vrienden.",
      combinedBenefit: "Voordel: Alle duiktochten worden vastgelegd onder één profiel.",
      peoplesChoice: "Mensenkeuze",
      backButton: "Terug",
      continueButton: "Doorgaan",
      errors: {
        diverTypeRequired: "Duikertype is verplicht",
        accountTypeRequired: "Accounttype is verplicht"
      }
    },
    emailVerification: {
      title: "E-mailverificatie",
      subtitle: "We moeten je e-mailadres valideren - daarom ontvang je een verificatiecode.",
      mfaTitle: "Meervoudige authenticatie",
      mfaSubtitle: "Scan de QR-code in je Divebuster-applicatie of browser en voer de onderstaande code in.",
      emailTabLabel: "Verifiëren via E-mail",
      qrTabLabel: "Verifiëren via QR-code",
      verificationCodeLabel: "Verificatiecode",
      verificationCodePlaceholder: "Voer je verificatiecode in",
      submitButton: "Indienen",
      noCodeText: "Code niet ontvangen?",
      resendButton: "Opnieuw verzenden",
      resendingText: "Opnieuw verzenden...",
      closeButton: "Sluiten",
      // Add password-related translations in Dutch
      passwordLabel: "Nieuw Wachtwoord",
      passwordPlaceholder: "Voer je nieuwe wachtwoord in",
      confirmPasswordLabel: "Bevestig Wachtwoord",
      confirmPasswordPlaceholder: "Bevestig je nieuwe wachtwoord",
      errors: {
        tokenRequired: "Verificatiecode is verplicht",
        passwordRequired: "Wachtwoord is verplicht",
        passwordMinLength: "Wachtwoord moet minimaal 8 tekens bevatten",
        confirmPasswordRequired: "Wachtwoordbevestiging is verplicht",
        passwordsDoNotMatch: "Wachtwoorden komen niet overeen",
        passwordComplexity: "Wachtwoord moet hoofdletters, kleine letters, cijfers en speciale tekens bevatten"
      }
    },
    mfaVerification: {
      generatedCodeLabel: "Gegenereerde Code",
      generatedCodePlaceholder: "Voer de gegenereerde code in",
      submitButton: "Indienen",
      submittingText: "Indienen...",
      noCodeText: "Code niet ontvangen?",
      regenerateButton: "QR-code opnieuw genereren",
      regeneratingText: "Opnieuw genereren...",
      qrRegeneratedMessage: "QR-code succesvol opnieuw gegenereerd!",
      errors: {
        mfaCodeRequired: "MFA-code is verplicht"
      }
    }
  },
  // de: {
  //   basicInfo: {
  //     title: "Konto Erstellen",
  //     subtitle: "Fahren Sie mit Ihrer Registrierung fort",
  //     preferredLanguage: "Bevorzugte Sprache",
  //     selectLanguage: "Wählen Sie Ihre bevorzugte Sprache",
  //     nextButton: "Weiter",
  //   },
  //   accountDetails: {
  //     title: "Kontodetails",
  //     subtitle: "Geben Sie Ihre persönlichen Daten ein",
  //     firstName: "Vorname",
  //     lastName: "Nachname",
  //     email: "E-Mail-Adresse",
  //     phoneNumber: "Telefonnummer",
  //     backButton: "Zurück",
  //     nextButton: "Weiter",
  //     firstNamePlaceholder: "Geben Sie Ihren Vornamen ein",
  //     lastNamePlaceholder: "Geben Sie Ihren Nachnamen ein",
  //     emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
  //     errors: {
  //       firstNameRequired: "Vorname ist erforderlich",
  //       lastNameRequired: "Nachname ist erforderlich",
  //       invalidEmail: "Ungültige E-Mail-Adresse"
  //     }
  //   },
  //   socialLogins: {
  //     reddit: "Mit Reddit anmelden",
  //     microsoft: "Mit Microsoft 365 anmelden",
  //     linkedin: "Mit LinkedIn anmelden",
  //     apple: "Mit Apple ID anmelden",
  //     connecting: "Verbindung wird hergestellt...",
  //     google: "Mit Google anmelden"
  //   },
  //   googleLogin: "Mit Google anmelden",
  //   googleConnecting: "Verbindung wird hergestellt...",
  //   noAccount: "Sie haben noch kein Konto?",
  //   register: "Registrieren",
  //   orText: "Oder",
  //   diveProfile: {
  //     title: "Tauchprofil",
  //     subtitle: "Erzählen Sie uns von sich",
  //     nickname: "Spitzname",
  //     dateOfBirth: "Geburtsdatum",
  //     phoneNumber: "Telefonnummer",
  //     password: "Passwort",
  //     confirmPassword: "Passwort bestätigen",
  //     backButton: "Zurück",
  //     nextButton: "Weiter",
  //     nicknamePlaceholder: "Geben Sie Ihren Spitznamen ein",
  //     dateOfBirthPlaceholder: "Wählen Sie Ihr Geburtsdatum",
  //     phoneNumberPlaceholder: "Geben Sie Ihre Telefonnummer ein",
  //     passwordPlaceholder: "Geben Sie Ihr Passwort ein",
  //     confirmPasswordPlaceholder: "Geben Sie Ihr Passwort erneut ein",
  //     errors: {
  //       nicknameRequired: "Spitzname ist erforderlich",
  //       dateOfBirthRequired: "Geburtsdatum ist erforderlich",
  //       phoneNumberRequired: "Telefonnummer ist erforderlich",
  //       passwordMinLength: "Passwort muss mindestens 8 Zeichen lang sein",
  //       confirmPasswordRequired: "Bitte bestätigen Sie Ihr Passwort",
  //       passwordsDoNotMatch: "Passwörter stimmen nicht überein"
  //     }
  //   },
  //   accountType: {
  //     title: "Messeinstellungen",
  //     subtitle: "Legen Sie Ihre bevorzugten Maßeinheiten fest",
  //     unitOfMeasure: "Maßeinheit",
  //     selectUnit: "Wählen Sie Ihre bevorzugte Maßeinheit",
  //     temperature: "Temperatur",
  //     selectTemperature: "Wählen Sie Ihre bevorzugte Temperatureinheit",
  //     bodySize: "Körpergröße",
  //     selectBodySize: "Wählen Sie Ihre Körpergröße",
  //     shoeSize: "Schuhgröße",
  //     selectShoeSize: "Wählen Sie Ihre Schuhgröße",
  //     country: "Land",
  //     selectCountry: "Wählen Sie Ihr Land",
  //     backButton: "Zurück",
  //     nextButton: "Weiter",
  //     // New dropdown options
  //     metricOption: "Metrisch",
  //     imperialOption: "Imperial",
  //     celsiusOption: "Celsius",
  //     fahrenheitOption: "Fahrenheit",
  //     kelvinOption: "Kelvin",
  //     xsmallOption: "Extra Klein",
  //     smallOption: "Klein",
  //     mediumOption: "Mittel",
  //     largeOption: "Groß",
  //     xlargeOption: "Extra Groß",
  //     euOption: "EU",
  //     usOption: "USA",
  //     ukOption: "UK",
  //     // Error messages
  //     errors: {
  //       unitRequired: "Maßeinheit ist erforderlich",
  //       temperatureRequired: "Temperatur ist erforderlich",
  //       bodySizeRequired: "Körpergröße ist erforderlich",
  //       shoeSizeRequired: "Schuhgröße ist erforderlich",
  //       countryRequired: "Land ist erforderlich",
  //     },
  //   },
  //   profilePicture: {
  //     title: "Profilbild Hinzufügen",
  //     subtitle: "Fügen Sie Ihrem Konto ein Profilbild hinzu",
  //     uploadText: "Klicken zum Hochladen",
  //     dragDropText: "oder ziehen und ablegen",
  //     fileTypeText: "PNG oder JPG (max. 800×400px)",
  //     backButton: "Zurück",
  //     submitButton: "Absenden",
  //     skipButton: "Diesen Schritt Überspringen",
  //   },
  //   accountTypeSelection: {
  //     title: "Wählen Sie Ihren Kontotyp",
  //     subtitle: "Wählen Sie den Kontotyp aus, den Sie erstellen möchten.",
  //     diverTypeLabel: "Typ des Tauchers",
  //     scubaDiver: "Taucher mit Tauchmaske",
  //     freeDiver: "Freitaucher",
  //     recreativeTitle: "Rekreativ & Schüler",
  //     recreativeDescription: "Für begeisterte, zertifizierte und nicht zertifizierte Taucher, die für Spaß tauchen und alle ihre Abenteuer mit Freunden und Familie verfolgen möchten.",
  //     recreativeExample: "Beispielsweise: Open, Advanced, Night, Rescue usw.",
  //     professionalTitle: "Professionell & Experten",
  //     professionalDescription: "Für Profis, die mit einer Tauchschule, Tauchladen oder Organisation verbunden sind und sich selbst bewerben möchten.",
  //     professionalExample: "Beispielsweise: Tauchleiter, Instrukteure.",
  //     combinedTitle: "Kombiniert",
  //     combinedDescription: "Für professionelle Taucher, die mit einer Tauchschule verbunden sind, aber auch in ihrer Freizeit mit Freunden unterwasser tauchen.",
  //     combinedBenefit: "Vorteil: Alle Tauchgänge werden unter einem einzigen Profil protokolliert.",
  //     peoplesChoice: "Menschenwahl",
  //     backButton: "Zurück",
  //     continueButton: "Weiter",
  //     errors: {
  //       diverTypeRequired: "Tauchertyp ist erforderlich",
  //       accountTypeRequired: "Kontotyp ist erforderlich"
  //     }
  //   },
  //   emailVerification: {
  //     title: "E-Mail-Verifizierung",
  //     subtitle: "Wir müssen Ihre E-Mail-Adresse validieren - daher erhalten Sie einen Verifizierungscode.",
  //     mfaTitle: "Multi-Faktor-Authentifizierung",
  //     mfaSubtitle: "Bitte scannen Sie den QR-Code in Ihre Divebuster-Anwendung oder Browser und geben Sie den unten angegebenen Code ein.",
  //     emailTabLabel: "Über E-Mail verifizieren",
  //     qrTabLabel: "Über QR-Code verifizieren",
  //     verificationCodeLabel: "Verifizierungscode",
  //     verificationCodePlaceholder: "Geben Sie Ihren Verifizierungscode ein",
  //     submitButton: "Absenden",
  //     noCodeText: "Keinen Code erhalten?",
  //     resendButton: "Erneut senden",
  //     resendingText: "Wird erneut gesendet...",
  //     closeButton: "Schließen",
  //     errors: {
  //       tokenRequired: "Verifizierungscode ist erforderlich"
  //     }
  //   },
  //   mfaVerification: {
  //     generatedCodeLabel: "Generierter Code",
  //     generatedCodePlaceholder: "Geben Sie den generierten Code ein",
  //     submitButton: "Absenden",
  //     submittingText: "Wird gesendet...",
  //     noCodeText: "Keinen Code erhalten?",
  //     regenerateButton: "QR-Code neu generieren",
  //     regeneratingText: "Wird neu generiert...",
  //     qrRegeneratedMessage: "QR-Code erfolgreich neu generiert!",
  //     errors: {
  //       mfaCodeRequired: "MFA-Code ist erforderlich"
  //     }
  //   }
  // },
}





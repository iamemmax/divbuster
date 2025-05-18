export const checkTokens = () => {
  try {
    // Check for DIVBUSTER tokens
    const divbusterToken = localStorage.getItem("DIVBUSTERTOKEN");
    const divbusterTokens = localStorage.getItem("DIVBUSTERTOKENS");
    const divbusterCredentials = localStorage.getItem("DIVBUSTERSAVED_LOGIN_CREDENTIALS");
    
    // Check for HEALA tokens
    const healaToken = localStorage.getItem("HEALA_TOKEN");
    const healaTokens = localStorage.getItem("HEALA_TOKENS");
    const healaCredentials = localStorage.getItem("HEALA_SAVED_LOGIN_CREDENTIALS");
    
    // Log the results
    console.log("Token check results:", {
      divbuster: {
        token: divbusterToken ? "exists" : "not found",
        tokens: divbusterTokens ? "exists" : "not found",
        credentials: divbusterCredentials ? "exists" : "not found"
      },
      heala: {
        token: healaToken ? "exists" : "not found",
        tokens: healaTokens ? "exists" : "not found",
        credentials: healaCredentials ? "exists" : "not found"
      }
    });
    
    // Return the results
    return {
      divbuster: {
        token: divbusterToken,
        tokens: divbusterTokens,
        credentials: divbusterCredentials
      },
      heala: {
        token: healaToken,
        tokens: healaTokens,
        credentials: healaCredentials
      }
    };
  } catch (error) {
    console.error("Error checking tokens:", error);
    return null;
  }
};
import { type Configuration, LogLevel } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID, // Your app registration App ID
    authority: import.meta.env.VITE_MSAL_AUTHORITY, // Your tenant ID
    redirectUri: import.meta.env.VITE_REDIRECT_URI, // Must match the redirect URI in app registration
  },
  cache: {
    cacheLocation: "localStorage", // Use localStorage so popup and parent share the auth state
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"], // Scopes for Microsoft Graph
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
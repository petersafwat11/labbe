const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Get authorization token from cookies
 */
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }
  return null;
};

/**
 * Make authenticated API request
 */
const makeAuthenticatedRequest = async (url, options = {}, token = null) => {
  const authToken = token || getAuthToken();

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    credentials: "include",
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return response.json();
};

/**
 * Notification API functions
 */
export const notificationAPI = {
  /**
   * Get notification preferences for the current host
   */
  getNotificationPreferences: async (token = null) => {
    return makeAuthenticatedRequest("/host/notifications", {}, token);
  },

  /**
   * Update notification preferences for the current host
   */
  updateNotificationPreferences: async (preferences, token = null) => {
    return makeAuthenticatedRequest(
      "/host/notifications",
      {
        method: "PATCH",
        body: JSON.stringify(preferences),
      },
      token
    );
  },
};

/**
 * Host profile API functions
 */
export const hostProfileAPI = {
  /**
   * Get host profile information
   */
  getProfile: async (token = null) => {
    return makeAuthenticatedRequest("/host/profile", {}, token);
  },

  /**
   * Update host profile information
   */
  updateProfile: async (profileData, token = null) => {
    return makeAuthenticatedRequest(
      "/host/profile",
      {
        method: "PATCH",
        body: JSON.stringify(profileData),
      },
      token
    );
  },
};

/**
 * Combined host API object
 */
export const hostAPI = {
  notifications: notificationAPI,
  profile: hostProfileAPI,
};

export default hostAPI;

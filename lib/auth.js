// API Base URL - adjust according to your backend URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Cookie utility functions
export const cookieUtils = {
  setCookie: (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  },

  getCookie: (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  deleteCookie: (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      // Don't set Content-Type for FormData - let browser set it
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
    credentials: "include", // Include cookies for auth
  };

  // Merge options
  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: response.statusText };
      }
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // For non-JSON responses, return success message
      return { success: true, message: "Request completed successfully" };
    }
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// Authentication Functions
export const authAPI = {
  // Host Initial Signup (just phone number)
  signupHost: async (phoneNumber) => {
    return apiRequest("/auth/signup/host", {
      method: "POST",
      body: JSON.stringify({ phoneNumber }),
    });
  },

  // Complete Host Profile
  completeHostProfile: async (profileData, token) => {
    return apiRequest("/auth/complete-host-profile", {
      method: "PATCH",
      body: JSON.stringify(profileData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Vendor Signup with File Upload
  signupVendor: async (formData, uploadedFiles) => {
    const uploadData = new FormData();

    // Add uploaded files
    if (uploadedFiles) {
      // Portfolio images (multiple files)
      if (
        uploadedFiles.portfolioImages &&
        uploadedFiles.portfolioImages.length > 0
      ) {
        uploadedFiles.portfolioImages.forEach((file) => {
          uploadData.append("portfolioImages", file);
        });
      }

      // Single file uploads
      if (uploadedFiles.businessLogo) {
        uploadData.append("businessLogo", uploadedFiles.businessLogo);
      }
      if (
        uploadedFiles.pricePackages &&
        uploadedFiles.pricePackages.length > 0
      ) {
        uploadedFiles.pricePackages.forEach((file) => {
          uploadData.append("pricePackages", file);
        });
      }
      if (uploadedFiles.commercialRecord) {
        uploadData.append("commercialRecord", uploadedFiles.commercialRecord);
      }
      if (uploadedFiles.cv) {
        uploadData.append("cv", uploadedFiles.cv);
      }
      if (uploadedFiles.profileFile) {
        uploadData.append("profileFile", uploadedFiles.profileFile);
      }
    }

    // Add form data as JSON strings
    uploadData.append("identity", JSON.stringify(formData.identity));
    uploadData.append("serviceData", JSON.stringify(formData.serviceData));
    uploadData.append(
      "samplesAndPackages",
      JSON.stringify(formData.samplesAndPackages)
    );
    uploadData.append(
      "commercialVerification",
      JSON.stringify(formData.commercialVerification)
    );
    uploadData.append("paymentData", JSON.stringify(formData.paymentData));
    uploadData.append(
      "otherLinksAndData",
      JSON.stringify(formData.otherLinksAndData)
    );

    return apiRequest("/auth/signup/vendor", {
      method: "POST",
      headers: {
        // Remove Content-Type header to let browser set it with boundary for FormData
      },
      body: uploadData,
    });
  },

  // WhiteLabel Signup with File Upload
  signupWhiteLabel: async (formData, logoFile) => {
    const uploadData = new FormData();

    // Add the logo file if it exists
    if (logoFile) {
      uploadData.append("logo", logoFile);
    }

    // Add form data as JSON strings
    uploadData.append("identity", JSON.stringify(formData.identity));
    uploadData.append("loginData", JSON.stringify(formData.loginData));
    uploadData.append(
      "systemRequirements",
      JSON.stringify(formData.systemRequirements)
    );
    uploadData.append(
      "additionalServices",
      JSON.stringify(formData.additionalServices || [])
    );
    uploadData.append("paymentData", JSON.stringify(formData.paymentData));

    return apiRequest("/auth/signup/whitelabel", {
      method: "POST",
      headers: {
        // Remove Content-Type header to let browser set it with boundary for FormData
      },
      body: uploadData,
    });
  },

  // Login with Email/Password
  login: async (email, password) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  // Send OTP
  sendOTP: async (phoneNumber, type) => {
    return apiRequest("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, type }),
    });
  },

  // Verify OTP
  verifyOTP: async (phoneNumber, otpCode) => {
    return apiRequest("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, otpCode }),
    });
  },

  // Logout
  logout: async () => {
    return apiRequest("/auth/logout", {
      method: "GET",
    });
  },

  // Forgot Password
  forgotPassword: async (email) => {
    return apiRequest("/auth/forgotPassword", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  // Reset Password
  resetPassword: async (token, password, passwordConfirm) => {
    return apiRequest(`/auth/resetPassword/${token}`, {
      method: "PATCH",
      body: JSON.stringify({ password, passwordConfirm }),
    });
  },
};

// Helper function to handle API errors
export const handleAPIError = (error) => {
  console.error("API Error:", error);

  // Return user-friendly error message
  if (error.message) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
};

// Export default
export default authAPI;

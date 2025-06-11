import { apiRequest } from "@/lib/queryClient";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SkillsData {
  systems: string;
  networking: string;
  programming: string;
  cybersecurity: string;
  cloud: string;
  simulation: string;
}

export interface ExperienceData {
  company: string;
  period: string;
  description: string;
  details: string[];
}

export interface PortfolioSettings {
  profilePicture: string | null;
  cvPdfPath: string | null;
  skills: string;
  experience: string;
  certifications: string;
}

export const portfolioApi = {
  // Contact form
  async submitContactForm(data: ContactFormData) {
    const response = await apiRequest("POST", "/api/contact", data);
    return response.json();
  },

  // Settings
  async verifyPassword(password: string) {
    const response = await apiRequest("POST", "/api/portfolio/verify-password", { password });
    return response.json();
  },

  async getSettings() {
    const response = await apiRequest("GET", "/api/portfolio/settings");
    return response.json();
  },

  async updateSettings(settings: Partial<PortfolioSettings>) {
    const response = await apiRequest("PUT", "/api/portfolio/settings", settings);
    return response.json();
  },

  async uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    const response = await fetch("/api/portfolio/upload-profile-picture", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    
    return response.json();
  },

  async uploadCV(file: File) {
    const formData = new FormData();
    formData.append('cvFile', file);
    
    const response = await fetch("/api/portfolio/upload-cv", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error("Failed to upload CV");
    }
    
    return response.json();
  },
};

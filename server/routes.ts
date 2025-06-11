import type { Express, Request } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertPortfolioSettingsSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

const uploadPDF = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'cv-' + uniqueSuffix + '.pdf');
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for PDFs
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

const passwordSchema = z.object({
  password: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Serve uploaded files
  app.use('/uploads', (req, res, next) => {
    // Add CORS headers for uploaded files
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use('/uploads', express.static(uploadDir));

  // Get portfolio settings
  app.get("/api/portfolio/settings", async (req, res) => {
    try {
      const settings = await storage.getPortfolioSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio settings" });
    }
  });

  // Verify settings password
  app.post("/api/portfolio/verify-password", async (req, res) => {
    try {
      const { password } = passwordSchema.parse(req.body);
      const correctPassword = "Azerty@123***";
      
      if (password === correctPassword) {
        res.json({ success: true });
      } else {
        res.status(401).json({ success: false, message: "Incorrect password" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Update portfolio settings
  app.put("/api/portfolio/settings", async (req, res) => {
    try {
      const settings = insertPortfolioSettingsSchema.parse(req.body);
      const updatedSettings = await storage.updatePortfolioSettings(settings);
      res.json(updatedSettings);
    } catch (error) {
      res.status(400).json({ message: "Invalid settings data" });
    }
  });

  // Upload profile picture
  app.post("/api/portfolio/upload-profile-picture", uploadImage.single('profilePicture'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      
      // Update portfolio settings with new profile picture
      const currentSettings = await storage.getPortfolioSettings();
      const updatedSettings = await storage.updatePortfolioSettings({
        profilePicture: fileUrl,
        cvPdfPath: currentSettings?.cvPdfPath || null,
        skills: currentSettings?.skills || null,
        experience: currentSettings?.experience || null,
        certifications: currentSettings?.certifications || null,
      });

      res.json({ fileUrl, settings: updatedSettings });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // Upload CV PDF
  app.post("/api/portfolio/upload-cv", uploadPDF.single('cvFile'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      
      // Update portfolio settings with new CV
      const currentSettings = await storage.getPortfolioSettings();
      const updatedSettings = await storage.updatePortfolioSettings({
        profilePicture: currentSettings?.profilePicture || null,
        cvPdfPath: fileUrl,
        skills: currentSettings?.skills || null,
        experience: currentSettings?.experience || null,
        certifications: currentSettings?.certifications || null,
      });

      res.json({ fileUrl, settings: updatedSettings });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload CV" });
    }
  });

  // Create contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const message = insertContactMessageSchema.parse(req.body);
      const createdMessage = await storage.createContactMessage(message);
      
      // In a real implementation, you would send an email here
      // For now, we'll just log the message
      console.log("Contact message received:", {
        ...message,
        note: "This should be sent to portfolio2025@hotmail.com and forwarded to ali.sefrioui@outlook.com"
      });
      
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  // Get all contact messages (for potential admin view)
  app.get("/api/contact/messages", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

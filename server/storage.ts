import { portfolioSettings, contactMessages, type PortfolioSettings, type InsertPortfolioSettings, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  // Portfolio Settings
  getPortfolioSettings(): Promise<PortfolioSettings | undefined>;
  updatePortfolioSettings(settings: InsertPortfolioSettings): Promise<PortfolioSettings>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private portfolioSettings: PortfolioSettings | undefined;
  private contactMessages: Map<number, ContactMessage>;
  private currentMessageId: number;

  constructor() {
    this.contactMessages = new Map();
    this.currentMessageId = 1;
    
    // Initialize default portfolio settings
    this.portfolioSettings = {
      id: 1,
      profilePicture: null,
      cvPdfPath: null,
      skills: JSON.stringify({
        systems: "Linux (Samba AD), Windows Server (AD, Entra ID)",
        networking: "IPTABLES, Cisco ASA, Routing & Switching, IPFire",
        programming: "Python, C++, Rust, VBA, PowerApps",
        cybersecurity: "Maltego, FTK Imager, Wazuh, EBIOS, SMSI",
        cloud: "VMware, Hyper-V, Proxmox, VirtualBox",
        simulation: "GNS3, Packet Tracer, Wireshark"
      }),
      experience: JSON.stringify([
        {
          company: "SNCF Voyageurs",
          period: "2022 - Présent",
          description: "Gestion d'outils de crise, coordination multi-projets et amélioration des processus opérationnels.",
          details: ["Développement d'outils de gestion de crise", "Coordination de projets multiples", "Formation et support utilisateur"]
        },
        {
          company: "Bouygues Telecom",
          period: "2019 - 2022",
          description: "Support N2, expertise VoIP/IPTV et encadrement d'équipe technique.",
          details: ["Support technique niveau 2", "Spécialisation VoIP et IPTV", "Coaching et formation d'équipe"]
        },
        {
          company: "Digitalys Maroc",
          period: "2018 - 2019",
          description: "Diagnostic matériel et coordination avec les fournisseurs pour la maintenance IT.",
          details: ["Diagnostic matériel avancé", "Coordination fournisseurs", "Maintenance préventive"]
        }
      ]),
      certifications: JSON.stringify([
        { name: "CompTIA SecurityX", description: "CASP+ (Advanced Security Practitioner)", icon: "shield-alt" },
        { name: "Microsoft Hyper-V", description: "Virtualisation et infrastructure", icon: "microsoft" },
        { name: "Microsoft SC-900", description: "Security, Compliance, and Identity", icon: "cloud-shield-alt" },
        { name: "Microsoft SC-300", description: "Identity and Access Administrator", icon: "id-card" },
        { name: "Microsoft SC-100", description: "Cybersecurity Architect", icon: "user-shield" },
        { name: "Cisco CCNA", description: "Modules 1-4 & IT Essentials", icon: "network-wired" }
      ]),
      updatedAt: new Date(),
    };
  }

  async getPortfolioSettings(): Promise<PortfolioSettings | undefined> {
    return this.portfolioSettings;
  }

  async updatePortfolioSettings(settings: InsertPortfolioSettings): Promise<PortfolioSettings> {
    this.portfolioSettings = {
      id: 1,
      profilePicture: settings.profilePicture ?? null,
      cvPdfPath: settings.cvPdfPath ?? null,
      skills: settings.skills ?? null,
      experience: settings.experience ?? null,
      certifications: settings.certifications ?? null,
      updatedAt: new Date(),
    };
    return this.portfolioSettings;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const contactMessage: ContactMessage = {
      ...message,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();

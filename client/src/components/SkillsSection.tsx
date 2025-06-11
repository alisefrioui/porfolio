import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { Card } from "@/components/ui/card";

export default function SkillsSection() {
  const { data: settings } = useQuery({
    queryKey: ["/api/portfolio/settings"],
    queryFn: () => portfolioApi.getSettings(),
  });

  const defaultSkills = {
    systems: "Linux (Samba AD), Windows Server (AD, Entra ID)",
    networking: "IPTABLES, Cisco ASA, Routing & Switching, IPFire",
    programming: "Python, C++, Rust, VBA, PowerApps",
    cybersecurity: "Maltego, FTK Imager, Wazuh, EBIOS, SMSI",
    cloud: "VMware, Hyper-V, Proxmox, VirtualBox",
    simulation: "GNS3, Packet Tracer, Wireshark"
  };

  const skills = settings?.skills ? JSON.parse(settings.skills) : defaultSkills;

  const skillCategories = [
    {
      title: "Systèmes",
      icon: "fas fa-server",
      items: skills.systems?.split(", ") || [],
      iconClass: "fab fa-linux"
    },
    {
      title: "Réseaux",
      icon: "fas fa-network-wired", 
      items: skills.networking?.split(", ") || [],
      iconClass: "fas fa-shield-alt"
    },
    {
      title: "Cloud/Virtualisation",
      icon: "fas fa-cloud",
      items: skills.cloud?.split(", ") || [],
      iconClass: "fas fa-cube"
    },
    {
      title: "Programmation",
      icon: "fas fa-code",
      items: skills.programming?.split(", ") || [],
      iconClass: "fab fa-python"
    },
    {
      title: "Cybersécurité",
      icon: "fas fa-shield-alt",
      items: skills.cybersecurity?.split(", ") || [],
      iconClass: "fas fa-search"
    },
    {
      title: "Outils de simulation",
      icon: "fas fa-flask",
      items: skills.simulation?.split(", ") || [],
      iconClass: "fas fa-project-diagram"
    }
  ];

  return (
    <section id="skills" className="py-16 px-6 bg-light-gray">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-green mb-4">
            <i className="fas fa-brain mr-3"></i>
            Compétences
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <i className={`${category.icon} text-dark-green text-2xl mr-3`}></i>
                <h3 className="text-xl font-semibold text-dark-green">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center">
                    <i className={`${category.iconClass} text-gold mr-2 text-sm`}></i>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

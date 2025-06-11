import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";

export default function CertificationsSection() {
  const { data: settings } = useQuery({
    queryKey: ["/api/portfolio/settings"],
    queryFn: () => portfolioApi.getSettings(),
  });

  const defaultCertifications = [
    { name: "CompTIA SecurityX", description: "CASP+ (Advanced Security Practitioner)", icon: "shield-alt" },
    { name: "Microsoft Hyper-V", description: "Virtualisation et infrastructure", icon: "microsoft" },
    { name: "Microsoft SC-900", description: "Security, Compliance, and Identity", icon: "cloud-shield-alt" },
    { name: "Microsoft SC-300", description: "Identity and Access Administrator", icon: "id-card" },
    { name: "Microsoft SC-100", description: "Cybersecurity Architect", icon: "user-shield" },
    { name: "Cisco CCNA", description: "Modules 1-4 & IT Essentials", icon: "network-wired" }
  ];

  const certifications = settings?.certifications ? JSON.parse(settings.certifications) : defaultCertifications;

  return (
    <section id="certifications" className="py-16 px-6 bg-light-gray">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-green mb-4">
            <i className="fas fa-certificate mr-3"></i>
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-dark-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas fa-${cert.icon} text-white text-2xl`}></i>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-dark-green mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

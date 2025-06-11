import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ExperienceSection() {
  const { data: settings } = useQuery({
    queryKey: ["/api/portfolio/settings"],
    queryFn: () => portfolioApi.getSettings(),
  });

  const defaultExperience = [
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
  ];

  const experience = settings?.experience ? JSON.parse(settings.experience) : defaultExperience;

  return (
    <section id="experience" className="py-16 px-6 bg-light-gray">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-green mb-4">
            <i className="fas fa-briefcase mr-3"></i>
            Expérience professionnelle
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-dark-green"></div>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-20">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gold rounded-full border-4 border-white shadow-lg"></div>
                
                {/* Experience card */}
                <Card className="bg-white rounded-lg shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-dark-green">{exp.company}</h3>
                      <Badge className="bg-dark-green text-white">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{exp.description}</p>
                    
                    {/* Experience details */}
                    {exp.details && (
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {exp.details.map((detail, detailIndex) => (
                          <li key={detailIndex}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

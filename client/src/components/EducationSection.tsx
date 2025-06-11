import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EducationSection() {
  const education = [
    {
      school: "ESGI Paris",
      degree: "Master en Systèmes & Cybersécurité",
      period: "2023 - 2025",
      description: "Formation approfondie en sécurité des systèmes d'information et gestion des risques cyber."
    },
    {
      school: "EPITA",
      degree: "Cycle Expert Développement Web",
      period: "2022 - 2023",
      description: "Spécialisation en développement web moderne et architectures applicatives."
    },
    {
      school: "ENSA Fès",
      degree: "Ingénierie Systèmes & Réseaux",
      period: "2020 - 2022",
      description: "Formation fondamentale en ingénierie des systèmes et administration réseau."
    }
  ];

  return (
    <section id="education" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-green mb-4">
            <i className="fas fa-graduation-cap mr-3"></i>
            Formation
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        {/* Education Cards */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-wrap justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-dark-green">{edu.school}</h3>
                    <p className="text-gray-600 font-medium">{edu.degree}</p>
                  </div>
                  <Badge className="bg-dark-green text-white">
                    {edu.period}
                  </Badge>
                </div>
                <p className="text-gray-600">{edu.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

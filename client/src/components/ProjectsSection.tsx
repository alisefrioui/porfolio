import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectsSection() {
  const projects = [
    {
      title: "AWS Security",
      icon: "fas fa-lock",
      description: "Durcissement IAM, VPC Flow Logs, implémentation IMDSv2 et segmentation réseau pour améliorer la posture de sécurité AWS.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      tags: ["AWS", "IAM", "VPC"],
      color: "text-blue-600"
    },
    {
      title: "CirculInfo",
      icon: "fas fa-chart-bar",
      description: "Application PowerApps pour la mise à jour des informations de circulation ferroviaire et la traçabilité des opérations.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      tags: ["PowerApps", "Workflow", "SNCF"],
      color: "text-green-600"
    },
    {
      title: "MyROBOT",
      icon: "fas fa-robot",
      description: "Analyse automatisée d'incidents, génération de graphiques, tutoriels vidéo et formation utilisateur pour optimiser les processus.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      tags: ["Automation", "Analytics", "Training"],
      color: "text-purple-600"
    }
  ];

  return (
    <section id="projects" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-green mb-4">
            <i className="fas fa-project-diagram mr-3"></i>
            Projets
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Project Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={`${project.title} visualization`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Project Content */}
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-dark-green mb-3 flex items-center">
                  <i className={`${project.icon} mr-2 ${project.color}`}></i>
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} className="bg-gold text-dark-green hover:bg-yellow-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

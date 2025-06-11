import { Card } from "@/components/ui/card";

export default function AboutSection() {
  const strengths = [
    { icon: "fas fa-tasks", title: "Gestion de projet", color: "text-dark-green" },
    { icon: "fas fa-headset", title: "Support technique", color: "text-dark-green" },
    { icon: "fas fa-robot", title: "Automatisation", color: "text-dark-green" },
    { icon: "fas fa-users", title: "Travail d'équipe", color: "text-dark-green" },
  ];

  return (
    <section id="about" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-green mb-4">
            <i className="fas fa-user mr-3"></i>
            À propos
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        {/* Content */}
        <Card className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Cybersecurity illustration */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Cybersecurity network visualization" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            
            {/* Text content */}
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Passionné par la cybersécurité et l'infrastructure IT, je mets mon expertise technique au service de projets innovants. Ma double compétence en gestion de projet et en sécurité des systèmes me permet d'accompagner les organisations dans leur transformation numérique sécurisée.
              </p>
              
              {/* Strengths Grid */}
              <div className="grid grid-cols-2 gap-4">
                {strengths.map((strength, index) => (
                  <div key={index} className="bg-light-gray p-4 rounded-lg">
                    <i className={`${strength.icon} ${strength.color} text-xl mb-2`}></i>
                    <h4 className="font-semibold text-dark-green">{strength.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

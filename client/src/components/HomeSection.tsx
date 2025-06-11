import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomeSection() {
  const { data: settings } = useQuery({
    queryKey: ["/api/portfolio/settings"],
    queryFn: () => portfolioApi.getSettings(),
  });

  const profilePicture = settings?.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300";

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Picture */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gold overflow-hidden shadow-xl">
            <img 
              src={profilePicture} 
              alt="Ali Sefrioui Professional Photo" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Name and Title */}
        <h1 className="text-5xl font-bold text-dark-green mb-4">Ali Sefrioui</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">IT Project Manager – Networks & Cybersecurity</h2>
        
        {/* Quote */}
        <Card className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-2xl mx-auto">
          <p className="text-lg text-gray-600 italic mb-4">
            "Spécialisé en réseaux et cybersécurité, je suis à la recherche d'un CDI à partir du 1er octobre pour relever de nouveaux défis."
          </p>
        </Card>
        
        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
          <Card className="bg-white p-4 rounded-lg shadow">
            <i className="fas fa-envelope text-dark-green text-xl mb-2"></i>
            <p className="font-medium">alisefrioui@outlook.com</p>
          </Card>
          <Card className="bg-white p-4 rounded-lg shadow">
            <i className="fas fa-phone text-dark-green text-xl mb-2"></i>
            <p className="font-medium">+33 6 98 15 40 15</p>
          </Card>
          <Card className="bg-white p-4 rounded-lg shadow">
            <i className="fas fa-map-marker-alt text-dark-green text-xl mb-2"></i>
            <p className="font-medium">Île-de-France | Permis B</p>
          </Card>
          <Card className="bg-white p-4 rounded-lg shadow">
            <i className="fas fa-laptop text-dark-green text-xl mb-2"></i>
            <p className="font-medium">Télétravail ou présentiel</p>
          </Card>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-dark-green text-white hover:bg-green-700">
            <a href="https://linkedin.com/in/ali-sefrioui" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin mr-2"></i>
              LinkedIn
            </a>
          </Button>
          <Button asChild className="bg-gold text-dark-green hover:bg-yellow-400">
            <a href="mailto:alisefrioui@outlook.com">
              <i className="fas fa-envelope mr-2"></i>
              Email
            </a>
          </Button>
          <Button asChild variant="outline" className="border-dark-green text-dark-green hover:bg-dark-green hover:text-white">
            <a href={settings?.cvPdfPath || "/CV_Ali_SEFRIOUI.pdf"} download>
              <i className="fas fa-download mr-2"></i>
              Télécharger CV
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

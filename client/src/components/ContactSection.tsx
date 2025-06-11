import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { portfolioApi, type ContactFormData } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: portfolioApi.submitContactForm,
    onSuccess: () => {
      toast({
        title: "Message envoyé!",
        description: "Je vous répondrai dans les plus brefs délais.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const softSkills = [
    "Esprit d'équipe", "Adaptabilité", "Esprit critique", "Initiative", "Précision"
  ];

  return (
    <section id="contact" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-green mb-4">
            <i className="fas fa-envelope mr-3"></i>
            Contact
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-dark-green mb-6">Informations de contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-dark-green text-xl mr-4"></i>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:alisefrioui@outlook.com" className="text-gold hover:underline">
                      alisefrioui@outlook.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <i className="fas fa-phone text-dark-green text-xl mr-4"></i>
                  <div>
                    <p className="font-semibold">Téléphone</p>
                    <p className="text-gray-600">+33 6 98 15 40 15</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-dark-green text-xl mr-4"></i>
                  <div>
                    <p className="font-semibold">Localisation</p>
                    <p className="text-gray-600">Île-de-France, France</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <i className="fab fa-linkedin text-dark-green text-xl mr-4"></i>
                  <div>
                    <p className="font-semibold">LinkedIn</p>
                    <a href="https://linkedin.com/in/ali-sefrioui" className="text-gold hover:underline">
                      ali-sefrioui
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Professional Goal */}
              <div className="mt-8 p-4 bg-light-gray rounded-lg">
                <h4 className="font-semibold text-dark-green mb-2">Objectif professionnel</h4>
                <p className="text-gray-600 text-sm">
                  À la recherche d'un poste en CDI à partir d'octobre 2025 dans les domaines des systèmes, réseaux ou cybersécurité.
                </p>
              </div>
              
              {/* Soft Skills */}
              <div className="mt-6 p-4 bg-light-gray rounded-lg">
                <h4 className="font-semibold text-dark-green mb-2">Compétences transversales</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {softSkills.map((skill, index) => (
                    <Badge key={index} className="bg-gold text-dark-green">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Form */}
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-dark-green mb-6">Envoyez-moi un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nom complet
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1 focus:ring-dark-green focus:border-dark-green"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1 focus:ring-dark-green focus:border-dark-green"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Sujet
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="mt-1 focus:ring-dark-green focus:border-dark-green"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="mt-1 focus:ring-dark-green focus:border-dark-green"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full bg-dark-green text-white hover:bg-green-700"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  {contactMutation.isPending ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

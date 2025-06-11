import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SettingsSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ["/api/portfolio/settings"],
    queryFn: () => portfolioApi.getSettings(),
    enabled: isAuthenticated,
  });

  const verifyPasswordMutation = useMutation({
    mutationFn: portfolioApi.verifyPassword,
    onSuccess: () => {
      setIsAuthenticated(true);
      setPassword("");
      setShowError(false);
    },
    onError: () => {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: portfolioApi.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/settings"] });
      toast({
        title: "Paramètres sauvegardés!",
        description: "Les modifications ont été enregistrées avec succès.",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    },
  });

  const uploadProfilePictureMutation = useMutation({
    mutationFn: portfolioApi.uploadProfilePicture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/settings"] });
      toast({
        title: "Photo mise à jour!",
        description: "Votre photo de profil a été mise à jour.",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement.",
        variant: "destructive",
      });
    },
  });

  const uploadCVMutation = useMutation({
    mutationFn: portfolioApi.uploadCV,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/settings"] });
      toast({
        title: "CV mis à jour!",
        description: "Votre CV a été téléchargé avec succès.",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement du CV.",
        variant: "destructive",
      });
    },
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPasswordMutation.mutate(password);
  };

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadProfilePictureMutation.mutate(file);
    }
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadCVMutation.mutate(file);
    }
  };

  const handleSkillsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const skillsData = {
      systems: formData.get("systems") as string,
      networking: formData.get("networking") as string,
      programming: formData.get("programming") as string,
      cybersecurity: formData.get("cybersecurity") as string,
      cloud: formData.get("cloud") as string,
      simulation: formData.get("simulation") as string,
    };
    
    updateSettingsMutation.mutate({
      skills: JSON.stringify(skillsData),
    });
  };

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const experienceData = [
      {
        company: formData.get("current-company") as string,
        period: formData.get("current-period") as string,
        description: formData.get("current-description") as string,
        details: (formData.get("current-details") as string).split("\n").filter(d => d.trim()),
      }
    ];
    
    updateSettingsMutation.mutate({
      experience: JSON.stringify(experienceData),
    });
  };

  const currentSkills = settings?.skills ? JSON.parse(settings.skills) : {};
  const currentExperience = settings?.experience ? JSON.parse(settings.experience) : [];
  const profilePicture = settings?.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200";

  if (!isAuthenticated) {
    return (
      <section id="settings" className="py-16 px-6 bg-light-gray">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-green mb-4">
              <i className="fas fa-cog mr-3"></i>
              Paramètres
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          
          {/* Password Protection */}
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-8 text-center">
              <i className="fas fa-lock text-dark-green text-4xl mb-4"></i>
              <h3 className="text-2xl font-semibold text-dark-green mb-4">Accès protégé</h3>
              <p className="text-gray-600 mb-6">Cette section est protégée par mot de passe.</p>
              
              <form onSubmit={handlePasswordSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-center focus:ring-dark-green focus:border-dark-green"
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={verifyPasswordMutation.isPending}
                  className="bg-dark-green text-white hover:bg-green-700"
                >
                  <i className="fas fa-unlock mr-2"></i>
                  {verifyPasswordMutation.isPending ? "Vérification..." : "Débloquer"}
                </Button>
              </form>
              
              {showError && (
                <div className="mt-4 text-red-500">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Mot de passe incorrect
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="settings" className="py-16 px-6 bg-light-gray">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-green mb-4">
            <i className="fas fa-cog mr-3"></i>
            Paramètres
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="space-y-8">
          {/* Profile Picture Upload */}
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-dark-green mb-6">Photo de profil</h3>
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full bg-gold overflow-hidden shadow-lg">
                  <img 
                    src={profilePicture} 
                    alt="Photo actuelle" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    id="profile-pic-upload"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => document.getElementById('profile-pic-upload')?.click()}
                    disabled={uploadProfilePictureMutation.isPending}
                    className="bg-dark-green text-white hover:bg-green-700"
                  >
                    <i className="fas fa-camera mr-2"></i>
                    {uploadProfilePictureMutation.isPending ? "Téléchargement..." : "Changer la photo"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CV PDF Upload */}
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-dark-green mb-6">CV PDF</h3>
              <div className="space-y-4">
                {settings?.cvPdfPath && (
                  <div className="flex items-center space-x-4 p-4 bg-light-gray rounded-lg">
                    <i className="fas fa-file-pdf text-dark-green text-2xl"></i>
                    <div className="flex-1">
                      <p className="font-medium text-dark-green">CV actuellement téléchargé</p>
                      <p className="text-sm text-gray-600">Fichier disponible pour téléchargement</p>
                    </div>
                    <Button asChild variant="outline" className="border-dark-green text-dark-green">
                      <a href={settings.cvPdfPath} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-eye mr-2"></i>
                        Voir
                      </a>
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="cv-upload"
                    accept=".pdf"
                    onChange={handleCVUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => document.getElementById('cv-upload')?.click()}
                    disabled={uploadCVMutation.isPending}
                    className="bg-dark-green text-white hover:bg-green-700"
                  >
                    <i className="fas fa-upload mr-2"></i>
                    {uploadCVMutation.isPending ? "Téléchargement..." : "Télécharger un nouveau CV"}
                  </Button>
                  <p className="text-sm text-gray-600">Fichiers PDF uniquement (max. 10MB)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Edit Skills */}
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-dark-green mb-6">Modifier les compétences</h3>
              <form onSubmit={handleSkillsSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Systèmes</Label>
                    <Textarea
                      name="systems"
                      rows={3}
                      defaultValue={currentSkills.systems || ""}
                      placeholder="Linux, Windows Server, etc."
                      className="focus:ring-dark-green focus:border-dark-green"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Réseaux</Label>
                    <Textarea
                      name="networking"
                      rows={3}
                      defaultValue={currentSkills.networking || ""}
                      placeholder="Cisco, IPTABLES, etc."
                      className="focus:ring-dark-green focus:border-dark-green"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Programmation</Label>
                    <Textarea
                      name="programming"
                      rows={3}
                      defaultValue={currentSkills.programming || ""}
                      placeholder="Python, C++, etc."
                      className="focus:ring-dark-green focus:border-dark-green"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Cybersécurité</Label>
                    <Textarea
                      name="cybersecurity"
                      rows={3}
                      defaultValue={currentSkills.cybersecurity || ""}
                      placeholder="Maltego, Wazuh, etc."
                      className="focus:ring-dark-green focus:border-dark-green"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Cloud/Virtualisation</Label>
                    <Textarea
                      name="cloud"
                      rows={3}
                      defaultValue={currentSkills.cloud || ""}
                      placeholder="VMware, Hyper-V, etc."
                      className="focus:ring-dark-green focus:border-dark-green"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Outils de simulation</Label>
                    <Textarea
                      name="simulation"
                      rows={3}
                      defaultValue={currentSkills.simulation || ""}
                      placeholder="GNS3, Packet Tracer, etc."
                      className="focus:ring-dark-green focus:border-dark-green"
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  disabled={updateSettingsMutation.isPending}
                  className="mt-6 bg-dark-green text-white hover:bg-green-700"
                >
                  <i className="fas fa-save mr-2"></i>
                  {updateSettingsMutation.isPending ? "Sauvegarde..." : "Sauvegarder les compétences"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Edit Experience */}
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-dark-green mb-6">Modifier l'expérience</h3>
              <form onSubmit={handleExperienceSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Entreprise actuelle</Label>
                    <Input
                      name="current-company"
                      defaultValue={currentExperience[0]?.company || ""}
                      className="focus:ring-dark-green focus:border-dark-green"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Période</Label>
                    <Input
                      name="current-period"
                      defaultValue={currentExperience[0]?.period || ""}
                      className="focus:ring-dark-green focus:border-dark-green"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Description</Label>
                    <Textarea
                      name="current-description"
                      rows={3}
                      defaultValue={currentExperience[0]?.description || ""}
                      className="focus:ring-dark-green focus:border-dark-green"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Détails (un par ligne)</Label>
                    <Textarea
                      name="current-details"
                      rows={4}
                      defaultValue={currentExperience[0]?.details?.join("\n") || ""}
                      placeholder="Développement d'outils&#10;Formation utilisateur&#10;Support technique"
                      className="focus:ring-dark-green focus:border-dark-green"
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  disabled={updateSettingsMutation.isPending}
                  className="mt-6 bg-dark-green text-white hover:bg-green-700"
                >
                  <i className="fas fa-save mr-2"></i>
                  {updateSettingsMutation.isPending ? "Sauvegarde..." : "Sauvegarder l'expérience"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

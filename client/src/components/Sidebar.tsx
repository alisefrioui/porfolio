import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Sidebar({ isOpen, onClose, activeSection, onNavigate }: SidebarProps) {
  const { data: settings } = useQuery({
    queryKey: ["/api/portfolio/settings"],
    queryFn: () => portfolioApi.getSettings(),
  });

  const profilePicture = settings?.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200";

  const navigationItems = [
    { id: "home", label: "Accueil", icon: "fas fa-home" },
    { id: "about", label: "À propos", icon: "fas fa-user" },
    { id: "skills", label: "Compétences", icon: "fas fa-brain" },
    { id: "projects", label: "Projets", icon: "fas fa-project-diagram" },
    { id: "experience", label: "Expérience", icon: "fas fa-briefcase" },
    { id: "education", label: "Formation", icon: "fas fa-graduation-cap" },
    { id: "certifications", label: "Certifications", icon: "fas fa-certificate" },
    { id: "contact", label: "Contact", icon: "fas fa-envelope" },
    { id: "settings", label: "Paramètres", icon: "fas fa-cog" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <nav 
        className={`fixed left-0 top-0 h-full w-64 bg-dark-green text-white transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          {/* Profile section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold overflow-hidden shadow-lg">
              <img 
                src={profilePicture} 
                alt="Ali Sefrioui" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold">Ali Sefrioui</h2>
            <p className="text-sm text-green-200">IT Project Manager</p>
          </div>

          {/* Navigation */}
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors text-left ${
                    activeSection === item.id 
                      ? "bg-green-600" 
                      : "hover:bg-green-600"
                  }`}
                >
                  <i className={`${item.icon} mr-3`}></i>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

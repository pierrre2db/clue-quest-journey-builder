
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Map } from "lucide-react";
import { getAppMode } from "@/utils/localStorage";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si un mode a déjà été sélectionné
    const appMode = getAppMode();
    
    if (appMode) {
      // Si un mode est déjà sélectionné, redirection vers la page d'accueil réelle
      navigate("/home", { replace: true });
    } else {
      // Sinon, redirection vers la page de sélection de mode
      navigate("/mode-selection", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-center text-lg">Chargement...</p>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={() => navigate("/navigation")}
          className="p-2 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors"
          aria-label="Navigation"
        >
          <Map size={24} />
        </button>
        <button
          onClick={() => navigate("/setup")}
          className="p-2 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors"
          aria-label="Paramètres"
        >
          <Settings size={24} />
        </button>
      </div>
    </div>
  );
};

export default Index;

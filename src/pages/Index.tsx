
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection vers la page d'accueil réelle
    navigate("/");
  }, [navigate]);

  return null;
};

export default Index;

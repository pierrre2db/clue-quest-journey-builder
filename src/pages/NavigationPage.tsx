
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import QuestLogo from '@/components/QuestLogo';

const NavigationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <QuestLogo />
      </div>
      
      <h1 className="text-2xl font-bold mb-6 text-center">Navigation</h1>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Pages d'administration</CardTitle>
            <CardDescription>Pages destinées aux organisateurs du jeu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate('/setup')}
            >
              Configuration
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate('/admin/questions')}
            >
              Gestion des questions
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate('/mode-selection')}
            >
              Sélection du mode
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate('/results')}
            >
              Résultats et statistiques
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pages du parcours</CardTitle>
            <CardDescription>Pages destinées aux participants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate('/')}
            >
              Accueil
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate('/register')}
            >
              Inscription
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate('/scan')}
            >
              Scan QR Code
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => navigate('/finish')}
            >
              Fin du parcours
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-8" />
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-medium mb-4">Accès rapide</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Voici une liste complète de toutes les routes disponibles dans l'application :
        </p>
        
        <div className="grid sm:grid-cols-2 gap-2">
          <Link to="/" className="text-primary hover:underline">/</Link>
          <span className="text-muted-foreground">Page d'accueil</span>
          
          <Link to="/index" className="text-primary hover:underline">/index</Link>
          <span className="text-muted-foreground">Redirection initiale</span>
          
          <Link to="/register" className="text-primary hover:underline">/register</Link>
          <span className="text-muted-foreground">Inscription</span>
          
          <Link to="/scan" className="text-primary hover:underline">/scan</Link>
          <span className="text-muted-foreground">Scan QR Code</span>
          
          <Link to="/question/1" className="text-primary hover:underline">/question/1</Link>
          <span className="text-muted-foreground">Exemple de question (id=1)</span>
          
          <Link to="/finish" className="text-primary hover:underline">/finish</Link>
          <span className="text-muted-foreground">Fin du parcours</span>
          
          <Link to="/setup" className="text-primary hover:underline">/setup</Link>
          <span className="text-muted-foreground">Configuration</span>
          
          <Link to="/mode-selection" className="text-primary hover:underline">/mode-selection</Link>
          <span className="text-muted-foreground">Sélection du mode</span>
          
          <Link to="/results" className="text-primary hover:underline">/results</Link>
          <span className="text-muted-foreground">Résultats et statistiques</span>
          
          <Link to="/admin/questions" className="text-primary hover:underline">/admin/questions</Link>
          <span className="text-muted-foreground">Gestion des questions</span>
          
          <Link to="/navigation" className="text-primary hover:underline">/navigation</Link>
          <span className="text-muted-foreground">Cette page</span>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          variant="default" 
          size="sm"
          onClick={() => navigate(-1)}
        >
          Retour
        </Button>
      </div>
    </div>
  );
};

export default NavigationPage;


import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  correctPassword: string;
}

const PasswordDialog: React.FC<PasswordDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
  correctPassword
}) => {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      toast({
        title: "Accès autorisé",
        description: "Bienvenue dans le menu d'administration",
      });
      onSuccess();
      setPassword('');
      setAttempts(0);
    } else {
      setAttempts(attempts + 1);
      toast({
        title: "Mot de passe incorrect",
        description: `Tentative ${attempts + 1}/3`,
        variant: "destructive",
      });
      
      if (attempts >= 2) {
        setTimeout(() => {
          onOpenChange(false);
          setAttempts(0);
          setPassword('');
        }, 1500);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accès administrateur</DialogTitle>
          <DialogDescription>
            Entrez le mot de passe pour accéder au menu de configuration.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <Input
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Valider</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;

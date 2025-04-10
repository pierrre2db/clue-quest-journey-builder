
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import QuestLogo from '@/components/QuestLogo';
import { saveUser, generateUserId } from '@/utils/localStorage';

// Schéma de validation Zod
const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  consent: z.boolean().refine(val => val === true, { message: "Vous devez accepter les conditions" }),
});

type FormValues = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      consent: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Générer un ID unique pour l'utilisateur
    const userId = generateUserId(data.firstName, data.lastName);
    
    // Pour le MVP, on stocke les données dans le localStorage
    saveUser({
      id: userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    });
    
    // Simuler un délai pour l'enregistrement
    setTimeout(() => {
      toast({
        title: "Inscription réussie !",
        description: `Votre identifiant unique : ${userId}`,
      });
      
      setIsSubmitting(false);
      navigate('/scan');
    }, 1500);
  };

  return (
    <div className="quest-container">
      <QuestLogo />
      
      <div className="quest-card">
        <h2 className="quest-title">Inscription au Parcours</h2>
        <p className="quest-text mb-6">
          Pour commencer, merci de renseigner vos coordonnées. Un identifiant unique
          sera généré pour suivre votre parcours.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="quest-label">Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre prénom" className="quest-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="quest-label">Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" className="quest-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="quest-label">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre@email.com" className="quest-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="quest-label">Téléphone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="06XXXXXXXX" className="quest-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      J'accepte de recevoir des informations sur les formations et événements de l'école
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="quest-button mt-6" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Inscription en cours...' : 'Valider mon inscription'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;

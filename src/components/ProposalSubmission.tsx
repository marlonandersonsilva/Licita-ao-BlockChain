
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Layers, AlertCircle } from "lucide-react";

const formSchema = z.object({
  editalId: z.string().transform(val => Number(val)),
  value: z.string().transform(val => Number(val)),
  description: z.string().min(20, { message: "Descrição precisa ter pelo menos 20 caracteres." }),
});

type FormValues = z.infer<typeof formSchema>;

const ProposalSubmission = () => {
  const { account, isConnected, isRegisteredBidder, submitProposal } = useWeb3();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      editalId: "",
      value: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!account) return;
    
    setIsSubmitting(true);
    try {
      await submitProposal(data.editalId, data.value, data.description);
      form.reset();
    } catch (error) {
      console.error("Error submitting proposal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="blockchain-card">
      <CardHeader>
        <CardTitle className="text-lg">Nova Proposta</CardTitle>
        <CardDescription>
          Submeta uma proposta para um edital aberto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Carteira não conectada</AlertTitle>
            <AlertDescription>
              Conecte sua carteira para enviar uma proposta.
            </AlertDescription>
          </Alert>
        ) : !isRegisteredBidder ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Licitante não registrado</AlertTitle>
            <AlertDescription>
              Você precisa se registrar como licitante antes de enviar propostas.
            </AlertDescription>
          </Alert>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="editalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID do Edital</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        placeholder="Número do edital" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor da Proposta (ETH)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        step="0.01"
                        placeholder="Valor em ETH" 
                      />
                    </FormControl>
                    <FormDescription>
                      Valor da proposta em Ether.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição da Proposta</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Descreva sua proposta em detalhes" 
                        rows={5}
                      />
                    </FormControl>
                    <FormDescription>
                      Explique como sua proposta atende aos requisitos do edital.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="px-0 pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Proposta"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ProposalSubmission;

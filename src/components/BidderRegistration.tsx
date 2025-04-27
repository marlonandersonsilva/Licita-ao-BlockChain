
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { User, FileText, CheckCircle2, AlertCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome precisa ter pelo menos 3 caracteres." }),
  document: z.string().min(11, { message: "Documento inválido." }),
});

type FormValues = z.infer<typeof formSchema>;

const BidderRegistration = () => {
  const { account, isRegisteredBidder, registerBidder } = useWeb3();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      document: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!account) return;
    
    setIsSubmitting(true);
    try {
      await registerBidder(data.name, data.document);
      form.reset();
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegisteredBidder) {
    return (
      <Card className="blockchain-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blockchain-success" />
            Licitante Registrado
          </CardTitle>
          <CardDescription>
            Você já está registrado como licitante na plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Acesso Concedido</AlertTitle>
            <AlertDescription>
              Você pode agora participar de licitações e enviar propostas.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="blockchain-card">
      <CardHeader>
        <CardTitle className="text-lg">Registro de Licitante</CardTitle>
        <CardDescription>
          Registre-se como licitante para participar de processos licitatórios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!account ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Carteira não conectada</AlertTitle>
            <AlertDescription>
              Conecte sua carteira para se registrar como licitante.
            </AlertDescription>
          </Alert>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa/Entidade</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                          <User className="h-4 w-4" />
                        </span>
                        <Input 
                          {...field} 
                          className="rounded-l-none" 
                          placeholder="Nome da empresa ou entidade" 
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Nome que será registrado na blockchain.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ/CPF</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                          <FileText className="h-4 w-4" />
                        </span>
                        <Input 
                          {...field} 
                          className="rounded-l-none" 
                          placeholder="CNPJ ou CPF sem pontuação" 
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Documento fiscal da empresa ou pessoa.
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
                  {isSubmitting ? "Registrando..." : "Registrar como Licitante"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default BidderRegistration;

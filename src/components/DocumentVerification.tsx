
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
import { FileKey, CheckCircle2, XCircle } from "lucide-react";

const formSchema = z.object({
  documentHash: z.string().min(10, { message: "Hash do documento inválido." }),
});

type FormValues = z.infer<typeof formSchema>;

const DocumentVerification = () => {
  const { verifyDocument } = useWeb3();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentHash: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsVerifying(true);
    try {
      const result = await verifyDocument(data.documentHash);
      setVerificationResult(result);
    } catch (error) {
      console.error("Error verifying document:", error);
      setVerificationResult(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="blockchain-card">
      <CardHeader>
        <CardTitle className="text-lg">Verificação de Documentos</CardTitle>
        <CardDescription>
          Verifique a autenticidade de documentos registrados na blockchain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="documentHash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hash do Documento</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                        <FileKey className="h-4 w-4" />
                      </span>
                      <Input 
                        {...field} 
                        className="rounded-l-none" 
                        placeholder="Cole o hash do documento para verificação" 
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    O hash SHA-256 do documento ou o código de verificação.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {verificationResult !== null && (
              <Alert className={verificationResult ? "border-blockchain-success" : "border-destructive"}>
                {verificationResult ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-blockchain-success" />
                    <AlertTitle>Documento Autêntico</AlertTitle>
                    <AlertDescription>
                      Este documento foi verificado na blockchain e é autêntico.
                    </AlertDescription>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-destructive" />
                    <AlertTitle>Documento Não Verificado</AlertTitle>
                    <AlertDescription>
                      Não foi possível verificar a autenticidade deste documento.
                    </AlertDescription>
                  </>
                )}
              </Alert>
            )}

            <CardFooter className="px-0 pt-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isVerifying}
              >
                {isVerifying ? "Verificando..." : "Verificar Documento"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DocumentVerification;

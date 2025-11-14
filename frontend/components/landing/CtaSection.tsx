import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const CtaSection = () => {
  const features = [
    "Análise completa em minutos",
    "Sem necessidade de cartão de crédito",
    "Suporte dedicado em português",
    "Dados 100% seguros e criptografados"
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Pronto para entender as finanças
            <span className="block text-white/90 mt-2">do seu negócio?</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Comece sua análise financeira gratuita agora e descubra oportunidades de crescimento que você nem sabia que existiam.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 text-white/90 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0" />
                <span className="text-left">{feature}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link href="/analise">
              <button className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-10 py-6 text-lg shadow-strong transition-all duration-300 hover:scale-105 rounded-md inline-flex items-center">
                Começar análise agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
          <p className="text-sm text-white/80">
            Mais de 500 empresas já transformaram suas finanças conosco — junte-se a elas.
          </p>
        </div>
      </div>
    </section>
  );
};
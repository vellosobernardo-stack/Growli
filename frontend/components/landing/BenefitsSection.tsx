import { BarChart3, Target, Zap, Shield } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: BarChart3,
      title: "Indicadores financeiros claros",
      description: "Veja de forma simples a margem de lucro, ponto de equilíbrio, retorno sobre investimento e outros KPIs essenciais."
    },
    {
      icon: Target,
      title: "Cenários de desempenho",
      description: "Simule diferentes situações e entenda o impacto de suas decisões antes de colocá-las em prática."
    },
    {
      icon: Zap,
      title: "Resultados em minutos",
      description: "Sem esperar dias por relatórios. Tenha insights financeiros completos em poucos minutos."
    },
    {
      icon: Shield,
      title: "100% seguro e confidencial",
      description: "Seus dados financeiros são protegidos com criptografia de ponta e nunca são compartilhados."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            Por que escolher a Leme?
          </h2>
          <p className="text-xl text-muted-foreground">
            Transforme dados complexos em decisões inteligentes
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Ícone laranja */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-2xl mb-6 shadow-medium group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-10 w-10 text-white" />
              </div>
              
              {/* Título com altura mínima para alinhamento */}
              <div className="min-h-[56px] flex items-center justify-center mb-3">
                <h3 className="text-xl font-semibold text-primary">
                  {benefit.title}
                </h3>
              </div>
              
              {/* Descrição */}
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
import { Upload, LineChart, Lightbulb } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      number: "1",
      title: "Envie suas informações",
      description: "Preencha os dados financeiros da sua empresa através de formulários simples e intuitivos."
    },
    {
      icon: LineChart,
      number: "2",
      title: "Receba análises automáticas",
      description: "Nossa plataforma processa seus dados e gera indicadores financeiros claros e fáceis de entender."
    },
    {
      icon: Lightbulb,
      number: "3",
      title: "Implemente estratégias práticas",
      description: "Receba recomendações personalizadas e cenários de desempenho para tomar decisões mais seguras."
    }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Como funciona a Leme?
          </h2>
          <p className="text-xl text-muted-foreground">
            Transformamos dados financeiros complexos em insights práticos em apenas 3 passos
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-border" style={{ width: 'calc(100% - 8rem)', left: '4rem' }}></div>
            
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 bg-primary rounded-2xl flex items-center justify-center shadow-medium relative z-10">
                      <step.icon className="h-14 w-14 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg shadow-soft z-20">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

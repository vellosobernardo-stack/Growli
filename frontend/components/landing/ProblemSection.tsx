import { AlertCircle, TrendingDown, FileQuestion } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: AlertCircle,
      title: "Dificuldade em entender os números",
      description: "Planilhas complexas e relatórios técnicos que não mostram o que realmente importa para o seu negócio."
    },
    {
      icon: TrendingDown,
      title: "Falta de previsibilidade",
      description: "Sem uma visão clara do futuro, as decisões estratégicas se tornam incertas e os investimentos perdem direção."
    },
    {
      icon: FileQuestion,
      title: "Consultorias caras e fora do alcance.",
      description: "Serviços financeiros tradicionais custam caro e nem sempre são adaptados à realidade de PMEs."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Você não está sozinho nessa
          </h2>
          <p className="text-xl text-muted-foreground">
            Milhares de empreendedores enfrentam os mesmos desafios financeiros todos os dias
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in border border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
  <problem.icon className="h-7 w-7 text-secondary" />
</div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
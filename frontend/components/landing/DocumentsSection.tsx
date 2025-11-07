import { FileText, TrendingUp, Clock, Building2 } from "lucide-react";

const DocumentsSection = () => {
  const documents = [
    {
      icon: FileText,
      title: "Balanço e DRE",
      badge: "Essencial",
      description: "Base para calcular margens, liquidez e retornos."
    },
    {
      icon: TrendingUp,
      title: "Relatórios Operacionais",
      badge: "Essencial",
      description: "Entenda prazos, fluxo e estrutura de capital de giro."
    },
    {
      icon: Clock,
      title: "Dados Complementares",
      badge: "Essencial",
      description: "Receita, custos e colaboradores para projeções mais precisas."
    },
    {
      icon: Building2,
      title: "Documentos Extras (opcional)",
      badge: "Opcional",
      description: "Fluxo de caixa, orçamento e endividamento elevam a qualidade da análise."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            Reúna seus relatórios e deixe a Leme fazer o diagnóstico por você
          </h2>
          <p className="text-xl text-muted-foreground">
            Com os documentos certos, você obtém insights mais precisos e acionáveis
          </p>
        </div>

        {/* Grid de documentos - 2x2 */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl border border-border shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Ícone */}
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <doc.icon className="h-7 w-7 text-secondary" />
                </div>

                {/* Conteúdo */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-primary">
                      {doc.title}
                    </h3>
                    <span 
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        doc.badge === "Essencial" 
                          ? "bg-primary/10 text-primary" 
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {doc.badge}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;

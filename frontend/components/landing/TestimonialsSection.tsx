import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ana Paula Silva",
      role: "Proprietária, Café Sabor & Arte",
      content: "Antes da Growli, eu não tinha ideia de como estava minha margem de lucro real. Agora tomo decisões com muito mais segurança.",
      rating: 5
    },
    {
      name: "Roberto Mendes",
      role: "CEO, Tech Solutions LTDA",
      content: "Finalmente encontrei uma ferramenta que fala a minha língua. Sem termos técnicos demais, direto ao ponto. Recomendo!",
      rating: 5
    },
    {
      name: "Juliana Costa",
      role: "Gestora Financeira, Boutique Elegance",
      content: "A Growli me ajudou a identificar gargalos no fluxo de caixa que eu nem sabia que existiam. O ROI foi imediato.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Empresas que confiam na Growli
          </h2>
          <p className="text-xl text-muted-foreground">
            Veja o que nossos clientes dizem sobre nós
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-lg shadow-medium hover:shadow-strong transition-all duration-300 animate-scale-in border border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-card-foreground mb-6 leading-relaxed italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-card px-8 py-6 rounded-lg shadow-soft border border-border">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Empresas atendidas</p>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary">4.9/5</p>
              <p className="text-sm text-muted-foreground">Avaliação média</p>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">98%</p>
              <p className="text-sm text-muted-foreground">Clientes satisfeitos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

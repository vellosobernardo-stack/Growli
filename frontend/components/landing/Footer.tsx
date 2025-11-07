import { Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-secondary-light">Leme</h3>
            <p className="text-background/80 mb-4 max-w-md">
              Análises financeiras simples e acessíveis para pequenas e médias empresas.
              Transformamos dados complexos em decisões inteligentes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-secondary-light transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-secondary-light transition-colors" aria-label="Email">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Produto</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-secondary-light transition-colors">Como funciona</a></li>
              <li><a href="#" className="hover:text-secondary-light transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-secondary-light transition-colors">Recursos</a></li>
              <li><a href="#" className="hover:text-secondary-light transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Empresa</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-secondary-light transition-colors">Sobre nós</a></li>
              <li><a href="#" className="hover:text-secondary-light transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-secondary-light transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-secondary-light transition-colors">Carreiras</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm">
            © 2025 Leme. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-background/70">
            <a href="#" className="hover:text-secondary-light transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-secondary-light transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
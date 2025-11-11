'use client';

import { ArrowRight, Anchor } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Efeitos oceânicos de fundo */}
      {/* Ondas animadas */}
      <div 
        className="absolute inset-0 opacity-30 ocean-wave"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(17, 45, 78, 0.15) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute inset-0 opacity-20 ocean-wave"
        style={{
          background: 'radial-gradient(circle at 80% 50%, rgba(17, 45, 78, 0.1) 0%, transparent 50%)',
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute inset-0 opacity-25 ocean-wave"
        style={{
          background: 'radial-gradient(circle at 40% 70%, rgba(17, 45, 78, 0.12) 0%, transparent 50%)',
          animationDelay: '4s',
        }}
      />
      
      {/* Efeito de luz caustics (shimmer) */}
      <div 
        className="absolute inset-0 opacity-20 caustics-shimmer"
        style={{
          background: 'repeating-linear-gradient(45deg, rgba(17, 45, 78, 0.05) 0px, transparent 2px, transparent 4px, rgba(17, 45, 78, 0.05) 6px)',
        }}
      />
      
      {/* Círculos blur animados */}
      <div 
        className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDuration: '5s' }}
      />
      <div 
        className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/25 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDuration: '7s' }}
      />
      <div 
        className="absolute top-40 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDuration: '6s' }}
      />
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          
          {/* Logo Leme com drop shadow */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4" style={{ filter: 'drop-shadow(0 4px 12px rgba(17, 45, 78, 0.25))' }}>
              <Image
                src="/logo.svg"
                alt="Leme"
                width={96}
                height={96}
                className="h-24 sm:h-28 w-auto"
              />
            </div>
            
            {/* Linha decorativa horizontal */}
            <div 
              className="w-24 h-px rounded-full"
              style={{
                background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)',
              }}
            />
          </div>
          
          {/* Título principal - 2 linhas */}
          <h1 className="font-bold leading-tight mb-6">
  <span className="block text-4xl sm:text-5xl lg:text-6xl text-primary">
    Entenda as finanças da sua empresa
  </span>
  <span className="block text-4xl sm:text-5xl lg:text-6xl text-primary mt-2">
    sem complicação
  </span>
</h1>
          
          {/* Subtítulo */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Análises financeiras automáticas, cenários de desempenho e estratégias práticas para o crescimento do seu negócio.
          </p>
          
          {/* Botões CTA */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            {/* Botão primário - Laranja */}
            <Link href="/analise">
              <button 
                className="group bg-gradient-secondary text-white font-bold px-12 py-7 text-xl rounded-lg shadow-strong transition-all duration-300 hover:scale-105 inline-flex items-center"
              >
                Começar análise
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            {/* Botão secundário - Ver como funciona */}
            <button 
              variant="outline"
              size="lg"
              className="bg-white/50 backdrop-blur-sm border-2 border-primary text-primary font-bold px-12 py-7 text-xl rounded-lg transition-all duration-300 hover:bg-white hover:scale-105 inline-flex items-center"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Ver como funciona
            </button>
          </div>
          
          {/* Texto pequeno abaixo */}
          <p className="text-sm text-muted-foreground">
            Resultados em minutos
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
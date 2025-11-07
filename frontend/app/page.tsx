import HeroSection from '@/components/landing/HeroSection'
import ProblemSection from '@/components/landing/ProblemSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import DocumentsSection from '@/components/landing/DocumentsSection'
import { BenefitsSection } from '@/components/landing/BenefitsSection'
import { CtaSection } from '@/components/landing/CtaSection'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <DocumentsSection /> 
      <BenefitsSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
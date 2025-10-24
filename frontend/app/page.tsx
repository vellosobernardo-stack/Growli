import HeroSection from '@/components/landing/HeroSection'
import ProblemSection from '@/components/landing/ProblemSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { BenefitsSection } from '@/components/landing/BenefitsSection'
import { CtaSection } from '@/components/landing/CtaSection'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
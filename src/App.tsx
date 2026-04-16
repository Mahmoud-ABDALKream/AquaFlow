import { AquaHero } from './components/aqua/AquaHero'
import { AquaAbout } from './components/aqua/AquaAbout'
import { AquaProblem } from './components/aqua/AquaProblem'
import { AquaFeatures } from './components/aqua/AquaFeatures'
import { AquaHowItWorks } from './components/aqua/AquaHowItWorks'
import { AquaAppShowcase } from './components/aqua/AquaAppShowcase'
import { AquaTechStack } from './components/aqua/AquaTechStack'
import { AquaImpact } from './components/aqua/AquaImpact'
import { AquaAchievements } from './components/aqua/AquaAchievements'
import { AquaTeam } from './components/aqua/AquaTeam'
import { AquaFuture } from './components/aqua/AquaFuture'
import { AquaFooter } from './components/aqua/AquaFooter'
import { AquaNav } from './components/aqua/AquaNav'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AquaNav />
      <main>
        <AquaHero />
        <AquaAbout />
        <AquaProblem />
        <AquaFeatures />
        <AquaHowItWorks />
        <AquaAppShowcase />
        <AquaTechStack />
        <AquaImpact />
        <AquaAchievements />
        <AquaTeam />
        <AquaFuture />
      </main>
      <AquaFooter />
    </div>
  )
}

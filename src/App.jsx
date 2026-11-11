import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Sectors from './components/Sectors'
import VoltageLadder from './components/VoltageLadder'
import About from './components/About'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Sectors />
        <VoltageLadder />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}

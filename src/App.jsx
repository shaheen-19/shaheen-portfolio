import useScrollReveal from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DeveloperWorld from './components/DeveloperWorld'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import DSASection from './components/sections/DSASection'
import Journey from './components/sections/Journey'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DeveloperWorld />
        <Skills />
        <Projects />
        <DSASection />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App

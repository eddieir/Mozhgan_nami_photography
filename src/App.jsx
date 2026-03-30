import Cursor       from './components/Cursor'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Work         from './components/Work'
import Services     from './components/Services'
import Process      from './components/Process'
import Testimonials from './components/Testimonials'
import Reel         from './components/Reel'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      {/* Grain texture overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Custom cursor */}
      <Cursor />

      {/* Site */}
      <Navbar />

      <main>
        <Hero />
        <About />
        <Work />
        <Services />
        <Process />
        <Testimonials />
        <Reel />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

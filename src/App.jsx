import Cursor        from './components/Cursor'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import About         from './components/About'
import Work          from './components/Work'
import Services      from './components/Services'
import AiArtDirection from './components/AiArtDirection'
import Reel          from './components/Reel'
import Process       from './components/Process'
import Testimonials  from './components/Testimonials'
import Pricing       from './components/Pricing'
import InstagramFeed from './components/InstagramFeed'
import Contact       from './components/Contact'
import Footer        from './components/Footer'

export default function App() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Services />
        <AiArtDirection />
        <Reel />
        <Process />
        <Testimonials />
        <Pricing />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

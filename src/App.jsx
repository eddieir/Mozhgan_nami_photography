import Cursor        from './components/Cursor'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import About         from './components/About'
import Work          from './components/Work'
import InstagramFeed from './components/InstagramFeed'
import Services      from './components/Services'
import Process       from './components/Process'
import Testimonials  from './components/Testimonials'
import Reel          from './components/Reel'
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
        <InstagramFeed />
        <Services />
        <Reel />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

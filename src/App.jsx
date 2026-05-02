import Cursor          from './components/Cursor'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import Work            from './components/Work'
import Services        from './components/Services'
import FeaturedStories from './components/FeaturedStories'
import Reel            from './components/Reel'
import Process         from './components/Process'
import Testimonials    from './components/Testimonials'
import About           from './components/About'
import Contact         from './components/Contact'
import Footer          from './components/Footer'

export default function App() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Services />
        <FeaturedStories />
        <Reel />
        <Process />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

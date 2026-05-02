import { Routes, Route } from 'react-router-dom'
import Cursor          from './components/Cursor'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import Work            from './components/Work'
import Services        from './components/Services'
import FeaturedStories from './components/FeaturedStories'
import Process         from './components/Process'
import About           from './components/About'
import Testimonials    from './components/Testimonials'
import Contact         from './components/Contact'
import Footer          from './components/Footer'
import WorkPage        from './components/WorkPage'

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Services />
        <FeaturedStories />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
    </>
  )
}

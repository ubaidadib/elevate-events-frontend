import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Booking from './components/Booking';
import Membership from './components/Membership';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Events />
        <Booking />
        <Membership />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

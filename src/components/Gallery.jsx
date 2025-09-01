import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import luxuryLounge1 from '../assets/images/luxury_lounge_1.jpg';
import luxuryLounge2 from '../assets/images/luxury_lounge_2.jpg';
import vipClub1 from '../assets/images/vip_club_1.jpg';
import vipClub2 from '../assets/images/vip_club_2.jpg';
import eventSpace1 from '../assets/images/event_space_1.jpg';
import eventSpace2 from '../assets/images/event_space_2.jpg';
import hospitality1 from '../assets/images/hospitality_1.jpg';
import hospitality2 from '../assets/images/hospitality_2.jpg';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'lounges', label: 'Lounges' },
    { id: 'events', label: 'Events' },
    { id: 'vip', label: 'VIP Areas' },
    { id: 'hospitality', label: 'Hospitality' }
  ];

  const galleryItems = [
    {
      id: 1,
      src: luxuryLounge1,
      category: 'lounges',
      title: 'Platinum Lounge',
      description: 'Our flagship luxury lounge with premium amenities'
    },
    {
      id: 2,
      src: vipClub1,
      category: 'vip',
      title: 'VIP Private Suite',
      description: 'Exclusive VIP area for intimate gatherings'
    },
    {
      id: 3,
      src: eventSpace1,
      category: 'events',
      title: 'Grand Event Hall',
      description: 'Elegant venue for exclusive events and celebrations'
    },
    {
      id: 4,
      src: luxuryLounge2,
      category: 'lounges',
      title: 'Gold Lounge',
      description: 'Sophisticated lounge with modern luxury design'
    },
    {
      id: 5,
      src: vipClub2,
      category: 'vip',
      title: 'Premium VIP Club',
      description: 'State-of-the-art VIP experience with cutting-edge design'
    },
    {
      id: 6,
      src: eventSpace2,
      category: 'events',
      title: 'Luxury Networking Space',
      description: 'Perfect setting for high-end networking events'
    },
    {
      id: 7,
      src: hospitality1,
      category: 'hospitality',
      title: 'Concierge Service',
      description: 'Personalized hospitality at its finest'
    },
    {
      id: 8,
      src: hospitality2,
      category: 'hospitality',
      title: 'Guest Experience',
      description: 'Luxury hospitality redefined for discerning guests'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item, index) => {
    setLightboxImage(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setLightboxImage(filteredItems[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxImage(filteredItems[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-luxury font-bold text-foreground mb-6">
            Luxury <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground font-elegant max-w-3xl mx-auto leading-relaxed">
            Explore our stunning venues and experience the epitome of luxury through our curated 
            collection of spaces designed for the most discerning guests.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-elegant font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'glass text-foreground hover:bg-white/10'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(item, index)}
              >
                <div className="relative overflow-hidden rounded-xl bg-card">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-luxury font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/80 font-elegant text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 glass rounded-2xl p-8"
        >
          <div className="text-center">
            <div className="text-3xl font-luxury font-bold text-primary mb-2">15+</div>
            <div className="text-sm font-elegant text-muted-foreground">Luxury Venues</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-luxury font-bold text-primary mb-2">500+</div>
            <div className="text-sm font-elegant text-muted-foreground">Events Hosted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-luxury font-bold text-primary mb-2">10K+</div>
            <div className="text-sm font-elegant text-muted-foreground">Happy Guests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-luxury font-bold text-primary mb-2">98%</div>
            <div className="text-sm font-elegant text-muted-foreground">Satisfaction Rate</div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white font-luxury font-bold text-xl mb-2">
                  {lightboxImage.title}
                </h3>
                <p className="text-white/80 font-elegant">
                  {lightboxImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;


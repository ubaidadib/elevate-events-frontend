import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Calendar, MapPin } from 'lucide-react';
import eventSpace1 from '../assets/images/event_space_1.jpg';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
  const { t } = useTranslation("about");

  const features = [
    { icon: Award, key: "premium" },
    { icon: Users, key: "exclusive" },
    { icon: Calendar, key: "curated" },
    { icon: MapPin, key: "locations" }
  ];

  return (
    <section id="about" className="py-20 bg-background">
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
            <Trans i18nKey="header.title" t={t} components={{ 1: <span className="text-primary"/>, 3: <span className="text-primary"/> }} />
          </h2>
          <p className="text-xl text-muted-foreground font-elegant max-w-3xl mx-auto leading-relaxed">
            {t("header.description")}
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-luxury font-bold text-foreground mb-6">{t("story.title")}</h3>
            <p className="text-muted-foreground font-elegant mb-6 leading-relaxed">{t("story.paragraph1")}</p>
            <p className="text-muted-foreground font-elegant mb-8 leading-relaxed">{t("story.paragraph2")}</p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-luxury font-bold text-primary mb-2">2018</div>
                <div className="text-sm font-elegant text-muted-foreground">{t("story.timeline.2018")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-luxury font-bold text-primary mb-2">2024</div>
                <div className="text-sm font-elegant text-muted-foreground">{t("story.timeline.2024")}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img src={eventSpace1} alt="Luxury Event Space" className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="luxury-card text-center group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-luxury font-semibold text-foreground mb-3">
                {t(`features.${feature.key}.title`)}
              </h4>
              <p className="text-muted-foreground font-elegant leading-relaxed">
                {t(`features.${feature.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center glass rounded-2xl p-12"
        >
          <h3 className="text-3xl font-luxury font-bold text-foreground mb-6">{t("vision.title")}</h3>
          <p className="text-xl text-muted-foreground font-elegant max-w-4xl mx-auto leading-relaxed">
            {t("vision.description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

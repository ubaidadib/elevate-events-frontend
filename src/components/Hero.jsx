import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Calendar, ArrowRight, Star, Users } from "lucide-react";
import luxuryLounge1 from "../assets/images/luxury_lounge_1.jpg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation("hero");

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-28"
        aria-label="Elevate Events hero"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={luxuryLounge1}
            alt={t("badge")}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/60" />
        </div>

        {/* Foreground */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 inline-flex items-center rounded-full px-5 py-2 glass"
            >
              <Star aria-hidden className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-elegant text-foreground">{t("badge")}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-6 font-luxury text-5xl font-bold leading-tight text-foreground md:text-7xl lg:text-8xl"
            >
              <span className="block">{t("headline.line1")}</span>
              <span className="shimmer block text-primary">{t("headline.line2")}</span>
              <span className="mt-2 block font-elegant text-2xl font-light md:text-3xl lg:text-4xl">
                {/* {t("headline.line3")} */}
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mx-auto mb-10 max-w-2xl font-elegant text-xl leading-relaxed text-muted-foreground md:text-2xl"
            >
              {t("subheading")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.2 } }
              }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.a
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                href="#booking"
                aria-label={t("cta.reserve")}
                className="group inline-flex items-center gap-3 rounded-xl px-6 py-3 text-base font-semibold bg-primary text-primary-foreground shadow-lg transition hover:-translate-y-0.5"
              >
                <Calendar aria-hidden className="h-5 w-5" />
                <span>{t("cta.reserve")}</span>
                <ArrowRight aria-hidden className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                href="#membership"
                aria-label={t("cta.membership")}
                className="group inline-flex items-center gap-3 rounded-xl px-6 py-3 text-base font-semibold border border-border/80 bg-white/5 text-foreground backdrop-blur transition hover:bg-white/10"
              >
                <Users aria-hidden className="h-5 w-5" />
                <span>{t("cta.membership")}</span>
              </motion.a>
            </motion.div>

            {/* Stats with count-up */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-3"
            >
              <div className="text-center">
                <div className="mb-2 font-luxury text-3xl font-bold text-primary">
                  <CountUp end={500} suffix="+" duration={3} />
                </div>
                <div className="font-elegant text-sm text-muted-foreground">{t("stats.events.label")}</div>
              </div>
              <div className="text-center">
                <div className="mb-2 font-luxury text-3xl font-bold text-primary">
                  <CountUp end={50} suffix="+" duration={3} />
                </div>
                <div className="font-elegant text-sm text-muted-foreground">{t("stats.lounges.label")}</div>
              </div>
              <div className="text-center">
                <div className="mb-2 font-luxury text-3xl font-bold text-primary">
                  <CountUp end={10000} suffix="+" duration={3} />
                </div>
                <div className="font-elegant text-sm text-muted-foreground">{t("stats.guests.label")}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="relative -mt-6 flex h-16 items-start justify-center md:-mt-8 md:h-20">
        <a href="#about" aria-label={t("scroll")} className="group">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-10 w-6 justify-center rounded-full border-2 border-primary"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-2 h-3 w-1 rounded-full bg-primary"
            />
          </motion.div>
        </a>
      </div>
    </>
  );
};

export default Hero;

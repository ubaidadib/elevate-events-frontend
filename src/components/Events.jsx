import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Filter } from "lucide-react";
import apiService from "../services/api";
import { useTranslation } from "react-i18next";

const Events = () => {
const { t, i18n } = useTranslation("events");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: t("categories.all"), color: "bg-gradient-to-r from-amber-500 to-amber-600" },
    { id: "premium", name: t("categories.premium"), color: "bg-gradient-to-r from-amber-500 to-amber-600" },
    { id: "vip", name: t("categories.vip"), color: "bg-gradient-to-r from-purple-600 to-purple-700" },
    { id: "exclusive", name: t("categories.exclusive"), color: "bg-gradient-to-r from-red-600 to-red-700" }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiService.getEvents(selectedCategory);
        setEvents(res?.events ?? []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(t("section.error"));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCategory, t]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(i18n.language, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString(i18n.language, { hour: "2-digit", minute: "2-digit" });

  const parseFeatures = (value) => {
    if (Array.isArray(value)) return value;
    try {
      return JSON.parse(value ?? "[]");
    } catch {
      return [];
    }
  };

  const getCategoryColor = (category) => {
    const cat = categories.find((c) => c.id === category);
    return cat ? cat.color : "bg-gradient-to-r from-gray-500 to-gray-600";
  };

  const handleBookEvent = (eventId) => {
    try {
      sessionStorage.setItem("selectedEventId", String(eventId));
    } catch {}
    const booking = document.getElementById("booking");
    if (booking) booking.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <section id="events" className="bg-black py-20">
        <div className="container mx-auto px-6 text-center">
          <h2
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
            dangerouslySetInnerHTML={{ __html: t("section.title") }}
          />
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-amber-400" />
          <p className="mt-4 text-gray-400">{t("section.loading")}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="bg-black py-20">
        <div className="container mx-auto px-6 text-center">
          <h2
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
            dangerouslySetInnerHTML={{ __html: t("section.title") }}
          />
          <div className="mx-auto max-w-md rounded-lg border border-red-500 bg-red-900/20 p-6">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => setSelectedCategory((c) => c)}
              className="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700"
            >
              {t("section.retry")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="bg-black py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16 text-center">
          <h2
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
            dangerouslySetInnerHTML={{ __html: t("section.title") }}
          />
          <p className="mx-auto max-w-3xl text-xl text-gray-300">{t("section.subtitle")}</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-12 flex flex-wrap justify-center gap-4" role="tablist">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              role="tab"
              aria-selected={selectedCategory === category.id}
              className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? `${category.color} scale-105 text-white shadow-lg`
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Filter className="mr-2 inline-block h-4 w-4" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
            <p className="text-lg text-gray-400">{t("section.empty")}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, idx) => {
              const features = parseFeatures(event.features).slice(0, 3);
              return (
                <motion.article key={event.id ?? `${event.title}-${idx}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.08 }} whileHover={{ scale: 1.03 }} className="group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black shadow-2xl">
                  <div className="relative h-64 overflow-hidden">
                    <img src={event.image_url || "../assets/images/default-event.jpg"} alt={event.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute left-4 top-4">
                      <span className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${getCategoryColor(event.category)}`}>
                        {String(event.category || "").replace(/^\w/, (m) => m.toUpperCase()).trim() || "Event"}
                      </span>
                    </div>
                    <div className="absolute right-4 top-4">
                      <div className="rounded-lg bg-black/70 px-3 py-1 backdrop-blur-sm">
                        <span className="text-lg font-bold text-amber-400">€{event.price ?? "-"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-amber-400">{event.title}</h3>
                    <p className="mb-4 text-gray-300">
                      {event.description?.length > 160 ? `${event.description.slice(0, 157)}…` : event.description || "—"}
                    </p>

                    <div className="mb-4 space-y-2">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="mr-2 h-4 w-4 text-amber-400" />
                        <span className="text-sm">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="mr-2 h-4 w-4 text-amber-400" />
                        <span className="text-sm">
                          {formatTime(event.date)} • {event.duration_hours}h
                        </span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <MapPin className="mr-2 h-4 w-4 text-amber-400" />
                        <span className="text-sm">{event.venue_location}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="mr-2 h-4 w-4 text-amber-400" />
                        <span className="text-sm">{t("labels.spots", { count: event.available_spots })}</span>
                      </div>
                    </div>

                    {/* Features */}
                    {features.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1">
                        {features.map((feature, i) => (
                          <span key={`${feature}-${i}`} className="rounded-full bg-amber-500/20 px-2 py-1 text-xs text-amber-300">
                            {feature}
                          </span>
                        ))}
                        {parseFeatures(event.features).length > 3 && (
                          <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-300">
                            {t("labels.more", { count: parseFeatures(event.features).length - 3 })}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Reserve CTA */}
                    <a href="#booking" onClick={() => handleBookEvent(event.id)} className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 font-bold text-black shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-700">
                      {t("labels.reserve")}
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Section CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-16 text-center">
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-amber-600/10 p-8">
            <h3 className="mb-4 text-2xl font-bold text-white">{t("cta.title")}</h3>
            <p className="mb-6 text-gray-300">{t("cta.subtitle")}</p>
            <a href="#contact" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3 font-bold text-black hover:from-amber-600 hover:to-amber-700">
              {t("cta.contact")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;

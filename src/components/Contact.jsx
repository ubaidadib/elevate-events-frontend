import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(t("form.alert"));
  };

  const contactInfo = [
  {
    icon: MapPin,
    title: t("info.location"),
    details: [" Knesebeckstraße 49, 10719 Berlin"],
    link: "#"
  },
  {
    icon: Phone,
    title: t("info.phone"),
    details: ["+49 30 1234 5678", "+49 30 1234 5679"],
    link: "tel:+493012345678"
  },
  {
    icon: Mail,
    title: t("info.email"),
    details: ["info@elevateevents.de", "vip@elevateevents.de"],
    link: "mailto:info@elevateevents.de"
  },
  {
    icon: Clock,
    title: t("info.hours"),
    details: [
      "Mon - Thu: 6:00 PM - 2:00 AM",
      "Fri - Sat: 6:00 PM - 4:00 AM",
      "Sun: 6:00 PM - 1:00 AM"
    ],
    link: "#"
  }
];


  const subjects = [
    t("form.subjectOptions.general"),
    t("form.subjectOptions.booking"),
    t("form.subjectOptions.membership"),
    t("form.subjectOptions.private"),
    t("form.subjectOptions.corporate"),
    t("form.subjectOptions.feedback"),
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-luxury font-bold text-foreground mb-6"
            dangerouslySetInnerHTML={{ __html: t("section.title") }}
          />
          <p className="text-xl text-muted-foreground font-elegant max-w-3xl mx-auto leading-relaxed">
            {t("section.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-luxury font-bold text-foreground mb-6">
                {t("info.title")}
              </h3>
              <p className="text-muted-foreground font-elegant mb-8 leading-relaxed">
                {t("info.subtitle")}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-luxury font-semibold text-foreground mb-2">
                      {info.title}
                    </h4>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-muted-foreground font-elegant text-sm"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
{/* Map Embed */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="luxury-card h-64 overflow-hidden rounded-xl"
>
  <iframe
    title="Elevate Events Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.041246501985!2d13.325615877176823!3d52.502641872077585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c3033cc08d%3A0x9d4ef8a0b9dd5d4a!2sKnesebeckstra%C3%9Fe%2049%2C%2010719%20Berlin%2C%20Germany!5e0!3m2!1sen!2sde!4v1693415971612!5m2!1sen!2sde"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-xl"
  ></iframe>
</motion.div>

          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="luxury-card"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-luxury font-bold text-foreground mb-4">
                {t("form.title")}
              </h3>
              <p className="text-muted-foreground font-elegant">
                {t("form.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-elegant font-medium text-foreground mb-2">
                    {t("form.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder={t("form.name")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-elegant font-medium text-foreground mb-2">
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder={t("form.email")}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-elegant font-medium text-foreground mb-2">
                    {t("form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder={t("form.phone")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-elegant font-medium text-foreground mb-2">
                    {t("form.subject")}
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  >
                    <option value="">{t("form.subject")}</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-elegant font-medium text-foreground mb-2">
                  {t("form.message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                  placeholder={t("form.messagePlaceholder")}
                />
              </div>

             <button
  type="submit"
  className="w-full btn-luxury group inline-flex items-center justify-center"
>
  <Send className="w-5 h-5 mr-2" aria-hidden="true" />
  <span>{t("form.submit")}</span>
</button>

            </form>
          </motion.div>
        </div>

        {/* Quick Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 glass rounded-2xl p-12"
        >
          <h3 className="text-3xl font-luxury font-bold text-foreground mb-4">
            {t("quick.title")}
          </h3>
          <p className="text-muted-foreground font-elegant mb-8 max-w-2xl mx-auto">
            {t("quick.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+493012345678"
              className="btn-luxury inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              {t("quick.call")}
            </a>
            <a
              href="mailto:vip@elevateevents.de"
              className="glass px-8 py-3 rounded-lg font-elegant font-semibold text-foreground hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              {t("quick.email")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

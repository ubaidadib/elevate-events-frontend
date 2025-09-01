// src/components/Booking.jsx
import React, { useCallback, useEffect, useMemo, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, CreditCard, Check, ArrowRight, ArrowLeft } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { useTranslation, Trans } from "react-i18next";
import "react-day-picker/dist/style.css";

import luxuryLounge1 from "../assets/images/luxury_lounge_1.jpg";
import luxuryLounge2 from "../assets/images/luxury_lounge_2.jpg";
import vipClub1 from "../assets/images/vip_club_1.jpg";

/* =========================
   Config
   ========================= */
const SLOT_INTERVAL_MINUTES = 30;     // 24/7 in 30-min steps
const MAX_GUESTS = 150;
const MAX_DURATION_HOURS = 12;

/** Lounge catalog (content will be localized via i18n keys with defaultValue fallbacks) */
const LOUNGES = [
  {
    id: "platinum",
    image: luxuryLounge1,
    capacity: 8,
    price: 150,
    features: ["Private Bar", "Dedicated Service", "Premium Sound System", "Climate Control"],
  },
  {
    id: "gold",
    image: luxuryLounge2,
    capacity: 6,
    price: 120,
    features: ["Premium Bar", "Personal Service", "Sound System", "Ambient Lighting"],
  },
  {
    id: "vip",
    image: vipClub1,
    capacity: 12,
    price: 200,
    features: ["Full Bar", "Concierge Service", "Entertainment System", "Private Entrance"],
  },
];

const initialData = {
  date: "",            // "YYYY-MM-DD"
  time: "",            // "HH:MM"
  lounge: "",
  guests: 2,
  duration: 2,
  specialRequests: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  paymentMethod: "",
};

/* =========================
   Helpers
   ========================= */
const pad = (n) => String(n).padStart(2, "0");

const formatDateOnly = (date) => {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  return `${y}-${m}-${d}`;
};
const parseISODateOnly = (iso) => {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const startOfToday = () => {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
};
const todayISO = () => formatDateOnly(startOfToday());

const generateAllSlots = (intervalMin = SLOT_INTERVAL_MINUTES) => {
  const list = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += intervalMin) list.push(`${pad(h)}:${pad(m)}`);
  }
  return list;
};
const getAvailableSlotsFor = (dateISO, intervalMin = SLOT_INTERVAL_MINUTES) => {
  const all = generateAllSlots(intervalMin);
  if (!dateISO) return all;
  const isToday = dateISO === todayISO();
  if (!isToday) return all;

  // For today: only future times (rounded to next slot)
  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes();
  const nextSlotMins = Math.ceil(currentMins / intervalMin) * intervalMin;
  return all.filter((hhmm) => {
    const [h, m] = hhmm.split(":").map((x) => parseInt(x, 10));
    return h * 60 + m >= nextSlotMins;
  });
};
const computeEndDateTime = (dateISO, timeHHMM, durationHours) => {
  if (!dateISO || !timeHHMM || !durationHours) return null;
  const start = new Date(`${dateISO}T${timeHHMM}:00`);
  if (isNaN(start.getTime())) return null;
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  return { start, end };
};
/** Locale-aware EUR currency */
const formatEUR = (value, lang) =>
  new Intl.NumberFormat(lang || undefined, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

/* =========================
   Step 1 — Date & Time
   ========================= */
const Step1 = memo(function Step1({ data, errors, update, timeSlots }) {
  const { t, i18n } = useTranslation("booking");
  const [open, setOpen] = useState(false);
  const selectedDate = parseISODateOnly(data.date);
  const noSlotsToday = data.date && data.date === todayISO() && timeSlots.length === 0;

  return (
    <div className="space-y-6">
      <div aria-live="polite" className="sr-only">{Object.values(errors).join(". ")}</div>

      <h3 className="mb-6 text-2xl font-luxury font-bold text-foreground">{t("step1.title")}</h3>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Date picker */}
        <div>
          <label htmlFor="date-trigger" className="mb-2 block text-sm font-elegant font-medium text-foreground">
            {t("step1.date_label")} <span className="text-primary">*</span>
          </label>

          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button
                id="date-trigger"
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-border bg-input px-4 py-3 text-left text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={t("step1.date_label")}
              >
                <span className={!selectedDate ? "text-muted-foreground" : ""}>
                  {selectedDate
                    ? selectedDate.toLocaleDateString(i18n.resolvedLanguage)
                    : t("step1.date_placeholder")}
                </span>
                <Calendar className="ml-3 h-4 w-4 text-muted-foreground" aria-hidden />
              </button>
            </Popover.Trigger>

            <Popover.Content side="bottom" align="start" className="z-50 rounded-xl border border-border bg-card p-2 shadow-xl">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(d) => {
                  if (d) {
                    update({ date: formatDateOnly(d) });
                    setOpen(false);
                  }
                }}
                disabled={{ before: startOfToday() }}
                weekStartsOn={1}
                initialFocus
              />
            </Popover.Content>
          </Popover.Root>

          {errors.date && <p className="mt-1 text-sm text-red-400">{errors.date}</p>}
        </div>

        {/* Time slots */}
        <div>
          <label htmlFor="time" className="mb-2 block text-sm font-elegant font-medium text-foreground">
            {t("step1.time_label")} <span className="text-primary">*</span>
          </label>
          <select
            id="time"
            name="time"
            value={data.time}
            onChange={(e) => update({ time: e.target.value })}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? "time-error" : undefined}
            required
          >
            <option value="">{t("step1.time_placeholder")}</option>
            {timeSlots.map((tVal) => (
              <option key={tVal} value={tVal}>{tVal}</option>
            ))}
          </select>
          {errors.time && <p id="time-error" className="mt-1 text-sm text-red-400">{errors.time}</p>}
          {noSlotsToday && (
            <p className="mt-2 text-sm text-muted-foreground">{t("step1.no_slots")}</p>
          )}
        </div>
      </div>

      {/* Guests + Duration */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="guests" className="mb-2 block text-sm font-elegant font-medium text-foreground">
            {t("step1.guests_label")}
          </label>
          <select
            id="guests"
            name="guests"
            value={data.guests}
            onChange={(e) => {
              const val = Math.max(1, Math.min(parseInt(e.target.value, 10) || 1, MAX_GUESTS));
              update({ guests: val });
            }}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
          >
            {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? t("step1.guest") : t("step1.guests")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="duration" className="mb-2 block text-sm font-elegant font-medium text-foreground">
            {t("step1.duration_label")}
          </label>
          <select
            id="duration"
            name="duration"
            value={data.duration}
            onChange={(e) => {
              const val = Math.max(1, Math.min(parseInt(e.target.value, 10) || 1, MAX_DURATION_HOURS));
              update({ duration: val });
            }}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
          >
            {Array.from({ length: MAX_DURATION_HOURS }, (_, i) => i + 1).map((h) => (
              <option key={h} value={h}>
                {h} {h === 1 ? t("step1.hour") : t("step1.hours")}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
});

/* =========================
   Step 2 — Lounge Selection
   ========================= */
const Step2 = memo(function Step2({ data, errors, update }) {
  const { t, i18n } = useTranslation("booking");

  const handleSelect = useCallback((lounge) => {
    const adjustedGuests = Math.min(data.guests, lounge.capacity);
    update({ lounge: lounge.id, guests: adjustedGuests });
  }, [data.guests, update]);

  return (
    <div className="space-y-6">
      <div aria-live="polite" className="sr-only">{Object.values(errors).join(". ")}</div>

      <h3 className="mb-6 text-2xl font-luxury font-bold text-foreground">{t("step2.title")}</h3>
      {errors.lounge && <p className="mb-2 text-sm text-red-400">{errors.lounge}</p>}

      <div className="grid gap-6">
        {LOUNGES.map((lounge) => {
          const selected = data.lounge === lounge.id;

          const name = t(`lounges.${lounge.id}.name`, { defaultValue:
            lounge.id === "platinum" ? "Platinum Lounge" :
            lounge.id === "gold" ? "Gold Lounge" : "VIP Suite"
          });
          const description = t(`lounges.${lounge.id}.description`, {
            defaultValue:
              lounge.id === "platinum"
                ? "Our flagship lounge featuring the finest amenities and personalized service."
                : lounge.id === "gold"
                ? "Elegant and sophisticated, perfect for intimate gatherings."
                : "The ultimate luxury experience with exclusive amenities."
          });

          return (
            <motion.button
              type="button"
              key={lounge.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleSelect(lounge)}
              className={`luxury-card cursor-pointer text-left transition-all duration-300 ${
                selected ? "ring-2 ring-primary bg-primary/5" : "hover:ring-1 hover:ring-primary/50"
              }`}
              aria-pressed={selected}
              aria-label={`${name} ${selected ? "(selected)" : ""}`}
            >
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="md:w-1/3">
                  <img
                    src={lounge.image}
                    alt={name}
                    className="h-48 w-full rounded-lg object-cover md:h-32"
                    loading="lazy"
                  />
                </div>

                <div className="md:w-2/3 space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-luxury text-xl font-bold text-foreground">{name}</h4>
                    <div className="text-right">
                      <div className="font-luxury text-2xl font-bold text-primary">
                        {formatEUR(lounge.price, i18n.resolvedLanguage)}
                      </div>
                      <div className="text-sm text-muted-foreground">{t("step2.per_hour")}</div>
                    </div>
                  </div>

                  <p className="font-elegant text-muted-foreground">{description}</p>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4 text-primary" />
                    {t("step2.up_to", { count: lounge.capacity })}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {lounge.features.map((f, i) => (
                      <span
                        key={i}
                        className="rounded bg-muted px-2 py-1 text-xs font-elegant text-muted-foreground"
                      >
                        {t(`lounges.${lounge.id}.features.${i}`, { defaultValue: f })}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});

/* =========================
   Step 3 — Guest Info
   ========================= */
const Step3 = memo(function Step3({ data, errors, update }) {
  const { t } = useTranslation("booking");

  return (
    <div className="space-y-6">
      <div aria-live="polite" className="sr-only">{Object.values(errors).join(". ")}</div>

      <h3 className="mb-6 text-2xl font-luxury font-bold text-foreground">{t("step3.title")}</h3>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-elegant font-medium text-foreground">
            {t("step3.first_name")}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={data.firstName}
            onChange={(e) => update({ firstName: e.target.value })}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            required
          />
          {errors.firstName && <p id="firstName-error" className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-elegant font-medium text-foreground">
            {t("step3.last_name")}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={data.lastName}
            onChange={(e) => update({ lastName: e.target.value })}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            required
          />
          {errors.lastName && <p id="lastName-error" className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-elegant font-medium text-foreground">
            {t("step3.email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && <p id="email-error" className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-elegant font-medium text-foreground">
            {t("step3.phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            required
          />
          {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="special" className="mb-2 block text-sm font-elegant font-medium text-foreground">
          {t("step3.special")}
        </label>
        <textarea
          id="special"
          name="specialRequests"
          rows={4}
          value={data.specialRequests}
          onChange={(e) => update({ specialRequests: e.target.value })}
          className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
          placeholder={t("step3.special_placeholder")}
        />
      </div>
    </div>
  );
});

/* =========================
   Step 4 — Summary & Payment
   ========================= */
const Step4 = memo(function Step4({ data, errors, total, update }) {
  const { t, i18n } = useTranslation("booking");
  const dt = computeEndDateTime(data.date, data.time, data.duration);
  const endLabel = dt?.end
    ? dt.end.toLocaleTimeString(i18n.resolvedLanguage, { hour: "2-digit", minute: "2-digit", hour12: false })
    : "—";
  const crossesMidnight =
    dt?.start && dt?.end && formatDateOnly(dt.end) !== formatDateOnly(dt.start);

  const METHODS = ["credit", "paypal", "klarna"];

  return (
    <div className="space-y-6">
      <div aria-live="polite" className="sr-only">{Object.values(errors).join(". ")}</div>

      <h3 className="mb-6 text-2xl font-luxury font-bold text-foreground">{t("step4.title")}</h3>

      <div className="luxury-card">
        <h4 className="mb-4 text-lg font-luxury font-bold text-foreground">{t("step4.reservation")}</h4>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("step4.date")}</span>
            <span className="font-medium text-foreground">{data.date || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("step4.start_time")}</span>
            <span className="font-medium text-foreground">{data.time || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {crossesMidnight ? t("step4.ends_next") : t("step4.ends")}
            </span>
            <span className="font-medium text-foreground">{endLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("step4.lounge")}</span>
            <span className="font-medium text-foreground">
              {data.lounge
                ? ( // resolve localized lounge name with fallback
                  t(`lounges.${data.lounge}.name`, {
                    defaultValue:
                      data.lounge === "platinum" ? "Platinum Lounge" :
                      data.lounge === "gold" ? "Gold Lounge" : "VIP Suite",
                  })
                )
                : "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("step4.guests")}</span>
            <span className="font-medium text-foreground">{data.guests}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("step4.duration")}</span>
            <span className="font-medium text-foreground">
              {data.duration} {data.duration === 1 ? t("step1.hour") : t("step1.hours")}
            </span>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between font-luxury text-lg font-bold">
            <span className="text-foreground">{t("step4.total")}</span>
            <span className="text-primary">{formatEUR(total, i18n.resolvedLanguage)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-luxury font-bold text-foreground">{t("step4.payment")}</h4>
        {errors.paymentMethod && <p className="text-sm text-red-400">{errors.paymentMethod}</p>}

        <div className="grid gap-3">
          {METHODS.map((key) => (
            <label
              key={key}
              className={`luxury-card flex cursor-pointer items-center p-4 ${
                data.paymentMethod === key ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50"
              }`}
            >
              <input
                type="radio"
                name="payment"
                className="mr-3"
                checked={data.paymentMethod === key}
                onChange={() => update({ paymentMethod: key })}
              />
              <CreditCard className="mr-3 h-5 w-5 text-primary" />
              <span className="font-elegant text-foreground">{t(`step4.methods.${key}`)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
});

/* =========================
   Main Component
   ========================= */
const Booking = () => {
  const { t } = useTranslation("booking");
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  // Stable updater (prevents input blur/focus issues)
  const update = useCallback((patch) => {
    setData((d) => ({ ...d, ...patch }));
  }, []);

  // Optional: example preselect (clear if present)
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("selectedEventId");
      if (stored) sessionStorage.removeItem("selectedEventId");
    } catch {}
  }, []);

  const selectedLounge = useMemo(() => LOUNGES.find((l) => l.id === data.lounge), [data.lounge]);
  const total = useMemo(() => (selectedLounge ? selectedLounge.price * (data.duration || 0) : 0), [selectedLounge, data.duration]);
  const timeSlots = useMemo(() => getAvailableSlotsFor(data.date), [data.date]);

  // If a selected time becomes invalid after date change, clear it
  useEffect(() => {
    if (data.time && !timeSlots.includes(data.time)) {
      setData((d) => ({ ...d, time: "" }));
    }
  }, [data.time, timeSlots]);

  // Clamp guests to lounge capacity when a lounge is selected
  useEffect(() => {
    if (!selectedLounge) return;
    if (data.guests > selectedLounge.capacity) {
      setData((d) => ({ ...d, guests: selectedLounge.capacity }));
    }
  }, [data.guests, selectedLounge]);

  /* ========= Validation ========= */
  const validateStep = useCallback((step = currentStep) => {
    const next = {};
    if (step === 1) {
      if (!data.date) next.date = t("errors.date");
      if (!data.time) next.time = t("errors.time");
    } else if (step === 2) {
      if (!data.lounge) next.lounge = t("errors.lounge");
    } else if (step === 3) {
      if (!data.firstName.trim()) next.firstName = t("errors.first_name");
      if (!data.lastName.trim()) next.lastName = t("errors.last_name");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = t("errors.email");
      if (!data.phone.trim()) next.phone = t("errors.phone");
    } else if (step === 4) {
      if (!data.paymentMethod) next.paymentMethod = t("errors.payment");
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [currentStep, data, t]);

  /* ========= Navigation ========= */
  const handleNext = useCallback(() => {
    if (validateStep(currentStep) && currentStep < 4) setCurrentStep((s) => s + 1);
  }, [currentStep, validateStep]);

  const handlePrevious = useCallback(() => setCurrentStep((s) => Math.max(1, s - 1)), []);

  const handleComplete = useCallback(async () => {
    if (!validateStep(4)) return;
    setSubmitting(true);
    try {
      // Replace with real API call
      await new Promise((r) => setTimeout(r, 700));
      const ref = `EV-${Date.now().toString(36).toUpperCase()}`;
      setConfirmed(ref);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrors({ submit: t("errors.submit") });
    } finally {
      setSubmitting(false);
    }
  }, [validateStep, t]);

  /* ========= Success Screen ========= */
  if (confirmed) {
    return (
      <section id="booking" className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="mb-2 font-luxury text-4xl font-bold text-foreground">{t("confirmation.title")}</h2>
            <p className="font-elegant text-muted-foreground">
              <Trans i18nKey="confirmation.thanks" values={{ ref: confirmed }} components={{1: <span className="font-semibold text-foreground" />}} />
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="#events" className="glass rounded-lg px-6 py-3 font-semibold text-foreground hover:bg-white/10">
                {t("confirmation.back")}
              </a>
              <a href="#home" className="btn-luxury inline-flex items-center">
                {t("confirmation.done")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ========= Main Render ========= */
  return (
    <section id="booking" className="bg-background py-20 scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="mb-16 text-center"
  >
    <h2 className="mb-6 font-luxury text-4xl font-bold text-foreground md:text-5xl">
      <Trans
        i18nKey="header.title"
        ns="booking"
        components={{ 0: <span className="text-primary" /> }}
      />
    </h2>
    <p className="mx-auto max-w-3xl font-elegant text-xl leading-relaxed text-muted-foreground">
      {t("header.description")}
    </p>
  </motion.div>

        <div className="mx-auto max-w-4xl">
          {/* Steps */}
          <div className="mb-12 flex justify-between">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex flex-1 flex-col items-center">
                <div
                  className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full font-bold transition-all duration-300 ${
                    currentStep >= num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                  aria-current={currentStep === num ? "step" : undefined}
                  title={t(`steps.${num}.title`)}
                >
                  {currentStep > num ? <Check className="h-6 w-6" /> : num}
                </div>
                <div className="text-center">
                  <div className="text-sm font-elegant font-medium text-foreground">{t(`steps.${num}.title`)}</div>
                  <div className="hidden text-xs font-elegant text-muted-foreground md:block">{t(`steps.${num}.description`)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Step Card */}
          <div className="luxury-card mb-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Step1 data={data} errors={errors} update={update} timeSlots={timeSlots} />
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Step2 data={data} errors={errors} update={update} />
                </motion.div>
              )}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Step3 data={data} errors={errors} update={update} />
                </motion.div>
              )}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Step4 data={data} errors={errors} update={update} total={total} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer CTAs */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center rounded-lg px-6 py-3 font-elegant font-medium transition-all duration-300 ${
                currentStep === 1
                  ? "cursor-not-allowed bg-muted text-muted-foreground"
                  : "glass text-foreground hover:bg-white/10"
              }`}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("buttons.previous")}
            </button>

            {currentStep < 4 ? (
              <button type="button" onClick={handleNext} className="btn-luxury inline-flex items-center">
                {t("buttons.next")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                disabled={submitting}
                className="btn-luxury inline-flex items-center"
              >
                {submitting ? t("buttons.processing") : t("buttons.complete")}
                {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>
            )}
          </div>

          {/* Submit error (if any) */}
          {errors.submit && (
            <p role="alert" className="mt-4 text-center text-sm text-red-400">
              {errors.submit}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;

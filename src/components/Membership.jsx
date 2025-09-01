import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, Star, Zap, Check, ArrowRight, Gift, Calendar, Users } from "lucide-react";
import apiService from "../services/api";
import { useTranslation } from "react-i18next";

const Membership = () => {
  const { t } = useTranslation("membership");

  const [membershipTiers, setMembershipTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [billingCycle, setBillingCycle] = useState("annual");

  useEffect(() => {
    fetchMembershipTiers();
  }, []);

  const fetchMembershipTiers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getMembershipTiers();
      setMembershipTiers(response.tiers || []);
      if (response.tiers && response.tiers.length > 0) {
        setSelectedTier(response.tiers[1]);
      }
    } catch (err) {
      setError(t("section.error"));
      console.error("Error fetching membership tiers:", err);
    } finally {
      setLoading(false);
    }
  };

  const parseFeatures = (featuresString) => {
    try {
      return JSON.parse(featuresString);
    } catch {
      return [];
    }
  };

  const getTierIcon = (tierName) => {
    switch (tierName.toLowerCase()) {
      case "standard":
        return <Star className="w-8 h-8" />;
      case "vip":
        return <Crown className="w-8 h-8" />;
      case "premium elite":
        return <Zap className="w-8 h-8" />;
      default:
        return <Star className="w-8 h-8" />;
    }
  };

  const getTierGradient = (tierName) => {
    switch (tierName.toLowerCase()) {
      case "standard":
        return "from-amber-500 to-amber-600";
      case "vip":
        return "from-purple-600 to-purple-700";
      case "premium elite":
        return "from-red-600 to-red-700";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getPrice = (tier) => {
    return billingCycle === "annual" ? tier.annual_price : tier.monthly_price;
  };

  const getSavings = (tier) => {
    if (billingCycle === "annual") {
      const monthlyCost = tier.monthly_price * 12;
      const savings = monthlyCost - tier.annual_price;
      return savings > 0 ? savings : 0;
    }
    return 0;
  };

  if (loading) {
    return (
      <section id="membership" className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            dangerouslySetInnerHTML={{ __html: t("section.title") }}
          />
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400" />
          </div>
          <p className="mt-4 text-gray-400">{t("section.loading")}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="membership" className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            dangerouslySetInnerHTML={{ __html: t("section.title") }}
          />
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchMembershipTiers}
              className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              {t("section.retry")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="membership" className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            dangerouslySetInnerHTML={{ __html: t("section.title") }}
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">{t("section.subtitle")}</p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${billingCycle === "monthly" ? "text-white" : "text-gray-400"}`}>
              {t("billing.monthly")}
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === "annual" ? "bg-amber-600" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === "annual" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`ml-3 ${billingCycle === "annual" ? "text-white" : "text-gray-400"}`}>
              {t("billing.annual")}
            </span>
            {billingCycle === "annual" && (
              <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                {t("billing.save", { amount: 2400 })}
              </span>
            )}
          </div>
        </motion.div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {membershipTiers.map((tier, index) => (
            <motion.div key={tier.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2">
              {tier.name === "VIP" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-4 py-2 rounded-full text-sm font-bold">
                    {t("tiers.mostPopular")}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${getTierGradient(tier.name)} text-white mb-4`}>
                  {getTierIcon(tier.name)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 mb-4">{tier.description}</p>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">€{getPrice(tier)}</span>
                  <span className="text-gray-400">/{billingCycle}</span>
                  {billingCycle === "annual" && getSavings(tier) > 0 && (
                    <div className="text-green-400 text-sm mt-1">
                      {t("billing.savePerYear", { amount: getSavings(tier) })}
                    </div>
                  )}
                </div>

                <div className="text-center mb-6">
                  <div className="text-amber-400 font-semibold text-lg">
                    {t("tiers.discount", { percent: tier.discount_percentage })}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {t("tiers.drinks", { count: tier.complimentary_drinks })}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {parseFeatures(tier.features).map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Extra Benefits */}
              <div className="space-y-2 mb-8 text-sm">
                {tier.priority_booking && (
                  <div className="flex items-center text-amber-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t("tiers.priority")}
                  </div>
                )}
                {tier.private_lounge_access && (
                  <div className="flex items-center text-purple-400">
                    <Users className="w-4 h-4 mr-2" />
                    {t("tiers.privateLounge")}
                  </div>
                )}
                {tier.transportation_service && (
                  <div className="flex items-center text-green-400">
                    <Gift className="w-4 h-4 mr-2" />
                    {t("tiers.transport")}
                  </div>
                )}
              </div>

              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700">
                {t("tiers.choose", { tier: tier.name })}
                <ArrowRight className="inline-block w-4 h-4 ml-2" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Benefits Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {["priority", "perks", "vip", "events"].map((benefit) => (
            <div key={benefit} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600">
                {benefit === "priority" && <Calendar className="w-8 h-8 text-black" />}
                {benefit === "perks" && <Gift className="w-8 h-8 text-white" />}
                {benefit === "vip" && <Crown className="w-8 h-8 text-white" />}
                {benefit === "events" && <Users className="w-8 h-8 text-white" />}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t(`benefits.${benefit}.title`)}</h3>
              <p className="text-gray-400">{t(`benefits.${benefit}.desc`)}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-center">
          <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-2xl p-8 border border-amber-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">{t("cta.title")}</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold px-12 py-4 rounded-lg hover:from-amber-600 hover:to-amber-700">
              {t("cta.start")}
              <ArrowRight className="inline-block w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Membership;

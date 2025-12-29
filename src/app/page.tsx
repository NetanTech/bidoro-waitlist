"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Logo, Ai, Handshake, Money, WavyLines } from "@/components/svgs/svg";
import WaitlistModal from "@/components/WaitlistModal"; // Import your modal

const BidoroLayout: React.FC = () => {
  const router = useRouter();

  const sampleImage = "/assets/young-woman-shopping-clothes 2.png";
  const starImage = "/assets/Star 5.png";

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Main form state (for the inline form)
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  // Show modal after animations complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000); // 3 seconds after page load (adjust timing as needed)

    return () => clearTimeout(timer);
  }, []);

  // Handle main form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          whatsappNumber,
          referralSource: "landing_page_form",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Redirect to thank-you page
      router.push("/thank-you");
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Each image appears 0.15s after the previous
        delayChildren: 0.2, // Initial delay before starting
      },
    },
  };

  // Animation variants for individual images
  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  // Side images slide from left
  const slideFromLeft = {
    hidden: { opacity: 0, x: -60, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  };

  // Side images slide from right
  const slideFromRight = {
    hidden: { opacity: 0, x: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  };

  // Center image scales up
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  // New animation variants for the new sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleJoinWaitlist = () => {
    setShowModal(true);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-8 md:py-16 px-4 relative"
      style={{
        overflow: "hidden",
      }}
    >
      <div
        className="absolute top-[-200px] left-[-200px] w-[600px] h-[400px] sm:w-[900px] sm:h-[900px]"
        style={{
          background:
            "radial-gradient(circle, #dee56340 0%, #dee56320 30%, #dee56310 50%, transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-[30%] left-[-200px] w-[600px] h-[400px] sm:w-[900px] sm:h-[900px]"
        style={{
          background:
            "radial-gradient(circle, #dee56340 0%, #dee56320 30%, #dee56310 50%, transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-[50%] right-[-200px] w-[600px] h-[400px] sm:w-[900px] sm:h-[900px]"
        style={{
          background:
            "radial-gradient(circle, #dee56340 0%, #dee56320 30%, #dee56310 50%, transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-[0%] right-[-200px] w-[600px] h-[400px] sm:w-[900px] sm:h-[900px]"
        style={{
          background:
            "radial-gradient(circle, #dee56340 0%, #dee56320 30%, #dee56310 50%, transparent 70%)",
        }}
      />

      <div className="absolute top-[-7%] left-[-15%] sm:top-[13%] sm:left-[-10%] w-full">
        <WavyLines className="h-auto w-full" />
      </div>
      <div className="max-w-[1400px] mx-auto text-center relative">
        {/* Header */}

        <motion.div
          className="flex items-center justify-center w-full max-w-[550px] mx-auto border border-[#E3E3E3] rounded-full p-2 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="w-full flex items-center justify-between gap-2 ml-4">
            <Logo className="h-auto" />
            <button
              onClick={handleJoinWaitlist}
              className="text-[14px] sm:text-[18px] bg-[#1C341A] text-[#DEE563] px-6 py-2 rounded-full md:ml-4 hover:bg-[#2A4A28] transition-colors cursor-pointer"
            >
              Join waitlist
            </button>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-[1.5em] sm:text-3xl md:text-4xl lg:text-[3.9em] font-semibold text-[#1C341A] mb-4 leading-[1.1em] px-4 tracking-[0.035em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Smarter Shopping. Safer Selling.
          <br />
          Stronger Community.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-[14px] sm:text-base md:text-[18px] text-gray-600 mb-8 md:mb-16 max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Join the future of local commerce — where budget finds beauty, clutter
          finds a home and trust is built into every transaction.
        </motion.p>

        {/* Photo Collage - Animated Grid */}
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            className="grid gap-1 sm:gap-2 md:gap-4 lg:gap-6 items-center justify-center mx-auto"
            style={{
              gridTemplateColumns: "1fr 1fr 2fr 1fr 1fr", // 20% 20% 40% 20% 20%
              gridTemplateRows: "auto auto",
              maxWidth: "100%",
              height: "auto",
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Column 1 - Single item spanning both rows */}
            <motion.div
              className="row-span-2 flex items-center justify-center"
              variants={slideFromLeft}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full aspect-[3/4] rounded-[10px] md:rounded-[15px] lg:md:rounded-[30px] shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  src="/assets/handshake.jpg"
                  alt="Handshake"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Column 2 Row 1 */}
            <motion.div
              className="flex items-end justify-center"
              variants={imageVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full aspect-[4/5] rounded-[10px] md:rounded-[15px] lg:md:rounded-[30px] overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  src="/assets/jackets.jpg"
                  alt="Jackets"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Column 3 - Center large image spanning both rows */}
            <motion.div
              className="row-span-2 flex items-center justify-center"
              variants={scaleUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="w-full aspect-[3/4] rounded-[10px] md:rounded-[15px] lg:md:rounded-[30px] overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src="/assets/infinix.jpg"
                  alt="Phone"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Column 4 Row 1 */}
            <motion.div
              className="flex items-end justify-center"
              variants={imageVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full aspect-[4/5] rounded-[10px] md:rounded-[15px] lg:md:rounded-[30px] shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  src="/assets/fruits.jpg"
                  alt="Fruits"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Column 5 - Single item spanning both rows */}
            <motion.div
              className="row-span-2 flex items-center justify-center"
              variants={slideFromRight}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full aspect-[3/4] rounded-[10px] md:rounded-[15px] lg:md:rounded-[30px] shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  src="/assets/rings.jpg"
                  alt="Jewelry"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Column 2 Row 2 */}
            <motion.div
              className="flex items-start justify-center"
              variants={imageVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full aspect-[4/5] rounded-[10px] md:rounded-[15px] lg:md:rounded-[30px] shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  src="/assets/baskets.jpg"
                  alt="Baskets"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Column 4 Row 2 */}
            <motion.div
              className="flex items-start justify-center"
              variants={imageVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full aspect-[4/5] rounded-[10px] md:rounded-[15px] lg:md:rounded-[30px] shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  src="/assets/shoes.jpg"
                  alt="Shoes"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated "Buy Smarter" Section */}
        <motion.div
          className="relative flex flex-col lg:flex-row items-center relative justify-center bg-white max-w-[1400px] my-24 lg:h-[100vh] mx-auto rounded-[50px] shadow-xl border border-black overflow-hidden"
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left text section */}
          <motion.div
            className="w-full lg:w-1/2 max-w-2xl space-y-6 md:space-y-8 flex flex-col justify-center text-left p-6 md:p-16 h-full relative z-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              variants={fadeInLeft}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.span
                className="bg-lime-300 px-8 py-4 font-bold rotate-[-5deg] text-[16px] md:text-[20px] inline-block"
                whileHover={{ rotate: [-5, 2, -5], scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Buy Smarter
              </motion.span>
              <p className="text-gray-700 mt-4 ml-4 text-[14px] md:text-[18px]">
                Discover budget-friendly deals, unique handmade goods, and
                second-hand treasures — all verified and trusted.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInLeft}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.span
                className="bg-purple-100 px-8 py-4 font-bold rotate-[5deg] text-[16px] md:text-[20px] inline-block"
                whileHover={{ rotate: [5, -2, 5], scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Sell Clutter
              </motion.span>
              <p className="text-gray-700 mt-4 ml-4 text-[14px] md:text-[18px]">
                Turn unused items into extra income with AI-backed listing tools
                and secure escrow payments.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInLeft}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.span
                className="bg-lime-300 px-8 py-4 font-bold rotate-[-5deg] text-[16px] md:text-[20px] inline-block"
                whileHover={{ rotate: [-5, 2, -5], scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Support Local
              </motion.span>
              <p className="text-gray-700 mt-4 ml-4 text-[14px] md:text-[18px]">
                Showcase local craftsmanship and connect with a community that
                values quality, authenticity, and fairness.
              </p>
            </motion.div>
          </motion.div>

          {/* Right image section */}
          <motion.div
            className="flex w-full h-full relative mb-[-20px] justify-end items-end"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.img
              src={sampleImage}
              alt="Shopping woman"
              className="w-full h-full object-contain  object-bottom mr-[-50px]"
            />
          </motion.div>

          {/* Animated Stars */}
          <motion.img
            src={starImage}
            alt="Star"
            className="absolute top-[15%] left-[48%] w-6 h-6 md:w-8 md:h-8"
            animate={{
              rotate: [0, 5, -5, 0],
              opacity: 1,
              scale: 1,
            }}
            transition={{
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: { delay: 0.5, duration: 0.5 },
              scale: { delay: 0.5, duration: 0.5 },
            }}
            initial={{ opacity: 0, scale: 0 }}
            viewport={{ once: true }}
          />

          <motion.img
            src={starImage}
            alt="Star"
            className="absolute top-[45%] left-[48%] w-6 h-6 md:w-8 md:h-8"
            animate={{
              rotate: [0, 5, -5, 0],
              opacity: 1,
              scale: 1,
            }}
            transition={{
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: { delay: 0.7, duration: 0.5 },
              scale: { delay: 0.7, duration: 0.5 },
            }}
            initial={{ opacity: 0, scale: 0 }}
            viewport={{ once: true }}
          />

          <motion.img
            src={starImage}
            alt="Star"
            className="absolute top-[20%] right-[3%] w-6 h-6 md:w-8 md:h-8"
            animate={{
              rotate: [0, 5, -5, 0],
              opacity: 1,
              scale: 1,
            }}
            transition={{
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: { delay: 0.9, duration: 0.5 },
              scale: { delay: 0.9, duration: 0.5 },
            }}
            initial={{ opacity: 0, scale: 0 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Animated Trust Features */}
        <motion.div
          className="mb-16 mt-24 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-3xl sm:text-5xl font-semibold text-[#1C341A] text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Trust Features
          </motion.h2>

          <motion.div
            className="grid lg:grid-cols-3 gap-10 max-w-[1400px] mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* AI Verification */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-8 py-16 rounded-xl shadow-lg text-center border border-[#1C341A]"
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                animate={floatingAnimation}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Ai className="w-30 h-30 text-green-600" />
              </motion.div>
              <h3 className="font-semibold mb-3 text-[16px] sm:text-[22px] text-[#1C341A]">
                AI Verification
              </h3>
              <p className="text-black text-[14px] sm:text-[18px] text-base">
                Protects against scams
              </p>
            </motion.div>

            {/* Escrow Payment */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-8 py-16 rounded-xl shadow-lg text-center border border-[#1C341A]"
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="rounded-2xl flex items-center justify-center mx-auto mb-6"
                animate={floatingAnimation}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <Money className="w-30 h-30 text-green-600" />
              </motion.div>
              <h3 className="font-semibold mb-3 text-[16px] sm:text-[22px] text-[#1C341A]">
                Escrow Payment
              </h3>
              <p className="text-black text-[14px] sm:text-[18px] text-base">
                Safe money handling until delivery
              </p>
            </motion.div>

            {/* Shop and Sell with Confidence */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-8 py-16 rounded-xl shadow-lg text-center border border-[#1C341A]"
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                animate={floatingAnimation}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <Handshake className="w-30 h-30 text-green-600" />
              </motion.div>
              <h3 className="font-semibold mb-3 text-[16px] sm:text-[22px] text-[#1C341A]">
                Shop and sell with confidence
              </h3>
              <p className="text-black text-[14px] sm:text-[18px] text-base">
                Community Trust Scores
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Inline Waitlist Form Section */}
        <motion.div
          className="mt-16 md:mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 py-16 md:p-12 max-w-[1400px] mx-auto">
            <div className="max-w-3xl mx-auto">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-semibold text-[#000000] mb-4">
                  Join waitlist
                </h2>
                <p className="text-[1.6em] md:text-[2.2em] text-gray-700 mb-2">
                  Be First to Experience{" "}
                  <span className="text-[#1C341A] font-semibold">Bidoro</span>
                </p>
                <p className="text-gray-600 text-[14px] md:text-[18px] leading-relaxed max-w-2xl mx-auto leading-[1.1em] px-4 tracking-[0.035em]">
                  Get early access, exclusive perks, and be part of a new era of
                  trust-based commerce.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="inline-name"
                    className="block text-sm font-semibold text-gray-700 mb-2 leading-[1.1em] px-4 tracking-[0.035em]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="inline-name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First Name, Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#1C341A] focus:border-[#1C341A] outline-none transition-colors text-base"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="inline-email"
                    className="block text-sm font-medium text-gray-700 mb-2 leading-[1.1em] px-4 tracking-[0.035em]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="inline-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="emailaddress@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#1C341A] focus:border-[#1C341A] outline-none transition-colors text-base"
                  />
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      className="text-red-500 text-sm text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* WhatsApp Number Field */}
                <div>
                  <label
                    htmlFor="inline-whatsapp"
                    className="block text-sm font-medium text-gray-700 mb-2 leading-[1.1em] px-4 tracking-[0.035em]"
                  >
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12.031 2.03c-5.527 0-9.999 4.472-9.999 9.999 0 1.792.496 3.454 1.354 4.908l-1.391 5.084 5.207-1.377c1.41.776 3.011 1.229 4.829 1.229h.005c5.526 0 10.001-4.471 10.001-9.999s-4.475-10.001-10.001-10.001zm0 18.232c-1.536 0-3.076-.445-4.409-1.294l-3.21.846.95-.3.155.009-.005.008-.005c-1.332-1.378-2.091-3.219-2.091-5.183 0-4.604 3.743-8.344 8.349-8.344s8.349 3.74 8.349 8.344c.001 4.605-3.743 8.349-8.349 8.349zm3.565-5.698c-.201-.1-.734-.366-.848-.407-.115-.042-.198-.057-.282.057-.084.114-.325.407-.398.49-.074.084-.148.099-.272.042-.125-.057-.527-.197-1.002-.62-.375-.333-.627-.745-.701-.86-.075-.114-.008-.175.066-.248.067-.067.149-.165.223-.248.075-.084.1-.143.149-.236.05-.093.025-.175-.012-.249-.036-.074-.329-.789-.452-1.071-.125-.282-.25-.236-.344-.236-.094 0-.201-.015-.308-.015-.107 0-.282.042-.43.21-.148.167-.566.557-.566 1.359 0 .802.58 1.574.664 1.689.083.114 1.144 1.745 2.766 2.457.408.179.725.269.967.359.349.129.67.108.924.066.273-.042.734-.3.848-.659.115-.365.115-.678.084-.734-.03-.057-.114-.084-.249-.142z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="inline-whatsapp"
                      name="whatsappNumber"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+234 801 234 5678"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#1C341A] focus:border-[#1C341A] outline-none transition-colors text-base"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-4">
                    We&apos;ll send you updates via WhatsApp
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1C341A] text-[#DEE563] py-4 px-6 rounded-full font-medium hover:bg-[#2A4A28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#DEE563]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    "Join waitlist"
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated "We are launching soon" section */}
      <motion.div
        className="max-w-full mx-auto my-8 mt-[8rem] relative overflow-hidden flex flex-col min-h-[500px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Centered text at the top */}
        <motion.div
          className="text-center p-4 md:p-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-5xl md:text-[7em] font-extrabold text-green-800 leading-none drop-shadow-lg"
            animate={{
              textShadow: [
                "0 0 0px rgba(34, 197, 94, 0)",
                "0 0 20px rgba(34, 197, 94, 0.3)",
                "0 0 0px rgba(34, 197, 94, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            We&apos;re launching
            <br />
            <span>Soon</span>
          </motion.h1>
        </motion.div>

        {/* Sand timer at the bottom right */}
        <motion.div
          className="mt-auto flex justify-end"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-[400px] md:w-[700px]"
            animate={floatingAnimation}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/assets/sandtimer.png"
              alt="Hourglass"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Animated Confetti images */}
        <motion.img
          src="/assets/Confetti Triangle.png"
          alt="Confetti triangle"
          className="absolute top-4 left-[9%] w-6 h-6 md:w-12 md:h-12 object-cover rounded-full shadow-lg rotate-30"
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 30 }}
          animate={{ rotate: [30, 35, 25, 30] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 },
            scale: { duration: 0.6, delay: 0.5 },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true }}
        />
        <motion.img
          src="/assets/Confetti Triangle.png"
          alt="Confetti triangle"
          className="absolute top-[200px] left-[29%] w-6 h-6 md:w-12 md:h-12 object-cover rounded-full shadow-lg rotate-[-30deg]"
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -30 }}
          animate={{ rotate: [-30, -25, -35, -30] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.7 },
            scale: { duration: 0.6, delay: 0.7 },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true }}
        />
        <motion.img
          src="/assets/Confetti Dot.png"
          alt="Confetti dot"
          className="absolute bottom-[300px] left-[150px] w-6 h-6 md:w-12 md:h-12 object-cover rounded-full shadow-lg rotate-90"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.9 },
            scale: { duration: 0.6, delay: 0.9 },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true }}
        />
        <motion.img
          src="/assets/Polygon 5.png"
          alt="Confetti polygon"
          className="absolute top-1/4 left-[200px] w-6 h-6 md:w-12 md:h-12 object-cover rounded-full shadow-lg -rotate-30"
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -30 }}
          animate={{ rotate: [-30, -25, -35, -30] }}
          transition={{
            opacity: { duration: 0.6, delay: 1.1 },
            scale: { duration: 0.6, delay: 1.1 },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true }}
        />
        <motion.img
          src="/assets/Confetti Square.png"
          alt="Confetti square"
          className="absolute bottom-[10px] left-[30px] w-6 h-6 md:w-12 md:h-12 object-cover rounded-full shadow-lg -rotate-12"
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
          animate={{ rotate: [-12, -7, -17, -12] }}
          transition={{
            opacity: { duration: 0.6, delay: 1.3 },
            scale: { duration: 0.6, delay: 1.3 },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true }}
        />
        <motion.img
          src="/assets/Confetti Arch.png"
          alt="Confetti arch"
          className="absolute top-64 right-60 w-6 h-6 md:w-12 md:h-12 object-cover rounded-full shadow-lg rotate-12"
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
          animate={{ rotate: [12, 17, 7, 12] }}
          transition={{
            opacity: { duration: 0.6, delay: 1.5 },
            scale: { duration: 0.6, delay: 1.5 },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true }}
        />
        <motion.img
          src="/assets/Confetti Ribbon.png"
          alt="Confetti ribbon"
          className="absolute top-8 right-8 w-6 h-6 md:w-12 md:h-12 object-cover rounded-full shadow-lg -rotate-45"
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -45 }}
          animate={{ rotate: [-45, -40, -50, -45] }}
          transition={{
            opacity: { duration: 0.6, delay: 1.7 },
            scale: { duration: 0.6, delay: 1.7 },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true }}
        />
        <motion.img
          src="/assets/Confetti Circle.png"
          alt="Confetti circle"
          className="absolute bottom-[650px] right-[200px] w-6 h-6 md:w-12 md:h-12 object-cover rounded-full shadow-lg rotate-45 z-30"
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 1.9 },
            scale: { duration: 0.6, delay: 1.9 },
            rotate: { duration: 0.6, delay: 1.9 },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Animated social media section */}
      <motion.div
        className="flex flex-col items-center justify-center p-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.p
          className="text-[16px] md:text-[20px] mb-4 md:mb-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          The market that works for you and not <br />
          the other way around.
        </motion.p>

        <motion.div
          className="flex space-x-4 md:space-x-6 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Social media icons with hover animations */}
          {[
            // LinkedIn, WhatsApp, Instagram, Twitter, TikTok SVGs
            <svg
              key="linkedin"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8 text-gray-600 hover:text-green-700 transition-colors cursor-pointer"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.762s.784-1.762 1.75-1.762 1.75.79 1.75 1.762-.783 1.762-1.75 1.762zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>,
            <svg
              key="whatsapp"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8 text-gray-600 hover:text-green-700 transition-colors cursor-pointer"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.031 2.03c-5.527 0-9.999 4.472-9.999 9.999 0 1.792.496 3.454 1.354 4.908l-1.391 5.084 5.207-1.377c1.41.776 3.011 1.229 4.829 1.229h.005c5.526 0 10.001-4.471 10.001-9.999s-4.475-10.001-10.001-10.001zm0 18.232c-1.536 0-3.076-.445-4.409-1.294l-3.21.846.95-.3.155.009-.005.008-.005c-1.332-1.378-2.091-3.219-2.091-5.183 0-4.604 3.743-8.344 8.349-8.344s8.349 3.74 8.349 8.344c.001 4.605-3.743 8.349-8.349 8.349zm3.565-5.698c-.201-.1-.734-.366-.848-.407-.115-.042-.198-.057-.282.057-.084.114-.325.407-.398.49-.074.084-.148.099-.272.042-.125-.057-.527-.197-1.002-.62-.375-.333-.627-.745-.701-.86-.075-.114-.008-.175.066-.248.067-.067.149-.165.223-.248.075-.084.1-.143.149-.236.05-.093.025-.175-.012-.249-.036-.074-.329-.789-.452-1.071-.125-.282-.25-.236-.344-.236-.094 0-.201-.015-.308-.015-.107 0-.282.042-.43.21-.148.167-.566.557-.566 1.359 0 .802.58 1.574.664 1.689.083.114 1.144 1.745 2.766 2.457.408.179.725.269.967.359.349.129.67.108.924.066.273-.042.734-.3.848-.659.115-.365.115-.678.084-.734-.03-.057-.114-.084-.249-.142z" />
            </svg>,
            <svg
              key="instagram"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8 text-gray-600 hover:text-green-700 transition-colors cursor-pointer"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.385.9.425.425.684.823.9 1.385.166.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.247 1.805-.413 2.227-.217.562-.477.96-.9 1.385-.425.425-.823.684-1.385.9-.422.166-1.057.36-2.227.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.053-1.805-.247-2.227-.413-.562-.217-.96-.477-1.385-.9-.425-.425-.684-.823-.9-1.385-.166-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.17.247-1.805.413-2.227.217-.562.477-.96.9-1.385.425-.425.823-.684 1.385-.9.422-.166 1.057-.36 2.227-.413 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.268 0-3.67.013-4.949.072-1.303.061-2.216.291-3.003.606-.795.319-1.44.755-2.088 1.403-.648.648-1.083 1.293-1.403 2.088-.315.787-.545 1.699-.606 3.003-.059 1.279-.072 1.681-.072 4.949s.013 3.67.072 4.949c.061 1.303.291 2.216.606 3.003.319.795.755 1.44 1.403 2.088.648.648 1.293 1.083 2.088 1.403.787.315 1.699.545 3.003.606 1.279.059 1.681.072 4.949.072s3.67-.013 4.949-.072c1.303-.061 2.216-.291 3.003-.606.795-.319 1.44-.755 2.088-1.403.648-.648 1.083-1.293 1.403-2.088.315-.787.545-1.699.606-3.003.059-1.279.072-1.681.072-4.949s-.013-3.67-.072-4.949c-.061-1.303-.291-2.216-.606-3.003-.319-.795-.755-1.44-1.403-2.088-.648-.648-1.293-1.083-2.088-1.403-.787-.315-1.699-.545-3.003-.606-1.279-.059-1.681-.072-4.949-.072zm0 5.867c-3.142 0-5.704 2.562-5.704 5.704s2.562 5.704 5.704 5.704 5.704-2.562 5.704-5.704c0-3.142-2.562-5.704-5.704-5.704zm0 9.22c-1.932 0-3.516-1.584-3.516-3.516s1.584-3.516 3.516-3.516 3.516 1.584 3.516 3.516-1.584 3.516-3.516 3.516zm6.301-11.234c0 .88-.714 1.594-1.594 1.594s-1.594-.714-1.594-1.594c0-.88.714-1.594 1.594-1.594s1.594.714 1.594 1.594z" />
            </svg>,
            <svg
              key="twitter"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8 text-gray-600 hover:text-green-700 transition-colors cursor-pointer"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.179-1.556-3.593-1.556-3.584 0-6.494 2.911-6.494 6.492 0 .509.058 1.002.167 1.474-5.399-.271-10.198-2.868-13.407-6.804-.561.968-.888 2.086-.888 3.284 0 2.262 1.152 4.254 2.908 5.424-.538-.016-1.04-.165-1.48-.407v.081c0 3.153 2.24 5.786 5.213 6.398-.546.149-1.127.23-1.727.23-.424 0-.834-.041-1.23-.116.829 2.583 3.235 4.475 6.094 4.527-2.224 1.748-5.041 2.793-8.093 2.793-.526 0-1.04-.03-1.547-.091 2.87 1.834 6.257 2.908 9.943 2.908 11.93 0 18.455-9.882 18.455-18.455 0-.281-.008-.562-.02-.843.91-1.042 1.7-2.353 2.324-3.832z" />
            </svg>,
            <svg
              key="tiktok"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8 text-gray-600 hover:text-green-700 transition-colors cursor-pointer"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.003 14.954h-1.996c-.552 0-1-.447-1-1v-2.148c0-.553.448-1 1-1h2c.552 0 1 .447 1 1v2.148c0 .553-.448 1-1 1zm8.003 0h-1.996c-.552 0-1-.447-1-1v-2.148c0-.553.448-1 1-1h2c.552 0 1 .447 1 1v2.148c0 .553-.448 1-1 1zm-4.004-1.954h-1.996c-.552 0-1-.447-1-1v-2.148c0-.553.448-1 1-1h2c.552 0 1 .447 1 1v2.148c0 .553-.448 1-1 1z" />
            </svg>,
          ].map((icon, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.2,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              {icon}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-xs md:text-sm mt-2 text-gray-500 flex items-center space-x-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-[16px] md:text-[20px] text-gray-300">
            © All Rights Reserved. Bidoro, Inc
          </span>
        </motion.div>
      </motion.div>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default BidoroLayout;

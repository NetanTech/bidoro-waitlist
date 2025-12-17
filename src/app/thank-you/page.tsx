"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/svgs/svg";

const ThankYouPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const successIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
    },
  };

  const floatingAnimation = {
    y: [0, -8, 0],
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-[-200px] right-[-200px] w-[600px] h-[400px] sm:w-[900px] sm:h-[900px]"
        style={{
          background:
            "radial-gradient(circle, #dee56340 0%, #dee56320 30%, #dee56310 50%, transparent 70%)",
        }}
      />

      {/* Floating confetti elements */}
      <motion.div
        className="absolute top-20 left-10 w-6 h-6 bg-lime-300 rounded-full"
        animate={floatingAnimation}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-4 h-4 bg-purple-200 rounded-full"
        animate={floatingAnimation}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-5 h-5 bg-lime-300 rounded-full"
        animate={floatingAnimation}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl w-full text-center relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Logo className="h-12 md:h-16 mx-auto" />
          </motion.div>

          {/* Success Icon */}
          <motion.div
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            variants={successIconVariants}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.3,
            }}
          >
            <motion.svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-[#1C341A] mb-4"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            You&apos;re In! 🎉
          </motion.h1>

          {/* Success message */}
          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Thanks for joining the{" "}
            <span className="text-[#1C341A] font-semibold">Bidoro</span>{" "}
            waitlist.
            <br className="hidden md:block" />
            We&apos;ll notify you as soon as we launch!
          </motion.p>

          {/* What's next section */}
          <motion.div
            className="bg-gray-50 rounded-xl p-6 mb-8"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="text-lg font-semibold text-[#1C341A] mb-4">
              What's next?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">📧</span>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Check your email
                </p>
                <p className="text-xs text-gray-600">Confirmation sent</p>
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🚀</span>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Early access
                </p>
                <p className="text-xs text-gray-600">
                  You&apos;ll be first to know
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Exclusive perks
                </p>
                <p className="text-xs text-gray-600">Launch discounts</p>
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">💬</span>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  WhatsApp Updates
                </p>
                <p className="text-xs text-gray-600">
                  We&apos;ll message you there too
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional message */}
          <motion.div
            className="bg-lime-50 border border-lime-200 rounded-xl p-4 mb-8"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm text-[#1C341A] font-medium">
              💡 <strong>Spread the word!</strong> Share Bidoro with friends and
              family who love smart shopping and sustainable commerce.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className=" "
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-[#1C341A] text-[#DEE563] px-8 py-3 rounded-full font-medium hover:bg-[#2A4A28] transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>

              <motion.button
                className="inline-flex items-center justify-center border-2 border-[#1C341A] text-[#1C341A] px-8 py-3 rounded-full font-medium hover:bg-[#1C341A] hover:text-[#DEE563] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Join Bidoro Waitlist",
                      text: "Check out Bidoro - the future of local commerce!",
                      url: window.location.origin,
                    });
                  } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(window.location.origin);
                    alert("Link copied to clipboard!");
                  }
                }}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                Share with Friends
              </motion.button>
            </div>

            <Link
              href="https://whatsapp.com/channel/0029VbC4Cq2JP218bDvvPq0r"
              className="flex items-center justify-center bg-[#1C341A] text-[#DEE563] px-8 py-3 rounded-full font-medium hover:bg-[#2A4A28] transition-colors"
            >
              Join Our Community on Whatsapp
            </Link>
          </motion.div>

          {/* Social media follow section */}
          <motion.div
            className="mt-8 pt-6 border-t border-gray-200"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm text-gray-600 mb-4">
              Stay connected for updates
            </p>
            <div className="flex justify-center space-x-4">
              {/* Social media icons */}
              <motion.a
                href="#"
                className="text-gray-400 hover:text-[#1C341A] transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.762s.784-1.762 1.75-1.762 1.75.79 1.75 1.762-.783 1.762-1.75 1.762zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="text-gray-400 hover:text-[#1C341A] transition-colors"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.385.9.425.425.684.823.9 1.385.166.422.36 1.057.413 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.247 1.805-.413 2.227-.217.562-.477.96-.9 1.385-.425.425-.823.684-1.385.9-.422.166-1.057.36-2.227.413-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.053-1.805-.247-2.227-.413-.562-.217-.96-.477-1.385-.9-.425-.425-.684-.823-.9-1.385-.166-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.17.247-1.805.413-2.227.217-.562.477-.96.9-1.385.425-.425.823-.684 1.385-.9.422-.166 1.057-.36 2.227-.413 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.268 0-3.67.013-4.949.072-1.303.061-2.216.291-3.003.606-.795.319-1.44.755-2.088 1.403-.648.648-1.083 1.293-1.403 2.088-.315.787-.545 1.699-.606 3.003-.059 1.279-.072 1.681-.072 4.949s.013 3.67.072 4.949c.061 1.303.291 2.216.606 3.003.319.795.755 1.44 1.403 2.088.648.648 1.293 1.083 2.088 1.403.787.315 1.699.545 3.003.606 1.279.059 1.681.072 4.949.072s3.67-.013 4.949-.072c1.303-.061 2.216-.291 3.003-.606.795-.319 1.44-.755 2.088-1.403.648-.648 1.083-1.293 1.403-2.088.315-.787.545-1.699.606-3.003.059-1.279.072-1.681.072-4.949s-.013-3.67-.072-4.949c-.061-1.303-.291-2.216-.606-3.003-.319-.795-.755-1.44-1.403-2.088-.648-.648-1.293-1.083-2.088-1.403-.787-.315-1.699-.545-3.003-.606-1.279-.059-1.681-.072-4.949-.072zm0 5.867c-3.142 0-5.704 2.562-5.704 5.704s2.562 5.704 5.704 5.704 5.704-2.562 5.704-5.704c0-3.142-2.562-5.704-5.704-5.704zm0 9.22c-1.932 0-3.516-1.584-3.516-3.516s1.584-3.516 3.516-3.516 3.516 1.584 3.516 3.516-1.584 3.516-3.516 3.516zm6.301-11.234c0 .88-.714 1.594-1.594 1.594s-1.594-.714-1.594-1.594c0-.88.714-1.594 1.594-1.594s1.594.714 1.594 1.594z" />
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="text-gray-400 hover:text-[#1C341A] transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.179-1.556-3.593-1.556-3.584 0-6.494 2.911-6.494 6.492 0 .509.058 1.002.167 1.474-5.399-.271-10.198-2.868-13.407-6.804-.561.968-.888 2.086-.888 3.284 0 2.262 1.152 4.254 2.908 5.424-.538-.016-1.04-.165-1.48-.407v.081c0 3.153 2.24 5.786 5.213 6.398-.546.149-1.127.23-1.727.23-.424 0-.834-.041-1.23-.116.829 2.583 3.235 4.475 6.094 4.527-2.224 1.748-5.041 2.793-8.093 2.793-.526 0-1.04-.03-1.547-.091 2.87 1.834 6.257 2.908 9.943 2.908 11.93 0 18.455-9.882 18.455-18.455 0-.281-.008-.562-.02-.843.91-1.042 1.7-2.353 2.324-3.832z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Footer note */}
          <motion.p
            className="text-xs text-gray-500 mt-6"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            © 2025 Bidoro, Inc. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYouPage;

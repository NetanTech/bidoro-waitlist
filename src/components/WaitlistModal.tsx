"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          whatsappNumber,
          referralSource: 'modal_popup'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Close modal and redirect to thank-you page
      onClose();
      router.push('/thank-you');
      
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#ffffff60] bg-opacity-50 backdrop-blur-[2.5px] z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-[600px] w-full mx-4 relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
              >
                ×
              </button>

              {/* Modal Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Join waitlist
                </h2>
                <p className="text-lg text-gray-700 mb-2">
                  Be First to Experience <span className="text-[#1C341A] font-semibold">Bidoro</span>
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  get early access, exclusive perks, and be part<br />
                  of a new era of trust-based commerce.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First Name, Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#1C341A] focus:border-[#1C341A] outline-none transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="emailaddress@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#1C341A] focus:border-[#1C341A] outline-none transition-colors"
                  />
                </div>

                {/* WhatsApp Number Field */}
                <div>
                  <label htmlFor="modal-whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg 
                        className="h-5 w-5 text-gray-400" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M12.031 2.03c-5.527 0-9.999 4.472-9.999 9.999 0 1.792.496 3.454 1.354 4.908l-1.391 5.084 5.207-1.377c1.41.776 3.011 1.229 4.829 1.229h.005c5.526 0 10.001-4.471 10.001-9.999s-4.475-10.001-10.001-10.001zm0 18.232c-1.536 0-3.076-.445-4.409-1.294l-3.21.846.95-.3.155.009-.005.008-.005c-1.332-1.378-2.091-3.219-2.091-5.183 0-4.604 3.743-8.344 8.349-8.344s8.349 3.74 8.349 8.344c.001 4.605-3.743 8.349-8.349 8.349zm3.565-5.698c-.201-.1-.734-.366-.848-.407-.115-.042-.198-.057-.282.057-.084.114-.325.407-.398.49-.074.084-.148.099-.272.042-.125-.057-.527-.197-1.002-.62-.375-.333-.627-.745-.701-.86-.075-.114-.008-.175.066-.248.067-.067.149-.165.223-.248.075-.084.1-.143.149-.236.05-.093.025-.175-.012-.249-.036-.074-.329-.789-.452-1.071-.125-.282-.25-.236-.344-.236-.094 0-.201-.015-.308-.015-.107 0-.282.042-.43.21-.148.167-.566.557-.566 1.359 0 .802.58 1.574.664 1.689.083.114 1.144 1.745 2.766 2.457.408.179.725.269.967.359.349.129.67.108.924.066.273-.042.734-.3.848-.659.115-.365.115-.678.084-.734-.03-.057-.114-.084-.249-.142z"/>
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="modal-whatsapp"
                      name="whatsappNumber"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+234 801 234 5678"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#1C341A] focus:border-[#1C341A] outline-none transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-4">
                    We&apos;ll send you updates via WhatsApp
                  </p>
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1C341A] text-[#DEE563] py-3 px-6 rounded-full font-medium hover:bg-[#2A4A28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#DEE563]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining...
                    </span>
                  ) : 'Join waitlist'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
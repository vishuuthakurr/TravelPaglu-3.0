'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle, Compass, Instagram, Youtube, Twitter } from 'lucide-react';

const FAQS = [
  {
    q: 'How are budgets on TravelPaglu calculated?',
    a: 'Every budget is calculated from actual first-hand journeys: ordinary government state bus fares (e.g. HRTC / UPSRTC), hostel bunk bed or homestay nightly rates, local meals from street stalls, and shared auto/scooty rentals.',
  },
  {
    q: 'Can I submit my own personal travel diary?',
    a: 'Yes! We encourage authentic, non-commercial travelers to submit their itineraries. Drop us a message with your route notes, photos, and itemized costs; our creator team reviews and verifies before publishing.',
  },
  {
    q: 'Are these routes safe for first-time solo travelers?',
    a: 'Absolutely. We exclusively recommend tested hostels with student communities, verified public bus stands, and daylight route options tailored specifically for college students and beginners.',
  },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f3]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Connect with TravelPaglu</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
            Get in Touch & Ask Questions
          </h1>
          <p className="text-xs sm:text-base text-forest-700">
            Have a question about a bus route, want to suggest an offbeat destination, or say hello? We’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-6">
            <h3 className="font-serif text-xl font-bold text-forest-900">
              Send a Note to the Creator
            </h3>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-emerald-950">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you for reaching out. We will get back to your email within 24 hours with travel tips!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-emerald-800 underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                    Subject / Destination
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Query regarding Delhi to Manali HRTC bus timings"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-800 uppercase tracking-wider mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your question, feedback, or trip suggestion here..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-forest-200 rounded-xl focus:ring-2 focus:ring-forest-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: FAQs & Socials */}
          <div className="lg:col-span-5 space-y-6">
            {/* Socials Card */}
            <div className="p-6 rounded-3xl bg-forest-900 text-white shadow-clay space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-terracotta-400" />
                <h3 className="font-serif text-lg font-bold text-earth-100">TravelPaglu Community</h3>
              </div>
              <p className="text-xs text-forest-200 leading-relaxed">
                Follow our on-ground student journeys, raw reels without color grading, and budget updates:
              </p>
              <div className="flex gap-3 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-forest-800 hover:bg-terracotta-600 text-white transition flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-forest-800 hover:bg-terracotta-600 text-white transition flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-forest-800 hover:bg-terracotta-600 text-white transition flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Twitter className="w-4 h-4" />
                  <span>X / Twitter</span>
                </a>
              </div>
            </div>

            {/* FAQs Accordion Block */}
            <div className="p-6 rounded-3xl bg-white border border-forest-100 shadow-clay space-y-4">
              <div className="flex items-center gap-2 text-forest-900 font-serif font-bold text-lg">
                <HelpCircle className="w-5 h-5 text-terracotta-600" />
                <span>Frequently Asked Questions</span>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-forest-50/50 border border-forest-100 space-y-1">
                    <h5 className="text-xs font-bold text-forest-900">{faq.q}</h5>
                    <p className="text-xs text-forest-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

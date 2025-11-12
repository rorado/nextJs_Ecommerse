'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/400?u=sarah-johnson",
      bio: "Sarah founded EliteShop with a vision to make premium fashion accessible to everyone."
    },
    {
      name: "Michael Chen",
      role: "Head of Design",
      image: "https://i.pravatar.cc/400?u=michael-chen",
      bio: "Michael brings over 10 years of fashion design experience to our creative team."
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Manager",
      image: "https://i.pravatar.cc/400?u=emily-rodriguez",
      bio: "Emily ensures our operations run smoothly and our customers are always satisfied."
    },
    {
      name: "David Kim",
      role: "Sustainability Director",
      image: "https://i.pravatar.cc/400?u=david-kim",
      bio: "David leads our commitment to sustainable and ethical fashion practices."
    }
  ];

  const values = [
    {
      icon: "material-symbols:eco-outline",
      title: "Sustainability",
      description: "We&apos;re committed to environmental responsibility in every aspect of our business."
    },
    {
      icon: "material-symbols:verified-outline",
      title: "Quality",
      description: "Every product is carefully selected and tested to meet our high standards."
    },
    {
      icon: "material-symbols:diversity-3-outline",
      title: "Inclusivity",
      description: "Fashion for everyone, regardless of size, style, or background."
    },
    {
      icon: "material-symbols:handshake-outline",
      title: "Community",
      description: "Building connections and supporting our customers&apos; journey."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle at 40% 40%, var(--color-primary), transparent 60%)' }} />
          <div className="absolute -bottom-24 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle at 60% 60%, var(--color-secondary), transparent 60%)' }} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl font-light text-[color:var(--color-text)] mb-4">About EliteShop</h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
            Crafting exceptional fashion experiences since 2018
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-[color:var(--color-surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-[color:var(--color-text)] mb-6">Our Story</h2>
            <div className="prose prose-lg prose-gray max-w-none text-left text-[color:var(--color-text)]">
              <p>
                Founded in 2018, EliteShop began as a simple idea: to make premium, 
                sustainable fashion accessible to everyone. What started as a small 
                boutique has grown into a global community of fashion enthusiasts 
                who value quality, style, and ethical practices.
              </p>
              <p>
                We believe that great fashion should not come at the expense of 
                our planet or the people who make our clothes. That&apos;s why we work 
                exclusively with suppliers who share our commitment to fair labor 
                practices and environmental responsibility.
              </p>
              <p>
                Today, EliteShop serves customers in over 50 countries, but our 
                mission remains the same: to provide beautiful, well-made clothing 
                that makes you feel confident and look great, while making a 
                positive impact on the world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[color:var(--color-elevated)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-[color:var(--color-text)] mb-4">Our Values</h2>
            <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              These core principles guide everything we do and shape our commitment to you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[color:var(--color-surface)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon={value.icon} className="text-[color:var(--color-primary)] text-2xl" />
                </div>
                <h3 className="font-medium text-[color:var(--color-text)] mb-2">{value.title}</h3>
                <p className="text-sm text-[color:var(--color-text-muted)]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-[color:var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-[color:var(--color-text)] mb-4">Meet Our Team</h2>
            <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              The passionate individuals behind EliteShop who make it all possible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="font-medium text-[color:var(--color-text)] mb-1">{member.name}</h3>
                <p className="text-[color:var(--color-primary)] text-sm mb-2">{member.role}</p>
                <p className="text-[color:var(--color-text-muted)] text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-primary-dark)] text-[color:var(--color-primary-contrast)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-3xl font-medium mb-2">50K+</div>
              <div className="opacity-80">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-medium mb-2">500+</div>
              <div className="opacity-80">Products</div>
            </div>
            <div>
              <div className="text-3xl font-medium mb-2">50+</div>
              <div className="opacity-80">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-medium mb-2">6</div>
              <div className="opacity-80">Years of Excellence</div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
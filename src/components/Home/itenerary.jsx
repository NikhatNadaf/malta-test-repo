import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";

const Iteneray = () => {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const floatingAnimation = {
    y: [-8, 8],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="lg:p-8 sm:px-6 lg:px-12"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-48 justify-between items-start lg:items-center"
      >
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Create Your Own Perfect Itinerary
        </p>
        <p className="text-base sm:text-lg md:text-xl md:text-right max-w-xl">
          Customize your trip based on what you love. Whether you're an
          adventure-seeker, a foodie, or a culture enthusiast, we'll help you
          craft the perfect experience.
        </p>
      </motion.div>

      {/* Main Content Section */}
      <motion.div variants={itemVariants} className="relative mt-6 md:mt-12">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          className="w-full"
        >
          <Image
            src="/back-p.svg"
            className="w-full max-md:hidden object-cover"
            width={1000}  
            height={1000}
            alt="Itinerary background"
          />
        </motion.div>

        {/* Content Overlay */}
        <motion.div
          variants={itemVariants}
          animate={floatingAnimation}
          className="lg:absolute bottom-[10%] left-8 w-full p-4 sm:p-6 lg:p-12 lg:pr-0 max-lg:bg-[#E03737] max-lg:rounded-lg lg:mt-0 mt-4"
        >
          <div>
            <Button
              variant="secondary"
              className="mt-6 lg:mt-72 py-8 px-16 text-xl font-bold lg:ml-4 max-lg:w-full relative overflow-hidden group"
              size="lg"
              asChild
            >
              <Link href="/search">
                <span className="absolute inset-0 bg-white/20" />
                Start Exploring
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Iteneray;

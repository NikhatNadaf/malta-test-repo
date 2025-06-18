import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

function Banner({ url, children }) {
  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className="mx-2 sm:mx-6 md:mx-8 lg:mx-20 mt-8 relative rounded-xl shadow-lg overflow-hidden"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Background Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/30 z-10 rounded-xl"
        variants={overlayVariants}
      />

      {/* Image Container */}
      <motion.div
        className="relative w-full"
        variants={imageVariants}
      >
        <Image
          width={1920}
          height={1080}
          className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover rounded-xl"
          src={url}
          alt="Banner background"
          priority
          quality={100}
        />
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20 p-4 sm:p-6 md:p-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="text-center max-w-[90%]"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Banner;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { maltapass } from "@/data/link";
import { motion } from "framer-motion";

const MaltaPass = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="w-full lg:p-8 lg:px-3 py-10 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 items-center lg:gap-12 gap-5"
      >
        {/* SECTION 1 */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black">
            Maltapass – Explore More, Pay Less
          </h2>

        </motion.div>

        {/* SECTION 2 */}
        <motion.div className="space-y-6" variants={itemVariants}>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl text-black">
            Introducing Maltapass – Exclusive Discounts for Your Stay
          </h3>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl">
            Unlock free discounts on top attractions, dining, and more with
            Maltapass. Available for 1-day or 1-week, it's the perfect way to save
            while you explore.
          </p>

          <motion.div variants={itemVariants}>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="rounded-lg border-black text-black px-8 py-4 mt-0"
            >
              <h1 href={maltapass}>Coming Soon !</h1>
            </Button>
          </motion.div>

          {/* <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700">
            Coming Soon !
          </h3> */}
        </motion.div>

        {/* SECTION 3 */}
        <motion.div variants={itemVariants}>
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-md">
            <Image
              src="/images/maltapass.svg"
              className="object-cover"
              alt="Malta Pass background"
              fill
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MaltaPass;

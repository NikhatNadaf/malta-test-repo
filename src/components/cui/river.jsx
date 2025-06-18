import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { search } from "@/data/link";
import { motion } from "framer-motion";

export const River = () => {
  return (
    <div className="p-3">

      <div className="relative min-h-[60vh] w-full px-4 sm:px-8 md:px-20">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            fill
            src="/images/river.png"
            alt="River background"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/50" />
        </div>

        {/* Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative h-full min-h-[60vh] flex items-center justify-center"
        >
          <div className="max-w-3xl w-full flex flex-col items-center justify-center gap-6 text-center px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              Ready to Experience Malta Like Never Before?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl"
            >
              Start exploring now and book the best tours, activities, and dining
              experiences on the island.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="w-fit relative overflow-hidden group"
              >
                <Link href={search}>
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  Start Exploring
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

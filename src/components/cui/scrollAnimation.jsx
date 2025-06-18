import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollAnimation = () => {
  const controls = useAnimation(); // Controls for animation
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 }, // Start state
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // End state
  };

  return (
    <motion.div
      ref={ref} // Attach the ref to the element
      initial="hidden" // Initial state
      animate={controls} // Animation controls
      variants={variants} // Variants for animations
      className="p-4 bg-blue-200 rounded-lg"
    >
      <h2>Scroll to Reveal Me!</h2>
    </motion.div>
  );
};

export default ScrollAnimation;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Faq from "@/components/cui/faq";
import { River } from "@/components/cui/river";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supplierRegistration } from "@/data/link";
import Tilt from "react-parallax-tilt";
import { Separator } from "@/components/ui/separator";

function supplier() {
  const DEALS = [
    {
      name: "Unlock Unmatched Local Expertise",
      description:
        "Partner with MaltaXplore to bring unparalleled knowledge of Malta's hidden gems to your clients, adding value through authentic, locally-curated experiences that only insiders can provide.",
    },
    {
      name: "Boost Your Brand with Exclusive Offerings",
      description:
        "Stand out by offering unique, captivating travel experiences that set you apart in a competitive market—crafted with MaltaXplore's deep understanding of Malta's rich culture and landscapes.",
    },
    {
      name: "Reliability and Dedicated Support",
      description:
        "Count on a reliable partnership backed by consistent support and competitive pricing, ensuring a seamless experience for both your team and clients every step of the way.",
    },
  ];
  const PARTNERS = [
    {
      title: "Access Authentic Malta Experiences",
      description:
        "Enhance your offerings with exclusive, locally-designed Malta journeys, providing clients with unforgettable, unique experiences.",
    },
    {
      title: "Flexible Partnership Packages",
      description:
        "Enjoy tailored partnership options to fit your business needs, allowing you to adapt and grow easily.",
    },
    {
      title: "Competitive Rates and Support",
      description:
        "Receive dedicated assistance, marketing support, and excellent rates, ensuring a seamless and rewarding partnership.",
    },
    {
      title: "Boost Brand and Loyalty",
      description:
        "Strengthen your brand's reputation and build client loyalty by offering memorable, high-quality Malta adventures.",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 },
  };

  const slideIn = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6 },
  };

  return (
    <main className="">
      <div className="bg-gradient-to-br from-primary-foreground to-transparent p-3">
        {/* Hero Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="flex max-lg:flex-col gap-8 items-center px-4 md:px-16 lg:px-20 lg:py-16 py-8"
        >
          <motion.div variants={slideIn} className="flex-1 flex flex-col gap-8">
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-7xl leading-[1.3] font-bold mt-0"
            >
              Join Malta's
              <br />
              Leading Tourism
              <br /> Platform
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl leading-[1.3] text-muted-foreground"
            >
              Thank you for choosing to partner with
              <br />
              MaltaXplore, the go-to platform for booking <br />
              tours, experiences, and services in Malta.
            </motion.p>

            <Button
              asChild
              size="lg"
              className="w-fit relative overflow-hidden group"
            >
              <a
                href="https://panel.maltaxplore.com/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                Get Started Now
              </a>
            </Button>
          </motion.div>
          <motion.div variants={scaleIn} className="flex-1">
            <Image
              width={500}
              height={500}
              className="object-contain ms-auto"
              src="/images/hero_supplier.png"
              alt="Hero supplier"
            />
          </motion.div>
        </motion.div>
      </div>
      {/* Steps */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="p-8 border-2 text-center rounded-2xl border-primary/50 my-16 md:my-16 mx-4 md:mx-8 "
      >
        <motion.p variants={fadeInUp} className="text-3xl font-bold mb-3">
          Simple Process to Become Partner
        </motion.p>
        <br />
        <div className="relative ">
          <Image
            src="/images/supplier_steps.svg"
            width={1000}
            height={1000}
            className="w-full max-lg:hidden"
            alt="Supplier steps"
          />
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:absolute w-full top-8 xl:top-24 mt-3 left-0"
          >
            <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
              <motion.div variants={fadeInUp} className="flex-1 lg:mt-8">
                <p className="font-bold text-xl">Register Your Plan</p>
                <br />
                <p className="w-[90%] lg:w-[70%] mx-auto ">
                  Complete a simple registration process and work with us to
                  design a partnership package tailored to your business needs.
                </p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex-1 lg:mt-0"
              >
                <p className="font-bold text-xl">Connect with Our Team</p>
                <br />
                <p className="w-[90%] lg:w-[70%] mx-auto">
                  Start by reaching out to discuss your goals and how a
                  partnership can enhance your offerings.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex-1  lg:mt-8">
                <p className="font-bold text-xl">Grow up Together</p>
                <br />
                <p className="w-[90%] lg:w-[70%] mx-auto">
                  Begin offering exclusive Malta experiences to your clients,
                  supported by our team every step of the way.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Deals */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="px-4 md:px-8 lg:px-20 text-center"
      >
        <p
          variants={fadeInUp}
          className="text-2xl md:text-3xl font-bold mb-16"
        >
          Best Partnership Deal
          <br className="md:hidden" />
          With MaltaXplore?
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
          {DEALS.map((item, idx) => (
            <div
              key={idx}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6  h-full">
                <CardHeader>
                  <p className="font-bold text-lg md:text-xl">{item.name}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Benifits */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="p-8 md:px-8 md:py-8 grid grid-cols-1 lg:grid-cols-2 place-content-center mt-24 mb-12 mx-4 md:mx-8 lg:mx-20 text-center bg-red-100 cut_corner"
      >
        <motion.div variants={slideIn} className="flex-1">
          <Image
            width={500}
            height={500}
            className="object-contain self-end w-full mb-5"
            src="/images/benefits_supplier.svg"
            alt="Benefits supplier"
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <p variants={fadeInUp} className="text-3xl font-bold">
            Benefit of Become Partner
          </p>
          <div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-8 text-left"
          >
            {PARTNERS.map((item, index) => (
              <div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-bold text-xl">{item.title}</p>
                <br />
                <p>{item.description}</p>
              </div>
            ))}

            <Button
              asChild
              size="lg"
              className="w-fit relative overflow-hidden group"
            >
              <a
                href="https://panel.maltaxplore.com/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                Get Started Now
              </a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Faq
          data={[
            {
              question: "What are the benefits of partnering with MaltaXplore?",
              answer:
                "By partnering with MaltaXplore, you gain access to exclusive, locally-curated experiences, competitive pricing, and dedicated support, helping you provide unique value to your clients.",
            },
            {
              question: "How do I register as a partner?",
              answer:
                "By partnering with MaltaXplore, you gain access to exclusive, locally-curated experiences, competitive pricing, and dedicated support, helping you provide unique value to your clients.",
            },
            {
              question: "What type of businesses can partner with MaltaXplore?",
              answer:
                "By partnering with MaltaXplore, you gain access to exclusive, locally-curated experiences, competitive pricing, and dedicated support, helping you provide unique value to your clients.",
            },
            {
              question: "Is there a minimum commitment required to partner?",
              answer:
                "By partnering with MaltaXplore, you gain access to exclusive, locally-curated experiences, competitive pricing, and dedicated support, helping you provide unique value to your clients.",
            },
            {
              question:
                "Will my business receive marketing support from MaltaXplore?",
              answer:
                "By partnering with MaltaXplore, you gain access to exclusive, locally-curated experiences, competitive pricing, and dedicated support, helping you provide unique value to your clients.",
            },
          ]}
        />
      </motion.div>
      <Separator className="my-5" />
      <River />
    </main>
  );
}

export default supplier;

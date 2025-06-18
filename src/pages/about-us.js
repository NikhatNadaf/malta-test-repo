import Section from "@/components/ui/Section";
import Banner from "@/components/cui/banner";
import ContactForm from "@/components/cui/contactForm";
import { LinkedinIcon, TwitterIcon, InstagramIcon } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const teamMembers = [
  {
    id: 1,
    name: "Selena Smite",
    role: "Expert Team Guide",
    image:
      "https://s3-alpha-sig.figma.com/img/4f19/d451/e86fb8f152473931f274cf7a73a7ced2?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eQZ1eqrzdPuES1oznlA8Lm4nC-2tPPQJGICjw1J6kSBUUPPOWQUc~jIjDH19XpIxhSAVU-HUsAQVQX9ZLdocxiEp2vhbAZEVjL38IE-ypAdbV6atwoaeoMBPLEYifZmC9M5Wj44yCcg0nXX6fdm14XsZE-IFR63miCP3ZISP4uhT48wN4AGnuRjPfbWCjCAPV7HGi4OrtDq~bEE9Mj2ZgI4Ht5c3juPSEggFL4-0ojNRBQEifU82U7KP5Z-B5bsB2V-TtJkwt9uEl~-bB4l1fn0rRTNkwWtiK1j1MoJyU6juXiVCOryUzHd071A79MCONuriFXGCmrwtGQ2sjDlFyw__",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    id: 2,
    name: "Marco Rivera",
    role: "Expert Team Guide",
    image:
      "https://s3-alpha-sig.figma.com/img/46f8/39b4/b5419fc961bfe2f09951830ccc8691ad?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VTPjkHhbH7eQ3nCXw~GLHVhrtHqEGqNJoVSjomfpocR4AY4Sd7-YibrpbESqKVD2gvPm31ekMyUvMZGPx9whiKB7TNnfrbNo2RU3EE3eQh5i31R180nTQQLLvHtIDu-YqHFgEF9~zqWEsvgK2JIHpkO6ylmeOeZemlN3skFfVjGs4~XST8JPONIbnhokxYej1gYla1~fbrd4f~ST66RUy6NTOfSfGh2s567TPokV9iyMKp85Swhw-W56P6-vaAG2uxGuWKhnoObGFC55A1352DmIv2mSZgyFd62iVRY4jQrBqf-pEns01wJv0S-dPsGyZGriS6aj2E1QmUjAT6wi0A__",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Expert Team Guide",
    image:
      "https://s3-alpha-sig.figma.com/img/f93f/b915/f6a596df6e82c3005a11cf0050875142?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hDBQzb-mY9HdT1vJ0YehoJierf01qEcrlk8AFKeoxUQo-ClEHfFlmvaP7JiRu3L3gIqizgeQEG-6iL8ZzFFxa0VTBctyKB1SJ88u0kaMaYAs2Oriy4PtNcnA7mYXyZjUliI-J~~z7V08w3sxrS2ox~OERODAZzkjPIoaMRuMLPRpYkgVyuJvEd5Rl18Mp0FFUV328tUF7QXSUv8OOn9GkvBFFnZHihqxqygTljEpmmAHuW39Og~T2xHwVJOuIaLtkPMhexHGYwQ~Jc8lGQovgJ~7O97FUaozf74ybeOuVz6nJgnec0-LzbR1~b6n7HzsXfMA9U-lFHS~iqva5-zKRA__",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
];

const Aboutus = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const slideIn = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const cardHover = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const imageHover = {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#fff5f5]">
      <main className="p-3">
        {/* Hero Banner with enhanced animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Banner url="/about-us-banner.jpg">
            <motion.h1
              initial={{ y: 50, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 200,
              }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mt-0"
            >
              About Us
            </motion.h1>
          </Banner>
        </motion.div>

        {/* Welcome Section with enhanced animations */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative py-3"
        >
          <div className="mx-2 sm:mx-6 md:mx-8 lg:mx-20 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 sm:gap-6 lg:gap-8">
            {/* Left content with enhanced animations */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-0 mb-6">
                Welcome to MaltaXplore
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                Your ultimate guide to discovering the rich heritage, stunning
                landscapes, and vibrant culture of Malta.
              </p>
              <p className="text-gray-600 mb-4">
                Whether you're planning a relaxing getaway, an adventure-filled
                trip, or exploring Malta's history and traditions, MaltaXplore
                is here to make your journey unforgettable.
              </p>
              <p className="text-gray-600">
                As a team of passionate locals and travel enthusiasts, we bring
                together firsthand knowledge and insider tips to help you
                explore Malta like never before.
              </p>
            </div>

            {/* Right images grid with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative h-[400px] md:h-[600px] mt-8 md:mt-16"
            >
              {/* Top right image */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                whileHover={imageHover.hover}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute right-0 top-0 w-[80%] h-[80%] md:w-[70%] md:h-[90%] rounded-2xl overflow-hidden z-20"
              >
                <motion.img
                  src="/malta-arial-view.png"
                  alt="Malta aerial view"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Floating images with enhanced animations */}
              <motion.div
                variants={floatingAnimation}
                animate="animate"
                className="absolute left-0 md:left-16 top-[10%] w-[45%] h-[40%] md:w-[40%] md:h-[30%] rounded-2xl overflow-hidden z-30 shadow-xl bg-white p-2 px-0"
              >
                <motion.img
                  src="/malta-church.png"
                  alt="Malta church"
                  className="w-full h-full object-cover rounded-xl"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <motion.div
                variants={floatingAnimation}
                animate="animate"
                className="absolute left-[10%] md:left-[0%] bottom-[10%] md:bottom-[18%] w-[45%] h-[40%] rounded-2xl overflow-hidden z-30 shadow-xl bg-white p-2"
              >
                <motion.img
                  src="malta-harbor.png"
                  alt="Malta harbor"
                  className="w-full h-full object-cover rounded-xl"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Story Section */}
        <section className="relative py-4 sm:py-4  lg:py-4 bg-white">
          <div className="mx-2 sm:mx-6 md:mx-8 lg:mx-20">
            <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
              {/* Left side with image */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="w-full lg:w-1/2 relative"
              >
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold absolute ps-2 left-0 rounded-tr-2xl z-10">
                  Our Story
                </h2>
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={"/images/ourstory.png"}
                    alt="Malta coastal village"
                    className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>

              {/* Right side with text */}
              <div className="w-full lg:w-1/2 bg-white p-6 md:p-8 rounded-2xl shadow-sm mt-8 md:mt-12">
                <p className="text-lg md:text-xl text-gray-800 mb-6">
                  MaltaXplore began with a simple idea: to share the unmatched
                  beauty and rich culture of Malta with the world.
                </p>
                <p className="text-base md:text-lg text-gray-600">
                  Driven by a love for Malta's history, stunning vistas, and
                  warm hospitality, we set out to create a space where visitors
                  can find authentic insights and practical advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CEO Section */}
        {/* <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-8 sm:py-12 relative"
        >
          <div className="px-4 sm:px-6">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto my-8">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <span className="text-[#E5484D] text-4xl md:text-6xl font-serif">"</span>
                <h2 className="text-xl md:text-2xl lg:text-4xl font-bold px-4">
                  At MaltaXplore, we aim to inspire and guide travelers,
                  ensuring every visit to Malta is unforgettable and authentic.
                </h2>
                <span className="text-[#E5484D] text-4xl md:text-6xl font-serif rotate-180 mb-0 md:mb-12">
                  "
                </span>
              </div>

              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <img
                  src="/founder.png"
                  alt="Cleven D'amato"
                  className="w-24 h-24 rounded-full object-cover mb-4 hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-xl font-semibold">Cleven D'amato</h3>
                <p className="text-gray-600">CEO & Founder</p>
              </motion.div>
            </div>
          </div>
        </motion.section> */}

        {/* Our Mission Section with enhanced animations */}
        <section className="relative lg:pt-12 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-[1400px] mx-auto"
          >
            {/* Background Image with parallax effect */}
            <motion.div
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              className="w-full h-[260px] md:h-[500px] rounded-[2rem] overflow-hidden"
            >
              <motion.img
                src={"/images/ourmission.jpg"}
                alt="Malta coastline"
                className="w-full h-full object-cover max-md:hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {/* Overlay Title */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 px-12 md:mt-[-2rem] lg:py-11 rounded-2xl">
              <h2 className="text-2xl md:text-4xl font-bold whitespace-nowrap">
                We are on a mission
              </h2>
            </div>

            {/* Mission and Vision Cards with enhanced animations */}
            <div className="max-w-6xl mx-auto md:px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 -mt-52 relative z-10">
                <div
                  variants={cardHover}
                  whileHover="hover"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {/* <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}> */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">
                      Our Mission
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      At MaltaXplore, our mission is to inspire and empower
                      travelers by providing reliable, in-depth information
                      about Malta's attractions, activities, and accommodations.
                      We are committed to being your trusted resource, ensuring
                      every visitor to Malta has access to accurate, up-to-date,
                      and personalized travel insights.
                    </p>
                  </div>
                  {/* </Tilt> */}
                </div>

                <div
                  variants={cardHover}
                  whileHover="hover"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {/* <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}> */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">
                      Our Vision
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      To become the leading platform for exploring Malta,
                      recognized globally for fostering meaningful travel
                      experiences, promoting sustainable tourism, and
                      celebrating the unique beauty of the Maltese Islands.
                    </p>
                  </div>
                  {/* </Tilt> */}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Team Section with enhanced animations */}
        {/* <Section>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 max-md:mx-8"
          >
            Meet with our smart team
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
                  <motion.div 
                    className="aspect-[3/4] rounded-2xl overflow-hidden mb-4"
                    whileHover={{ scale: 1.03 }}
                  >
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={533}
                      className="h-full w-full object-cover transition duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                  </motion.div>
                </Tilt>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                  <div className="flex gap-2">
                    <a
                      href={member.socialLinks.linkedin}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <LinkedinIcon className="h-5 w-5 text-gray-600" />
                    </a>
                    <a
                      href={member.socialLinks.twitter}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <TwitterIcon className="h-5 w-5 text-gray-600" />
                    </a>
                    <a
                      href={member.socialLinks.instagram}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={`${member.name}'s Instagram`}
                    >
                      <InstagramIcon className="h-5 w-5 text-gray-600" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section> */}

        {/* Contact Section */}
        <Section className="">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-8 md:mx-auto">
              Have questions or want to start your Malta adventure? Reach out to
              us, and our expert team will be happy to assist you.
            </p>
          </div>
          <ContactForm />
        </Section>
      </main>
    </div>
  );
};

export default Aboutus;

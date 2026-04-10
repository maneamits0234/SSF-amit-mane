import { aboutInfo } from "../data/products";
import { useLanguage } from "../context/LanguageContext";
import { Footer } from "../components/Footer";
import { Mail, Phone, MapPin, Briefcase, MessageCircle, Activity, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { motion } from "motion/react";

export function AboutUs() {
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const name = language === 'mr' && aboutInfo.nameMarathi ? aboutInfo.nameMarathi : aboutInfo.name;
  const address = language === 'mr' && aboutInfo.addressMarathi ? aboutInfo.addressMarathi : aboutInfo.address;
  const workDetails = language === 'mr' && aboutInfo.workDetailsMarathi ? aboutInfo.workDetailsMarathi : aboutInfo.workDetails;

  // Exact color palette from the reference image
  const colors = {
    forest: "#2c5144",
    earth: "#5d4037",
    tan: "#f1d4b9",
    tanLight: "#f9e8d9",
    greenDark: "#1a332a"
  };

  const productsList = [
    "ANTOX-D", "ANTOX-T", "AMRUT-51", "ANTOX-PN", "ANTOX-HLK", "ANTOX-X", "ANTOX B-ACID",
    "ANTOX-D", "ANTOX-T", "AMRUT-51", "ANTOX-PN", "ANTOX-HLK", "ANTOX-X", "ANTOX B-ACID",
    "ANTOX-D", "ANTOX-T", "AMRUT-51", "ANTOX-PN", "ANTOX-HLK", "ANTOX-X", "ANTOX B-ACID"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] flex flex-col relative overflow-hidden font-sans">

      {/* Compact Hero Section - Full height green on mobile */}
      <section className="relative w-full min-h-screen md:min-h-[70vh] flex flex-col items-center justify-center pt-10 pb-16 px-6 overflow-hidden">

        {/* Stable Background Split - Full green on mobile */}
        <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
          <div className="w-full md:w-[60%] h-full" style={{ backgroundColor: colors.forest }} />
          <div className="hidden md:block md:w-[40%] h-full" style={{ backgroundColor: colors.earth }} />
        </div>

        {/* Animated Background Blobs for Visual Interest */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-10 blur-[120px]"
          style={{ backgroundColor: colors.tan }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-10 blur-[120px]"
          style={{ backgroundColor: colors.tan }}
        />

        {/* Dynamic Vertical Marquee Layer - Enhanced & Attractive */}
        <div className="absolute inset-y-0 left-[35%] md:left-[42%] w-48 z-10 hidden md:block select-none overflow-hidden pointer-events-none">
          {/* Decorative Vertical Line */}
          <div className="absolute left-0 inset-y-0 w-px bg-white/10" />

          {/* Top Fade Mask */}
          <div
            className="absolute top-0 inset-x-0 h-32 z-20"
            style={{ background: `linear-gradient(to bottom, ${colors.forest}, transparent)` }}
          />

          <motion.div
            animate={{ y: [0, -1000] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex flex-col gap-12 pl-6"
          >
            {[...productsList, ...productsList].map((item, i) => (
              <span
                key={i}
                className="text-xl font-black tracking-[0.3em]"
                style={{
                  // color: colors.tan,
                  opacity: i % 2 === 0 ? 0.3 : 0.1,
                  WebkitTextStroke: i % 3 === 0 ? `1px ${colors.tan}` : 'none',
                  color: i % 3 === 0 ? 'transparent' : colors.tan
                }}
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* Bottom Fade Mask */}
          <div
            className="absolute bottom-0 inset-x-0 h-32 z-20"
            style={{ background: `linear-gradient(to top, ${colors.forest}, transparent)` }}
          />
        </div>

        {/* Horizontal Mobile Ticker - Visible on Mobile Only, positioned over image area */}
        <div className="absolute top-[0%] left-0 w-full z-10 md:hidden select-none overflow-hidden py-6 bg-[#2c5144]/80 backdrop-blur-md shadow-lg">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...productsList, ...productsList].map((item, i) => (
              <span
                key={i}
                className="text-2xl font-black tracking-[0.3em]"
                style={{
                  opacity: i % 2 === 0 ? 0.4 : 0.2,
                  WebkitTextStroke: i % 3 === 0 ? `1px ${colors.tan}` : 'none',
                  color: i % 3 === 0 ? 'transparent' : colors.tan
                }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

            {/* Primary Profile Card - All in a "Single Frame" */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl"
            >
              {/* Profile Image - Animated & Compact */}
              <div className="relative mb-8 group mt-18">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 -m-2 md:-m-3 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: colors.tan }}
                />
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="w-48 h-48 md:w-44 md:h-44 rounded-full border-[5px] shadow-2xl overflow-hidden bg-white relative z-10"
                  style={{ borderColor: colors.tan }}
                >
                  <img
                    src={aboutInfo.image || "https://res.cloudinary.com/dokkp5vkv/image/upload/v1769868851/Ayurveda/products/r11qaetwwsq3k6yafeu1.jpg"}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
              </div>

              {/* Identity & Expert Tag */}
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-4"
                >
                  <Activity className="w-3 h-3 text-green-400" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">
                    {language === 'mr' ? 'आरोग्य तज्ञ' : 'Wellness Expert'}
                  </span>
                </motion.div>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-[1.1] tracking-tighter"
                  style={{ color: colors.tan }}
                >
                  {name}
                </h1>
                <p
                  className="text-sm md:text-base font-medium opacity-80 leading-relaxed max-w-sm"
                  style={{ color: colors.tan }}
                >
                  {language === 'mr'
                    ? "मधुमेह आणि चयापचय आरोग्यामध्ये तज्ञ आयुर्वेदिक अभ्यासक."
                    : "Ayurvedic practitioner specializing in diabetes and metabolic health care."}
                </p>
              </div>

              {/* Action Buttons - Grouped for "Single Frame" */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${aboutInfo.mobileNumber}`}
                  className="px-6 py-3 rounded-full text-sm md:text-base font-black shadow-xl transition-all flex items-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${colors.tan}, #e2b68e)`,
                    color: colors.forest
                  }}
                >
                  {language === 'mr' ? 'कॉल करा' : 'Call Now'}
                  <Phone className="w-4 h-4" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/91${aboutInfo.mobileNumber}`}
                  target="_blank"
                  className="px-6 py-3 rounded-full text-sm md:text-base font-black bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  WhatsApp
                  <MessageCircle className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>

            {/* Side Highlights - Clean separation to prevent overlap */}
            <div className="w-full md:w-[35%] flex flex-col gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 rounded-[2rem] border border-white/10 bg-black/10 backdrop-blur-md"
              >
                <Activity className="w-5 h-5 mb-3" style={{ color: colors.tan }} />
                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Specialization</p>
                <h3 className="text-lg font-bold text-white/90">Diabetes & Metabolic Health</h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="p-6 rounded-[2rem] border border-white/10 bg-black/10 backdrop-blur-md"
              >
                <Briefcase className="w-5 h-5 mb-3" style={{ color: colors.tan }} />
                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Methodology</p>
                <h3 className="text-lg font-bold text-white/90">Root-Cause Ayurvedic Recovery</h3>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Info Sections */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto px-6 md:px-20 py-24 relative z-20"
      >
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">

          {/* Work Details Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="lg:col-span-2 p-10 md:p-16 rounded-[3rem] bg-white/70 backdrop-blur-xl shadow-xl shadow-gray-200/50 border border-white flex flex-col justify-center"
          >
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#8b7355] mb-8">
              {language === 'mr' ? 'माझ्या कामाबद्दल' : 'About My Work'}
            </h2>
            <p className="text-xl md:text-3xl font-bold font-serif leading-relaxed text-gray-800 tracking-tight">
              "{workDetails}"
            </p>
          </motion.div>

          {/* Contact Details Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="p-10 rounded-[3rem] flex flex-col justify-between overflow-hidden shadow-2xl relative"
            style={{ backgroundColor: colors.forest }}
          >
            {/* Subtle decorative circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-10">
                {language === 'mr' ? 'संपर्क माहिती' : 'Contact Information'}
              </h2>

              <div className="grid gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-tan/40 tracking-widest">Phone</p>
                    <a href={`tel:${aboutInfo.mobileNumber}`} className="text-lg font-bold text-white hover:text-tan">{aboutInfo.mobileNumber}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-tan/40 tracking-widest">Email</p>
                    <a href={`mailto:${aboutInfo.emailId}`} className="text-base font-bold text-white break-all">{aboutInfo.emailId}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-tan/40 tracking-widest">Location</p>
                    <p className="text-lg font-bold text-white leading-tight">{address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-white/10">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Licensed Practitioner</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

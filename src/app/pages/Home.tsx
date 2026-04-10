import { Phone, MessageCircle, Shield, Heart, Leaf, Award, CheckCircle2, Star } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { Footer } from "../components/Footer";
import { contactInfo, companyInfo } from "../data/products";
import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { motion } from "motion/react";

export function Home() {
  const { language, t, currentProducts } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const featuredProducts = currentProducts.filter(p => p.featured);
  const allProducts = currentProducts;

  const location = useLocation();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    // Auto-scroll logic for anchor links
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }

    return () => clearTimeout(timer);
  }, [location.hash]);

  const handleCallNow = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleWhatsApp = () => {
    const message = language === 'mr'
      ? "नमस्कार, मला आयुर्वेदिक उत्पादनांबद्दल माहिती हवी आहे."
      : language === 'hi'
      ? "नमस्ते, मुझे आयुर्वेदिक उत्पादों के बारे में और जानना है।"
      : "Hello, I would like to know more about Ayurvedic products.";
    window.open(`https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const currentFoundationName = companyInfo.name;
  const currentFoundationDesc = companyInfo.mission;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Product Marquee */}
      <div className="bg-[#2d7a3e] py-3 overflow-hidden select-none border-b border-white/10 shadow-md relative z-50">
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-16 whitespace-nowrap px-8"
        >
          {[...allProducts, ...allProducts, ...allProducts].map((product, i) => (
            <a
              key={`${product.id}-${i}`}
              href={`#products`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-white/90 hover:text-white text-[10px] md:text-xs font-black tracking-[0.2em] uppercase transition-colors flex items-center gap-3"
            >
              <div className="w-1 h-1 rounded-full bg-white/40" />
              {product.name}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Hero Section - Compacted */}
      <section className="relative bg-gradient-to-br from-[#e8f5e9] via-white to-[#fef7ed] overflow-hidden">
        <div className="container mx-auto px-4 pt-4 pb-10 md:pt-6 md:pb-14 lg:pt-8 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content - Becomes second on mobile */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-block bg-[#2d7a3e]/10 text-[#2d7a3e] px-4 py-2 rounded-full text-sm font-medium">
                {t("hero.badge")}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-[#2d7a3e]">{t("hero.title1")}</span>
                <br />
                {t("hero.title2")}
              </h1>


              <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t("hero.description")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button
                  onClick={handleCallNow}
                  className="group bg-[#2d7a3e] hover:bg-[#245c30] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base md:text-lg font-semibold"
                >
                  <Phone className="w-5 h-5 group-hover:animate-pulse" />
                  <span>{t("hero.ctaCall")}</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="group bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base md:text-lg font-semibold"
                >
                  <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                  <span>{t("hero.ctaWhatsApp")}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-[#2d7a3e]" />
                  <span>{t("hero.trust1")}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-[#2d7a3e]" />
                  <span>{t("hero.trust2")}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-[#2d7a3e]" />
                  <span>{t("hero.trust3")}</span>
                </div>
              </div>
            </div>

            {/* Right Image - Becomes first on mobile */}
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1705083649602-03c5fbae2e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBoZXJicyUyMG5hdHVyYWwlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NzUyMDgyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Ayurvedic Products"
                  className="w-full h-[220px] sm:h-[300px] lg:h-[400px] object-cover"
                />
                {/* Overlay Badge - More compact on mobile */}
                <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur-sm p-2 md:p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                      ))}
                    </div>
                    <div>
                      <p className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">{t("hero.satisfied")}</p>
                      <p className="text-[9px] md:text-sm text-gray-600">{t("hero.trusted")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="hidden lg:block absolute -top-6 -right-6 bg-white p-4 rounded-full shadow-xl">
                <Leaf className="w-8 h-8 text-[#2d7a3e]" />
              </div>
              <div className="hidden lg:block absolute -bottom-6 -left-6 bg-white p-4 rounded-full shadow-xl">
                <Heart className="w-8 h-8 text-[#d4183d]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-[#e8f5e9] to-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-[#2d7a3e]/20">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#2d7a3e] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Leaf className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                {t("benefits.natural")}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {t("benefits.naturalDesc")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#fef7ed] to-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#8b7355] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                {t("benefits.noSideEffects")}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {t("benefits.noSideEffectsDesc")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#e8f5e9] to-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#2d7a3e] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                {t("benefits.trusted")}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {t("benefits.trustedDesc")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#fef7ed] to-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#8b7355] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                {t("benefits.certified")}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {t("benefits.certifiedDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              {t("products.title")}
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
              {t("products.subtitle")}
            </p>
          </div>

          {/* Product Grid - Responsive */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {isLoading
              ? [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)
              : allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            }
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t("about.title")}
              </h2>
              <p className="text-lg md:text-xl text-[#2d7a3e] font-bold">
                {currentFoundationName}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#e8f5e9] to-white p-6 md:p-10 rounded-2xl shadow-lg border border-[#2d7a3e]/5">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                {currentFoundationDesc}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-[#2d7a3e] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{t("about.traditional")}</h4>
                    <p className="text-sm text-gray-600">{t("about.traditionalDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-[#2d7a3e] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{t("about.social")}</h4>
                    <p className="text-sm text-gray-600">{t("about.socialDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-[#2d7a3e] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{t("about.quality")}</h4>
                    <p className="text-sm text-gray-600">{t("about.qualityDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-[#2d7a3e] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{t("about.affordable")}</h4>
                    <p className="text-sm text-gray-600">{t("about.affordableDesc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#2d7a3e] to-[#245c30] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 opacity-95 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleCallNow}
              className="group bg-white text-[#2d7a3e] hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-base md:text-lg font-bold w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5 group-hover:animate-pulse" />
              <span>{t("cta.callNow")}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="group bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-base md:text-lg font-bold w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
              <span>{t("cta.whatsApp")}</span>
            </button>
          </div>

          <p className="text-sm mt-6 opacity-90 font-medium">
            {contactInfo.phone} | {t("cta.timing")}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-16 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              {t("contact.subtitle")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group border border-transparent hover:border-[#2d7a3e]/10"
            >
              <div className="w-16 h-16 bg-[#e8f5e9] rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <Phone className="w-8 h-8 text-[#2d7a3e]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{t("contact.phone")}</h3>
              <p className="text-base text-gray-600 text-center font-medium">{contactInfo.phone}</p>
            </a>

            <button
              onClick={handleWhatsApp}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group border border-transparent hover:border-[#25D366]/10"
            >
              <div className="w-16 h-16 bg-[#e8f5e9] rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{t("contact.whatsApp")}</h3>
              <p className="text-base text-[#2d7a3e] text-center font-bold">{t("contact.response")}</p>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

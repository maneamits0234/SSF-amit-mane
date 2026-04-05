import { Phone, Mail, MapPin, Leaf, MessageCircle, Heart, Shield, Globe } from "lucide-react";
import { contactInfo, foundationInfo } from "../data/products";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { language, t, toggleLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    const message = language === 'mr' 
      ? "नमस्कार, मला आयुर्वेदिक उत्पादनांबद्दल माहिती हवी आहे."
      : "Hello, I would like to know more about Ayurvedic products.";
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const foundationDesc = language === 'mr' ? foundationInfo.descriptionMarathi : foundationInfo.description;
  const foundationName = language === 'mr' ? foundationInfo.nameMarathi : foundationInfo.name;
  const address = language === 'mr' ? contactInfo.addressMarathi : contactInfo.address;

  return (
    <footer className="bg-[#0a1a0e] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 bg-[#2d7a3e] rounded-full flex items-center justify-center shadow-lg border border-white/10">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">{foundationName}</h3>
                <p className="text-[10px] text-[#2d7a3e] font-bold uppercase tracking-widest">
                  {language === 'mr' ? foundationInfo.taglineMarathi : foundationInfo.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-medium max-w-sm">
              {foundationDesc.substring(0, 120)}...
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#2d7a3e]/20 transition-colors cursor-pointer group">
                <Shield className="w-5 h-5 text-gray-400 group-hover:text-[#2d7a3e]" />
              </div>
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#2d7a3e]/20 transition-colors cursor-pointer group">
                <Heart className="w-5 h-5 text-gray-400 group-hover:text-[#d4183d]" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {t("footer.links")}
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-8 h-1 bg-[#2d7a3e] rounded-full"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-medium mx-auto md:mx-0 w-fit md:w-auto">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d7a3e] group-hover:scale-125 transition-transform"></span>
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a 
                  href="#products" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d7a3e] group-hover:scale-125 transition-transform"></span>
                  {t("nav.products")}
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d7a3e] group-hover:scale-125 transition-transform"></span>
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d7a3e] group-hover:scale-125 transition-transform"></span>
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Language Selection */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {language === 'mr' ? 'भाषा निवडा' : 'Language'}
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-8 h-1 bg-[#2d7a3e] rounded-full"></span>
            </h3>
            <div className="space-y-4 flex flex-col items-center md:items-start w-full">
              <button 
                onClick={toggleLanguage}
                className="flex items-center justify-center md:justify-start gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-xl transition-all group w-full max-w-[200px] md:max-w-none"
              >
                <Globe className="w-5 h-5 text-[#2d7a3e]" />
                <span className="text-sm font-bold">{language === 'mr' ? 'English' : 'मराठी'}</span>
              </button>
              <p className="text-xs text-gray-500 font-medium">
                {language === 'mr' ? 'आता तुम्ही तुमच्या भाषेत खरेदी करू शकता' : 'Now you can shop in your preferred language'}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {t("footer.contact")}
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-8 h-1 bg-[#2d7a3e] rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm flex flex-col items-center md:items-start">
              <li>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center md:items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#2d7a3e]/20 group-hover:text-[#2d7a3e]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="mt-1.5 font-bold">{contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center md:items-start gap-3 text-gray-400 hover:text-white transition-colors text-center md:text-left group"
                >
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#25D366]/20 group-hover:text-[#25D366]">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="mt-1.5 font-bold">WhatsApp Enquiry</span>
                </button>
              </li>
              <li>
                <div className="flex items-center md:items-start gap-3 text-gray-400 group text-center md:text-left">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex-shrink-0 flex items-center justify-center group-hover:bg-[#2d7a3e]/20 group-hover:text-[#2d7a3e]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="mt-1.5 font-medium leading-relaxed">{address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm font-medium text-gray-500 text-center md:text-left">
              &copy; {currentYear} <span className="text-gray-400">{foundationName}</span>. {t("footer.rights")}
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#2d7a3e]">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> 100% Natural</span>
              <span className="flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5" /> Certified</span>
              <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> No Side Effects</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

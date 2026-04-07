import { ShoppingCart, Menu, X, Leaf, Phone, Globe } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { contactInfo, foundationInfo } from "../data/products";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#' + targetId);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleCallNow = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-[#2d7a3e]/10">
      {/* Top Bar - Contact Info */}
      <div className="bg-[#2d7a3e] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 md:w-4 md:h-4" />
              <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                {contactInfo.phone}
              </a>
            </div>
            <div className="hidden sm:block">
              <span className="opacity-90">{t("topBar")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 md:gap-3 hover:opacity-90 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2d7a3e] rounded-full flex items-center justify-center shadow-md">
              <Leaf className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-xl font-semibold text-[#2d7a3e] leading-tight">
                {language === 'mr' ? foundationInfo.nameMarathi : foundationInfo.name}
              </span>
              <span className="text-[10px] md:text-xs text-[#8b7355] leading-tight md:tracking-wide">
                {language === 'mr' ? foundationInfo.taglineMarathi : foundationInfo.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-[#2d7a3e] transition-colors font-medium"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t("nav.home")}
            </Link>
            <a 
              href="/#products" 
              className="text-gray-700 hover:text-[#2d7a3e] transition-colors font-medium"
              onClick={(e) => handleNavClick(e, 'products')}
            >
              {t("nav.products")}
            </a>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-[#2d7a3e] transition-colors font-medium"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t("nav.about")}
            </Link>
            <a 
              href="/#contact" 
              className="text-gray-700 hover:text-[#2d7a3e] transition-colors font-medium"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              {t("nav.contact")}
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Selector Desktop */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
              {[
                { code: 'mr', label: 'MR' },
                { code: 'hi', label: 'HI' },
                { code: 'en', label: 'EN' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`px-2 py-1 text-[10px] md:text-xs font-bold rounded-md transition-all ${
                    language === lang.code 
                      ? 'bg-[#2d7a3e] text-white shadow-sm' 
                      : 'text-gray-500 hover:text-[#2d7a3e]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Call Now Button - Desktop */}
            <button
              onClick={handleCallNow}
              className="hidden lg:flex items-center gap-2 bg-[#2d7a3e] hover:bg-[#245c30] text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{t("nav.callNow")}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4183d] text-white text-[10px] md:text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-1">
               <Link
                 to="/"
                 className="text-gray-700 hover:text-[#2d7a3e] hover:bg-gray-50 transition-colors py-3 px-2 rounded"
                 onClick={() => {
                   setMobileMenuOpen(false);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }}
               >
                {t("nav.home")}
              </Link>
              <a
                href="/#products"
                className="text-gray-700 hover:text-[#2d7a3e] hover:bg-gray-50 transition-colors py-3 px-2 rounded"
                onClick={(e) => handleNavClick(e, 'products')}
              >
                {t("nav.products")}
              </a>
              <Link
                to="/about"
                className="text-gray-700 hover:text-[#2d7a3e] hover:bg-gray-50 transition-colors py-3 px-2 rounded"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {t("nav.about")}
              </Link>
              <a
                href="/#contact"
                className="text-gray-700 hover:text-[#2d7a3e] hover:bg-gray-50 transition-colors py-3 px-2 rounded"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                {t("nav.contact")}
              </a>
              
              {/* Language Selector Mobile */}
              <div className="flex flex-col gap-2 py-3 px-2 border-b border-gray-50 mb-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-4 h-4 text-[#2d7a3e]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Select Language</span>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                  {[
                    { code: 'mr', label: 'मराठी' },
                    { code: 'hi', label: 'हिंदी' },
                    { code: 'en', label: 'English' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex-1 px-3 py-2 text-xs font-bold rounded-md transition-all ${
                        language === lang.code 
                          ? 'bg-[#2d7a3e] text-white shadow-sm' 
                          : 'text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  handleCallNow();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 bg-[#2d7a3e] hover:bg-[#245c30] text-white py-3 px-4 rounded-lg transition-colors mt-2"
              >
                <Phone className="w-4 h-4" />
                <span>{t("nav.callNow")}</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

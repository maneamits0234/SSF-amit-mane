import { aboutInfo } from "../data/products";
import { useLanguage } from "../context/LanguageContext";
import { Footer } from "../components/Footer";
import { Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { useEffect } from "react";

export function AboutUs() {
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const name = language === 'mr' && aboutInfo.nameMarathi ? aboutInfo.nameMarathi : aboutInfo.name;
  const address = language === 'mr' && aboutInfo.addressMarathi ? aboutInfo.addressMarathi : aboutInfo.address;
  const workDetails = language === 'mr' && aboutInfo.workDetailsMarathi ? aboutInfo.workDetailsMarathi : aboutInfo.workDetails;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header Area / Banner */}
          <div className="bg-[#2d7a3e] h-32 md:h-48 w-full relative">
            <div className="absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                <img
                  src={aboutInfo.image || "https://res.cloudinary.com/dokkp5vkv/image/upload/v1769868851/Ayurveda/products/r11qaetwwsq3k6yafeu1.jpg"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="pt-20 md:pt-28 pb-10 px-6 md:px-12 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2">
              {name}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fef7ed] text-[#8b7355] text-sm font-bold uppercase tracking-wider mb-8">
              {language === 'mr' ? 'आरोग्य तज्ञ' : 'Wellness Expert'}
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto mt-4 text-left">
              {/* Contact Info Card */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b pb-3 border-gray-200">
                  {language === 'mr' ? 'संपर्क माहिती' : 'Contact Information'}
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#e8f5e9] rounded-full flex items-center justify-center flex-shrink-0 text-[#2d7a3e]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase">{t("contact.phone")}</p>
                      <a href={`tel:${aboutInfo.mobileNumber}`} className="text-lg font-medium text-gray-900 hover:text-[#2d7a3e] transition-colors">{aboutInfo.mobileNumber}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#e8f5e9] rounded-full flex items-center justify-center flex-shrink-0 text-[#2d7a3e]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase">{language === 'mr' ? 'ईमेल' : 'Email'}</p>
                      <a href={`mailto:${aboutInfo.emailId}`} className="text-base break-words font-medium text-gray-900 hover:text-[#2d7a3e] transition-colors">
                        {aboutInfo.emailId || "contact@example.com"}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#e8f5e9] rounded-full flex items-center justify-center flex-shrink-0 text-[#2d7a3e]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase">{language === 'mr' ? 'पत्ता' : 'Address'}</p>
                      <p className="text-base font-medium text-gray-900 leading-snug">{address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Details Card */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b pb-3 border-gray-200">
                  <Briefcase className="w-5 h-5 mr-2 text-[#8b7355]" />
                  {language === 'mr' ? 'कामाचे तपशील' : 'Work Details'}
                </h3>
                <p className="text-gray-700 leading-relaxed font-medium text-lg">
                  {workDetails}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

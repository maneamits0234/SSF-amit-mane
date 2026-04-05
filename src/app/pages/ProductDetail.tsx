import { useParams, Link } from "react-router";
import { Star, ShoppingCart, Check, ArrowLeft, Package, Leaf, Shield, Phone, MessageCircle, Heart } from "lucide-react";
import { products } from "../data/products";
import { Footer } from "../components/Footer";
import { ProductDetailSkeleton } from "../components/ProductDetailSkeleton";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

export function ProductDetail() {
  const { id } = useParams();
  const { language, t, currentProducts } = useLanguage();
  const { onAddToCart } = useCart();
  const product = currentProducts.find((p) => p.id === id);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [id]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {t("products.outOfStock")}
        </h1>
        <Link to="/" className="text-[#2d7a3e] hover:underline font-medium">
          {t("productDetail.back")}
        </Link>
      </div>
    );
  }

  const discount = product.price.mrp
    ? Math.round(((product.price.mrp - product.price.discounted_price) / product.price.mrp) * 100)
    : 0;

  const handleCallNow = () => {
    window.location.href = `tel:${product.phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const message = language === 'mr'
      ? `नमस्कार, मला ${product.name} बद्दल माहिती हवी आहे.`
      : language === 'hi'
      ? `नमस्ते, मुझे ${product.name} के बारे में जानकारी चाहिए।`
      : `Hello, I would like to know more about ${product.name}.`;
    window.open(`https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const relatedProducts = currentProducts.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b sticky top-[73px] md:top-[81px] z-40">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2d7a3e] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm md:text-base">{t("productDetail.back")}</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Tags Container */}
              <div className="absolute top-8 left-8 right-8 flex flex-col gap-3 pointer-events-none">
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col gap-2 items-start">
                    {product.isNew && (
                      <div className="bg-[#2d7a3e] text-white px-4 py-2 rounded-full text-xs md:text-sm font-bold shadow-xl border border-white/20 uppercase tracking-widest">
                        {language === 'mr' ? 'नवीन' : language === 'hi' ? 'नया' : 'New'}
                      </div>
                    )}
                    {product.featured && (
                      <div className="bg-amber-500 text-white px-4 py-2 rounded-full text-xs md:text-sm font-bold shadow-xl border border-white/20 uppercase tracking-widest">
                        {t("productDetail.featured")}
                      </div>
                    )}
                  </div>
                  {discount > 0 && (
                    <div className="bg-[#d4183d] text-white px-4 py-2 rounded-full text-xs md:text-sm font-bold shadow-xl border border-white/20 uppercase">
                      {discount}% {t("products.off")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col">
              <p className="text-sm text-[#8b7355] mb-2 font-bold uppercase tracking-wider">
                {product.category}
              </p>

              <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Price Section */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                <div className="flex flex-wrap items-center gap-4 mb-2">
                  <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2d7a3e]">
                    ₹{product.price.discounted_price}
                  </span>
                  {product.price.mrp > product.price.discounted_price && (
                    <span className="text-xl md:text-2xl text-gray-400 line-through font-medium">
                      ₹{product.price.mrp}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-[#d4183d] text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-black shadow-sm uppercase">
                      {t("productDetail.save")} {discount}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 font-medium">{t("productDetail.freeDelivery")}</p>
              </div>

              {/* Short Description */}
              <p className="text-base md:text-xl text-gray-700 mb-8 leading-relaxed font-normal">
                {product.shortDescription}
              </p>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <button
                  onClick={handleCallNow}
                  className="group bg-[#2d7a3e] hover:bg-[#245c30] text-white py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-extrabold text-lg"
                >
                  <Phone className="w-6 h-6 group-hover:animate-pulse" />
                  <span>{t("productDetail.call")}</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="group bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-extrabold text-lg"
                >
                  <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
                  <span>{t("productDetail.whatsApp")}</span>
                </button>
              </div>

              <button
                onClick={() => onAddToCart(product.id)}
                disabled={!product.inStock}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl transition-all flex items-center justify-center gap-3 font-extrabold text-lg mb-8 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                {product.inStock ? t("productDetail.addToCart") : t("productDetail.outOfStock")}
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pb-8 mt-auto">
                <div className="text-center group bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-[#2d7a3e]/5 transition-colors">
                  <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <Package className="w-5 h-5 text-[#2d7a3e]" />
                  </div>
                  <p className="text-[10px] md:text-xs text-gray-700 font-black uppercase tracking-tighter whitespace-nowrap">{t("productDetail.freeDelivery")}</p>
                </div>
                <div className="text-center group bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-[#2d7a3e]/5 transition-colors">
                  <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <Leaf className="w-5 h-5 text-[#2d7a3e]" />
                  </div>
                  <p className="text-[10px] md:text-xs text-gray-700 font-black uppercase tracking-tighter whitespace-nowrap">{t("productDetail.natural")}</p>
                </div>
                <div className="text-center group bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-[#2d7a3e]/5 transition-colors">
                  <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5 text-[#2d7a3e]" />
                  </div>
                  <p className="text-[10px] md:text-xs text-gray-700 font-black uppercase tracking-tighter whitespace-nowrap">{t("productDetail.certified")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* New Sections: Components & Instructions */}
          <div className="bg-gradient-to-b from-gray-50 to-white p-6 md:p-12 lg:p-16 border-t border-gray-100">
            <div className="max-w-6xl mx-auto space-y-12 md:space-y-20">
              
              {/* Components Cards Section */}
              {product.components && product.components.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-8 md:mb-12 text-center flex flex-col items-center gap-2">
                    <span className="text-[#2d7a3e]">{language === 'mr' ? 'पॅकमधील मुख्य घटक' : language === 'hi' ? 'पैक के मुख्य घटक' : 'Key Components in Pack'}</span>
                    <div className="h-1.5 w-24 bg-[#2d7a3e] rounded-full" />
                  </h2>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {product.components.map((comp, idx) => (
                      <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:border-[#2d7a3e]/30 transition-all hover:shadow-2xl flex flex-col group w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] max-w-sm">
                        <div className="flex items-center justify-between mb-6">
                           <div className="w-14 h-14 bg-[#e8f5e9] rounded-2xl flex items-center justify-center text-[#2d7a3e] group-hover:bg-[#2d7a3e] group-hover:text-white transition-colors duration-500">
                             <Package className="w-7 h-7" />
                           </div>
                           <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                             {comp.form}
                           </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#2d7a3e] transition-colors">{comp.name}</h3>
                        
                        <div className="space-y-4 flex-grow">
                           <div className="space-y-2">
                             <p className="text-xs font-black text-[#8b7355] uppercase tracking-widest">{t("productDetail.benefits")}</p>
                             <ul className="space-y-2">
                                {(() => {
                                  const benefits = comp.benefits 
                                    ? (Array.isArray(comp.benefits) ? comp.benefits : Object.values(comp.benefits))
                                    : [];
                                  return benefits.map((b, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-medium">
                                      <Check className="w-4 h-4 text-[#2d7a3e] flex-shrink-0 mt-0.5" />
                                      <span>{b as string}</span>
                                    </li>
                                  ));
                                })()}
                             </ul>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Info & Usage */}
              <div className="grid lg:grid-cols-5 gap-8 md:gap-16">
                 {/* Left: General Info & Ingredients */}
                 <div className="lg:col-span-3 space-y-12">
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <Leaf className="w-6 h-6 text-[#2d7a3e]" />
                        {t("productDetail.details")}
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed font-medium">
                        {product.description || product.shortDescription}
                      </p>
                    </div>

                    {product.key_ingredients && (
                      <div>
                        <h2 className="text-lg md:text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                          <Star className="w-5 h-5 text-amber-400" />
                          {t("productDetail.ingredients")}
                        </h2>
                        <div className="flex flex-wrap gap-3">
                          {(() => {
                            const ingredients = Array.isArray(product.key_ingredients)
                              ? product.key_ingredients
                              : Object.values(product.key_ingredients).flat();
                            return ingredients.map((ing, i) => (
                              <span key={i} className="bg-white text-gray-800 px-5 py-2.5 rounded-2xl text-sm font-bold border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                {ing as string}
                              </span>
                            ));
                          })()}
                        </div>
                      </div>
                    )}
                 </div>

                 {/* Right: Detailed Usage Instructions */}
                 {(product.usage_instructions || (product as any).usage_guidelines || (product as any).usage_guidelines) && (
                   <div className="lg:col-span-2">
                      <div className="bg-[#2d7a3e] rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden h-full">
                         {/* Decorative Leaf */}
                         <div className="absolute top-0 right-0 opacity-10 -mr-16 -mt-16 pointer-events-none">
                            <Leaf className="w-64 h-64" />
                         </div>

                         <h2 className="text-2xl font-black mb-8 flex items-center gap-3 relative z-10">
                            <Check className="w-8 h-8 p-1.5 bg-white text-[#2d7a3e] rounded-full" />
                            {t("productDetail.howToUse")}
                         </h2>

                         <div className="space-y-8 relative z-10">
                            {(() => {
                              const instructions = product.usage_instructions || (product as any).usage_guidelines || {};
                              return Object.entries(instructions)
                                .filter(([key]) => key !== 'course_duration_recommended' && key !== 'note' && key !== 'lifestyle' && key !== 'notes')
                                .map(([key, value], idx) => (
                                  <div key={key} className="flex gap-4">
                                     <div className="w-8 flex flex-col items-center">
                                        <div className="w-3 h-3 bg-white rounded-full" />
                                        <div className="w-0.5 h-full bg-white/30 my-2" />
                                     </div>
                                     <div>
                                        <p className="text-xs font-black text-white/60 uppercase tracking-widest mb-1">
                                          {key.replace(/_/g, ' ')}
                                        </p>
                                        <p className="text-lg font-bold leading-tight">{value as string}</p>
                                     </div>
                                  </div>
                                ));
                            })()}

                            {((product.usage_instructions?.course_duration_recommended) || (product as any).usage_guidelines?.course_duration_recommended) && (
                               <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/20">
                                  <p className="text-sm font-bold flex flex-col gap-1">
                                    <span className="text-white/70 text-xs font-black uppercase tracking-widest">{language === 'mr' ? 'शिफारस केलेला कालावधी' : language === 'hi' ? 'अनुशंसित अवधि' : 'Recommended Duration'}</span>
                                    <span className="text-xl">{(product.usage_instructions?.course_duration_recommended) || (product as any).usage_guidelines?.course_duration_recommended}</span>
                                  </p>
                                </div>
                            )}

                            {((product as any).usage_guidelines?.notes || (product as any).usage_instructions?.note) && (
                               <p className="text-xs text-white/60 italic mt-4">
                                 {(product as any).usage_guidelines?.notes || (product as any).usage_instructions?.note}
                               </p>
                            )}
                         </div>
                      </div>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-8 md:mb-12 text-center md:text-left flex items-center gap-4">
              {t("productDetail.related")}
              <div className="flex-grow h-px bg-gray-200" />
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 flex flex-col"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <div className="aspect-square overflow-hidden bg-gray-50 p-2">
                       <div className="w-full h-full rounded-xl overflow-hidden">
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                       </div>
                    </div>
                    <div className="p-4 md:p-6 flex flex-col flex-grow">
                      <p className="text-[10px] md:text-xs text-[#8b7355] mb-1 font-bold uppercase tracking-wider">{relatedProduct.category}</p>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-[#2d7a3e] transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg md:text-xl font-extrabold text-[#2d7a3e] mt-auto">₹{relatedProduct.price.discounted_price}</p>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar - Mobile */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.12)] border-t border-gray-100 z-50 lg:hidden animate-in slide-in-from-bottom duration-300">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCallNow}
                className="bg-[#2d7a3e] hover:bg-[#245c30] text-white py-4 rounded-xl transition-colors flex items-center justify-center gap-2 font-black text-sm shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>{t("productDetail.call")}</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-xl transition-colors flex items-center justify-center gap-2 font-black text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

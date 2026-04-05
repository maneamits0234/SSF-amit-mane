import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Product } from "../data/products";
import { useLanguage } from "../context/LanguageContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage();
  
  const discount = product.price.mrp
    ? Math.round(((product.price.mrp - product.price.discounted_price) / product.price.mrp) * 100)
    : 0;

  const productName = product.name;
  const productCategory = product.category;
  const productShortDesc = product.shortDescription;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#2d7a3e]/20 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Tags Container */}
        <div className="absolute top-2 left-2 right-2 flex flex-col gap-2 pointer-events-none">
          <div className="flex justify-between items-start w-full">
            {/* Left Tags Stack */}
            <div className="flex flex-col gap-1.5 items-start">
              {product.isNew && (
                <div className="bg-[#2d7a3e] text-white px-2.5 py-1 rounded-full text-[9px] md:text-xs font-bold shadow-lg border border-white/20 uppercase tracking-wider">
                  {language === 'mr' ? 'नवीन' : language === 'hi' ? 'नया' : 'New'}
                </div>
              )}
              {product.featured && (
                <div className="hidden md:block bg-amber-500 text-white px-2.5 py-1 rounded-full text-[9px] md:text-xs font-bold shadow-lg border border-white/20 uppercase tracking-wider">
                  {t("productDetail.featured")}
                </div>
              )}
            </div>

            {/* Right Tag */}
            {discount > 0 && (
              <div className="bg-[#d4183d] text-white px-2.5 py-1 rounded-full flex items-center gap-1 text-[9px] md:text-xs font-bold shadow-lg border border-white/20">
                <span>{discount}% {t("products.off")}</span>
              </div>
            )}
          </div>
        </div>

        {product.inStock === false && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 z-10">
            <span className="bg-white px-4 py-2 rounded-lg font-semibold text-gray-900 text-xs md:text-sm text-center shadow-2xl">
              {t("products.outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-5 flex flex-col flex-grow">
        <p className="text-[10px] md:text-xs text-[#8b7355] mb-1 md:mb-1.5 font-bold uppercase tracking-wider">
          {productCategory}
        </p>
        
        {/* Product Name */}
        <h3 className="text-sm md:text-lg mb-1 md:mb-1.5 text-gray-900 font-bold line-clamp-2 group-hover:text-[#2d7a3e] transition-colors min-h-[2.5rem] md:min-h-[3rem] leading-tight text-balance">
          {productName}
        </h3>
        
        {/* Short Description */}
        <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2 flex-grow leading-relaxed">
          {productShortDesc}
        </p>

        {/* Price and CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="text-lg md:text-2xl font-bold text-[#2d7a3e]">
                ₹{product.price.discounted_price}
              </span>
              {product.price.mrp > product.price.discounted_price && (
                <span className="text-[10px] md:text-sm text-gray-400 line-through">
                  ₹{product.price.mrp}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[#2d7a3e] font-semibold text-[10px] md:text-sm group-hover:gap-2 transition-all">
            <span>{t("products.viewDetails")}</span>
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

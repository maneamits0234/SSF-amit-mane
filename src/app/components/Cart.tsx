import { X, Plus, Minus, Trash2, ShoppingBag, Phone, MessageCircle, Shield, ShoppingCart as CartIcon } from "lucide-react";
import { Product } from "../data/products";
import { contactInfo } from "../data/products";
import { useLanguage } from "../context/LanguageContext";

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const { language, t } = useLanguage();
  const subtotal = items.reduce((sum, item) => sum + item.price.discounted_price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCallNow = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleWhatsApp = () => {
    const itemDetails = items.map(item => {
      const name = item.name;
      return `${name} x ${item.quantity} = ₹${item.price.discounted_price * item.quantity}`;
    }).join('\n');
    
    const message = language === 'mr'
      ? `नमस्कार, मला खालील उत्पादनांची ऑर्डर करायची आहे:\n\n${itemDetails}\n\nएकूण: ₹${total}`
      : language === 'hi'
      ? `नमस्ते, मुझे निम्न उत्पादों का ऑर्डर देना है:\n\n${itemDetails}\n\nकुल राशि: ₹${total}`
      : `Hello, I would like to order the following products:\n\n${itemDetails}\n\nTotal: ₹${total}`;
      
    window.open(`https://wa.me/${contactInfo.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-all animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 ease-out border-l border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b bg-gradient-to-br from-[#2d7a3e] to-[#245c30] text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <CartIcon className="w-5 h-5 md:w-6 md:h-6" />
              {t("cart.title")}
            </h2>
            <p className="text-xs md:text-sm opacity-90 font-medium">
              {items.length} {t("cart.items")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 p-2 hover:bg-white/20 rounded-full transition-all hover:rotate-90"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
          {/* Decorative Leaf */}
          <div className="absolute -bottom-4 -right-4 opacity-10 rotate-12">
            <CartIcon className="w-24 h-24" />
          </div>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t("cart.empty")}</h3>
            <p className="text-sm text-gray-500 mb-8 max-w-[200px] leading-relaxed">
              {language === 'mr' ? 'तुमची आवडती आयुर्वेदिक उत्पादने जोडा!' : 'Add your favorite Ayurvedic products to get started!'}
            </p>
            <button
              onClick={onClose}
              className="bg-[#2d7a3e] hover:bg-[#245c30] text-white px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl font-bold text-sm"
            >
              {language === 'mr' ? 'खरेदी सुरू करा' : 'Start Shopping'}
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-200">
              <div className="space-y-4 md:space-y-6">
                {items.map((item) => {
                  const itemName = item.name;
                  return (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#2d7a3e]/20 transition-all shadow-sm hover:shadow-md bg-white group">
                      <div className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={itemName}
                          className="w-full h-full object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 leading-tight">
                            {itemName}
                          </h3>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors flex-shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                        <p className="text-[#2d7a3e] font-bold text-base md:text-lg mb-auto">₹{item.price.discounted_price}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#2d7a3e] hover:bg-white rounded-md transition-all shadow-none hover:shadow-sm disabled:opacity-30"
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-bold text-gray-900 w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-[#2d7a3e] hover:bg-white rounded-md transition-all shadow-none hover:shadow-sm"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-400 ml-auto font-medium">
                            ₹{item.price.discounted_price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sticky Summary & Checkout */}
            <div className="border-t bg-gray-50 p-5 md:p-8 space-y-6 shadow-[0_-10px_40px_rgb(0,0,0,0.03)] relative overflow-hidden">
              {/* Summary */}
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between text-gray-600 font-medium text-sm">
                  <span>{t("cart.subtotal")}</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium text-sm">
                  <span>{t("cart.shipping")}</span>
                  <span className="font-bold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-[#2d7a3e] font-bold">{t("cart.free")}</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <div className="flex items-center gap-2 text-xs text-[#2d7a3e] bg-[#e8f5e9] px-3 py-2 rounded-lg font-bold border border-[#2d7a3e]/10">
                    <div className="w-4 h-4 bg-[#2d7a3e] rounded-full flex items-center justify-center text-white scale-75">
                      <Plus className="w-3 h-3" />
                    </div>
                    {language === 'mr' ? 'अभिनंदन! तुम्हाला मोफत वितरण मिळाले आहे.' : 'Great! You have earned free delivery.'}
                  </div>
                )}
                
                {shipping > 0 && (
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-[#2d7a3e] transition-all duration-500" 
                      style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                    />
                  </div>
                )}
                
                <div className="flex justify-between pt-4 border-t border-gray-200 text-lg md:text-xl font-bold text-gray-900">
                  <span>{t("cart.total")}</span>
                  <span className="text-[#2d7a3e] text-2xl">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 relative z-10">
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-xl transition-all flex items-center justify-center gap-2 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-200"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{t("cart.checkout")}</span>
                </button>
                
                <p className="text-[11px] text-center text-gray-400 font-medium flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" /> {language === 'mr' ? 'शॉपिंग सुरक्षित आणि सोपे' : 'Secure and Easy Ordering'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

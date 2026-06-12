import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Send, ShieldCheck, MapPin, Check, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';

// Major Moroccan cities list
const MOROCCAN_CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Kenitra", "Oujda", "Tetouan", "Temara", "Safi",
  "El Jadida", "Nador", "Settat", "Beni Mellal", "Khouribga", 
  "Mohammedia", "Taza", "Khemisset", "Laâyoune", "Autre Ville"
];

// Product options lookup
const PRODUCT_OFFERS = [
  { id: "glycimax-1", name: "Glycimax Magnésium - 1 Boîte", price: 199, rawId: "glycimax", qty: 1 },
  { id: "glycimax-2", name: "Glycimax Magnésium - 2 Boîtes (Pack Économie)", price: 349, rawId: "glycimax", qty: 2, popular: true },
  { id: "glycimax-3", name: "Glycimax Magnésium - 3 Boîtes (Pack Famille)", price: 479, rawId: "glycimax", qty: 3 },
  { id: "appeto-1", name: "Appeto+ Sirop - 1 Boîte", price: 149, rawId: "appeto", qty: 1 },
  { id: "appeto-2", name: "Appeto+ Sirop - 2 Boîtes (Pack Économie)", price: 259, rawId: "appeto", qty: 2, popular: true },
  { id: "appeto-3", name: "Appeto+ Sirop - 3 Boîtes (Pack Famille)", price: 349, rawId: "appeto", qty: 3 },
  { id: "glycimax-appeto-3", name: "Pack Vitalité Duo (Glycimax + Appeto+)", price: 329, rawId: "glycimax", qty: 3 } // Special combo offer
];

const CHAT_SCRIPT = [
  { sender: 'user', text: "Salam ! Je veux commander le pack Glycimax. Combien de temps prend la livraison ?" },
  { sender: 'agent', text: "Marhaban ! Pour Marrakech et Casa c'est sous 24h. Les autres villes entre 24h et 48h maximum. La livraison est 100% gratuite ! 🚚" },
  { sender: 'user', text: "Super. Et est-ce que je peux ouvrir le colis avant de payer ?" },
  { sender: 'agent', text: "Absolument ! Le livreur vous remet le colis, vous vérifiez, et vous payez en espèces à ce moment-là. Zéro stress ! 🤝" }
];

interface CheckoutFormProps {
  selectedProduct: string;
  selectedQty: number;
}

export default function CheckoutForm({ selectedProduct, selectedQty }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    city: 'Casablanca',
    address: ''
  });

  const [selectedOfferId, setSelectedOfferId] = useState("glycimax-2");
  const [validationError, setValidationError] = useState('');
  
  // WhatsApp Chat Simulator States
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatIndex, setChatIndex] = useState(0);

  // Sync component offer state when parent triggers selection (from products or quiz recommendation)
  useEffect(() => {
    let targetOfferId = "";
    if (selectedProduct === "glycimax" && selectedQty === 3) {
      targetOfferId = "glycimax-appeto-3";
    } else {
      targetOfferId = `${selectedProduct}-${selectedQty}`;
    }
    
    if (PRODUCT_OFFERS.some(offer => offer.id === targetOfferId)) {
      setSelectedOfferId(targetOfferId);
    }
  }, [selectedProduct, selectedQty]);

  // WhatsApp chat simulation logic inside checkout
  useEffect(() => {
    if (chatIndex >= CHAT_SCRIPT.length) {
      const timeout = setTimeout(() => {
        setChatMessages([]);
        setChatIndex(0);
      }, 9000);
      return () => clearTimeout(timeout);
    }

    const currentMsg = CHAT_SCRIPT[chatIndex];
    setIsTyping(true);
    const delay = currentMsg.text.length * 12 + 600;

    const timer = setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, currentMsg]);
      setChatIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [chatIndex]);

  const activeOffer = PRODUCT_OFFERS.find(offer => offer.id === selectedOfferId) || PRODUCT_OFFERS[1];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const { fullname, phone, city, address } = formData;

    if (fullname.trim().length < 4) {
      setValidationError("Veuillez saisir votre nom et prénom complet.");
      return;
    }

    const cleanedPhone = phone.replace(/\s+/g, '');
    const phoneRegex = /^(05|06|07|08)\d{8}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      setValidationError("Numéro de téléphone invalide. Ex: 0612345678");
      return;
    }

    if (address.trim().length < 6) {
      setValidationError("Veuillez renseigner votre adresse de livraison complète.");
      return;
    }

    const orderReceipt = `Bonjour Health Power ! Je souhaite passer commande :

📦 PRODUIT : ${activeOffer.name}
💰 TOTAL : ${activeOffer.price} DHS (Livraison Gratuite)

👤 CLIENT : ${fullname}
📞 TÉLÉPHONE : ${cleanedPhone}
📍 VILLE : ${city}
🏠 ADRESSE : ${address}

Merci de confirmer ma commande pour livraison ! 🇲🇦`;

    openWhatsApp(orderReceipt);
  };

  return (
    <section id="form-commande" className="py-24 bg-brand-beige-light border-y border-brand-border/40 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-12 gap-10 items-stretch">
          
          {/* WhatsApp Reassurance Chat & Info Box */}
          <div className="md:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-brand-dark text-white rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-xl pointer-events-none"></div>

            <div className="space-y-6">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-3 inline-block">
                  Support Client Direct
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
                  Aide & Validation
                </h3>
              </div>

              {/* In-Checkout Chat Simulator */}
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#ECE5DD] text-brand-dark flex flex-col shadow-inner select-none">
                {/* Header info */}
                <div className="bg-[#075E54] text-white px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                      HP
                    </div>
                    <div>
                      <h5 className="font-bold text-[11px] leading-tight">Conseiller de Vente</h5>
                      <p className="text-[8px] text-white/70 leading-none">En ligne</p>
                    </div>
                  </div>
                  <span className="w-1.5 h-1.5 bg-[#4FEE57] rounded-full animate-ping"></span>
                </div>

                {/* Chat content pane */}
                <div className="p-3 h-[180px] overflow-y-auto flex flex-col gap-2 bg-[#E5DDD5] text-[10px] leading-relaxed relative">
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]"></div>

                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`max-w-[85%] p-2 rounded-xl shadow-xs relative ${
                        msg.sender === 'user' 
                          ? 'bg-[#DCF8C6] text-brand-dark self-end rounded-tr-none' 
                          : 'bg-white text-brand-dark self-start rounded-tl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className="text-[7px] text-brand-dark/40 text-right mt-1 flex items-center justify-end gap-0.5">
                        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {msg.sender === 'user' && <Check size={8} className="text-[#34B7F1]" />}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="bg-white text-brand-dark px-2.5 py-1.5 rounded-xl rounded-tl-none self-start shadow-xs flex items-center gap-0.5">
                      <span className="w-1 h-1 bg-brand-dark/40 rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-brand-dark/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1 h-1 bg-brand-dark/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery checks list */}
              <div className="space-y-3 pt-2 text-xs text-white/70 font-sans font-light">
                <div className="flex items-center gap-2">
                  <span className="text-brand-gold font-bold">✔</span>
                  <span>Livraison Gratuite (Fès, Casa, Rabat, Marrakech...)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-gold font-bold">✔</span>
                  <span>Paiement en espèces à la livraison uniquement</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-gold font-bold">✔</span>
                  <span>Ouverture et vérification du colis permise</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[9px] text-white/40 font-sans flex items-center gap-1.5 uppercase tracking-widest">
              <ShieldCheck size={12} className="text-brand-gold" />
              <span>Traitement Sécurisé</span>
            </div>
          </div>

          {/* Form Checkout Pane */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-brand-border/40 shadow-xl shadow-brand-dark/5 flex flex-col justify-between">
            <form onSubmit={validateAndSubmit} className="space-y-4">
              
              {/* Product selector in form */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-bold block mb-2 font-sans">
                  1. Choisissez votre produit / pack :
                </label>
                <select
                  name="productOffer"
                  value={selectedOfferId}
                  onChange={(e) => setSelectedOfferId(e.target.value)}
                  className="w-full px-4 py-3 border border-brand-border/50 focus:border-brand-green focus:ring-0 focus:outline-none rounded-xl font-sans text-xs sm:text-sm text-brand-dark bg-brand-beige-light/50 transition-all font-semibold"
                >
                  {PRODUCT_OFFERS.map((offer) => (
                    <option key={offer.id} value={offer.id}>
                      {offer.name} — {offer.price} DHS {offer.popular ? "⭐ (Best Seller)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <hr className="border-brand-border/35 my-4" />

              <label className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-bold block font-sans">
                2. Vos détails de livraison au Maroc :
              </label>

              {/* Nom */}
              <div>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Nom & Prénom Complet"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-brand-border/50 focus:border-brand-green focus:outline-none rounded-xl font-sans text-xs sm:text-sm text-brand-dark bg-brand-beige-light/50 focus:bg-white transition-all shadow-inner"
                />
              </div>

              {/* Tél */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Numéro de Téléphone (ex: 0612345678)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-brand-border/50 focus:border-brand-green focus:outline-none rounded-xl font-sans text-xs sm:text-sm text-brand-dark bg-brand-beige-light/50 focus:bg-white transition-all shadow-inner"
                />
              </div>

              {/* City Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-brand-border/50 focus:border-brand-green focus:outline-none rounded-xl font-sans text-xs sm:text-sm text-brand-dark bg-brand-beige-light/50 transition-all font-semibold"
                  >
                    {MOROCCAN_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bg-brand-green/5 border border-brand-green/15 text-brand-green text-[10px] font-bold uppercase rounded-xl flex items-center justify-center p-2.5 gap-1.5 select-none font-sans text-center">
                  <MapPin size={12} /> Livraison Express Gratuite
                </div>
              </div>

              {/* Address */}
              <div>
                <textarea
                  name="address"
                  rows={2}
                  placeholder="Adresse de livraison complète (Quartier, Rue, N° de maison/appt...)"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-brand-border/50 focus:border-brand-green focus:outline-none rounded-xl font-sans text-xs sm:text-sm text-brand-dark bg-brand-beige-light/50 focus:bg-white transition-all shadow-inner resize-none"
                />
              </div>

              {/* Error feedback */}
              {validationError && (
                <div className="text-red-500 text-xs font-semibold font-sans bg-red-50 p-3 rounded-xl border border-red-100">
                  ⚠️ {validationError}
                </div>
              )}

              {/* Bottom totals & submit */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-border/30 mt-6">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-brand-dark/50 font-bold block leading-none">Net à payer :</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-serif font-black text-brand-dark">{activeOffer.price}</span>
                    <span className="text-xs font-bold text-brand-dark/70">DHS</span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-xl shadow-lg shadow-[#25D366]/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer shimmer-btn"
                >
                  <Send size={16} /> Envoyer via WhatsApp
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

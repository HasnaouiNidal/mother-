import { useState, useEffect } from 'react';
import { ShieldCheck, MapPin, Send, MessageCircle, ShoppingBag, Check } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';
import FormInput from './ui/FormInput';
import PrimaryCTA from './ui/PrimaryCTA';

const MOROCCAN_CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Kenitra", "Oujda", "Tetouan", "Temara", "Safi",
  "El Jadida", "Nador", "Settat", "Beni Mellal", "Khouribga", 
  "Mohammedia", "Taza", "Khemisset", "Laâyoune", "Autre Ville"
];

const PRODUCT_OFFERS = [
  { id: "glycimax-1", name: "Glycimax Magnésium - 1 Boîte", price: 199, rawId: "glycimax", qty: 1, label: "Cure d'essai" },
  { id: "glycimax-2", name: "Glycimax Magnésium - 2 Boîtes", price: 349, rawId: "glycimax", qty: 2, popular: true, label: "Pack Économie (-50% sur la 2ème)" },
  { id: "glycimax-3", name: "Glycimax Magnésium - 3 Boîtes", price: 479, rawId: "glycimax", qty: 3, label: "Pack Famille (2 + 1 GRATUITE)" },
  { id: "appeto-1", name: "Appeto+ Sirop - 1 Boîte", price: 149, rawId: "appeto", qty: 1, label: "Cure d'essai" },
  { id: "appeto-2", name: "Appeto+ Sirop - 2 Boîtes", price: 259, rawId: "appeto", qty: 2, popular: true, label: "Pack Économie (-50% sur la 2ème)" },
  { id: "appeto-3", name: "Appeto+ Sirop - 3 Boîtes", price: 349, rawId: "appeto", qty: 3, label: "Pack Famille (2 + 1 GRATUITE)" },
  { id: "glycimax-appeto-3", name: "Pack Vitalité Duo (Glycimax + Appeto+)", price: 329, rawId: "glycimax", qty: 3, label: "Duo Offre Spéciale" }
];

const CHAT_SCRIPT = [
  { sender: 'user', text: "Bonjour ! Est-ce que le paiement se fait par carte ?" },
  { sender: 'agent', text: "Marhaban ! Non, pas besoin de carte bancaire. Le paiement est 100% à la livraison. Vous vérifiez votre colis et vous payez le livreur en espèces." },
  { sender: 'user', text: "Super ! Et pour la livraison sur Fès, combien de temps ça prend ?" },
  { sender: 'agent', text: "Pour Fès et la majorité des grandes villes du Maroc, la livraison prend entre 24h et 48h maximum. De plus, la livraison est entièrement gratuite ! 🚚" }
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Chat simulator states
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatIndex, setChatIndex] = useState(0);

  // Sync package selection from other sections
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

  // Chat simulator animation trigger
  useEffect(() => {
    if (chatIndex >= CHAT_SCRIPT.length) {
      const timeout = setTimeout(() => {
        setChatMessages([]);
        setChatIndex(0);
      }, 12000);
      return () => clearTimeout(timeout);
    }

    const currentMsg = CHAT_SCRIPT[chatIndex];
    setIsTyping(true);
    const delay = currentMsg.text.length * 10 + 700;

    const timer = setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, currentMsg]);
      setChatIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [chatIndex]);

  const activeOffer = PRODUCT_OFFERS.find(offer => offer.id === selectedOfferId) || PRODUCT_OFFERS[1];

  // Perform validation checks in real-time
  const validateField = (name: string, value: string) => {
    let errorMsg = "";
    if (name === 'fullname') {
      if (!value.trim()) {
        errorMsg = "Le nom complet est requis.";
      } else if (value.trim().length < 4) {
        errorMsg = "Nom complet invalide (minimum 4 caractères).";
      }
    }

    if (name === 'phone') {
      const cleaned = value.replace(/\s+/g, '');
      let normalized = cleaned;
      if (normalized.startsWith('+212')) {
        normalized = '0' + normalized.slice(4);
      } else if (normalized.startsWith('212')) {
        normalized = '0' + normalized.slice(3);
      }
      const phoneRegex = /^(05|06|07|08)\d{8}$/;
      if (!value.trim()) {
        errorMsg = "Le numéro de téléphone est requis.";
      } else if (!phoneRegex.test(normalized)) {
        errorMsg = "Numéro marocain invalide. Ex: 0612345678";
      }
    }

    if (name === 'address') {
      if (!value.trim()) {
        errorMsg = "L'adresse complète est requise.";
      } else if (value.trim().length < 6) {
        errorMsg = "Veuillez préciser votre adresse (rue, quartier, n°).";
      }
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Form validity check (used to enable/disable submit button)
  const isFormValid = () => {
    const { fullname, phone, address } = formData;
    if (fullname.trim().length < 4) return false;
    
    const cleaned = phone.replace(/\s+/g, '');
    let normalized = cleaned;
    if (normalized.startsWith('+212')) {
      normalized = '0' + normalized.slice(4);
    } else if (normalized.startsWith('212')) {
      normalized = '0' + normalized.slice(3);
    }
    const phoneRegex = /^(05|06|07|08)\d{8}$/;
    if (!phoneRegex.test(normalized)) return false;

    if (address.trim().length < 6) return false;

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid() || isLoading) return;

    setIsLoading(true);

    const { fullname, phone, city, address } = formData;
    const cleanedPhone = phone.replace(/\s+/g, '');
    let normalizedPhone = cleanedPhone;
    if (normalizedPhone.startsWith('+212')) {
      normalizedPhone = '0' + normalizedPhone.slice(4);
    } else if (normalizedPhone.startsWith('212')) {
      normalizedPhone = '0' + normalizedPhone.slice(3);
    }

    // Prefilled template generation matching selected choice
    setTimeout(() => {
      setIsLoading(false);
      
      const orderReceipt = `Bonjour Health Power ! Je souhaite passer commande :

📦 PRODUIT : ${activeOffer.name} (${activeOffer.label})
💰 TOTAL : ${activeOffer.price} DHS (Livraison Gratuite)

👤 CLIENT : ${fullname}
📞 TÉLÉPHONE : ${normalizedPhone}
📍 VILLE : ${city}
🏠 ADRESSE : ${address}

Merci de confirmer ma commande pour livraison ! 🇲🇦`;

      openWhatsApp(orderReceipt);
    }, 1200);
  };

  return (
    <section id="form-commande" className="py-12 sm:py-16 lg:py-24 bg-brand-beige border-y border-brand-border/40 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile stacking: order-1 on form, order-2 on support (UX-optimized) */}
        <div className="grid md:grid-cols-12 gap-10 items-stretch">
          
          {/* RIGHT: Form Fields (Stacks FIRST on mobile) */}
          <div className="md:col-span-7 order-1 md:order-2 bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-brand-border/40 shadow-lg flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulaire de commande WhatsApp">
              
              {/* Product Select summary */}
              <div>
                <label htmlFor="pack-selector" className="text-sm font-black uppercase tracking-wider text-brand-dark/90 block mb-2 font-sans">
                  1. Sélectionner Votre Option de Pack :
                </label>
                <select
                  id="pack-selector"
                  name="productOffer"
                  disabled={isLoading}
                  value={selectedOfferId}
                  onChange={(e) => setSelectedOfferId(e.target.value)}
                  className="w-full px-4 py-3.5 border border-brand-border/50 focus:border-brand-green focus:outline-none rounded-xl font-sans text-sm text-brand-dark bg-brand-beige-light/50 transition-all font-semibold focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {PRODUCT_OFFERS.map((offer) => (
                    <option key={offer.id} value={offer.id}>
                      {offer.name} — {offer.price} DHS {offer.popular ? "⭐ (Recommandé)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <hr className="border-brand-border/30 my-4" />

              <h4 className="text-sm font-black uppercase tracking-wider text-brand-dark/90 block font-sans mb-1">
                2. Détails de la Livraison (Paiement Cash Reçu Chez Vous) :
              </h4>

              {/* Nom Complet */}
              <FormInput
                id="checkout-fullname"
                name="fullname"
                label="Nom & Prénom Complet"
                placeholder="Ex: Amina Bennani"
                value={formData.fullname}
                onChange={handleInputChange}
                ariaDescribedBy="fullname-error"
                required
                disabled={isLoading}
                error={touched.fullname ? errors.fullname : ""}
                className="font-sans"
              />
              {/* Force browser trigger on blur for premium inline checks */}
              <div className="hidden"><input name="fullname" onBlur={handleBlur} /></div>

              {/* Phone Input */}
              <FormInput
                id="checkout-phone"
                type="tel"
                name="phone"
                label="Numéro de Téléphone"
                placeholder="Ex: 0612345678"
                value={formData.phone}
                onChange={handleInputChange}
                ariaDescribedBy="phone-error"
                required
                disabled={isLoading}
                error={touched.phone ? errors.phone : ""}
                className="font-sans"
              />
              <div className="hidden"><input name="phone" onBlur={handleBlur} /></div>

              {/* City Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  id="checkout-city"
                  type="select"
                  name="city"
                  label="Ville de Livraison"
                  value={formData.city}
                  onChange={handleInputChange}
                  options={MOROCCAN_CITIES}
                  disabled={isLoading}
                />
                
                <div className="bg-brand-green/5 border border-brand-green/10 text-brand-green text-xs font-bold uppercase rounded-xl flex items-center justify-center p-3 gap-2 select-none font-sans text-center mt-0 sm:mt-5.5 self-end min-h-[48px]">
                  <MapPin size={14} className="text-brand-gold shrink-0" aria-hidden="true" />
                  <span>Livraison Gratuite 🚚</span>
                </div>
              </div>

              {/* Full Address */}
              <FormInput
                id="checkout-address"
                type="textarea"
                name="address"
                label="Adresse de Livraison Complète"
                placeholder="N° de rue, quartier, appartement/immeuble..."
                value={formData.address}
                onChange={handleInputChange}
                ariaDescribedBy="address-error"
                required
                rows={2}
                disabled={isLoading}
                error={touched.address ? errors.address : ""}
                className="font-sans"
              />
              <div className="hidden"><textarea name="address" onBlur={handleBlur} /></div>

              {/* Submit panel & Trust Indicators */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-border/30 mt-6">
                <div>
                  <span className="text-sm uppercase tracking-widest text-brand-muted font-bold block leading-none">Net à payer à la livraison :</span>
                  <div className="flex items-baseline gap-1 mt-1.5">
                    <span className="text-2xl sm:text-3xl font-serif font-black text-brand-dark">{activeOffer.price}</span>
                    <span className="text-xs font-bold text-brand-dark/70">DHS</span>
                  </div>
                </div>
                
                <PrimaryCTA
                  type="submit"
                  theme="whatsapp"
                  isLoading={isLoading}
                  disabled={!isFormValid() || isLoading}
                  icon={<Send size={16} aria-hidden="true" />}
                  className="w-full sm:w-auto px-8 py-4 text-base font-black text-sm"
                  ariaLabel="Envoyer ma commande via WhatsApp"
                >
                  Envoyer via WhatsApp
                </PrimaryCTA>
              </div>

              {/* Trust bullets right below the CTA block */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-brand-border/20 text-sm font-semibold text-brand-muted">
                <div className="flex items-center gap-2">
                  <span className="text-brand-green font-bold text-base" aria-hidden="true">✓</span>
                  <span>Livraison Gratuite 🚚</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-green font-bold text-base" aria-hidden="true">✓</span>
                  <span>Paiement à la réception</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-green font-bold text-base" aria-hidden="true">✓</span>
                  <span>Validation par conseiller</span>
                </div>
              </div>

            </form>
          </div>

          {/* LEFT: Reassurance & Interactive Chat (Stacks SECOND on mobile) */}
          <div className="md:col-span-5 order-2 md:order-1 flex flex-col justify-between p-6 sm:p-8 bg-brand-green text-white rounded-3xl relative overflow-hidden shadow-xl border border-white/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-xl pointer-events-none" aria-hidden="true"></div>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-3 inline-block">
                  Support Client Marocain
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
                  Une Question ?
                </h3>
              </div>

              {/* High-Contrast Interactive Chat Simulator */}
              <div className="border border-white/15 rounded-2xl overflow-hidden bg-[#ECE5DD] text-brand-dark flex flex-col shadow-inner select-none" role="presentation">
                {/* Header */}
                <div className="bg-[#075E54] text-white px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                      S
                    </div>
                    <div>
                      <h5 className="font-bold text-[11px] leading-tight text-white">Sanaa - Conseillère Client</h5>
                      <p className="text-[8px] text-[#4FEE57] leading-none font-bold">En ligne</p>
                    </div>
                  </div>
                  <span className="w-2 h-2 bg-[#4FEE57] rounded-full animate-pulse"></span>
                </div>

                {/* Body */}
                <div className="p-3 h-[200px] overflow-y-auto flex flex-col gap-2.5 bg-[#E5DDD5] text-sm leading-relaxed relative">
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" aria-hidden="true"></div>

                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`max-w-[85%] p-2.5 rounded-xl shadow-xs relative ${
                        msg.sender === 'user' 
                          ? 'bg-[#DCF8C6] text-brand-dark self-end rounded-tr-none' 
                          : 'bg-white text-brand-dark self-start rounded-tl-none font-medium'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className="text-[9px] text-brand-dark/40 text-right mt-1.5 flex items-center justify-end gap-0.5" aria-hidden="true">
                        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {msg.sender === 'user' && <Check size={10} className="text-[#34B7F1] stroke-[2.5]" />}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="bg-white text-brand-dark px-3 py-2 rounded-xl rounded-tl-none self-start shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery assurances checklist */}
              <div className="space-y-4 pt-2 text-sm text-white/85 font-sans font-light" role="list">
                <div className="flex items-start gap-2.5" role="listitem">
                  <span className="text-brand-gold font-bold text-base" aria-hidden="true">✓</span>
                  <span><strong>Pas de paiement en ligne :</strong> Vous ne donnez l'argent qu'au livreur après vérification du colis.</span>
                </div>
                <div className="flex items-start gap-2.5" role="listitem">
                  <span className="text-brand-gold font-bold text-base" aria-hidden="true">✓</span>
                  <span><strong>Livraison Gratuite :</strong> Valable partout au Maroc (Casablanca, Rabat, Fès, Marrakech, etc.).</span>
                </div>
                <div className="flex items-start gap-2.5" role="listitem">
                  <span className="text-brand-gold font-bold text-base" aria-hidden="true">✓</span>
                  <span><strong>Validation de commande :</strong> Notre conseiller vous contactera par téléphone pour valider l'expédition.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-white/50 font-sans flex items-center gap-1.5 uppercase tracking-widest leading-none">
              <ShieldCheck size={14} className="text-brand-gold" aria-hidden="true" />
              <span>Garantie Qualité & Transparence</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import { useState } from 'react';
import api from '../services/api';
import Footer from '../components/Footer';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      question: "Les voitures sont-elles assurées ?",
      answer:
        "Oui, tous nos véhicules sont assurés afin de garantir votre sécurité et votre tranquillité."
    },
    {
      question: "Quels sont les délais de réservation ?",
      answer:
        "Vous pouvez réserver instantanément en ligne. La confirmation est généralement immédiate."
    },
    {
      question: "Puis-je annuler une réservation ?",
      answer:
        "Oui, les annulations sont possibles selon les conditions de réservation du véhicule."
    },
    {
      question: "Comment récupérer mon véhicule ?",
      answer:
        "Vous pouvez récupérer votre voiture directement dans l’une de nos agences DriveWise."
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer:
        "Le paiement en espèces est accepté uniquement lors de la prise en charge du véhicule."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await api.post('/contact', formData);

      setStatus({
        type: 'success',
        text: 'Message envoyé avec succès. Nous vous répondrons bientôt.'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);

      setStatus({
        type: 'error',
        text: 'Une erreur est survenue. Veuillez réessayer plus tard.'
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8F8F7] py-24 px-4 relative overflow-hidden font-['General_Sans']">

        {/* BACKGROUND */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-black/[0.03] rounded-full blur-3xl"></div>

        <div className="absolute inset-0 opacity-[0.025]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:55px_55px]" />
        </div>

        <div className="relative max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="mb-16 max-w-2xl">

            <p className="text-yellow-500 uppercase tracking-[0.35em] text-[11px] mb-5 font-['Clash_Display']">
              DriveWise Assistance
            </p>

            <h1 className="text-5xl md:text-6xl leading-tight text-[#111111] font-['Clash_Display'] mb-6">
              Contactez notre équipe
            </h1>

            <p className="text-[#6B7280] text-[15px] leading-relaxed font-sans">
              Une question concernant une réservation, une voiture ou une agence ?
              Notre équipe DriveWise reste disponible pour vous accompagner.
            </p>

          </div>

          {/* FAQ */}
          <div className="mb-16">

            <h2 className="text-2xl text-[#111111] font-['Clash_Display'] mb-8">
              Questions fréquentes
            </h2>

            <div className="space-y-4 font-sans text-sm">

              {faqs.map((faq, index) => (

                <div
                  key={index}
                  className="bg-white border border-[#ECECEC] rounded-[26px] px-6 py-5"
                >

                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left"
                  >

                    <span className="text-[15px] text-[#111111] font-medium">
                      {faq.question}
                    </span>

                    <span className="text-[#999] text-xl">
                      {openFaq === index ? '−' : '+'}
                    </span>

                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm text-[#6B7280]">
                      {faq.answer}
                    </p>
                  </div>

                </div>

              ))}

            </div>
          </div>

          {/* INFO CARDS */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">

            <div className="bg-white border border-[#ECECEC] rounded-[24px] p-5">
              <p className="text-[10px] uppercase text-[#9CA3AF] mb-3 font-['Clash_Display']">Téléphone</p>
              <p className="text-sm text-[#111111] font-sans">+212 5 22 12 34 56</p>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-[24px] p-5">
              <p className="text-[10px] uppercase text-[#9CA3AF] mb-3 font-['Clash_Display']">Email</p>
              <p className="text-sm text-[#111111] font-sans">contact@drivewise.ma</p>
            </div>

            <div className="bg-white border border-[#ECECEC] rounded-[24px] p-5">
              <p className="text-[10px] uppercase text-[#9CA3AF] mb-3 font-['Clash_Display']">Localisation</p>
              <p className="text-sm text-[#111111] font-sans">Casablanca, Maroc</p>
            </div>

          </div>

          {/* FORM - NOW BELOW */}
          <div className="bg-white border border-[#ECECEC] rounded-[34px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] mb-20">

            <h2 className="text-4xl text-[#111111] font-['Clash_Display'] mb-2">
              Envoyer un message
            </h2>

            <p className="text-sm text-[#6B7280] mb-8 font-sans">
              Nous vous répondrons dans les meilleurs délais.
            </p>

            {status && (
              <div className={`mb-6 rounded-2xl p-4 text-sm ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-red-50 text-red-600 border border-red-200'
              }`}>
                {status.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  type="text"
                  required
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-full px-5 py-3 text-sm font-sans"
                />

                <input
                  type="email"
                  required
                  placeholder="Adresse email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-full px-5 py-3 text-sm font-sans"
                />

              </div>

              <input
                type="text"
                required
                placeholder="Sujet"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-full px-5 py-3 text-sm font-sans"
              />

              <textarea
                required
                rows="6"
                placeholder="Votre message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-[28px] px-5 py-4 text-sm font-sans resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#111111] text-white rounded-full py-3 text-sm font-sans hover:bg-[#333333] transition disabled:bg-gray-400 disabled:cursor-not-allowed px-6"
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer le message'}
              </button>

            </form>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
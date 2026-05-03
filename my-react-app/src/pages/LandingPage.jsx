import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#001233] text-white font-sans">

      {/* NAVBAR SIMPLE */}
      <header className="flex justify-between items-center px-10 py-6 border-b border-white/40">
        <h2 className="text-2xl font-semibold tracking-wide">
          Drive<span className="text-[#7D8597]">Wise</span>
        </h2>

        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 border border-white/20 rounded-full hover:bg-white/10 transition">
            Login
          </Link>
          <Link to="/register" className="px-5 py-2 bg-white text-black rounded-full font-semibold">
            Sign Up
          </Link>
        </div>
      </header>

      {/* HERO SPLIT */}
      <section className="grid md:grid-cols-2 min-h-[80vh] relative">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-10 md:px-20 z-10">
          <p className="text-[#7D8597] mb-4 tracking-widest uppercase text-sm">
            Location Premium
          </p>

           <h1 className="font-['Anton SC'] md:text-6xl leading-tight mb-6">
            Trouvez votre
            <br />
            <span className="text-[#979DAC] font-['Montserrat'] text-6xl">voiture idéale</span>
          </h1>

          <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
            Une expérience intelligente basée sur vos préférences pour vous proposer les meilleurs véhicules.
          </p>

          <div className="flex gap-6">
            <Link to="/register" className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition">
              Commencer
            </Link>

            <Link to="/login" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition">
              Se Connecter
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE (VISUAL) */}
        <div className="relative flex items-center justify-center">
          {/* Glow background */}
          <div className="absolute w-[500px] h-[500px] bg-[#023E7D]/40 rounded-full blur-3xl"></div>

          {/* Gradient overlay */}
          <div className="absolute w-[600px] h-[300px] bg-gradient-to-r from-transparent via-[#33415C]/40 to-transparent blur-2xl"></div>

          {/* Car Image */}
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
            alt="car"
            className="relative z-10 w-[500px] rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* FEATURES MINIMAL */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          "Expérience personnalisée",
          "Choix intelligent",
          "Réservation rapide"
        ].map((item, i) => (
          <div key={i} className="border-l-2 border-[#7D8597] pl-6">
            <h3 className="font-serif text-xl mb-2">{item}</h3>
            <p className="text-gray-400 text-sm">
              Une solution pensée pour simplifier votre expérience.
            </p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 border-t border-white/10">
        © 2026 DriveWise
      </footer>
    </div>
  );
};

export default LandingPage;
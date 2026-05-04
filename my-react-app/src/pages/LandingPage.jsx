import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111111] font-sans">

      <header className="flex justify-between items-center px-10 py-6 border-b border-[#E5E7EB] bg-white">
        <h2 className="text-xl font-medium tracking-wide">
          Drive<span className="text-[#6B7280]">Wise</span>
        </h2>

        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 border border-[#E5E7EB] rounded-full text-sm hover:bg-gray-100 transition">
            Login
          </Link>
          <Link to="/register" className="px-5 py-2 bg-[#111111] text-white rounded-full text-sm hover:opacity-80 transition">
            Sign Up
          </Link>
        </div>
      </header>

      <section className="grid md:grid-cols-2 min-h-[80vh] items-center bg">

        <div className="flex flex-col justify-center px-10 md:px-20">
          <p className="text-[#6B7280] mb-4 tracking-wide uppercase text-xs">
            Location de voitures
          </p>

          <h1 className="font-sans font-medium text-5xl md:text-6xl leading-tight mb-6">
            Trouvez votre
            <br />
            voiture idéale
          </h1>

          <p className="text-[#6B7280] max-w-md mb-10 leading-relaxed text-sm">
            Une expérience simple et moderne pour choisir le véhicule adapté à vos besoins.
          </p>

          <div className="flex gap-6">
            <Link to="/register" className="px-15 py-4 bg-[#111111] text-white rounded-full text-sm hover:opacity-80 transition">
              Commencer
            </Link>

            <Link to="/login" className="px-15 py-4 border border-[#111223] rounded-full text-sm hover:bg-gray-100 transition">
              Se connecter
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center px-10">
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
            alt="car"
            className="w-[500px] object-contain"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8 border-t border-[#E5E7EB]">
  {[
    "Expérience personnalisée",
    "Choix intelligent",
    "Réservation rapide"
  ].map((item, i) => (
    <div
      key={i}
      className="bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col items-center 
                 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <h3 className="font-medium text-lg text-[#111111] mb-3">
        {item}
      </h3>

      <p className="text-[#6B7280] text-sm leading-relaxed">
        Une solution pensée pour simplifier votre expérience et vous offrir plus de confort.
      </p>
    </div>
  ))}
</section>

<footer className="text-center py-10 text-[#6B7280] border-t border-[#E5E7EB]">
  © 2026 DriveWise
</footer>
    </div>
  );
};

export default LandingPage;
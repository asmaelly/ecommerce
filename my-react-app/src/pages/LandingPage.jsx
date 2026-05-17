import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9FAFB] text-[#111111] font-sans">

      {/* BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-black/10 rounded-full blur-3xl"></div>

      {/* HEADER */}
      <header className="relative flex justify-between items-center px-10 py-6 border-b border-[#E5E7EB] bg-white/70 backdrop-blur-md">

      <span className={`text-xl font-bold tracking-[0.1em] md:tracking-[0.15em] text-black group-hover:scale-105 transition-all duration-500`}>
                  DRIVE<span className="text-[#FFD700]">WISE</span>
       </span>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 border border-[#E5E7EB] rounded-full text-sm hover:bg-gray-100 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-black text-white rounded-full text-sm hover:opacity-80 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative grid md:grid-cols-2 min-h-[85vh] items-center px-10 md:px-20">

        {/* TEXT */}
        <div className="z-10">
          <p className="text-[#FFD700] uppercase tracking-widest text-xs mb-4">
            Location Premium
          </p>

          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
            Trouvez votre <br />
            voiture idéale
          </h1>

          <p className="text-gray-600 max-w-md mb-10 text-sm leading-relaxed">
            Une expérience simple et élégante pour louer des voitures adaptées à votre style et budget.
          </p>

          <div className="flex gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-black text-white rounded-full text-sm hover:opacity-80 transition"
            >
              Commencer
            </Link>

            <Link
              to="/login"
              className="px-8 py-3 border border-black rounded-full text-sm hover:bg-gray-100 transition"
            >
              Se connecter
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative flex justify-center items-center">

          {/* glow */}
          <div className="absolute w-[350px] h-[350px] bg-yellow-300/30 blur-3xl rounded-full"></div>

          {/* IMAGE SAFE */}
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
            alt="car"
            className="relative w-[650px] object-contain drop-shadow-2xl rounded-2xl"
          />
        </div>

      </section>
    </div>
  );
};

export default LandingPage;
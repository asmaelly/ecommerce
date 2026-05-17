import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12">

          {/* LOGO */}
          <div>

            <h2 className="text-3xl font-semibold mb-4 tracking-wide">
              DRIVE
              <span className="text-[#FFD700]">
                WISE
              </span>
            </h2>

            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Plateforme premium de location de voitures modernes au Maroc.
            </p>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-xs uppercase tracking-[0.25em] mb-5 text-white/40">
              Contact
            </h3>

            <div className="space-y-3 text-sm text-white/70">

              <p className="hover:text-white transition cursor-pointer">
                contact@drivewise.ma
              </p>

              <p className="hover:text-white transition cursor-pointer">
                +212 5 22 12 34 56
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Casablanca, Maroc
              </p>

            </div>

          </div>

          {/* NAVIGATION */}
          <div>

            <h3 className="text-xs uppercase tracking-[0.25em] mb-5 text-white/40">
              Navigation
            </h3>

            <div className="space-y-3 text-sm text-white/70">

              <Link to="/" className="hover:text-white transition cursor-pointer block">
                Accueil
              </Link>

              <Link to="/cars" className="hover:text-white transition cursor-pointer block">
                Véhicules
              </Link>

              <Link to="/agencies" className="hover:text-white transition cursor-pointer block">
                Agences
              </Link>

              <Link to="/contact" className="hover:text-white transition cursor-pointer block">
                Contact
              </Link>

            </div>

          </div>

          {/* HORAIRES */}
          <div>

            <h3 className="text-xs uppercase tracking-[0.25em] mb-5 text-white/40">
              Horaires
            </h3>

            <div className="space-y-3 text-sm text-white/70">

              <p>
                Lundi — Vendredi
              </p>

              <p className="mt-1">
                09h00 — 19h00
              </p>

              <p className="mt-1">
                Samedi — 17h00
              </p>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-white/40 text-center md:text-left">
            © 2026 DriveWise. Tous droits réservés.
          </p>

          <p className="text-sm text-white/40 text-center md:text-right">
            Designed for modern mobility.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-yellow-400 py-10 px-5 font-sans">

      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between gap-8">

        {/* Logo Section */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-2xl text-yellow-400 mb-2 font-semibold">
            💍 Royal Gold
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Luxury that lasts forever. Discover our premium collection of gold jewelry.
          </p>
        </div>

        {/* Links */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-white text-lg mb-2">Quick Links</h4>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-yellow-400 transition">
                Home
              </a>
            </li>

            <li>
              <a href="/products" className="hover:text-yellow-400 transition">
                Shop
              </a>
            </li>

            <li>
              <a href="/about" className="hover:text-yellow-400 transition">
                About Us
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-yellow-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1 min-w-[200px] text-sm text-gray-300">
          <h4 className="text-white text-lg mb-2">Contact</h4>

          <p>Email: support@royalgold.com</p>
          <p>Phone: +91 1544445154</p>
          <p>Location: Jhargram, West Bengal, India</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center border-t border-gray-700 mt-8 pt-5 text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Royal Gold. All rights reserved.</p>
        <p>Developed By Abhisek Karan</p>
      </div>

    </footer>
  );
}
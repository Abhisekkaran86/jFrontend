import React from "react";
import "../style/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">💍 Royal Gold</h3>
          <p>Luxury that lasts forever. Discover our premium collection of gold jewelry.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@royalgold.com</p>
          <p>Phone: +91 1544445154

          </p>
          <p>Location: Jhargram, West Bengal, India</p>
        </div>

        {/* <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div> */}
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Royal Gold. All rights reserved.</p>
        <p>Devloped By Abhisek Karan</p>
      </div>
    </footer>
  );
}

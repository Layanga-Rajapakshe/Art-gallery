import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white/90 border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Gallery Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-comfortaa">Art Gallery</h3>
            <p className="text-white/70 mb-4">
              Discover exceptional artwork from emerging and established artists in our curated collection.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-white/70 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com" className="text-white/70 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-comfortaa">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-white/70 hover:text-white transition-colors">Browse Art</Link></li>
              <li><Link to="/artists" className="text-white/70 hover:text-white transition-colors">Artists</Link></li>
              <li><Link to="/exhibitions" className="text-white/70 hover:text-white transition-colors">Exhibitions</Link></li>
              <li><Link to="/events" className="text-white/70 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-comfortaa">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-2 flex-shrink-0 text-white/60" />
                <span className="text-white/70">123 Gallery Street, Art District, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-white/60" />
                <span className="text-white/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-white/60" />
                <span className="text-white/70">info@artgallery.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-comfortaa">Stay Updated</h3>
            <p className="text-white/70 mb-3">
              Subscribe to our newsletter for the latest exhibitions and events.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black rounded-md hover:bg-white/90 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Art Gallery. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <Link to="/privacy" className="text-white/60 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/60 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="text-white/60 text-sm hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
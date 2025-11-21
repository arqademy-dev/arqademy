import {
  FaGraduationCap,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaGraduationCap className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">AcademicTracker</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering students, teachers, and parents through transparent academic progress tracking and continuous improvement.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["About Us", "How It Works", "Features", "Pricing", "FAQ"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              {["Student Guide", "Teacher Guide", "Parent Guide", "Blog", "Support Center"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <FaMapMarkerAlt className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Education Street, Learning City, ST 12345</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FaPhoneAlt className="w-4 h-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FaEnvelope className="w-4 h-4 flex-shrink-0" />
                <span>info@academictracker.com</span>
              </li>
            </ul>
            <div className="mt-4 text-sm text-gray-400">
              <p className="mb-1">Office Hours:</p>
              <p>Monday - Friday: 8AM - 6PM</p>
              <p>Saturday: 9AM - 3PM</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2025 AcademicTracker. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <a key={link} href="#" className="text-gray-400 hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

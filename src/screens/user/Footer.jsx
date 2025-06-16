import logo from "../../assets/logo.png";
import { FaFacebook, FaPinterest, FaTelegram } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer1 text-white py-12 px-4 sm:px-6">
      <div className="mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10">

        {/* Company */}
        <div>
          <h3 className="font-semibold text-[1.5rem] mb-3 text-center md:text-left">Company</h3>
          <ul className="space-y-2 text-[1.4rem] text-gray-300  text-center md:text-left">
            <li><a href="#">About Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-[1.5rem] mb-3 text-center md:text-left">Services</h3>
          <ul className="space-y-2 text-[1.4rem] text-gray-300 text-center md:text-left">
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Downloads & Resources</a></li>
          </ul>
        </div>

        {/* Account / Socials */}
        <div>
          <h3 className="font-semibold text-[1.5rem] mb-3 text-center md:text-left">Account</h3>
          <ul className="space-y-2 text-[1.4rem] text-gray-300 text-center md:text-left">
            <a href="https://t.me/nexochann">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <FaTelegram size={16} /> Telegram
              </li>
            </a>
            {/* Uncomment if needed */}
            {/* <li className="flex items-center justify-center md:justify-start gap-2">
              <FaFacebook size={16} /> Facebook
            </li> */}
            {/* <li className="flex items-center justify-center md:justify-start gap-2">
              <FaSquareTwitter size={16} /> Twitter
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPinterest size={16} /> Pinterest
            </li> */}
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-[1.4rem] text-gray-400">
        © 2025 Nexo Coin. All Rights Reserved
      </div>
    </footer>
  );
}

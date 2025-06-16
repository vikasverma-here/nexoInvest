import { MainContent } from "../../constants/content/MainContent";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="Footer">
        <div className="section-inner">
          <span className="copyright-msg">
            © {currentYear} {MainContent.appName}
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;

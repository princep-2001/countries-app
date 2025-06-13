import { Button } from 'react-bootstrap';
import { FaFacebook, FaGoogle, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = ({ copyRight }) => {
  return (
    <>
      <div className="social-icons-container">
        <Button
          variant="outline-secondary"
          className="rounded-circle social-icon-btn"
        >
          <FaGoogle size={18} />
        </Button>
        <Button
          variant="outline-secondary"
          className="rounded-circle social-icon-btn"
        >
          <FaFacebook size={18} />
        </Button>
        <Button
          variant="outline-secondary"
          className="rounded-circle social-icon-btn"
        >
          <FaLinkedin size={18} />
        </Button>
        <Button
          variant="outline-secondary"
          className="rounded-circle social-icon-btn"
        >
          <FaTwitter size={18} />
        </Button>
      </div>
      {copyRight && (
        <div className="text-center text-muted small">
          <p className="mb-1">© countriesapi.com</p>
          <p>Copyright © 2024 Rest of API Reserved</p>
        </div>
      )}
    </>
  );
};

export default Footer;

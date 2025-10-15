import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "CryptLearn",
      links: [
        { label: "About", to: "/about" },
        { label: "FAQs", to: "/faqs" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Learning Paths",
      links: [
        { label: "Introduction to Cryptography", to: "/paths/intro" },
        { label: "Symmetric Cryptography", to: "/paths/symmetric" },
        { label: "Applied Cryptography", to: "/paths/applied" },
        { label: "Modern Intro. to Cryptography", to: "/paths/modern" },
        { label: "Cryptography Tools", to: "/paths/tools" },
      ],
    },
    {
      title: "Practice Exercises",
      links: [
        { label: "Daily Challenge", to: "/exercises/daily" },
        { label: "Challenge of the Month", to: "/exercises/monthly" },
        { label: "Elliptic Curve Cryptography", to: "/exercises/ecc" },
        { label: "SHA - 256 HASH", to: "/exercises/sha256" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Illustration Credits", to: "/credits" },
        {
          label: "https://storyset.com/illustrations.com/",
          to: "https://storyset.com",
          external: true,
        },
        { label: "Illustrations by Freepik.com", to: "https://freepik.com", external: true },
      ],
    },
  ];

  return (
    <footer className="bg-accent-coral text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-white/80 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm">
          <p className="text-white/80">
            © Copyright {currentYear} | All rights reserved. |{" "}
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

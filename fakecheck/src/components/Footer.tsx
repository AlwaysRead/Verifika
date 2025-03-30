const Footer = () => {
    const links = [
      { label: "About", href: "#" },
      { label: "How It Works", href: "#" },
      { label: "API", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Contact", href: "#" }
    ];
  
    return (
      <footer className="px-6 py-8 text-center text-sm text-gray-300">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {links.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p>© {new Date().getFullYear()} SelfipediA. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
const Footer = () => {
  return (
    <footer className="bg-ajio-dark text-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-bold mb-3">SHOP</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Footwear</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">HELP</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Track Order</li>
            <li>Returns</li>
            <li>Shipping</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">COMPANY</h4>
          <ul className="space-y-2 text-gray-400">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">AJIO CLONE</h4>
          <p className="text-gray-400">
            A demo e-commerce project built with React, Node and MongoDB.
          </p>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} AJIO Clone. For educational purposes only.
      </div>
    </footer>
  );
};

export default Footer;

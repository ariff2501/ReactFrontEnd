function Navbar
() {
    return (
      <nav className="bg-blue-600 p-4">
      <ul className="flex justify-around text-white">
        <li><a href="#home" className="hover:text-gray-300">Home</a></li>
        <li><a href="/login" className="hover:text-gray-300">Login</a></li>
        <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
      </ul>
    </nav>
    );
  }

export default Navbar;  
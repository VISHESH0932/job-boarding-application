import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          JobBoard
        </Link>
        <div>
          <Link href="/admin/login" className="px-4 py-2 text-gray-600 hover:text-blue-600">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
import './globals.css';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'VoteBlock',
  description: 'Secure Blockchain-Based E-Voting System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <div className="main-content">
          {children}
        </div>

         {/* <header className="header">
          <div className="header-container">
            <h1 className="logo">VoteBlock</h1>

            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/voter/dashboard">Voter</Link>
              <Link href="/admin/dashboard">Admin</Link>
              <Link href="/logout">Logout</Link>
            </nav>
          </div>
        </header> */}
      </body>
    </html>
  );
}

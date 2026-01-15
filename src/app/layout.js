//import './globals.css'
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'VoteBlock',
  description: 'Secure Blockchain-Based E-Voting System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-container">
            <h1 className="logo">VoteBlock</h1>

            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/dashboard/voter">Voter</Link>
              <Link href="/dashboard/admin">Admin</Link>
              <Link href="/logout">Logout</Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}


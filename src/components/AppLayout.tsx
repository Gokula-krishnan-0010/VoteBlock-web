import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Vote, LayoutDashboard, User, CalendarCheck, Shield, LogOut } from "lucide-react";
import { ReactNode } from "react";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", to: "/profile", icon: User },
  { label: "Elections", to: "/elections", icon: CalendarCheck },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <Vote className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">VoteBlock</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button
                  variant={location.pathname === item.to ? "default" : "ghost"}
                  size="sm"
                  className={location.pathname === item.to ? "gradient-primary text-primary-foreground" : ""}
                >
                  <item.icon className="w-4 h-4 mr-1.5" />
                  {item.label}
                </Button>
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link to="/admin">
                <Button
                  variant={location.pathname === "/admin" ? "default" : "ghost"}
                  size="sm"
                  className={location.pathname === "/admin" ? "gradient-primary text-primary-foreground" : ""}
                >
                  <Shield className="w-4 h-4 mr-1.5" />
                  Admin
                </Button>
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.name}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur-md">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="flex flex-col items-center gap-0.5">
              <item.icon className={`w-5 h-5 ${location.pathname === item.to ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[10px] ${location.pathname === item.to ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link to="/admin" className="flex flex-col items-center gap-0.5">
              <Shield className={`w-5 h-5 ${location.pathname === "/admin" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[10px] ${location.pathname === "/admin" ? "text-primary font-semibold" : "text-muted-foreground"}`}>Admin</span>
            </Link>
          )}
        </div>
      </nav>

      <main className="container py-6 pb-20 md:pb-6">{children}</main>
    </div>
  );
}

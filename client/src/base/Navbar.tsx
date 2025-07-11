import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAppSelector } from "@/hooks/hooks";

// Helper function for class merging
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "🏠 Home", href: "/" },
    { name: "📝 Blogs", href: "/blogs" },
    { name: "✨ Create Blog", href: "/blogs/create" },
  ];


  const {userData,token} = useAppSelector(state=>state?.auth)
  console.log(userData,token)

//   const data = JSON.parse(localStorage.getItem('persist:root'))

//   console.log(JSON.parse(data.auth))

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo with animation */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-white tracking-tight hover:scale-105 transition-transform duration-200"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-white">
            BlogWave
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-5 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-all px-3 py-2 rounded-lg",
                location.pathname === link.href
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Logout Button with nice hover effect */}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-white border border-white/30 cursor-pointer hover:border-white hover:bg-white/20 hover:shadow-md transition-all"
          >
            <span className="mr-2">👋</span> Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Menu"
                className="text-white hover:bg-white/20 focus-visible:ring-white/50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            
            {/* Mobile Menu Content */}
            <SheetContent side="left" className="w-[280px] bg-gradient-to-b from-white to-gray-50">
              <div className="mt-8 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg transition-colors",
                      location.pathname === link.href
                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Logout Button */}
                <Button
                  onClick={handleLogout}
                  className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md"
                >
                  <span className="mr-2">👋</span> Sign Out
                </Button>
              </div>
              
              {/* Footer in mobile menu */}
              <div className="absolute bottom-4 left-0 right-0 px-4 text-center text-xs text-gray-400">
                BlogWave © {new Date().getFullYear()}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
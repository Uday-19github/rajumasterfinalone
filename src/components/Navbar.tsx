import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Flame, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { 
    to: "/services", 
    label: "Services",
    dropdown: [
      { to: "/services/dance", label: "Dance" },
      { to: "/services/fitness", label: "Fitness" },
      { to: "/services/acting", label: "Acting" },
      { to: "/services/events", label: "Events" },
    ]
  },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-glow">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg tracking-tight">RAJUMASTER'S</span>
            <span className="font-display text-sm text-primary tracking-[0.2em] -mt-1">RISE & SHINE</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <div key={l.label} className="relative group/item">
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1 uppercase text-sm font-bold tracking-widest transition-colors hover:text-primary py-4",
                    isActive ? "text-primary" : "text-foreground"
                  )
                }
              >
                {l.label}
                {l.dropdown && <ChevronDown className="w-4 h-4" />}
              </NavLink>

              {l.dropdown && (
                <div className="absolute top-full left-0 w-48 bg-card border border-border shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-300">
                  <div className="flex flex-col">
                    {l.dropdown.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        className={({ isActive }) =>
                          cn(
                            "px-4 py-3 text-xs uppercase font-bold tracking-widest hover:bg-primary/10 hover:text-primary transition-colors",
                            isActive ? "text-primary bg-primary/5" : "text-foreground"
                          )
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            to="/contact"
            className="ml-4 px-5 py-2.5 bg-gradient-fire text-primary-foreground font-bold uppercase text-sm tracking-wider hover:shadow-glow transition-all"
          >
            Book Free Class
          </Link>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-background border-t border-border max-h-[80vh] overflow-y-auto">
          <div className="container flex flex-col py-6 gap-4">
            {links.map((l) => (
              <div key={l.label} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => !l.dropdown && setOpen(false)}
                    className={({ isActive }) =>
                      cn("uppercase font-bold tracking-widest text-lg", isActive ? "text-primary" : "text-foreground")
                    }
                  >
                    {l.label}
                  </NavLink>
                </div>
                {l.dropdown && (
                  <div className="flex flex-col ml-4 mt-3 gap-3 border-l border-border pl-4">
                    {l.dropdown.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn("uppercase font-bold tracking-widest text-sm", isActive ? "text-primary" : "text-foreground")
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 px-5 py-4 bg-gradient-fire text-primary-foreground font-bold uppercase text-center tracking-wider"
            >
              Book Free Class
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

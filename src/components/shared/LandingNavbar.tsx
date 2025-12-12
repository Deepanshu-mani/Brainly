import { motion } from "framer-motion";
import { ButtonLanding as Button } from "@/components/ui/LandingButton";
import { Brain, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/50"
    >
      <div className="container-tight flex items-center justify-between h-16">
        <motion.a
          href="/"
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Brain className="w-5 h-5 text-background" />
          </div>
          <span className="font-heading font-semibold text-lg tracking-tight">Brainly</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it Works" /* , "Pricing" */].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => navigate('/signin')}>
            Sign In
          </Button>
          <Button variant="hero" size="sm" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-card border-t border-border"
      >
        <div className="container-tight py-4 space-y-3">
          {["Features", "How it Works" /* , "Pricing" */].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;

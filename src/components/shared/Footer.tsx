import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const Footer = () => {
  const links = ["Home", "Privacy Policy"];

  return (
    <footer className="border-t border-border py-12">
      <div className="container-tight">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.a
            href="/"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5 text-background" />
            </div>
            <span className="font-heading font-semibold text-lg">Brainly</span>
          </motion.a>

          <nav className="flex items-center gap-8">
            {links.map((item) => (
              <motion.a
                key={item}
                href={
                  item === "Privacy Policy"
                    ? "/privacy"
                    : item === "Home"
                      ? "/"
                      : "#"
                }
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          <p className="text-sm text-muted-foreground">
            © 2025 Brainly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

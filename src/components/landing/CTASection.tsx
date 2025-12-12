import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ButtonLanding as Button } from "@/components/ui/LandingButton";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(0 0% 100% / 0.02) 0%, transparent 60%)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container-tight relative">
        <motion.div
          className="card-elevated p-12 md:p-20 text-center glow-white border-gradient relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Floating sparkles */}
          <motion.div
            className="absolute top-10 left-10 text-muted-foreground/20"
            animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <motion.div
            className="absolute bottom-10 right-10 text-muted-foreground/20"
            animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>

          <motion.h2
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Ready to build your
            <br />
            <span className="text-muted-foreground">second brain?</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Join thousands of knowledge workers who never lose important content anymore.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="/signup">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
          <motion.p
            className="text-sm text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            No credit card required • Free forever plan available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

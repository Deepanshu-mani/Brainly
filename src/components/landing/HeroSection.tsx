import { motion } from "framer-motion";
import { useState } from "react";
import { ButtonLanding as Button } from "@/components/ui/LandingButton";
import { ArrowRight, Play, Sparkles, Check, Zap, Brain, Search } from "lucide-react";

const HeroSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);

  const features = [
    { icon: Brain, label: "AI Memory" },
    { icon: Zap, label: "Instant Search" },
    { icon: Check, label: "Auto-Organize" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Interactive background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Background glow effects */}
      <motion.div
        className="hero-gradient top-0 left-1/4 -translate-x-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-gradient bottom-0 right-1/4 translate-x-1/2"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_12%/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_12%/0.4)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_20%,transparent_100%)]" />

      <div className="container-tight relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Interactive feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            {features.map((feature, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveFeature(i)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm transition-all cursor-pointer ${activeFeature === i
                  ? "bg-foreground text-background border-foreground"
                  : "bg-foreground/[0.03] border-border hover:border-foreground/30"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <feature.icon className="w-3.5 h-3.5" />
                <span className="text-sm font-medium">{feature.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight mb-6 leading-[0.95]"
          >
            <span className="text-gradient">Your second brain</span>
            <br />
            <span className="text-muted-foreground">— searchable.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Save videos, tweets, links & notes. Find them instantly with AI.
            Never lose important content again.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" className="w-full sm:w-auto group" asChild>
              <a href="/signin">
                Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></a>
            </Button>
            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto group" asChild>
              <a href="#demo">
                <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Watch Demo
              </a>
            </Button>
          </motion.div>

          {/* Interactive social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                >
                  <span className="text-xs font-medium text-muted-foreground">{String.fromCharCode(64 + i)}</span>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="w-10 h-10 rounded-full bg-foreground border-2 border-background flex items-center justify-center overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.2, zIndex: 10 }}
              >
                <span className="text-xs font-bold text-background">+2k</span>
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground">
              Join <span className="text-foreground font-medium">2,000+</span> knowledge workers
            </p>
          </motion.div>
        </div>

        {/* Interactive Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10 pointer-events-none h-full" />
          <div className="card-elevated p-1.5 glow-white border-gradient">
            <div className="bg-card rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
                <div className="flex gap-1.5">
                  {['bg-red-500/50', 'bg-yellow-500/50', 'bg-green-500/50'].map((color, i) => (
                    <motion.div
                      key={i}
                      className={`w-3 h-3 rounded-full ${color} cursor-pointer`}
                      whileHover={{ scale: 1.3 }}
                    />
                  ))}
                </div>
                <div className="flex-1 flex justify-center">
                  <motion.div
                    className="px-4 py-1.5 bg-muted/50 rounded-lg text-xs text-muted-foreground border border-border/50 cursor-pointer"
                    whileHover={{ scale: 1.02, borderColor: "hsl(0 0% 30%)" }}
                  >
                    app.brainly.ai
                  </motion.div>
                </div>
              </div>
              <div className="p-6 min-h-[320px] flex flex-col gap-4">
                {/* Interactive Search bar */}
                <motion.div
                  className={`flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border cursor-pointer transition-all ${searchFocused ? "border-foreground/30 bg-secondary" : "border-border"
                    }`}
                  onClick={() => setSearchFocused(!searchFocused)}
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.div
                    animate={searchFocused ? { rotate: [0, 15, -15, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className={`w-5 h-5 transition-colors ${searchFocused ? "text-foreground" : "text-muted-foreground"}`} />
                  </motion.div>
                  <span className={`text-sm flex-1 transition-colors ${searchFocused ? "text-foreground" : "text-muted-foreground"}`}>
                    {searchFocused ? "Try: 'that video about React hooks'" : "Click to search your memory..."}
                  </span>
                  <Search className="w-4 h-4 text-muted-foreground" />
                </motion.div>
                {/* Interactive Content cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['YouTube Video', 'Twitter Thread', 'Website'].map((type, i) => (
                    <motion.div
                      key={i}
                      className="p-4 bg-secondary/30 rounded-xl border border-border group hover:border-foreground/20 transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="w-full h-24 bg-muted/50 rounded-lg mb-3 group-hover:bg-muted transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                      >
                        <motion.span
                          className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          {i === 0 ? "▶" : i === 1 ? "💬" : "🌐"}
                        </motion.span>
                      </motion.div>
                      <div className="h-3 bg-muted rounded w-3/4 mb-2 group-hover:bg-foreground/20 transition-colors" />
                      <div className="h-2 bg-muted/50 rounded w-1/2" />
                      <div className="mt-3">
                        <motion.span
                          className="px-2 py-1 bg-foreground/5 text-muted-foreground text-xs rounded-md border border-border/50 group-hover:bg-foreground group-hover:text-background transition-all"
                          whileHover={{ scale: 1.05 }}
                        >
                          {type}
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

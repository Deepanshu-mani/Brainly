import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Save, Cpu, Search, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: Save,
      step: "01",
      title: "Save anything",
      description: "YouTube videos, tweets, notes, websites — capture content from anywhere with one click.",
    },
    {
      icon: Cpu,
      step: "02",
      title: "AI processes it",
      description: "We extract transcripts, generate summaries, and create semantic embeddings automatically.",
    },
    {
      icon: Search,
      step: "03",
      title: "Search naturally",
      description: '"Find that coding video about closures from last week" — ask in plain English.',
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to never lose content again.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {steps.map(({ icon: Icon, step, title, description }, index) => (
            <motion.div
              key={step}
              className="card-interactive p-8 relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Step number */}
              <motion.div 
                className="absolute top-6 right-6 text-5xl font-heading font-bold text-muted/30 group-hover:text-muted-foreground/20 transition-colors"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
              >
                {step}
              </motion.div>
              
              {/* Icon */}
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Icon className="w-7 h-7 text-foreground" />
              </motion.div>

              <h3 className="font-heading text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{description}</p>

              {/* Arrow indicator on hover */}
              <motion.div 
                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              >
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

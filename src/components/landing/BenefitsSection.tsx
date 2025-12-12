import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Brain } from "lucide-react";

const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: Shield,
      title: "Never lose important content again",
      description: "Everything you save is securely stored and instantly retrievable.",
    },
    {
      icon: Zap,
      title: "Find anything in 1 second",
      description: "AI-powered search delivers results before you finish typing.",
    },
    {
      icon: Brain,
      title: "A smart memory that grows with you",
      description: "The more you save, the smarter your second brain becomes.",
    },
  ];

  return (
    <section ref={ref} className="section-padding relative">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <motion.div 
              key={title} 
              className="text-center group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto rounded-2xl bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Icon className="w-9 h-9 text-foreground" />
              </motion.div>
              <h3 className="font-heading text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

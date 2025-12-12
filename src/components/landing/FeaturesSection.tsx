import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Youtube, MessageSquare, Tags, Chrome, RefreshCw, ArrowUpRight } from "lucide-react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Search,
      title: "AI Semantic Search",
      description: "Search by meaning, not just keywords. Find content based on concepts and context.",
    },
    {
      icon: Youtube,
      title: "YouTube Transcript Indexing",
      description: "Automatically extract and index video transcripts for instant searchability.",
    },
    {
      icon: MessageSquare,
      title: "Twitter Post Extraction",
      description: "Save threads and tweets. Full text indexed and ready to search.",
    },
    {
      icon: Tags,
      title: "Smart Collections & Tags",
      description: "AI-suggested tags and automatic categorization keeps everything organized.",
    },
    {
      icon: Chrome,
      title: "Chrome Extension",
      description: "Save content with one click directly from your browser. Seamless workflow.",
    },
    {
      icon: RefreshCw,
      title: "Cross-Platform Sync",
      description: "Access your memory from any device. Always in sync, always available.",
    },
  ];

  return (
    <section id="features" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 0% 100% / 0.02) 0%, transparent 60%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="container-tight relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Powerful features designed to capture, organize, and retrieve your digital knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.div 
              key={title} 
              className="card-interactive p-6 group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-foreground/5 border border-border flex items-center justify-center mb-5 group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-6 h-6 text-foreground" />
                </motion.div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading text-lg font-semibold">{title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

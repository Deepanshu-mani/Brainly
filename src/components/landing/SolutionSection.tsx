import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, ArrowRight, Check, Play, FileText, Link2 } from "lucide-react";

const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState<number | null>(null);

  const searchSuggestions = [
    "coding video about closures",
    "productivity tweet from last week",
    "machine learning article",
  ];

  const results = [
    {
      title: "JavaScript Closures Explained",
      source: "YouTube",
      date: "Saved Dec 2",
      match: 98,
      icon: Play,
    },
    {
      title: "Understanding Scope in JS",
      source: "Article",
      date: "Saved Nov 28",
      match: 72,
      icon: FileText,
    },
    {
      title: "Closure Best Practices",
      source: "Blog Post",
      date: "Saved Nov 15",
      match: 65,
      icon: Link2,
    },
  ];

  return (
    <section ref={ref} className="section-padding relative">
      <div className="container-tight">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.03] border border-border mb-6 cursor-pointer"
              whileHover={{ scale: 1.05, borderColor: "hsl(0 0% 30%)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4 text-foreground" />
              <span className="text-sm text-muted-foreground font-medium">The Solution</span>
            </motion.div>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              We turn everything you save into an
              <br />
              <span className="text-muted-foreground">AI-searchable memory.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One place for all your digital content. Try the interactive demo below!
            </p>
          </motion.div>

          {/* Interactive demo */}
          <motion.div 
            className="card-elevated p-6 glow-subtle border-gradient"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Interactive search input */}
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="flex-1 flex items-center gap-3 p-4 bg-secondary rounded-xl border border-border group hover:border-foreground/20 transition-all">
                <motion.div 
                  className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors"
                  animate={searchQuery ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-4 h-4 text-foreground" />
                </motion.div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search your memory..."
                  className="text-sm text-foreground flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground"
                />
                <ArrowRight className={`w-4 h-4 transition-all ${searchQuery ? "text-foreground" : "text-muted-foreground"}`} />
              </div>
            </motion.div>

            {/* Quick search suggestions */}
            <div className="flex flex-wrap gap-2 mb-6">
              {searchSuggestions.map((suggestion, i) => (
                <motion.button
                  key={i}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-1.5 text-xs text-muted-foreground bg-secondary/50 rounded-full border border-border hover:border-foreground/20 hover:text-foreground transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  "{suggestion}"
                </motion.button>
              ))}
            </div>

            {/* Results */}
            <div className="space-y-3">
              {results.map((result, i) => (
                <motion.div 
                  key={i}
                  className={`p-5 rounded-xl border relative overflow-hidden cursor-pointer transition-all ${
                    selectedResult === i 
                      ? "bg-secondary border-foreground/20" 
                      : "bg-secondary/50 border-border hover:border-foreground/10"
                  }`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedResult(selectedResult === i ? null : i)}
                >
                  {selectedResult === i && (
                    <motion.div 
                      className="absolute top-2 right-2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Check className="w-5 h-5 text-foreground" />
                    </motion.div>
                  )}
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-14 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        selectedResult === i ? "bg-foreground/10" : "bg-muted/50"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <result.icon className="w-5 h-5 text-foreground" />
                    </motion.div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium mb-1 transition-colors ${
                        selectedResult === i ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {result.title}
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">{result.source} • {result.date}</p>
                      <motion.span 
                        className={`inline-flex px-3 py-1 text-xs rounded-full font-medium transition-all ${
                          result.match > 90 
                            ? "bg-foreground text-background" 
                            : "bg-muted text-muted-foreground"
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {result.match}% match
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

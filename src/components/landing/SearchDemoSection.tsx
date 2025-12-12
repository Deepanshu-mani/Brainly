import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Search, Youtube, FileText, MessageSquare } from "lucide-react";

const SearchDemoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [userInput, setUserInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hoveredResult, setHoveredResult] = useState<number | null>(null);

  const exampleQueries = [
    "Find that video about React hooks",
    "What was that tweet about productivity?",
    "Show me articles about machine learning",
  ];

  const results = [
    {
      icon: Youtube,
      title: "React Hooks Complete Guide",
      source: "YouTube",
      match: 95,
      preview: "A comprehensive walkthrough of useState, useEffect..."
    },
    {
      icon: MessageSquare,
      title: "Thread: 10 React Hook Tips",
      source: "Twitter",
      match: 87,
      preview: "Here are my top tips for using React hooks effectively..."
    },
    {
      icon: FileText,
      title: "Understanding useEffect",
      source: "Medium",
      match: 82,
      preview: "The useEffect hook is one of the most important..."
    },
  ];

  const handleSearch = (query?: string) => {
    const searchTerm = query || userInput;
    if (!searchTerm.trim()) return;

    setUserInput(searchTerm);
    setIsSearching(true);
    setShowResults(false);

    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 800);
  };

  return (
    <section id="demo" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Search like you think
          </h2>
          <p className="text-lg text-muted-foreground">
            Try it yourself! Type a query or click an example below.
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="card-elevated p-8 glow-white border-gradient">
            {/* Interactive search input */}
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl border border-border mb-4 group focus-within:border-foreground/30 transition-all">
              <motion.div
                animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.8, repeat: isSearching ? Infinity : 0, ease: "linear" }}
              >
                <Sparkles className={`w-5 h-5 shrink-0 transition-colors ${isSearching ? "text-foreground" : "text-muted-foreground"}`} />
              </motion.div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Ask anything about your saved content..."
                className="text-foreground flex-1 min-h-[24px] bg-transparent border-none outline-none placeholder:text-muted-foreground"
              />
              <motion.button
                onClick={() => handleSearch()}
                className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>

            {/* Example query buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {exampleQueries.map((query, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleSearch(query)}
                  className="px-3 py-1.5 text-xs text-muted-foreground bg-secondary/50 rounded-full border border-border hover:border-foreground/20 hover:text-foreground transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  {query}
                </motion.button>
              ))}
            </div>

            {/* Results */}
            <div className="space-y-3 min-h-[200px]">
              {isSearching && (
                <motion.div
                  className="flex items-center justify-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-foreground rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {showResults && results.map((result, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl border border-border cursor-pointer group hover:bg-secondary hover:border-foreground/10 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  onHoverStart={() => setHoveredResult(i)}
                  onHoverEnd={() => setHoveredResult(null)}
                >
                  <motion.div
                    className="w-14 h-14 bg-muted rounded-lg shrink-0 flex items-center justify-center group-hover:bg-foreground/10 transition-colors"
                    animate={hoveredResult === i ? { scale: 1.1 } : { scale: 1 }}
                  >
                    <result.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </motion.div>
                  <div className="flex-1 overflow-hidden">
                    <div className="font-medium text-sm mb-1 group-hover:text-foreground transition-colors truncate">
                      {result.title}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">{result.source}</div>
                    <motion.div
                      className="text-xs text-muted-foreground/70 truncate"
                      initial={{ opacity: 0, height: 0 }}
                      animate={hoveredResult === i ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                    >
                      {result.preview}
                    </motion.div>
                  </div>
                  <motion.span
                    className="px-3 py-1.5 bg-foreground text-background text-xs rounded-full font-medium shrink-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    {result.match}%
                  </motion.span>
                </motion.div>
              ))}

              {!isSearching && !showResults && (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Search className="w-8 h-8 mb-3 opacity-30" />
                  <p className="text-sm">Try searching for something above</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchDemoSection;

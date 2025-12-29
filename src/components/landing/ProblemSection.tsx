import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Chrome, MessageSquare, Youtube, FileText, Bookmark, Globe, AlertCircle, X } from "lucide-react";

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [closedIcons, setClosedIcons] = useState<string[]>([]);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const icons = [
    { Icon: Youtube, label: "Videos", color: "hover:text-red-400" },
    { Icon: MessageSquare, label: "Tweets", color: "hover:text-blue-400" },
    { Icon: Chrome, label: "Tabs", color: "hover:text-yellow-400" },
    { Icon: FileText, label: "Notes", color: "hover:text-green-400" },
    { Icon: Bookmark, label: "Bookmarks", color: "hover:text-purple-400" },
    { Icon: Globe, label: "Links", color: "hover:text-cyan-400" },
  ];

  const positions = [
    { x: -180, y: -60, rotate: -12 },
    { x: 160, y: -80, rotate: 8 },
    { x: 220, y: 50, rotate: -5 },
    { x: -200, y: 70, rotate: 15 },
    { x: 40, y: 90, rotate: -8 },
    { x: -60, y: -10, rotate: 6 },
  ];

  const painPoints = [
    { number: 47, label: "browser tabs open on average", suffix: "" },
    { number: 3, label: "hours weekly searching for content", suffix: "+" },
    { number: 60, label: "of saved links never revisited", suffix: "%" },
  ];

  const handleClose = (label: string) => {
    setClosedIcons([...closedIcons, label]);
    setTimeout(() => {
      setClosedIcons(closedIcons.filter(l => l !== label));
    }, 2000);
  };

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="container-tight">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your digital life is
            <br />
            <span className="text-muted-foreground">scattered everywhere.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Important content lost across dozens of apps, browser tabs, and platforms.
            <span className="text-foreground/80"> Try closing them!</span>
          </p>
        </motion.div>

        {/* Interactive floating icons */}
        <div className="relative max-w-xl mx-auto h-56 mb-16">
          {icons.map(({ Icon, label, color }, index) => (
            <motion.div
              key={label}
              className={`absolute left-1/2 top-1/2 card-interactive p-5 group cursor-pointer ${closedIcons.includes(label) ? "opacity-0 scale-0" : ""
                }`}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView && !closedIcons.includes(label) ? {
                opacity: 1,
                scale: 1,
                x: positions[index].x,
                y: positions[index].y,
                rotate: positions[index].rotate,
              } : { opacity: 0, scale: 0 }}
              transition={{
                delay: 0.1 * index + 0.3,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.15,
                rotate: 0,
                zIndex: 10,
              }}
              onClick={() => handleClose(label)}
            >
              <Icon className={`w-8 h-8 text-muted-foreground transition-colors ${color}`} />
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.2 }}
              >
                <X className="w-3 h-3 text-background" />
              </motion.div>
              <motion.span
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {label}
              </motion.span>
            </motion.div>
          ))}

          {/* Chaos indicator */}
          {closedIcons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <p className="text-sm text-muted-foreground">
                {closedIcons.length < 6 ? "Keep going..." : "They always come back! 😅"}
              </p>
            </motion.div>
          )}
        </div>

        {/* Interactive Pain point stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {painPoints.map(({ number, label, suffix }, index) => (
            <motion.div
              key={label}
              className="text-center p-6 card-elevated border-destructive/20 group hover:border-destructive/40 transition-colors cursor-pointer relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
            >
              {/* Animated background on hover */}
              <motion.div
                className="absolute inset-0 bg-destructive/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredStat === index ? 1 : 0 }}
              />

              <div className="flex items-center justify-center gap-2 mb-2 relative">
                <motion.div
                  animate={hoveredStat === index ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <AlertCircle className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.div>
                <motion.span
                  className="font-heading text-3xl md:text-4xl font-bold tabular-nums"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                >
                  <Counter value={number} isInView={isInView} delay={0.6 + index * 0.1} />
                  {suffix}
                </motion.span>
              </div>
              <p className="text-sm text-muted-foreground relative">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Animated counter component
const Counter = ({ value, isInView, delay }: { value: number; isInView: boolean; delay: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        const duration = 1500;
        const steps = 30;
        const increment = value / steps;
        let current = 0;

        countRef.current = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            if (countRef.current) clearInterval(countRef.current);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }, delay * 1000);

      return () => {
        clearTimeout(timeout);
        if (countRef.current) clearInterval(countRef.current);
      };
    }
  }, [isInView, value, delay]);

  return <>{isInView ? count : 0}</>;
};

export default ProblemSection;

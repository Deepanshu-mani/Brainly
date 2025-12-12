import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      quote: "Finally, I can find that one video I watched months ago. Game changer for research.",
      author: "Sarah K.",
      role: "Product Designer",
    },
    {
      quote: "I've tried every bookmark manager. Brainly is the first one that actually works.",
      author: "Marcus T.",
      role: "Software Engineer",
    },
    {
      quote: "The AI search is incredibly accurate. It understands exactly what I'm looking for.",
      author: "Emily R.",
      role: "Content Strategist",
    },
  ];

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="container-tight">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Loved by knowledge workers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, author, role }, index) => (
            <motion.div 
              key={author} 
              className="card-interactive p-6 group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.svg 
                    key={star} 
                    className="w-4 h-4 text-foreground fill-current" 
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + star * 0.05 + index * 0.1 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-muted-foreground/30 mb-3" />
              
              <p className="text-foreground mb-6 leading-relaxed">{quote}</p>
              
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-11 h-11 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:border-foreground/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-sm font-medium text-foreground">{author.charAt(0)}</span>
                </motion.div>
                <div>
                  <p className="font-medium text-sm">{author}</p>
                  <p className="text-muted-foreground text-xs">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ButtonLanding as Button } from "@/components/ui/LandingButton";
import { Check, Sparkles } from "lucide-react";

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For individuals getting started",
      features: [
        "100 saved items",
        "Basic AI search",
        "Chrome extension",
        "Mobile access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      description: "For power users and professionals",
      features: [
        "Unlimited saved items",
        "Advanced AI search",
        "YouTube transcripts",
        "Smart collections",
        "Priority support",
        "API access",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
  ];

  return (
    <section id="pricing" ref={ref} className="section-padding relative">
      <div className="container-tight">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free. Upgrade when you need more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`card-interactive p-8 relative ${plan.popular ? "border-foreground/20 glow-white" : ""
                }`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-foreground text-background text-xs font-medium rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </motion.div>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <motion.span
                    className="font-heading text-5xl font-bold"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                  >
                    {plan.price}
                  </motion.span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.05 + index * 0.1 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-foreground/5 border border-border flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-foreground" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "heroOutline"}
                className="w-full"
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

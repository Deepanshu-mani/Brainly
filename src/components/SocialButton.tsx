"use client";

import { useState } from "react";
import { Maximize2, Link, Trash2, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

interface CardActionButtonProps {
  className?: string;
  onExpand?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  isValidLink?: boolean;
  isShared?: boolean;
  isEditMode?: boolean; // New prop to determine if this is an edit action
}

export function CardActionButton({
  className = "",
  onExpand,
  onShare,
  onDelete,
  isValidLink = true,
  isShared = false,
  isEditMode = false,
}: CardActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  const actionButtons = [
    { icon: Maximize2, label: "Expand", action: onExpand },
    {
      icon: isEditMode ? Edit : Link,
      label: isEditMode ? "Edit" : "Open link",
      action: onShare,
      disabled: isEditMode ? false : !isValidLink,
    },
    { icon: Trash2, label: "Delete", action: onDelete, disabled: isShared },
  ].filter((button) => button.action); // Only show buttons that have actions

  const handleAction = (index: number) => {
    const button = actionButtons[index];
    if (button.action && !button.disabled) {
      setActiveIndex(index);
      button.action();
      setTimeout(() => setActiveIndex(null), 300);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        animate={{
          opacity: isVisible ? 0 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        <button
          className={`
            h-8 w-8 relative rounded-md backdrop-blur-sm border transition-all duration-300
            ${
              theme === "light"
                ? "bg-white/90 border-black/10 hover:bg-black/5 hover:border-black/20"
                : "bg-black/90 border-white/10 hover:bg-white/5 hover:border-white/20"
            }
            flex items-center justify-center shadow-lg
          `}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </motion.div>

      <motion.div
        className="absolute top-0 right-0 flex h-8 overflow-hidden flex-row-reverse"
        animate={{
          width: isVisible ? "auto" : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {actionButtons.map((button, i) => (
          <motion.button
            type="button"
            key={`action-${button.label}`}
            aria-label={button.label}
            onClick={() => handleAction(i)}
            disabled={button.disabled}
            className={`
              h-8 w-8 flex items-center justify-center
              ${
                theme === "light"
                  ? "bg-white/90 border-r border-black/10 hover:bg-black/5"
                  : "bg-black/90 border-r border-white/10 hover:bg-white/5"
              }
              ${i === actionButtons.length - 1 ? "rounded-l-md" : ""}
              ${i === 0 ? "rounded-r-md" : ""}
              last:border-r-0
              outline-none relative overflow-hidden
              transition-colors duration-200 shadow-lg
              ${button.disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : 20,
            }}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: isVisible ? i * 0.05 : 0,
            }}
          >
            <motion.div
              className="relative z-10"
              animate={{
                scale: activeIndex === i ? 0.85 : 1,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <button.icon className="w-3.5 h-3.5" />
            </motion.div>
            <motion.div
              className={`absolute inset-0 ${
                theme === "light" ? "bg-white" : "bg-black"
              }`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeIndex === i ? 0.15 : 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

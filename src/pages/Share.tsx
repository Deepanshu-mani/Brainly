import { Card } from "../ui/Card";
import { NoteCard } from "../components/dashboard/NoteCard";
import { WebsiteCard } from "../ui/WebsiteCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BrainIcon } from "../ui/icons";
import { useTheme } from "../contexts/ThemeContext";
import type { Content } from "../types/content";

export function Share() {
  const { shareId } = useParams();
  const { theme } = useTheme();
  const [data, setData] = useState<{
    username: string;
    content: Content[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "twitter" | "youtube" | "website" | "note" | "all"
  >("all");

  useEffect(() => {
    if (shareId) {
      axios
        .get(`${BACKEND_URL}/brain/${shareId}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching shared content:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [shareId]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${theme === "light" ? "bg-white" : "bg-black"
          }`}
      >
        <div className="text-center">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-2 mx-auto mb-6 ${theme === "light"
                ? "border-black/20 border-t-black"
                : "border-white/20 border-t-white"
              }`}
          ></div>
          <p
            className={`text-lg font-medium ${theme === "light" ? "text-black/60" : "text-white/60"
              }`}
          >
            Loading shared content...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${theme === "light" ? "bg-white" : "bg-black"
          }`}
      >
        <div className="text-center">
          <h2
            className={`text-3xl font-bold mb-4 ${theme === "light" ? "text-black" : "text-white"
              }`}
          >
            Content Not Found
          </h2>
          <p
            className={`text-lg font-medium ${theme === "light" ? "text-black/60" : "text-white/60"
              }`}
          >
            The shared content you're looking for doesn't exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  const filteredContent = (data?.content || []).filter(
    (item) => filter === "all" || item.type === filter,
  );

  return (
    <div
      className={`min-h-screen w-full relative transition-colors duration-300 ${theme === "light" ? "bg-white" : "bg-black"
        }`}
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#000000",
      }}
    >
      {/* Theme-based Background Pattern */}
      {theme === "light" ? (
        /* Light Theme - Noise Texture (Darker Dots) Background */
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      ) : (
        /* Dark Theme - Dark White Dotted Grid Background */
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#000000",
            backgroundImage: `
              radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "30px 30px",
            backgroundPosition: "0 0",
          }}
        />
      )}

      {/* Modern Header */}
      <header
        className={`border-b backdrop-blur-2xl sticky top-0 z-50 ${theme === "light"
            ? "border-black/10 bg-white/80 shadow-lg shadow-black/5"
            : "border-white/10 bg-black/80 shadow-lg shadow-white/5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <BrainIcon />
              <span
                className={`text-xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}
              >
                Brainly
              </span>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* Shared indicator */}
              <div
                className={`px-4 py-2 rounded-xl text-sm font-medium ${theme === "light"
                    ? "bg-black/10 text-black/60"
                    : "bg-white/10 text-white/60"
                  }`}
              >
                Shared Content
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1
            className={`text-5xl font-bold mb-4 tracking-tight ${theme === "light" ? "text-black" : "text-white"
              }`}
          >
            Shared by {data.username}
          </h1>
          <p
            className={`text-xl font-medium ${theme === "light" ? "text-black/60" : "text-white/60"
              }`}
          >
            {filteredContent.length} memories shared
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12">
          <div
            className={`flex space-x-2 p-2 rounded-2xl w-fit backdrop-blur-sm border ${theme === "light"
                ? "bg-black/5 border-black/10"
                : "bg-white/5 border-white/10"
              }`}
          >
            {[
              { key: "all", label: "All Memories", count: data.content.length },
              {
                key: "website",
                label: "Web Pages",
                count: data.content.filter((c) => c.type === "website").length,
              },
              {
                key: "youtube",
                label: "Videos",
                count: data.content.filter((c) => c.type === "youtube").length,
              },
              {
                key: "twitter",
                label: "Tweets",
                count: data.content.filter((c) => c.type === "twitter").length,
              },
              {
                key: "note",
                label: "Notes",
                count: data.content.filter((c) => c.type === "note").length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setFilter(
                    tab.key as
                    | "all"
                    | "website"
                    | "youtube"
                    | "twitter"
                    | "note",
                  )
                }
                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${filter === tab.key
                    ? theme === "light"
                      ? "bg-black text-white shadow-lg"
                      : "bg-white text-black shadow-lg"
                    : theme === "light"
                      ? "text-black/60 hover:text-black hover:bg-black/10"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="pb-12">
          {filteredContent.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-lg mx-auto">
                <h3
                  className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-black" : "text-white"
                    }`}
                >
                  No {filter} content
                </h3>
                <p
                  className={`text-lg font-medium ${theme === "light" ? "text-black/60" : "text-white/60"
                    }`}
                >
                  This user hasn't shared any {filter === "all" ? "" : filter}{" "}
                  content yet.
                </p>
              </div>
            </div>
          ) : (
            <Masonry
              breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
              className="flex -ml-6 w-auto"
              columnClassName="pl-6 bg-clip-padding"
            >
              {filteredContent.map((item) => (
                <div key={item._id || Math.random()} className="mb-6">
                  {item.type === "website" ? (
                    <WebsiteCard content={item} isShared={true} />
                  ) : item.type === "note" ? (
                    <NoteCard content={item} isShared={true} />
                  ) : (
                    <Card
                      link={item.link}
                      type={item.type}
                      id={item._id}
                      tags={item.tags}
                      isShared={true}
                    />
                  )}
                </div>
              ))}
            </Masonry>
          )}
        </div>
      </main>
    </div>
  );
}

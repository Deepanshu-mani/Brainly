import { Card } from "../ui/Card";
import { NoteCard } from "../components/NoteCard";
import { WebsiteCard } from "../ui/WebsiteCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Sidebar } from "../ui/Sidebar";
import { MenuIcon } from "../ui/icons/MenuIcon";
import { BrainIcon } from "../ui/icons/BrainIcon";

export function Share() {
  const { shareId } = useParams();
  const [data, setData] = useState<{ username: string; content: any[] } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "twitter" | "youtube" | "website" | "note" | "all"
  >("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  type SidebarFilter = "all" | "twitter" | "youtube" | "website" | "notes";
  const sidebarFilter: SidebarFilter = filter === "note" ? "notes" : filter;
  const handleSidebarFilterChange = (newFilter: SidebarFilter) => {
    setFilter(newFilter === "notes" ? "note" : newFilter);
  };

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center dark:from-dark-background dark:via-dark-surface dark:to-dark-surface-alt">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4 dark:border-dark-border dark:border-t-dark-primary"></div>
          <p className="text-gray-600 dark:text-dark-text-muted">
            Loading shared content...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center dark:from-dark-background dark:via-dark-surface dark:to-dark-surface-alt">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-dark-text">
            Content Not Found
          </h2>
          <p className="text-gray-600 dark:text-dark-text-muted">
            The shared content you're looking for doesn't exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  const filteredContent = (data?.content || []).filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-dark-background dark:via-dark-surface dark:to-dark-surface-alt">
      {/* Sidebar */}
      <Sidebar
        filter={sidebarFilter}
        setFilter={handleSidebarFilterChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 min-h-screen overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-30 dark:border-dark-border dark:bg-dark-surface/80">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-dark-surface-alt/80 dark:text-dark-text"
            >
              <MenuIcon />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <BrainIcon />
              </div>
              <span className="text-xl font-bold text-purple-600 dark:text-dark-primary">
                Brainly
              </span>
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>

          {/* Header */}
          <div className="pt-4 lg:pt-10 pb-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2 dark:from-dark-primary dark:to-dark-primary-hover">
                Shared by {data.username}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base dark:text-dark-text-muted">
                {filteredContent.length} {filter === "all" ? "items" : filter}{" "}
                shared
              </p>
            </div>
          </div>

          {/* Stats Cards -> filter buttons */}
          <div className="grid grid-cols-5 gap-1 sm:gap-2 lg:gap-3 mb-6 lg:mb-8">
            {/* All */}
            <button onClick={() => setFilter('all')} className={`bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border shadow-lg dark:bg-dark-surface/80 ${filter==='all' ? 'border-purple-500' : 'border-white/20 dark:border-dark-border'}`}>
              <div className="flex flex-col items-center text-center">
                <div className="p-1 sm:p-1.5 bg-purple-100 rounded-lg dark:bg-dark-primary/20 mb-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                <p className="text-sm sm:text-base dark:text-white font-bold">{data.content.length}</p>
              </div>
            </button>
            {/* YouTube */}
            <button onClick={() => setFilter('youtube')} className={`bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border shadow-lg dark:bg-dark-surface/80 ${filter==='youtube' ? 'border-red-500' : 'border-white/20 dark:border-dark-border'}`}>
              <div className="flex flex-col items-center text-center">
                <div className="p-1 sm:p-1.5 bg-red-100 rounded-lg dark:bg-red-900/30 mb-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <p className="text-sm sm:text-base font-bold text-red-600">{data.content.filter(c=>c.type==='youtube').length}</p>
              </div>
            </button>
            {/* Twitter */}
            <button onClick={() => setFilter('twitter')} className={`bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border shadow-lg dark:bg-dark-surface/80 ${filter==='twitter' ? 'border-blue-500' : 'border-white/20 dark:border-dark-border'}`}>
              <div className="flex flex-col items-center text-center">
                <div className="p-1 sm:p-1.5 bg-blue-100 rounded-lg dark:bg-blue-900/30 mb-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <p className="text-sm sm:text-base font-bold text-blue-600">{data.content.filter(c=>c.type==='twitter').length}</p>
              </div>
            </button>
            {/* Websites */}
            <button onClick={() => setFilter('website')} className={`bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border shadow-lg dark:bg-dark-surface/80 ${filter==='website' ? 'border-emerald-500' : 'border-white/20 dark:border-dark-border'}`}>
              <div className="flex flex-col items-center text-center">
                <div className="p-1 sm:p-1.5 bg-emerald-100 rounded-lg dark:bg-emerald-900/30 mb-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.59 13.41a1.5 1.5 0 010-2.12l3.88-3.88a3 3 0 114.24 4.24l-1.06 1.06m-4.24 4.24l-3.88 3.88a3 3 0 11-4.24-4.24l1.06-1.06"/></svg>
                </div>
                <p className="text-sm sm:text-base font-bold text-emerald-600">{data.content.filter(c=>c.type==='website').length}</p>
              </div>
            </button>
            {/* Notes */}
            <button onClick={() => setFilter('note')} className={`bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border shadow-lg dark:bg-dark-surface/80 ${filter==='note' ? 'border-yellow-500' : 'border-white/20 dark:border-dark-border'}`}>
              <div className="flex flex-col items-center text-center">
                <div className="p-1 sm:p-1.5 bg-yellow-100 rounded-lg dark:bg-yellow-900/30 mb-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3h6a2 2 0 012 2v11.586a1 1 0 01-.293.707l-3.586 3.586A1 1 0 0112.414 21H9a2 2 0 01-2-2V5a2 2 0 012-2zm6 13h-2a 2 2 0 00-2 2v2"/></svg>
                </div>
                <p className="text-sm sm:text-base font-bold text-yellow-600">{data.content.filter(c=>c.type==='note').length}</p>
              </div>
            </button>
          </div>

          {/* Content Grid */}
          <div className="pb-6 lg:pb-10">
            {filteredContent.length === 0 ? (
              <div className="text-center py-12 lg:py-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/20 shadow-lg max-w-md mx-auto">
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    No {filter} content
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base">
                    This user hasn't shared any {filter === "all" ? "" : filter}{" "}
                    content yet.
                  </p>
                </div>
              </div>
            ) : (
              <Masonry
                key={filter}
                breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                className="flex -ml-4 w-auto"
                columnClassName="pl-4 bg-clip-padding"
              >
                {filteredContent.map((item, idx) => (
                  <div key={idx} className="mb-4">
                    {item.type === "website" ? (
                      <WebsiteCard content={item} isShared={true} />
                    ) : item.type === "note" ? (
                      <NoteCard content={item} isShared={true} />
                    ) : (
                      <Card
                        title={item.title || "Untitled"}
                        link={item.link}
                        type={item.type}
                        id={item.id}
                        tags={item.tags}
                        isShared={true}
                      />
                    )}
                  </div>
                ))}
              </Masonry>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

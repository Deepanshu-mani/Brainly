import { Card } from "../components/ui/Card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Sidebar } from "../components/ui/Sidebar";
import { MenuIcon } from "../components/ui/icons/MenuIcon";
import { BrainIcon } from "../components/ui/icons/BrainIcon";

export function Share() {
  const { shareId } = useParams();
  const [data, setData] = useState<{ username: string; content: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"twitter" | "youtube" | "all">("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (shareId) {
      axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`)
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shared content...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Content Not Found</h2>
          <p className="text-gray-600">The shared content you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const filteredContent = data.content.filter(item => filter === "all" || item.type === filter);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Sidebar */}
      <Sidebar 
        filter={filter} 
        setFilter={setFilter}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 min-h-screen overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MenuIcon />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <BrainIcon />
              </div>
              <span className="text-xl font-bold text-purple-600">Brainly</span>
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>

          {/* Header */}
          <div className="pt-4 lg:pt-10 pb-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2">
                Shared by {data.username}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {filteredContent.length} {filter === 'all' ? 'items' : filter} shared
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 lg:mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{data.content.length}</p>
                </div>
                <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">YouTube Videos</p>
                  <p className="text-xl sm:text-2xl font-bold text-red-600">
                    {data.content.filter(c => c.type === 'youtube').length}
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-red-100 rounded-lg">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Twitter Posts</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">
                    {data.content.filter(c => c.type === 'twitter').length}
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="pb-6 lg:pb-10">
            {filteredContent.length === 0 ? (
              <div className="text-center py-12 lg:py-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/20 shadow-lg max-w-md mx-auto">
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">No {filter} content</h3>
                  <p className="text-gray-600 text-sm lg:text-base">
                    This user hasn't shared any {filter === 'all' ? '' : filter} content yet.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {filteredContent.map((item, idx) => (
                  <div key={idx} className="w-full">
                    <Card
                      title={item.title || "Untitled"}
                      link={item.link}
                      type={item.type}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
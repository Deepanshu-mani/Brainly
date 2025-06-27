import { PlusIcon } from "../components/ui/icons/PlusIcon";
import { ShareIcnon } from "../components/ui/icons/ShareIcon";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useEffect, useState } from "react";
import { Sidebar, FilterContext } from "../components/ui/Sidebar";
import { UseContent } from "../components/hooks/UseContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'twitter' | 'youtube'>('all');
  const { contents, refresh } = UseContent();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    refresh().finally(() => setLoading(false));
  }, [modalOpen]);

  const filteredContents = filter === 'all' 
    ? contents || []
    : contents?.filter(content => content.type === filter) || [];

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <>
        <Sidebar filter={filter} setFilter={setFilter} />
        <div className="ml-[15rem] min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-[1200px] mx-auto px-6">
            <CreateContentModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
            />

            {/* Header Section */}
            <div className="pt-8 pb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    Your Brain
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {filteredContents.length} {filter === 'all' ? 'items' : filter} saved
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setModalOpen(true);
                    }}
                    variant="primary"
                    text="Add Content"
                    startIcon={<PlusIcon />}
                  />
                  <Button
                    variant="secondary"
                    text="Share Brain"
                    startIcon={<ShareIcnon />}
                    onClick={async () => {
                      try {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                          share: true
                        }, {
                          headers: {
                            Authorization: localStorage.getItem("token")
                          }
                        });
                        const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
                        navigator.clipboard.writeText(shareUrl)
                          .then(() => alert(`Link copied to clipboard!\n${shareUrl}`))
                          .catch(() => alert("Failed to copy link."));
                      } catch (error) {
                        alert("Failed to generate share link.");
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900">{contents?.length || 0}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">YouTube Videos</p>
                    <p className="text-2xl font-bold text-red-600">
                      {contents?.filter(c => c.type === 'youtube').length || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Twitter Posts</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {contents?.filter(c => c.type === 'twitter').length || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="pb-10">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your content...</p>
                  </div>
                </div>
              ) : filteredContents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-lg max-w-md mx-auto">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PlusIcon />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No content yet</h3>
                    <p className="text-gray-600 mb-6">
                      Start building your brain by adding your first {filter === 'all' ? 'content' : filter} item.
                    </p>
                    <Button
                      onClick={() => setModalOpen(true)}
                      variant="primary"
                      text="Add Content"
                      startIcon={<PlusIcon />}
                    />
                  </div>
                </div>
              ) : (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {filteredContents.map((content, index) => (
                    <div key={index} className="break-inside-avoid">
                      <Card
                        type={content.type}
                        link={content.link}
                        title={content.title}
                        onDelete={() => {
                          axios.delete(`${BACKEND_URL}/api/v1/content`, {
                            data: {
                              contentId: content._id
                            },
                            headers: {
                              Authorization: localStorage.getItem("token")
                            }
                          }).then(() => {
                            refresh();
                          }).catch(() => {
                            alert("Failed to delete content");
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </FilterContext.Provider>
  ); 
}
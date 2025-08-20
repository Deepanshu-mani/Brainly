import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { StickyNote } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

// Components
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { WebsiteCard } from '../ui/WebsiteCard';
import { Sidebar, FilterContext } from '../ui/Sidebar';
import { NoteCard } from '../components/NoteCard';
import { CreateContentModal } from '../components/CreateContentModal';
import { NoteEditor } from '../components/NoteEditor';
import { BookmarkWebsiteModal } from '../components/BookmarkWebsiteModal';
import { SearchBar } from '../components/SearchBar';

// Icons
import { PlusIcon } from '../ui/icons/PlusIcon';
import { ShareIcon } from '../ui/icons/ShareIcon';
import { MenuIcon } from '../ui/icons/MenuIcon';
import { BrainIcon } from '../ui/icons/BrainIcon';
import { LinkIcon } from '../ui/icons/LinkIcon';

// Hooks
import { UseContent } from '../hooks/UseContent';

// Types
import type { Content, ContentType } from '../types/content';

// Define filter type that includes all content types
type ContentFilter = 'all' | ContentType;

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<ContentFilter>('all');
  
  const { 
    contents, 
    loading, 
    refresh,
    createContent,
    updateContent,
    deleteContent
  } = UseContent();
  
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [isReminder, setIsReminder] = useState(false);

  // Search state
  const [displayedContents, setDisplayedContents] = useState<Content[]>([]);

  useEffect(() => {
    refresh();
  }, [modalOpen, showNoteModal, bookmarkModalOpen]);

  useEffect(() => {
    setDisplayedContents(contents || []);
  }, [contents]);

  const filteredContents = (displayedContents || []).filter((content: Content) => {
    if (filter === 'all') return true;
    return content.type === filter;
  });

  const handleCreateNote = async (data: { title: string; content: string; dueDate?: string }) => {
    try {
      if (isReminder && data.dueDate) {
        await createContent({
          title: data.title,
          content: data.content,
          type: 'note',
          dueDate: data.dueDate,
          tags: []
        });
      } else {
        await createContent({
          title: data.title,
          content: data.content,
          type: 'note',
          tags: []
        });
      }
      setShowNoteModal(false);
      await refresh();
    } catch (error) {
      console.error('Error creating note/reminder:', error);
    }
  };
  
  const handleUpdateContent = async (updatedContent: Content) => {
    try {
      await updateContent(updatedContent._id, updatedContent);
      await refresh();
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };
  
  const handleDeleteContent = async (id: string) => {
    try {
      await deleteContent(id);
      await refresh();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  // Create a sidebar-compatible filter type
  type SidebarFilter = 'all' | 'twitter' | 'youtube' | 'notes';
  
  const sidebarFilter: SidebarFilter = filter === 'note' ? 'notes' : filter as SidebarFilter;
  const handleSidebarFilterChange = (newFilter: SidebarFilter) => {
    setFilter(newFilter === 'notes' ? 'note' : newFilter);
  };

  return (
    <FilterContext.Provider value={{ filter: sidebarFilter, setFilter: handleSidebarFilterChange }}>
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
            {/* Create Content Modals */}
            <CreateContentModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
            />
            <BookmarkWebsiteModal open={bookmarkModalOpen} onClose={() => setBookmarkModalOpen(false)} />
            
            {/* Note/Reminder Editor Modal */}
            {showNoteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="w-full max-w-md">
                  <NoteEditor
                    onSave={handleCreateNote}
                    onCancel={() => {
                      setShowNoteModal(false);
                      setIsReminder(false);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-30 dark:border-dark-border dark:bg-dark-surface/80">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-dark-surface-alt dark:text-dark-text"
              >
                <MenuIcon />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <BrainIcon />
                </div>
                <span className="text-xl font-bold text-purple-600 dark:text-dark-primary">Brainly</span>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-purple-600 dark:hover:bg-dark-primary/20 dark:text-dark-primary"
              >
                <PlusIcon />
              </button>
            </div>

            {/* Header Section */}
            <div className="pt-4 lg:pt-8 pb-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent dark:from-dark-primary dark:to-dark-primary-hover">
                      Your Brain
                    </h1>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base dark:text-dark-text-muted">
                      {filteredContents.length} {filter === 'all' ? 'items' : filter} saved
                    </p>
                  </div>
                  
                  {/* Desktop Action Buttons */}
                  <div className="hidden lg:flex gap-3">
                    <Button
                      onClick={() => setModalOpen(true)}
                      variant="primary"
                      text="Add Content"
                      startIcon={<PlusIcon />}
                    />
                    <Button
                      onClick={() => setBookmarkModalOpen(true)}
                      variant="secondary"
                      text="Bookmark Website"
                      startIcon={<LinkIcon />}
                    />
                    <Button
                      onClick={() => {
                        setIsReminder(false);
                        setShowNoteModal(true);
                      }}
                      variant="secondary"
                      text="Add Note"
                      startIcon={<StickyNote className="w-4 h-4" />}
                    />
                    <Button
                      variant="secondary"
                      text="Share Brain"
                      startIcon={<ShareIcon />}
                      onClick={async () => {
                        try {
                          const response = await axios.post(`${BACKEND_URL}/brain/share`, {
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

                {/* Search Bar */}
                <SearchBar
                  onSearchResults={(results) => setDisplayedContents(results)}
                  onSearchStart={() => {}}
                  onSearchEnd={() => {}}
                />

                {/* Mobile Action Buttons */}
                <div className="flex lg:hidden gap-2">
                  <Button
                    onClick={() => setModalOpen(true)}
                    variant="primary"
                    text="Add Content"
                    startIcon={<PlusIcon />}
                    fullWidth={true}
                  />
                  <Button
                    onClick={() => setBookmarkModalOpen(true)}
                    variant="secondary"
                    text="Bookmark"
                    startIcon={<LinkIcon />}
                    fullWidth={true}
                  />
                  <Button
                    variant="secondary"
                    text="Share"
                    startIcon={<ShareIcon />}
                    onClick={async () => {
                      try {
                        const response = await axios.post(`${BACKEND_URL}/brain/share`, {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 lg:mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg dark:bg-dark-surface/80 dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-dark-text-muted">Total Items</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-text">{displayedContents?.length || 0}</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-purple-100 rounded-lg dark:bg-dark-primary/20">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 dark:text-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg dark:bg-dark-surface/80 dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-dark-text-muted">YouTube Videos</p>
                    <p className="text-xl sm:text-2xl font-bold text-red-600">
                      {displayedContents?.filter(c => c.type === 'youtube').length || 0}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-red-100 rounded-lg dark:bg-red-900/30">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg sm:col-span-2 lg:col-span-1 dark:bg-dark-surface/80 dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-dark-text-muted">Twitter Posts</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">
                      {displayedContents?.filter(c => c.type === 'twitter').length || 0}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg dark:bg-blue-900/30">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="pb-6 lg:pb-10">
              {loading ? (
                <div className="flex items-center justify-center py-12 lg:py-16">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 lg:h-12 lg:w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4 dark:border-dark-border dark:border-t-dark-primary"></div>
                    <p className="text-gray-600 text-sm lg:text-base dark:text-dark-text-muted">Loading your content...</p>
                  </div>
                </div>
              ) : filteredContents.length === 0 ? (
                <div className="text-center py-12 lg:py-16">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/20 shadow-lg max-w-md mx-auto dark:bg-dark-surface/80 dark:border-dark-border">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-dark-primary/20">
                      <PlusIcon />
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 dark:text-dark-text">No content yet</h3>
                    <p className="text-gray-600 mb-6 text-sm lg:text-base dark:text-dark-text-muted">
                      Start building your brain by adding your first {filter === 'all' ? 'content' : filter} item.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setModalOpen(true)}
                        variant="primary"
                        text="Add Content"
                        startIcon={<PlusIcon />}
                        fullWidth={true}
                      />
                      <Button
                        onClick={() => setBookmarkModalOpen(true)}
                        variant="secondary"
                        text="Bookmark Website"
                        startIcon={<LinkIcon />}
                        fullWidth={true}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Masonry
                  breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                  className="flex -ml-4 w-auto"
                  columnClassName="pl-4 bg-clip-padding"
                >
                  {filteredContents.map((content) => (
                    <div key={content._id} className="mb-4">
                      {content.type === 'note'? (
                        <NoteCard
                          content={content}
                          onUpdate={handleUpdateContent}
                          onDelete={handleDeleteContent}
                        />
                      ) : content.type === 'website' ? (
                        <WebsiteCard
                          content={content as any}
                          onDelete={async () => {
                            try {
                              await axios.delete(`${BACKEND_URL}/content`, {
                                headers: {
                                  Authorization: localStorage.getItem("token") || "",
                                },
                                data: {
                                  contentId: content._id
                                }
                              });
                              refresh();
                            } catch (error) {
                              console.error("Error deleting content:", error);
                            }
                          }}
                          isShared={false}
                        />
                      ) : (
                        <Card
                          id={content._id}
                          title={content.title}
                          link={content.link}
                          type={content.type as 'twitter' | 'youtube'}
                          tags={content.tags}
                          onDelete={async () => {
                            try {
                              await axios.delete(`${BACKEND_URL}/content`, {
                                headers: {
                                  Authorization: localStorage.getItem("token") || "",
                                },
                                data: {
                                  contentId: content._id
                                }
                              });
                              refresh();
                            } catch (error) {
                              console.error("Error deleting content:", error);
                            }
                          }}
                          isShared={false}
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
    </FilterContext.Provider>
  ); 
}
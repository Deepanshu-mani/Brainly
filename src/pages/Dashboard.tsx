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

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const filteredContents = filter === 'all' 
    ? contents 
    : contents.filter(content => content.type === filter);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <>
        <Sidebar filter={filter} setFilter={setFilter} />
        <div className="ml-[15rem] min-h-screen bg-gray-100 overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-[1200px] mx-auto px-4">
            <CreateContentModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
            />

            <div className="flex justify-end gap-2 pt-2 pb-6">
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
                  const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                    share: true
                  }, {
                    headers: {
                      Authorization: localStorage.getItem("token")
                    }
                  });
                  const shareUrl = `https://brainly-9lwi.vercel.app/share/${response.data.hash}`;
                  navigator.clipboard.writeText(shareUrl)
                    .then(() => alert(`Link copied to clipboard!\n${shareUrl}`))
                    .catch(() => alert("Failed to copy link."));
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
              {filteredContents.map((content, index) => (
                <Card
                  key={index}
                  type={content.type}
                  link={content.link}
                  title={content.title}
                  onDelete={() => {
                    axios.delete(`${BACKEND_URL}/api/v1/content/${content._id}`, {
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
              ))}
            </div>
          </div>
        </div>
      </>
    </FilterContext.Provider>
  );
}

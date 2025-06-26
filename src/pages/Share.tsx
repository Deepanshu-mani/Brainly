import { Card } from "../components/ui/Card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Sidebar } from "../components/ui/Sidebar";

export function Share() {
  const { shareId } = useParams();
  const [data, setData] = useState<{ username: string; content: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shareId) {
      axios.get(`https://brainly-backendd.onrender.com/api/v1/brain/${shareId}`)
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

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!data) return <div className="text-center mt-10">No data found</div>;

  return (
    <div className="ml-[15rem] min-h-screen bg-gray-100 overflow-y-auto overflow-x-hidden">
        <Sidebar filter="all" setFilter={() => {}} />
      <div className="w-full max-w-[1200px] mx-auto px-4 pt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Shared by {data.username}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {data.content.map((item, idx) => (
            <Card
              key={idx}
              title={item.title || "Untitled"}
              link={item.link}
              type={item.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
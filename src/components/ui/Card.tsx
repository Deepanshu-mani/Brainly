import { useEffect } from "react";
import { ShareIcnon } from "./icons/ShareIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
  onDelete?: () => void;
}
export function Card({ title, link, type, onDelete }: CardProps) {
  useEffect(() => {
    if (type === "twitter" && window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, [link, type]);
  return (
    <div>
      <div className="bg-white rounded-md shadow-sm border border-gray-100 flex w-[22rem] flex-col mt-7 ml-5">
        <div className="flex px-4 py-3 justify-between items-center">
          <div className=" text-gray-500 flex items-center gap-2">
            {type === "twitter" ? <TwitterIcon /> : <YoutubeIcon />}
            {title}
          </div>
          <div className="flex text-gray-500 gap-4">
            <div>
              <a href={link} target="_blank"></a>
              <ShareIcnon />
            </div>
           {
            onDelete && (
              <button onClick={onDelete}>
                 <DeleteIcon />
              </button>
            )
           }
          </div>
        </div>
        {type === "youtube" && (
          <div className=" flex mx-auto p-4">
            <iframe
              src={link.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {type === "twitter" && (
          <div className="p-4">
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}

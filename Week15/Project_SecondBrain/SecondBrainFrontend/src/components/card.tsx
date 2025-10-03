import { Share2, Notebook, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onClick?:()=>void;
}

export function Card({ title, link, type }: CardProps) {
  // Normalize YouTube and Twitter links
  const normalizedLink =
    type === "youtube"
      ? link
          .replace("watch?v=", "embed/") 
          .replace("youtu.be/", "youtube.com/embed/")
      : type === "twitter"
      ? link.replace("x.com", "twitter.com") 
      : link;

  // Load Twitter script when type is twitter
  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type]);

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 w-full max-w-3xl mx-auto space-y-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 text-xl font-bold text-gray-900">
          <Notebook className="w-6 h-6 text-indigo-500 transition-transform duration-300 group-hover:scale-110" />
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="group p-2 rounded-full hover:bg-indigo-100 transition-colors duration-200">
            <Share2 className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />
          </button>
          <button className="group p-2 rounded-full hover:bg-red-100 transition-colors duration-200">
            <Trash2 className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors duration-200" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="rounded-xl overflow-hidden shadow-md bg-gray-900 transition-transform duration-300 hover:scale-[1.01]">
        {type === "youtube" && (
          <div className="relative w-full pb-[56.25%]"> {/* 16:9 ratio */}
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              src={normalizedLink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet m-0 p-4 bg-white">
            <a href={normalizedLink}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
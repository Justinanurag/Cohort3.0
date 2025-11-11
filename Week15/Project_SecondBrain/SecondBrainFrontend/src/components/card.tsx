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
    <div className="group p-6 bg-white rounded-2xl shadow-md border border-gray-200 space-y-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-300">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex-shrink-0">
            <Notebook className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-gray-500 mt-1 capitalize">{type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            className="p-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200 group/btn"
            title="Share"
          >
            <Share2 className="w-4 h-4 text-gray-500 group-hover/btn:text-indigo-600 transition-colors" />
          </button>
          <button 
            className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200 group/btn"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-gray-500 group-hover/btn:text-red-600 transition-colors" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="rounded-xl overflow-hidden shadow-sm bg-gray-900 transition-transform duration-300 group-hover:shadow-lg">
        {type === "youtube" && (
          <div className="relative w-full pb-[56.25%]">
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
          <div className="p-4 bg-white min-h-[200px] flex items-center justify-center">
            <blockquote className="twitter-tweet m-0">
              <a href={normalizedLink}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}
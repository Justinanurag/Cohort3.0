import { Share2, Notebook, Trash2 } from "lucide-react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  // Normalize links
  const normalizedLink =
    type === "youtube"
      ? link.replace("watch", "embed")
      : type === "twitter"
      ? link.replace("x.com", "twitter.com")
      : link;

  return (
    <div className="p-6 bg-gray-200 rounded-2xl shadow-md border border-slate-200 max-w-md space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
          <Notebook className="w-5 h-5 text-slate-500" />
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <Share2 className="w-5 h-5 text-slate-500 cursor-pointer hover:text-slate-700" />
          <Trash2 className="w-5 h-5 text-slate-500 cursor-pointer hover:text-slate-700" />
        </div>
      </div>

      {/* Content Section */}
      <div className="rounded-lg overflow-hidden shadow-sm">
        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-lg"
            src={normalizedLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={normalizedLink}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}

import { X } from "lucide-react";
import { type ReactElement, useState, type ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  type?: "button" | "submit";
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState(ContentType.Youtube);

  if (!open) return null;
  const BASE_URL = import.meta.env.VITE_BASEURL;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!link || !title) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please provide both link and title",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/content`,
        {
          link,
          title,
          type,
          tags: [],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message || "Content added successfully!",
      });

      setLink("");
      setTitle("");
      onClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to add content",
      });
    }
  };

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-gray-200 animate-slide-in"
        onClick={handleModalClick}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal content */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Add New Content
            </h2>
            <p className="text-sm text-gray-600">
              Save your favorite YouTube videos or Twitter posts
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Link
            </label>
            <Input
              placeholder="Paste YouTube or Twitter link here"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Input
              placeholder="Give it a memorable title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content type selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Content Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setType(ContentType.Youtube)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  type === ContentType.Youtube
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                YouTube
              </button>
              <button
                type="button"
                onClick={() => setType(ContentType.Twitter)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  type === ContentType.Twitter
                    ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Twitter
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Add Content
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className="px-4 py-3 border border-gray-300 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all bg-gray-50 focus:bg-white"
      onChange={onChange}
    />
  );
}

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center px-4 py-2 rounded-lg font-medium w-full transition";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 shadow"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {text}
    </button>
  );
}

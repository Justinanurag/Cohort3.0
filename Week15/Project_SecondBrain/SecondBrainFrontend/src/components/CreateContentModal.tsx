import { X } from "lucide-react";
import { type ReactElement, useState, type ChangeEvent } from "react";
import axios from "axios";

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
      alert("Please provide both link and title");
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

      console.log("✅ Content added:", response.data);
      alert(response.data.message || "Content added successfully");
      setLink("");
      setTitle("");
      onClose();
    } catch (error: any) {
      console.error(
        "❌ Error adding content:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to add content");
    }
  };

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-xl w-[400px] relative border border-gray-200"
        onClick={handleModalClick}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal content */}
        <form className="mt-2 flex flex-col gap-5" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Add New Content
          </h2>

          {/* Input fields */}
          <Input
            placeholder="Paste content link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Input
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Content type selection */}
          <div className="flex gap-3">
            <Button
              text="Youtube"
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Youtube)}
              type="button"
            />
            <Button
              text="Twitter"
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Twitter)}
              type="button"
            />
          </div>

          {/* Submit button */}
          <Button variant="primary" text="Submit" type="submit" />
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
      className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
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

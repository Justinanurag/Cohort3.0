import { X } from "lucide-react";
import { ReactElement, useState, ChangeEvent } from "react";
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
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    const [link, setLink] = useState("");
    const [type, setType] = useState("");

    if (!open) return null;
    const BASE_URL = import.meta.env.VITE_BASEURL;

    //Onclick outside modal close
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!link || !type) {
            alert("Please provide both link and type");
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/v1/content`,
                {
                    link,
                    type,
                    tags: [], 
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // if your backend uses JWT
                    },
                }
            );

            console.log("✅ Content added:", response.data);
            alert(response.data.message || "Content added successfully");
            setLink("");
            setType("");

        } catch (error: any) {
            console.error("❌ Error adding content:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to add content");
        }
    };

    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-red-100/50 backdrop-blur-sm flex items-center justify-center z-50 " onClick={onClose} >
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-96 relative" onClick={handleModalClick}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"

                >
                    <X className="w-5 h-5" />
                </button>

                {/* Modal content */}
                <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
                    <h2 className="text-lg font-semibold text-center ">Add Content</h2>
                    <Input placeholder="Link" onChange={e => setLink(e.target.value)} />
                    <Input placeholder="Type" onChange={e => setType(e.target.value)} />
                    <Button variant="primary" text="Submit" />
                </form>
            </div>
        </div>
    );
}

function Input({
    placeholder,
    onChange,
}: {
    placeholder: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="px-4 py-2 border rounded-md w-full"
            onChange={onChange}
        />
    );
}

export function Button({ variant, text, startIcon, onClick }: ButtonProps) {
    const baseClasses =
        "flex items-center justify-center px-4 py-2 rounded-md font-medium w-full";
    const variantClasses =
        variant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300";

    return (
        <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {text}
        </button>
    );
}

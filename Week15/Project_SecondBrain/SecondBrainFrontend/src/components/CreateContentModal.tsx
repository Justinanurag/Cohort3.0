import { X } from "lucide-react";
import { ReactElement } from "react";

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
    if (!open) return null;

    //Onclick outside modal close
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const handleSubmit = () => {
        console.log("Form submitted");
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
                <div className="mt-4 flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-center ">Add Content</h2>
                    <Input placeholder="Title" />
                    <Input placeholder="Link" />
                    <Button variant="primary" text="Submit" onClick={handleSubmit} />
                </div>
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

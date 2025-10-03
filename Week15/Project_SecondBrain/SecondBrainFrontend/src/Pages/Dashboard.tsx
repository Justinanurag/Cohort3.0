import { Share2, Plus } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import axios from "axios";
const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const contents = useContent();
  const BASE_URL = import.meta.env.VITE_BASEURL;

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/signin");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center p-6 sm:p-8 lg:p-12 transition-all duration-300">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className="flex gap-4 self-end mb-8">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<Plus size={16} color="white" />}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          />
          <Button
            variant="secondary"
            text="Share"
            startIcon={<Share2 size={16} color="currentColor" />}
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BASE_URL}/api/v1/shareLink`,
                  {
                    share: true,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token") || "",
                    },
                  }
                );

                const shareUrl = `http://localhost:5173/shareLink/${response.data.hash}`;
                console.log("Generated share URL:", shareUrl);

                // Example: copy to clipboard
                await navigator.clipboard.writeText(shareUrl);
                alert("Share link copied to clipboard!");
              } catch (error) {
                console.error("Error creating share link:", error);
              }
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {contents.map(({ type, link, title }, index) => (
            <Card
              key={`${type}-${index}`}
              type={type}
              link={link}
              title={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

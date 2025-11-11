import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function useContent() {
  const [content, setContent] = useState<any[]>([]);
  const BASE_URL = import.meta.env.VITE_BASEURL;

  async function refresh() {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      setContent(response.data.content);
    } catch (error: any) {
      console.error("Error fetching content:", error);
      // Only show error if it's not a 401 (unauthorized) - those are handled by Dashboard
      if (error.response?.status !== 401) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Failed to fetch content",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    }
  }

  useEffect(() => {
    // Initial fetch
    refresh();

    // Refresh content every 30 seconds (reduced from 10s to avoid too many requests)
    const interval = setInterval(() => {
      refresh();
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [BASE_URL]);

  return content;
}

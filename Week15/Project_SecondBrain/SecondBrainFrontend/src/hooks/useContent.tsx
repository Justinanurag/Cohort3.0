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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch content",
      });
    }
  }

  useEffect(() => {
    // Optional: show a loading alert while fetching first time
    Swal.fire({
      title: "Loading content...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    refresh().finally(() => Swal.close());

    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, [BASE_URL]);

  return content;
}

import axios from "axios";
import { useEffect, useState } from "react";

export function useContent() {
  const [content, setContent] = useState<any[]>([]);
  const BASE_URL = import.meta.env.VITE_BASEURL;

  function refresh() {
    axios
      .get(`${BASE_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response: any) => {
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, [BASE_URL]);

  return content;
}

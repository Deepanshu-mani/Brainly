import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "../config";
import type { Content, ContentType } from "../types/content";

export function UseContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getAuthHeader = () => ({
    Authorization: localStorage.getItem("token") || "",
  });

  const fetchContents = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/content`, {
        headers: getAuthHeader(),
      });
      setContents(response.data.content);
      return response.data.content;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  const createContent = useCallback(
    async (data: {
      title?: string;
      content?: string;
      type: ContentType;
      tags?: string[];
      dueDate?: string;
      link?: string;
    }) => {
      try {
        const response = await axios.post(`${BACKEND_URL}/content`, data, {
          headers: { ...getAuthHeader(), "Content-Type": "application/json" },
        });
        setContents((prevContents) => [...prevContents, response.data.content]);
        return response.data.content;
      } catch (err) {
        console.error("Error creating content:", err);
        setError(err as Error);
        throw err;
      }
    },
    [],
  );

  const updateContent = useCallback(
    async (id: string, data: Partial<Content>) => {
      try {
        const response = await axios.put(`${BACKEND_URL}/content/${id}`, data, {
          headers: { ...getAuthHeader(), "Content-Type": "application/json" },
        });
        setContents((prevContents) =>
          prevContents.map((content) =>
            content._id === id ? response.data.content : content,
          ),
        );
        return response.data.content;
      } catch (err) {
        console.error("Error updating content:", err);
        setError(err as Error);
        throw err;
      }
    },
    [],
  );

  const deleteContent = useCallback(async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/content`, {
        headers: getAuthHeader(),
        data: { contentId: id }, // Axios sends data in the request body for DELETE
      });
      setContents((prevContents) =>
        prevContents.filter((content) => content._id !== id),
      );
    } catch (err) {
      console.error("Error deleting content:", err);
      setError(err as Error);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchContents(); // Initial fetch
  }, [fetchContents]);

  return {
    contents,
    loading,
    error,
    refresh: fetchContents,
    createContent,
    updateContent,
    deleteContent,
  };
}

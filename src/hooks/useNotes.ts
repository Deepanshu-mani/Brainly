import { useState, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import type { Content } from "../types/content";

export function useNotes() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createNote = useCallback(
    async (data: {
      title: string;
      content: string;
      tags?: string[];
    }): Promise<Content> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${BACKEND_URL}/content/note`,
          { ...data, type: "note" },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          },
        );
        return response.data;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const updateNote = useCallback(
    async (
      id: string,
      data: { title?: string; content?: string; tags?: string[] },
    ): Promise<Content> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.put(
          `${BACKEND_URL}/content/note/${id}`,
          data,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          },
        );
        return response.data;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteNote = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${BACKEND_URL}/content/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createNote,
    updateNote,
    deleteNote,
    isLoading,
    error,
  };
}

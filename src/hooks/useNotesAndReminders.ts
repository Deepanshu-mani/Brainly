import { useState, useCallback } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import type { Content } from '../types/content';

export function useNotesAndReminders() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createNote = useCallback(async (data: { title: string; content: string; tags?: string[] }): Promise<Content> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/content/note`,
        { ...data, type: 'note' },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createReminder = useCallback(async (data: { 
    title: string; 
    content: string; 
    dueDate: string; 
    tags?: string[] 
  }): Promise<Content> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/content/reminder`,
        { 
          ...data, 
          type: 'reminder',
          isCompleted: false 
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateContent = useCallback(async (id: string, data: Partial<Content>): Promise<Content> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${BACKEND_URL}/content/${id}`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteContent = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(
        `${BACKEND_URL}/content/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createNote,
    createReminder,
    updateContent,
    deleteContent,
    isLoading,
    error,
  };
}

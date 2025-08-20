import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "../config";
import type { Content, ContentType } from "../types/content";

export function UseContent() {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getAuthHeader = () => ({
        Authorization: localStorage.getItem("token") || ""
    });

    const fetchContents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${BACKEND_URL}/content`, {
                headers: getAuthHeader()
            });
            setContents(response.data.content);
            return response.data.content;
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createContent = useCallback(async (data: {
        title: string;
        content?: string;
        type: ContentType;
        tags?: string[];
        dueDate?: string;
        link?: string;
    }) => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/content`,
                data,
                { headers: { ...getAuthHeader(), 'Content-Type': 'application/json' } }
            );
            await fetchContents(); // Refresh the content list
            return response.data.content;
        } catch (err) {
            console.error('Error creating content:', err);
            setError(err as Error);
            throw err;
        }
    }, [fetchContents]);

    const updateContent = useCallback(async (id: string, data: Partial<Content>) => {
        try {
            const response = await axios.put(
                `${BACKEND_URL}/content/${id}`,
                data,
                { headers: { ...getAuthHeader(), 'Content-Type': 'application/json' } }
            );
            await fetchContents(); // Refresh the content list
            return response.data.content;
        } catch (err) {
            console.error('Error updating content:', err);
            setError(err as Error);
            throw err;
        }
    }, [fetchContents]);

    const deleteContent = useCallback(async (id: string) => {
        try {
            await axios.delete(
                `${BACKEND_URL}/content`,
                { 
                    headers: getAuthHeader(),
                    data: { contentId: id } // Axios sends data in the request body for DELETE
                }
            );
            await fetchContents(); // Refresh the content list
        } catch (err) {
            console.error('Error deleting content:', err);
            setError(err as Error);
            throw err;
        }
    }, [fetchContents]);

    useEffect(() => {
        fetchContents(); // Initial fetch
        const interval = setInterval(fetchContents, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, [fetchContents]);

    return { 
        contents, 
        loading, 
        error, 
        refresh: fetchContents,
        createContent,
        updateContent,
        deleteContent
    };
}

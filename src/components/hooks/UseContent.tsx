import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "../../config";
import type { Content } from "../../types/content";

export function UseContent() {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchContents = useCallback(() => {
        setLoading(true);
        setError(null);
        return axios.get(`${BACKEND_URL}/content`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res) => {
            setContents(res.data.content);
            setLoading(false);
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        });
    }, []);

    const updateContentLocally = (updatedContent: Content) => {
        setContents((prev) =>
            prev.map((content) =>
                content._id === updatedContent._id ? updatedContent : content
            )
        );
    };

    useEffect(() => {
        fetchContents(); // Initial fetch
        const interval = setInterval(() => {
            fetchContents();
        }, 5000);
        return () => clearInterval(interval);
    }, [fetchContents]);

    const forceRefresh = () => {
        fetchContents();
    };

    return { 
        contents, 
        loading, 
        error, 
        refresh: fetchContents 
    };
}

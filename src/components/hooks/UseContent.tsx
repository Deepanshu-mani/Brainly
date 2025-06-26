import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

export type Content = {
    _id: string;
    type: "youtube" | "twitter";
    link: string;
    title: string;
}

export function UseContent() {
    const [contents, setContents] = useState<Content[]>([]);
    const refresh = () => {
        return axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res) => {
            setContents(res.data.content);
        })
    }

    useEffect(() => {
        refresh();
        let interval = setInterval(() => {
            refresh()
        },10*1000 )
        return () =>  clearInterval(interval)
    },[])
    return {contents, refresh}; 
}

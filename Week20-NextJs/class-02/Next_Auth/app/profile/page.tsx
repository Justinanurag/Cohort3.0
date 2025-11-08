import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile(){
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/profile", {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then(res => {
            setMessage(res.data.message);
        }).catch(err=>{
            console.log("error =>",err);
        });
    }, []);

    return <div>
        {message}
    </div>
}

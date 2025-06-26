import { CrossIcon } from "./ui/icons/CrossIcon";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
enum ContentType  {
  Youtube = "youtube",
  Twitter = "twitter"
}
export function CreateContentModal({ open, onClose }: {
    open :boolean,
    onClose : ()=> void
}) {
const titleRef = useRef<HTMLInputElement>(null);
const linkRef = useRef<HTMLInputElement>(null);
const [type, setType] = useState(ContentType.Youtube)
  async function addContent () {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      link,
      title,
      type
    }, {
      headers : {
        Authorization : localStorage.getItem("token")
      }
    })
    onClose() ;
  }
  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
          <span className="bg-white opacity-100 rounded-md p-4">
            <div className="flex justify-end opacity-100" onClick={onClose}>
              <CrossIcon />
            </div>
            <Input placeholder={"title"} reference={titleRef} />
            <Input placeholder={"link"} reference={linkRef}  />  
            <div className="flex py-4 justify-between items-center gap-8 ">
              <h1>Type</h1>
            
            <div className="flex justify-center items-center gap-4">
            <Button text="youtube" variant={type===ContentType.Youtube ? "primary" : "secondary"}  onClick={()=>{
              setType(ContentType.Youtube)
            }}/> 

            <Button text="twitter" variant={type===ContentType.Twitter ? "primary" : "secondary"} onClick={()=> {
              setType(ContentType.Twitter)
            }} />   
            </div>
            </div>
           <div className="flex justify-center">
           <Button variant="primary" text="Submit" fullWidth={true} hover={true} onClick={addContent} />
           </div>
          </span>   

        </div>

      )}
    </div>
  );
}


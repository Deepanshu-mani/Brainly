import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signup() {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      email,
      password,
    });
    navigate('/signin')
    alert("You are signed up!");
  }
  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-gray-200 rounded-md border shadow-md p-8 w-full max-w-sm space-y-4 mx-auto">
        <h2 className="text-xl font-semibold text-center text-gray-700">
          Create Account
        </h2>
        <Input placeholder="Username" reference={usernameRef} />
        <Input placeholder="Email" reference={emailRef} />
        <Input placeholder="Password" reference={passwordRef} />
        <div className="pt-2 flex justify-center">
          <Button
            variant="primary"
            text="Sign Up"
            fullWidth={true}
            loading={false}
            onClick={signup}
          />
        </div>
      </div>
    </div>
  );
}

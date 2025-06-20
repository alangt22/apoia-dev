"use client";

import { Button } from "@/components/ui/button";
import { createUsername } from "../actions/create-username";
import { useState } from "react";
import { Link2 } from "lucide-react";
import Link from "next/link";


interface UrlPreviewProps {
  username: string | null;
}

export function UrlPreview({ username: slug }: UrlPreviewProps) {
  const [username, setUsername] = useState(slug);
  const [error, setError] = useState<null | string>(null);

  async function submitAction(formData: FormData) {
    const username = formData.get("username") as string;
    if (username === "") {
      return;
    }

    const response = await createUsername({ username: username });

    if (response.error) {
      setError(response.error);
      return;
    }
    if (response.data) {
      setUsername(response.data);
    }
  }

  if (!!username) {
    return (
        <div className="flex items-center flex-1 p-2 justify-between text-gray-100">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2">
              <h3 className="font-bold text-lg">Sua URL:</h3>
              <Link href={`https://apoia-dev-brown.vercel.app/creator/${username}`} target="_blank">
                {`https://apoia-dev-brown.vercel.app/creator/${username}`}
              </Link>      
            </div>

            <Link 
            href={`https://apoia-dev-brown.vercel.app/creator/${username}`}
            target="_blank"
            className="bg-blue-500 px-4 py-1 rounded-md hidden md:block"
            >
              <Link2 className="h-5 w-5 text-white" />
            </Link>
        </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center flex-1 p-2 text-gray-100">
        <form
          action={submitAction}
          className="flex flex-1 flex-col md:flex-row gap-4 intens-start md:items-center"
        >
          <div className="flex items-center justify-center w-full">
            
            <p>{`https://apoia-dev-brown.vercel.app/creator/`}</p>
            <input
              type="text"
              className="flex-1 outline-none border h-9 border-gray-300 bg-gray-50 text-black rounded-md px-1"
              placeholder="Digite seu nome de username"
              name="username"
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer h-9 w-full md:w-fit text-white px-4 rounded-md"
          >
            Salvar
          </Button>
        </form>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

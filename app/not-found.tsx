"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Notfound() {
  const route = useRouter();
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col dark:bg-zinc-950 bg-white dark:text-white text-black">
      
      <Image
        src="/not-found.gif"
        loading="eager"
        width={200}
        height={200}
        alt="404 image"
          className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] h-auto object-contain rounded-full"

      />
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p>Please check the url, it might be broken</p>
      <Button className={"mt-3"} onClick={() => route.push("/")}>
        <ArrowLeft />
        Back to Home
      </Button>
    </div>
  );
}

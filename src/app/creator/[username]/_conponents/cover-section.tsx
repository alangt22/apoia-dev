"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useState } from "react";
import { changeColor } from "../_actions/save-color";


interface CoverSectionProps {
    coverImage: string; // URL of the cover image
    profileImage: string; // URL of the profile image
    name: string; // Name of the user
    color: string
}


export function CoverSection({coverImage, profileImage, name, color}: CoverSectionProps) {

    const [bgColor, setBgColor] = useState(color);


    return (
        <div className="relative h-48 w-full sm:h-64 md:h-80 overflow-hidden"
        style={{ backgroundColor: bgColor}}>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-"></div>

            <div className="absolute bottom-2 md:bottom-6 left-0 right-0 p-4 md:p-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col items-center sm:items-end sm:flex-row gap-4 sm:gap-6">
                        <div className="relative flex-shrink-0">
                            <Avatar className="h-20 w-20 border-2 md:border-4 border-white sm:w-24 sm:h-24 md:w-32 md:h-32 group">
                                <AvatarImage
                                 src={profileImage}
                                 
                                 className="group-hover:scale-125 duration-300 group-hover:-rotate-6 object-cover"
                                />
                                <AvatarFallback className="text-lg md:text-xl font-bold">
                                    {name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="pb-0 sm:pb-4">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white text-center sm:text-left">
                                {name}
                            </h1>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
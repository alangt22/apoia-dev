"use client";

import { useRef, useState } from "react";
import { debounce } from "lodash";
import { toast } from "sonner";
import { changeDescription } from "../actions/change-bio";

export function Description ({initialDescription}: { initialDescription: string }) {
    const [description, setDescription] = useState(initialDescription);
    const [originalDescription] = useState(initialDescription);
    
    const debouncedSaveName = useRef(
        debounce(async (currentDescription: string) => {
            if(currentDescription.trim() === ""){
                setDescription(originalDescription);
                return;
            }

            if(currentDescription !== description){
                try {
                     const response = await changeDescription({ Description: currentDescription }); 
                    if(response.error){
                        setDescription(originalDescription);
                        return;
                    }
                    toast.success("Bio atualizada com sucesso!");
                } catch (error) {
                    toast.error("Erro ao atualizar desacrição. Tente novamente.");
                    setDescription(originalDescription);
                }
            }

        }, 2500)
    ).current


    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        setDescription(value);
        
        debouncedSaveName(value);
    }

    return (
        <textarea 
            className="text-base md:text-2xl  bg-gray-50 border-gray-100 rounded-md outline-none 
            p-2 w-full max-w-2xl my-3 h-40 text-center resize-none" 
            value={description}
            onChange={handleChange}
        />
    )
}
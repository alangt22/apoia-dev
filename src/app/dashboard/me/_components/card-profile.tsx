"use client";

import { useRef, useState } from "react";
import { debounce } from "lodash";
import { changeColor } from "@/app/creator/[username]/_actions/save-color";
import { toast } from "sonner";
import { AvatarProfile } from "./avatarImage";
import { Name } from "./name";
import { Description } from "./description";

interface CardProfileProps {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    bio: string | null;
    color: string | null;
    image: string | null;
  };
}

export function CardProfile({ user }: CardProfileProps) {
  const [bgColor, setBgColor] = useState(user.color ?? "#000000");
  const [originalColor] = useState(user.color ?? "#000000");

  const debouncedChangeColor = useRef(
    debounce(async (newColor: string) => {
      if (!newColor || newColor === originalColor) return;

      try {
        const res = await changeColor({ color: newColor });

        if (res?.error) {
          setBgColor(originalColor);
          toast.error("Erro ao salvar a cor.");
        } else {
          toast.success("Cor atualizada com sucesso!");
        }
      } catch (err) {
        console.error(err);
        setBgColor(originalColor);
        toast.error("Erro ao atualizar a cor.");
      }
    }, 1500)
  ).current;

  function handleChangeColor(e: React.ChangeEvent<HTMLInputElement>) {
    const newColor = e.target.value;
    setBgColor(newColor);
    debouncedChangeColor(newColor);
  }

  return (
    <section
      className="w-full flex flex-col items-center mx-auto px-4 py-4 rounded-md gap-4"
      style={{ backgroundColor: bgColor }}
    >
      <div>
        <AvatarProfile userId={user.id} avatarUrl={user.image ?? null} />
      </div>

      <div className="absolute top-58 left-86 md:left-96 z-50 bg-white/10 p-2 rounded ">
        <input
          type="color"
          value={bgColor}
          onChange={handleChangeColor}
          className="w-6 h-6 border-0 cursor-pointer"
          title="Escolher cor de fundo"
        />
      </div>

      <div>
        <Name initialName={user.name ?? "Nome não definido"} />
        <Description initialDescription={user.bio ?? "Bio não definida"} />
      </div>
    </section>
  );
}

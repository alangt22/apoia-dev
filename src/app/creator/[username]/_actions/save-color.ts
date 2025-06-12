"use server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

const changeColorSchema = z.object({
    color: z.string()
})

type ChangeColorSchema = z.infer<typeof changeColorSchema>

export async function  changeColor(data: ChangeColorSchema) {
    const session = await auth()
    const userId = session?.user?.id
    
    if(!userId){
        return {
            data: null,
            error: "Usuario nao autenticado"
        }
    }

    const schema = changeColorSchema.safeParse(data)
    if(!schema.success){
        return {
            data: null,
            error: schema.error.issues[0].message
        }
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                color: data.color
            }
        })
        return {
            data: user.color,
            error: null
        }

    } catch (error) {
        console.log(error)
        return {
            data: null,
            error: "Erro ao atualizar cor"
        }
    }


}
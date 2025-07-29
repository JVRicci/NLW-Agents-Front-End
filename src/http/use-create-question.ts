import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest, CreateQuestionResponse } from "./types";

export function useCreateQuestion(roomId: string) {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn : async (data: CreateQuestionRequest) =>{
            const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            )

            const result:  CreateQuestionResponse = await response.json()

            return result
        },
        // Serve para disparar função assim que a criação da sala estiver completa
        onSuccess: () => {
            // Executa novamente a query para listagem de perguntas
            queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] })
        }
    })
}
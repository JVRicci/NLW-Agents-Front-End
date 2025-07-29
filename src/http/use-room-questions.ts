import { useQuery } from "@tanstack/react-query"
// import { env } from "../envs/index"
import type { GetRoomQuestionResponse } from "./types"

export function useRoomQuestions(roomId: string) {
    return useQuery({
        queryKey: ['get-questions', roomId],
        queryFn: async () => {
            const response = await fetch(
                // `${env.URL}:${env.PORT}/rooms/${roomId}/questions`
                // Alterar url depois
                `http://localhost:3333/rooms/${roomId}/questions`
            )
            const result: GetRoomQuestionResponse = await response.json()

            return result 
        }
    })
}


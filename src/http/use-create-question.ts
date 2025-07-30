import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest, GetRoomQuestionsResponse , CreateQuestionResponse, GetRoomQuestionResponse } from "./types";

/**
 *  Registra perguntas em uma sala
 * @param {string} roomId ID da sala em que a pergunta será registrada
 * @returns 
 */
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

        // Executa no momento que for feita a chamada para a API
        // Faz com que uma pergunta apareça mesm oque antes de ser realmente cadastrada no banco
        onMutate({ question }){
            const questions = queryClient.getQueryData<GetRoomQuestionResponse>([
                'get-questions',
                roomId
            ])

            const questionsArray = questions ?? []

            const newQuestion = { 
                        id: crypto.randomUUID(),
                        question,
                        answer: null,
                        createdAt: new Date().toISOString()
            } 
                
            queryClient.setQueryData<GetRoomQuestionResponse>(
                ['get-questions', roomId], 
                [ newQuestion,...questionsArray
                ]
            )

            return { newQuestion, questions }
        },

        // Serve para disparar função assim que a criação da sala estiver completa
        onSuccess: (data, _variables, context) => {
            // Executa novamente a query para listagem de perguntas
            // queryClient.invalidateQueries({ queryKey: ['get-questions', roomId], })
            queryClient.setQueryData<GetRoomQuestionsResponse>(
                ['get-questions', roomId],
                questions => {
                    if(!questions){
                        return questions
                    }
                    
                    if (!context.newQuestion) {
                        return questions
                    }

                    return questions.map((question) => {
                        if (question.id === context.newQuestion.id) {
                        return {
                            ...context.newQuestion,
                            id: data.questionId ,
                            answer: data.answer,
                            isGeneratingAnswer: false,
                        }
                        }

                        return question
                    })
                }
            )
        },

        onError(_error, _variables, context){
            if (context?.questions) {
                queryClient.setQueryData<GetRoomQuestionResponse>(
                    ['get-questions', roomId],
                    context.questions
                )
            }
        }
    })
}
export type GetRoomsResponse = Array<{
    id: string,
    name: string,
    questionsCount: number,
    createdAt: string
}>

export type CreateRoomRequest = {
    name: string,
    description: string
}

export type CreateRoomResponse = {
    roomId: string
}

export type GetRoomQuestionResponse = {
    id: string,
    question: string,
    answer: string | null,
    createdAt: string
}[]

export type CreateQuestionRequest  = {
    question: string
}

export type CreateQuestionResponse = {
    roomId: string
}
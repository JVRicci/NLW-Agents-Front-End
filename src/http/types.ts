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
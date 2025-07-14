import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type GetRoomsApiResponse = Array<{
    id: string,
    name: string
}>

export function CreateRoom() {
    const { data, isLoading } = useQuery({
        // Identificador da chamada
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/rooms')
            const result: GetRoomsApiResponse = await response.json()

            return result
        }
    })

    return (
        <div>
            <h1>Create a room</h1>

            { isLoading && <p>Carregando...</p> }
            <div className='flex flex-col gap-1'>
                {data?.map( (room)=> {
                        return <Link to={`/room/${room.id}`} key={room.id}>{room.name}</Link>
                    }
                ) }
            </div>
        </div>
    )
}
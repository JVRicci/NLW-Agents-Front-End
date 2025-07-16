import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { dayjs } from '../lib/dayjs'

type GetRoomsApiResponse = Array<{
    id: string,
    name: string,
    questionsCount: number,
    createdAt: string
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
        <div className="min-h-screen p-4">
            <div className='mx-auto max-w-4xl'>
                <div className="grid grid-cols-2 items-start gap-8">

                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Salas recenteds</CardTitle>
                        <CardDescription>
                            Acesso rápido para as salas criadas recentemente
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-3'>
                        {data?.map(room => {
                            return (<Link to={`rooms/${room.id}`}
                                key={room.id} 
                                className='flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50' >
                                <div className='flex-1 flex flex-col gap-1'>
                                    <h3 className='font-medium'>{room.name}</h3>

                                    <div className="flex items-center gap-2">
                                        <Badge className='text-xs' variant="secondary">
                                            {dayjs(room.createdAt).toNow()}
                                        </Badge>
                                        <Badge className='text-xs' variant="secondary">
                                            {room.questionsCount}
                                        </Badge>
                                    </div>
                                </div>

                                <span className='flex items-center gap-1 rext-sm'>
                                    Entrar
                                    <ArrowRight className='size-3'/>
                                </span>
                            </Link>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
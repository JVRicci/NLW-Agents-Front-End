import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { dayjs } from '../lib/dayjs'
import { useRooms } from '../http/use-rooms'

export function RoomList() {
    const {isLoading, data } =  useRooms()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Salas recenteds</CardTitle>
                <CardDescription>
                    Acesso rápido para as salas criadas recentemente
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                {
                    isLoading && 
                    <p className='text-muted-foreground text-sm'>
                        Carregando salas...
                    </p>
                }

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
    )
}
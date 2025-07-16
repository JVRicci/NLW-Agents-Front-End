import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { useForm } from 'react-hook-form'
import { z } from "zod/v4"
import { zodResolver } from '@hookForm/resolvers/zod'
// import { Form } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useCreateRoom } from '../http/use-create-rooms'

const createRoomSchema = z.object({
    name: z.string().min(3, {message: 'Inclua no minimo 3 caracteres'}),
    description: z.string()
})

// Garante com que o o createRoomSchema realmente esteja em TS
type CreateRoomFormData = z.infer<typeof createRoomSchema>

export function CreateRoomForm () {
    // Responsavel por executar a mutation do metodo post de registro de sala informaçoes
    const { mutateAsync: createRoom } = useCreateRoom()

    const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    })

    async function handleCreateRoom({ name, description } : CreateRoomFormData) {
        await createRoom({ name, description })
        await createRoomForm.reset()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar sala</CardTitle>
                <CardDescription>Crie uma nova sala para começar a fazer perguntas e obter respostas da ia</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form 
                        onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
                        className="flex flex-col gap-3">
                            <FormField
                                control={createRoomForm.control}
                                name="name"
                                render = {({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel> Nome da Sala</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Digite o nome da sala..."/>
                                            </FormControl>
                                            {/* Exibe mensagem de erro caso exista */}
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={createRoomForm.control}
                                name="description"
                                render = {({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel> Descrição</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Descrição da sala..."/>
                                            </FormControl>
                                            {/* Exibe mensagem de erro caso exista */}
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }}
                            />
                        <Button type="submit" className='w-full'>Criar sala</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
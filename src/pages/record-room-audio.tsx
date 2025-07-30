import { useState, useRef } from "react"
import { Button } from "../components/ui/button"
import { Navigate, useParams } from "react-router-dom"

type RoomParams = {
    roomId: string
}

// Verifica se o navegador possui suporte para gravação de áudio
const isRecordingSuported = !!navigator.mediaDevices 
    && typeof navigator.mediaDevices.getUserMedia === 'function'
    && typeof window.MediaRecorder === 'function'

export function RecordRoomAudio(){
    const params = useParams<RoomParams>()

    const [isRecording, setIsRecording] = useState(false)
    const recorder = useRef<MediaRecorder | null>(null)
    const intervalRef = useRef<NodeJS.Timeout>(null)

    function stopRecording(){
        setIsRecording(false)

        if (recorder.current && recorder.current.state !== 'inactive'){
            recorder.current.stop()
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

    }

    async function uploadAudio(audio: Blob){
        const formData = new FormData()

        formData.append("file", audio, 'audio.webm')

        const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
            method: "POST",
            body: formData
        })

        const result = await response.json()

        console.log(result)
    }

    function createRecorder( audio: MediaStream) {
            recorder.current = new MediaRecorder(audio, {
            // Formato que o áudio será armazenado
            mimeType: 'audio/webm',
            audioBitsPerSecond: 64_000,
        })

        // Verifica se realmente existe algum áudio
        recorder.current.ondataavailable = event => {
            if (event.data.size > 0){
                console.log(event.data)
                uploadAudio(event.data)
            }
        }

        recorder.current.onstart = () => {
            console.log("Gravação iniciada")
        }

        recorder.current.onstop = () => {
            console.log("Gravação encerrada ")
        }

        recorder.current.start()
        
    }

    async function  startRecording() {
        if (!isRecordingSuported) {
            alert("O seu navegador não suporta gravação")
            return
        }

        setIsRecording(true)

        // Responsável por capturar o microfone do usuário
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44_100
            }
        })

        createRecorder(audio)
        
        // Possibilita que sejam criados varios chunks ao invés de cadastrar em apenas um
        intervalRef.current = setInterval(()=> {
            recorder.current?.stop()
            
            createRecorder(audio)
        },  5000)
    }

    if (!params.roomId) {
        return <Navigate replace to="/"/>
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center gap-3">
            {   
                !isRecording 
                    ? ( 
                        <>
                            <Button onClick={startRecording}>Gravar audio</Button> <p>Pausado...</p>
                        </>
                    )
                    : ( 
                        <>
                            <Button onClick={stopRecording}>Pausar gravação</Button><p>Gravando...</p> 
                        </>
                    )
            }
        </div>
    )
}
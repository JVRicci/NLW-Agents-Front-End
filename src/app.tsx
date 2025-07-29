// import { Button } from "./components/ui/button"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// Utilizado para chamadas http na api externa
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CreateRoom } from "./pages/create-room"
import { Room } from "./pages/room"
import { RecordRoomAudio } from "./pages/record-room-audio"

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index/>
          <Route element={<Room />} path="/room/:roomId"/>
          <Route element={<RecordRoomAudio />} path="/room/:roomId/audio"/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  ) 
}


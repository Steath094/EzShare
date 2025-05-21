import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080});
type ClientRole = 'reader' | 'writer';

interface RoomClient {
  socket: WebSocket;
  role: ClientRole;
}

type Room = Set<RoomClient>;

const rooms: Map<string, Room> = new Map();
const clientRooms: Map<WebSocket, string> = new Map();
wss.on("connection",(socket:WebSocket)=>{
    let currentRoom:string;
    let role: ClientRole = 'reader';
    socket.on('message',(message:string)=>{
        const data = JSON.parse(message);
        if (data.type==='join') {
            currentRoom = data.payload.room;
            role = data.payload.role || 'reader';
            if (!rooms.has(currentRoom)) {
                rooms.set(currentRoom,new Set());
            }

            rooms.get(currentRoom)?.add({socket,role});
            clientRooms.set(socket, currentRoom);
            console.log(`User joined room: ${currentRoom} as ${role}`);
        }
        else if (data.type==='chat') {
            const room = clientRooms.get(socket);
            if (!room) return;
            const roomClients = rooms.get(room);
            if (!roomClients) return;
            const sender = [...roomClients].find(c => c.socket === socket);
            if (sender?.role === 'writer') {
                const message = JSON.stringify({
                    type: 'chat',
                    payload: { message: data.payload.message }
                });
                roomClients.forEach(client => {
                    if (client.socket !== socket && client.socket.readyState === WebSocket.OPEN) {
                        client.socket.send(message);
                    }
                });
            }
        }
        console.log(rooms);
    })
    socket.on('close', () => {
        const room = clientRooms.get(socket);
        if (!room) return;

        const clients = rooms.get(room);
        if (clients) {
            for (const client of clients) {
            if (client.socket === socket) {
                clients.delete(client);
                break;
            }
            }
            if (clients.size === 0) {
            rooms.delete(room);
            }
        }

        clientRooms.delete(socket);
        console.log(rooms);
});
})

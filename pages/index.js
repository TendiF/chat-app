import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'

import Layout from "../components/Layout"
import Input from "../components/Input"
import Button from "../components/Button"
import { AppContext } from "../context/AppContext"



const Index = () => {
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  let { setSocket } = useContext(AppContext)


  return <Layout>
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "90%",
        justifyContent: "space-between",
        padding: "20px 0px"
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1>Join Chatroom</h1>
        <Input onInput={e => setUsername(e.target.value)} placeholder="Username" style={{ marginBottom: 15 }} />
        <Input onInput={e => setRoom(e.target.value)} placeholder="RoomID" />
      </div>
      <Button onClick={() => {
        if (!username || !room) {
          alert("username & room can't empty")
          return
        }

        let socket = io(process.env.NEXT_PUBLIC_URL_API)

        socket.emit('login', { name: username, room }, err => {
          if (err) {
            alert(err)
            socket.disconnect()
            return
          } else {
            setSocket(socket)
            router.push({
              pathname : "/chat",
              query : {
                username,
                room
              }
            })
          }
        })

      }}>
        JOIN
      </Button>
    </div>
  </Layout>
}

export default Index
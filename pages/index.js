import { useState } from 'react'

import { useRouter } from 'next/router'
import Layout from "../components/Layout"
import Input from "../components/Input"
import Button from "../components/Button"

const Index = () => {
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return <Layout>
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
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
        router.push({
          pathname : "/chat",
          query : {
            username,
            room,
          }
        })
      }}>
        JOIN
      </Button>
    </div>
  </Layout>
}

export default Index
import { useRouter } from 'next/router'
import Layout from "../components/Layout"
import Input from "../components/Input"
import Button from "../components/Button"

const Index = () => {
  const router = useRouter()

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
        <Input placeholder="Username" style={{ marginBottom: 15 }} />
        <Input placeholder="RoomID" />
      </div>
      <Button onClick={() => {
        router.push("/chat")
      }}>
        JOIN
      </Button>
    </div>
  </Layout>
}

export default Index
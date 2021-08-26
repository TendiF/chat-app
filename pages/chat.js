import Link from 'next/link'
import Layout from "../components/Layout"
import Input from "../components/Input"


const ChatContainer = ({ from, children }) => {
  let style = null

  if (from === "me") {
    style = {
      alignSelf: "flex-end",
      color: "white",
      padding: 15,
      background: "#5DB075",
      borderRadius: 12,
      marginBottom: 15
    }
  } else {
    style = {
      padding: 15,
      borderRadius: 12,
      background: "#f6f6f6",
      border: "1px solid #e6e6e6",
      alignSelf: "flex-start",
      marginBottom: 15

    }
  }

  return <>
    {from !== "me" && <div style={{ fontSize: 14 }}>username</div>}
    <div style={style}>
      {children}
    </div>
  </>

}
const Chat = () => {
  return <Layout>
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px 0px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column"
        }}
      >
        <Link href="/">
          <span style={{ color: "#5DB075" }} >Exit</span>
        </Link>
        <div style={{ alignSelf: "center", position: "absolute" }}>ROOMID</div>
      </div>
      <div
        style={{
          width: "100%",
          height: "88%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto"
        }}
      >
        <ChatContainer>Lorem Ipsum Dolor sit amet uahuahuahua, Lorem Ipsum Dolor sit amet uahuahuahua , Lorem Ipsum Dolor sit amet uahuahuahua ,Lorem Ipsum Dolor sit amet uahuahuahua Lorem Ipsum Dolor sit amet uahuahuahua</ChatContainer>
        <ChatContainer from="me">Lorem Ipsum Dolor sit amet uahuahuahua, Lorem Ipsum Dolor sit amet uahuahuahua , Lorem Ipsum Dolor sit amet uahuahuahua ,Lorem Ipsum Dolor sit amet uahuahuahua Lorem Ipsum Dolor sit amet uahuahuahua</ChatContainer>
        <ChatContainer from="me">Hai</ChatContainer>
        <ChatContainer>Hai</ChatContainer>
      </div>
      <Input style={{ marginBottom: "10px" }} placeholder="Message here..." />
    </div>
  </Layout>
}

export default Chat
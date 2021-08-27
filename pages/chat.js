import { useContext, useEffect } from 'react'
import Link from 'next/link'
import Layout from "../components/Layout"
import Input from "../components/Input"
import { AppContext } from "../context/AppContext"

const ChatContainer = ({ from, children }) => {
  let style = null
  let triangleStyle = null
  if (from === "me") {
    style = {
      alignSelf: "flex-end",
      color: "white",
      padding: 15,
      background: "#5DB075",
      borderRadius: 12,
    }
    triangleStyle = {
      alignSelf: "flex-end",
      width: 0,
      height: 0,
      borderTop: '20px solid #5DB075',
      borderLeft: '20px solid transparent',
      marginTop: -10,
      marginBottom: 12
    }
  } else {
    style = {
      padding: 15,
      borderRadius: 12,
      background: "#f6f6f6",
      alignSelf: "flex-start",
    }

    triangleStyle = {
      width: 0,
      height: 0,
      borderTop: '20px solid #f6f6f6',
      borderRight: '20px solid transparent',
      marginTop: -8,
      marginBottom: 12
    }

  }

  return <>
    {from !== "me" && <div style={{ fontSize: 14 }}>username</div>}
    <div style={style}>
      {children}
    </div>
    <div
      style={triangleStyle}
    >
    </div>
  </>
}

const Chat = () => {
  let {axios} = useContext(AppContext)

  useEffect(() => {
    axios.get("/").then(res => {
      console.log("res",res)
    })
  }, [axios])

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
          <span style={{ color: "#5DB075", cursor: "pointer" }} >Exit</span>
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
      <Input style={{ marginBottom: "10px", display: "flex" }} placeholder="Message here..." >
        <div
          style={{
            color: "white",
            background: "#5DB075",
            borderRadius: "50px",
            width: 30,
            height: 30,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          &#8593;
        </div>
      </Input>
    </div>
  </Layout>
}

export default Chat
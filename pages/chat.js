import { useContext, useState, useEffect, memo, createRef, forwardRef } from 'react'
import { useRouter } from 'next/router'


import Layout from "../components/Layout"
import Input from "../components/Input"
import { AppContext } from "../context/AppContext"

const ChatContainer = forwardRef(function ChatContainerRef({ from, children, username }, ref) {
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
    {from !== "me" && <div style={{ fontSize: 14 }}>{username}</div>}
    <div ref={ref} style={style}>
      {children}
    </div>
    <div
      style={triangleStyle}
    >
    </div>
  </>
})

const ChatListMemo = memo(function ChatList({ chats, onScroll }) {
  const router = useRouter()
  let chatRef = createRef()
  let ChatContainerRef = createRef()
  useEffect(() => {
    ChatContainerRef.current.addEventListener("scroll", e => onScroll(e, ChatContainerRef.current))
    if(chatRef.current){
      chatRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  })
  return <div
    ref={ChatContainerRef}
    style={{
      width: "100%",
      height: "88%",
      display: "flex",
      flexDirection: "column",
      overflow: "auto"
    }}
  >
    {chats.map((val, idx) => {
      return <ChatContainer ref={chatRef} username={val.username} from={val.username === router.query.username ? "me" : "other"} key={idx}>{val.message}</ChatContainer>
    })}
  </div>
}, () => { })

const Chat = () => {
  const router = useRouter()
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    data: [],
    page: 1,
    total_page : 1,
  });

  let { socket, axios } = useContext(AppContext)


  function getChatData(reset = false) {
    if (reset) {
      chatData.data = []
      chatData.page = 1
    }
    axios.get("/chat", {
      params: {
        page: chatData.page,
        room: router.query.room
      }
    })
      .then(res => {
        for (let i = 0; i < res.data.data.length; i++) {
          console.log(i)
          chatData.data.unshift(res.data.data[i])
        }
        chatData.total_page = res.data.total_page
        setChatData({
          ...chatData
        })
      })
  }

  useEffect(() => {
    if(router?.query?.room){
      getChatData(true)
    }
  }, [axios, router])

  useEffect(() => {
    if (socket) {
      socket.on("message", data => {
        chatData.data.push(data)
        setChatData({
          ...chatData
        })
      })
    }
  }, [socket])

  return <Layout>
    <div
      style={{
        width: "100%",
        height: "100%",
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
        <span onClick={() => {
          if (socket) socket.disconnect()
          router.push("/")
        }} style={{ color: "#5DB075", cursor: "pointer" }} >Exit</span>
        <div style={{ alignSelf: "center", position: "absolute" }}>{router.query.room}</div>
      </div>
      <ChatListMemo chats={chatData.data} onScroll={(e,el) => {
          if(el && el?.scrollTop === 0 && chatData.page < chatData.total_page){
            chatData.page += 1
            setChatData({
              ...chatData
            })
            getChatData()
          }
      }} />
    </div>
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        padding: 10
      }}
    >
      <Input value={message} onInput={e => setMessage(e.target.value)} style={{ marginBottom: "10px", display: "flex", width: "100%" }} placeholder="Message here..." >
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
            justifyContent: "center",
            cursor: "pointer"
          }}
          onClick={() => {
            if (socket) {
              socket.emit("sendMessage", message, err => {
                console.log("error", err)
                if (err) {
                  alert(err)
                } else {
                  setMessage("")
                }
              })
            } else {
              alert("connection error")
              router.push("/")
            }
          }}
        >
          &#8593;
        </div>
      </Input>
    </div>
  </Layout>
}

export default Chat
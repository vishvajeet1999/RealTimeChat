import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom'


const socket = io.connect("http://localhost:4444") 

function Home() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [messageList, setMessageList] = useState([]);
  const [cookies, setCookies, removeCookies] = useCookies(['user'])
  const navigate = useNavigate()



    const sendMessage = async () =>{

        const messageData = {
            message: messageInput,
            user: username,
            room: room,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

        }
        await socket.emit("send_message", messageData)
        // setMessageList(list => [...list, messageData])
        console.log(messageData)
        setMessageInput('')
        // console.log(socket.id)
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
          console.log(data);
          setMessageList((list) => [...list, data]);
        });

      },[socket]);
  

  const handleLogout = e =>{
    e.preventDefault()
    removeCookies("token");
    navigate('/signup')

  }
  const joinRoom = (e) =>{
    e.preventDefault();
    console.log(room)
    if(username !== "" && room !== ""){
      socket.emit("join_room", room)
    }
    // setRoom('')
    // setUserName("")

  }

  return (
    <div className="joinChatContainer">

      <div style={{display: 'flex', justifyContent: "right"}}>
      <h6>Join a Chat</h6>

        <button className='btn btn-primary' style={{padding: 0}} onClick={handleLogout} >Logout</button>
      </div>

      
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <div style={{display: 'flex'}}>
      <input
            type="text"
            placeholder="John..."
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
      <input
            type="text"
            placeholder="RoomNameasId"
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
      </div>
      <button onClick = {joinRoom}>Join Room</button>


      <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.user ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={messageInput}
          placeholder="Hey..."
          onChange={(event) => {
            setMessageInput(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
      </div>


    </div>
  )
}

export default Home
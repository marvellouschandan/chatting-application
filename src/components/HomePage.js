import React, { useEffect, useRef, useState } from 'react';
import HeaderLayout from './HeaderLayout';
import './HomePage.css';
import chatUserLogo from './../images/images.png'
import SockJsClient from 'react-stomp';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../api/authenticationService';

const SOCKET_URL = 'http://localhost:8080/websocketApp/';
const PRIVATE_TOPIC = 'private-message';

const User = (props) => {
    const {user, onClick} = props;

    return (
        <div onClick={() => onClick(user)} className="displayName">
            <div className="displayPic">
                <img src={chatUserLogo} alt="" />
            </div>
            <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
                <span style={{fontWeight: 500}}>{user.name}</span>
                <span className={user.isOnline ? 'onlineStatus' : 'onlineStatus off'}></span>
            </div>
        </div>
    );
}


const HomePage = ({...props}) => {
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUserName, setChatUserName] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [conversationList, setConversationList] = useState([])
  var clientRef = useRef()
  /*const loggedInUser = {
                            "id": 1,
                            "name" : "Chandan Kumar",
                            "username" : "chandan",
                            "isOnline" : true
                        }*/
  const loggedInUser = props.loggedInUser;

  const [selectedUser, setSelectedUser] = useState(null);

  // FETCHING ALL USERS FROM DB
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    fetchAllUsers().then((response) => {
        let tempUsersList = response.data;
        let finalUsersList = tempUsersList.filter(user => user.username !== loggedInUser.username)
                     .map(user => {
                         return {
                             id: user.id,
                             name: user.name, 
                             username: user.username, 
                             isOnline: true}
                        });
        setUsers(finalUsersList);
    }
    )
  }, [])

  const initChat = (user) => {
      setChatStarted(true)
      setChatUserName(user.name)
      setSelectedUser(user);
      setConversationList([]);
  }

  const submitInputMessage = (e) => {
    onSendMessage(inputMessage);
    setInputMessage('');
  }

  // STOMP message methods

  const onConnected = () => {
    let selfMsg = {sender: loggedInUser.username, type: 'JOIN', group: PRIVATE_TOPIC}

    try {
        clientRef.sendMessage("/app/chat.register", JSON.stringify(selfMsg));
        console.log("Connected!!")
    } catch(e) {
        console.log("Unable to establish connection!!")
    }
  }

  const onMessageReceived = (msg) => {
    console.log('New Message Received!!', msg);

    setConversationList((prevConverstaion) =>{
        return [...prevConverstaion, msg]
        }
    );
  }

  const onSendMessage = (msgText) => {
    const msgObj = {
        sender : loggedInUser.username,
        receiver : selectedUser.username,
        content : msgText,
        group : PRIVATE_TOPIC,
        type : 'CHAT'
    };

    try {
        clientRef.sendMessage("/app/chat.private", JSON.stringify(msgObj));
        console.log('Sent ', msgObj)
      } catch(e) {
        console.log('Error Occured while sending message');
      }
  }


  return (
    <div>
        {!!selectedUser?
        <SockJsClient
            url={SOCKET_URL}
            topics={['/user/topic/' + PRIVATE_TOPIC]}
            onConnect={onConnected}
            onDisconnect={console.log("Disconnected!")}
            onMessage={msg => onMessageReceived(msg)}
            onSendMessage={ onSendMessage }
            ref={ (client) => { clientRef = client }}
            debug={true}
        /> : null
        }
        <HeaderLayout>
            <section className="container">
                <div className="listOfUsers">
                {
                    users.length > 0 ?
                    users.map(user => {
                        return (
                        <User onClick={initChat} key={user.id} user={user}/>
                    );
                    }) : null
                }
                </div>  

                <div className="chatArea">
                    <div className="chatHeader">{chatStarted ? chatUserName : ''}</div>
                    <div className="messageSections">
                        {
                            chatStarted ? 
                            conversationList.map(conv => 
                                <div style={{ textAlign: conv.sender === loggedInUser.username ? 'right' : 'left' }}>
                                    <p className="messageStyle" >{conv.content}</p>
                                </div> 
                            ) : null
                        }

                    </div>
                    {
                        chatStarted ?
                        <div className="chatControls">
                            <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}/>
                            <button onClick={submitInputMessage}>Send</button>
                        </div> : null
                    }
                </div>
            </section>
        </HeaderLayout>
    </div>
  );
}

const mapStateToProps=({auth})=>{
    return {
        loggedInUser: auth.user
}}

export default connect(mapStateToProps)(HomePage);
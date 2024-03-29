import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
function Chat() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            if (!localStorage.getItem("chat-app-user")){
                navigate("/login");
            }
            else {
                setCurrentUser (await JSON.parse(localStorage.getItem("chat-app-user")))
                setIsLoaded(true);
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        async function fetchData() {
            if(currentUser) {
                    if(currentUser.isAvatarImageSet) {
                        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                        setContacts(data.data);
                    }
                    else {
                        navigate("/setAvatar");
                    }
            }
        }
        fetchData();
    }, [currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }
    return(
        <Container>
            <div className="container">
                <Contacts contacts={contacts} 
                          currentUser={currentUser} 
                          changeChat ={handleChatChange}
                />
                {
                  isLoaded && currentChat === undefined ? (
                    <Welcome currentUser={currentUser} />
                  ) : (
                    <ChatContainer currentChat={currentChat} currentUser={currentUser}/>
                  ) 
                }   
            </div>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    // width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #cecde9;
    .container{
        
        height:90vh;
        width: 85vw;
        background-color: #ebe7ff;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1000px){
            grid-template-columns: 35% 65%;
        }
        border-radius: 2rem 2rem 0 0;
        box-shadow: 20px 20px 20px 20px rgba(0, 0, 0, 0.2);
    }
`;

export default Chat;
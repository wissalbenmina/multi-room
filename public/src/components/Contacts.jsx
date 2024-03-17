import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.png";

export default function Contacts({contacts ,currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);
    const changrCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    return (
    <>
        {
            currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>Talkie</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact,index) => {
                                return (
                                    <div className={`contact ${index === currentSelected ? "selected" : ""}`} 
                                                               key={index}
                                                               onClick={() => changrCurrentChat(index, contact)}>
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                 alt="avatar" 
                                            />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`}
                                alt="avatar" 
                        />
                    </div>
                    <div className="username">
                        <h2>{currentUserName}</h2>
                    </div>
                    </div>
                </Container>
            )
        }  
    </>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #40356f;
    border-radius: 2rem 0 0 0;
    
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-top:  1rem;
        img{
            height: 2rem;
        }
        h3{
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        margin-top:  1rem;
        &::-webkit-scrollbar{
            width: 0.2rem;
            height: 0.2rem;
            &-thumb {
                background-color: #cecde9;
                width:0.1rem;
                height: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact{
            background-color: #cecde9;
            min-height: 4rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition:0.5 ease-in-out;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color: white;
                }
            }
        }
        .selected{
            background-color: #8c48cc;
        }
    }
    .current-user{
        background-color: #665d8c;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        
        .avatar{
            img{
                height: 3rem;
                max-inline-size: 100%;
            }
        }
        .username{
            h2{
                color: white;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1000px){
            gap:0.5rem;
            .username{
                h2{
                    font-size: 1rem;
                }
            }
        }
    }
`;
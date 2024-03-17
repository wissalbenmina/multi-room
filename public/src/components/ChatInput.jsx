import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
      };
      const handleEmojiClick = (event, emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
      };
      const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setMsg("");
        }
      };
  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerhideShow}/>
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            </div>
        </div>
        <form className="input-container" onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder='type your message here'
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            />
            <button className='submit'>
                <IoMdSend/>
            </button>
        </form>
    </Container>
  )
}
 const Container = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    background-color: #665d8c;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -350px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;
                .emoji-categories {
                    button {
                      filter: contrast(0);
                    }
                } 
                .emoji-search {
                    background-color: transparent;
                    border-color: #9a86f3;
                }
                .emoji-group:before {
                    background-color: #080420;
                }
            }
        }
    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        gap: 2rem;
        background-color: #ffffff34;
        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection {
              background-color
              : #9a86f3;
            }
            &:focus {
              outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            svg {
                font-size: 1.3rem;
                color: #ebe7ff;
              }
        }
    }
 `;
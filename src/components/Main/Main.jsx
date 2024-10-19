import React, { useContext, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, darkMode } = useContext(Context);
    const inputRef = useRef(null);

    const handleSend = () => {
        onSent(input);
        // Clear the input field using the ref
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className={`main ${darkMode ? 'dark' : ''}`}>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.me} alt="" />
            </div>
            <div className="main-container">
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello, Anshita</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Quiz me on famous landmarks and monuments around the world</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Give me tips for how to grow my coding skills</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Draft an email to a recruiter to accept a job offer</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                        <p className="bottom-info-f">
                            Humans review some saved chats to improve Google AI. To stop this for future chats, turn off Gemini Apps Activity. If this setting is on, don't enter info you wouldn’t want reviewed or used. <a className="black" href="#">How it works</a>
                        </p>
                    </>
                    : <div className="result">
                        <div className="result-title">
                            <img className='meimg' src={assets.me} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ? <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className="bottom">
                    <div className="search-box">
                        <input ref={inputRef} onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={handleSend} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. <a className='b-black' href="#">Your privacy & Gemini Apps</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;

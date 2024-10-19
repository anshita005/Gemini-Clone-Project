import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';  // Import the context
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [showMore, setShowMore] = useState(false); // New state for show more/less
    const { darkMode, setDarkMode, onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const handleShowMore = () => setShowMore(true);
    const handleShowLess = () => setShowMore(false);
    return (
       
        <div className={`sidebar ${extended ? 'extended' : ''} ${darkMode ? 'dark' : ''}`}>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.slice(0, showMore ? undefined : 5).map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                        {!showMore && prevPrompts.length > 5 && (
                            <div className="show-more" onClick={handleShowMore}>   <FontAwesomeIcon  className= "gap"icon={faChevronDown} />Show More</div>
                        )}
                        {showMore && (
                            <>
                                {prevPrompts.slice(5).map((item, index) => (
                                    <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                        <img src={assets.message_icon} alt="" />
                                        <p>{item.slice(0, 18)}...</p>
                                    </div>
                                ))}
                                <div className="show-less" onClick={handleShowLess}>    <FontAwesomeIcon className= "gap" icon={faChevronUp} /> Show Less</ div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p className='activity'>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? (
                        <div className='settings'>
                            <p className='settings-title'>Settings</p>
                        </div>
                    ) : null}
                    <div onClick={() => setDarkMode(prev => !prev)} className="theme-toggle">
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

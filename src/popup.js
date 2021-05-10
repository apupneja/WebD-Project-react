//Pop up for more info

const Popup = (content) => {
    return ( content.trigger) ?(
        <div className="popup">
            <div className="popupInner">
                <button className="closeBtn" onClick={()=>content.setTrigger(false)}>
                    Close
                </button>
                {content.children}
            </div>
        </div>
    ) : "";
}
 
export default Popup;
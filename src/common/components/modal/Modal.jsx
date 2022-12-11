import "./modal.css"

export const Modal = ({close, children}) => {
    const closeModal = (event) => {
        return event.target === event.currentTarget ? close() : ""
    }

    return <div onClick={(e) => closeModal(e)} className="modalBg">
        <div className="modalBg__close" onClick={close}> </div>
        <div className="modalBg__modal">
            {children}
        </div>
    </div>
}
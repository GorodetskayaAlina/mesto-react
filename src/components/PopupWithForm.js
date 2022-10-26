function PopupWithForm(props) {
  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close hover" type="button" onClick={props.onClose}></button>
        <div className="popup__body">
          <h2 className="popup__title">{props.title}</h2>
          <form className="popup__form" name={`${props.name}`} onSubmit={props.onSubmit} noValidate >
            {props.children}
            <button className={`popup__save popup__save-${props.name}`} type="submit">{props.button}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PopupWithForm;
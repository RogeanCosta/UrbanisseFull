import "./Modal.css"
import Button from "../Forms/Button"

export default function Modal({title, desc, onConfirm, onCancel}) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                <p>
                    {desc}
                </p>

                <div className="modal-actions">
                    <Button className="confirm-delete-button" onClick={onConfirm} > Confirmar </Button>
                    <Button onClick={onCancel} > Cancelar</Button>
                </div>
            </div>           
        </div>
    )
}
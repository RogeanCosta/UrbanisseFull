import "./Modal.css"
import Button from "../Forms/Button"
import { useState } from "react";
import "../../ProductForm.css"

export default function EditModal({info, onConfirm, onCancel}) {
    const [value, setValue] = useState("");
    const inputType = info === "senha" ? "password" : (info === "telefone" ? "number" : "text");

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Editar {info} do usuário.</h2>
                <p>
                    Digite abaixo o {info === "senha" ? "nova" : "novo"} {info} do usuário.
                </p>

                <input onChange={(e) => setValue(e.target.value)} type={inputType} />

                <div className="modal-actions">
                    <Button onClick={() => onConfirm(value)}> Confirmar </Button>
                    <Button onClick={onCancel} > Cancelar</Button>
                </div>
            </div>           
        </div>
    )
}
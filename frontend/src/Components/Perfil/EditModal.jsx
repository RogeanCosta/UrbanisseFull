import "./Modal.css"
import Button from "../Forms/Button"
import { useState } from "react";

export default function EditModal({info, onConfirm, onCancel}) {
    const [value, setValue] = useState("");

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Editar {info} do usuário.</h2>
                <p>
                    Digite abaixo o {info === "senha" ? "nova" : "novo"} {info} do usuário.
                </p>

                {
                    info === "senha" ? (<input onChange={(e) => setValue(e.target.value)} value={value} type="password" />) : 
                    (info === "telefone" ? (<input onChange={(e) => setValue(e.target.value)} value={value} type="number" />) : (<input onChange={(e) => setValue(e.target.value)} value={value} type="text" />))
                }

                <div className="modal-actions">
                    <Button onClick={() => onConfirm(value)}> Confirmar </Button>
                    <Button onClick={onCancel} > Cancelar</Button>
                </div>
            </div>           
        </div>
    )
}
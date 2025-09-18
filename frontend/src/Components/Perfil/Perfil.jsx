import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css"
import Button from "../Forms/Button"
import "./Button.css"
import { deleteUsuario, getUsuarios, putUsuario } from "../../api";
import "./Modal.css"
import Modal from "./Modal";
import EditModal from "./EditModal";
import { toast } from "react-toastify";
import { UserContext } from '../../UserContext';

export default function Perfil() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState({open: false, info: ""});
    const { userLogout } = React.useContext(UserContext);

    async function fetchUsers() {
            const users = await getUsuarios();
            const loggedUserEmail = window.localStorage.getItem('urbanisse-email');

            const loggedUser = users.find((user) => {
                return user.email === loggedUserEmail     
            })

            // Retorna a senha do usuario escondida por asteriscos
            if (loggedUser)
                loggedUser.password = "*".repeat(loggedUser.password.length);

            return loggedUser;
    }

    useEffect(() => {
        // Busca pelo usuario logado no banco e atualiza a tela com seus dados.
        async function setUser() {       
            const loggedUser = await fetchUsers();

            if (!loggedUser) {
                setLoading(false);
                return console.warn("Usuário não encontrado!");        
            }      

            setName(loggedUser.name);
            setEmail(loggedUser.email);
            setPassword(loggedUser.password);
            setPhone(loggedUser.phone);
            setLoading(false);
        }

        setUser();
    }, [])

    async function deleteAccount() {
        const loggedUser = await fetchUsers();

        if (!loggedUser) {
            setLoading(false);
            return console.warn("Usuário não encontrado!");
        }         

        try {
            await deleteUsuario(loggedUser.id);
            
            navigate('/login');
        }
        catch (error) {
            console.error(error);
        }
    }

    let handleUserEdit = async (newValue) => {
        const loggedUser = await fetchUsers();

        if (!loggedUser) {
            setLoading(false);
            return console.warn("Usuário não encontrado!");
        }

        try {
            let updatedData = {}

            if (editModalOpen.info === "e-mail") {
                updatedData = { email: newValue }; 
                window.localStorage.setItem('urbanisse-email', updatedData.email); 
            }
            else if (editModalOpen.info === "senha") {
                updatedData = { password: newValue };
            }
            else if (editModalOpen.info === "telefone") {
                updatedData = { phone: newValue };
            }
            
            await putUsuario(loggedUser.id, updatedData);

            toast.success("Usuário editado com sucesso!");
            navigate('/');
        } catch (error) {
            toast.error("Erro ao editar o usuário.");
            console.error(error);
        }

    }

    return (
        <div>
            <div className="wrapper">
                <h1 className="username-title">{loading ? "Carregando usuario" : name}</h1>

                <div className="margin-bottom-small">
                    <h2>Configurações do perfil</h2>
                    <p>Altere aqui as configurações do seu perfil</p>
                </div>

                <div className="personal-details">
                    <h3>Detalhes pessoais</h3>
                    
                    <h4>Telefone</h4>
                    <p>Seu número de telefone cadastrado no sistema.</p>
                    <div className="user-info">
                        <span>{phone}</span>
                        <svg onClick={() => setEditModalOpen({open: true, info:"telefone"})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#656565" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
                    </div>

                    <h4>E-mail</h4>
                    <p>Endereço de e-mail utilizado no sistema.</p>
                    <div className="user-info">
                        <span>{email}</span>
                        <svg onClick={() => setEditModalOpen({open: true, info:"e-mail"})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#656565" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
                    </div>

                    <h4>Senha</h4>
                    <p>A senha cadastrada no sistema</p>
                    <div className="user-info">
                        <span>{password}</span>
                        <svg onClick={() => setEditModalOpen({open: true, info:"senha"})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#656565" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
                    </div>
                </div>

                <div className="margin-bottom-small">
                    <h3>Zona de perigo</h3>
                    <p>Ações sensíveis. Proceda com cautela.</p>
                </div>

                <h3>Deletar Conta</h3>
                <p>Exclui permanentemente sua conta. Essa ação não pode ser desfeita.</p>
                <Button className="delete-account-button" onClick={() => setIsModalOpen(true)} >Deletar conta</Button>

                {isModalOpen && (
                    <Modal title="Confirmar Exclusão da conta?" desc="Essa ação não poderá ser desfeita." onConfirm={deleteAccount} onCancel={() => setIsModalOpen(false)} />
                )}

                {editModalOpen.open && (
                    <EditModal info={editModalOpen.info} onConfirm={(newValue) => handleUserEdit(newValue)} onCancel={() => setEditModalOpen(false)} />
                )}
            </div>
        </div>
    )
}
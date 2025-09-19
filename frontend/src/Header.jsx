import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Button from './Components/Forms/Button';
import { UserContext } from './UserContext';
import Filter from './filters';

export default function Header() {
  const { userLogout } = React.useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false)

  function handleSubmit(event) {
    event.preventDefault();
    userLogout();
  }

  return (
    <>
      <header className="header">
        <div className=" headerContent">
          <Link to="/" className="logo">
            <h2>Urbanisse</h2>
          </Link>

          <nav className="categorias-header">
            <Link to="produtos/camisas">
              <button className="botaoLink">Camisas</button>
            </Link>
            <Link to="produtos/calcas">
              <button className="botaoLink">Calças</button>
            </Link>
            <Link to="produtos/acessorios">
              <button className="botaoLink">Acessórios</button>
            </Link>
            <Link to="produtos/calcados">
              <button className="botaoLink">Calçados</button>
            </Link>
            <Link to="produtos/intimas">
              <button className="botaoLink">Roupas íntimas</button>
            </Link>
          </nav>

          <nav className="novo-produto">
            <Link to="novoproduto">
              <button className="botaoNovoProduto">+ Novo Produto</button>
            </Link>

              <svg 
              className='perfil-icon' 
              xmlns="http://www.w3.org/2000/svg" 
              width="42" height="42" fill="#c2c2c2" 
              viewBox="0 0 256 256"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
              </svg>

              {
                dropdownOpen && (
                  <div className='dropdown'>
                    <Link to="perfil">
                      <Button> Perfil </Button>
                    </Link>
                    <Button onClick={handleSubmit}>Logout</Button>
                  </div>
                )
              }
          </nav>
        </div>
      </header>
       
      </>
  ); 
}

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ProductList from './ProductList';

export default function Filter({}) {
    const [gender, setGender] = useState('');
    const[products, setProducts] = useState([]);
    
    const handleGenderChange = (e) => {
    setGender(e.target.value);
    }
     
     useEffect (() => {
        const fetchDataGender = async () => {
            if(!gender) {
                setProducts([]);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/produtos/gender/${gender}`);
                    setProducts(response.data); 
            } catch (error) {
                console.error("Erro ao buscar dados:", error); 
                }
            };
            fetchDataGender();
     }, [gender]);

    return (
         <div className="filtragem">
          <nav>
            <select className="genero" value={gender} onChange={handleGenderChange}>
              <option value="">Selecione um gênero</option>
              <option value="masculino" >Masculino</option>
              <option value="feminino" >Feminino</option>
              <option value="Unissex" >Unissex</option>
            </select>
          </nav>
          <nav>
            <select className="estoque">
              <option value="">Todos os itens</option>
              <option value="estoque">Em estoque</option>
              <option value="sem-estoque">Sem estoque</option>
            </select>
          </nav>

          <div>
            <ProductList gender={gender}/>
          </div>
        </div>
    )
}
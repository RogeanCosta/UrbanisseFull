import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./ProductList";

export default function Filter({ setGender, setStock, gender, stock }) {
  return (
    <div className="filtragem">
      <nav>
        <select
          className="genero"
          onChange={(e) => setGender(e.target.value || null)}
          disabled={!!stock}
        >
          <option value="">Selecione um gênero</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="Unissex">Unissex</option>
        </select>
      </nav>
      <nav>
        <select
          className="estoque"
          onChange={(e) => setStock(e.target.value || null)}
          disabled={!!gender}
        >
          <option value="">Todos os itens</option>
          <option value="estoque">Em estoque</option>
          <option value="semestoque">Sem estoque</option>
        </select>
      </nav>
    </div>
  );
}

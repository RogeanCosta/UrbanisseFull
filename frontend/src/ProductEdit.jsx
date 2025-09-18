import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductForm.css";
import { getProduto, putProduto } from "./api";
import { toast } from "react-toastify";

export default function ProductEditor() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate(); 

  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // useEffect para fazer um GET produto/id no bdd e por as informações no form.
  useEffect(() => {
    async function fetchProduto() {
      try {
        // Função axios para requisição GET produto por seu ID.
        const product = await getProduto(id);

        // Caso o produto seja encontrado, puxa as informações dele e põe no form de edição
        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            category: product.category,
            gender: product.gender
          })
        }
      }
      catch (error) {
        console.error(error);
      }
    }

    fetchProduto();
  }, [id])  

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await putProduto(id, {
            name: formData.name,
            price: parseFloat(formData.price),
            description: formData.description,
            stock: parseInt(formData.stock),
            category: formData.category,
            gender: formData.gender
      });

      toast.success("Produto editado com sucesso! 🎉")
    }
    catch (error) {
      toast.error("Erro ao editar o produto. 😢")
      console.error(error);
    }
    
    setIsLoading(false);
    navigate('/')
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      {id && (
        <form
          onSubmit={handleUpdate}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <label htmlFor="name">Nome do Produto</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
          />

          <label htmlFor="price">Preço</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Preço"
            required
          />

          <label htmlFor="description">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição"
            required
          />

          <label htmlFor="stock">Quantidade no estoque</label>
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Estoque"
            required
          />

          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a categoria</option>
            <option value="Camisas">Camisas</option>
            <option value="Acessórios">Acessórios</option>
            <option value="Calçados">Calçados</option>
            <option value="Calças">Calças</option>
            <option value="Intimo">Intimo</option>
          </select>

          <label htmlFor="gender">Gênero</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o gênero</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="Unissex">Unissex</option>
          </select>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      )}
    </div>
  );
}

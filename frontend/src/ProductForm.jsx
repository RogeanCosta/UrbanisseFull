import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";
import { toast } from "react-toastify";
import { postProduto } from "./api";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const imageInputRef = useRef();

  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!image) {
      alert("Selecione uma imagem");
      setIsLoading(false);
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
      alert("Formato de imagem inválido. Use JPEG, PNG ou WEBP.");
      setIsLoading(false);
      return;
    }

    if (parseFloat(price) <= 0 || isNaN(price)) {
      alert("O preço deve ser um número positivo.");
      setIsLoading(false);
      return;
    }

    if (parseInt(stock) < 0 || isNaN(stock)) {
      alert("O estoque não pode ser negativo.");
      setIsLoading(false);
      return;
    }

    if (name.trim().length < 3 || description.trim().length < 5) {
      alert("Nome ou descrição muito curtos.");
      setIsLoading(false);
      return;
    }

    // Novo produto
    const newProduct = {
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
      stock: parseInt(stock),
      category: capitalizeFirst(category.trim()),
      gender: gender.trim(),
    };

    try {
      // Necessário usar o objeto FormData quando vai enviar arquivos (como imagens) junto com os demais campos do formulário.
      const formData = new FormData();

      // Adicionando os valores do formulário ao objeto FormData
      Object.entries(newProduct).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", image);

      // Função axios para requisição POST /produtos
      await postProduto(formData);

      toast.success("Produto cadastrado com sucesso! 🎉");
    } 
    catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar produto 😢");
    }

    // Limpa o formulário
    setName("");
    setPrice("");
    setDescription("");
    setStock("");
    setCategory("");
    setGender("");
    setImage(null);
    if (imageInputRef.current)
      imageInputRef.current.value = null;
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <label htmlFor="image">Imagem do Produto</label>
      <input
        type="file"
        ref={imageInputRef}
        onChange={(e) => setImage(e.target.files[0])}
        required
        name="image"
      />

      <label htmlFor="name">Nome do Produto</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        required
        name="name"
      />

      <label htmlFor="price">Preço</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preço"
        name="price"
        required
      />

      <label htmlFor="description">Descrição</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        required
        name="description"
      />

      <label htmlFor="stock">Quantidade no estoque</label>
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Estoque"
        required
        name="stock"
      />

      <label htmlFor="category">Categoria</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
        name="gender"
      >
        <option value="">Selecione o gênero</option>
        <option value="masculino">masculino</option>
        <option value="feminino">feminino</option>
        <option value="Unissex">Unissex</option>
      </select>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Salvando..." : "Cadastrar Produto"}
      </button>
    </form>
  );
}

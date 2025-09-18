import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import "./ProductList.css";
import Pagination from "./Pagination";
import {
  getAcessorios,
  getCalcados,
  getCalcas,
  getCamisas,
  getIntimas,
  getProdutos,
} from "./api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const params = useParams();

  useEffect(() => {
    setCurrentPage(1);
  }, [params.categoria]);

  const carregarProdutos = async () => {
    setLoading(true);
    let produtosCarregados = [];

    let categoria;
    switch (params.categoria) {
      case "camisas":
        categoria = "Camisas";
        produtosCarregados = await getCamisas();
        break;
      case "calcas":
        categoria = "Calças";
        produtosCarregados = await getCalcas();
        break;
      case "acessorios":
        categoria = "Acessórios";
        produtosCarregados = await getAcessorios();
        break;
      case "calcados":
        categoria = "Calçados";
        // A função getCalcados não existe no arquivo api.js, então vamos buscar todos
        produtosCarregados = await getCalcados();
        break;
      case "intimas":
        categoria = "Intimo";
        // A função getIntimas não existe no arquivo api.js, então vamos buscar todos
        produtosCarregados = await getIntimas();
        break;
      default:
        categoria = null;
        produtosCarregados = await getProdutos();
        break;
    }

    // A API retorna um array. Se o JSON do Supabase tivesse um único objeto, ele seria transformado em array.
    // Aqui não é necessário, pois a API já retorna um array.
    setProducts(produtosCarregados);

    setLoading(false);

  };

  useEffect(() => {
    carregarProdutos();
  }, [params.categoria]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div style={{ padding: "30px" }}>
      <h2 className="products-title">{params.categoria || "Todos os Produtos"}</h2>
      {loading && <p className="message">Carregando produtos....</p>}
      {!loading && products.length === 0 && (
        <p className="message">Nenhum produto encontrado.</p>
      )}

      {!loading && (
        <>
          <div className="products-list">
            {currentPosts.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                image={p.imageUrl}
                description={p.description}
                estoque={p.stock}
                categoria={p.category}
                genero={p.gender}
                id={p.id}
                onDelete={carregarProdutos}
              />
            ))}
          </div>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={products.length}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

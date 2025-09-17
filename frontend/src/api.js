import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Substitua pelo URL da sua API

// Referente aos produtos
export const getProdutos = async () => {
  const response = await axios.get(`${API_URL}/produtos`);
  return response.data;
};

export const getProduto = async (id) => {
  const response = await axios.get(`${API_URL}/produtos/${id}`);

  // Como retorna apenas 1 produto, desempacotar da Array com o indice 0.
  return response.data[0];
};

export const getCamisas = async () => {
  const response = await axios.get(`${API_URL}/produtos/camisas`);
  return response.data;
};

export const getCalcas = async () => {
  const response = await axios.get(`${API_URL}/produtos/calcas`);
  return response.data;
};

export const getAcessorios = async () => {
  const response = await axios.get(`${API_URL}/produtos/acessorios`);
  return response.data;
};

// Necessário identificar o tipo de conteúdo como multipart/form-data para indicar que enviará uma imagem na requisição.
export const postProduto = async (produto) => {
  const response = await axios.post(`${API_URL}/produtos`, produto, {headers: { "Content-Type": "multipart/form-data",}});
  return response.data;
};

export const putProduto = async (id, produto) => {
  const response = await axios.put(`${API_URL}/produtos/${id}`, produto);
  return response.data;
};

export const deleteProduto = async (id) => {
  const response = await axios.delete(`${API_URL}/produtos/${id}`);
  return response.data;
};

// Referente aos usuários
export const getUsuarios = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const postUsuarios = async (usuario) => {
  const response = await axios.post(`${API_URL}/users`, usuario);
  return response;
};

export const putUsuario = async (id, usuario) => {
  const response = await axios.put(`${API_URL}/users/${id}`, usuario);
  return response.data;
};

export const deleteUsuario = async (id) => {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};

// ======== NOVA ROTA =============
export const getUsuario = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

// ======== NOVA ROTA*** =============
export const postCredentials = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response;
};

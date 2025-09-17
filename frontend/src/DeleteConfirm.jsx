import React from 'react';
import { supabase } from './supabase';
import { deleteProduto } from './api';

export default function DeleteConfirmation({ produto, onCancel, onDeleted }) {
  if (!produto || !produto.id || !produto.imagePath) {
    console.error('Produto inválido no modal de exclusão:', produto);
    return null;
  }

  const handleDelete = async () => {
    try {
      // Deleta o produto do banco de dados via API
      await deleteProduto(produto.id);

      // Excluir imagem do storage
      const { error: imageError } = await supabase.storage
        .from('images')
        .remove([produto.imagePath]);

      if (imageError) {
        console.error('Erro ao excluir imagem:', imageError.message);
        alert('Produto excluído, mas a imagem não foi removida.');
        if (onDeleted) onDeleted();
        return;
      }

      alert('Produto excluído com sucesso!');
      if (onDeleted) onDeleted(); // Chama o callback para atualizar o estado na tela
    } catch (err) {
      console.error('Erro inesperado ao excluir:', err.message);
      alert('Erro ao excluir o produto ou imagem.');
    }
  };

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p
          style={{
            fontWeight: '700',
            color: '#e07b39',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span role="img" aria-label="Aviso">
            ⚠️
          </span>
          Tem certeza que deseja excluir este produto?
        </p>
        <div className="confirm-buttons">
          <button onClick={handleDelete} className="confirm-yes">
            Excluir
          </button>
          <button onClick={onCancel} className="confirm-no">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
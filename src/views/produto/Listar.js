import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const [produtos, setProdutos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/produto');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/produto/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/produto/${produtoToDelete}`);
      setProdutos(produtos.filter(produto => produto.id !== produtoToDelete));
      setModalVisible(false);
      setProdutoToDelete(null);
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };

  const confirmDelete = (id) => {
    setProdutoToDelete(id);
    setModalVisible(true);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Listar Produtos</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {produtos.map((produto, index) => (
                  <CTableRow key={produto.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{produto.nome}</CTableDataCell>
                    <CTableDataCell>{produto.preco}</CTableDataCell>
                    <CTableDataCell>{produto.descricao}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" onClick={() => handleEdit(produto.id)}>Editar</CButton>{' '}
                      <CButton color="danger" size="sm" onClick={() => confirmDelete(produto.id)}>Remover</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Remoção</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tem certeza de que deseja remover este produto?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Remover
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default Tables;

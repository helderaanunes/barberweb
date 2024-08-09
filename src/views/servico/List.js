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
  const [servicos, setservicos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [servicoToDelete, setservicoToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchservicos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/servico');
        setservicos(response.data);
      } catch (error) {
        console.error('Erro ao buscar servicos:', error);
      }
    };

    fetchservicos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/servico/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/servico/${servicoToDelete}`);
      setservicos(servicos.filter(servico => servico.id !== servicoToDelete));
      setModalVisible(false);
      setservicoToDelete(null);
    } catch (error) {
      console.error('Erro ao remover servico:', error);
    }
  };

  const confirmDelete = (id) => {
    setservicoToDelete(id);
    setModalVisible(true);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Listar servicos</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tempo</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {servicos.map((servico, index) => (
                  <CTableRow key={servico.id}>
                    <CTableDataCell>{servico.nome}</CTableDataCell>
                    <CTableDataCell>{servico.preco} R$</CTableDataCell>
                    <CTableDataCell>{servico.tempo} mins</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" onClick={() => handleEdit(servico.id)}>Editar</CButton>{' '}
                      <CButton color="danger" size="sm" onClick={() => confirmDelete(servico.id)}>Remover</CButton>
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
          Tem certeza de que deseja remover esta servico?
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

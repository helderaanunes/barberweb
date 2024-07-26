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
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cliente');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/cliente/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/cliente/${clienteToDelete}`);
      setClientes(clientes.filter(cliente=> cliente.id !== clienteToDelete));
      setModalVisible(false);
      setClienteToDelete(null);
    } catch (error) {
      console.error('Erro ao remover cliente:', error);
    }
  };

  const confirmDelete = (id) => {
    setClienteToDelete(id);
    setModalVisible(true);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Listar Clientes</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {clientes.map((cliente, index) => (
                  <CTableRow key={cliente.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{cliente.nome}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" onClick={() => handleEdit(cliente.id)}>Editar</CButton>{' '}
                      <CButton color="danger" size="sm" onClick={() => confirmDelete(cliente.id)}>Remover</CButton>
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
          Tem certeza de que deseja remover este cliente?
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

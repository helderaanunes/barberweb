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

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [agendamentoToDelete, setAgendamentoToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/agendamento');
        setAgendamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/agendamento/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/agendamento/${agendamentoToDelete}`);
      setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== agendamentoToDelete));
      setModalVisible(false);
      setAgendamentoToDelete(null);
    } catch (error) {
      console.error('Erro ao remover agendamento:', error);
    }
  };

  const confirmDelete = (id) => {
    setAgendamentoToDelete(id);
    setModalVisible(true);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Listar Agendamentos</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Data</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Taxa</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Horário Início</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Horário Fim</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Usuário</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {agendamentos.map((agendamento, index) => (
                  <CTableRow key={agendamento.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{agendamento.data}</CTableDataCell>
                    <CTableDataCell>{agendamento.taxa}</CTableDataCell>
                    <CTableDataCell>{agendamento.horarioInicio}</CTableDataCell>
                    <CTableDataCell>{agendamento.horarioFim}</CTableDataCell>
                    <CTableDataCell>{agendamento.cliente}</CTableDataCell>
                    <CTableDataCell>{agendamento.usuario}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" onClick={() => handleEdit(agendamento.id)}>Editar</CButton>{' '}
                      <CButton color="danger" size="sm" onClick={() => confirmDelete(agendamento.id)}>Remover</CButton>
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
          Tem certeza de que deseja remover este agendamento?
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

export default Agendamentos;

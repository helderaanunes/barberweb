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

const FluxoFinanceiroTable = () => {
  const [fluxos, setFluxos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fluxoToDelete, setFluxoToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFluxos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/fluxo-financeiro');
        setFluxos(response.data);
      } catch (error) {
        console.error('Erro ao buscar fluxos financeiros:', error);
      }
    };

    fetchFluxos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/fluxofinanceiro/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/fluxo-financeiro/${fluxoToDelete}`);
      setFluxos(fluxos.filter(fluxo => fluxo.id !== fluxoToDelete));
      setModalVisible(false);
      setFluxoToDelete(null);
    } catch (error) {
      console.error('Erro ao remover fluxo financeiro:', error);
    }
  };

  const confirmDelete = (id) => {
    setFluxoToDelete(id);
    setModalVisible(true);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Listar Fluxo Financeiro</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fluxo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Valor</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Data de Vencimento</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Data de Pagamento</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Situação</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {fluxos.map((fluxo, index) => (
                  <CTableRow key={fluxo.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{fluxo.descricao}</CTableDataCell>
                    <CTableDataCell>{fluxo.fluxo}</CTableDataCell>
                    <CTableDataCell>{fluxo.valor}</CTableDataCell>
                    <CTableDataCell>{new Date(fluxo.dataVencimento).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell>{fluxo.dataPagamento ? new Date(fluxo.dataPagamento).toLocaleDateString() : 'N/A'}</CTableDataCell>
                    <CTableDataCell>{fluxo.situacao}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" onClick={() => handleEdit(fluxo.id)}>Editar</CButton>{' '}
                      <CButton color="danger" size="sm" onClick={() => confirmDelete(fluxo.id)}>Remover</CButton>
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
          Tem certeza de que deseja remover este fluxo financeiro?
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

export default FluxoFinanceiroTable;

// ClienteList.jsx
import {
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
} from '@coreui/react';
import React, { useEffect, useState } from 'react';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:8080/clientes/ordens');
        if (!response.ok) {
          throw new Error('Erro ao buscar clientes.');
        }
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Erro:', error);
        alert(`Erro ao buscar clientes: ${error.message}`);
      }
    };

    fetchClientes();
  }, []);


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Clientes</strong> <small>Lista de Clientes e Última Ordem</small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Nome do Cliente</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Última Ordem</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {clientes.map((cliente, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{cliente.nomeCliente}</CTableDataCell>
                    <CTableDataCell>{cliente.ultimaOrdem ? new Date(cliente.ultimaOrdem).toLocaleString() : 'Nunca'}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
        
        
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Clientes</strong> <small>Próximos Aniversariantes (até 30 dias)</small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Nome do Cliente</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Data de Nascimento</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {clientes.map((cliente, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{cliente.nome}</CTableDataCell>
                    <CTableDataCell>
                      {format(new Date(cliente.dataNascimento), 'dd/MM/yyyy')}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
        
      </CCol>
    </CRow>
  );
};

export default ClienteList;

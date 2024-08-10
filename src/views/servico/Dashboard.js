// ServicoLucrativoList.jsx
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import React, { useEffect, useState } from 'react';

const ServicoLucrativoList = () => {
  const [servicos, setServicos] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchServicos = async () => {
    try {
      const response = await fetch(`http://localhost:8080/servico/lucro?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar serviços.');
      }
      const data = await response.json();
      setServicos(data);
    } catch (error) {
      console.error('Erro:', error);
      alert(`Erro ao buscar serviços: ${error.message}`);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchServicos();
    }
  }, [startDate, endDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchServicos();
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Serviços Mais Lucrativos</strong> <small>Lista de Serviços com Maior Lucro</small>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSearch} className="mb-4">
              <div className="mb-3">
                <CFormInput
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormInput
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <CButton type="submit" color="primary">
                Buscar
              </CButton>
            </CForm>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Nome do Serviço</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantidade Realizações</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Lucro Total</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {servicos.map((servico, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{servico.nomeServico}</CTableDataCell>
                    <CTableDataCell>{servico.preco}</CTableDataCell>
                    <CTableDataCell>{servico.quantidadeRealizacoes}</CTableDataCell>
                    <CTableDataCell>{servico.lucroTotal}</CTableDataCell>
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

export default ServicoLucrativoList;

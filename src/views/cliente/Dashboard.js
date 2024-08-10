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
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
  
  const Tables = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate(); // Hook de navegação
  
    useEffect(() => {
      // Fetch services from API on component mount
      const fetchServices = async () => {
        try {
          const response = await fetch('http://localhost:8080/servico');
          if (!response.ok) {
            throw new Error('Erro ao buscar serviços.');
          }
          const data = await response.json();
          setServices(data);
        } catch (error) {
          console.error('Erro:', error);
          alert(`Erro ao buscar serviços: ${error.message}`);
        }
      };
  
      fetchServices();
    }, []);
  
    const handleEdit = (service) => {
      // Redireciona para a página de adicionar/editar serviço e passa os dados do serviço como estado
      navigate('/Servico/add', { state: { service } });
    };
  
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Serviços</strong> <small>Lista de Serviços</small>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {services.map((service) => (
                    <CTableRow key={service.id}>
                      <CTableHeaderCell scope="row">{service.id}</CTableHeaderCell>
                      <CTableDataCell>{service.nome}</CTableDataCell>
                      <CTableDataCell>{service.descricao}</CTableDataCell>
                      <CTableDataCell>{service.preco}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          onClick={() => handleEdit(service)}
                        >
                          Editar
                        </CButton>
                        {/* Aqui você pode adicionar um botão de remover */}
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
  
  export default Tables;
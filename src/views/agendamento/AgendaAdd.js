import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow,
    CFormSelect
  } from '@coreui/react';
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Calendar from 'react-calendar';
  import 'react-calendar/dist/Calendar.css';

  const Agendar = () => {
      const [barbeiros, setBarbeiros] = useState([]);
      const [selectedBarbeiro, setSelectedBarbeiro] = useState('');
      const [servicos, setServicos] = useState([]);
      const [selectedServico, setSelectedServico] = useState('');
      const [availableDates, setAvailableDates] = useState([]);

      useEffect(() => {
          axios.get('http://localhost:8080/barbeiros')
              .then(response => {
                  setBarbeiros(response.data);
              })
              .catch(error => {
                  console.error('Houve um erro ao buscar os barbeiros!', error);
              });
      }, []);

      useEffect(() => {
          if (selectedBarbeiro) {
              axios.get(`http://localhost:8080/barbeiros/${selectedBarbeiro}/servicos`)
                  .then(response => {
                      setServicos(response.data);
                  })
                  .catch(error => {
                      console.error('Houve um erro ao buscar os serviços!', error);
                  });
          } else {
              setServicos([]);
          }
      }, [selectedBarbeiro]);

      useEffect(() => {
          if (selectedBarbeiro && selectedServico) {
              axios.get(`http://localhost:8080/agendamento/${selectedBarbeiro}/${selectedServico}`)
                  .then(response => {
                      setAvailableDates(response.data.map(date => new Date(date)));
                  })
                  .catch(error => {
                      console.error('Houve um erro ao buscar as datas disponíveis!', error);
                  });
          } else {
              setAvailableDates([]);
          }
      }, [selectedBarbeiro, selectedServico]);

      const handleBarbeiroChange = (event) => {
          setSelectedBarbeiro(event.target.value);
          setSelectedServico(''); // Resetar o serviço selecionado quando o barbeiro muda
      };

      const handleServicoChange = (event) => {
          setSelectedServico(event.target.value);
      };

      const tileDisabled = ({ date }) => {
          return !availableDates.some(availableDate =>
              availableDate.getFullYear() === date.getFullYear() &&
              availableDate.getMonth() === date.getMonth() &&
              availableDate.getDate() === date.getDate()
          );
      };

      return (
          <CRow>
              <CCol xs={12}>
                  <CCard className="mb-4">
                      <CCardHeader>
                          <strong>Agendar</strong>
                      </CCardHeader>
                      <CCardBody>
                          <CForm>
                              <div className="mb-3">
                                  <CFormLabel htmlFor="barbeiro">Barbeiro</CFormLabel>
                                  <CFormSelect id="barbeiro" value={selectedBarbeiro} onChange={handleBarbeiroChange}>
                                      <option value="">Selecione um barbeiro</option>
                                      {barbeiros.map(barbeiro => (
                                          <option key={barbeiro.id} value={barbeiro.id}>
                                              {barbeiro.nome}
                                          </option>
                                      ))}
                                  </CFormSelect>
                              </div>
                              {selectedBarbeiro && (
                                  <div className="mb-3">
                                      <CFormLabel htmlFor="servico">Serviço</CFormLabel>
                                      <CFormSelect id="servico" value={selectedServico} onChange={handleServicoChange}>
                                          <option value="">Selecione um serviço</option>
                                          {servicos.map(servico => (
                                              <option key={servico.id} value={servico.id}>
                                                  {servico.nome}
                                              </option>
                                          ))}
                                      </CFormSelect>
                                  </div>
                              )}
                              {selectedBarbeiro && selectedServico && (
                                  <div className="mb-3">
                                      <CFormLabel htmlFor="calendario">Datas Disponíveis</CFormLabel>
                                      <Calendar
                                          tileDisabled={tileDisabled}
                                      />
                                  </div>
                              )}
                          </CForm>
                      </CCardBody>
                  </CCard>
              </CCol>
          </CRow>
      )
  }

  export default Agendar;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
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
import { useNavigate } from 'react-router-dom';

const FormControl = () => {
  const [desconto, setDesconto] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [usuario, setUsuario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/usuario');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/venda', {
        desconto,
        data,
        hora,
        usuario: { id: usuario } // Enviar o ID do usuário selecionado
      });
      navigate('/vendas'); // Redirecionar para a lista de vendas após salvar
    } catch (error) {
      console.error('Erro ao salvar venda:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastrar Venda</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="data">Data</CFormLabel>
                <CFormInput
                  type="date"
                  id="data"
                  placeholder="Data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="hora">Hora</CFormLabel>
                <CFormInput
                  type="time"
                  id="hora"
                  placeholder="Hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="desconto">Desconto</CFormLabel>
                <CFormInput
                  type="number"
                  id="desconto"
                  placeholder="Desconto"
                  value={desconto}
                  onChange={(e) => setDesconto(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="usuario">Usuário</CFormLabel>
                <CFormSelect
                  id="usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                >
                  <option value="">Selecione um usuário</option>
                  {usuarios.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nome}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <CButton color="primary" type="submit">Salvar</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FormControl;

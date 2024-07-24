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
  CRow,
  CAlert,
  CCloseButton
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCheck } from '@coreui/icons';

const FormControl = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cargo: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleEnviarFormulario = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/usuario', formData);
      console.log('Resposta da API:', response.data);
      setMessage('Usuário cadastrado com sucesso!');
      setFormData({
        nome: '',
        email: '',
        senha: '',
        cargo: ''
      }); // Limpa o formulário
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setMessage('Erro ao cadastrar usuário.');
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 20000); // 20 segundos

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCloseAlert = () => {
    setMessage('');
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Adicionar Usuário</strong>
          </CCardHeader>
          <CCardBody>
            {message && (
              <CAlert color={message.includes('sucesso') ? 'success' : 'danger'} dismissible>
                {message}
                <CCloseButton className="float-end" onClick={handleCloseAlert} />
              </CAlert>
            )}
            <CForm>
              <div className="mb-3">
                <CFormInput
                  type="text"
                  id="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormInput
                  type="password"
                  id="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormInput
                  type="text"
                  id="cargo"
                  placeholder="Cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                />
              </div>
              <CButton
                color="primary"
                variant="outline"
                onClick={handleEnviarFormulario}
              >
                <CIcon icon={cilCheck} className="me-2"></CIcon>
                Enviar
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FormControl;

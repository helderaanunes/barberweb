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
import { useParams, useNavigate } from 'react-router-dom';

const FormControl = () => {
  const [formData, setFormData] = useState({ nome: '' });
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCategoria = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/categoria/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Erro ao buscar categoria:', error);
        }
      };

      fetchCategoria();
    }
  }, [id]);

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
      if (id) {
        await axios.put(`http://localhost:8080/categoria/${id}`, formData);
        setMessage('Categoria atualizada com sucesso!');
      } else {
        await axios.post('http://localhost:8080/categoria', formData);
        setMessage('Categoria salva com sucesso!');
      }
      setFormData({ nome: '' });
      setTimeout(() => {
        navigate('/categoria/list');
      }, 2000); // Redireciona após 2 segundos
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setMessage('Erro ao salvar categoria.');
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
            <strong>{id ? 'Editar Categoria' : 'Adicionar Categoria'}</strong>
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
              <CButton
                color="primary"
                variant="outline"
                onClick={handleEnviarFormulario}
              >
                <CIcon icon={cilCheck} className="me-2"></CIcon>
                {id ? 'Atualizar' : 'Enviar'}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FormControl;

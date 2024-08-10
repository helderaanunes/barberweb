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
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    descricao: ''
  });
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      // Caso haja um id, estamos editando um produto
      setIsEditing(true);
      // Buscar os dados do produto para preencher o formulário
      axios.get(`http://localhost:8080/produto/${id}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar dados do produto:', error);
          setMessage('Erro ao carregar os dados do produto.');
        });
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
      if (isEditing) {
        // Editar produto existente
        await axios.put(`http://localhost:8080/produto/${id}`, formData);
        setMessage('Produto editado com sucesso!');
      } else {
        // Adicionar novo produto
        await axios.post('http://localhost:8080/produto', formData);
        setMessage('Produto adicionado com sucesso!');
      }
      setFormData({ nome: '', preco: '', descricao: '' }); // Limpa o formulário
      navigate('/produto/Listar'); // Redirecionar após sucesso para listar produtos
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setMessage('Erro ao salvar produto.');
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
            <strong>{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</strong>
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
                  type="text"
                  id="preco"
                  placeholder="Preço"
                  value={formData.preco}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormInput
                  type="text"
                  id="descricao"
                  placeholder="Descrição"
                  value={formData.descricao}
                  onChange={handleChange}
                />
              </div>
              <CButton
                color="primary"
                variant="outline"
                onClick={handleEnviarFormulario}
              >
                <CIcon icon={cilCheck} className="me-2"></CIcon>
                {isEditing ? 'Salvar Alterações' : 'Enviar'}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FormControl;

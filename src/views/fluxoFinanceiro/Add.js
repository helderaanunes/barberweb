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
  CFormSelect,
  CRow,
  CAlert,
  CCloseButton
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCheck } from '@coreui/icons';
import { useParams, useNavigate } from 'react-router-dom';

const FormControl = () => {
  const [formData, setFormData] = useState({
    id: '',
    descricao: '',
    fluxo: '',
    valor: '',
    situacao: '',
    dataVencimento: '',
    dataPagamento: ''
  });
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/fluxo-financeiro/${id}`);
          setFormData(response.data);
        } catch (error) {
          handleError(error);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const validateForm = () => {
    if (!formData.descricao.trim()) {
      setMessage('O campo Descrição é obrigatório.');
      return false;
    }
    if (!formData.valor || isNaN(formData.valor)) {
      setMessage('O campo Valor deve ser um número válido.');
      return false;
    }
    if (!formData.dataVencimento.trim()) {
      setMessage('O campo Data de Vencimento é obrigatório.');
      return false;
    }
    if (formData.dataPagamento && new Date(formData.dataPagamento) > new Date(formData.dataVencimento)) {
      setMessage('A Data de Pagamento não pode ser após a Data de Vencimento.');
      return false;
    }
    return true;
  };

  const handleError = (error) => {
    console.error('Erro:', error);
    if (error.response) {
      setMessage(`Erro ${error.response.status}: ${error.response.data.message || 'Erro desconhecido'}`);
    } else if (error.request) {
      setMessage('Erro de rede: Nenhuma resposta recebida');
    } else {
      setMessage(`Erro: ${error.message}`);
    }
  };

  const handleEnviarFormulario = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/fluxo-financeiro/${id}`, formData);
        setMessage('Fluxo atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:8080/api/fluxo-financeiro', formData);
        setMessage('Fluxo salvo com sucesso!');
      }
      setFormData({
        id: '',
        descricao: '',
        fluxo: '',
        valor: '',
        situacao: '',
        dataVencimento: '',
        dataPagamento: ''
      });
      setTimeout(() => {
        navigate('/fluxoFinanceiro/list');
      }, 2000); // Redireciona após 2 segundos
    } catch (error) {
      handleError(error);
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
            <strong>{id ? 'Editar Fluxo Financeiro' : 'Adicionar Fluxo Financeiro'}</strong>
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
                  id="descricao"
                  placeholder="Descrição"
                  value={formData.descricao}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormSelect
                  id="fluxo"
                  value={formData.fluxo}
                  onChange={handleChange}
                >
                  <option value="">Escolha o fluxo</option>
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormInput
                  type="number"
                  id="valor"
                  placeholder="Valor"
                  value={formData.valor}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormSelect
                  id="situacao"
                  value={formData.situacao}
                  onChange={handleChange}
                >
                  <option value="">Escolha a situação</option>
                  <option value="pago">Pago</option>
                  <option value="pendente">Pendente</option>
                  <option value="cancelado">Cancelado</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormInput
                  type="date"
                  id="dataVencimento"
                  placeholder="Data de Vencimento"
                  value={formData.dataVencimento}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormInput
                  type="date"
                  id="dataPagamento"
                  placeholder="Data de Pagamento"
                  value={formData.dataPagamento}
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

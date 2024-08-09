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
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ServicoAdd = () => {
  const location = useLocation(); // Hook para acessar o estado passado
  const navigate = useNavigate(); // Hook de navegação
  const service = location.state?.service; // Obtém o serviço do estado passado

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
  });

  useEffect(() => {
    if (service) {
      // Se houver um serviço, preenche o formulário com os dados desse serviço
      setFormData({
        nome: service.nome,
        descricao: service.descricao,
        preco: service.preco,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = JSON.stringify(formData);

    try {
      const method = service ? 'PUT' : 'POST'; // Define o método HTTP com base na existência do serviço
      const url = service
        ? `http://localhost:8080/servico/${service.id}`
        : 'http://localhost:8080/servico';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: formBody,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Erro ao salvar o serviço.');
      }

      alert('Serviço salvo com sucesso!');
      navigate('/Servico/list'); // Redireciona para a lista de serviços após salvar
    } catch (error) {
      console.error('Erro:', error);
      alert(`Erro ao salvar o serviço: ${error.message}`);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{service ? 'Editar' : 'Adicionar'} Serviço</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome do Serviço</CFormLabel>
                <CFormInput
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite o nome do serviço"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="descricao">Descrição</CFormLabel>
                <CFormTextarea
                  id="descricao"
                  name="descricao"
                  rows={3}
                  placeholder="Digite a descrição do serviço"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="preco">Preço</CFormLabel>
                <CFormInput
                  type="number"
                  id="preco"
                  name="preco"
                  placeholder="Digite o preço do serviço"
                  value={formData.preco}
                  onChange={handleChange}
                  required
                />
              </div>
              <CButton type="submit" color="primary">
                {service ? 'Salvar Alterações' : 'Adicionar Serviço'}
              </CButton>
              <CButton
                color="secondary"
                onClick={() => navigate('/Servico/list')}
                className="ms-2"
              >
                Cancelar
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ServicoAdd;

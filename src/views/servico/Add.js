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
import React, { useState } from 'react';

const FormControl = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = Object.keys(formData)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
      .join('&');

    try {
      const response = await fetch('http://localhost:3000/servico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Erro ao cadastrar o serviço.');
      }

      alert('Serviço cadastrado com sucesso!');
      setFormData({
        nome: '',
        descricao: '',
        preco: '',
      });
    } catch (error) {
      console.error('Erro:', error);
      alert(`Erro ao cadastrar o serviço: ${error.message}`);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Serviço</strong>
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
                  type="text"
                  id="preco"
                  name="preco"
                  placeholder="Digite o preço do serviço"
                  value={formData.preco}
                  onChange={handleChange}
                  required
                />
              </div>
              <CButton type="submit" color="primary">
                Salvar
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FormControl;

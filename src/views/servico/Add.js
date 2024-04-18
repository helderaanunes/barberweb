import React from 'react'
import axios from 'axios'

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
} from '@coreui/react'

const AddServico = () => {
  const handlerEnviarFormulario = () => {
    axios.post('https//:localhost:8080/servico', {})
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Adicionar Serviço</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome</CFormLabel>
                <CFormInput type="string" id="nome" placeholder="Nome" />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="tempo">Tempo</CFormLabel>
                <CFormInput type="time" id="tempo" placeholder="Tempo" />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="float">Preço</CFormLabel>
                <CFormInput type="int" id="preco" placeholder="Preco" />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="string">Categoria</CFormLabel>
                <CFormInput type="string" id="Categoria" placeholder="Categoria" />
              </div>

              <CButton color="success">Adicionar</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddServico

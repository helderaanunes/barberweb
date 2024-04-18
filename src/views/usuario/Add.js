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
import { DocsExample } from 'src/components'
import CIcon from '@coreui/icons-react'

const AddUsuario = () => {
  const handlerEnviarFormulario = () => {
    axios
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastrar Usuário</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome</CFormLabel>
                <CFormInput type="text" id="nome" placeholder="Digite seu nome" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="email">E-mail</CFormLabel>
                <CFormInput type="email" id="email" placeholder="seuEmail@exemplo.com" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="senha">Senha</CFormLabel>
                <CFormInput type="password" id="senha" placeholder="Digite sua senha" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="cargo">Cargo</CFormLabel>
                <CFormInput type="text" id="cargo" placeholder="Digite seu cargo" />
              </div>
              <CButton color="success" onClick={handlerEnviarFormulario}>
                Cadastrar
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddUsuario

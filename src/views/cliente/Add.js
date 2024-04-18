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
} from '@coreui/react'
import axios from 'axios'
import React from 'react'

const FormControl = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastrar cliente</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="Nome Completo">Nome completo</CFormLabel>
                <CFormInput type="text" id="Nome Completo" placeholder="Nome Completo" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Email">E-mail</CFormLabel>
                <CFormInput type="text" id="Email" placeholder="Email" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Senha">Senha</CFormLabel>
                <CFormInput type="password" id="Senha" placeholder="Senha" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Cargo">Cargo</CFormLabel>
                <CFormInput type="text" id="Cargo" placeholder="Cargo" />
              </div>

            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl

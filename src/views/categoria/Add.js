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
import { cilCheck } from '@coreui/icons'

const FormControl = () => {
  const handlerEnviarFormulario = () => {
    axios.post('http://localhost:8080/categoria', {
      nome: 'Eletro',
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Adicionar Categoria</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="nome">Nome</CFormLabel>
                <CFormInput type="text" id="nome" placeholder="Nome" />
              </div>
              <CButton color="primary" variant="outline" onClick={handlerEnviarFormulario}>
                <CIcon icon={cilCheck} className="me-2"></CIcon>
                Enivar
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl

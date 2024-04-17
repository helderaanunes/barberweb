import React from 'react'
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

const FormControl = () => {
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
                <CFormInput
                  type="text"
                  id="nome"
                  placeholder="Nome"
                />
              </div>

            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
  )
}

export default FormControl

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

const AddUsuario = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Adicionar Usuário</strong>
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
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Example textarea</CFormLabel>
                  <CFormTextarea id="exampleFormControlTextarea1" rows={3}></CFormTextarea>
                </div>
              </CForm>
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
  )
}

export default AddUsuario

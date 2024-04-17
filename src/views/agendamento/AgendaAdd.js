import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow
} from '@coreui/react'
import React from 'react'

const FormControl = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Agendar</strong>
          </CCardHeader>
          <CCardBody>
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="Nome Completo">Email address</CFormLabel>
                  <CFormInput
                    type="text"
                    id="Nome Completo"
                    placeholder="Nome Completo"
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

export default FormControl

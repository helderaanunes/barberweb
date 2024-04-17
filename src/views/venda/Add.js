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
            <strong>Cadastrar Venda</strong>
          </CCardHeader>
          <CCardBody>
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="Desconto">Desconto</CFormLabel>
                  <CFormInput
                    type="namber"
                    id="desconto"
                    placeholder="Desconto"
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

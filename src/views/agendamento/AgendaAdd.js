import { cilCheck } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import React from 'react'

const FormControl = () => {
  const handlerEnviarFormulario = () => {
    axios.post('localhost:8080', {})
  };

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
                <CFormLabel htmlFor="data">Data</CFormLabel>
                <CFormInput type="date" id="data" placeholder="data" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="hora">Horario</CFormLabel>
                <CFormInput type="time" id="hora" placeholder="hora" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="taxa">Taxa para agendamento</CFormLabel>
                <CFormInput type="number" id="taxa" placeholder="taxa" />
              </div>
              <div>
                <CButton color="success" onClick={salvar}>
                  <CIcon icon={cilCheck} className="me-2" />
                  Salvar
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl

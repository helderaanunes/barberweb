import { cilCheck } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from "axios";

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
import React from 'react'

const FormControl = () => {
  const handlerEnviarFormulario = () =>{
    axios.post('http://localhost:8080/categoria', {'nome':'Forno'})
    .then(response => {console.log('Response:', response.data);
    })
    .catch(error => {console.error('Error:', error);
    });
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
                <CFormInput type="date" id="data" placeholder="Data" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="hora">Hora</CFormLabel>
                <CFormInput type="time" id="hora" placeholder="Hora" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="taxa">Taxa para agendamento</CFormLabel>
                <CFormInput type="number" id="taxa" placeholder="taxa" />
              </div>
              <div className="mb-3">
                <CButton color="success" onClick={handlerEnviarFormulario}>
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

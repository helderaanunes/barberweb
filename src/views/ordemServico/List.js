import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'

const ListarServicos = () => {
  const [servicos, setServicos] = useState([])

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ordens_servico')
        setServicos(response.data)
      } catch (error) {
        console.error('Erro ao buscar serviços:', error)
      }
    }

    fetchServicos()
  }, [])

  const formatarData = (data) => {
    const dataFormatada = new Date(data)
    const diaSemana = dataFormatada.toLocaleDateString('pt-BR', { weekday: 'long' })
    const dia = String(dataFormatada.getDate()).padStart(2, '0')
    const mes = String(dataFormatada.getMonth() + 1).padStart(2, '0')
    const ano = dataFormatada.getFullYear()
    return `${diaSemana}, ${dia}/${mes}/${ano}`
  }

  const formatarHora = (hora) => {
    const horaFormatada = new Date(hora)
    const horas = String(horaFormatada.getHours()).padStart(2, '0')
    const minutos = String(horaFormatada.getMinutes()).padStart(2, '0')
    return `${horas}:${minutos}`
  }

  const formatarDesconto = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Listar Serviços</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome do Barbeiro</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Data</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Hora</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Desconto</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Agendamento</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {servicos.map((servico, index) => (
                  <CTableRow key={servico.id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{servico.nomeUsuario}</CTableDataCell>
                    <CTableDataCell>{formatarData(servico.data)}</CTableDataCell>
                    <CTableDataCell>{formatarHora(servico.hora)}</CTableDataCell>
                    <CTableDataCell>{formatarDesconto(servico.desconto)}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/agendamento/${servico.agendamentoId}`}>
                        Ver detalhes
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListarServicos

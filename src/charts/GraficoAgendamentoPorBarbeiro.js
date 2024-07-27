import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import axios from 'axios'

const Charts = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        backgroundColor: [],
        data: [],
      },
    ],
  })

  useEffect(() => {
    // Substitua a URL pela URL real da sua API
    axios.get('http://localhost:8080/GraficoAgendamentoPorBarbeiro')
      .then((response) => {
        const { data } = response

        // Transforme os dados recebidos no formato esperado
        const labels = data.map(item => item.nomeServico)
        const dataValues = data.map(item => item.quantidadeAgendamentos)
        const backgroundColors = data.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`) // Gera cores aleatórias

        setChartData({
          labels,
          datasets: [
            {
              backgroundColor: backgroundColors,
              data: dataValues,
            },
          ],
        })
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error)
      })
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Doughnut Chart</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={chartData}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts

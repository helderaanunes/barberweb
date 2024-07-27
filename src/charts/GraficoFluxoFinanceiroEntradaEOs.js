import { CCard, CCardBody, CCardHeader, CCol } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Charts = () => {
  const [Data, setData] = useState({ labels: [], datasets: [] })

  useEffect(() => {
    axios.get('/api/GraficoRendaDoPorVendaEPorOS')
      .then(response => {
        const data = response.data
        const labels = data.map(item => item.descricao)
        const lucroPorVendas = data.map(item => item.lucroPorVendas)
        const lucroPorOS = data.map(item => item.lucroPorOS)

        setChartData({
          labels,
          datasets: [
            {
              label: 'Lucro por Vendas',
              backgroundColor: '#f87979',
              data: lucroPorVendas,
            },
            {
              label: 'Lucro por OS',
              backgroundColor: '#7FB3D5',
              data: lucroPorOS,
            },
          ],
        })
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error)
      })
  }, [])

  return (
    <CCol xs={6}>
      <CCard className="mb-4">
        <CCardHeader>Apurado por mês</CCardHeader>
        <CCardBody>
          <CChartBar
            data={chartData}
            labels="descrição"
          />
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default GraficoFluxoFinanceiroEntradaEOs

import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCol, CCardHeader } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';
import axios from 'axios';

const Charts = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http:localhost:8080/GraficoServicoMaisAgendado');
        const data = response.data;

        const labels = data.map(item => item.nomeServico);
        const dataPoints = data.map(item => item.quantidadeAgendamentos);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Quantidade de Agendamentos',
              backgroundColor: '#f87979',
              data: dataPoints,
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CCol xs={6}>
      <CCard className="mb-4">
        <CCardHeader>Serviço mais agendado</CCardHeader>
        <CCardBody>
          <CChartBar
            data={chartData}
            labels="Serviços"
          />
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default GraficoServicoMaisAgendado;

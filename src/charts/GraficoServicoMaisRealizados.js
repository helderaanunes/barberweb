import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCol, CCardHeader } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';

const GraficoServicoMaisRealizados = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Serviço Mais Realizado',
        backgroundColor: '#f87979',
        data: [],
      },
    ],
  });

  useEffect(() => {
    // Função para buscar dados da API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/GraficoServicoMaisRealizados');
        const servicos = response.data;

        // Mapeia os dados da resposta para o formato necessário
        const labels = servicos.map(servico => servico.nomeServico);
        const dataValues = servicos.map(servico => servico.quantidadeRealizacoes);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Serviço Mais Realizado',
              backgroundColor: '#f87979',
              data: dataValues,
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>Serviço Mais Realizado</CCardHeader>
        <CCardBody>
          <CChartBar
            data={data}
            labels="labels"
          />
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default GraficoServicoMaisRealizados;

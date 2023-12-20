import { Card, Grid } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import TableStyle from '../../components/table'

const DashboardView = () => {
  return (
    <Grid container spacing={3}>
      <Grid item md={7} xs={12}>
        <Card sx={{ p: { md: 5 } }}>
          <ReactApexChart
            options={{
              chart: {
                height: 350,
                type: 'area'
              },
              dataLabels: {
                enabled: true
              },
              stroke: {
                curve: 'smooth'
              },
              xaxis: {
                type: 'datetime',
                categories: [
                  '2018-09-19T00:00:00.000Z',
                  '2018-09-19T01:30:00.000Z',
                  '2018-09-19T02:30:00.000Z',
                  '2018-09-19T03:30:00.000Z',
                  '2018-09-19T04:30:00.000Z',
                  '2018-09-19T05:30:00.000Z',
                  '2018-09-19T06:30:00.000Z'
                ]
              },
              tooltip: {
                x: {
                  format: 'dd/MM/yy HH:mm'
                }
              }
            }}
            series={[
              {
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
              },
              {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41]
              }
            ]}
            type='area'
            height={350}
          />
        </Card>
      </Grid>
      <Grid item md={5} xs={12}>
        <Card sx={{ p: 5 }}>
          <div id='chart'>
            <ReactApexChart
              options={{
                chart: {
                  width: 380,
                  type: 'pie'
                },
                labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 230
                      },
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }
                ]
              }}
              series={[44, 55, 13, 43, 22]}
              type='pie'
              width={380}
            />
          </div>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <TableStyle />
      </Grid>
    </Grid>
  )
}

export default DashboardView

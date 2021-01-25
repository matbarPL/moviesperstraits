import Chart from "../../utils/chart";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import {HorizontalBar} from "react-chartjs-2";

class BarChartHorizontal extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.state = {
      data : { 
          labels: this.props.labels,
          datasets: [
          {
            label: '# of ratings',
            data: this.props.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderWidth: 1,
          },
          ],
      },
      options : {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }
    }
  }

  onChange(event){
    this.chart.destroy();
    this.setState(
      {value: event.target.value}
  )}
  
  render() {
    return (
      <Col lg="6">
        <Card className="card-chart">
          <CardHeader>
            <h5 className="card-category">Rating distribution</h5>
            <CardTitle tag="h3">
              <i className="tim-icons icon-delivery-fast text-primary" />{" "}
              {this.props.title}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <HorizontalBar
                data={this.state.data}
                options={this.state.options}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default BarChartHorizontal;

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
import {Bar} from "react-chartjs-2";

class Histogram extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.state = {
      data : {
        labels: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7"],
        datasets: [
          {
            label: "Count",
            fill: true,
            backgroundColor: "rgba(72,72,176,0.1)",
            hoverBackgroundColor: "rgba(72,72,176,0.1)",
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: this.props.data,
          },
        ],
      }, 
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e",
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
      <Col lg="2.5">
        <Card className="card-chart">
          <CardHeader>
            <h5 className="card-category">Personality Traits</h5>
            <CardTitle tag="h3">
              <i className="tim-icons icon-delivery-fast text-primary" />{" "}
              {this.props.title}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Bar
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

export default Histogram;

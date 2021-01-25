import Chart from "../../utils/chart";

import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "reactstrap";
import { Radar} from "react-chartjs-2";

class PersonalityTraits extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.state = {
      data : {
        labels: ['Openness', 'Agreeableness', 'Emotional stability', 'Conscientiousness', 'Extraversion'],
        datasets: [
          {
            label: 'Population',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: this.props.aggregatedData
          },
          {
            label: 'Myself',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: this.props.myselfData
          }
        ]
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
      <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h3">
              <i className="tim-icons icon-delivery-fast text-primary" />{" "}
              Personality traits radar chart
            </CardTitle>
          </CardHeader>
          <CardBody>
          <Radar data={this.state.data} />
          </CardBody>
      </Card>
    );
  }
}

export default PersonalityTraits;

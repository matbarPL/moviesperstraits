import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Table
} from "reactstrap";

class Tables extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log(this.props.data);
    return (
        <Col lg="6" md="15">
            <Card>
            <CardHeader>
                <CardTitle tag="h4">Personality traits summary</CardTitle>
            </CardHeader>
            <CardBody>
                <Table className="tablesorter" responsive>
                <thead className="text-primary">
                    <tr>
                    <th>Name</th>
                    <th>Mean</th>
                    <th>Variance</th>
                    <th>Median</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map(traitItem => (
                        <tr>
                            <td>{traitItem.name}</td>
                            <td>{traitItem.mean}</td>
                            <td>{traitItem.variance}</td>
                            <td>{traitItem.median}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </CardBody>
            </Card>
        </Col>
    );
  }
}

export default Tables;

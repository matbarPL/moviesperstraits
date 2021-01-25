/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Redirect } from "react-router-dom";
import PersonalityTraits from "../components/Dashboard/PersonalityTraits";
import Ratings from "../components/Dashboard/Ratings";
import Histogram from "../components/Dashboard/Histogram";
import Tables from "../components/Dashboard/Tables";
import BarChartHorizontal from "../components/Dashboard/BarChartHorizontal";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Admin from "../layouts/Admin/Admin";
import { Navbar, Container } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import * as movieAnimation from "../components/Loading/loading.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
// reactstrap components
import {
  Row,
  Col
} from "reactstrap";

import axios from 'axios'

class Dashboard extends React.Component{
  constructor(props){
    super(props);  
    this.state = {
      loading:true
    }
  }

  async componentDidMount(){
    await axios.get('http://127.0.0.1:5000/api/personality/aggregated').then(response =>
      this.setState({
        aggregatedData: response.data.user_traits,
    }))
    await axios.get('http://127.0.0.1:5000/api/personality/' + localStorage.email).then(response =>
      this.setState({
        myselfData: response.data.user_traits
    }))
    await axios.get('http://127.0.0.1:5000/api/ratings/count').then(response =>
      this.setState({
        ratingsCount: response.data.ratings_count
    }))
    await axios.get('http://127.0.0.1:5000/api/personality/histogram/openness').then(response =>
      this.setState({
        openessData: response.data.histogram_data,
    }))
    await axios.get('http://127.0.0.1:5000/api/personality/histogram/agreeableness').then(response =>
      this.setState({
        agreeablenessData: response.data.histogram_data
    }))
    await axios.get('http://127.0.0.1:5000/api/personality/histogram/emotional_stability').then(response =>
      this.setState({
        emotionalStabilityData: response.data.histogram_data
    }))
    await axios.get('http://127.0.0.1:5000/api/personality/histogram/conscientiousness').then(response =>
      this.setState({
        conscientiousnessData: response.data.histogram_data
    }))
    await axios.get('http://127.0.0.1:5000/api/personality/histogram/extraversion').then(response =>
      this.setState({
        extraversionData: response.data.histogram_data
    }))
    await axios.get('http://127.0.0.1:5000/api/ratings/highest_extraversion').then(response =>
      this.setState({
        highestExtraversionLabels: response.data.highest_extraversion_labels,
        highestExtraversionData: response.data.highest_extraversion_ratings
    }))
    await axios.get('http://127.0.0.1:5000/api/ratings/highest_extraversion_and_serendiptous_ratings').then(response =>
      this.setState({
        highestExtraversionAndSerendiptousLabels: response.data.highest_extraversion_and_serendiptous_labels,
        highestExtraversionAndSerendiptousData: response.data.highest_extraversion_and_serendiptous_ratings
    }))
    await axios.get('http://127.0.0.1:5000/api/personality/metrics').then(response =>
      this.setState({
        metrics: response.data,
        loading:false
    }))
  }

  render(){
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: movieAnimation.default,
      rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
      }
    }
    if(localStorage.usertoken){
      if (this.state.loading){
        return (
        <>
          <div>
          <FadeIn>
            <div class="d-flex justify-content-center align-items-center">
              <h1>Fetching ratings</h1>
                <Lottie options={defaultOptions} height={800} width={800}/>
            </div>
          </FadeIn>
          </div>
        </>
        );
      } else {
          return (
          <>
            <Navbar expand="lg" color="primary" light>
              <Container>
                <AdminNavbar/>
              </Container>
            </Navbar>
            <div className="content">
              <Row>
                <Col xs="12">
                  <Ratings ratingsCount={this.state.ratingsCount}></Ratings>
                </Col>
              </Row>
              <Row>
                <Histogram data={this.state.openessData} title="Openess"></Histogram>
                <Histogram data={this.state.agreeablenessData} title="Agreeableness"></Histogram>
                <Histogram data={this.state.emotionalStabilityData} title="Emotional stability"></Histogram>
                <Histogram data={this.state.conscientiousnessData} title="Conscientiousness"></Histogram>
                <Histogram data={this.state.extraversionData} title="Extraversion"></Histogram>
              </Row>
              <Row>
              <Col lg="6" md="12">
              <PersonalityTraits aggregatedData = {this.state.aggregatedData} myselfData = {this.state.myselfData} ></PersonalityTraits>
              </Col>
              <Tables data = {this.state.metrics}></Tables>
              </Row>
              <Row>
                <BarChartHorizontal data = {this.state.highestExtraversionData} labels = {this.state.highestExtraversionLabels} title="Highest extraversion"></BarChartHorizontal>
                <BarChartHorizontal data = {this.state.highestExtraversionAndSerendiptousData} labels = {this.state.highestExtraversionAndSerendiptousLabels} title="Highest extraversion and serendipitous movies only"></BarChartHorizontal>
              </Row>
            </div>
          </>
          );
        }
      }
      else{
        return <Redirect to='/sign-in' />;
      }
  }
}

export default Dashboard;

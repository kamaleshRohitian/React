import axios from "axios";
import react, { useState, Component, useRef } from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CSVLink } from "react-csv";
import MenuBar from "./MenuBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Homestyles.css";
import {
  Button,
  // Input,
  InputLabel,
  MenuItem,
  //TextField,
  Card,
  //CardActions,
  CardContent,
  //CardHeader,
  //CardHeader,
  //Grid,
  //Paper,
  // AppBar,
  //Typography,
  Select,
  //Toolbar,
  //Link,
  //FormControl
} from "@material-ui/core";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const pdfConverter = require("jspdf");
const username = window.sessionStorage.getItem("username");
const authority = window.sessionStorage.getItem("authority");
let dataline = [];
let dataArray = [];
let COLORS = [];
let StockDetails = [];
export class Home extends Component {
  constructor(props) {
    super(props);
    this.fetchStock = this.fetchStock.bind(this);
    this.state = {
      datas: [],
      option: "chart",
      stockchart: [],
      company: "CTSH",
    };
  }

  componentDidMount() {
    this.fetchStock();
    this.getdata();
  }

  componentDidUpdate() {
    this.getdata();
  }

  fetchStock() {
    let pointer = this;
    pointer.state.stockchart = "";
    dataline = [];
    StockDetails = [];
    const api_key = "IYNVJQ3GLXORCG9A";
    const stocksymbol = this.state.company;
    const api_call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stocksymbol}&interval=5min&outputsize=full&apikey=${api_key}`;
    fetch(api_call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("data:", data);
        for (var key in data["Time Series (5min)"]) {
          dataline.push({
            date: key,
            price: data["Time Series (5min)"][key]["4. close"],
          });
        }
        for (var key in data["Time Series (5min)"]) {
          StockDetails.push({
            Symbol: data["Meta Data"]["2. Symbol"],
            date: key,
            open: data["Time Series (5min)"][key]["1. open"],
            high: data["Time Series (5min)"][key]["2. high"],
            low: data["Time Series (5min)"][key]["3. low"],
            close: data["Time Series (5min)"][key]["4. close"],
            volume: data["Time Series (5min)"][key]["5. volume"],
          });
        }
        pointer.setState({
          stockchart: StockDetails,
        });
      });
    this.forceUpdate();
  }
  getdata() {
    COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
    dataArray = [];
    axios.get("http://localhost:8091/logindetails/" + username).then((data) => {
      for (const dataObj of data.data) {
        dataArray.push({ name: dataObj.username, value: dataObj.count });
      }
      this.setState({
        datas: data.data,
      });
    });
  }
  div2PDF = (e) => {
    const but = e.target;
    but.style.display = "none";
    let input = document.getElementById("container");

    html2canvas(input).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      pdf.addImage(img, "JPEG", 30, 40, 400, 200);
      pdf.setFontSize(40);
      pdf.setFont("courier");
      pdf.setFontSize(10);
      pdf.setTextColor(255, 0, 0);
      pdf.text(
        10,
        10,
        "Name: " +
          username +
          " Role: " +
          authority +
          " Date: " +
          new Date().getDate() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear()
      );
      let company = "";
      if (this.state.company === "CTSH") {
        company = "Cognizant Technology Solutions India Pvt Ltd";
      } else if (this.state.company === "AMZN") {
        company = "Amazon";
      } else if (this.state.company === "MSFT") {
        company = "Microsoft";
      } else if (this.state.company === "IBM") {
        company = "IBM";
      }
      pdf.text(30, 30, company);
      let date =
        new Date().getDate().toString() +
        "_" +
        new Date().getMonth().toString() +
        "_" +
        new Date().getFullYear().toString();
      let time = new Date().getTime();
      pdf.save(`chart_${date}_${time}.pdf`);
      but.style.display = "block";
    });
  };
  handleChange = (event) => {
    this.setState({
      option: event.target.value,
    });
  };
  handleChange2 = (event) => {
    this.setState({
      company: event.target.value,
    });
  };
  submit() {
    this.fetchStock();
  }
  render() {
    if (username == null) {
      alert("please signin to access this page!..");
      window.location = "/";
      return;
    }
    if (this.state.option === "pie") {
      return (
        <div id="home" className="Home">
          <Container>
            <Row id="button">
              <Col xs="auto">
                <CSVLink
                  filename="PieChart.csv"
                  data={this.state.datas}
                  target="_blank"
                >
                  <Button variant="contained" color="primary">
                    Download as CSV
                  </Button>
                </CSVLink>
              </Col>
              <Col xs="auto">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => this.div2PDF(e)}
                >
                  Download as PDF
                </Button>
              </Col>
              <Col>
                <InputLabel>Select the chart type</InputLabel>
                <Select value={this.state.option} onChange={this.handleChange}>
                  <MenuItem value="chart">Choose-chart</MenuItem>
                  <MenuItem value="pie">Pie-chart</MenuItem>
                  <MenuItem value="bar">Bar-chart</MenuItem>
                  <MenuItem value="sensex">Sensex</MenuItem>
                </Select>
              </Col>
            </Row>
          </Container>
          <Container id="container" className="container">
            <Row>
              <Col xs="auto">
                <Card id="pie" className="pie">
                  <CardContent>
                    <h3>Login Details in Pie chart</h3>
                    <PieChart width={300} height={300}>
                      <Pie
                        data={dataArray}
                        nameKey="name"
                        color="#000000"
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {dataArray.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend
                        payload={dataArray.map((item, index) => ({
                          id: item.name,
                          type: "square",
                          value: item.name + "-" + item.value,
                          color: COLORS[index % COLORS.length],
                        }))}
                      />
                      <Tooltip />
                    </PieChart>
                  </CardContent>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    if (this.state.option === "bar") {
      return (
        <div id="home" className="Home">
          <Container>
            <Row id="button">
              <Col xs="auto">
                <CSVLink
                  filename="BarChart.csv"
                  data={this.state.datas}
                  target="_blank"
                >
                  <Button variant="contained" color="primary">
                    Download as CSV
                  </Button>
                </CSVLink>
              </Col>
              <Col xs="auto">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => this.div2PDF(e)}
                >
                  Download as PDF
                </Button>
              </Col>
              <Col>
                <InputLabel>Select the chart type</InputLabel>
                <Select value={this.state.option} onChange={this.handleChange}>
                  <MenuItem value="chart">Choose-chart</MenuItem>
                  <MenuItem value="pie">Pie-chart</MenuItem>
                  <MenuItem value="bar">Bar-chart</MenuItem>
                  <MenuItem value="sensex">Sensex</MenuItem>
                </Select>
              </Col>
            </Row>
          </Container>
          <Container id="container" className="container">
            <Row>
              <Col xs="auto">
                <Card id="bar">
                  <CardContent>
                    <h3>Login Details in Bar chart</h3>
                    <BarChart
                      width={300}
                      height={300}
                      data={dataArray}
                      margin={{
                        top: 100,
                      }}
                      barSize={30}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />

                      <CartesianGrid />
                      <Bar dataKey="value">
                        {dataArray.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                      <Legend
                        payload={dataArray.map((item, index) => ({
                          id: item.name,
                          type: "square",
                          value: item.name + "-" + item.value,
                          color: COLORS[index % COLORS.length],
                        }))}
                      />
                    </BarChart>
                  </CardContent>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    if (this.state.option === "sensex") {
      return (
        <div id="home" className="Home">
          <Container>
            <Row id="button">
              <Col xs="auto">
                <CSVLink
                  filename="StockDetails.csv"
                  data={this.state.stockchart}
                  target="_blank"
                >
                  <Button variant="contained" color="primary">
                    Download as CSV
                  </Button>
                </CSVLink>
              </Col>
              <Col xs="auto">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => this.div2PDF(e)}
                >
                  Download as PDF
                </Button>
              </Col>
              <Col xs="auto">
                <InputLabel>Select the chart type</InputLabel>
                <Select value={this.state.option} onChange={this.handleChange}>
                  <MenuItem value="chart">Choose-chart</MenuItem>
                  <MenuItem value="pie">Pie-chart</MenuItem>
                  <MenuItem value="bar">Bar-chart</MenuItem>
                  <MenuItem value="sensex">Sensex</MenuItem>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col xs="auto">
                <InputLabel>Select the company</InputLabel>
                <Select
                  value={this.state.company}
                  onChange={this.handleChange2}
                >
                  <MenuItem value="CTSH">Cognizant</MenuItem>
                  <MenuItem value="AMZN">Amazon</MenuItem>
                  <MenuItem value="MSFT">Microsoft</MenuItem>
                  <MenuItem value="IBM">IBM</MenuItem>
                </Select>
              </Col>
              <Col xs="auto">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.submit()}
                >
                  Get data
                </Button>
              </Col>
            </Row>
          </Container>
          <Container id="container" className="container">
            {this.state.stockchart !== "" ? (
              <Row>
                <Col>
                  <AreaChart
                    width={1000}
                    height={400}
                    data={dataline}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#8884d8"
                      fill="#00C49F"
                    />
                  </AreaChart>
                </Col>
              </Row>
            ) : (
              <h1>Data is loading</h1>
            )}
          </Container>
        </div>
      );
    }

    return (
      <div id="home" className="Home">
        <Container>
          <Row id="button">
            <Col>
              <InputLabel>Select the chart type</InputLabel>
              <Select value={this.state.option} onChange={this.handleChange}>
                <MenuItem value="chart">Choose-chart</MenuItem>
                <MenuItem value="pie">Pie-chart</MenuItem>
                <MenuItem value="bar">Bar-chart</MenuItem>
                <MenuItem value="sensex">Sensex</MenuItem>
              </Select>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <h1>Welcome to Home Page!..</h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Home;

//import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuBar from './MenuBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const useStyles = makeStyles({
  tab: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "blue",
      
    },
  },
  link:{
    width:"100%",
    position:"fixed"
  }
});
function UserNavigation() {
  const classes = useStyles();
  const username = "Hello " + window.sessionStorage.getItem("username");
  function logoutHandler() {
    window.sessionStorage.removeItem("username");
    window.location = "/";
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
          <AppBar className={classes.link} position="static">
        <Tabs aria-label="simple tabs example">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Tab className={classes.tab} label={username} />
          </Button>
        </Tabs>
      </AppBar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
          </Col>
          
        </Row>
        <Row>
          <Col>
          <MenuBar />
          </Col>
        </Row>
      </Container>
      

    </div>
  );
}

export default UserNavigation;

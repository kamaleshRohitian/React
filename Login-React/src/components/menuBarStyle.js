import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
import { Col } from 'react-bootstrap';
const useStyles = makeStyles(theme => ({
  root: {
    justifyContent : "left",
    
  },
  drawer : {
     marginTop:"60px",
     marginLeft:"10px",
    //paddingTop : "20px",
    width: "150px",
    height:"100%",
    //backgroundColor:"",
     
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  btnRoot : {
    paddingLeft : "25px",
    justifyContent : "left !important"
  },
  subMenu : {
    paddingLeft : "50px !important",
  }
}));
export default useStyles;
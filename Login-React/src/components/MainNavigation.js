import { Link } from 'react-router-dom';
//import Typography from '@material-ui/core/Typography';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    tab:{
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            backgroundColor:'white',
            color:'blue'
         }
    }
});
function MainNavigation() {
const classes = useStyles();
  return (
    <AppBar className={classes.link} position="static">
      <Tabs   aria-label="simple tabs example">
      <Link   to="/"><Tab className={classes.tab} label="Login"/></Link>
      <Link   to="/signup"><Tab className={classes.tab} label="Signup"/></Link>
      
      </Tabs>
    </AppBar>
  );
}

export default MainNavigation;

import './fonts/fonts.css';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import InsuranceView from './InsuranceView';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

// Styles
const styles = theme => ({
  app: {
      textAlign: "left",
      fontFamily: "profilFont",
      margin: "50px"
  }
});


function App(props) {
  return (
    <div className={props.classes.app}>
      <InsuranceView />
    </div>

  );
}

export default withStyles(styles)(App);

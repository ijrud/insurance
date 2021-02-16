import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography } from '@material-ui/core';
import  { red, grey } from '@material-ui/core/colors';

// Styles
const styles = theme => ({
    inputField: {
        height: theme.spacing(3)
    },
    helpText: {
        fontSize:12,
        color: grey[700],
        height: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    error: {
        color: red[300],
    }
});


class InputField extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: false,
        };
      }
    
    onValueChanged(value) {
        const {onValueChanged, validInput, regExp} = this.props;
        if(validInput) {
            if (!validInput.test(value)) {
                return;
            }
        }

        if (regExp) {
            console.log(value)
            let error = !regExp.test(value) && value.length !== 0;
            this.setState({error: error});
        }

        onValueChanged(value);
    }

    render(){
        const { classes, helpText, label, placeholder, value, errorText } = this.props;
        const { error } = this.state;

        return(
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <label >{label}</label>
                </Grid>
                <Grid item>
                    <input 
                        className={classes.inputField}
                        type="text"
                        value={value}
                        placeholder={placeholder ? placeholder : ""}
                        onChange={(e)=>this.onValueChanged(e.target.value)}
                    />
                    <Typography className={classes.helpText + (error ? ' ' + classes.error: '')}>{error && errorText ? errorText : helpText ? helpText : " "}</Typography>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(InputField)
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography } from '@material-ui/core';
import  { red, grey } from '@material-ui/core/colors';

// Styles
const styles = theme => ({
    selectField: {
        height: theme.spacing(4),
        width: 170
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


class SelectField extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: false,
        };
      }

      render() {
        const { classes, helpText, label, placeholder, value, errorText, options, onValueChanged, disabled} = this.props;
        const { error } = this.state;


        return(
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <label >{label}</label>
                </Grid>
                <Grid item>
                    <select 
                        disabled={disabled}
                        value={this.state.value}
                        onChange={(e)=>onValueChanged(e.target.value)}
                        className={classes.selectField}
                    >
                        {options.map((val)=>
                            <option className={classes.selectField} key={val} value={val}>{val}</option>
                        )}
                    </select>
                    <Typography className={classes.helpText + (error ? ' ' + classes.error: '')}>{error && errorText ? errorText : helpText ? helpText : " "}</Typography>
                </Grid>
            </Grid>
        );
      }
}

export default withStyles(styles)(SelectField)
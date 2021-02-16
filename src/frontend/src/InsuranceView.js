import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Chip, Typography } from '@material-ui/core';
import InputField from './InputField';
import SelectField from './SelectField';



// Styles
const styles = theme => ({
    buyButton: {
        color: "#ffffff",
        backgroundColor: "#000000",
        borderRadius: 40,
        textTransform: 'none',
        "&:hover": {
            backgroundColor: '#03C04A'
        },
        "&:disabled": {
            backgroundColor: '#AAAAAA'
        }
    },
    cancelButton: {
        borderRadius: 40,
        textTransform: 'none',
    }
});

const intRegExp = /^\d*$/
const emailRegExp = /\S+@\S+\.\S+/
const personalNumberRegExp = /^\d{11}$/

class InsuranceView extends Component { 

    constructor(props) {
        super(props);
        this.state = {
          registrationNumber: "",
          bonus: "Bonus A",
          personalNumber: "",
          firstName: "",
          lastName: "",
          email: "",
        };
      }

    areFieldsValid() {
        const {registrationNumber, bonus, personalNumber, email, firstName, lastName} = this.state;
        let errorTextList = [];
        if (registrationNumber.length < 0) {
            return false;
        }
        if (bonus.length < 0) {
            return false;
        }
        if (!personalNumberRegExp.test(personalNumber)) {
            return false;
        }
        if (firstName.length < 0) {
            return false;
        }
        if (lastName.length < 0) {
            return false;
        }
        if(!emailRegExp.test(email)) {
            return false;
        }

        return true;
    }

    onBuyClicked() {
        
    }

    onCancelClicked() {
        this.setState({
            registrationNumber: "",
            bonus: "",
            personalNumber: "",
            firstName: "",
            lastName: "",
            email: "",
          });
    }

    render(){
        const {classes} = this.props;
        const { registrationNumber, bonus, personalNumber, firstName, lastName, email } = this.state;

        let validFields = this.areFieldsValid();

        return(
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <h1>Kjøp Bilforsikring</h1>
                </Grid>
                <Grid item>
                    <p>
                    Det er fire forskjellige forsikringer å velge mellom.
                    Ansvarsforsikring er lovpålagt om kjøretøyet er registrert og skal brukes på veien. I tillegg kan du utvide forsikringen avhengig av hvor gammel bilen din er og hvordan du bruker den.
                    </p>
                </Grid>
                <Grid item>
                    <InputField
                        label="Bilens registreringsnummer"
                        type="text"
                        value={registrationNumber}
                        validInput={/^[A-Za-z0-9 ]*$/}
                        placeholder="E.g. AB 12345"
                        onValueChanged={(value)=> this.setState({registrationNumber: value.toUpperCase()})}
                    />
                </Grid>
                <Grid item>
                    <SelectField
                        label="Din bonus"
                        type="text"
                        value={bonus}
                        options={["Bonus A", "Bonus B", "Bonus C"]}
                        placeholder="Placeholder"
                        helpText="Hjelpetekst/feilmeldingstekst"
                        onValueChanged={(value)=>this.setState({bonus: value})}
                    />
                </Grid>
                <Grid item>
                    <InputField
                        label="Fødselsnummer"
                        type="text"
                        value={personalNumber}
                        validInput={/^\d{0,11}$/}
                        regExp={/^\d{11}$/}
                        placeholder="11 siffer"
                        errorText="Skriv inn 11 siffer"
                        onValueChanged={(value)=>this.setState({personalNumber: value})}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2}>
                        <Grid item>
                            <InputField
                                label="Fornavn"
                                type="text"
                                validInput={/^[A-Za-z ]*$/}
                                value={firstName}
                                onValueChanged={(value)=>this.setState({firstName: value.trimStart().replace(/ +(?= )/g,'')})}
                            />
                        </Grid>
                        <Grid item>
                            <InputField
                                label="Etternavn"
                                type="text"
                                value={lastName}
                                onValueChanged={(value)=>this.setState({lastName: value.trimStart().replace(/ +(?= )/g,'')})}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <InputField
                        label="Epost"
                        type="text"
                        value={email}
                        name="epost"
                        onValueChanged={(value)=>this.setState({email: value})}
                        regExp={emailRegExp}
                        errorText="Skriv inn en gyldig epostaddresse"
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2}>
                        <Grid item>
                            <Button className={ classes.buyButton } disabled={!validFields} onClick={this.onBuyClicked.bind(this)}>Kjøp</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" className={ classes.cancelButton } onClick={this.onCancelClicked.bind(this)}>Avbryt</Button>
                        </Grid>
                    </Grid>
                </Grid>
              </Grid>
        )
    }

}

export default withStyles(styles)(InsuranceView);
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
const personalIdRegExp = /^\d{11}$/

class InsuranceView extends Component { 

    constructor(props) {
        super(props);
        this.state = {
          licencePlate: "",
          bonus: "Bonus A",
          personalId: "",
          firstName: "",
          lastName: "",
          email: "",

          //TODO: The state could be an enum...
          success: false,
          failed: false,
          working: false,
          agreementStatus: null,
          agreementId: ''
        };
      }

    areFieldsValid() {
        const {licencePlate, bonus, personalId, email, firstName, lastName} = this.state;
        let errorTextList = [];
        if (licencePlate.length < 1) {
            return false;
        }
        if (bonus.length < 1) {
            return false;
        }
        if (!personalIdRegExp.test(personalId)) {
            return false;
        }
        if (firstName.length < 1) {
            return false;
        }
        if (lastName.length < 1) {
            return false;
        }
        if(!emailRegExp.test(email)) {
            return false;
        }

        return true;
    }

    onBuyClicked() {
        const {licencePlate, bonus, personalId, email, firstName, lastName} = this.state;

        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    bonus: bonus,
                                    personalId: personalId,
                                    licencePlate: licencePlate})
        };

        this.setState({working: true}, ()=>{
            // When server is not runnin on localhost, we should use https, but for now, use http
            fetch('http://localhost:8080/api/insurances', requestOptions)
            .then(res => res.json())
            .then((data) => {
                let createdAgreement = data.agreementId !== null;
                this.setState({ working: false, success: createdAgreement, failed: !createdAgreement, agreementStatus: data.agreementStatus, agreementId: data.agreementId});
                console.log(data);
            })
            .catch((err)=>{
                console.log(err);
                this.setState({working: false, success: false, failed: true})
            })
        });
    }

    onCancelClicked() {
        this.setState({
            licencePlate: "",
            bonus: "Bonus A",
            personalId: "",
            firstName: "",
            lastName: "",
            email: "",
            success: false,
            failed: false,
            agreementStatus: null,
          });
    }

    render(){
        const {classes} = this.props;
        const { licencePlate, bonus, personalId, firstName, lastName, email, working, failed, success, agreementId, agreementStatus} = this.state;

        // TODO: Add working indicator
        let disableFields = working || failed || success

        let validFields = this.areFieldsValid();

        return(
            <Grid container direction="column" spacing={2} >
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
                        disabled={disableFields}
                        label="Bilens registreringsnummer"
                        type="text"
                        value={licencePlate}
                        validInput={/^[A-Za-z0-9 ]*$/}
                        placeholder="E.g. AB 12345"
                        onValueChanged={(value)=> this.setState({licencePlate: value.toUpperCase()})}
                    />
                </Grid>
                <Grid item>
                    <SelectField
                        disabled={disableFields}
                        label="Din bonus"
                        type="text"
                        value={bonus}
                        options={["Bonus A", "Bonus B", "Bonus C"]}
                        placeholder="Placeholder"
                        helpText="Velg din bonusordning"
                        onValueChanged={(value)=>this.setState({bonus: value})}
                    />
                </Grid>
                <Grid item>
                    <InputField
                        disabled={disableFields}
                        label="Fødselsnummer"
                        type="text"
                        value={personalId}
                        validInput={/^\d{0,11}$/}
                        regExp={/^\d{11}$/}
                        placeholder="11 siffer"
                        errorText="Skriv inn 11 siffer"
                        onValueChanged={(value)=>this.setState({personalId: value})}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={2}>
                        <Grid item>
                            <InputField
                                disabled={disableFields}
                                label="Fornavn"
                                type="text"
                                validInput={/^[A-Za-z ]*$/}
                                value={firstName}
                                onValueChanged={(value)=>this.setState({firstName: value.trimStart().replace(/ +(?= )/g,'')})}
                            />
                        </Grid>
                        <Grid item>
                            <InputField
                                disabled={disableFields}
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
                        disabled={disableFields}
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
                            <Button className={ classes.buyButton } disabled={!validFields || disableFields} onClick={this.onBuyClicked.bind(this)}>Kjøp</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" disabled={working} className={ classes.cancelButton } onClick={this.onCancelClicked.bind(this)}>Avbryt</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {disableFields &&
                    <Grid item>
                        <Typography>{working ? "Jobber..." : success ? "Avtale #" + agreementId + " opprettet. Status: " + agreementStatus : failed ? "Kunne ikke opprette avtale. Status: " + agreementStatus: "Ukjent feil!"}</Typography>
                    </Grid>
                }
              </Grid>
        )
    }

}

export default withStyles(styles)(InsuranceView);
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email:'',
            openness:'',
            agreeableness:'',
            emotional_stability:'',
            conscientiousness:'',
            extraversion:'',
            password:'',
            errorMessage:'',
			traitMessage:'For personality traits provide number in {0.5*k, k in [1,14]} where 0.5 denotes considering given trait as extremely low and 7.0 as very high'
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleOpennessChange = this.handleOpennessChange.bind(this);
        this.handleAgreeablenessChange = this.handleAgreeablenessChange.bind(this);
        this.handleEmotionalStabilityChange = this.handleEmotionalStabilityChange.bind(this);
        this.handleConscientiousnessChange = this.handleConscientiousnessChange.bind(this);
        this.handleExtraversionChange = this.handleExtraversionChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.registerAction = this.registerAction.bind(this);
    }

    registerAction(e) {
        e.preventDefault()
        axios.post('http://127.0.0.1:5000/api/users/register', {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email:this.state.email,
            openness:this.state.openness,
            agreeableness:this.state.agreeableness,
            emotional_stability:this.state.emotional_stability,
            conscientiousness:this.state.conscientiousness,
            extraversion:this.state.extraversion,
            password:this.state.password})
            .then(response => {
                localStorage.setItem('usertoken', response.data.token)
                const token = localStorage.usertoken
                const decoded = jwt_decode(token)
                localStorage.setItem('email', decoded.identity.email)
                this.props.history.push("/black-dashboard-react");
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    errorMessage: <p> {err.response.data.message}</p>
                });
            })
    }

    handleFirstNameChange(event){
        this.setState({
            first_name: event.target.value
        })
    }

    handleLastNameChange(event){
        this.setState({
            last_name: event.target.value
        })
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value
        })
    }

    handleOpennessChange(event){
        this.setState({
            openness: event.target.value
        })
    }

    handleAgreeablenessChange(event){
        this.setState({
            agreeableness: event.target.value
        })
    }

    handleEmotionalStabilityChange(event){
        this.setState({
            emotional_stability: event.target.value
        })
    }

    handleConscientiousnessChange(event){
        this.setState({
            conscientiousness: event.target.value
        })
    }

    handleExtraversionChange(event){
        this.setState({
            extraversion: event.target.value
        })
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        })
    }

    render(){
        const { classes } = this.props;
        console.log(this.state.errorMessage)
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            onChange={this.handleFirstNameChange}
                            autoFocus
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            onChange={this.handleLastNameChange}
                            name="lastName"
                            autoComplete="lname"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            onChange={this.handleEmailChange}
                            name="email"
                            autoComplete="email"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="openess"
                            label="Openess"
                            onChange={this.handleOpennessChange}
                            name="openess"
                            autoComplete="openess"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="Agreeableness"
                            label="Agreeableness"
                            onChange={this.handleAgreeablenessChange}
                            name="Agreeableness"
                            autoComplete="Agreeableness"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="EmotionalStability"
                            label="Emotional Stability"
                            onChange={this.handleEmotionalStabilityChange}
                            name="EmotionalStability"
                            autoComplete="EmotionalStability"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="Conscientiousness"
                            label="Conscientiousness"
                            onChange={this.handleConscientiousnessChange}
                            name="Conscientiousness"
                            autoComplete="Conscientiousness"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="Extraversion"
                            label="Extraversion"
                            onChange={this.handleExtraversionChange}
                            name="Extraversion"
                            autoComplete="Extraversion"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password [8-63] characters"
                            type="password"
                            id="password"
                            onChange={this.handlePasswordChange}
                            autoComplete="current-password"
                        />
                        </Grid>
						<Grid item xs={12}>
							{this.state.traitMessage}
                        </Grid>
                        <Grid item xs={12}>
                            {this.state.errorMessage}
                        </Grid>
                    </Grid>
                    <span onClick={this.registerAction}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    </span>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link href="/sign-in" variant="body2">
                            Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
            </Container>
          );
    }
}

export default withStyles(useStyles)(SignUp);
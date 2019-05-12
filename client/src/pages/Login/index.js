import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { postAuthData } from '../../api'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import './style.css'

class Login extends Component {
  state = {
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
    remember: false,
    error: ''
  }

  componentDidMount () {
    let email = localStorage.getItem('email') || ''
    let password = localStorage.getItem('password') || ''
    let remember = email.length > 1 && password.length > 1
    this.setState({
      email,
      password,
      remember
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleChangeCheckbox = e => {
    this.setState({ remember: e.target.checked })
  }

  handleSubmit = e => {
    e.preventDefault()
    let { email, password, remember } = this.state
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      this.setState({ emailError: true })
    } else if (password.length < 4) {
      this.setState({ passwordError: true })
    } else {
      postAuthData('login', { email, password, remember }).then(res => {
        if (res.status === 200) {
          if (remember) {
            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
          }
          this.setState({ emailError: false, passwordError: false }, () => {
            this.props.history.push('/123')
          })
        } else {
          this.setState({
            error: 'Auth Failed!',
            emailError: false,
            passwordError: false
          })
        }
      })
    }
  }

  render () {
    let { emailError, passwordError, email, password, remember } = this.state
    return (
      <div className='login__wrapper'>
        <main className='login__main'>
          <CssBaseline />
          <Paper className='login__paper'>
            <Avatar className='login__avatar'>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form className='login__form' onSubmit={this.handleSubmit}>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='email'>Email Address</InputLabel>
                <Input
                  id='email'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  onChange={this.handleChange}
                  error={emailError}
                  value={email}
                />
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input
                  name='password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  onChange={this.handleChange}
                  error={passwordError}
                  value={password}
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    value='remember'
                    color='primary'
                    onChange={this.handleChangeCheckbox}
                    checked={remember}
                  />
                }
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className='login__submit'
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    )
  }
}

export default withRouter(Login)

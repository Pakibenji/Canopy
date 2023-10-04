import React from 'react'
import LoginForm from '../components/LoginForm'
import Header from '../components/Header'
import styles from '../page.module.css'
import { subTitle } from '../fonts'

const Login = () => {

  return (
    <>
        <Header />
        <h2 style={subTitle.style} className={styles.pageTitle}>Login</h2>
        <LoginForm />
    </>
  )
}

export default Login
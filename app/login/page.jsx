import React from 'react'
import LoginForm from '../components/Form/LoginForm'
import styles from '../page.module.css'
import { subTitle } from '../fonts'
import Link from 'next/link'

const Login = () => {

  return (
    <>
        <h2 style={subTitle.style} className={styles.pageTitle}>Login</h2>
        <LoginForm />
        <div className="link" style={subTitle.style}>
          <Link href="/register">Go to register page</Link>
        </div>
    </>
  )
}

export default Login
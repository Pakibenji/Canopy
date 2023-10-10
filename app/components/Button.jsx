import React from 'react'
import styles from './Button.module.css'
import { subTitle } from '../fonts'

const Button = ({func, name}) => {
  return (
    <><button onClick={() => func()} className={styles.button} style={subTitle.style}>{name}</button></>
  )
}

export default Button
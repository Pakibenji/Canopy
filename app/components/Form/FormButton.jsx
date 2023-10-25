import React from 'react'
import styles from "./Form.module.css"
import { subTitle } from '@/app/fonts'

const FormButton = ({type, name}) => {
  return (
    <button type={type} className={styles.formButton} style={subTitle.style}>{name}</button>
  )
}

export default FormButton
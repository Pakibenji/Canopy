import React from 'react'
import styles from "./Form.module.css"

const FormButton = ({type, name}) => {
  return (
    <button type={type} className={styles.formButton}>{name}</button>
  )
}

export default FormButton
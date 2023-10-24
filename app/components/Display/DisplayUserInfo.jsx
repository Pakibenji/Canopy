import React from 'react'
import styles from "../UserComponents/User.module.css"
import { subTitle } from "@/app/fonts"
const DisplayUserInfo = ({name, email, description, userImage}) => {

  return (
    <div className={styles.userInfoContainer}>
        <h2 style={subTitle.style}>{name}</h2>
        <p>{email}</p>
        {userImage && <img src={userImage} />}
        {description && <p>{description}</p>}
      </div>
  )
}

export default DisplayUserInfo
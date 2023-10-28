import React from 'react'
import styles from "../UserComponents/User.module.css"
import { subTitle } from "@/app/fonts"
const DisplayUserInfo = ({name, email, description, userImage}) => {

  const isUserImage = () => {
    if (userImage) {
      return <img src={userImage} className={styles.userImage} />
    }
    return <img src="https://via.placeholder.com/150" className={styles.userImage} />
  }

  const isUserDescription = () => {
    if (description) {
      return <p className={styles.UserDescription}>{description}</p>
    }
  }

  return (
    <div className={styles.userInfoContainer}>
        <h2 style={subTitle.style}className={styles.userName}>{name}</h2>
        {isUserImage()}
        {isUserDescription()}
      </div>
  )
}

export default DisplayUserInfo
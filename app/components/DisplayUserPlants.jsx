import React from 'react'

const DisplayUserPlants = ({ plant }) => {
        const { name, type, plantImage} = plant
    return (
        <div>
            <h3>{name}</h3>
            <p>{type}</p>
        </div>
    )
}
export default DisplayUserPlants

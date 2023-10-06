'use client'
import React, {useState, useEffect} from 'react'
import IsLoading from './IsLoading'
import DisplayAllPlants from './DisplayAllPlants'
import { useSession } from 'next-auth/react'

const AllPlants = () => {
    const [allPlantsArray, setAllPlantsArray] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const { data: session} = useSession()

    const getAllPlants = async () => {
        try {
            const response = await fetch('/api/plants/all')
            const allPlants = await response.json()
            setAllPlantsArray(allPlants)
            setIsLoading(false)
        } catch (error) {
            setError(error)
        }
    }

    function displayAllPlants() {
        if (isLoading) return <IsLoading />
        if (!allPlantsArray) return <div>There are no plants.</div>
        if (error) return <div>{error}</div>
        return allPlantsArray.map((plant) => (
            <DisplayAllPlants key={plant._id} plant={plant} session={session}/>
        ))
    }

    useEffect(() => {
        setIsLoading(true)
        getAllPlants()
    }, [])


  return (
    <>{displayAllPlants()}</>
  )
}

export default AllPlants
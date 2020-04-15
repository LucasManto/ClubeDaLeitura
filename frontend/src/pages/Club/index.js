import React from 'react'
import './styles.css'
import { useParams } from 'react-router-dom'

export default function Club({ userData }) {
  const { id } = useParams()
  const clubData = userData.clubsIBelong?.find(club => club.id === id)
    ? userData.clubsIBelong?.filter(club => club.id === id)
    : userData.clubsIManage?.filter(club => club.id === id)

  return <h1>{id}</h1>
}

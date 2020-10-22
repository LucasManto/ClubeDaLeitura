import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import {
  Container,
  ClubList,
  ClubCard,
  ClubHeader,
  ClubTitle,
  AdminBadge,
  ClubDescription
} from './styles'

import bannerImg from '../../assets/default-club-banner.png'

export default function MyClubs({ userData }) {
  const match = useRouteMatch()

  return (
    <Container>
      <header>
        <h1>Meus clubes</h1>
      </header>

      <div>
        <ClubList>
          {userData.clubsIBelong?.map(club => (
            <Link key={club.id} to={`${match.url}/${club.id}`}>
              <ClubCard>
                <img src={club.banner || bannerImg} alt="" />

                <ClubHeader>
                  <ClubTitle>{club.name}</ClubTitle>
                  {userData.clubsIManage.find(clubIManage => clubIManage.id === club.id) && <AdminBadge>Admin</AdminBadge>}
                </ClubHeader>

                <ClubDescription>{club.description}</ClubDescription>
              </ClubCard>
            </Link>
          ))}
        </ClubList>
      </div>
    </Container>
  )
}

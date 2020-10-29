import React from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

import logoImg from '../../assets/logo.png'
import bannerImg from '../../assets/banner.jpg'
import aboutImg from '../../assets/about.png'
import whoImg from '../../assets/who-we-are.png'
import howImg from '../../assets/how-it-works.png'

import { Container } from './styles'

export default function Index() {
  return (
    <Container>
      <header>
        <img
          width={50}
          height={50}
          src={logoImg}
          alt="Roda de Leitura"
        />

        <nav>
          <ul>
            <li>
              <ScrollLink to="about" activeClass="active" spy={true} offset={-64}>
                Sobre
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="how-it-works" activeClass="active" spy={true} offset={-64}>
                Como funciona
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="get-in-touch" activeClass="active" spy={true} offset={-64}>
                Contato
              </ScrollLink>
            </li>
          </ul>
        </nav>

        <div>
          <Link to="/signin" className="button outline">
            Entrar
          </Link>
          <Link to="/signup" className="button">
            Cadastrar
          </Link>
        </div>
      </header>
      <main>
        <section id="banner">
          <img src={bannerImg} alt="Banner" />
        </section>
        <section id="about">
          <img src={aboutImg} alt="about" />
        </section>
        <section id="how-it-works">
          <img src={howImg} alt="how it works" />
          <iframe
            title="how-it-works-video"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/_L98LDe9Bvw"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </section>
        <section id="get-in-touch">
          <img src={whoImg} alt="who we are" />
        </section>
      </main>
    </Container>
  )
}

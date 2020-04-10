import React from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

import './styles.css'
import bannerImg from '../../assets/banner.jpg'

export default function Index() {
  return (
    <div className="index-container">
      <header>
        <img
          width={50}
          height={50}
          src="https://picsum.photos/id/1062/50"
          alt="Roda de Leitura"
        />

        <nav>
          <ul>
            <li>
              <ScrollLink to="about" offset={-64}>
                Sobre
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="how-it-works" offset={-64}>
                Como funciona
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="get-in-touch" offset={-64}>
                Contato
              </ScrollLink>
            </li>
          </ul>
        </nav>

        <div className="button-group">
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
          <h1>Roda de Leitura</h1>
        </section>
        <section id="about">
          <h1>Sobre</h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            rhoncus sollicitudin mauris, quis venenatis quam tristique a.
            Integer commodo nec lacus vel sagittis. Suspendisse ut orci eget
            purus iaculis facilisis at eu magna. Aliquam odio ipsum, dictum a
            urna vitae, rhoncus congue metus. Aenean quam felis, posuere in
            pulvinar at, tristique ut purus. Suspendisse ac ante est. Ut vel
            diam est. Donec nisl nisi, placerat et nunc eu, sagittis lacinia
            augue. Aliquam ornare ut quam eu sodales. Etiam lacus elit,
            malesuada nec ex ac, convallis aliquet erat. Nulla ante diam,
            facilisis eu feugiat eu, ornare non massa. Cras neque sapien, mollis
            sed risus elementum, rutrum interdum ex. Donec mattis lectus vel
            viverra tincidunt. Ut lectus mauris, volutpat in pretium a,
            consectetur ac justo. Proin et nunc sem. Nulla iaculis tellus non
            dolor pretium cursus. Maecenas nec sem quis est finibus interdum id
            vitae risus. Maecenas orci dui, maximus quis ullamcorper at,
            efficitur quis augue. Aliquam erat volutpat. In pulvinar erat
            mattis, varius elit ut, luctus sapien. Vestibulum convallis lacus
            justo, at consectetur nunc egestas nec. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Praesent rhoncus sollicitudin mauris,
            quis venenatis quam tristique a. Integer commodo nec lacus vel
            sagittis. Suspendisse ut orci eget purus iaculis facilisis at eu
            magna. Aliquam odio ipsum, dictum a urna vitae, rhoncus congue
            metus. Aenean quam felis, posuere in pulvinar at, tristique ut
            purus. Suspendisse ac ante est. Ut vel diam est. Donec nisl nisi,
            placerat et nunc eu, sagittis lacinia augue. Aliquam ornare ut quam
            eu sodales. Etiam lacus elit, malesuada nec ex ac, convallis aliquet
            erat. Nulla ante diam, facilisis eu feugiat eu, ornare non massa.
            Cras neque sapien, mollis sed risus elementum, rutrum interdum ex.
            Donec mattis lectus vel viverra tincidunt. Ut lectus mauris,
            volutpat in pretium a, consectetur ac justo. Proin et nunc sem.
            Nulla iaculis tellus non dolor pretium cursus. Maecenas nec sem quis
            est finibus interdum id vitae risus. Maecenas orci dui, maximus quis
            ullamcorper at, efficitur quis augue. Aliquam erat volutpat. In
            pulvinar erat mattis, varius elit ut, luctus sapien. Vestibulum
            convallis lacus justo, at consectetur nunc egestas nec.
          </p>

          <p>
            Ut accumsan pharetra magna, non varius dui interdum quis. Curabitur
            molestie ipsum mi, at lobortis arcu dictum id. Pellentesque eget
            finibus massa. Suspendisse rhoncus lorem eu magna gravida tristique.
            Vivamus consequat justo et gravida semper. Sed fringilla placerat
            ipsum eu luctus. Proin eget odio odio. Nullam accumsan ac tellus ac
            feugiat. Phasellus posuere tellus nulla, a mattis nisi commodo sit
            amet. Donec vitae tincidunt nisl. Donec vel varius enim. Aenean nec
            auctor quam. Etiam ut ex at risus pharetra efficitur. Aliquam ac
            consequat sapien, a facilisis ex. Donec malesuada imperdiet orci,
            nec auctor libero aliquam malesuada. Duis aliquam ullamcorper orci
            ac gravida. In sed magna non purus ultricies feugiat eget ut magna.
            Quisque congue consectetur ex eget lacinia. Morbi dictum nibh a
            tristique dapibus. Nunc sodales in nibh in aliquam. Ut in metus
            laoreet, pretium lacus quis, convallis justo. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Nunc lacinia accumsan risus, dictum viverra nisl suscipit vel.
          </p>
        </section>
        <section id="how-it-works">
          <h1>Como funciona</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            rhoncus sollicitudin mauris, quis venenatis quam tristique a.
            Integer commodo nec lacus vel sagittis. Suspendisse ut orci eget
            purus iaculis facilisis at eu magna. Aliquam odio ipsum, dictum a
            urna vitae, rhoncus congue metus. Aenean quam felis, posuere in
            pulvinar at, tristique ut purus. Suspendisse ac ante est. Ut vel
            diam est. Donec nisl nisi, placerat et nunc eu, sagittis lacinia
            augue. Aliquam ornare ut quam eu sodales. Etiam lacus elit,
            malesuada nec ex ac, convallis aliquet erat. Nulla ante diam,
            facilisis eu feugiat eu, ornare non massa. Cras neque sapien, mollis
            sed risus elementum, rutrum interdum ex. Donec mattis lectus vel
            viverra tincidunt. Ut lectus mauris, volutpat in pretium a,
            consectetur ac justo. Proin et nunc sem. Nulla iaculis tellus non
            dolor pretium cursus. Maecenas nec sem quis est finibus interdum id
            vitae risus. Maecenas orci dui, maximus quis ullamcorper at,
            efficitur quis augue. Aliquam erat volutpat. In pulvinar erat
            mattis, varius elit ut, luctus sapien. Vestibulum convallis lacus
            justo, at consectetur nunc egestas nec. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Praesent rhoncus sollicitudin mauris,
            quis venenatis quam tristique a. Integer commodo nec lacus vel
            sagittis. Suspendisse ut orci eget purus iaculis facilisis at eu
            magna. Aliquam odio ipsum, dictum a urna vitae, rhoncus congue
            metus. Aenean quam felis, posuere in pulvinar at, tristique ut
            purus. Suspendisse ac ante est. Ut vel diam est. Donec nisl nisi,
            placerat et nunc eu, sagittis lacinia augue. Aliquam ornare ut quam
            eu sodales. Etiam lacus elit, malesuada nec ex ac, convallis aliquet
            erat. Nulla ante diam, facilisis eu feugiat eu, ornare non massa.
            Cras neque sapien, mollis sed risus elementum, rutrum interdum ex.
            Donec mattis lectus vel viverra tincidunt. Ut lectus mauris,
            volutpat in pretium a, consectetur ac justo. Proin et nunc sem.
            Nulla iaculis tellus non dolor pretium cursus. Maecenas nec sem quis
            est finibus interdum id vitae risus. Maecenas orci dui, maximus quis
            ullamcorper at, efficitur quis augue. Aliquam erat volutpat. In
            pulvinar erat mattis, varius elit ut, luctus sapien. Vestibulum
            convallis lacus justo, at consectetur nunc egestas nec.
          </p>

          <p>
            Ut accumsan pharetra magna, non varius dui interdum quis. Curabitur
            molestie ipsum mi, at lobortis arcu dictum id. Pellentesque eget
            finibus massa. Suspendisse rhoncus lorem eu magna gravida tristique.
            Vivamus consequat justo et gravida semper. Sed fringilla placerat
            ipsum eu luctus. Proin eget odio odio. Nullam accumsan ac tellus ac
            feugiat. Phasellus posuere tellus nulla, a mattis nisi commodo sit
            amet. Donec vitae tincidunt nisl. Donec vel varius enim. Aenean nec
            auctor quam. Etiam ut ex at risus pharetra efficitur. Aliquam ac
            consequat sapien, a facilisis ex. Donec malesuada imperdiet orci,
            nec auctor libero aliquam malesuada. Duis aliquam ullamcorper orci
            ac gravida. In sed magna non purus ultricies feugiat eget ut magna.
            Quisque congue consectetur ex eget lacinia. Morbi dictum nibh a
            tristique dapibus. Nunc sodales in nibh in aliquam. Ut in metus
            laoreet, pretium lacus quis, convallis justo. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Nunc lacinia accumsan risus, dictum viverra nisl suscipit vel.
          </p>
        </section>
        <section id="get-in-touch">
          <h1>Contato</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            rhoncus sollicitudin mauris, quis venenatis quam tristique a.
            Integer commodo nec lacus vel sagittis. Suspendisse ut orci eget
            purus iaculis facilisis at eu magna. Aliquam odio ipsum, dictum a
            urna vitae, rhoncus congue metus. Aenean quam felis, posuere in
            pulvinar at, tristique ut purus. Suspendisse ac ante est. Ut vel
            diam est. Donec nisl nisi, placerat et nunc eu, sagittis lacinia
            augue. Aliquam ornare ut quam eu sodales. Etiam lacus elit,
            malesuada nec ex ac, convallis aliquet erat. Nulla ante diam,
            facilisis eu feugiat eu, ornare non massa. Cras neque sapien, mollis
            sed risus elementum, rutrum interdum ex. Donec mattis lectus vel
            viverra tincidunt. Ut lectus mauris, volutpat in pretium a,
            consectetur ac justo. Proin et nunc sem. Nulla iaculis tellus non
            dolor pretium cursus. Maecenas nec sem quis est finibus interdum id
            vitae risus. Maecenas orci dui, maximus quis ullamcorper at,
            efficitur quis augue. Aliquam erat volutpat. In pulvinar erat
            mattis, varius elit ut, luctus sapien. Vestibulum convallis lacus
            justo, at consectetur nunc egestas nec. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Praesent rhoncus sollicitudin mauris,
            quis venenatis quam tristique a. Integer commodo nec lacus vel
            sagittis. Suspendisse ut orci eget purus iaculis facilisis at eu
            magna. Aliquam odio ipsum, dictum a urna vitae, rhoncus congue
            metus. Aenean quam felis, posuere in pulvinar at, tristique ut
            purus. Suspendisse ac ante est. Ut vel diam est. Donec nisl nisi,
            placerat et nunc eu, sagittis lacinia augue. Aliquam ornare ut quam
            eu sodales. Etiam lacus elit, malesuada nec ex ac, convallis aliquet
            erat. Nulla ante diam, facilisis eu feugiat eu, ornare non massa.
            Cras neque sapien, mollis sed risus elementum, rutrum interdum ex.
            Donec mattis lectus vel viverra tincidunt. Ut lectus mauris,
            volutpat in pretium a, consectetur ac justo. Proin et nunc sem.
            Nulla iaculis tellus non dolor pretium cursus. Maecenas nec sem quis
            est finibus interdum id vitae risus. Maecenas orci dui, maximus quis
            ullamcorper at, efficitur quis augue. Aliquam erat volutpat. In
            pulvinar erat mattis, varius elit ut, luctus sapien. Vestibulum
            convallis lacus justo, at consectetur nunc egestas nec.
          </p>

          <p>
            Ut accumsan pharetra magna, non varius dui interdum quis. Curabitur
            molestie ipsum mi, at lobortis arcu dictum id. Pellentesque eget
            finibus massa. Suspendisse rhoncus lorem eu magna gravida tristique.
            Vivamus consequat justo et gravida semper. Sed fringilla placerat
            ipsum eu luctus. Proin eget odio odio. Nullam accumsan ac tellus ac
            feugiat. Phasellus posuere tellus nulla, a mattis nisi commodo sit
            amet. Donec vitae tincidunt nisl. Donec vel varius enim. Aenean nec
            auctor quam. Etiam ut ex at risus pharetra efficitur. Aliquam ac
            consequat sapien, a facilisis ex. Donec malesuada imperdiet orci,
            nec auctor libero aliquam malesuada. Duis aliquam ullamcorper orci
            ac gravida. In sed magna non purus ultricies feugiat eget ut magna.
            Quisque congue consectetur ex eget lacinia. Morbi dictum nibh a
            tristique dapibus. Nunc sodales in nibh in aliquam. Ut in metus
            laoreet, pretium lacus quis, convallis justo. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia Curae;
            Nunc lacinia accumsan risus, dictum viverra nisl suscipit vel.
          </p>
        </section>
      </main>
    </div>
  )
}

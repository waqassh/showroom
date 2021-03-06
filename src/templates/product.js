import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image} from './templateStyles/showroomStyles'


const ProductTemplate = ({data: 
  {wpcontent:{ 
    auto:{ 
      products,
      makemodels: {edges:makemodels},
    },
  },
},
}) => {
  
    return (
      <Layout>
        <SEO title="Car"/>
        <Wrapper>
          <div className="car-container">
            <div className="car-image">
            <Image fluid={products.foto.imageFile.childImageSharp.fluid}/>
          <div className="make">
            {makemodels.map(({node:makemodel})=> (
              <div className="role">{makemodel.name}</div>
            ))}
          </div>
          </div>
          <div className="car-info">
            <h2>{products.merk} {products.naam}</h2>
            
              <h3><span>{products.naam} </span> </h3>
           
            
          
            <p className="description">{products.omschrijving}</p>
            <p className="info">
            <strong>merk:</strong> {products.merk}
            </p>

            <p className="info">
            <strong>naam:</strong> {products.naam}
            </p>

            <p className="info">
            <strong>bouwjaar:</strong> {products.bouwjaar}
            </p>

            <p className="info">
            <strong>Transmissie:</strong> {products.transmissie}
            </p>

          </div>
          </div>

        </Wrapper>
      </Layout>
    )
}

export default ProductTemplate

export const pageQuery = graphql`
query ($id: ID!) {
  wpcontent {
    auto(id: $id, idType: ID) {
      makemodels {
        edges {
          node {
            name
          }
        }
      }
      products {
        merk
        naam
        bouwjaar
        omschrijving
        transmissie
        foto {
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality: 50) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          altText
        }
      }
    }
  }
}
`
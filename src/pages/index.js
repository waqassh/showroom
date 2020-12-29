import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image,BottomEdgeDown,BottomEdgeUp,Artist} from "../pages/pageStyles/pageStyles"
import { COLORS } from "../constants"

  const IndexPage = () => {

    const {
      wpcontent: {
        page: {
          homeMeta: {
            title,
            kleineBeschrijving,
            foto,
            featuredProducts,
          }
        }
      }
    } = useStaticQuery(graphql`
    query{
      wpcontent{
      page(id: "home", idType: URI) {
        homeMeta {
          title
          kleineBeschrijving
          foto {
            altText
            sourceUrl
            imageFile{
              childImageSharp{
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          featuredProducts {
            ... on WPGraphql_Auto {
              id
              products {
                naam
                merk
                foto {
                  altText
                  sourceUrl
                  imageFile{
                    childImageSharp{
                      fluid(quality: 100, grayscale: true) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);


console.log(featuredProducts)
  return (
    <Layout>
      <SEO title="Home"/>
      <Wrapper>
        <div className="banner">
          <Image 
          fluid={foto.imageFile.childImageSharp.fluid} alt={foto.altText}
          />
          <div className="inner-div">
            <p className="header-title">{title}</p>
            <p className="header-description">{kleineBeschrijving}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK}/>
        </div>
        <div className="description">
          <p>{kleineBeschrijving}</p>
          <BottomEdgeUp color={COLORS.PRIMARY}/>
        </div>
        <div className="artists">
          <h2>Featured Cars</h2>
          
          <div className="artist-items">
            {/*featuredProducts.map(({products,slug}) => (
              <Artist to={'/${slug}'}>
                <Image 
                fluid= {products.foto.imageFile.childImageSharp.fluid} 
                altText={products.foto.altText}
                />
                <div className="artist-info">
                  <p>
                    {products.merk} {products.naam}
                  </p>
                  
                </div>
              </Artist>
            ))*/}
          </div>
        </div>
      </Wrapper>

    </Layout>
  )
}
  


export default IndexPage

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image,BottomEdgeDown,BottomEdgeUp,Artist} from "../pages/pageStyles/pageStyles"
import { COLORS } from "../constants"

const ProductsPage = () => {
    const {wpcontent: {
        page: {
            productspageMeta:{
            beschrijving,
            foto
        }
        },
        autos: {edges: autos}
    }} = useStaticQuery(graphql`
    query  {
        wpcontent {
          page(id: "products", idType: URI) {
            productspageMeta {
              beschrijving
              foto {
                
                sourceUrl
                imageFile{
                  childImageSharp{
                    fluid(quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                altText
              }
            }
          }
          autos {
            edges {
              node {
                products {
                  naam
                  merk
                  bouwjaar
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
                slug
              }
            }
          }
        }
      }
      

`)


    return (
        <Layout>
            <SEO title="products"/>
            <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
                <div className="banner">
                    <Image 
                    fluid={foto.imageFile.childImageSharp.fluid}
                    alt={foto.altText}/>
                    <BottomEdgeDown color={COLORS.SECONDARY}/>
                </div>
                <div className="description">
                    <h2>We are Sheikh showroom</h2>
                    <p>{beschrijving}</p>
                    <BottomEdgeUp color={COLORS.BLACK}/>
                </div>
                <div className="artists">
                    <h2>Our Products</h2>
                    <div className="artist-items">
                        {autos.map(({node: {products, slug} }) => (
                            <Artist to={`/${slug}`} key={slug}>
                                <Image
                                 fluid={products.foto.imageFile.childImageSharp.fluid}
                                 alt={products.foto.altText}
                                 />
                               <div className="artist-info">
                                   <p>{products.merk}</p>
                                   {products.naam && <p>{products.naam}</p>}

                               </div>
                            </Artist>
                        ))}
                    </div>
                </div>
            </Wrapper>

        </Layout>
    )
}

export default ProductsPage
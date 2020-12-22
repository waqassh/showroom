import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql `
  `);
  return (
    <Layout>
      <SEO title="Home"/>
    </Layout>
  )
}
  


export default IndexPage

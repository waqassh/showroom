import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import {HeaderWrapper} from './headerStyles/headerStyles'
import Menu from './Menu'


const Header = ({ siteTitle }) => {
  const {
    wpcontent: {menuItems},
} = useStaticQuery(graphql`
  query{
    wpcontent{
      menuItems {
        edges {
          node {
            label
            path
          }
        }
      }
    }
  }
  `)
  return(
  <HeaderWrapper> 
    <Menu menuItems={menuItems.edges}/>
  </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

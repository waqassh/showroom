const { POINT_CONVERSION_COMPRESSED } = require("constants");
const {graphql} = require("gatsby")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require("path");


exports.createPages =  ({graphql, actions}) => {
  const {createPage} = actions
  return  graphql(`
    {
      wpcontent {
        autos {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    }
`).then(result => {
  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()))
    return Promise.reject(result.errors)
  }

  const products = result.data.wpcontent.autos.edges
  products.forEach(autos => {
    const {id,slug} = autos.node
    createPage({
      path:slug,
      component: path.resolve(`src/templates/product.js`),
      context: {
        id,
        slug
      },
    })
  })
})
} 
  

/* Aan de hand van dit stukje code worden de images vanuit WPgraphql omgezet tot images waarop Gatsby image optimization kan toepassen */
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

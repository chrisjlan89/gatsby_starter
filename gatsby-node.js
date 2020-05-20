exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panic('failed to create posts', result.errors);
  }

  const posts = result.data.allMdx.nodes;

  posts.forEach(post => {
    actions.createPage({
      path: post.frontmatter.slug,
      component: require.resolve('./src/templates/post'),
      context: {
        slug: `${post.frontmatter.slug}`,
      },
    });
  });
};

//https://github.com/FrontendMasters/gatsby-intro/pull/4/commits/c5b64d6fa6f83c2a0cfdb66d4be90cb960b5a675

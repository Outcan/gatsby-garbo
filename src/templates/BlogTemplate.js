import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";

const Blog = ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext;
  const nextPage = `/blog/${String(currentPage + 1)}`;
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : `/blog/${String(currentPage - 1)}`;

  return (
    <Layout>
      <div>
        <h1 style={{ display: "inline-block", borderBottom: "1px solid #ccc" }}>
          Gatsby Garb Blog
        </h1>
        <h4>
          {data.allMarkdownRemark.totalCount} Post
          {data.allMarkdownRemark.totalCount > 1 ? "s" : ""}
        </h4>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          return (
            <div key={node.id}>
              <h3>
                <Link to={`/posts/${node.fields.slug}`}>
                  {node.frontmatter.title}
                </Link>{" "}
                <span style={{ color: "#bbb" }}>- {node.frontmatter.date}</span>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          );
        })}
        {/* Pagination Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            maxWidth: 300,
            margin: "0 auto"
          }}
        >
          {!isFirstPage && (
            <Link to={prevPage} rel="Prev">
              Prev Page
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
              {index + 1}
            </Link>
          ))}
          {!isLastPage && (
            <Link to={nextPage} rel="Next">
              Next Page
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date(formatString: "MMMM Do YYYY")
          }
          excerpt(pruneLength: 25, truncate: false)
        }
      }
    }
  }
`;

import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout.js";

const ProductTemplate = ({ data: { contentfulProduct }, location }) => {
  return (
    <Layout>
      <div style={{ marginLeft: "0 auto", width: "100%", textAlign: "center" }}>
        {/* product info */}
        <h2>
          {contentfulProduct.name} -{" "}
          <span style={{ color: "#ccc" }}>
            Added on {contentfulProduct.createdAt}
          </span>
        </h2>
        <h4>${contentfulProduct.price}</h4>
        <p>{contentfulProduct.description}</p>
        <button
          className="snipcart-add-item"
          data-item-id={contentfulProduct.slug}
          data-item-price={contentfulProduct.price}
          data-item-image={contentfulProduct.image.file.url}
          data-item-name={contentfulProduct.name}
          data-item-url={location.pathname}
          style={{
            backgroundColor: "darkorange",
            color: "#fff",
            padding: "10px",
            border: "0 none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Add to cart
        </button>
        <Img
          fluid={contentfulProduct.image.fluid}
          style={{ margin: "0 auto", maxWidth: "600px" }}
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      price
      description
      slug
      createdAt(formatString: "MMMM Do, YYYY @ h:mm:ss a")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`;

export default ProductTemplate;

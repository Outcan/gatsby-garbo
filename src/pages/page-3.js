import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";

const getImageData = graphql`
  {
    allFile {
      totalCount
      edges {
        node {
          name
          relativePath
          extension
          size
          birthtime
        }
      }
    }
  }
`;

const PageThree = () => {
  const data = useStaticQuery(getImageData);
  return (
    <Layout>
      <h1>Hello from page 3!!</h1>
      <h3>Image file data</h3>
      <table>
        <thead>
          <tr>
            <th>Relative Path</th>
            <th>Size of Image</th>
            <th>Extension</th>
            <th>Birthtime</th>
          </tr>
        </thead>
        <tbody>
          {data.allFile.edges.map(({ node }, index) => {
            return (
              <tr key={index}>
                <td>{node.relativePath}</td>
                <td>{node.size}</td>
                <td>{node.extension}</td>
                <td>{node.birthtime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/page-2">Go to page 2</Link>
    </Layout>
  );
};

export default PageThree;

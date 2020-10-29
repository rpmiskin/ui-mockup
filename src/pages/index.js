import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { graphql } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import Link from '../components/Link';

const useStyles = makeStyles({
  root: {
    width: 600
  },
  slider: {
    marginTop: 40
  }
});

// Look up all JS pages that have a frontmatter section.
// sorted by the written field so they are newest->oldest
export const query = graphql`
  {
    allJavascriptFrontmatter(sort: {fields: frontmatter___written, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            path
            description,
            written
          }
          id
        }
      }
    }
  }
`
/**
 * Expects to be given a frontmatter with title, description and path.
 * 
 * @param {*} props 
 */
function MockupLink(props) {
  const {frontmatter, id} = props;
  const path = `/${frontmatter.path}`;
  const {title, description} = frontmatter;
  return (<Grid container justify = "flex-start" alignItems="center" key={id}>
            <Grid item xs={2}>
              <Link to={path}>
                <h3>{title}</h3>
              </Link>
            </Grid>
            <Grid item xs="10">
              {description}
            </Grid>
          </Grid>);
}

export default function Index(props) {
  const {data} = props;

  const classes=useStyles();
  return (
    <Container maxWidth="md">
      <Box my={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          UI Mockups
        </Typography>
        {
          data.allJavascriptFrontmatter.edges.map(({ node }, id) => {
            return (
                <MockupLink frontmatter={node.frontmatter} id={id}/>
            );
          })
        }
      </Box>
    </Container>
  );
}

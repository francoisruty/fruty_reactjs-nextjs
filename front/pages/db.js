import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../src/ProTip';
import Link from '../src/Link';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Material-UI
      </MuiLink>
      {' team.'}
    </Typography>
  );
}

export default function Db() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(window.location.origin + "/api/values")
      .then(result => setData(result.data.data));
  }, []);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example (Test database connection)
        </Typography>
        <div>
        Database content:
        </div>
        {data.map(item => (
          <li key={item.id}>
            {item.value}
          </li>
        ))}
        <Link href="/">Go to the main page</Link>
        <ProTip />
        <MadeWithLove />
      </Box>
    </Container>
  );
}

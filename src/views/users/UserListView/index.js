import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get('/api/users');

      if (isMountedRef.current) {
        setUsers(response.data.users);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Page className={classes.root} title="Customer List">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results users={users} />{' '}
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;

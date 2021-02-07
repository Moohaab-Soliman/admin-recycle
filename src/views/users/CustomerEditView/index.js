import React, { useState, useCallback, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import CustomerEditForm from './CustomerEditForm';
import Header from './Header';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerEditView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get('/api/users/1');

      if (isMountedRef.current) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) {
    return null;
  }

  return (
    <Page className={classes.root} title="Customer Edit">
      <Container maxWidth={false}>
        <Header />
      </Container>
      <Box mt={3}>
        <Container maxWidth="lg">
          <CustomerEditForm user={user} />
        </Container>
      </Box>
    </Page>
  );
};

export default CustomerEditView;

import React, { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Details from './Details';
import Invoices from './Invoices';
import Logs from './Logs';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerDetailsView = props => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [user, setUser] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');

  const tabs = [
    { value: 'details', label: 'Details' },
    { value: 'invoices', label: 'Invoices' },
    { value: 'logs', label: 'Logs' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getUser = useCallback(async () => {
    const {
      match: { params }
    } = props;
    console.log(params.userId);
    try {
      const response = await axios.get('/api/users/');

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
    <Page className={classes.root} title="Customer Details">
      <Container maxWidth={false}>
        <Header user={user} />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'details' && <Details user={user} />}
          {currentTab === 'invoices' && <Invoices />}
          {currentTab === 'logs' && <Logs />}
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerDetailsView;

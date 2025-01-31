import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import Label from 'src/components/Label';

const useStyles = makeStyles(theme => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const UserInfo = ({ user, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Customer info" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Email</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {user.email}
              </Typography>
              <Label color={user.isVerified ? 'success' : 'error'}>
                {user.isVerified ? 'Email verified' : 'Email not verified'}
              </Label>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Phone</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {user.phone}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Country</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {user.country}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              State/Region
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {user.state}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Address 1
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {user.address1}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Address 2
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {user.address2}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
        <Button startIcon={<LockOpenIcon />}>Reset &amp; Send Password</Button>
        <Button startIcon={<PersonIcon />}>Login as user</Button>
      </Box>
    </Card>
  );
};

UserInfo.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default UserInfo;

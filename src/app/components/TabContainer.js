import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


export function TabContainer(props) {
  // const intl = useIntl();
    return <Typography component="div">{props.children}</Typography>;
  }

  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
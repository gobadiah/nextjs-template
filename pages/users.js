import React from 'react';
import PropTypes from 'prop-types';

import { readUsers } from '../api';
import hoc from '../utils/hoc';

const UserList = props => (
  <div>
    {props.users.data.map(user => (
      <h1 key={user.id} >{user.attributes.email}</h1>
    ))}
  </div>
);

UserList.propTypes = {
  users: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  users: state.api.users || { data: [] },
});

export default hoc([], mapStateToProps, null, [readUsers])(UserList);

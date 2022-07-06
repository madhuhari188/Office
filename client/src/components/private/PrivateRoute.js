import React from 'react';
import {Route,Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ isLogged,children})=>{
    if(!isLogged){
        return <Navigate to="/login"/>  
     }
    return  children
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
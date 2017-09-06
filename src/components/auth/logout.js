import React, { Component, PropTypes } from 'react';


class Logout extends Component {

    constructor(context) {
        super(context)
    }

    componentDidMount(){
        window.localStorage.setItem('c2m_authorized', false)
        this.props.history.push('/')
    }

    render() {
        return (
            <h1 className="loading-text">
                Logging out...
            </h1>
        );
    }
}

Logout.propTypes = {
    router: PropTypes.object.isRequired
};

export default Logout;
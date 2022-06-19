import React from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import {
//     increment,
//     incrementAsync,
//     decrement,
//     decrementAsync,
// } from '../../reducers/counter'

const Home = props => (
    <div>
        <h1>Landing Page Coming Soon.</h1>
    </div>
)

// const mapStateToProps = ({ counter }) => ({
//     count: counter.count,
//     isIncrementing: counter.isIncrementing,
//     isDecrementing: counter.isDecrementing,
// })

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     increment,
//     incrementAsync,
//     decrement,
//     decrementAsync,
//     changePage: () => push('/about-us')
// }, dispatch)

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Home)
export default Home
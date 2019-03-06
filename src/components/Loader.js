import React from 'react'
import LoadingImage from '../images/spinner.gif'

const Loader = (props) => {
    return <img src={LoadingImage} width={props.size} alt="Loading page"/>
}

export default Loader
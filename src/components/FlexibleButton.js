import React from 'react'
import Button from 'react-bootstrap/Button'

const FlexibleButton = (props) => {
    return <button style={{fontSize: props.textSize + 'px', backgroundColor:props.color}}>{props.children}</button>
}

export default FlexibleButton
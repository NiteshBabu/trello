import React from 'react'

export function Button() {
    const styles = {
            background: 'seagreen',
            color: '#fff',
            fontWeight: '900',
            fontSize: '10px',
            border:'none',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
    }
    return (
        <button style={styles}>+</button>
    )
}



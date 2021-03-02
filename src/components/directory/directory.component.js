import React from 'react'

import './directory.styles.scss'
import MenuItem from '../menu-item/menu-item.component'
import {sections} from '../../directory.data'

const Directory = () => {
    return(
        <div className='directory-menu'>
            {sections.map(({title, imageUrl, id, size}) => <MenuItem key={id} size={size} title={title.toUpperCase()} imageUrl={imageUrl}/>)}
        </div>
    )
}

export default Directory
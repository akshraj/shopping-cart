import React from 'react'

import './directory.styles.scss'
import MenuItem from '../menu-item/menu-item.component'
import {sections} from '../../directory.data'

const Directory = () => {
    return(
        <div className='directory-menu'>
            {sections.map(({id, ...otherSections}) => <MenuItem key={id} {...otherSections}/>)}
        </div>
    )
}

export default Directory
import React from 'react';

const IcStar = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={props.size || '24'} height={props.size || '24'} fill={props.fill || '#000000'} style={props.style} className={props.className} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
};

export {IcStar};
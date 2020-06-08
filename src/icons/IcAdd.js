import React from 'react';

const IcAdd = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={props.size || '24'} height={props.size || '24'} fill={props.fill || '#000000'} style={props.style} viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;
};

export {IcAdd};
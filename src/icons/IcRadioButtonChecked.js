import React from 'react';

const IcRadioButtonChecked = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={props.size || '24'} height={props.size || '24'} fill={props.fill || '#000000'} style={props.style} viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>;
};

export {IcRadioButtonChecked};
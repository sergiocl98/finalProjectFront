import React from 'react';

const MyMarker = ({ name, lat, lng, $hover }) => {
  const handleClick = e => {
    alert('Site name ' + name);
  };
  return (
    <div
      key={name}
      lat={lat}
      lng={lng}
      style={{
        position: "relative",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        height: '4rem',
        width: '4rem',
        backgroundColor: $hover? "red":"blue",
        color:"white",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}

      onClick={handleClick}
    >
      <p>{name}</p>
    </div>
  );
};

export default MyMarker;

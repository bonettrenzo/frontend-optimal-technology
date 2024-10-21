import React from 'react';

const NoData = ({ message = "No hay información disponible.", onRefetch }) => {
  return (
    <div style={styles.container}>
      <p>{message}</p>
        <button onClick={onRefetch} style={styles.button}>
          Reintentar
        </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    color: '#6c757d',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default NoData;

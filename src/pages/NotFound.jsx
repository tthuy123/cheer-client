import React from 'react';

const NotFound = () => {
  const notFoundStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    animation: 'slideInFromBottom 0.5s ease-out',
  };

  const keyframesStyle = `
    @keyframes slideInFromBottom {
      from {
        transform: translateY(50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;

  return (
    <div>
      <style>{keyframesStyle}</style>
      <div style={notFoundStyle}>
        <h1>404: Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
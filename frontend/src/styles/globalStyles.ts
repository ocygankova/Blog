export const globalStyles = `
  html, body {
  height: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  },
  
  #root {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  },

  main {
    flex-grow: 1;
  },
  
  header {
  flex-grow: 0;
  flex-shrink: 0;
  },
  
  footer {
  flex-grow: 0;
  flex-shrink: 0;
  }
`;

export const MuiCssBaseline = {
  styleOverrides: `
  html, body {
  height: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  },
  
  #__next {
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
  
  button {
  color: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
}
`,
};

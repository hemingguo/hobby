import React from 'react'
import ReactDOM from 'react-dom/client'
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import NavDrawerDefault from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <FluentProvider theme={webLightTheme}>
      <NavDrawerDefault />
    </FluentProvider>

  </React.StrictMode>,
)

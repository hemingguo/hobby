import React from 'react'
import ReactDOM from 'react-dom/client'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import Reg from './register_app.tsx'


ReactDOM.createRoot(document.getElementById('register')!).render(
    <React.StrictMode>

        <FluentProvider theme={webLightTheme}>
            <Reg />
        </FluentProvider>

    </React.StrictMode>,
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import { FluentProvider, webLightTheme} from '@fluentui/react-components'
import Welcome from './logic_app'


ReactDOM.createRoot(document.getElementById('logic')!).render(
    <React.StrictMode>

        <FluentProvider theme={webLightTheme}>
            <Welcome />
        </FluentProvider>

    </React.StrictMode>,
)
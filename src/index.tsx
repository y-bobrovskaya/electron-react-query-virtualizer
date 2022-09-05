import React from 'react';
import {createRoot} from 'react-dom/client';
import { Main } from './Main';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
`;

const queryClient = new QueryClient();

const container = document.getElementById('root') as any;
createRoot(container).render(
    <>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
            <Main />
        </QueryClientProvider>
    </>
);

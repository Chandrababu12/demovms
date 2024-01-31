import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n';
import './_metronic/assets/fonticon/fonticon.css';
import './_metronic/assets/keenicons/duotone/style.css';
import './_metronic/assets/keenicons/outline/style.css';
import './_metronic/assets/keenicons/solid/style.css';
import './_metronic/assets/sass/style.scss';
import './_metronic/assets/sass/plugins.scss';
import './_metronic/assets/sass/style.react.scss';
import { AppRoutes } from './app/routing/AppRoutes';
import { AuthProvider, setupAxios } from './app/modules/auth';
import './sass/custom.scss';

setupAxios(axios);
Chart.register(...registerables);

const apolloClient = new ApolloClient({
  uri:   `${process.env.REACT_APP_BASE_URL}`,
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();
const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <MetronicI18nProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </MetronicI18nProvider>
      </ApolloProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

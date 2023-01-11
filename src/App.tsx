import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "./Layout";
import { Split } from "./split/Split";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Split />
      </Layout>
    </QueryClientProvider>
  );
};

export default App;

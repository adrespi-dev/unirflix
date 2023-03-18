import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { Layout } from "./Layout";
import { Split } from "./split/Split";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Layout>
          <Split />
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;

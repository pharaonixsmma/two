import { Switch, Route, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";
import StudioHome from "@/pages/StudioHome";

function Router() {
  return (
    <Switch>
      <Route path="/" component={StudioHome} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;

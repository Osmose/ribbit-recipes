import { Route, Switch } from 'wouter';
import Landing from 'ribbit/components/Landing';
import { useAuthStore } from 'ribbit/state/auth';
import React from 'react';
import supabase from 'ribbit/supabase';
import Header from 'ribbit/components/Header';

export default function App() {
  // Initialize auth state
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  React.useEffect(() => {
    async function initAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    }
    initAuth();
  }, [setCurrentUser]);

  return (
    <div id="app-container">
      <Header />
      <Switch>
        <Route component={Landing} />
      </Switch>
    </div>
  );
}

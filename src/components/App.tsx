import { Route, Switch } from 'wouter';
import Landing from 'ribbit/components/Landing';
import { useAuthStore } from 'ribbit/state/auth';
import React from 'react';
import supabase from 'ribbit/supabase';
import HeaderAuth from 'ribbit/components/HeaderAuth';
import PageNotFound from 'ribbit/components/PageNotFound';
import { AppShell, Burger, MantineProvider, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from 'ribbit/components/App.module.css';

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

  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header className={styles.header}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" className={styles.burger} />
          <Title className={styles.title}>Ribbit Recipes</Title>
          <div className={styles.headerSpacer} />
          <div className={styles.headerAuthContainer}>
            <HeaderAuth />
          </div>
        </AppShell.Header>
        <AppShell.Navbar className={styles.navbar}>Navbar</AppShell.Navbar>
        <AppShell.Main>
          {/* Can't set padding on AppShell.Main since it uses it for positioning. */}
          <div className={styles.main}>
            <Switch>
              <Route path="/" component={Landing} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

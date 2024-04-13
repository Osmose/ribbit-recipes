import { Avatar, Button, Loader, Menu } from '@mantine/core';
import { useAuthStore, useCurrentUser } from 'ribbit/state/auth';
import { IconBrandDiscord, IconLogout } from '@tabler/icons-react';

export default function HeaderAuth() {
  const currentUser = useCurrentUser();
  const signInUser = useAuthStore((state) => state.signInUser);
  const signOutUser = useAuthStore((state) => state.signOutUser);

  async function handleClickSignIn(event: React.MouseEvent) {
    event.preventDefault();
    signInUser();
  }

  async function handleClickSignOut(event: React.MouseEvent) {
    event.preventDefault();
    signOutUser();
  }

  if (currentUser === undefined) {
    return <Loader color="gray" type="dots" />;
  } else if (currentUser) {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            variant="subtle"
            size="md"
            leftSection={<Avatar variant="light" radius="xl" size="sm" src={currentUser.user_metadata.avatar_url} />}
          >
            <span>{currentUser.user_metadata.custom_claims?.global_name ?? currentUser.user_metadata.full_name}</span>
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconLogout />} onClick={handleClickSignOut}>
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <Button variant="filled" size="sm" leftSection={<IconBrandDiscord />} onClick={handleClickSignIn}>
      Sign in
    </Button>
  );
}

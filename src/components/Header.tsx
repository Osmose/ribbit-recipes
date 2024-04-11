import { useAuthStore, useCurrentUser } from 'ribbit/state/auth';

export default function Header() {
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
    return (
      <div>
        <h1>Ribbit Recipes</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Ribbit Recipes</h1>
      {currentUser ? (
        <div>
          <span>
            Signed in as {currentUser.user_metadata.custom_claims?.global_name ?? currentUser.user_metadata.full_name}.
          </span>
          <a href="#" onClick={handleClickSignOut}>
            Sign out
          </a>
        </div>
      ) : (
        <a href="#" onClick={handleClickSignIn}>
          Sign in with Discord
        </a>
      )}
    </div>
  );
}

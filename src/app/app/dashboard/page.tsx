import { getCurrentUser } from '@/lib/session';

export default async function Dashboard() {
  const user = await getCurrentUser();

  return (
    <div>
      <div>
        <h1>App Page</h1>
        <h2>{JSON.stringify(user)}</h2>
      </div>
    </div>
  );
}

import LoginForm from './LoginForm';
import PostList from './PostList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-12">
        <LoginForm />
      </div>
      <PostList />
    </div>
  );
}

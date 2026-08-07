import TaskList from './components/TaskList';

export default function App() {
  return (
    <main style={{ maxWidth: 480, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>Tasks</h1>
      <TaskList />
    </main>
  );
}
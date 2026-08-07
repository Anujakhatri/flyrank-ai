import { useEffect, useState } from 'react';
import { listTasks, createTask, updateTask, deleteTask } from '../api';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Per-row edit state. `editingId` is the task currently being edited;
  // `draftTitle` is the in-progress string for that row.
  const [editingId, setEditingId] = useState(null);
  const [draftTitle, setDraftTitle] = useState('');

  // Load on mount. `ignore` guards against setState after unmount.
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await listTasks();
        if (!ignore) setTasks(data || []);
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    try {
      const created = await createTask(trimmed);
      setTasks((prev) => [...prev, created]);
      setTitle('');
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleToggleDone(task) {
    try {
      const updated = await updateTask(task.id, { done: !task.done });
      // Functional updater — never the captured `tasks` variable (stale-closure).
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDelete(id) {
    if (editingId === id) {
      setEditingId(null);
      setDraftTitle('');
    }
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  function startEdit(task) {
    setEditingId(task.id);
    setDraftTitle(task.title);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraftTitle('');
  }

  async function saveEdit(task) {
    const trimmed = draftTitle.trim();
    if (!trimmed) {
      cancelEdit();
      return;
    }
    if (trimmed === task.title) {
      cancelEdit();
      return;
    }
    try {
      const updated = await updateTask(task.id, { title: trimmed });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      cancelEdit();
    } catch (e) {
      setError(e.message);
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error)   return <p style={{ color: 'crimson' }}>Error: {error}</p>;

  return (
    <div>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task…"
          style={{ flex: 1, padding: 6 }}
        />
        <button type="submit">Add</button>
      </form>

      {tasks.length === 0 && <p>No tasks yet.</p>}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {tasks.map((task) => {
          const isEditing = editingId === task.id;
          return (
            <li
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 0',
                borderBottom: '1px solid #eee',
              }}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleToggleDone(task)}
              />

              {isEditing ? (
                <input
                  autoFocus
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter')  saveEdit(task);
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  style={{ flex: 1, padding: 4 }}
                />
              ) : (
                <span style={{ flex: 1, textDecoration: task.done ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
              )}

              {isEditing ? (
                <>
                  <button onClick={() => saveEdit(task)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(task)} aria-label="edit">✎</button>
                  <button onClick={() => handleDelete(task.id)} aria-label="delete">✕</button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
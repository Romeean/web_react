import { useMemo, useState } from 'react';
import { useFetchEmployees } from '../hooks/useFetchEmployees.jsx';
import EmployeeCard from '../components/EmployeeCard.jsx';

const ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

export default function About() {
  const { data, loading, error } = useFetchEmployees(ENDPOINT);
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const items = Array.isArray(data) ? data : [];
    if (!q) return items;
    const n = q.toLowerCase();
    return items.filter(u =>
      u.name.toLowerCase().includes(n) ||
      (u.company?.name || '').toLowerCase().includes(n)
    );
  }, [data, q]);

  return (
    <section className="team">
      <h2 className="team__title">Про нас</h2>
      <label>
        Пошук за ім’ям або компанією
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>
      {loading && <p role="status">Завантаження…</p>}
      {error && <p role="alert">Не вдалося завантажити співробітників: {error}</p>}
      {!loading && !error && (
        <div className="team__list">
          {list.map(user => <EmployeeCard key={user.id} user={user} />)}
          {list.length === 0 && <p>Нікого не знайдено.</p>}
        </div>
      )}
    </section>
  );
}

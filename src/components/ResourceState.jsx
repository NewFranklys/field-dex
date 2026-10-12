export default function ResourceState({ loading, error, retry, children }) {
  return (
    <div className="resource-state" role={error ? "alert" : "status"}>
      <p>
        {loading ? "Searching field database…" : error?.message || children}
      </p>
      {!loading && retry && (
        <button type="button" onClick={retry}>
          Try again
        </button>
      )}
    </div>
  );
}

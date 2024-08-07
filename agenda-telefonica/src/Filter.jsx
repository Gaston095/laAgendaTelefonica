export default function Filter({filterName, handleFilterNameChange}) {
  return (
    <>
      <label>filter shown with</label>
      <input type="text" value={filterName} onChange={handleFilterNameChange} />
    </>
  );
}

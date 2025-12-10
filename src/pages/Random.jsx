export default function Random() {
  function describeFeature() {
    return "This page will later show a random GIF using the GIPHY Random endpoint.";
  }

  return (
    <div className="page">
      <h1>Random GIF (Coming Soon)</h1>
      <p className="helper-text">{describeFeature()}</p>
    </div>
  );
}

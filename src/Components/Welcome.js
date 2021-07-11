const Welcome = () => {
  return (
    <div
      className="welcome"
      style={{
        marginBottom: "70px",
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="Welcome__text" style={{ fontWeight: "300" }}>
        Please login to comment or explore posts
      </h1>
    </div>
  );
};

export default Welcome;

export const withAuth = (Component) => (props) => {
  const login = localStorage.getItem("login");
  //   const login = false;

  if (login) {
    return <Component {...props} />;
  } else {
    return (
      <div className="lightbox-overlay" onClick={() => props.onClose()}>
        <div
          className="lightbox-content-nologin"
          onClick={(e) => e.stopPropagation()}
        >
          Please Login{" "}
          <span style={{ fontSize: "14px", color: "#444", marginLeft: "5px" }}>
            {" "}
            ( Protected by HOC )
          </span>
        </div>
      </div>
    );
  }
};

import { useEffect, CSSProperties, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function Home() {
  const [loading, setLoading] = useState(true);
  const [cookies, SetCookies] = useCookies();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1400);
  }, []);
  useEffect(() => {
    if (cookies.accessToken === undefined) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {loading ? (
        <BarLoader
          color="#cb95957d"
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loading"
          style={{
            width: "200px",
          }}
        />
      ) : (
        <h2>Home</h2>
      )}
    </>
  );
}

export default Home;

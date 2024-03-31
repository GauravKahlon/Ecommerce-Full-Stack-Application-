import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
    return (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ScaleLoader color="#000" />
        </div>
    );
};

export default Loader;

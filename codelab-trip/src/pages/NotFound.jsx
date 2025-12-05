import { useParams } from "react-router-dom";

const NotFound = () => {
    const params = useParams();
    const filepath = params["*"];

    return (
        <div>
            <h2>404 - Not Found</h2>
            <p>The requested path "{filepath}" was not found in this application.</p>
        </div>
    );
};

export default NotFound;

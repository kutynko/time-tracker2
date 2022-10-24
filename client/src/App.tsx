import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    axios
      .get("/api/")
      .then((response) => setText(response.data))
      .catch(() => setText("error"));
  }, []);
  return <div className="App">{text}</div>;
}

export default App;
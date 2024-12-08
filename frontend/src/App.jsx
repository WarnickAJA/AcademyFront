import "./App.css";
import ItemList from "./components/ItemList/ItemList";
import items from "./data/data.json";
import ItemDetail from "./components/ItemDetail/ItemDetail";

import Login from "./components/Auth0/Login";
import Logout from "./components/Auth0/Logout";
import Profile from "./components/Auth0/Profile";

import useFetch from "./hooks/useFetch";
import { useMemo } from "react";

function App() {
  const item = items[0];
  // Usar useMemo para garantizar que la URL no cambie entre renders
  const apiURL = useMemo(
    () => import.meta.env.VITE_API_URL + "api/courses",
    []
  );
  const body = {
    name: "Curso de Node.js Avanzado",
    description:
      "Aprende Node.js a un nivel avanzado para construir aplicaciones robustas...",
    category: "Programación",
    subcategory: "Backend",
    duration: 40,
    price: 120.5,
    instructor: "ObjectId('648e1234567a9b23cdef4567')",
    startDate: "2024-12-01T00:00:00.000+00:00",
    endDate: "2025-01-31T23:59:59.000+00:00",
    status: "active",
    level: "intermediate",
    image: "https://example.com/images/nodejs-course.jpg",
    video: "https://example.com/videos/intro-nodejs.mp4",
  };
  const { data, error } = useFetch(apiURL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  //const { data, error } = useFetch(apiURL);

  console.log(data, error);
  return (
    <>
      <Login />
      <Logout />
      <Profile />
      {/* <ItemList items={items} />
      <ItemDetail item={item} /> */}
    </>
  );
}

export default App;

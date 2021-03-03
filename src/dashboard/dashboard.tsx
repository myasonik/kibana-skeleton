import { useParams } from "react-router-dom";

export default function Dashboard() {
  let { id } = useParams<{ id: string }>();

  return <h1>Dashboard: {id}</h1>;
}

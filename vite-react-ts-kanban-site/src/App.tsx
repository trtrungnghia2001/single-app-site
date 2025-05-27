import { Toaster } from "react-hot-toast";
import ModelKanbanForm from "./components/ModelKanbanForm";
import BoardPage from "./pages/BoardPage";

const App = () => {
  return (
    <>
      <BoardPage />
      <ModelKanbanForm />
      <Toaster />
    </>
  );
};

export default App;

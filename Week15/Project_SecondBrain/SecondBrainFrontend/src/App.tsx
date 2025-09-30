import { Share2, Plus } from "lucide-react";
import "./App.css";
import { Button } from "./components/Button";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex gap-4">
        <Button
          variant="primary"
          text="Add Content"
          startIcon={<Plus size={16} color="white" />}
        />
        <Button
          variant="secondary"
          text="Share"
          startIcon={<Share2 size={16} color="currentColor" />}
        />
      </div>
    </div>
  );
};

export default App;

import { Share2,Plus } from "lucide-react";
import { Button } from "./components/Ui/Button";

const App = () => {
  return (
    <div className="p-6">
      <Button
        variant="primary"
        size="sm"
        text="Share"
        startIcon={<Plus size={18} color="white" />}
        onClick={() => alert("Button Clicked!")}
      />
      <Button
        variant="primary"
        size="sm"
        text="Add Content"
         startIcon={<Share2 size={18} color="white" />}
        onClick={() => alert("Button Clicked!")}
      />
    </div>
  );
};

export default App;

    import { Share2, Plus } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";

const Dashboard = () => {
  const [modalOpen,setModalOpen]=useState(false);



  return (
    <div>
      <Sidebar/>
    <div className="min-h-screen bg-gray-500 flex flex-col items-center p-6">
      <CreateContentModal open={modalOpen} onClose={()=>{
        setModalOpen(false)
      }}/>
      
      {/* Header buttons */}
      <div className="flex gap-4 self-end mb-6">
        <Button
        onClick={()=>{
          setModalOpen(true)
        }}
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

      <div className=" gap-6 max-w-2xl w-full flex">
        <Card
          type="twitter"
          link="https://x.com/imVkohli/status/1147837252552146944"
          title="X.com"
        />
        <Card
          type="youtube"
          link="https://www.youtube.com/watch?v=c-FKlE3_kHo&list=RDc-FKlE3_kHo&start_radio=1"
          title="YouTube"
        />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

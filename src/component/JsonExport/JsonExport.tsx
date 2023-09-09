import React from "react";
import { format } from "date-fns";

interface JsonExportProps {
  data: any; // Use a specific type if you have one for your JSON data
}

const JsonExport: React.FC<JsonExportProps> = ({ data }) => {
  const downloadJsonFile = () => {
    if (!data) {
      console.log("No data to export.");
      return;
    }

    const jsonStr = JSON.stringify(data, null, 2); // Convert data to formatted JSON string
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const currentDate = new Date();
    const timestamp = format(currentDate, "dd-MM-yyyy-HH-mm-ss");

    link.download = `mind-mate-data-${timestamp}.json`;

    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={downloadJsonFile}>Export Data</button>
    </div>
  );
};

export default JsonExport;

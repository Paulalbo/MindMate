import "./style.css";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ setJsonData }) => {
  const [weekday, setWeekday] = useState("");
  useEffect(() => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const currentWeekday = daysOfWeek[currentDate.getDay()];
    setWeekday(currentWeekday);
  }, []);

  const [importedJsonData, setImportedJsonData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("jsonData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setImportedJsonData(parsedData);
    }
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "text/json": [".json"],
      },
      onDrop: (acceptedFiles) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsedData = JSON.parse(event.target.result);
            setJsonData(parsedData);
            setImportedJsonData(parsedData);
            localStorage.setItem("jsonData", JSON.stringify(parsedData));
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        };
        reader.readAsText(acceptedFiles[0]);
      },
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <div key={file.path}>
      <h4>Accepted</h4>
      <p>
        {file.path} ({file.size} bytes) has been imported
      </p>
    </div>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path}>
      <h4>Accepted files</h4>
      <ul>
        <li>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map((e) => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>
          Drag 'n' drop your mind-mate-data file here, or click to select files
        </p>
      </div>
      <aside>
        {acceptedFileItems}
        {fileRejectionItems}
        <div>
          {importedJsonData ? (
            <p>
              Hi, {importedJsonData.name}, hope you're having a wonderful{" "}
              {weekday}!
            </p>
          ) : (
            <p>No JSON data to display</p>
          )}
        </div>
      </aside>
    </section>
  );
};

export default DropZone;

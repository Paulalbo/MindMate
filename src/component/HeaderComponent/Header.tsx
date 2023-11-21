import reactLogo from "../../assets/logo.svg";
import { useState, useEffect } from "react";
import "./style.css";

const Header = () => {
  const [weekday, setWeekday] = useState<string>("");
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
  const [importedJsonData, setImportedJsonData] = useState<any | null>(null);
  useEffect(() => {
    const storedData = localStorage.getItem("mindMateData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setImportedJsonData(parsedData);
    }
  }, []);
  return (
    <header>
      <a href="./">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h2 className="title">outsorce your mind and rest</h2>
      {importedJsonData ? (
        <p>
          {" "}
          Hi {importedJsonData.name}, hope you're having a wonderful {weekday}!
        </p>
      ) : (
        <p>No JSON data to display</p>
      )}
    </header>
  );
};

export default Header;

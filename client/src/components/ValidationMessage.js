import { useEffect,useState } from "react";

const ValidationMessage = ({ text, type }) => {
  const [showMessage,setShowMessage] = useState(true);
  useEffect(()=>{
     setTimeout(()=>{
        setShowMessage(false);
     },3000);
  },[showMessage]);
  return (
    <>
      {showMessage && (
        <div className={type === "success" ? "bg-green-500 validation"  : "bg-red-500 validation"}>
          <p className="text-white font-bold text-center">
            {text}
          </p>
        </div>
      )}
    </>
  );
};

export default ValidationMessage;

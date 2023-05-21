const Perks = ({selected,onChange}) => {
  const handleCheckBox = (e) =>{
    const {checked,name} = e.target;
    console.log(checked,name);
    if(checked){
      onChange([...selected,name])
    }else{
      onChange([...selected.filter(item => item !== name)])
    }
  }
  return (
    <>
      <p className="text-gray-800 text-left text-sm ml-2">
        Select All the perks of the place
      </p>
      <div className="text-left flex gap-20">
        <div
          className="w-md"
          style={{ display: "inline-block", marginLeft: "2px" }}
        >
          <label className="flex border border-gray-500 p-2 gap-3 cursor-pointer">
            <input type="checkbox" checked={selected.includes('Wifi')} onChange={handleCheckBox} name='Wifi' />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
            <span>Wifi</span>
          </label>
        </div>
        <div style={{ display: "inline-block", marginLeft: "2px" }}>
          <label className="flex border border-gray-500 p-2 gap-3 cursor-pointer">
            <input type="checkbox" checked={selected.includes('TV')} onChange={handleCheckBox} name='TV' />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <span>TV</span>
          </label>
        </div>
        <div style={{ display: "inline-block", marginLeft: "2px" }}>
          <label className="flex border border-gray-500 p-2 gap-3 cursor-pointer">
            <input type="checkbox" checked={selected.includes('breakfast')} name='breakfast' onChange={handleCheckBox}  />
            <span>Breakfast</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default Perks;

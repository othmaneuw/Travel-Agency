import { Link, useParams } from "react-router-dom";

const Places = () => {
  const headingStyle = "text-left text-2xl text-gray-500 mb-3 ml-4";

  const { action } = useParams();
  console.log(action);
  return (
    <div>
      {action !== "new" && (
        <Link
          className="inline-flex bg-primary text-white py-2 px-4 rounded-full"
          to="/account/places/new"
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new
        </Link>
      )}
      {action === "new" && (
        <div>
          <form>
            <h2 className={headingStyle}>Title</h2>
            <input
              type="text"
              placeholder="Title , for exp 7 days of paradise in Bahamas !"
            />
            <h2 className={headingStyle}>Address</h2>
            <input type="text" placeholder="Adress" />
            <h2 className={headingStyle}>Photos</h2>
            <p className={`text-left text-gray-600 mb-3 ml-4 text-md`}>
              More = Better
            </p>
            <div className="flex gap-2 align-center">
              <input type="text" placeholder="Upload images by link ...jpg" />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add photo
              </button>
            </div>
            <div className="text-left mt-2">
              <button
                className={`border border-gray-300 rounded-2xl px-10 py-4 text-gray-500 flex gap-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                Upload
              </button>
            </div>
            <h2 className={headingStyle}>Description</h2>
            <textarea />
            <h2 className={headingStyle}>Perks</h2>
            <p className="text-gray-800 text-left text-sm ml-2">
              Select All the perks of the place
            </p>
            <div className="text-left flex gap-20">
              <div className="w-md" style={{display : 'inline-block',marginLeft : '2px'}}>
                <label className="flex border border-gray-500 p-2 gap-3 cursor-pointer">
                  <input type="checkbox" />
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
              <div style={{display : 'inline-block',marginLeft : '2px'}}>
                <label className="flex border border-gray-500 p-2 gap-3 cursor-pointer">
                  <input type="checkbox" />
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
              <div style={{display : 'inline-block',marginLeft : '2px'}}>
                <label className="flex border border-gray-500 p-2 gap-3 cursor-pointer">
                  <input type="checkbox" />
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
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                  <span>Free parking spot</span>
                </label>
              </div>
            </div>
            <h2 className={headingStyle}>Extra Info</h2>
            <textarea />
          </form>
        </div>
      )}
    </div>
  );
};

export default Places;

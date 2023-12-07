import axios from "axios";
import { useRef, useState } from 'react';
import 'http://localhost:8000/src/App.css';
import youtube_parser from 'http://localhost:8000/src/helpers';

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  // const [mp3Title, setMP3Title] = useState(null); // state to hold mp3 title for display, line 31

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputUrlRef.current.value); // log to monitor what the input is

    const youtubeID = youtube_parser(inputUrlRef.current.value);
    // console.log("youtubeID:", youtubeID); // log to monitor parser output of user's link

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: { id: youtubeID },
    };
    // console.log("Request options:", options); // console log to investigate options object and if the api key is appropriate
    axios(options)
      .then(res => {
        // console.log("res:", res); // response object to pull mp3's title
        // setMP3Title(res.data.title);  // setting an mp3 title for display, add {mp3Title} to line 51
        setUrlResult(res.data.link);
        inputUrlRef.current.value = ""; //reset for next
      })
      .catch(error => console.error("Error:", error));
  };

  // input needs value
  return (
    <div className='content'>
      <>
        <h1 className='page_title light_blue'>WHT Downloader</h1>
        <hr className="hr_separator" />
        <p className="content_description light_blue">Lien Youtube ici</p>
        <form className='form' onSubmit={handleSubmit}>
          <input ref={inputUrlRef} className='form_input light_blue' type='text' placeholder='Paste a Youtube URL...'></input>
          <button type='submit' className='form_button light_blue'>Convert</button>
        </form>

        {urlResult ?
          <a target="_blank" rel="noreferrer" href={urlResult} className="download_link light_blue">Telecharger MP3</a>
          : ""}
      </>
      <div className="footer">
        <hr className="hr_separator" />
        <span className="light_blue">
          Code by <a href="https://github.com/grafuj/youtube-mp3-downloader">grafuj</a>.
        </span>
      </div>
    </div>
  );
}

export default App;

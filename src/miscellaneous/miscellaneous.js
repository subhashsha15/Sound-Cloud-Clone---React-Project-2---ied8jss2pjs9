import axios from "axios";
// This function returns the TOTAL TIME OF ALL THE SONGS in a single ALBUM
const secondsToHMS = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

//This function returns the difference of DATE OF RELEASE and CURRENT DATE in words  
const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const now = new Date();
  const timeDifference = now - date;

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (timeDifference < minute) {
    return 'just now';
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `updated ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `updated ${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < month) {
    const daysAgo = Math.floor(timeDifference / day);
    return `updated ${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < year) {
    const monthsAgo = Math.floor(timeDifference / month);
    return `updated ${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifference / year);
    return `updated ${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

//This is a header object used inside every axios API calls 
const headers = {
  'projectId': 'ied8jss2pjs9',
};

const generateThreeDigitRandomNumber = () => {
  // Generate a random number between 0 and 899, then add 1000
  const randomNumber = Math.floor(Math.random() * 900) + 100;
  const suffix = Math.random() < 0.5 ? "K" : "M"; // Randomly select "K" or "M"
  const result = `${randomNumber}${suffix}`;

  return result;
}
const generateTwoDigitRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 90) + 10;
  return randomNumber;
}
const generateFourDigitRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  return randomNumber;
}

const artistApiCall = (aristsSongArray) => {
  const promises = aristsSongArray.map((songId) => {
    return axios.get(`https://academics.newtonschool.co/api/v1/music/song/${songId}`, { headers })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  return Promise.all(promises);
}
export {
  secondsToHMS,
  formatDate,
  headers,
  generateThreeDigitRandomNumber,
  generateTwoDigitRandomNumber,
  generateFourDigitRandomNumber,
  artistApiCall
};
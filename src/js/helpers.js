import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///AJAX FUNCTION
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    //handle error
    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

/*
//get and return resolved promise
export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    //handle error
    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }

    return data;
  } catch (error) {
    //rethrow error because we want to handle it in module.js
    throw error;
  }
};

//send JSON to API
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPOST = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });

    const response = await Promise.race([fetchPOST, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    //handle error
    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};
*/

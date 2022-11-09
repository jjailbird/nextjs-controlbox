const timeoutPolling = (func, timeout, maxAttempts = -1) => {
  if (maxAttempts === 0) {
    return;
  }
  setTimeout(async () => {
    try {
      await func();
    } catch (error) {
      console.error(error);
    }
    timeoutPolling(func, timeout, maxAttempts - 1);
  }, timeout);
};

const intervalPolling = (func, interval, maxAttempts = -1) => {
  let attempts = 0;
  let intervalId = setInterval(() => {
    if (maxAttempts === attempts) {
      clearInterval(intervalId);
      return;
    }
    attempts++;
    func();
  }, interval);
};

const sleep = (timeout = 100) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const sleepPolling = async (func, validateFunc, timeout) => {
  let result = await func();
  while (!validateFunc(result)) {
    await sleep(timeout);
    try {
      result = await func();
    } catch (e) {
      console.log(e.message);
    }
  }
  return result;
}

const longPolling = async (func, validateFunc, timeout) => {
  try {
    let response = await func();
    if (response.status === 200 && validateFunc(response)) {
      return response;
    }
    // status 502 is a connection timeout
    if (response.status !== 502) {
      // when not connection timeout, sleep and try
      await sleep(timeout);
    }
  } catch (error) {
    await sleep(timeout);
  }
  return await longPolling(func, validateFunc, timeout);
}

const asyncInterval = async (callback, ms, triesLeft = 5, skiperr) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {

      try {
        await callback()
        if (triesLeft <= 1) {
          resolve();
          clearInterval(interval);
        }
        triesLeft--
      }
      catch (e) {
        if(!e.message.includes(skiperr)) {
          reject(e)
          clearInterval(interval)
          console.log(skiperr)
        }
      }
    }, ms);
  });
}

module.exports = {
  intervalPolling,
  timeoutPolling,
  sleepPolling,
  longPolling,
  asyncInterval,
  sleep
}
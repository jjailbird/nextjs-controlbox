const { Server } = require("socket.io");
const { exec } = require("child_process");
const axios = require('axios')
const io = new Server({});
const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')


io.on("connection", (s) => {
  console.log('client connected')

  s.on('disconnect', (reason) => {
    console.log('client disconnected:', reason)
  })

  s.on('backend_script', async (arg) => {
    let command = ''
    let downloadResult = false
    switch (arg) {
      case 'ces_service1.sh':
        downloadResult = await downloadFile(`${process.env.DOWNLOAD_HOST}/${arg}`)
        command = 'cmd_DeployNewService'
        break;
      case 'ces_service2.sh':
        downloadResult = await downloadFile(`${process.env.DOWNLOAD_HOST}/${arg}`)
        command = 'cmd_DeployUpgradeService'
        break;
      case 'ces_enable_sdn.sh':
        downloadResult = true
        command = 'cmd_EnableSDN'
        break;
      case 'ces_disable_sdn.sh':
        downloadResult = true
        command = 'cmd_DisableSDN'
        break;
      case 'ces_reset.sh':
        downloadResult = true
        command = 'cmd_Reset'
        break;
    }

    if (downloadResult == true) {
      const command0 = `chmod +x ~/ces/scripts/${arg}`
      const command1 = `sh ~/ces/scripts/${arg}`

      var result = exec(`${command0} && ${command1}`,
        (error, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
        });
      s.emit('backend_resonse', arg)

      axios(`${process.env.NTM_HOST}:${process.env.NTM_PORT}/buttonevent/${command}`)
        .then(function (res) { console.log('send ok!') })
        .catch(function (err) { console.log(err.request) });

    }

  })

  s.on('command:test', commandTest)
})

function commandTest(arg) {
  console.log('commandTest', arg)
}

// async function downloadFile(url, socket) {
//   const filename = Path.basename(url)
//   const filepath = `~/ces/scripts/${filename}`

//   console.log('filepath', filepath)
//   console.log('url', url)
//   const writer = Fs.createWriteStream(filepath)

//   const response = await Axios({
//     url,
//     method: 'GET',
//     responseType: 'stream',
//     // onDownloadProgress: (progressEvent) => {
//     //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); // you can use this to show user percentage of file downloaded
//     //   if (socket)
//     //     socket.emit('downloading_progress', percentCompleted)
//     // }
//   })

//   response.data.pipe(writer)

//   return new Promise((resolve, reject) => {
//     writer.on('finish', resolve)
//     writer.on('error', reject)
//   })
// }
async function downloadFile(fileUrl) {

  const filename = Path.basename(fileUrl)
  const filepath = `/root/ces/scripts/${filename}`

  console.log('filepath', filepath)
  console.log('url', fileUrl)

  const writer = Fs.createWriteStream(filepath);

  return Axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then(response => {

    //ensure that the user can call `then()` only when the file has
    //been downloaded entirely.

    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
        //no need to call the reject here, as it will have been called in the
        //'error' stream;
      });
    });
  });
}



module.exports = io

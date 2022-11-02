const { Server } = require("socket.io");
const { exec } = require("child_process");
const axios = require('axios')
const io = new Server({});

io.on("connection", (s) => {
  console.log('client connected')

  s.on('disconnect', (reason) => {
    console.log('client disconnected:', reason)
  })

  s.on('backend_script', (arg) => {
    var result = exec(`sh ~/ces/scripts/${arg}`,
      (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
      });

    s.emit('backend_resonse', arg)

    let command = ''
    switch (arg) {
      case 'ces_service1.sh':
        command = 'cmd_DeployNewService'
        break;
      case 'ces_service2.sh':
        command = 'cmd_DeployUpgradeService'
        break;
      case 'ces_enable_sdn.sh':
        command = 'cmd_EnableSDN'
        break;
      case 'ces_disable_sdn.sh':
        command = 'cmd_DisableSDN'
        break;
      case 'ces_reset.sh':
        command = 'cmd_Reset'
        break;
    }

    axios(`${process.env.NTM_HOST}:${process.env.NTM_PORT}/buttonevent/${command}`)
      .then(function (res) { console.log('send ok!') })
      .catch(function (err) { console.log(err.request) });
  })

  s.on('command:test', commandTest)
})

function commandTest(arg) {
  console.log('commandTest', arg)
}

module.exports = io

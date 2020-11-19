let {PythonShell} = require('python-shell')
var path = require("path")



funtion getEquipo(){

  var option = path.join(__dirname," \..\src\python");

  let pyshell = new PythonShell('magic.py', option);

  pyshell.on('messege', funtion(Message)){
    console.log(message);
  };
};

const express = require('express');
const { Server } = require('socket.io');
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express();

var mqtt=require('mqtt');
const e = require('cors');

var client  = mqtt.connect('mqtt://mqtt.bconimg.com');
console.log('çalıştı');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
const sunucu = app.listen(9000, () => {
  console.log('server çalışıyor');
})
const io = new Server(sunucu);

client.on('connect', function () {
  client.subscribe('/oetechvericiler');
});
 
client.on('message', function (topic, message) {
      const data = JSON.parse(message.toString())
      dataConvert(data.raw_beacons_data,data.id)
});


function dataConvert(data,id){
  var s = data.substring(0,data.length-1)
  var datam =  s.split(';')
  datam = datam.map((e)=>{
    let RSSI  =  parseInt(e.substring(56,58),16);
    let measuredPower = parseInt(e.substring(52,54),16)
    return {
      'id':id,
      'Mac': e.substring(0,12),
      'Beacon UUID':e.substring(14,44),
      'major':e.substring(44,48),
      'minor':e.substring(48,52),
      'measured power':e.substring(52,54),
      'Battery ':e.substring(54,56),
      'RSSI': e.substring(56,58),
      'distance' : Math.pow(10,((measuredPower-RSSI) /(10*(3))))
    }
  })
  datam.forEach(element => {
    //  console.log(element)
    io.emit('data',element)
  });
}

io.on('connection', (socket) => {
  socket.on('userAdd', (data) => {
      io.emit('message', JSON.stringify(data))
      // var datass = JSON.parse(data)
      useradd(data)
      console.log(data);
  })
  socket.on('sss',(cliendData)=>{
    var datas = cliendData.data.map((e)=>{
      e['distace'] = Math.pow(10,((e.txPower-e.rssi) /(10*(3))))
      return e
    })
    var order = datas.reduce((arr,crt)=>{
      if('distace' in arr){
          if(arr.distace < crt.distace){
            return arr
          }else{
            return crt
          }
      }else{
        return crt
      }
    }, {})
    io.emit('data2', order)
  })
  socket.emit('msg','Girdiniz')
});

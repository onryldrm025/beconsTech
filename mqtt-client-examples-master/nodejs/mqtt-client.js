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


function sendX(id){
  if(id == 'D43639AEA1AA' ){
    return 5
  }else if (id =='606405B2341B'){
    return 0
  }else{
    return -5
  }
}
function sendY(id){
  if(id == 'D43639AEA1AA' ){
    return -2
  }else if (id =='606405B2341B'){
    return 2
  }else{
    return 0
  }
}

function trackPoint(){
  console.log('asd')

}

function dataConvert(data,id){
  var s = data.substring(0,data.length-1)
  var datam =  s.split(';')
  
  datam = datam.map((e)=>{
    let RSSI  =  parseInt(e.substring(56,58),16) - 255;
    let measuredPower = parseInt(e.substring(52,54),16) -255
    return id ={
      'id':id,
      'x':  sendX(id),
      'y':  sendY(id),
      'Mac': e.substring(0,12),
      'Beacon UUID':e.substring(14,44),
      'major':e.substring(44,48),
      'minor':e.substring(48,52),
      'measured power':measuredPower,
      'Battery ':e.substring(54,56),
      'RSSI': RSSI,
      'r' : Math.pow(10,((measuredPower-RSSI) /(10*(3)))),
    }
  })
  let a = datam.reduce((arr,cur)=>{
    arr[cur.id.toString()]= cur
    return arr
  },{})

  // console.log(a);
  datam.forEach(element => {
    io.emit('data',element)
  });
}

io.on('connection', (socket) => {
  // socket.on('sss',(cliendData)=>{
  //   var datas = cliendData.data.map((e)=>{
  //     e['distace'] = Math.pow(10,((e.txPower-e.rssi) /(10*(3))))
  //     return e
  //   })
  //   var order = datas.reduce((arr,crt)=>{
  //     if('distace' in arr){
  //         if(arr.distace < crt.distace){
  //           return arr
  //         }else{
  //           return crt
  //         }
  //     }else{
  //       return crt
  //     }
  //   }, {})
  //   io.emit('data3', order)
  // })
  socket.on('sayHello',(data)=>console.log(data))
  socket.emit('msg','Girdiniz')
});

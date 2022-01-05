import 'dart:async';

import 'package:flutter/material.dart';

import 'package:flutter_beacon/flutter_beacon.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'BLE'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  var _streamMonitoring;
  IO.Socket? socket;

  StreamSubscription<RangingResult>? streamRanging;
  final regionBeacons = <Region, List<Beacon>>{};
  final beacons = <Beacon>[];

  sendSw(List<Beacon> as) {
    socket!.emit('sss', {"data": Beacon.beaconArrayToJson(as)});
  }

  initScanBeacon() async {
    await flutterBeacon.initializeScanning;
    final regions = <Region>[
      Region(
        identifier: 'Cubeacon',
        proximityUUID: 'B5b182c7-eab1-4988-aa99-b5c1517008d9',
      ),
      Region(
        identifier: 'BeaconType2',
        proximityUUID: 'B5b182c7-eab1-4988-aa99-b5c1517008d9',
      ),
    ];

    streamRanging =
        flutterBeacon.ranging(regions).listen((RangingResult result) {
      print(result);
      if (mounted) {
        setState(() {
          regionBeacons[result.region] = result.beacons;
          beacons.clear();
          regionBeacons.values.forEach((list) {
            beacons.addAll(list);
            if (list.isNotEmpty) {
              sendSw(list);
            }
          });
        });
      }
    });
  }

  @override
  void initState() {
    super.initState();
    socket = IO.io('ws://127.0.0.1:9000', <String, dynamic>{
      'transports': ['websocket'],
      'forceNew': true
    });
    socket?.onConnect((_) async {
      print('bağlandı');
    });

    initScanBeacon();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Aranıyor ',
            ),
            Text(beacons.length.toString()),
            const CircularProgressIndicator()
          ],
        ),
      ),
    );
  }
}

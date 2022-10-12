import React from "react";
import axios from "axios";
import { useMemo, useState } from "react";

interface IDevice {
  _id: string;
  name: string;
  num: string;
}

const Item = ({ device }: { device: IDevice }): JSX.Element => {
  return <li>{device.name}</li>;
};

function App() {
  const [devices, setDevices] = useState<Array<IDevice>>([]);

  const handleFetchLocalhost = async () => {
    try {
      const response = await axios.get("http://localhost:4445/api/v1/devices");
      setDevices(response.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const listDevice = useMemo(() => {
    return devices.map((device: IDevice) => (
      <Item key={device._id} device={device} />
    ));
  }, [devices]);

  return (
    <>
      <button onClick={handleFetchLocalhost}>Call Devices</button>
      <button onClick={() => setDevices([])}>Clear Devices</button>
      <h1>Devices</h1>
      <ul>{listDevice}</ul>
    </>
  );
}

export default App;

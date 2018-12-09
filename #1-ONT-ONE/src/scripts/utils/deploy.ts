import o3dapi from 'o3-dapi-core';
import o3dapiOnt from 'o3-dapi-ont';
o3dapi.initPlugins([o3dapiOnt]);

o3dapi.ONT.getNetworks()
.then(networks => console.log(networks));

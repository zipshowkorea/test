const showcase = document.getElementById('showcase') as HTMLIFrameElement;
const key = 'bd12f50ec10b405194aee43f428e6876';

// declare this file is a module
export {};

// augment window with the MP_SDK property
declare global {
  interface Window {
    MP_SDK: any;
  }
}

showcase.addEventListener('load', async function() {
  let sdk;
  try {
    sdk = await showcase.contentWindow.MP_SDK.connect(showcase, key, '3.2');
  }
  catch(e) {
    console.error(e);
    return;
  }

  console.log('%c  Hello Bundle SDK! ', 'background: #333333; color: #00dd00');
  console.log(sdk);
  
  const lights = await sdk.Scene.createNode();
  lights.addComponent('mp.lights');
  lights.start();

  const modelNode = await sdk.Scene.createNode();

  // Store the gltfbinary component since we will need to adjust it in the next step.
  const gltfbinaryComponent = modelNode.addComponent(sdk.Scene.Component.GLTF_LOADER, {
    url: 'https://gitcdn.link/repo/mrdoob/three.js/dev/examples/models/gltf/Duck/glTF-Binary/Duck.glb',
  });

  gltfbinaryComponent.inputs.localScale = {
    x: 0.5,
    y: 0.5,
    z: 0.5
  };

  modelNode.obj3D.position.set(10,0,0); // drop ~3 feet

  modelNode.start();

  const tick = function(){
    requestAnimationFrame(tick);
    modelNode.obj3D.rotation.y += 0.02;
  }

  tick();
  
});

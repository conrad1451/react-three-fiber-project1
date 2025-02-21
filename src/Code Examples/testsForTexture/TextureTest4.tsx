interface MeshProps {
    position: [number, number, number];
    // other properties
  }
  
//   const MeshComponent: React.FC<MeshProps> = ({ position }) => {
  const MyBox: React.FC<MeshProps> = ({ position }) => {
    return (
      <mesh position={position}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  };
  
//  export default MeshComponent;
 export default MyBox;
  
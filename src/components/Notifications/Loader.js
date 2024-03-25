import { ScaleLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="w-full px-2 py-4 flex-colo">
      <ScaleLoader color="#1fa0e0" />
    </div>
  );
}

export default Loader;

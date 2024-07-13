import { useMediaQuery } from 'react-responsive';

const useMobileScreenCheck = () => useMediaQuery({ maxWidth: 576 });

export default useMobileScreenCheck;

import { useMediaQuery } from 'react-responsive';

const useMobileScreenCheck = (maxWidth = 576) => useMediaQuery({ maxWidth });

export default useMobileScreenCheck;

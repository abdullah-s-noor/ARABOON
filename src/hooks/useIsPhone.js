import { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

const useIsPhone = () => {
    const [isPhone, setIsPhone] = useState(false);

    useEffect(() => {
        setIsPhone(isMobile || isTablet);
    }, []);

    return isPhone;
};

export default useIsPhone;

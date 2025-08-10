import { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

const usePhone = () => {
    const [isPhone, setIsPhone] = useState(false);

    useEffect(() => {
        setIsPhone(isMobile || isTablet);
    }, []);

    return {isPhone,isMobile,isTablet};
};

export default usePhone;
